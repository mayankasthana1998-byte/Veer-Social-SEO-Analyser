
import React, { useRef, useEffect, useState } from 'react';
import { AnalysisResult, AppMode, Platform, SpyReportRow } from '../types';
import { Copy, TrendingUp, BarChart3, FileText, BrainCircuit, Check, Youtube, Hash, Tag, Search, Eye, Instagram, Key, Palette, Film, Type, MessageCircle } from 'lucide-react';
import PlatformSpecificResultView from './PlatformSpecificResultView';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  mode: AppMode;
  platform: Platform;
  format: string;
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

// 1. PSYCHOLOGICAL AUDIT CARD
const PsychAuditCard: React.FC<{ audit: NonNullable<AnalysisResult['psychologicalAudit']> }> = ({ audit }) => (
    <div className="bg-slate-900/60 border border-indigo-500/20 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><BrainCircuit className="w-5 h-5 text-indigo-400" /></div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Psychological Audit</h3>
        </div>
        <div className="space-y-6">
            <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Visual Indexing (Algorithm Eye)</span>
                <p className="text-slate-300 text-sm leading-relaxed">{audit.visualIndexing}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">Hook Strategy</span>
                    <p className="text-white text-sm font-medium">{audit.hookStrategy}</p>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">Neuro-Trigger</span>
                    <p className="text-white text-sm font-medium">{audit.neuroTrigger}</p>
                </div>
            </div>
        </div>
    </div>
);

// 2. THE STRATEGY CARD
const StrategyCard: React.FC<{ strategy: NonNullable<AnalysisResult['strategy']>, platform: Platform }> = ({ strategy, platform }) => (
    <div className="bg-slate-900/60 border border-slate-700 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10"><FileText className="w-5 h-5 text-white" /></div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">The Strategy: {platform}</h3>
            </div>
            <CopyButton text={`${strategy.headline}\n\n${strategy.caption}\n\n${strategy.cta}`} label="COPY STRATEGY" className="text-xs font-bold bg-white text-black px-3 py-2 rounded-lg" />
        </div>
        
        <div className="space-y-6">
             {/* Headline/Overlay */}
             <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Headline / Overlay Text</span>
                    <CopyButton text={strategy.headline} />
                </div>
                <p className="text-xl font-black text-white leading-tight">{strategy.headline}</p>
             </div>

             {/* Caption/Script */}
             <div>
                <div className="flex justify-between items-center mb-2 px-1">
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Caption / Script (Humanized)</span>
                   <CopyButton text={strategy.caption} />
                </div>
                <div className="whitespace-pre-wrap text-slate-300 font-sans leading-relaxed text-sm p-5 bg-black/20 rounded-2xl border border-white/5">
                    {strategy.caption}
                </div>
             </div>

             {/* CTA */}
             <div className="flex items-center gap-4 bg-indigo-600/10 p-4 rounded-xl border border-indigo-500/20">
                <div className="p-2 bg-indigo-600 rounded-lg shrink-0"><MessageCircle className="w-4 h-4 text-white" /></div>
                <div className="flex-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Call to Action</span>
                    <p className="text-white text-sm font-bold">{strategy.cta}</p>
                </div>
                <CopyButton text={strategy.cta} className="text-indigo-400 hover:text-white" />
             </div>
        </div>
    </div>
);

// 3. THUMBNAIL DIRECTOR CARD (Video Only)
const ThumbnailDirectorCard: React.FC<{ director: NonNullable<AnalysisResult['thumbnailDirector']> }> = ({ director }) => (
    <div className="bg-slate-900/60 border border-orange-500/20 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20"><Film className="w-5 h-5 text-orange-400" /></div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Thumbnail Director</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
             <div className="md:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-2"><Eye className="w-3 h-3"/> Visual Scene</span>
                <p className="text-sm text-slate-300 leading-snug bg-black/30 p-3 rounded-xl border border-white/5">{director.visual}</p>
             </div>
             <div className="md:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-2"><Type className="w-3 h-3"/> Text Overlay</span>
                <p className="text-xl font-black text-white leading-none bg-black/30 p-3 rounded-xl border border-white/5">{director.textOverlay}</p>
             </div>
             <div className="md:col-span-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-2"><Palette className="w-3 h-3"/> Color Psych</span>
                <p className="text-sm text-orange-300 leading-snug bg-black/30 p-3 rounded-xl border border-white/5">{director.colorPsychology}</p>
             </div>
        </div>
    </div>
);

