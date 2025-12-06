import React, { useState, useEffect } from 'react';
import { AppMode, Platform, AnalysisResult, FileInput, TrendItem, HistoryItem, ConfigState } from './types';
import { analyzeContent } from './services/geminiService';
import AnalysisResultView from './components/AnalysisResultView';
import MasterclassGuide from './components/MasterclassGuide';
import GlobalSearch from './components/GlobalSearch';
import WelcomeModal from './components/WelcomeModal';
import CreateView from './components/views/CreateView';
import RefineView from './components/views/RefineView';
import SpyView from './components/views/SpyView';
import HuntView from './components/views/HuntView';

import { Sparkles, BrainCircuit, Loader2, Settings2, Flame, Search, BookOpen, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATION);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [files, setFiles] = useState<FileInput[]>([]);
  const [brandFiles, setBrandFiles] = useState<FileInput[]>([]);
  
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
    contentFormat: 'Reel',
    refineFormat: 'Post'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [trendResults, setTrendResults] = useState<TrendItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [showMasterclass, setShowMasterclass] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('HAS_SEEN_WELCOME'));
  const [copiedTrendIndex, setCopiedTrendIndex] = useState<number | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('SOCIAL_SEO_HISTORY');
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = (mode: AppMode, data: AnalysisResult | TrendItem[], platform: Platform) => {
    let summary = 'Analysis Report';
    try {
       if (mode === AppMode.GENERATION && (data as AnalysisResult).strategy?.headline) {
        summary = (data as AnalysisResult).strategy.headline;
      } else if (mode === AppMode.REFINE && (data as AnalysisResult).refineData?.refinedContent?.headline) {
        summary = `Refined: ${(data as AnalysisResult).refineData.refinedContent.headline}`;
      } else if (mode === AppMode.COMPETITOR_SPY) {
        summary = 'Competitor Analysis Report';
      } else if (mode === AppMode.TREND_HUNTER && config.niche) {
        summary = `Trend Hunt: ${config.niche}`;
      } else {
         summary = `Analysis - ${new Date().toLocaleDateString()}`;
      }
    } catch(e) {
      console.error("Error creating history summary:", e);
      summary = `Analysis - ${new Date().toISOString()}`;
    }
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mode,
      platform,
      data,
      summary
    };
    const updatedHistory = [newItem, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updatedHistory));
  };


  const deleteFromHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('SOCIAL_SEO_HISTORY', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if(confirm('Are you sure you want to clear the entire archives?')) {
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

  const handleAnalyze = async () => {
    if (mode === AppMode.GENERATION && files.length === 0 && !config.keywords) { alert("Please upload media or provide keywords for generation."); return; }
    if (mode === AppMode.REFINE && !config.originalText) { alert("Please provide text in the 'Raw Content Input' field to refine."); return; }
    if (mode === AppMode.TREND_HUNTER && !config.niche) { alert("Please enter a niche to hunt for trends."); return; }
    if (mode === AppMode.COMPETITOR_SPY && files.length === 0 && !config.originalText) { alert("Please upload competitor media or paste a URL/caption to analyze."); return; }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setTrendResults(null);

    const startTime = Date.now();
    const updateInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (mode === AppMode.REFINE) {
        setLoadingMessage(`Performing Deep Analysis (this may take a moment)... ${elapsed.toFixed(1)}s`);
      } else {
        setLoadingMessage(`Processing... ${elapsed.toFixed(1)}s`);
      }
    }, 100);

    try {
      const filesToAnalyze = files.map(f => f.file);
      // FIX: API key is handled by geminiService via environment variables.
      const data = await analyzeContent(filesToAnalyze, mode, platform, config);
      
      if (mode === AppMode.TREND_HUNTER) {
        const trends = data as TrendItem[];
        setTrendResults(trends);
        addToHistory(mode, trends, platform);
      } else {
        const analysis = data as AnalysisResult;
        setResult(analysis);
        addToHistory(mode, analysis, platform);
      }
    } catch (err: any) {
      // FIX: Simplify error handling per guidelines.
      setError("Oops! The AI got confused. Please check your API Key and try again.");
    } finally {
      clearInterval(updateInterval);
      setIsAnalyzing(false);
    }
  };

  const handleUseTrend = (trend: TrendItem) => {
    setMode(AppMode.GENERATION);
    if(trend.platform) setPlatform(trend.platform as Platform);
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
  
  const handleSetPlatform = (p: Platform) => {
    setPlatform(p);
  };

  const ModeTab = ({ m, label, icon: Icon }: { m: AppMode, label: string, icon: any }) => (
    <button
      onClick={() => { setMode(m); setResult(null); setTrendResults(null); setFiles([]); }}
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

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pb-20 font-inter selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-grid z-0"></div>
      
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg tracking-tighter text-white">SocialSEO</span>
           </div>

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
              {/* FIX: Removed API key logic and disconnect button, replaced with static indicator */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-900 rounded-full text-slate-400">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold hidden sm:block">SYSTEM ONLINE</span>
              </div>
           </div>
        </div>
        
        <div className="md:hidden flex justify-between px-4 py-2 border-t border-white/5 overflow-x-auto gap-2 no-scrollbar">
           <ModeTab m={AppMode.GENERATION} label="Create" icon={Sparkles} />
           <ModeTab m={AppMode.REFINE} label="Refine" icon={Settings2} />
           <ModeTab m={AppMode.COMPETITOR_SPY} label="Spy" icon={BrainCircuit} />
           <ModeTab m={AppMode.TREND_HUNTER} label="Hunt" icon={Flame} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
        
        <div className="mb-12">
           {mode === AppMode.GENERATION && (
             <CreateView 
                platform={platform} 
                setPlatform={handleSetPlatform} 
                config={config} 
                setConfig={setConfig} 
                files={files} 
                setFiles={setFiles}
                brandFiles={brandFiles} 
                setBrandFiles={setBrandFiles}
                isAnalyzing={isAnalyzing}
             />
           )}
           {mode === AppMode.REFINE && (
             <RefineView 
                config={config} 
                setConfig={setConfig} 
                platform={platform} 
                setPlatform={handleSetPlatform} 
             />
           )}
           {mode === AppMode.COMPETITOR_SPY && (
             <SpyView 
                files={files} setFiles={setFiles} 
                config={config} setConfig={setConfig} 
                isAnalyzing={isAnalyzing}
                platform={platform}
                setPlatform={handleSetPlatform}
             />
           )}
           {mode === AppMode.TREND_HUNTER && (
             <HuntView 
                platform={platform} setPlatform={handleSetPlatform}
                config={config} setConfig={setConfig}
                trendResults={trendResults}
                handleUseTrend={handleUseTrend}
                handleCopyTrend={handleCopyTrend}
                copiedTrendIndex={copiedTrendIndex}
             />
           )}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
           <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="relative group w-full bg-white text-black font-black text-xl py-6 rounded-2xl transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
           >
              {isAnalyzing ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin" />
                   <span>{loadingMessage || 'ANALYZING...'}</span>
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
           
           {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                 <p className="text-red-400 text-sm font-bold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    {error}
                 </p>
              </div>
           )}

           {isAnalyzing && (
              <div className="mt-6">
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <span>{loadingMessage}</span>
                 </div>
              </div>
           )}
        </div>

        {result && <AnalysisResultView result={result} mode={mode} platform={platform} format={config.contentFormat} />}

      </main>

      {showWelcome && <WelcomeModal onClose={() => { setShowWelcome(false); localStorage.setItem('HAS_SEEN_WELCOME', 'true'); }} onOpenAcademy={() => { setShowWelcome(false); localStorage.setItem('HAS_SEEN_WELCOME', 'true'); setShowMasterclass(true); }} />}
      {showMasterclass && <MasterclassGuide onClose={() => setShowMasterclass(false)} />}
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} history={history} onSelect={restoreFromHistory} onDelete={deleteFromHistory} onClear={clearHistory} />
      
      <footer className="fixed bottom-4 left-0 w-full text-center pointer-events-none">
         <p className="text-[10px] text-slate-800 font-mono">System v20.0 (Full Sync)</p>
      </footer>
    </div>
  );
};

export default App;