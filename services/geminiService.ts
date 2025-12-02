
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AppMode, Platform, TrendItem } from "../types";
import { SYSTEM_INSTRUCTION, MODE_PROMPTS, BRAND_GUARD_INSTRUCTION } from "../constants";

const MODEL_NAME = 'gemini-2.5-flash';

// Helper to convert small files to Base64 (InlineData)
const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Robust base64 extraction
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

// Helper to upload large files via File API
const uploadLargeFile = async (ai: GoogleGenAI, file: File): Promise<{ fileData: { fileUri: string; mimeType: string } }> => {
  // Sanitize filename to strict ASCII to avoid API handshake issues
  const safeDisplayName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  let attempts = 0;
  const maxRetries = 3;

  while (attempts < maxRetries) {
    try {
      const uploadResult = await ai.files.upload({
        file: file,
        config: { 
          displayName: safeDisplayName,
          mimeType: file.type || 'application/octet-stream' // Fallback MIME
        }
      });

      let fileInfo = await ai.files.get({ name: uploadResult.name });
      
      // Poll until active
      // 10GB files can take minutes to process. We increase wait time to ~10 minutes.
      let pollAttempts = 0;
      const MAX_POLL_ATTEMPTS = 120; // 120 * 5s = 600s (10 mins)
      
      while (fileInfo.state === 'PROCESSING' && pollAttempts < MAX_POLL_ATTEMPTS) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        fileInfo = await ai.files.get({ name: uploadResult.name });
        pollAttempts++;
      }

      if (fileInfo.state === 'FAILED') {
        throw new Error(`File processing failed on server side for ${file.name}`);
      }

      return {
        fileData: {
          fileUri: fileInfo.uri,
          mimeType: fileInfo.mimeType
        }
      };
    } catch (error: any) {
      attempts++;
      console.warn(`Upload attempt ${attempts} failed:`, error);
      
      if (attempts >= maxRetries) {
        const errorMsg = error.message || "Unknown error";
        
        // Detailed Error Mapping
        if (errorMsg.includes('403')) {
           throw new Error("Permission Denied (403). Your API Key might lack permissions.");
        }
        if (errorMsg.includes('413')) {
          throw new Error("413 Payload Too Large. The file exceeds the browser's upload capacity. Please try a faster connection.");
        }
        if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
          throw new Error("Network Error. Upload interrupted. Please check your internet connection.");
        }
        if (errorMsg.includes('x-google-upload-url')) {
          throw new Error("Browser Limit: Google blocks large uploads from this browser context due to CORS. Please compress the file under 20MB or use a server-side proxy.");
        }
        
        throw new Error(`Failed to upload "${file.name}" after ${maxRetries} attempts. ${errorMsg}`);
      }
      
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  throw new Error("Upload failed.");
};

