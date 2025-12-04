import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AppMode, Platform, TrendItem } from "../types";
import { SYSTEM_INSTRUCTION, MODE_PROMPTS, BRAND_GUARD_INSTRUCTION } from "../constants";

const MODEL_NAME = 'gemini-2.5-flash';

const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64String = result.includes(',') ? result.split(',')[1] : result;
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ROBUST VIDEO FRAME EXTRACTION
const extractFramesFromVideo = async (videoFile: File, frameCount: number = 5): Promise<any[]> => {
  console.log("Initialize: Frame Extraction Strategy");
  
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frames: any[] = [];
    const videoUrl = URL.createObjectURL(videoFile);

    // Critical settings for browser background processing
    video.autoplay = false;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.src = videoUrl;

    const processCapture = async () => {
      try {
        const duration = video.duration;
        if (!duration || !isFinite(duration)) {
          throw new Error("Could not determine video duration.");
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Calculate timestamps - avoid strict 0.0 and strict end to avoid black frames
        const interval = duration / (frameCount + 1);
        const timestamps = Array.from({ length: frameCount }, (_, i) => (i + 1) * interval);

        for (const time of timestamps) {
          await new Promise<void>((seekResolve, seekReject) => {
            
            const onSeeked = () => {
              if (ctx) {
                try {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                  frames.push({
                    inlineData: {
                      data: base64Data,
                      mimeType: 'image/jpeg'
                    }
                  });
                  seekResolve();
                } catch (err) {
                  seekReject(err);
                }
              } else {
                seekResolve(); // Skip if context missing
              }
            };

            // Safety timeout in case seek hangs
            const timeoutId = setTimeout(() => {
              console.warn(`Seek timeout at ${time}s`);
              seekResolve(); 
            }, 3000);

            video.addEventListener('seeked', () => {
              clearTimeout(timeoutId);
              onSeeked();
            }, { once: true });

            video.currentTime = time;
          });
        }

        URL.revokeObjectURL(videoUrl);
        resolve(frames);

      } catch (err) {
        URL.revokeObjectURL(videoUrl);
        reject(err);
      }
    };

    // 'loadeddata' is more reliable than 'loadedmetadata' for frame availability
    video.addEventListener('loadeddata', () => {
      processCapture().catch(reject);
    });

    video.addEventListener('error', (e) => {
      URL.revokeObjectURL(videoUrl);
      reject(new Error(`Video load error: ${video.error?.message || 'Unknown error'}`));
    });
  });
};

