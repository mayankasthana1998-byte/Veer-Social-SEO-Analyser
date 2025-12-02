
import React, { useState, useEffect } from 'react';
import { AppMode, Platform, AnalysisResult, FileInput, TrendItem, HistoryItem } from './types';
import { analyzeContent } from './services/geminiService';
import FileUpload from './components/FileUpload';
import AnalysisResultView from './components/AnalysisResultView';
import MasterclassGuide from './components/MasterclassGuide';
import GlobalSearch from './components/GlobalSearch';
import { 
  Sparkles, 
  BrainCircuit, 
  ArrowRight, 
  Loader2, 
  Settings2,
  Instagram,
  Linkedin,
  Youtube,
  Music2,
  Target,
  Cpu,
  Flame,
  Twitter,
  Facebook,
  Search,
  ShieldCheck,
  BookOpen,
  Eye,
  Crosshair,
  Key,
  Copy,
  Check,
  Sliders
} from 'lucide-react';

interface ConfigState {
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
}

const TONE_OPTIONS = ['Professional', 'Casual', 'Humorous', 'Contrarian', 'Empathetic', 'Authoritative', 'Urgent', 'Wholesome', 'Sarcastic', 'Inspirational'];
const GOAL_OPTIONS = ['Viral Reach', 'Saves', 'Shares', 'Comments', 'Clicks', 'Sales'];