const cleanJson = (text: string) => {
  // 1. Remove Markdown code blocks
  let clean = text.replace(/```json/g, '').replace(/```/g, '');
  
  // 2. Find the first '{' and the last '}' to extract valid JSON object
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
  }
): Promise<AnalysisResult | TrendItem[]> => {
  try {
    if (!apiKey) {
      throw new Error("MISSING_KEY");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // 1. Prepare Prompt based on Mode
    const targeting = [
      config.geography ? `Target Geography: ${config.geography}` : '',
      config.targetAudience ? `Target Audience: ${config.targetAudience}` : '',
      config.demographics ? `Target Demographics: ${config.demographics}` : ''
    ].filter(Boolean).join('\n');

    let promptText = "";

    // Trend Hunter Mode Logic
    if (mode === AppMode.TREND_HUNTER) {
      if (!config.niche) throw new Error("Niche is required for Trend Hunter.");
      promptText = MODE_PROMPTS.TREND_HUNTER(config.niche, currentDate);
    } 
    // Standard Modes
    else {
      if (config.brandGuidelines) {
        promptText += BRAND_GUARD_INSTRUCTION(config.brandGuidelines) + "\n\n";
      }

      promptText += "IMPORTANT: You MUST return a valid JSON object matching the AnalysisResult structure. Do not include markdown formatting.\n\n";

      if (mode === AppMode.GENERATION) {
        promptText += MODE_PROMPTS.GENERATION(
          platform, 
          config.engagementGoal || ['Viral Growth'], 
          config.tone || ['Authentic'], 
          config.contentFormat || 'Standard',
          targeting
        );
      } else if (mode === AppMode.REFINE) {
        promptText += MODE_PROMPTS.REFINE(config.originalText || '', config.keywords || '', targeting);
      } else if (mode === AppMode.COMPETITOR_SPY) {
        const fileContext = files.length > 0 ? `Analyzing ${files.length} mixed-media inputs (Images/Videos/PDFs).` : 'No files provided.';
        promptText += `MODE C: COMPETITOR SPY. ${fileContext}\n`;
        promptText += MODE_PROMPTS.COMPETITOR_SPY(files.length, config.originalText || 'No captions provided', targeting);
      }
      
      if (config.targetLanguage) {
        promptText += `\n\nLANGUAGE OVERRIDE: The user has explicitly selected '${config.targetLanguage}'. 
        You MUST write the 'headline', 'caption', and 'cta' fields in ${config.targetLanguage}. 
        Use the specified platform's cultural dialect.`;
      }
    }

    // 2. Prepare Multimedia Parts
    const parts: any[] = [{ text: promptText }];
    
    // Only process files if NOT in Trend Hunter mode
    if (mode !== AppMode.TREND_HUNTER) {
      const FILE_SIZE_THRESHOLD = 20 * 1024 * 1024; // 20MB
      for (const file of files) {
        if (file.size > FILE_SIZE_THRESHOLD) {
          const part = await uploadLargeFile(ai, file);
          parts.push(part);
        } else {
          // Check if it's a PDF that is small enough for inline? 
          // Gemini API usually prefers File API for PDFs regardless of size for better parsing, 
          // but inline works for small ones. However, to be safe with 'documents', we'll rely on the 20MB threshold.
          // Note: Standard inlineData supports image/*, video/*, audio/*. application/pdf works in some contexts but File API is safer for docs.
          // If it's a small PDF, we'll try inline.
          const part = await fileToPart(file);
          parts.push(part);
        }
      }
    }

    // 3. Configure Request
    const generateConfig: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    const useSearch = mode === AppMode.TREND_HUNTER;

    if (useSearch) {
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

    // 5. Call API
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
      console.error("JSON Parsing Failed on:", cleanText);
      throw new Error("AI returned malformed data. Please try again.");
    }

    if (mode === AppMode.TREND_HUNTER) {
      if (parsed.trends && Array.isArray(parsed.trends)) {
        return parsed.trends as TrendItem[];
      }
      if (Array.isArray(parsed)) return parsed as TrendItem[];
      throw new Error("Failed to parse Trend results.");
    } else {
      return parsed as AnalysisResult;
    }

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    if (error.message && error.message.includes('Failed to upload')) {
      throw error;
    }

    if (error.message?.includes('413') || error.message?.includes('too large') || error.message?.includes('payload')) {
      if (files.length > 0) {
        const largestFile = files.reduce((prev, current) => (prev.size > current.size) ? prev : current);
        throw new Error(`Total request size exceeded limit. "${largestFile.name}" is your largest file (${(largestFile.size/1024/1024).toFixed(1)}MB). Try uploading fewer files or splitting larger ones.`);
      }
      throw new Error("The request payload is too large. Please try using fewer or smaller files.");
    }

    if (error.message === "MISSING_KEY") {
      throw new Error("API Key is missing. Please re-enter your key.");
    }

    if (error.message?.includes('401') || error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("INVALID_KEY"); 
    }

    if (error.message?.includes('429')) {
      throw new Error("API Quota Exceeded. You are sending too many requests too fast. Wait 1 minute.");
    }

    if (error.message?.includes('503') || error.message?.includes('500')) {
      throw new Error("Google AI Service is temporarily down. Please try again in a few moments.");
    }

    throw new Error(`Connection Failed: ${error.message || 'Unknown Error'}`);
  }
};
