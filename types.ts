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
  };
}

export interface AnalysisResult {
  // Shared
  virality?: {
    score: number;
    baselineScore?: number;
    gapAnalysis: string;
    trendDetected?: string;
    vibe?: string;
  };
  
  // Mode A: Generation Data
  visualAudit?: {
    summary: string;
    hookIdentified: HookType;
    psychologyCheck: string;
  };
  strategy?: {
    headline: string;
    caption: string; 
    cta: string;
    altText?: string[];
  };
  seo?: {
    hiddenKeywords: string[];
    videoTags?: string[]; // YouTube Specific
    hashtags: string[]; // Simplified from object to array
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
