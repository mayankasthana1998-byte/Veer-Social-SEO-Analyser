
export enum AppMode {
  GENERATION = 'GENERATION', // Mode A
  REFINE = 'REFINE', // Mode B
  COMPETITOR_SPY = 'COMPETITOR_SPY', // Mode C
  TREND_HUNTER = 'TREND_HUNTER', // New Mode: Find Trends
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
  INTRIGUING_QUESTIONS = 'Intriguing Questions',
  BOLD_STATEMENTS = 'Bold/Startling Statements',
  COMPELLING_VISUALS = 'Compelling Visuals',
  STORYTELLING_SNIPPETS = 'Storytelling Snippets',
  URGENCY_SCARCITY = 'Urgency/Scarcity',
  PROBLEM_SOLUTION = 'Problem/Solution',
  AUTHORITY = 'Authority',
}

export interface CompetitorRow {
  keywords: string[];
  hookUsed: string;
  whyItWins: string;
  rankingStrategy: string;
  impactScore: number;
}

export interface AnalysisResult {
  visualAudit: {
    summary: string;
    hookIdentified: HookType;
    psychologyCheck: string;
  };
  strategy: {
    headline: string;
    caption: string;
    cta: string;
  };
  seo: {
    hiddenKeywords: string[];
    hashtags: {
      broad: string[];
      niche: string[];
      specific: string[];
    };
  };
  virality: {
    score: number;
    gapAnalysis: string;
    trendDetected?: string; 
    vibe?: string; 
  };
  competitorInsights?: {
    visualTheme: string;
    ctaStrategy: string;
    formula: string;
    spyMatrix?: CompetitorRow[]; // NEW: For the Chart Format
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
  type: 'image' | 'video';
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
  // Enhanced Targeting
  tone: string[];
  engagementGoal: string[];
  contentFormat: string;
}
