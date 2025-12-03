
import React, { useRef, useEffect, useState } from 'react';
import { AnalysisResult, AppMode } from '../types';
import { Copy, TrendingUp, Hash, Eye, MessageSquare, AlertTriangle, Flame, Share2, Download, Twitter, Linkedin, MessageCircle, Sparkles, Zap, Crosshair, Check, BarChart3, ArrowRight, ClipboardCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  mode: AppMode;
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl">
        <p className="text-white font-bold text-xs mb-1">{label}</p>
        <p className="text-indigo-400 text-xs font-mono">
          Impact Score: {payload[0].value}/100
        </p>
      </div>
    );
  }
  return null;
};

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smoothly scroll the results into view when generated
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-400 to-green-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-600';
  };

  const hashtagsString = `${result.seo.hashtags?.broad?.join(' ')} ${result.seo.hashtags?.niche?.join(' ')} ${result.seo.hashtags?.specific?.join(' ')}`;

  // 1. Full Strategy (With Labels - Good for Docs)
  const fullStrategyContent = `HEADLINE:\n${result.strategy.headline}\n\nCAPTION:\n${result.strategy.caption}\n\nCTA:\n${result.strategy.cta}\n\nHASHTAGS:\n${hashtagsString}`;

  // 2. Post Ready (Clean - Good for Socials)
  // Logic: Headline -> Newlines -> Caption -> Newlines -> CTA -> Dot Spacer -> Hashtags
  const cleanPostContent = `${result.strategy.headline}\n\n${result.strategy.caption}\n\n${result.strategy.cta}\n\n.\n.\n${hashtagsString}`;

  const handleSmartShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SocialSEO Strategy',
          text: cleanPostContent, // Share the clean version by default
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert("Native sharing is not supported on this browser.");
    }
    
    // Smooth scroll to SEO section after sharing logic
    if (seoRef.current) {
      seoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([fullStrategyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viral-strat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result.strategy.headline + '\n\n' + result.strategy.caption?.substring(0, 200) + '...')}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(cleanPostContent)}`;
  const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(result.strategy.headline)}`;

  // Determine scoring display logic
  const baseline = result.virality.baselineScore || 50;
  const finalScore = result.virality.score;
  const improvement = finalScore - baseline;

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in pb-12 font-inter">
      
      {/* 1. HERO SCORE CARD - BENTO STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* SCORE */}
        <div className="md:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-colors shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30 group-hover:opacity-60 transition-opacity"></div>
           <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   <BarChart3 className="w-4 h-4" /> Optimization Delta
                 </h3>
                 {result.virality.trendDetected && (
                   <span className="bg-orange-500/10 text-orange-400 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center border border-orange-500/20 animate-pulse">
                     <Flame className="w-3 h-3 mr-1" /> TRENDING
                   </span>
                 )}
              </div>
              
              {/* BEFORE VS AFTER VISUALIZATION */}
              <div className="mt-8 flex items-end justify-between gap-2">
                 {/* Input / Baseline */}
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Baseline</span>
                    <div className="text-4xl font-bold text-slate-700 font-mono">
                      {baseline}
                    </div>
                 </div>

                 {/* Arrow */}
                 <div className="flex-1 flex flex-col items-center px-4 pb-3">
                    <div className="text-[10px] font-black text-emerald-400 mb-2 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{improvement > 0 ? improvement : 0} PTS
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                       <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 animate-[shimmer_2s_infinite]" style={{width: '100%'}}></div>
                    </div>
                 </div>

                 {/* Optimized Score */}
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide glow-text">Optimized</span>
                    <div className={`text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b ${getScoreColor(finalScore)} drop-shadow-lg`}>
                      {finalScore}
                    </div>
                 </div>
              </div>

              <div className="mt-8 bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 relative">
                 <div className="absolute top-0 left-4 -translate-y-1/2 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-bold text-yellow-500 uppercase tracking-widest">
                   Gap Analysis
                 </div>
                 <p className="text-slate-400 text-xs leading-relaxed mt-2">
                   {result.virality.gapAnalysis}
                 </p>
              </div>
           </div>
        </div>

        {/* AUDIT & VIBE */}
        <div className="md:col-span-7 flex flex-col gap-4">
           
           {/* Visual Hook */}
           <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 hover:border-pink-500/30 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Eye className="w-24 h-24 text-pink-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                   <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                     <Eye className="w-5 h-5 text-pink-400" />
                   </div>
                   <h3 className="text-sm font-black text-white uppercase tracking-wider">Hook Protocol</h3>
                </div>
                <div className="space-y-3">
                   <div className="text-xl font-bold text-slate-200 leading-tight">{result.visualAudit?.hookIdentified}</div>
                   <div className="text-xs text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5 font-mono">
                     {">"} {result.visualAudit?.psychologyCheck}
                   </div>
                </div>
              </div>
           </div>

           {/* Competitor / Vibe */}
           <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 hover:border-cyan-500/30 transition-colors">
              {mode === AppMode.COMPETITOR_SPY && result.competitorInsights ? (
                 <>
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                       <Zap className="w-5 h-5 text-cyan-400" />
                     </div>
                     <h3 className="text-sm font-black text-white uppercase tracking-wider">Competitor DNA</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 relative group/item hover:border-cyan-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <span className="block text-slate-500 font-bold text-[9px] uppercase tracking-widest">THEME</span>
                           <CopyButton text={result.competitorInsights.visualTheme} className="text-slate-600 hover:text-cyan-400" />
                        </div>
                        <p className="text-slate-300">{result.competitorInsights.visualTheme}</p>
                      </div>
                      <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 relative group/item hover:border-cyan-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <span className="block text-slate-500 font-bold text-[9px] uppercase tracking-widest">FORMULA</span>
                           <CopyButton text={result.competitorInsights.formula} className="text-slate-600 hover:text-cyan-400" />
                        </div>
                        <p className="text-slate-300">{result.competitorInsights.formula}</p>
                      </div>
                   </div>
                 </>
              ) : (
                 <>
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                       <Sparkles className="w-5 h-5 text-purple-400" />
                     </div>
                     <h3 className="text-sm font-black text-white uppercase tracking-wider">Vibe Check</h3>
                   </div>
                   <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-purple-500 pl-4 py-1">
                      {result.virality.vibe || "Authentic, High-Energy, & Relatable"}
                   </p>
                 </>
              )}
           </div>
        </div>
      </div>

      {/* 2. SPY MATRIX CHART (Only in Spy Mode) */}
      {mode === AppMode.COMPETITOR_SPY && result.competitorInsights?.spyMatrix && (
         <div className="md:col-span-12">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl">
               <div className="flex justify-between items-center mb-8">
                 <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 flex items-center">
                   <Crosshair className="w-5 h-5 mr-3" /> Competitor Spy Matrix
                 </h3>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-950/50 px-4 py-2 rounded-full border border-slate-800">
                    <BarChart3 className="w-3 h-3 text-indigo-400" />
                    DATA VISUALIZATION
                 </div>
               </div>

               {/* Visualization Chart */}
               <div className="w-full h-56 mb-10">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart 
                      data={result.competitorInsights.spyMatrix.map(item => ({
                        name: item.hookUsed.length > 20 ? item.hookUsed.substring(0, 20) + '...' : item.hookUsed,
                        fullHook: item.hookUsed,
                        score: item.impactScore || 50 // fallback if old data
                      }))}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                   >
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                     <XAxis 
                       dataKey="name" 
                       stroke="#64748b" 
                       fontSize={10} 
                       tickLine={false} 
                       axisLine={false}
                       dy={10}
                     />
                     <YAxis 
                       stroke="#64748b" 
                       fontSize={10} 
                       tickLine={false} 
                       axisLine={false}
                       domain={[0, 100]}
                       dx={-10}
                     />
                     <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.4}} />
                     <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>
                        {result.competitorInsights.spyMatrix.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <th className="pb-4 pl-4">Viral Pattern</th>
                       <th className="pb-4">Keywords Detected</th>
                       <th className="pb-4">Psych Trigger (Why)</th>
                       <th className="pb-4">Algo Hack (How)</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm">
                     {result.competitorInsights.spyMatrix.map((row, i) => (
                       <tr key={i} className="group hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0">
                         <td className="py-5 pl-4 font-bold text-white group-hover:text-indigo-300 align-top w-1/4">
                           {row.hookUsed}
                         </td>
                         <td className="py-5 align-top w-1/4">
                           <div className="flex flex-wrap gap-1.5 items-center">
                             {row.keywords.map((k, j) => (
                               <span key={j} className="text-[10px] font-bold px-2 py-1 bg-black rounded-lg border border-slate-800 text-slate-300">{k}</span>
                             ))}
                             <CopyButton text={row.keywords.join(', ')} className="ml-1 text-slate-600 hover:text-white" />
                           </div>
                         </td>
                         <td className="py-5 text-slate-400 pr-6 align-top text-xs leading-relaxed">{row.whyItWins}</td>
                         <td className="py-5 text-emerald-400 font-mono text-[10px] align-top">{row.rankingStrategy}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>
      )}

      {/* 3. THE STRATEGY - GLASS DOCUMENT STYLE */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[40px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-white/10 gap-4">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter flex items-center">
                <MessageSquare className="w-8 h-8 mr-4 text-indigo-500" />
                THE BLUEPRINT
              </h2>
              <p className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest pl-1">Generated via Andromeda Engine</p>
            </div>
            
            {/* QUICK COPY BUTTON - POST READY */}
            <CopyButton 
              text={cleanPostContent} 
              className="flex items-center px-6 py-3 bg-white text-black hover:bg-indigo-50 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full text-xs font-black tracking-wide transition-all hover:scale-105"
              label="⚡ COPY FOR POST"
              iconClass="w-4 h-4 text-black"
            />
          </div>

          <div className="grid gap-10">
             {/* HEADLINE */}
             <div className="relative group/field">
               <div className="absolute -left-3 top-0 bottom-0 w-1.5 bg-indigo-500 rounded-full"></div>
               <div className="pl-6">
                 <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Overlay Text / Hook</span>
                   <CopyButton text={result.strategy.headline} className="text-slate-600 hover:text-white opacity-0 group-hover/field:opacity-100 transition-opacity" />
                 </div>
                 <p className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight">{result.strategy.headline}</p>
               </div>
             </div>

             {/* CAPTION */}
             <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 relative group/field hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center mb-6">
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Caption Script</span>
                   <CopyButton text={result.strategy.caption} className="text-slate-600 hover:text-white" />
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 whitespace-pre-wrap leading-8 font-light text-lg">{result.strategy.caption}</p>
                </div>
             </div>

             {/* CTA */}
             <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 p-6 rounded-3xl gap-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <ArrowRight className="w-5 h-5 text-indigo-400" />
                   </div>
                   <span className="text-xs font-black text-indigo-300 uppercase tracking-widest">CALL TO ACTION</span>
                </div>
                <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-2xl border border-indigo-500/30">
                  <span className="font-bold text-white text-lg">{result.strategy.cta}</span>
                  <CopyButton text={result.strategy.cta} className="text-indigo-400 hover:text-white" />
                </div>
             </div>
          </div>

          {/* ACTION BAR */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-4">
             <button 
               onClick={handleSmartShare}
               className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] hover:-translate-y-1 flex items-center justify-center text-sm tracking-wide"
             >
               <Share2 className="w-5 h-5 mr-3" /> SHARE STRATEGY
             </button>
             
             <div className="flex gap-3">
               {[
                 { icon: MessageCircle, url: whatsappUrl, color: 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white border-green-500/20' },
                 { icon: Twitter, url: twitterUrl, color: 'bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white border-sky-500/20' },
                 { icon: Linkedin, url: linkedinUrl, color: 'bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border-blue-600/20' }
               ].map((btn, i) => (
                 <a 
                   key={i} 
                   href={btn.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`p-4 rounded-2xl transition-all border ${btn.color}`}
                 >
                   <btn.icon className="w-5 h-5" />
                 </a>
               ))}
               
               <button onClick={handleDownload} className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all border border-slate-700" title="Download Text File">
                 <Download className="w-5 h-5" />
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* 4. SEO CLOUD */}
      <div ref={seoRef} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center">
              <Hash className="w-4 h-4 mr-2" /> SEO Injection Protocol
          </h3>
          <CopyButton 
             text={result.seo.hiddenKeywords?.join(', ') || ''} 
             className="text-slate-500 hover:text-white text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10" 
             label="COPY ALL KEYWORDS"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
           {result.seo.hiddenKeywords?.map((k, i) => (
             <span key={i} className="text-[11px] font-bold bg-black text-slate-400 border border-slate-800 px-3 py-2 rounded-xl hover:border-slate-600 transition-colors cursor-default hover:text-white">{k}</span>
           ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">Broad (1M+)</span>
               <CopyButton text={result.seo.hashtags?.broad?.join(' ') || ''} className="text-slate-600 hover:text-blue-400" />
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-mono">{result.seo.hashtags?.broad?.join(' ')}</p>
           </div>
           <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Niche (100k+)</span>
               <CopyButton text={result.seo.hashtags?.niche?.join(' ') || ''} className="text-slate-600 hover:text-indigo-400" />
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-mono">{result.seo.hashtags?.niche?.join(' ')}</p>
           </div>
           <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-black text-pink-400 uppercase tracking-wider">Specific (&lt;50k)</span>
               <CopyButton text={result.seo.hashtags?.specific?.join(' ') || ''} className="text-slate-600 hover:text-pink-400" />
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-mono">{result.seo.hashtags?.specific?.join(' ')}</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AnalysisResultView;
