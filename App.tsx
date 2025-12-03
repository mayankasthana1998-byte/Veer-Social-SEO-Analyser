
import React, { useState, useEffect } from 'react';
import { AppMode, Platform, AnalysisResult, FileInput, TrendItem, HistoryItem } from './types';
import { analyzeContent } from './services/geminiService';
import FileUpload from './components/FileUpload';
import AnalysisResultView from './components/AnalysisResultView';
import MasterclassGuide from './components/MasterclassGuide';
import GlobalSearch from './components/GlobalSearch';
import WelcomeModal from './components/WelcomeModal';
import { 
  Sparkles, 
  BrainCircuit, 
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
  Sliders,
  RefreshCcw,
  ArrowRight
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
  const [isKeyError, setIsKeyError] = useState(false); // Track if error is key-related
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [showMasterclass, setShowMasterclass] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

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
    const updatedHistory = [newItem, ...history].slice(50); // Keep last 50 items
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

    // Check Welcome Modal
    const hasSeenWelcome = localStorage.getItem('HAS_SEEN_WELCOME');
    if (!hasSeenWelcome) {
      // Delay slightly to ensure load
      setTimeout(() => setShowWelcome(true), 1000);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('HAS_SEEN_WELCOME', 'true');
  };

  const handleSaveKey = () => {
    const keyToSave = apiKeyInput.trim();
    if (!keyToSave.startsWith('AIza')) {
      alert('Invalid Key format. It must start with "AIza".');
      return;
    }
    localStorage.setItem('GEMINI_API_KEY', keyToSave);
    setApiKey(keyToSave);
    setShowGatekeeper(false);
    setIsKeyError(false); // Clear error state on new key
    setError(null);
    
    // Show welcome on first login if not seen
    const hasSeenWelcome = localStorage.getItem('HAS_SEEN_WELCOME');
    if (!hasSeenWelcome) {
       setTimeout(() => setShowWelcome(true), 1000);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
    setApiKeyInput('');
    setShowGatekeeper(true);
    setIsKeyError(false);
    setError(null);
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
            setLoadingMessage(`Scanning Live ${platform} Trends...`);
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
  }, [isAnalyzing, mode, result, trendResults, platform]);

  const handleAnalyze = async () => {
    if (mode === AppMode.GENERATION && files.length === 0) { alert("Upload content first, boss."); return; }
    if (mode === AppMode.REFINE && !config.originalText) { alert("Need some text to cook."); return; }
    if (mode === AppMode.TREND_HUNTER && !config.niche) { alert("What niche are we hunting?"); return; }
    if (mode === AppMode.COMPETITOR_SPY && files.length < 2) { alert("Spy Mode needs at least 2 competitor screenshots/videos to find patterns."); return; }

    setIsAnalyzing(true);
    setError(null);
    setIsKeyError(false);
    setResult(null);
    setTrendResults(null);

    try {
      const filesToAnalyze = files.map(f => f.file);
      
      // Pass the API Key explicitly
      const data = await analyzeContent(apiKey, filesToAnalyze, mode, platform, config);
      
      if (mode === AppMode.TREND_HUNTER) {
        const trends = data as TrendItem[];
        setTrendResults(trends);
        addToHistory(mode, trends, platform, `Trend Hunt (${platform}): ${config.niche}`);
      } else {
        const analysis = data as AnalysisResult;
        setResult(analysis);
        addToHistory(mode, analysis, platform, analysis.strategy.headline || 'Strategy Analysis');
      }
    } catch (err: any) {
      let errorMessage = err.message || "Something glitched.";
      
      // Handle the custom "INVALID_KEY" error from service
      if (errorMessage === "INVALID_KEY") {
        errorMessage = "API Key Invalid or Expired. Please reset it.";
        setIsKeyError(true);
      }
      
      setError(errorMessage);
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
      className={`relative p-5 rounded-[20px] transition-all duration-300 w-full text-left overflow-hidden group ${
        mode === m 
          ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] scale-[1.02] border border-white/20' 
          : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:border-slate-600 backdrop-blur-sm'
      }`}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity ${mode === m ? 'opacity-100' : ''}`}>
        <ArrowRight className="w-5 h-5 -rotate-45" />
      </div>
      <Icon className={`w-8 h-8 mb-4 ${mode === m ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`} />
      <span className="block font-black text-lg tracking-tight mb-1">{label}</span>
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{desc}</span>
    </button>
  );

  // --- API GATEKEEPER UI ---
  if (showGatekeeper) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-inter">
        <div className="bg-grid"></div>
        <div className="aurora-blob w-[500px] h-[500px] bg-indigo-600/20"></div>
        
        <div className="relative z-10 max-w-md w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl animate-fade-in ring-1 ring-white/5">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_-10px_rgba(99,102,241,0.5)] rotate-3 hover:rotate-6 transition-transform">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-center text-white mb-2 tracking-tighter">SocialSEO</h1>
          <p className="text-indigo-300 text-center text-sm mb-8 font-bold tracking-widest uppercase">Andromeda Engine</p>
          
          <div className="space-y-6">
            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>
              <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-400" /> ACCESS REQUIRED
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Connect your Neural Interface. You need a standard Gemini API Key.
              </p>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="inline-flex items-center text-[10px] font-bold text-indigo-400 hover:text-white transition-colors border border-indigo-500/30 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20">
                 GET FREE KEY <ArrowRight className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div>
              <input 
                type="password" 
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm placeholder-slate-600 shadow-inner"
              />
            </div>
            <button 
              onClick={handleSaveKey}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] active:scale-95 text-sm tracking-wide"
            >
              INITIALIZE SYSTEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div className="min-h-screen text-slate-200 pb-20 selection:bg-indigo-500/30 font-inter">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="aurora-blob w-[800px] h-[800px] bg-indigo-600/10 top-[-20%] left-[-10%]"></div>
        <div className="aurora-blob w-[600px] h-[600px] bg-purple-600/10 bottom-[-10%] right-[-10%] animation-delay-4000"></div>
      </div>

      {/* OVERLAYS */}
      {showWelcome && (
        <WelcomeModal 
          onClose={handleWelcomeClose} 
          onOpenAcademy={() => { handleWelcomeClose(); setShowMasterclass(true); }} 
        />
      )}
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
        <header className="max-w-6xl mx-auto h-20 bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between px-6 shadow-2xl ring-1 ring-black/20">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white hidden sm:block">SocialSEO</span>
          </div>
          
          <div className="flex items-center gap-3">
             {/* SEARCH BUTTON */}
             <button
               onClick={() => setShowSearch(true)}
               className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5"
               title="Search History"
             >
                <Search className="w-5 h-5" />
             </button>

             {/* ACADEMY BUTTON - RESPONSIVE */}
             <button
               onClick={() => setShowMasterclass(true)}
               className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-white rounded-full transition-all border border-indigo-500/20 hover:border-indigo-500/50"
             >
               <BookOpen className="w-4 h-4" />
               <span className="text-xs font-black tracking-wide hidden md:block">ACADEMY</span>
             </button>

             {/* API KEY BUTTON - RESPONSIVE */}
             <button
               onClick={() => { if(confirm('Change or Disconnect API Key?')) clearApiKey(); }}
               className="flex items-center gap-2 px-3 md:px-4 py-2 bg-black/40 rounded-full border border-white/5 group hover:border-red-500/30 transition-all hover:bg-red-500/10"
               title="API Key Settings"
             >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse group-hover:bg-red-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-red-400 hidden md:block">SYSTEM ONLINE</span>
             </button>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Mode Grid */}
          <div className="grid grid-cols-2 gap-4">
            <ModeButton m={AppMode.GENERATION} icon={Sparkles} label="Create" desc="Media to Viral" />
            <ModeButton m={AppMode.REFINE} icon={Settings2} label="Refine" desc="Polish Drafts" />
            <ModeButton m={AppMode.COMPETITOR_SPY} icon={BrainCircuit} label="Spy" desc="Reverse Engineer" />
            <ModeButton m={AppMode.TREND_HUNTER} icon={Flame} label="Hunt" desc="Live Trends" />
          </div>

          {/* Config Panel */}
          <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
             {/* Glow effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* Platform Selector - ENABLED FOR TREND HUNTER NOW */}
            {mode !== AppMode.COMPETITOR_SPY && (
              <div className="mb-8">
                <label className="text-[10px] font-black text-slate-500 uppercase mb-4 block tracking-widest pl-2">
                   {mode === AppMode.TREND_HUNTER ? 'Select Platform Source' : 'Destination Protocol'}
                </label>
                <div className="grid grid-cols-3 gap-3">
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
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                        platform === p.id 
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] scale-105' 
                          : 'bg-black/40 border-white/5 text-slate-500 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <p.icon size={20} />
                      <span className="text-[10px] font-bold uppercase">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Refinement (Tone, Goal, Format) */}
            {mode === AppMode.GENERATION && (
              <div className="animate-fade-in space-y-5">
                 <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 pl-2">
                    <Sliders className="w-3 h-3" /> Hyper-Targeting
                 </label>
                 
                 {/* Format Selector */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase mb-2 block tracking-wider">Content Format</label>
                    <select 
                      value={config.contentFormat}
                      onChange={(e) => setConfig({...config, contentFormat: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors"
                    >
                      {PLATFORM_FORMATS[platform].map((fmt) => (
                         <option key={fmt} value={fmt}>{fmt}</option>
                      ))}
                    </select>
                 </div>

                 {/* Engagement Goal */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-pink-400 uppercase mb-3 block tracking-wider">Engagement Goals (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {GOAL_OPTIONS.map((g) => (
                          <button 
                             key={g}
                             onClick={() => toggleSelection('engagementGoal', g)}
                             className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                config.engagementGoal.includes(g)
                                ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                             }`}
                          >
                             {g}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Tone */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-cyan-400 uppercase mb-3 block tracking-wider">Tone of Voice (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {TONE_OPTIONS.map((t) => (
                          <button 
                             key={t}
                             onClick={() => toggleSelection('tone', t)}
                             className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                config.tone.includes(t)
                                ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-600/20'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
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
               <div className="mt-6">
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 pl-2">
                    <ShieldCheck className="w-3 h-3" /> Brand Guard
                  </label>
                  <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                    <textarea 
                      className="w-full h-20 bg-transparent text-xs text-white focus:outline-none resize-none placeholder-slate-600 font-mono"
                      placeholder="// ENTER STRICT BRAND RULES..."
                      value={config.brandGuidelines}
                      onChange={(e) => setConfig({...config, brandGuidelines: e.target.value})}
                    />
                    <div className="h-px bg-white/5 w-full"></div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-500">OR UPLOAD GUIDE</span>
                       <div className="scale-75 origin-right">
                          <FileUpload files={brandFiles} setFiles={setFiles} />
                       </div>
                    </div>
                  </div>
               </div>
            )}

            {/* Targeting Inputs */}
            {mode !== AppMode.TREND_HUNTER && (
              <div className="mt-6">
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 pl-2">
                  <Target className="w-3 h-3" /> Audience Matrix
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                     />
                   ))}
                </div>
              </div>
            )}

            {/* DYNAMIC MODE INPUTS */}
            {mode === AppMode.TREND_HUNTER && (
              <div className="pt-2 animate-fade-in">
                 <label className="text-[10px] font-black text-orange-400 uppercase mb-3 block tracking-widest pl-2">Target Niche</label>
                 <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <input 
                      type="text"
                      className="relative w-full bg-slate-900 border border-orange-500/30 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="e.g. AI Tech, Vegan Food, Crypto..."
                      value={config.niche}
                      onChange={(e) => setConfig({...config, niche: e.target.value})}
                    />
                    <Search className="absolute left-4 top-4 w-5 h-5 text-orange-500" />
                 </div>
              </div>
            )}

            {mode === AppMode.REFINE && (
              <div className="pt-2 animate-fade-in">
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-widest pl-2">Raw Draft Input</label>
                <textarea 
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-indigo-500 outline-none resize-none font-medium leading-relaxed"
                  placeholder="Paste your messy thoughts here..."
                  value={config.originalText}
                  onChange={(e) => setConfig({...config, originalText: e.target.value})}
                />
              </div>
            )}
            
            {/* SPY MODE INPUTS */}
            {mode === AppMode.COMPETITOR_SPY && (
              <div className="pt-2 animate-fade-in space-y-4">
                 <div className="p-5 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center">
                       <Crosshair className="w-3 h-3 mr-2" />
                       Step 1: The Captions
                    </h4>
                    <p className="text-[10px] text-slate-400 mb-3">
                       Paste the captions used by your competitors here. The AI will cross-reference these with the visual screenshots below.
                    </p>
                    <textarea 
                      className="w-full h-32 bg-black/40 border border-indigo-500/30 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono leading-relaxed"
                      placeholder="// Paste competitor captions..."
                      value={config.originalText}
                      onChange={(e) => setConfig({...config, originalText: e.target.value})}
                    />
                 </div>
                 
                 <div className="pl-2">
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center">
                       <Eye className="w-3 h-3 mr-2" />
                       Step 2: The Visuals
                    </h4>
                    <p className="text-[10px] text-slate-400">Upload 2+ screenshots/videos for pattern recognition.</p>
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
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000 ${isAnalyzing ? 'opacity-50 animate-pulse' : ''}`}></div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="relative w-full bg-slate-950 border border-white/10 hover:border-white/20 text-white font-black text-xl py-8 rounded-[1.5rem] transition-all hover:-translate-y-1 active:scale-[0.99] flex items-center justify-center gap-4 overflow-hidden z-10"
            >
              {isAnalyzing ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-wide">
                     NEURAL PROCESSING...
                   </span>
                 </>
              ) : (
                 <>
                   {mode === AppMode.TREND_HUNTER ? <Flame className="w-6 h-6 text-orange-500" /> : <Cpu className="w-6 h-6 text-indigo-500" />}
                   <span className="tracking-wide">
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
            <div className="mb-8 p-6 bg-red-950/30 border border-red-500/50 rounded-2xl text-red-200 text-sm text-center font-bold animate-shake flex flex-col items-center justify-center gap-2">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                 {error}
               </div>
               
               {isKeyError && (
                 <button 
                   onClick={clearApiKey}
                   className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
                 >
                   <RefreshCcw className="w-3 h-3" /> RESET API KEY
                 </button>
               )}
            </div>
          )}

          {isAnalyzing && (
            <div className="mb-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                <span>System Status</span>
                <span className="text-white">{Math.round(loadingProgress)}%</span>
              </div>
              <div className="h-4 bg-black rounded-full overflow-hidden mb-6 border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 ease-out relative shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  style={{ width: `${loadingProgress}%` }}
                >
                   <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>
              <p className="text-center text-sm font-mono text-indigo-300 animate-pulse flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                {loadingMessage}
              </p>
            </div>
          )}

          {/* 4. RESULTS */}
          {result && <AnalysisResultView result={result} mode={mode} />}

          {/* 5. TREND RESULTS */}
          {trendResults && (
             <div className="space-y-4 animate-fade-in">
               <h3 className="text-xl font-black text-white flex items-center gap-3 mb-6 bg-slate-900/50 p-4 rounded-2xl border border-white/5 inline-flex">
                  <div className="p-1 bg-orange-500/20 rounded-lg"><Flame className="w-5 h-5 text-orange-500" /></div>
                  LIVE {platform.toUpperCase()} TRENDS
               </h3>
               {trendResults.map((trend, i) => (
                  <div key={i} className="bg-slate-900/40 border border-white/5 hover:border-orange-500/40 p-6 rounded-[2rem] group transition-all relative backdrop-blur-md hover:bg-slate-900/60">
                     <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-black text-white leading-tight pr-4">{trend.headline}</h4>
                        <div className="flex gap-2 shrink-0">
                           <button
                             onClick={() => handleCopyTrend(trend, i)}
                             className="p-2 rounded-xl bg-slate-800 hover:bg-white text-slate-400 hover:text-slate-900 transition-colors"
                             title="Copy Trend"
                           >
                              {copiedTrendIndex === i ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                           </button>
                           <span className="text-[10px] font-bold bg-orange-500/10 text-orange-400 px-3 py-2 rounded-xl border border-orange-500/20 flex items-center animate-pulse">HOT</span>
                        </div>
                     </div>
                     <p className="text-sm text-slate-300 mb-6 leading-relaxed">{trend.whyItsHot}</p>
                     <div className="bg-black/40 p-5 rounded-2xl border border-white/5 mb-6">
                        <p className="text-xs text-indigo-200 font-mono">💡 {trend.contentIdea}</p>
                     </div>
                     <div className="flex justify-between items-center mb-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                       <span>Platform: {trend.platform}</span>
                       <span>Difficulty: {trend.difficulty}</span>
                     </div>
                     <button 
                       onClick={() => handleUseTrend(trend)}
                       className="w-full py-4 bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest border border-orange-500/20 hover:border-orange-500"
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
