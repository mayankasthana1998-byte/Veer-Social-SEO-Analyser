
import { Platform } from "./types";

export const MAX_FILE_SIZE_MB = 1024; // 1 GB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const TONE_OPTIONS: { default: string[], [key: string]: string[] } = {
  default: ['Professional', 'Casual', 'Humorous', 'Empathetic', 'Authoritative', 'Urgent', 'Wholesome', 'Sarcastic'],
  [Platform.LINKEDIN]: ['Controversial/Polarizing', 'Inspirational/Awe-Inspiring', 'Humorous/Witty', 'Curious/Surprising', 'Authentic/Relatable', 'Authoritative/Insightful'],
  [Platform.TWITTER]: ['Controversial/Polarizing', 'Inspirational/Awe-Inspiring', 'Humorous/Witty', 'Curious/Surprising', 'Authentic/Relatable', 'Authoritative/Insightful'],
};

export const PLATFORM_FORMATS: Record<Platform, string[]> = {
  [Platform.INSTAGRAM]: ['Reel', 'Carousel', 'Static Post', 'Story'],
  [Platform.TIKTOK]: ['Vlog', 'Green Screen', 'Skit', 'Photo Mode'],
  [Platform.YOUTUBE]: ['Shorts', 'Long-form'],
  [Platform.LINKEDIN]: ['Text Only', 'Single Image', 'PDF/Carousel', 'Article', 'Video'],
  [Platform.TWITTER]: ['Thread', 'Short Tweet', 'Media Post'],
  [Platform.FACEBOOK]: ['Video', 'Image Post', 'Text Post'],
};

export const REFINE_PLATFORM_FORMATS: Record<Platform, string[]> = {
  [Platform.INSTAGRAM]: ['Reel', 'Carousel', 'Caption Only'],
  [Platform.TIKTOK]: ['Script', 'Caption', 'Overlay Text'],
  [Platform.YOUTUBE]: ['Description', 'Shorts Script', 'Community Post'],
  [Platform.LINKEDIN]: ['Post', 'Article', 'PDF Slide Text'],
  [Platform.TWITTER]: ['Thread', 'Tweet'],
  [Platform.FACEBOOK]: ['Post', 'Video Description'],
};


export const TIMING_DATA: Record<Platform, { 
  bestTimeIST: string, 
  gapTimeIST: string,
  viralWindow: string, 
  tips: string 
}> = {
  [Platform.INSTAGRAM]: {
    bestTimeIST: "6:00 PM - 9:00 PM",
    gapTimeIST: "11:15 AM (Lunch Pre-Load)",
    viralWindow: "2-4 Weeks",
    tips: "Reels posted at 11:15 AM get batch-tested before the 1PM rush."
  },
  [Platform.TIKTOK]: {
    bestTimeIST: "7:00 PM - 10:00 PM",
    gapTimeIST: "3:30 PM (School Exit)",
    viralWindow: "72 Hours",
    tips: "Post at 3:30 PM to catch the Gen-Z wave before professionals clock out."
  },
  [Platform.LINKEDIN]: {
    bestTimeIST: "9:00 AM - 11:00 AM",
    gapTimeIST: "8:15 AM (Commute Read)",
    viralWindow: "3-6 Months",
    tips: "PDFs at 8:15 AM capture mobile commuters with high dwell time."
  },
  [Platform.YOUTUBE]: {
    bestTimeIST: "12:00 PM - 3:00 PM",
    gapTimeIST: "5:45 PM (Dopamine Bridge)",
    viralWindow: "Days (Shorts) / Months (Long)",
    tips: "Shorts at 5:45 PM bridge the gap between work and evening leisure."
  },
  [Platform.TWITTER]: {
    bestTimeIST: "8:00 PM - 10:00 PM",
    gapTimeIST: "8:30 AM (News Cycle)",
    viralWindow: "24 Hours",
    tips: "Morning threads catch the first wave of news readers."
  },
  [Platform.FACEBOOK]: {
    bestTimeIST: "1:00 PM - 4:00 PM",
    gapTimeIST: "7:00 AM (Family Check)",
    viralWindow: "1-2 Weeks",
    tips: "Early morning posts circulate in family groups throughout the day."
  }
};

