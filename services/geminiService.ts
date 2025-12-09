import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AppMode, Platform, TrendItem } from "../types";
import { SYSTEM_INSTRUCTION, MODE_PROMPTS, BRAND_GUARD_INSTRUCTION } from "../constants";

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

const extractFramesFromVideo = async (videoFile: File, frameCount: number = 5): Promise<any[]> => {
    return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frames: any[] = [];
    const videoUrl = URL.createObjectURL(videoFile);

    video.autoplay = false;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.src = videoUrl;

    const processCapture = async () => {
      try {
        const duration = video.duration;
        if (!duration || !isFinite(duration)) throw new Error("Could not determine video duration.");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const interval = duration / (frameCount + 1);
        const timestamps = Array.from({ length: frameCount }, (_, i) => (i + 1) * interval);

        for (const time of timestamps) {
          await new Promise<void>((seekResolve, seekReject) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked);
              if (ctx) {
                try {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                  frames.push({ inlineData: { data: base64Data, mimeType: 'image/jpeg' } });
                } catch (e) { console.warn("Frame capture error", e); }
              }
              seekResolve();
            };
             video.addEventListener('seeked', onSeeked, { once: true });
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

    video.addEventListener('loadeddata', () => processCapture().catch(reject), { once: true });
    video.addEventListener('error', () => reject(new Error('Video load error')), { once: true });
  });
};

const uploadLargeFile = async (ai: GoogleGenAI, file: File) => {
    const safeDisplayName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uploadResult = await ai.files.upload({
        file: file,
        config: { displayName: safeDisplayName, mimeType: file.type }
    });
    let fileInfo = await ai.files.get({ name: uploadResult.name });
    while (fileInfo.state === 'PROCESSING') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        fileInfo = await ai.files.get({ name: uploadResult.name });
    }
    if (fileInfo.state === 'FAILED') {
      throw new Error(`File upload failed for ${file.name}`);
    }
    return { fileData: { fileUri: fileInfo.uri, mimeType: fileInfo.mimeType } };
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
  files: File[],
  mode: AppMode,
  platform: Platform,
  config: any
): Promise<AnalysisResult | TrendItem[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const currentDate = new Date().toLocaleString('default', { month: 'long', 'year': 'numeric' });

    const targeting = [
      config.geography ? `Target Geography: ${config.geography}` : '',
      config.targetAudience ? `Target Audience: ${config.targetAudience}` : '',
    ].filter(Boolean).join('\n');

    let promptText = "";
    
    let modelName = 'gemini-2.5-flash';
    const generateConfig: any = { systemInstruction: SYSTEM_INSTRUCTION };

    if (mode === AppMode.TREND_HUNTER) {
      promptText = MODE_PROMPTS.TREND_HUNTER(config.niche, platform, currentDate);
    } else {
      if (config.brandGuidelines) promptText += BRAND_GUARD_INSTRUCTION(config.brandGuidelines) + "\n\n";
      
      if (mode === AppMode.GENERATION) {
        promptText += MODE_PROMPTS.GENERATION(platform, config.engagementGoal || [], config.tone || [], config.contentFormat || 'Standard', targeting, config.keywords || '');
      } else if (mode === AppMode.REFINE) {
        modelName = 'gemini-3-pro-preview';
        generateConfig.thinkingConfig = { thinkingBudget: 32768 };
        promptText += MODE_PROMPTS.REFINE(config.originalText || '', config.keywords || '', targeting, platform, config.refineFormat, config.tone || []);
      } else if (mode === AppMode.COMPETITOR_SPY) {
        promptText += MODE_PROMPTS.COMPETITOR_SPY(platform, files.length, config.originalText || 'No text', targeting);
      }
    }

    const parts: any[] = [{ text: promptText }];
    
    if (mode !== AppMode.TREND_HUNTER) {
      for (const file of files) {
        try {
          if (file.type.startsWith('video/')) {
               const frames = await extractFramesFromVideo(file, 5);
               parts.push(...frames);
          } else {
               if (file.size > 20 * 1024 * 1024) {
                  const part = await uploadLargeFile(ai, file);
                  parts.push(part);
               } else {
                  const part = await fileToPart(file);
                  parts.push(part);
               }
          }
        } catch (uploadError) {
          console.error(`Failed to process file ${file.name}:`, uploadError);
          throw new Error(`Error processing file: ${file.name}. It might be corrupted or in an unsupported format.`);
        }
      }
    }
    
    if (mode === AppMode.TREND_HUNTER || mode === AppMode.COMPETITOR_SPY) {
      generateConfig.tools = [{ googleSearch: {} }];
    } else {
      generateConfig.responseMimeType = "application/json";
      generateConfig.responseSchema = {
        type: Type.OBJECT,
        properties: {
          virality: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, baselineScore: { type: Type.INTEGER }, gapAnalysis: { type: Type.STRING }}},
          visualAudit: { type: Type.OBJECT, properties: { summary: { type: Type.STRING }, hookIdentified: { type: Type.STRING }, psychologyCheck: { type: Type.STRING }}},
          strategy: { type: Type.OBJECT, properties: { 
            headline: { type: Type.STRING }, 
            caption: { type: Type.STRING }, 
            cta: { type: Type.STRING },
            altText: { type: Type.ARRAY, items: { type: Type.STRING } }
          }},
          seo: { type: Type.OBJECT, properties: { 
            hiddenKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            videoTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } 
          }},
          refineData: {
            type: Type.OBJECT, properties: {
              audit: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, flaw: { type: Type.STRING }, fix: { type: Type.STRING }, explanation: { type: Type.STRING }}},
              refinedContent: { type: Type.OBJECT, properties: { 
                headline: { type: Type.STRING }, 
                body: { type: Type.STRING }, 
                cta: { type: Type.STRING }, 
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                videoTags: { type: Type.ARRAY, items: { type: Type.STRING } }
              }}
            }
          },
          optimizationIdeas: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, idea: { type: Type.STRING } } } }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: generateConfig
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response text from AI.");

    const cleanText = cleanJson(resultText);
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON Parsing Error on:", cleanText);
      throw new Error("AI returned malformed data. Please try rephrasing your request.");
    }
    
    if (mode === AppMode.COMPETITOR_SPY) {
        const result: AnalysisResult = {};
        if (parsed.spyReport) {
          result.competitorInsights = { spyReport: parsed.spyReport };
        } else if (Array.isArray(parsed)) {
          result.competitorInsights = { spyReport: parsed };
        }
        if (response.candidates?.[0]?.groundingMetadata) {
            result.groundingMetadata = response.candidates[0].groundingMetadata as any;
        }
        return result;
    }
    if (mode === AppMode.TREND_HUNTER) {
      if (parsed.trends) return parsed.trends as TrendItem[];
      return parsed as TrendItem[];
    } 
    
    return parsed as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    const errorMessage = error.message || 'Unknown Error';
    if (errorMessage.includes("API key not valid")) {
      throw new Error("INVALID_KEY");
    }
    if (errorMessage.includes("429")) {
      throw new Error("API rate limit exceeded. Please wait and try again.");
    }
    if (errorMessage.includes("400")) {
      throw new Error("Bad request. The AI may have blocked the content for safety reasons.");
    }
    if (errorMessage.includes("500") || errorMessage.includes("503")) {
      throw new Error("The AI service is temporarily unavailable. Please try again later.");
    }
    throw new Error(`An unexpected error occurred: ${errorMessage}`);
  }
};