const uploadLargeFile = async (ai: GoogleGenAI, file: File): Promise<{ fileData: { fileUri: string; mimeType: string } }> => {
  const safeDisplayName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  let uploadResult;
  let lastError;
  for (let i = 0; i < 3; i++) {
    try {
      uploadResult = await ai.files.upload({
        file: file,
        config: { 
          displayName: safeDisplayName,
          mimeType: file.type || 'application/octet-stream'
        }
      });
      break; 
    } catch (e: any) {
      lastError = e;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  if (!uploadResult) {
     throw lastError || new Error("Upload handshake failed.");
  }

  try {
    let fileInfo = await ai.files.get({ name: uploadResult.name });
    let pollAttempts = 0;
    const MAX_POLL_ATTEMPTS = 60;
    while (fileInfo.state === 'PROCESSING' && pollAttempts < MAX_POLL_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      fileInfo = await ai.files.get({ name: uploadResult.name });
      pollAttempts++;
    }
    if (fileInfo.state === 'FAILED') throw new Error("Processing failed");
    return {
      fileData: {
        fileUri: fileInfo.uri,
        mimeType: fileInfo.mimeType
      }
    };
  } catch (error: any) {
    throw new Error("UPLOAD_FAILED_TRIGGER_FALLBACK");
  }
};

const cleanJson = (text: string) => {
  let clean = text.replace(/```json/g, '').replace(/```/g, '');
  const firstOpen = clean.indexOf('{');
  const lastClose = clean.lastIndexOf('}');
  if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
    clean = clean.substring(firstOpen, lastClose + 1);
  }
  return clean.trim();
};

export const analyzeContent = async (
  apiKey: string, 
  files: File[],
  mode: AppMode,
  platform: Platform,
  config: { 
    goal?: string; 
    style?: string; 
    keywords?: string; 
    originalText?: string; 
    geography?: string; 
    targetAudience?: string;
    targetLanguage?: string;
    demographics?: string;
    brandGuidelines?: string;
    niche?: string; 
    tone?: string[];
    engagementGoal?: string[];
    contentFormat?: string;
    refinePlatform?: Platform;
    refineFormat?: string;
  }
): Promise<AnalysisResult | TrendItem[]> => {
  try {
    if (!apiKey) throw new Error("MISSING_KEY");
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const targeting = [
      config.geography ? `Target Geography: ${config.geography}` : '',
      config.targetAudience ? `Target Audience: ${config.targetAudience}` : '',
      config.demographics ? `Target Demographics: ${config.demographics}` : ''
    ].filter(Boolean).join('\n');

    let promptText = "";

    if (mode === AppMode.TREND_HUNTER) {
      if (!config.niche) throw new Error("Niche is required for Trend Hunter.");
      promptText = MODE_PROMPTS.TREND_HUNTER(config.niche, platform, currentDate);
    } else {
      if (config.brandGuidelines) {
        promptText += BRAND_GUARD_INSTRUCTION(config.brandGuidelines) + "\n\n";
      }
      promptText += "IMPORTANT: You MUST return a valid JSON object matching the AnalysisResult structure. Do not include markdown formatting.\n\n";
      
      if (mode === AppMode.GENERATION) {
        promptText += MODE_PROMPTS.GENERATION(platform, config.engagementGoal || ['Viral Growth'], config.tone || ['Authentic'], config.contentFormat || 'Standard', targeting);
      } else if (mode === AppMode.REFINE) {
        promptText += MODE_PROMPTS.REFINE(config.originalText || '', config.keywords || '', targeting, config.refinePlatform, config.refineFormat);
      } else if (mode === AppMode.COMPETITOR_SPY) {
        const fileContext = files.length > 0 ? `Analyzing ${files.length} mixed-media inputs.` : 'No files provided.';
        promptText += `MODE C: COMPETITOR SPY. ${fileContext}\n`;
        promptText += MODE_PROMPTS.COMPETITOR_SPY(files.length, config.originalText || 'No captions provided', targeting);
      }
      
      if (config.targetLanguage) {
        promptText += `\n\nLANGUAGE OVERRIDE: The user has explicitly selected '${config.targetLanguage}'. Output fields in ${config.targetLanguage}.`;
      }
    }

    const parts: any[] = [{ text: promptText }];
    
    if (mode !== AppMode.TREND_HUNTER) {
      for (const file of files) {
        try {
          // Large file logic > 20MB
          if (file.size > 20 * 1024 * 1024) { 
             try {
               const part = await uploadLargeFile(ai, file);
               parts.push(part);
             } catch (uploadErr: any) {
               if (file.type.startsWith('video/') && (uploadErr.message === "UPLOAD_FAILED_TRIGGER_FALLBACK" || uploadErr.message?.includes('Network Error'))) {
                 console.warn(`Direct upload failed for ${file.name}. Switching to Frame Analysis.`);
                 const frames = await extractFramesFromVideo(file, 5); 
                 parts.push(...frames);
                 parts.push({ text: `[SYSTEM NOTE: The following images are key frames extracted from the video file "${file.name}". Analyze them as a continuous video sequence.]` });
               } else {
                 throw uploadErr;
               }
             }
          } else {
            // Small file logic
            // Note: If it is a video < 20MB, we can try sending it directly. 
            // However, browsers often struggle with direct base64 video. 
            // We'll trust the original logic but fallback to frames if base64 conversion fails or for better analysis.
            const part = await fileToPart(file);
            parts.push(part);
          }
        } catch (e) {
          console.error(`File processing error for ${file.name}:`, e);
          
          // Last ditch effort for small videos that failed fileToPart
          if (file.type.startsWith('video/')) {
             try {
                const frames = await extractFramesFromVideo(file, 5);
                parts.push(...frames);
                parts.push({ text: `[SYSTEM NOTE: Key frames from "${file.name}"]` });
                continue;
             } catch(frameErr) {
                // Ignore frame error and throw original
             }
          }
          
          throw new Error(`Failed to process ${file.name}. If it's a large video, try compressing it.`);
        }
      }
    }

    const generateConfig: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    if (mode === AppMode.TREND_HUNTER) {
      generateConfig.tools = [{ googleSearch: {} }];
    } else {
      generateConfig.responseMimeType = "application/json";
      generateConfig.responseSchema = {
        type: Type.OBJECT,
        properties: {
          visualAudit: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              hookIdentified: { type: Type.STRING },
              psychologyCheck: { type: Type.STRING },
            },
            required: ['summary', 'hookIdentified', 'psychologyCheck']
          },
          strategy: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              caption: { type: Type.STRING },
              cta: { type: Type.STRING },
            },
            required: ['headline', 'caption', 'cta']
          },
          seo: {
            type: Type.OBJECT,
            properties: {
              hiddenKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              hashtags: {
                type: Type.OBJECT,
                properties: {
                  broad: { type: Type.ARRAY, items: { type: Type.STRING } },
                  niche: { type: Type.ARRAY, items: { type: Type.STRING } },
                  specific: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              }
            }
          },
          virality: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              baselineScore: { type: Type.NUMBER }, 
              gapAnalysis: { type: Type.STRING },
              trendDetected: { type: Type.STRING },
              vibe: { type: Type.STRING },
            },
            required: ['score', 'gapAnalysis']
          },
          competitorInsights: { 
            type: Type.OBJECT,
            properties: {
              visualTheme: { type: Type.STRING },
              ctaStrategy: { type: Type.STRING },
              formula: { type: Type.STRING },
              spyMatrix: { 
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    hookUsed: { type: Type.STRING },
                    whyItWins: { type: Type.STRING },
                    rankingStrategy: { type: Type.STRING },
                    impactScore: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        },
        required: ['visualAudit', 'strategy', 'seo', 'virality']
      };
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: generateConfig
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const cleanText = cleanJson(resultText);
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      throw new Error("AI returned malformed data. Please try again.");
    }

    if (mode === AppMode.TREND_HUNTER) {
      if (parsed.trends && Array.isArray(parsed.trends)) return parsed.trends as TrendItem[];
      if (Array.isArray(parsed)) return parsed as TrendItem[];
      throw new Error("Failed to parse Trend results.");
    } else {
      return parsed as AnalysisResult;
    }

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    if (error.message === "MISSING_KEY") throw new Error("API Key is missing.");
    if (error.message?.includes('401') || error.message?.includes('403')) throw new Error("INVALID_KEY");
    if (error.message?.includes('429')) throw new Error("API Quota Exceeded. Wait 1 minute.");
    if (error.message?.includes('503')) throw new Error("Google AI Service temporarily down.");
    throw new Error(`Analysis Failed: ${error.message || 'Unknown Error'}`);
  }
};