export const SYSTEM_INSTRUCTION = `
You are SocialSEO AI (v.Andromeda 2.2), the world's most advanced social media content architect.
Your Mission: Transform any input into highly engaging, algorithm-optimized, human-sounding social media posts.

### 🚫 THE "ANTI-ROBOT" PROTOCOL (CRITICAL) ###
1. **VOCABULARY BAN:** You are strictly forbidden from using these words: *Delve, Leverage, Utilize, Unleash, Elevate, Seamless, Tapestry, Realm, Game-changer, Furthermore, Moreover, In conclusion, Dive in, Landscape, Foster, Spearhead.*
   - **Fix:** Use simple Anglo-Saxon words (Use, Fix, Build, Grow, Start, Big, Fast).
2. **BURSTINESS:** Vary sentence length. Mix short, punchy fragments with longer, flowing sentences.
3. **EMOJI HYGIENE:** Use 2-3 relevant emojis per section. Do not overdo it. Do not use literal object emojis unless necessary.
4. **NEURO-HOOKS:** Start with a Dopamine trigger (curiosity), Cortisol spike (fear/mistake), or Oxytocin bond (relatability). Never start with "Here is..." or "In this video...".

### 📱 PLATFORM-SPECIFIC MASTER RULES ###

**1. INSTAGRAM**
   - **Reels:** Visual Hook -> Caption (Short & Bursty) -> Keywords -> EXACTLY 3 Hashtags ONLY. NO Alt Text.
   - **Static/Carousel:** Visual Hook -> Caption -> Alt Text for EVERY slide -> EXACTLY 3 Hashtags ONLY.

**2. TWITTER / X**
   - **Constraint:** 280 characters MAX per tweet.
   - **Format:** If content is long, create a THREAD.
   - **Structure:** Hook (Tweet 1) -> Value (Tweets 2-N) -> CTA (Final Tweet).
   - **Hashtags:** 1-2 max.

**3. LINKEDIN**
   - **Style:** "Broetry" (One sentence per line. Lots of white space).
   - **Tone:** Professional yet conversational.
   - **Carousel:** Slide 1 (Hook), Slide 2 (Problem), Slide 3 (Solution).
   - **Hashtags:** 3-5 industry tags.

**4. YOUTUBE**
   - **Shorts:** Title < 50 chars. Description = Keyword stuffing. #Shorts.
   - **Long-Form:** High CTR Title. Description: Hook > Value > CTA > Chapters/Timestamps.
   - **Thumbnail:** Critical for both.

**5. FACEBOOK**
   - **Tone:** Community-driven, friendly.
   - **Goal:** Meaningful Social Interaction (MSI). Ask questions.
   - **Hashtags:** 3-4 max.

OUTPUT FORMAT:
Return a raw JSON object based on the requested schema. Do not include markdown formatting.
`;

export const BRAND_GUARD_INSTRUCTION = (brandText: string) => `
**BRAND GUARD ACTIVE**
The user has provided strict Brand Guidelines. You MUST adhere to the following rules:
"${brandText}"
- Adapt all stylistic choices to match this brand voice.
`;