const PLATFORM_FORMATS: Record<Platform, string[]> = {
  [Platform.INSTAGRAM]: ['Reel', 'Carousel', 'Static Post', 'Story'],
  [Platform.TIKTOK]: ['Vlog', 'Green Screen', 'Skit', 'Photo Mode'],
  [Platform.YOUTUBE]: ['Shorts', 'Long-form', 'Community Post'],
  [Platform.LINKEDIN]: ['Text Only', 'PDF/Carousel', 'Article', 'Video'],
  [Platform.TWITTER]: ['Thread', 'Short Tweet', 'Media Post'],
  [Platform.FACEBOOK]: ['Video', 'Image Post', 'Text Post'],
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATION);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [files, setFiles] = useState<FileInput[]>([]);
  const [brandFiles, setBrandFiles] = useState<FileInput[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [trendResults, setTrendResults] = useState<TrendItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showMasterclass, setShowMasterclass] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  // Trend Copy State
  const [copiedTrendIndex, setCopiedTrendIndex] = useState<number | null>(null);

  // --- HISTORY STATE ---
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('SOCIAL_SEO_HISTORY');
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = (mode: AppMode, data: AnalysisResult | TrendItem[], platform?: Platform, summary?: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mode,
      platform,
      data,
      summary: summary || 'Generated Strategy'
    };
    const updatedHistory = [newItem, ...history].slice(0, 50); // Keep last 50 items
    setHistory(updatedHistory);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if(confirm('Are you sure you want to clear your entire strategy archive?')) {
      setHistory([]);
      localStorage.removeItem('SOCIAL_SEO_HISTORY');
    }
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setMode(item.mode);
    if (item.platform) setPlatform(item.platform);
    
    // Clear current files as we can't restore File objects from local storage
    setFiles([]); 
    
    if (item.mode === AppMode.TREND_HUNTER) {
      setTrendResults(item.data as TrendItem[]);
      setResult(null);
    } else {
      setResult(item.data as AnalysisResult);
      setTrendResults(null);
    }
    
    setShowSearch(false);
  };

  // --- API KEY STATE ---
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showGatekeeper, setShowGatekeeper] = useState(true);

  useEffect(() => {
    // 1. Check Local Storage
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
      setShowGatekeeper(false);
    } 
    // 2. Check Environment Variable (for deployments that have it)
    else if (process.env.API_KEY) {
      setApiKey(process.env.API_KEY);
      setShowGatekeeper(false);
    }
  }, []);

  const handleSaveKey = () => {
    const keyToSave = apiKeyInput.trim();
    if (!keyToSave.startsWith('AIza')) {
      alert('Invalid Key format. It must start with "AIza".');
      return;
    }
    localStorage.setItem('GEMINI_API_KEY', keyToSave);
    setApiKey(keyToSave);
    setShowGatekeeper(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
    setApiKeyInput('');
    setShowGatekeeper(true);
  };

  const [config, setConfig] = useState<ConfigState>({
    goal: 'Viral Growth',
    style: 'Authentic',
    keywords: '',
    originalText: '',
    geography: '',
    targetAudience: '',
    targetLanguage: '',
    demographics: '',
    brandGuidelines: '',
    niche: '',
    tone: [],
    engagementGoal: [],
    contentFormat: ''
  });

  // Reset Format when Platform changes
  useEffect(() => {
     setConfig(prev => ({
        ...prev,
        contentFormat: PLATFORM_FORMATS[platform][0]
     }));
  }, [platform]);

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setLoadingProgress(0);
      setLoadingMessage('Initializing Security Handshake...');
      
      const startTime = Date.now();
      const estimatedDuration = 15000; 

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = (elapsed / estimatedDuration) * 100;
        if (progress > 90) progress = 90;
        setLoadingProgress(progress);

        if (progress < 25) {
          setLoadingMessage('Encrypting Media Packets...');
        } else if (progress < 50) {
          setLoadingMessage('Analyzing Visual Semantics...');
        } else if (progress < 75) {
          if (mode === AppMode.TREND_HUNTER) {
            setLoadingMessage('Scanning Global Trend Database...');
          } else {
            setLoadingMessage('Running Psychological Hooks...'); 
          }
        } else {
          setLoadingMessage(mode === AppMode.TREND_HUNTER ? 'Extracting Viral Patterns...' : 'Constructing Strategy...');
        }

      }, 100);
    } else {
      if (result || trendResults) setLoadingProgress(100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isAnalyzing, mode, result, trendResults]);

  const handleAnalyze = async () => {
    if (mode === AppMode.GENERATION && files.length === 0) { alert("Upload content first, boss."); return; }
    if (mode === AppMode.REFINE && !config.originalText) { alert("Need some text to cook."); return; }
    if (mode === AppMode.TREND_HUNTER && !config.niche) { alert("What niche are we hunting?"); return; }
    if (mode === AppMode.COMPETITOR_SPY && files.length < 2) { alert("Spy Mode needs at least 2 competitor screenshots/videos to find patterns."); return; }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setTrendResults(null);

    try {
      const filesToAnalyze = files.map(f => f.file);
      
      // Pass the API Key explicitly
      const data = await analyzeContent(apiKey, filesToAnalyze, mode, platform, config);
      
      if (mode === AppMode.TREND_HUNTER) {
        const trends = data as TrendItem[];
        setTrendResults(trends);
        addToHistory(mode, trends, undefined, `Trend Hunt: ${config.niche}`);
      } else {
        const analysis = data as AnalysisResult;
        setResult(analysis);
        addToHistory(mode, analysis, platform, analysis.strategy.headline || 'Strategy Analysis');
      }
    } catch (err: any) {
      setError(err.message || "Something glitched.");
      if (err.message?.includes("API Key")) {
        // Option to reset key if it failed
        if (confirm("API Key seems invalid. Reset it?")) {
          clearApiKey();
        }
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseTrend = (trend: TrendItem) => {
    setMode(AppMode.GENERATION);
    setConfig(prev => ({
      ...prev,
      tone: ['Urgent', 'Hype'],
      engagementGoal: ['Viral Reach'],
      keywords: trend.headline,
    }));
    alert(`Trend "${trend.headline}" Loaded. Drop the media.`);
  };

  const handleCopyTrend = (trend: TrendItem, index: number) => {
    const text = `TREND: ${trend.headline}\nWHY: ${trend.whyItsHot}\nIDEA: ${trend.contentIdea}`;
    navigator.clipboard.writeText(text);
    setCopiedTrendIndex(index);
    setTimeout(() => setCopiedTrendIndex(null), 2000);
  };

  const toggleSelection = (field: 'tone' | 'engagementGoal', value: string) => {
    setConfig(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const ModeButton = ({ m, icon: Icon, label, desc }: { m: AppMode, icon: any, label: string, desc: string }) => (
    <button
      onClick={() => { setMode(m); setResult(null); setTrendResults(null); if(m !== AppMode.TREND_HUNTER) setFiles([]); setConfig({...config, originalText: ''}); }}
      className={`relative p-4 rounded-3xl transition-all duration-300 w-full text-left overflow-hidden group ${
        mode === m 
          ? 'bg-indigo-600 text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] scale-[1.02]' 
          : 'bg-slate-900/40 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity ${mode === m ? 'opacity-100' : ''}`}>
        <ArrowRight className="w-4 h-4 -rotate-45" />
      </div>
      <Icon className={`w-8 h-8 mb-4 ${mode === m ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`} />
      <span className="block font-black text-lg tracking-tight mb-0.5">{label}</span>
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{desc}</span>
    </button>
  );

  // --- API GATEKEEPER UI ---
  if (showGatekeeper) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="bg-noise"></div>
        <div className="aurora-blob w-[500px] h-[500px] bg-indigo-600/20"></div>
        
        <div className="relative z-10 max-w-md w-full bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-center text-white mb-2 tracking-tight">SocialSEO AI</h1>
          <p className="text-slate-400 text-center text-sm mb-8 font-medium">Initialize Andromeda Engine</p>
          
          <div className="space-y-4">
            <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl mb-4">
              <h3 className="text-xs font-bold text-indigo-300 mb-2 flex items-center gap-2">
                <Key className="w-3 h-3" /> REQUIRED: API ACCESS
              </h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                To use the AI features, you need a free API Key from Google.
              </p>
              <ol className="list-decimal ml-4 mt-2 text-[10px] text-slate-300 space-y-1">
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-white underline hover:text-indigo-400">Google AI Studio</a>.</li>
                <li>Click "Create API Key".</li>
                <li>Copy the key starting with "AIza".</li>
                <li>Paste it below.</li>
              </ol>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 mb-1 block">Your API Key</label>
              <input 
                type="password" 
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
              />
            </div>
            <button 
              onClick={handleSaveKey}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/20"
            >
              ACTIVATE SYSTEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div className="min-h-screen text-slate-200 pb-20 selection:bg-indigo-500/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="aurora-blob w-[800px] h-[800px] bg-indigo-900/20 top-[-20%] left-[-10%]"></div>
        <div className="aurora-blob w-[600px] h-[600px] bg-purple-900/20 bottom-[-10%] right-[-10%] animation-delay-4000"></div>
      </div>

      {/* OVERLAYS */}
      {showMasterclass && <MasterclassGuide onClose={() => setShowMasterclass(false)} />}
      <GlobalSearch 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
        history={history}
        onSelect={restoreFromHistory}
        onDelete={deleteFromHistory}
        onClear={clearHistory}
      />

      {/* FLOATING NAVBAR */}
      <div className="sticky top-4 z-50 px-4 mb-8">
        <header className="max-w-6xl mx-auto h-16 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-white hidden sm:block">SocialSEO</span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* SEARCH BUTTON */}
             <button
               onClick={() => setShowSearch(true)}
               className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition-colors"
               title="Search History"
             >
                <Search className="w-5 h-5" />
             </button>

             <button
               onClick={() => setShowMasterclass(true)}
               className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 hover:text-white rounded-full transition-all border border-indigo-500/30"
             >
               <BookOpen className="w-4 h-4" />
               <span className="text-xs font-bold">ACADEMY</span>
             </button>

             <div className="hidden md:flex items-center px-3 py-1 bg-black/40 rounded-full border border-white/5 gap-2 group cursor-pointer" onClick={() => { if(confirm('Disconnect API Key?')) clearApiKey(); }}>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:bg-red-500"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-red-400">System Online</span>
             </div>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Mode Grid */}
          <div className="grid grid-cols-2 gap-3">
            <ModeButton m={AppMode.GENERATION} icon={Sparkles} label="Create" desc="Media to Viral" />
            <ModeButton m={AppMode.REFINE} icon={Settings2} label="Refine" desc="Polish Drafts" />
            <ModeButton m={AppMode.COMPETITOR_SPY} icon={BrainCircuit} label="Spy" desc="Reverse Engineer" />
            <ModeButton m={AppMode.TREND_HUNTER} icon={Flame} label="Hunt" desc="Live Trends" />
          </div>

          {/* Config Panel */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 backdrop-blur-md space-y-6">
            
            {/* Platform Selector */}
            {mode !== AppMode.COMPETITOR_SPY && mode !== AppMode.TREND_HUNTER && (
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-wider">Destination</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: Platform.INSTAGRAM, icon: Instagram, label: 'Insta' },
                    { id: Platform.TIKTOK, icon: Music2, label: 'TikTok' },
                    { id: Platform.YOUTUBE, icon: Youtube, label: 'YT' },
                    { id: Platform.TWITTER, icon: Twitter, label: 'X' },
                    { id: Platform.LINKEDIN, icon: Linkedin, label: 'Linked' },
                    { id: Platform.FACEBOOK, icon: Facebook, label: 'FB' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        platform === p.id 
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' 
                          : 'bg-black/20 border-white/5 text-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <p.icon size={16} />
                      <span className="text-xs font-bold">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Refinement (Tone, Goal, Format) */}
            {mode === AppMode.GENERATION && (
              <div className="animate-fade-in space-y-4">
                 <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                    <Sliders className="w-3 h-3" /> Strategy Refinement
                 </label>
                 
                 {/* Format Selector */}
                 <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase mb-2 block">Content Format</label>
                    <select 
                      value={config.contentFormat}
                      onChange={(e) => setConfig({...config, contentFormat: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2 outline-none focus:border-indigo-500"
                    >
                      {PLATFORM_FORMATS[platform].map((fmt) => (
                         <option key={fmt} value={fmt}>{fmt}</option>
                      ))}
                    </select>
                 </div>

                 {/* Engagement Goal */}
                 <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-pink-300 uppercase mb-2 block">Engagement Goals (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {GOAL_OPTIONS.map((g) => (
                          <button 
                             key={g}
                             onClick={() => toggleSelection('engagementGoal', g)}
                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                config.engagementGoal.includes(g)
                                ? 'bg-pink-600 border-pink-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                             }`}
                          >
                             {g}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Tone */}
                 <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-cyan-300 uppercase mb-2 block">Tone of Voice (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {TONE_OPTIONS.map((t) => (
                          <button 
                             key={t}
                             onClick={() => toggleSelection('tone', t)}
                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                config.tone.includes(t)
                                ? 'bg-cyan-600 border-cyan-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                             }`}
                          >
                             {t}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {/* Brand Guard */}
            {mode !== AppMode.TREND_HUNTER && (
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Brand Guard
                  </label>
                  <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-3">
                    <textarea 
                      className="w-full h-16 bg-transparent text-xs text-white focus:outline-none resize-none placeholder-slate-600 font-mono"
                      placeholder="// ENTER STRICT RULES..."
                      value={config.brandGuidelines}
                      onChange={(e) => setConfig({...config, brandGuidelines: e.target.value})}
                    />
                    <div className="h-px bg-white/10 w-full"></div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-500">OR UPLOAD GUIDE</span>
                       <div className="scale-75 origin-right">
                          <FileUpload files={brandFiles} setFiles={setBrandFiles} />
                       </div>
                    </div>
                  </div>
               </div>
            )}

            {/* Targeting Inputs */}
            {mode !== AppMode.TREND_HUNTER && (
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Targeting
                </label>
                <div className="grid grid-cols-2 gap-2">
                   {['Geography', 'Language', 'Audience', 'Demographics'].map((placeholder, i) => (
                     <input 
                        key={i}
                        type="text"
                        placeholder={placeholder}
                        value={Object.values(config)[i + 4] as string} // quick mapping
                        onChange={(e) => {
                           const key = Object.keys(config)[i + 4] as keyof ConfigState;
                           setConfig({...config, [key]: e.target.value});
                        }}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-2 px-3 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                     />
                   ))}
                </div>
              </div>
            )}

            {/* DYNAMIC MODE INPUTS */}
            {mode === AppMode.TREND_HUNTER && (
              <div className="pt-2 animate-fade-in">
                 <label className="text-[10px] font-black text-orange-400 uppercase mb-3 block tracking-wider">Target Niche</label>
                 <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <input 
                      type="text"
                      className="relative w-full bg-slate-900 border border-orange-500/30 rounded-2xl py-4 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="e.g. AI Tech, Vegan Food, Crypto..."
                      value={config.niche}
                      onChange={(e) => setConfig({...config, niche: e.target.value})}
                    />
                    <Search className="absolute left-3 top-4 w-5 h-5 text-orange-500" />
                 </div>
              </div>
            )}

            {mode === AppMode.REFINE && (
              <div className="pt-2 animate-fade-in">
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-wider">Rough Draft</label>
                <textarea 
                  className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="Paste your messy thoughts here..."
                  value={config.originalText}
                  onChange={(e) => setConfig({...config, originalText: e.target.value})}
                />
              </div>
            )}
            
            {/* SPY MODE INPUTS */}
            {mode === AppMode.COMPETITOR_SPY && (
              <div className="pt-2 animate-fade-in space-y-4">
                 <div className="p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl">
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center">
                       <Crosshair className="w-3 h-3 mr-2" />
                       Step 1: The Captions
                    </h4>
                    <p className="text-[10px] text-slate-400 mb-3">
                       Paste the captions used by your competitors here. The AI will cross-reference these with the visual screenshots below.
                    </p>
                    <textarea 
                      className="w-full h-24 bg-black/40 border border-indigo-500/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
                      placeholder="// Paste competitor captions..."
                      value={config.originalText}
                      onChange={(e) => setConfig({...config, originalText: e.target.value})}
                    />
                 </div>
                 
                 <div>
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center">
                       <Eye className="w-3 h-3 mr-2" />
                       Step 2: The Visuals
                    </h4>
                    <p className="text-[10px] text-slate-400 mb-2">Upload 6-7 screenshots/videos for pattern recognition.</p>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: OUTPUT / UPLOAD */}
        <div className="lg:col-span-7">
          
          {/* 1. UPLOAD AREA (Hidden in Refine/Trend modes) */}
          {(mode === AppMode.GENERATION || mode === AppMode.COMPETITOR_SPY) && (
             <div className="mb-6 animate-fade-in">
               <FileUpload files={files} setFiles={setFiles} multiple={mode === AppMode.COMPETITOR_SPY} />
             </div>
          )}

          {/* 2. MAIN ACTION BUTTON */}
          <div className="relative group mb-8">
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000 ${isAnalyzing ? 'opacity-50 animate-pulse' : ''}`}></div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="relative w-full bg-slate-900 border border-white/10 hover:border-white/20 text-white font-black text-xl py-6 rounded-2xl transition-all hover:-translate-y-1 active:scale-[0.99] flex items-center justify-center gap-3 overflow-hidden"
            >
              {isAnalyzing ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                     SYSTEM PROCESSING...
                   </span>
                 </>
              ) : (
                 <>
                   {mode === AppMode.TREND_HUNTER ? <Flame className="w-6 h-6 text-orange-500" /> : <Cpu className="w-6 h-6 text-indigo-500" />}
                   <span>
                     {mode === AppMode.GENERATION && "INITIALIZE GENERATION"}
                     {mode === AppMode.REFINE && "OPTIMIZE DRAFT"}
                     {mode === AppMode.COMPETITOR_SPY && "DECODE COMPETITORS"}
                     {mode === AppMode.TREND_HUNTER && "HUNT VIRAL TOPICS"}
                   </span>
                 </>
              )}
            </button>
          </div>

          {/* 3. ERROR & LOADING */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-200 text-sm text-center font-bold animate-shake flex items-center justify-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
               {error}
            </div>
          )}

          {isAnalyzing && (
            <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                <span>System Status</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                   <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>
              <p className="text-center text-sm font-mono text-indigo-300 animate-pulse">
                {">"} {loadingMessage}
              </p>
            </div>
          )}

          {/* 4. RESULTS */}
          {result && <AnalysisResultView result={result} mode={mode} />}

          {/* 5. TREND RESULTS */}
          {trendResults && (
             <div className="space-y-4 animate-fade-in">
               <h3 className="text-xl font-black text-white flex items-center gap-2 mb-4">
                  <Flame className="text-orange-500" /> LIVE TREND DATABASE
               </h3>
               {trendResults.map((trend, i) => (
                  <div key={i} className="bg-slate-900/60 border border-slate-800 hover:border-orange-500/30 p-6 rounded-3xl group transition-all relative">
                     <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-black text-white">{trend.headline}</h4>
                        <div className="flex gap-2">
                           <button
                             onClick={() => handleCopyTrend(trend, i)}
                             className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                             title="Copy Trend"
                           >
                              {copiedTrendIndex === i ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                           </button>
                           <span className="text-[10px] font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20 flex items-center">HOT</span>
                        </div>
                     </div>
                     <p className="text-sm text-slate-400 mb-4">{trend.whyItsHot}</p>
                     <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-4">
                        <p className="text-xs text-slate-300 font-mono">💡 {trend.contentIdea}</p>
                     </div>
                     <button 
                       onClick={() => handleUseTrend(trend)}
                       className="w-full py-3 bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider"
                     >
                        USE THIS TREND
                     </button>
                  </div>
               ))}
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
