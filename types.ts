
export enum AppMode {
  GENERATION = 'GENERATION',
  REFINE = 'REFINE',
  COMPETITOR_SPY = 'COMPETITOR_SPY',
  TREND_HUNTER = 'TREND_HUNTER',
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter (X)',
  FACEBOOK = 'Facebook',
}

export enum HookType {
  CURIOSITY_HOOK = 'Curiosity Hook',
  PATTERN_INTERRUPT = 'Pattern Interrupt',
  PAIN_POINT_HOOK = 'Pain Point Hook',
  BENEFIT_HOOK = 'Benefit Hook',
  SOCIAL_PROOF_HOOK = 'Social Proof Hook',
  TRENDING_HOOK = 'Trending Hook',
  INTRIGUING_QUESTIONS = 'Intriguing Questions',
  BOLD_STATEMENTS = 'Bold/Startling Statements',
  STORYTELLING_SNIPPETS = 'Storytelling Snippets',
  URGENCY_SCARCITY = 'Urgency/Scarcity',
}

export interface SpyReportRow {
  analysis: string;
  keywords: string;
  strategy: string;
  learning: string;
}

export interface OptimizationIdea {
  title: string;
  idea: string;
}

// Dedicated Structure for Refine Mode for type safety and UI stability
export interface RefineData {
  audit: {
    score: number;
    flaw: string;
    fix: string;
    explanation: string;
  };
  refinedContent: {
    headline: string;
    body: string;
    cta: string;
    hashtags: string[]; // Use array for perfect formatting
    videoTags?: string[]; // YouTube specific
    hiddenKeywords?: string[]; // Instagram SEO specific
  };
}

export interface ThumbnailDirector {
  visual: string;
  textOverlay: string;
  colorPsychology: string;
}

export interface AnalysisResult {
  // Shared
  virality?: {
    score: number;
    critique?: string; // New v2.1 field
    baselineScore?: number;
    gapAnalysis?: string;
    trendDetected?: string;
    vibe?: string;
  };
  
  // Mode A: Generation Data (v2.1 Schema)
  psychologicalAudit?: {
    visualIndexing: string;
    hookStrategy: string;
    neuroTrigger: string;
  };
  
  thumbnailDirector?: ThumbnailDirector; // Video Only

  strategy?: {
    headline: string; // Overlay Text
    caption: string; 
    cta: string;
  };

  seo?: {
    altText?: string[]; // Moved to SEO object in v2.1
    keywords?: string[]; // General keywords list
    hiddenKeywords?: string[]; // Instagram specific
    videoTags?: string[]; // YouTube Specific
    hashtags: string[]; 
  };
  
  // Backwards compatibility for UI safety
  visualAudit?: {
    summary: string;
    hookIdentified: HookType;
    psychologyCheck: string;
  };

  // Mode B: Refine Data (New Strict Structure)
  refineData?: RefineData;

  // Mode C: Spy Data
  competitorInsights?: {
    spyReport?: SpyReportRow[];
  };
  
  optimizationIdeas?: OptimizationIdea[];

  groundingMetadata?: {
    groundingChunks: { web: { uri: string; title: string } }[];
  };
}

export interface TrendItem {
  headline: string;
  whyItsHot: string;
  contentIdea: string;
  platform?: string;
  difficulty?: string;
}

export interface FileInput {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'pdf';
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  mode: AppMode;
  platform?: Platform;
  data: AnalysisResult | TrendItem[];
  summary: string;
}

export interface ConfigState {
  goal: string;
  style: string;
  keywords: string;
  originalText: string;
  geography: string;
  targetAudience: string;
  targetLanguage: string;
  demographics: string;
  brandGuidelines: string;
  niche: string;
  tone: string[];
  engagementGoal: string[];
  contentFormat: string;
  refineFormat: string;
}