export const MODE_PROMPTS = {
  GENERATION: (platform: Platform, goals: string[], tones: string[], format: string, targeting: string, keywords: string) => {
    
    // 1. Determine Format Type
    const isVideoFormat = 
        format.toLowerCase().includes('reel') || 
        format.toLowerCase().includes('short') || 
        format.toLowerCase().includes('tiktok') || 
        format.toLowerCase().includes('video');

    // 2. Logic Builders
    let platformSpecifics = "";
    let seoRules = "";
    let thumbnailRules = "";

    // 3. Thumbnail & Alt Text Logic
    if (isVideoFormat) {
        thumbnailRules = `**THUMBNAIL DIRECTOR:** REQUIRED. Populate 'thumbnailDirector' with Visual, Text Overlay, and Color Psychology.`;
        seoRules = `**ALT TEXT:** DO NOT generate Alt Text. Leave 'seo.altText' empty.`;
    } else {
        thumbnailRules = `**THUMBNAIL DIRECTOR:** OMIT.`;
        seoRules = `**ALT TEXT:** REQUIRED. Generate descriptive, keyword-rich Alt Text for 'seo.altText' (one per image/slide).`;
    }

    // 4. Platform Specific Instructions
    if (platform === Platform.INSTAGRAM) {
        if (isVideoFormat) {
            platformSpecifics = `
            **PLATFORM: INSTAGRAM REEL**
            - **Hook:** Visual Hook description + Strong Text Hook.
            - **Caption:** Conversational, bursty, emoji-rich (2-5 total).
            - **Footer:** "Keywords:" [comma-separated list].
            - **Hashtags:** STRICT LIMIT: EXACTLY 3 hashtags ONLY.
            - **CTA:** Drive Saves or Shares.
            `;
        } else {
            platformSpecifics = `
            **PLATFORM: INSTAGRAM POST/CAROUSEL**
            - **Structure:** Hook -> Value Body -> CTA.
            - **Emojis:** 2-5 per post.
            - **Hashtags:** STRICT LIMIT: EXACTLY 3 hashtags ONLY.
            - **Alt Text:** Mandatory.
            `;
        }
    } else if (platform === Platform.TWITTER) {
        platformSpecifics = `
        **PLATFORM: TWITTER (X)**
        - **Format:** THREAD.
        - **Constraint:** STRICTLY < 280 characters per tweet unit.
        - **Structure:** 
          - 'strategy.headline': Tweet 1 (Hook).
          - 'strategy.caption': The rest of the thread (Tweets 2-N + Final CTA).
        - **Emojis:** Minimum 1 per tweet.
        - **Hashtags:** 1-2 relevant tags only.
        - **Tone:** Witty, concise, no fluff.
        `;
    } else if (platform === Platform.LINKEDIN) {
        platformSpecifics = `
        **PLATFORM: LINKEDIN**
        - **Format:** "Broetry" (One sentence per line, heavy whitespace).
        - **Carousel Logic:** If format is Carousel, 'strategy.caption' must outline Slide 1, Slide 2, Slide 3.
        - **Tone:** Professional, authoritative, ROI-focused.
        - **Hashtags:** 3-5 industry tags.
        - **CTA:** Ask a specific question to provoke >15 word comments.
        `;
    } else if (platform === Platform.YOUTUBE) {
        if (format.toLowerCase().includes('short')) {
             platformSpecifics = `
             **PLATFORM: YOUTUBE SHORTS**
             - **Title:** < 50 Characters. High CTR. (Put in 'strategy.headline').
             - **Description:** Keyword stuffing + #shorts. (Put in 'strategy.caption').
             - **Script:** Visual Hook in first 1-3s.
             `;
        } else {
             platformSpecifics = `
             **PLATFORM: YOUTUBE LONG-FORM**
             - **Title:** High CTR, Keyword Rich. (Put in 'strategy.headline').
             - **Description:** Hook -> Value -> CTA -> Timestamps/Chapters. (Put in 'strategy.caption').
             - **SEO:** Comma-separated tags in 'seo.keywords'.
             `;
        }
    } else if (platform === Platform.TIKTOK) {
        platformSpecifics = `
        **PLATFORM: TIKTOK**
        - **Script:** Start with [Visual Hook]. Verbal Hook MUST include keyword in first 3 seconds.
        - **Caption:** Gen Z Slang. Max 2 lines.
        - **SEO:** List keywords at bottom of caption.
        - **Tone:** Energetic, casual, dynamic.
        `;
    } else if (platform === Platform.FACEBOOK) {
        platformSpecifics = `
        **PLATFORM: FACEBOOK**
        - **Tone:** Community-driven, friendly.
        - **Structure:** Emotional Hook -> Skimmable Paragraphs -> Question CTA.
        - **Goal:** Meaningful Social Interaction (MSI).
        - **Hashtags:** 3-4 max.
        `;
    }

    return `
    ACTIVE MODE: GENERATION (v.Andromeda 2.2)
    Platform: ${platform}
    Format: ${format}
    Context/Keywords: ${keywords}
    Goals: ${goals.join(', ')}
    Tones: ${tones.join(', ')}
    ${targeting}

    **CORE DIRECTIVE:** Generate a "One-Section" Report strictly adhering to the platform rules below.
    
    ${platformSpecifics}

    **EXECUTION STEPS:**
    1. **PSYCHOLOGICAL AUDIT:** Analyze the input. Identify 'Visual Indexing', 'Hook Strategy', and 'Neuro-Trigger'.
    2. **THE STRATEGY:** 
       - Write the Headline/Title (optimized for CTR).
       - Write the Caption/Script/Thread (Humanized, Bursty, Emoji-Rich).
       - Write the CTA.
    3. ${thumbnailRules}
    4. **SEO DATA:** 
       - Keywords: Generate 5-10 high volume keywords.
       - Hashtags: Generate specific hashtags based on platform rules.
       - ${seoRules}
    5. **VIRALITY SCORE:** Score (0-100) and provide one specific Critique.

    **FINAL COMPLIANCE CHECK:**
    - Did you use emojis? (Required)
    - Is the vocabulary clean? (No banned words)
    - Is the format correct? (Twitter <280 chars, LinkedIn Broetry, etc)
    - Did you populate 'thumbnailDirector' only if it's a video?
    - Did you populate 'seo.altText' only if it's static?

    **JSON OUTPUT RULES:**
    - Populate 'psychologicalAudit', 'strategy', 'seo', 'virality'.
    - Only populate 'thumbnailDirector' if it is a video.
    `;
  },
  
  REFINE: (originalText: string, keywords: string, targeting: string, platform: Platform, format: string, tones: string[]) => {
    
    const tonesInstruction = tones.length > 0 ? `\n**Desired Tones:** You must rewrite the content to reflect these tones: ${tones.join(', ')}.` : '';
    
    return `
    MODE B: REFINE (The Omni-Platform Editor).
    Target Platform: ${platform}.
    Original Draft: "${originalText}"
    Context/Keywords: ${keywords}
    ${tonesInstruction}
    
    **TASK:** Perform a 2025 Algorithm Audit and generate a structured JSON rewrite. This is a deep reasoning task.

    **CRITICAL PROTOCOL: AUDIT-FIRST.**
    1.  **Analyze:** Scrutinize the original text for platform-specific "reach killers".
    2.  **Quantify:** Assign an initial 'score' (0-100 integer) to the draft.
    3.  **Diagnose:** Identify the single biggest 'flaw' and the specific 'fix'.
    4.  **Rewrite:** Generate the 'refinedContent' object.
    5.  **Score Again:** Calculate the new, higher 'score' for the refined version.

    **PLATFORM RULES & REQUIRED ACTIONS:**
    - **LinkedIn:** Fix "Walls of Text" with whitespace. If a URL is in the body, REMOVE it and note this in the audit. The CTA must be a "Conversation Starter" question. You must generate 3-5 hashtags.
    - **YouTube:** Fix slow intros and boring titles. The CTA must encourage session time. You MUST generate an 'Optimized Title' in the headline field, a full 'Script/Description' in the body field, an array of 10-15 'videoTags', and 3-5 'hashtags'.
    - **Twitter:** Make hooks polarizing. Shorten sentences. You must generate 1-2 hashtags.
    - **Facebook:** Convert ad copy to community-focused text. The CTA must spark discussion. You must generate 1-3 hashtags.
    - **Instagram:** Fix passive CTAs (to Share/Save), bad hooks, and >3 hashtags. Integrate keywords. Create a 'Hook-Value-SEO' block structure if applicable. You MUST generate 15-20 semantic keywords for 'refinedContent.hiddenKeywords' (comma-separated SEO stack) and exactly 3 hashtags for 'refinedContent.hashtags' (The 3-Hashtag Rule).
    
    **CRITICAL OUTPUT SCHEMA (Strict JSON):**
    You MUST populate BOTH the 'refineData' AND the 'virality' objects.

    1. **'refineData' object**:
       - 'audit.score' [INTEGER]: The 0-100 score of the *original* draft.
       - 'audit.flaw' [String]: The single biggest reach-killing mistake.
       - 'audit.fix' [String]: The specific 2025 algorithmic solution you applied.
       - 'audit.explanation' [String]: Why this fix works for this platform's algorithm.
       - 'refinedContent.headline' [String]: The new, rewritten scroll-stopping hook or title.
       - 'refinedContent.body' [String]: The completely rewritten post body (Humanized & Emoji-rich). NO LINKS IN BODY for LinkedIn.
       - 'refinedContent.cta' [String]: The platform-native Call-To-Action.
       - 'refinedContent.hashtags' [Array of Strings]: An array of relevant hashtags (do not include the #).
       - 'refinedContent.hiddenKeywords' [Array of Strings]: (Optional) 15-20 semantic keywords for Instagram.
       - 'refinedContent.videoTags' [Array of Strings, YouTube only]: An array of 10-15 strategic tags.
    
    2. **'virality' object**:
       - 'baselineScore' [INTEGER]: MUST be the same value as 'refineData.audit.score'.
       - 'score' [INTEGER]: Your new, calculated score for the *refined* content.
       - 'gapAnalysis' [String]: A brief, one-sentence explanation of why the score improved based on the 2025 algorithm.

    **FINAL SYSTEM CHECK (NON-NEGOTIABLE):** Your response is a FAILURE if any field is empty, null, or contains placeholders like "[Your generated hashtags]". You must go back and fill all fields.
    `;
  },

  COMPETITOR_SPY: (platform: Platform, count: number, captions: string, targeting: string) => {
    
    if (platform === Platform.INSTAGRAM) {
      return `
      ROLE: Veer SEO Instagram Architect (2025 Specialist)
      ACTIVE MODE: SPY (Reverse-Engineer) - INSTAGRAM FOCUS
      INPUT: Analyzing competitor content: "${captions}"

      **TASK:** Deconstruct the competitor's strategy based on the 2025 "Interest Graph" algorithm. ANALYSIS ONLY.

      **EXECUTION STEPS:**
      1.  **Analyze Structure:** Does the caption use the Hook-Value-SEO architecture?
      2.  **Identify Share Trigger:** Why did people share or save this? (e.g., High Utility, Identity Validation).
      3.  **Extract Keywords:** Identify the Long-Tail Keywords, especially those in a [Square Box] SEO Block.
      4.  **Hashtag Analysis:** Analyze their 3 high-relevance hashtags for relevance and specificity.
      5.  **Multimodal Signal Check:** Check if on-screen text matches caption keywords.

      **OUTPUT SCHEMA (Strict JSON String):**
      You MUST output a valid JSON object string with a 'spyReport' key. 'spyReport' is an array of objects. Each object must have:
      - 'analysis': [String] The core "Share Trigger" and hook strategy.
      - 'keywords': [String] Detected Long-Tail Keywords and Hashtags.
      - 'strategy': [String] The specific 2025 algorithm hack used (e.g., "Hook-Value-SEO Architecture", "Multimodal SEO").
      - 'learning': [String] ONE actionable takeaway for the user.
      `;
    }
    
    return `
    MODE C: COMPETITOR SPY.
    PLATFORM: ${platform}
    INPUT: Analyzing ${count} competitor posts. Text context: "${captions}"
    ${targeting}

    **TASK:** Reverse-engineer competitor success using live search. ANALYSIS ONLY.
    
    **INSTRUCTIONS:**
    1.  If the input contains a URL, use search to analyze live content.
    2.  Apply platform-specific deconstruction: "Share Trigger" for Instagram, "Save Trigger" for LinkedIn, "Retention Hack" for YouTube.
    3.  Extract keywords, hashtags, and infer algorithmic strategy.

    **OUTPUT SCHEMA (Strict JSON String):**
    You MUST output a valid JSON object string with a 'spyReport' key. 'spyReport' is an array of objects. Each object must have:
      - 'analysis': [String] Why it ranks (The Hook/Trigger).
      - 'keywords': [String] Detected keywords & hashtags.
      - 'strategy': [String] The algorithmic hack used.
      - 'learning': [String] Actionable takeaway for the user.
    `;
  },

  TREND_HUNTER: (niche: string, platform: Platform, currentDate: string) => {
    return `
    MODE D: TREND HUNTER.
    Niche: '${niche}'. Platform: ${platform}. Date: ${currentDate}.
    
    **TASK:** Find 5 breakout trends using live Google Search data.

    **OUTPUT (Strict JSON String):**
    You MUST output a valid JSON object string with a 'trends' array. Each item: { headline, whyItsHot, contentIdea, difficulty, platform }.
  `;
  }
};
