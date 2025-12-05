import React, { useRef, useEffect, useState } from 'react';
import { AnalysisResult, AppMode, Platform, SpyReportRow } from '../types';
import { Copy, TrendingUp, BarChart3, FileText, BrainCircuit, Check } from 'lucide-react';
import PlatformSpecificResultView from './PlatformSpecificResultView';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  mode: AppMode;
  platform: Platform;
}

const CopyButton = ({ text, className = "", label = "", iconClass = "w-3 h-3" }: { text: string, className?: string, label?: string, iconClass?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className={`flex items-center transition-all hover:opacity-80 active:scale-95 ${className}`} title="Copy to clipboard">
      {copied ? <Check className={`${iconClass} text-emerald-400`} /> : <Copy className={`${iconClass}`} />}
      {label && <span className={`ml-1.5 ${copied ? 'text-emerald-400' : ''}`}>{label}</span>}
    </button>
  );
};

const OptimizationDeltaCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const baseline = result.virality?.baselineScore ?? result.refineData?.audit.score ?? 0;
  const finalScore = result.virality?.score;

  if (finalScore === undefined) return null;

  const improvement = finalScore - baseline;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-400 to-green-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-600';
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-colors shadow-2xl mb-6">
      <div className="relative z-10">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Optimization Delta
        </h3>
        <div className="mt-8 flex items-end justify-between gap-2">
          <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Baseline</span>
              <div className="text-4xl font-bold text-slate-700 font-mono">{baseline}</div>
          </div>
          <div className="flex-1 flex flex-col items-center px-4 pb-3">
              <div className="text-[10px] font-black text-emerald-400 mb-2 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{improvement > 0 ? improvement : 0} PTS
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500" style={{width: '100%'}}></div>
              </div>
          </div>
          <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide glow-text">Optimized</span>
              <div className={`text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b ${getScoreColor(finalScore)} drop-shadow-lg`}>{finalScore}</div>
          </div>
        </div>
        {result.virality?.gapAnalysis && (
         <div className="mt-8 bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 relative">
          <p className="text-slate-400 text-xs leading-relaxed font-medium">{result.virality.gapAnalysis}</p>
        </div>)}
      </div>
    </div>
  );
};

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, mode, platform }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [result]);

  // RENDER PATH 1: SPY MODE
  if (mode === AppMode.COMPETITOR_SPY && result.competitorInsights?.spyReport) {
    const reportData = result.competitorInsights.spyReport;
    const fullReportText = reportData.map(row => Object.values(row).join('\n---\n')).join('\n\n=====\n\n');
    return (
      <div ref={containerRef} className="animate-fade-in space-y-6 pb-12">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20"><BrainCircuit className="w-5 h-5 text-cyan-400" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">SPY MATRIX</h3>
                </div>
                <CopyButton text={fullReportText} label="COPY REPORT" className="text-xs font-bold bg-white/5 px-3 py-2 rounded-lg text-slate-400 hover:text-white" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-black/40 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <tr>
                    <th className="p-4">Competitor Analysis</th>
                    <th className="p-4">SEO Keywords &amp; Hashtags</th>
                    <th className="p-4">Platform Specific Strategy</th>
                    <th className="p-4">User Learnings</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-300">
                  {reportData.map((row: SpyReportRow, index: number) => (
                    <tr key={index} className="border-b border-slate-800/50 hover:bg-white/5">
                      <td className="p-4 align-top max-w-xs">{row.analysis}</td>
                      <td className="p-4 align-top max-w-xs font-mono text-xs text-cyan-300">{row.keywords}</td>
                      <td className="p-4 align-top max-w-xs font-bold">{row.strategy}</td>
                      <td className="p-4 align-top max-w-xs bg-slate-950/30 text-emerald-300">{row.learning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }

  // RENDER PATH 2: REFINE MODE (Structured JSON)
  if (mode === AppMode.REFINE && result.refineData && result.virality) {
    return (
      <div ref={containerRef}>
         <OptimizationDeltaCard result={result} />
         <PlatformSpecificResultView data={result.refineData} platform={platform} />
      </div>
    );
  }

  // RENDER PATH 3: INSTAGRAM CREATE MODE (Simplified)
  if (mode === AppMode.GENERATION && platform === Platform.INSTAGRAM && result.strategy?.caption) {
    return (
      <div ref={containerRef} className="space-y-6 animate-fade-in pb-12">
        {(result.virality?.baselineScore !== undefined) && <OptimizationDeltaCard result={result} />}
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><FileText className="w-5 h-5 text-indigo-400" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">INSTAGRAM CAPTION</h3>
                </div>
                <CopyButton text={result.strategy.caption} label="COPY BUNDLE" className="text-xs font-bold bg-white/5 px-3 py-2 rounded-lg text-slate-400 hover:text-white" />
            </div>
            <div className="whitespace-pre-wrap text-slate-300 font-sans leading-relaxed text-base p-4 bg-black/30 rounded-xl border border-white/5">
              {result.strategy.caption}
            </div>
        </div>
      </div>
    );
  }
  
  // RENDER PATH 4: DEFAULT BLUEPRINT VIEW (for non-Instagram Generation)
  if (mode === AppMode.GENERATION && result.strategy && result.seo && result.visualAudit && result.virality) {
     const hashtagsString = `${result.seo.hashtags?.broad?.join(' ') || ''} ${result.seo.hashtags?.niche?.join(' ') || ''} ${result.seo.hashtags?.specific?.join(' ') || ''}`;
     const fullReportText = `...`; 

    return (
      <div ref={containerRef} className="space-y-6 animate-fade-in pb-12 font-inter">
        {(result.virality.baselineScore !== undefined) && <OptimizationDeltaCard result={result} />}
        <div className="relative group">
          <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
               <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                 <FileText className="w-6 h-6 text-indigo-500" /> THE BLUEPRINT
               </h2>
               <CopyButton text={fullReportText} label="COPY ALL" className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold" iconClass="w-4 h-4" />
            </div>
            <div className="space-y-8">
               <div>
                 <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-2 block">Headline / Hook</span>
                 <p className="text-3xl font-black text-white">{result.strategy.headline}</p>
               </div>
               <div className="bg-slate-900/50 rounded-3xl p-6 border border-white/5">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 block">Content Script</span>
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{result.strategy.caption}</p>
               </div>
               <div className="flex items-center justify-between bg-indigo-900/20 p-4 rounded-2xl border border-indigo-500/20">
                  <span className="text-xs font-black text-indigo-300 uppercase">Call To Action</span>
                  <span className="text-white font-bold">{result.strategy.cta}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null; // Fallback empty state
};

export default AnalysisResultView;