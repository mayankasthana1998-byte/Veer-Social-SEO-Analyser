
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
  try {
    const uploadResult = await ai.files.upload({
      file: file,
      config: { 
        displayName: file.name,
        mimeType: file.type 
      }
    });

    let fileInfo = await ai.files.get({ name: uploadResult.name });
    
    // Poll until active
    let attempts = 0;
    while (fileInfo.state === 'PROCESSING' && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      fileInfo = await ai.files.get({ name: uploadResult.name });
      attempts++;
    }

    if (fileInfo.state === 'FAILED') {
      throw new Error(`File processing failed for ${file.name}`);
    }

    return {
      fileData: {
        fileUri: fileInfo.uri,
        mimeType: fileInfo.mimeType
      }
    };
  } catch (error: any) {
    console.error("File upload error:", error);
    if (error.message && error.message.includes('403')) {
       throw new Error("Permission Denied (403). Your API Key might lack permissions to upload files.");
    }
    throw new Error(`Failed to upload "${file.name}". Connection unstable.`);
  }
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
  apiKey: string, // REQUIRED: User provided key
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
    // Enhanced Targeting
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
      // Inject Brand Guidelines if provided
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
        // Pass the originalText as "Competitor Captions"
        promptText += MODE_PROMPTS.COMPETITOR_SPY(files.length, config.originalText || 'No captions provided', targeting);
      }
      
      // CRITICAL LANGUAGE INJECTION
      if (config.targetLanguage) {
        promptText += `\n\nLANGUAGE OVERRIDE: The user has explicitly selected '${config.targetLanguage}'. 
        You MUST write the 'headline', 'caption', and 'cta' fields in ${config.targetLanguage}. 
        Use the specified platform's cultural dialect (e.g. Hinglish for Hindi if casual, Formal if LinkedIn). 
        Do NOT write these fields in English.`;
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
      // NO responseSchema allowed with search tools
    } else {
      // Standard Schema
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
      // Fallback for Trend Hunter if structure varies slightly
      if (Array.isArray(parsed)) return parsed as TrendItem[];
      throw new Error("Failed to parse Trend results.");
    } else {
      return parsed as AnalysisResult;
    }

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Explicit upload errors
    if (error.message && error.message.includes('Failed to upload')) {
      throw error;
    }

    // File size errors
    if (error.message?.includes('413') || error.message?.includes('too large') || error.message?.includes('payload')) {
      if (files.length > 0) {
        // Find largest file
        const largestFile = files.reduce((prev, current) => (prev.size > current.size) ? prev : current);
        throw new Error(`Total request size exceeded limit. "${largestFile.name}" is your largest file (${(largestFile.size/1024/1024).toFixed(1)}MB). Try uploading fewer files or splitting larger ones.`);
      }
      throw new Error("The request payload is too large. Please try using fewer or smaller files.");
    }

    // Generic API Key error detection
    if (error.message === "MISSING_KEY") {
      throw new Error("API Key is missing. Please re-enter your key.");
    }

    if (error.message?.includes('401') || error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("INVALID_KEY"); // Special code to trigger UI reset
    }

    // Quota errors
    if (error.message?.includes('429')) {
      throw new Error("API Quota Exceeded. You are sending too many requests too fast. Wait 1 minute.");
    }

    if (error.message?.includes('503') || error.message?.includes('500')) {
      throw new Error("Google AI Service is temporarily down. Please try again in a few moments.");
    }

    throw new Error(`Connection Failed: ${error.message || 'Unknown Error'}`);
  }
};