// 4. SEO DATA CARD
const SeoDataCard: React.FC<{ seo: NonNullable<AnalysisResult['seo']> }> = ({ seo }) => {
    // Collect all parts for copy
    const allKeywords = seo.keywords?.join(', ') || '';
    const allHashtags = seo.hashtags?.map(h => `#${h.replace('#','')}`).join(' ') || '';
    const altText = seo.altText?.join(' ') || '';
    const fullCopy = `Keywords: ${allKeywords}\n\nHashtags: ${allHashtags}\n\nAlt Text: ${altText}`;

    return (
        <div className="bg-slate-900/60 border border-slate-700 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20"><Key className="w-5 h-5 text-emerald-400" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">SEO Data</h3>
                </div>
                <CopyButton text={fullCopy} label="COPY SEO PACK" className="text-xs font-bold bg-white/5 px-3 py-2 rounded-lg text-slate-400 hover:text-white" />
            </div>
            
            <div className="space-y-6">
                {/* Keywords */}
                {seo.keywords && seo.keywords.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Tag className="w-3 h-3"/> Keywords</span>
                             <CopyButton text={seo.keywords.join(', ')} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {seo.keywords.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-slate-300 border border-white/5">{k}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hashtags */}
                {seo.hashtags && seo.hashtags.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Hash className="w-3 h-3"/> Hashtags</span>
                             <CopyButton text={seo.hashtags.map(h => `#${h.replace('#','')}`).join(' ')} />
                        </div>
                        <p className="text-indigo-400 text-sm font-mono leading-relaxed">
                            {seo.hashtags.map(h => `#${h.replace('#','')}`).join(' ')}
                        </p>
                    </div>
                )}

                {/* Alt Text (Conditional) */}
                {seo.altText && seo.altText.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Eye className="w-3 h-3"/> Alt Text</span>
                             <CopyButton text={seo.altText.join('\n')} />
                        </div>
                        <ul className="space-y-2">
                           {seo.altText.map((t, i) => (
                               <li key={i} className="text-sm text-slate-400 bg-black/20 p-3 rounded-lg border border-white/5 italic">"{t}"</li>
                           ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// 5. VIRALITY SCORE CARD
const ViralityScoreCard: React.FC<{ virality: NonNullable<AnalysisResult['virality']> }> = ({ virality }) => {
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-400';
        if (score >= 70) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-slate-900/60 border border-slate-700 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
             <div className="flex flex-col items-center gap-2 min-w-[120px]">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Virality Score</span>
                 <div className={`text-6xl font-black ${getScoreColor(virality.score)} drop-shadow-2xl`}>{virality.score}</div>
             </div>
             <div className="flex-1 w-full bg-black/30 p-5 rounded-2xl border border-white/5">
                 <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><TrendingUp className="w-3 h-3"/> Critique & Improvement</span>
                 <p className="text-sm text-slate-300 leading-relaxed">{virality.critique || virality.gapAnalysis}</p>
             </div>
        </div>
    );
};


const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, mode, platform, format }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  if (!result) return null;

  // SPY MODE
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

  // REFINE MODE
  if (mode === AppMode.REFINE && result.refineData) {
    return (
      <div ref={containerRef}>
         <PlatformSpecificResultView data={result.refineData} platform={platform} />
      </div>
    );
  }

  // GENERATION MODE (v.Andromeda 2.1 One-Section Report)
  // Check if we have the new schema data
  if (mode === AppMode.GENERATION && result.strategy) {
      return (
          <div ref={containerRef} className="space-y-6 animate-fade-in pb-12 font-inter">
              {/* 1. Psychological Audit */}
              {result.psychologicalAudit && <PsychAuditCard audit={result.psychologicalAudit} />}
              
              {/* 2. The Strategy */}
              {result.strategy && <StrategyCard strategy={result.strategy} platform={platform} />}
              
              {/* 3. Thumbnail Director (Video Only) */}
              {result.thumbnailDirector && <ThumbnailDirectorCard director={result.thumbnailDirector} />}
              
              {/* 4. SEO Data */}
              {result.seo && <SeoDataCard seo={result.seo} />}
              
              {/* 5. Virality Score */}
              {result.virality && <ViralityScoreCard virality={result.virality} />}
          </div>
      );
  }

  return null;
};

export default AnalysisResultView;
