
import React, { useState, useEffect } from 'react';
import { AppMode, Platform, AnalysisResult, FileInput, TrendItem, HistoryItem } from './types';
import { analyzeContent } from './services/geminiService';
import AnalysisResultView from './components/AnalysisResultView';
import MasterclassGuide from './components/MasterclassGuide';
import GlobalSearch from './components/GlobalSearch';
import WelcomeModal from './components/WelcomeModal';
import CreateView from './components/views/CreateView';
import RefineView from './components/views/RefineView';
import SpyView from './components/views/SpyView';
import HuntView from './components/views/HuntView';

import { 
  Sparkles, BrainCircuit, Loader2, Settings2, Flame, Search, 
  BookOpen, Key, ArrowUpRight
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
  // Refine Specific
  refinePlatform?: Platform;
  refineFormat?: string;
}

const App: React.FC = () => {
  // --- GLOBAL STATE ---
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATION);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [files, setFiles] = useState<FileInput[]>([]);
  const [brandFiles, setBrandFiles] = useState<FileInput[]>([]);
  
  // --- CONFIG STATE ---
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
    contentFormat: '',
    refinePlatform: Platform.INSTAGRAM,
    refineFormat: ''
  });

  // --- UI STATE ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [trendResults, setTrendResults] = useState<TrendItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isKeyError, setIsKeyError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [showMasterclass, setShowMasterclass] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [copiedTrendIndex, setCopiedTrendIndex] = useState<number | null>(null);

  // --- HISTORY LOGIC ---
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
    const updatedHistory = [newItem, ...history].slice(50);
    setHistory(updatedHistory);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if(confirm('Clear entire archives?')) {
      setHistory([]);
      localStorage.removeItem('SOCIAL_SEO_HISTORY');
    }
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setMode(item.mode);
    if (item.platform) setPlatform(item.platform);
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

  // --- API KEY LOGIC ---
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showGatekeeper, setShowGatekeeper] = useState(true);

  useEffect(() => {
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
      setShowGatekeeper(false);
    } else if (process.env.API_KEY) {
      setApiKey(process.env.API_KEY);
      setShowGatekeeper(false);
    }
    const hasSeenWelcome = localStorage.getItem('HAS_SEEN_WELCOME');
    if (!hasSeenWelcome && !showGatekeeper) {
      setTimeout(() => setShowWelcome(true), 1000);
    }
  }, [showGatekeeper]);

  const handleSaveKey = () => {
    const keyToSave = apiKeyInput.trim();
    if (!keyToSave.startsWith('AIza')) {
      alert('Invalid Key format.');
      return;
    }
    localStorage.setItem('GEMINI_API_KEY', keyToSave);
    setApiKey(keyToSave);
    setShowGatekeeper(false);
    setIsKeyError(false);
    setError(null);
  };

  const clearApiKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
    setApiKeyInput('');
    setShowGatekeeper(true);
  };

  // --- ANALYSIS LOGIC ---
  const handleAnalyze = async () => {
    if (mode === AppMode.GENERATION && files.length === 0) { alert("Upload media first."); return; }
    if (mode === AppMode.REFINE && !config.originalText) { alert("Need text input."); return; }
    if (mode === AppMode.TREND_HUNTER && !config.niche) { alert("Enter a niche."); return; }
    if (mode === AppMode.COMPETITOR_SPY && files.length < 2) { alert("Upload at least 2 competitor visuals."); return; }

    setIsAnalyzing(true);
    setError(null);
    setIsKeyError(false);
    setResult(null);
    setTrendResults(null);

    try {
      const filesToAnalyze = files.map(f => f.file);
      const data = await analyzeContent(apiKey, filesToAnalyze, mode, platform, config);
      
      if (mode === AppMode.TREND_HUNTER) {
        const trends = data as TrendItem[];
        setTrendResults(trends);
        addToHistory(mode, trends, platform, `Trend Hunt: ${config.niche}`);
      } else {
        const analysis = data as AnalysisResult;
        setResult(analysis);
        addToHistory(mode, analysis, platform, analysis.strategy.headline || 'Strategy Analysis');
      }
    } catch (err: any) {
      let errorMessage = err.message || "Analysis Failed.";
      if (errorMessage === "INVALID_KEY") {
        errorMessage = "API Key Invalid.";
        setIsKeyError(true);
      }
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- SIMULATED PROGRESS ---
  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setLoadingProgress(0);
      setLoadingMessage('Initializing System...');
      const startTime = Date.now();
      const estimatedDuration = 15000; 
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = (elapsed / estimatedDuration) * 100;
        if (progress > 90) progress = 90;
        setLoadingProgress(progress);
        if (progress < 30) setLoadingMessage('Analyzing Vectors...');
        else if (progress < 60) setLoadingMessage('Applying Psychology...');
        else setLoadingMessage('Finalizing Strategy...');
      }, 100);
    } else {
      if (result || trendResults) setLoadingProgress(100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isAnalyzing, result, trendResults]);

  const handleUseTrend = (trend: TrendItem) => {
    setMode(AppMode.GENERATION);
    setConfig(prev => ({
      ...prev,
      tone: ['Urgent', 'Hype'],
      engagementGoal: ['Viral Reach'],
      keywords: trend.headline,
    }));
    alert(`Trend "${trend.headline}" copied to Create Mode.`);
  };

  const handleCopyTrend = (trend: TrendItem, index: number) => {
    const text = `TREND: ${trend.headline}\nWHY: ${trend.whyItsHot}\nIDEA: ${trend.contentIdea}`;
    navigator.clipboard.writeText(text);
    setCopiedTrendIndex(index);
    setTimeout(() => setCopiedTrendIndex(null), 2000);
  };

  // --- RENDER HELPERS ---
  const ModeTab = ({ m, label, icon: Icon }: { m: AppMode, label: string, icon: any }) => (
    <button
      onClick={() => { setMode(m); setResult(null); setTrendResults(null); if(m !== AppMode.TREND_HUNTER) setFiles([]); }}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
        mode === m 
          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' 
          : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  // --- GATEKEEPER VIEW ---
  if (showGatekeeper) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-inter">
        <div className="bg-grid"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="relative z-10 max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-center text-white mb-2 tracking-tighter">SocialSEO</h1>
          <p className="text-slate-500 text-center text-xs mb-8 font-bold tracking-widest uppercase">System Initialization</p>
          <div className="space-y-4">
            <input 
              type="password" 
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter Gemini API Key (AIza...)"
              className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500 outline-none text-sm font-mono text-center"
            />
            <button 
              onClick={handleSaveKey}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 text-sm tracking-wide"
            >
              CONNECT SYSTEM
            </button>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" className="block text-center text-[10px] text-indigo-400 hover:text-white mt-4 font-bold uppercase tracking-wider">
              Get Free Key &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP VIEW ---
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pb-20 font-inter selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-grid z-0"></div>
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg tracking-tighter text-white">SocialSEO</span>
           </div>

           {/* DESKTOP NAV */}
           <div className="hidden md:flex bg-slate-900/50 p-1 rounded-full border border-white/5">
              <ModeTab m={AppMode.GENERATION} label="Create" icon={Sparkles} />
              <ModeTab m={AppMode.REFINE} label="Refine" icon={Settings2} />
              <ModeTab m={AppMode.COMPETITOR_SPY} label="Spy" icon={BrainCircuit} />
              <ModeTab m={AppMode.TREND_HUNTER} label="Hunt" icon={Flame} />
           </div>

           <div className="flex items-center gap-3">
              <button onClick={() => setShowSearch(true)} className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                 <Search className="w-4 h-4" />
              </button>
              <button onClick={() => setShowMasterclass(true)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-white rounded-full transition-colors border border-indigo-500/20">
                 <BookOpen className="w-4 h-4" />
                 <span className="text-xs font-bold hidden sm:block">ACADEMY</span>
              </button>
              <button onClick={() => {if(confirm('Disconnect?')) clearApiKey()}} className="flex items-center gap-2 px-3 py-2.5 bg-slate-900 hover:bg-red-500/20 rounded-full text-slate-400 hover:text-red-400 transition-colors">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold hidden sm:block">SYSTEM ONLINE</span>
              </button>
           </div>
        </div>
        
        {/* MOBILE NAV */}
        <div className="md:hidden flex justify-between px-4 py-2 border-t border-white/5 overflow-x-auto gap-2 no-scrollbar">
           <ModeTab m={AppMode.GENERATION} label="Create" icon={Sparkles} />
           <ModeTab m={AppMode.REFINE} label="Refine" icon={Settings2} />
           <ModeTab m={AppMode.COMPETITOR_SPY} label="Spy" icon={BrainCircuit} />
           <ModeTab m={AppMode.TREND_HUNTER} label="Hunt" icon={Flame} />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
        
        {/* VIEW ROUTER */}
        <div className="mb-12">
           {mode === AppMode.GENERATION && (
             <CreateView 
                platform={platform} setPlatform={setPlatform} 
                config={config} setConfig={setConfig} 
                files={files} setFiles={setFiles}
                brandFiles={brandFiles} setBrandFiles={setBrandFiles}
             />
           )}
           {mode === AppMode.REFINE && (
             <RefineView 
                config={config} 
                setConfig={setConfig} 
                platform={platform} 
                setPlatform={setPlatform} 
             />
           )}
           {mode === AppMode.COMPETITOR_SPY && (
             <SpyView files={files} setFiles={setFiles} config={config} setConfig={setConfig} />
           )}
           {mode === AppMode.TREND_HUNTER && (
             <HuntView 
                platform={platform} setPlatform={setPlatform}
                config={config} setConfig={setConfig}
                trendResults={trendResults}
                handleUseTrend={handleUseTrend}
                handleCopyTrend={handleCopyTrend}
                copiedTrendIndex={copiedTrendIndex}
             />
           )}
        </div>

        {/* GLOBAL ACTION BUTTON */}
        <div className="max-w-2xl mx-auto mb-12">
           <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="relative group w-full bg-white text-black font-black text-xl py-6 rounded-2xl transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
           >
              {isAnalyzing ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin" />
                   <span>PROCESSING DATA...</span>
                 </>
              ) : (
                 <>
                   <span>
                     {mode === AppMode.GENERATION && "GENERATE STRATEGY"}
                     {mode === AppMode.REFINE && "POLISH DRAFT"}
                     {mode === AppMode.COMPETITOR_SPY && "ANALYZE COMPETITORS"}
                     {mode === AppMode.TREND_HUNTER && "FIND VIRAL TRENDS"}
                   </span>
                   <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </>
              )}
           </button>
           
           {/* ERROR DISPLAY */}
           {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                 <p className="text-red-400 text-sm font-bold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    {error}
                 </p>
                 {isKeyError && (
                    <button onClick={clearApiKey} className="mt-2 text-xs font-bold text-white underline decoration-red-500 underline-offset-4">
                       RESET API KEY
                    </button>
                 )}
              </div>
           )}

           {/* LOADING BAR */}
           {isAnalyzing && (
              <div className="mt-6">
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <span>{loadingMessage}</span>
                    <span>{Math.round(loadingProgress)}%</span>
                 </div>
                 <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
                 </div>
              </div>
           )}
        </div>

        {/* RESULTS RENDER */}
        {result && <AnalysisResultView result={result} mode={mode} />}

      </main>

      {/* MODALS */}
      {showWelcome && <WelcomeModal onClose={() => { setShowWelcome(false); localStorage.setItem('HAS_SEEN_WELCOME', 'true'); }} onOpenAcademy={() => { setShowWelcome(false); setShowMasterclass(true); }} />}
      {showMasterclass && <MasterclassGuide onClose={() => setShowMasterclass(false)} />}
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} history={history} onSelect={restoreFromHistory} onDelete={deleteFromHistory} onClear={clearHistory} />

      {/* FOOTER VER CHECK */}
      <footer className="fixed bottom-4 left-0 w-full text-center pointer-events-none">
         <p className="text-[10px] text-slate-800 font-mono">System v7.0 (Hard Reset)</p>
      </footer>
    </div>
  );
};

export default App;
