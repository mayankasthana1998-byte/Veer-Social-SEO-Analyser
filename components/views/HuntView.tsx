import React from 'react';
import { Search, Flame, Instagram, Music2, Youtube, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Platform, TrendItem } from '../../types';

interface HuntViewProps {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  config: any;
  setConfig: (c: any) => void;
  trendResults: TrendItem[] | null;
  handleUseTrend: (t: TrendItem) => void;
  handleCopyTrend: (t: TrendItem, i: number) => void;
  copiedTrendIndex: number | null;
}

const HuntView: React.FC<HuntViewProps> = ({ 
  platform, setPlatform: handleSetPlatform, config, setConfig, 
  trendResults, handleUseTrend, handleCopyTrend, copiedTrendIndex 
}) => {

  const getPlatformStyle = (p: Platform, isSelected: boolean) => {
    if (!isSelected) return 'bg-slate-900/40 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-white';
    
    switch (p) {
      case Platform.INSTAGRAM:
        return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white border-pink-400 shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]';
      case Platform.TIKTOK:
        return 'bg-black text-white border-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] border-l-4 border-l-cyan-400 border-r-4 border-r-red-500';
      case Platform.YOUTUBE:
        return 'bg-[#FF0000] text-white border-red-500 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]';
      case Platform.TWITTER:
        return 'bg-[#1DA1F2] text-white border-sky-400 shadow-[0_0_20px_-5px_rgba(29,161,242,0.5)]';
      case Platform.LINKEDIN:
        return 'bg-[#0077b5] text-white border-blue-400 shadow-[0_0_20px_-5px_rgba(0,119,181,0.5)]';
      case Platform.FACEBOOK:
        return 'bg-[#1877F2] text-white border-blue-500 shadow-[0_0_20px_-5px_rgba(24,119,242,0.5)]';
      default:
        return 'bg-indigo-600 text-white border-indigo-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      <div className="text-center">
        <div className="inline-block p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 mb-4">
          <Flame className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">THE SCOUT</h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto">
          Scan the live web for breaking trends, viral audio, and high-ROI topics in your niche before they saturate.
        </p>
      </div>

      {/* 1. SEARCH CONFIG */}
      <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

         {/* Platform Selector */}
         <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
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
                onClick={() => handleSetPlatform(p.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${getPlatformStyle(p.id, platform === p.id)} ${platform === p.id ? 'scale-105' : ''}`}
              >
                <p.icon size={20} />
                <span className="text-[10px] font-bold uppercase">{p.label}</span>
              </button>
            ))}
         </div>

         {/* Niche Input */}
         <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <input 
              type="text"
              className="relative w-full bg-slate-900 border border-orange-500/30 rounded-2xl py-5 pl-12 pr-4 text-white text-lg font-bold placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="Enter Niche (e.g. AI Tech, Vegan Food, Crypto...)"
              value={config.niche}
              onChange={(e) => setConfig({...config, niche: e.target.value})}
            />
            <Search className="absolute left-4 top-5 w-6 h-6 text-orange-500" />
         </div>
      </div>

      {/* 2. RESULTS */}
      {trendResults && (
         <div className="space-y-4 animate-fade-in pb-20">
           <div className="flex items-center justify-between mb-2 px-4">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Flame className="w-4 h-4 text-orange-500" /> Search Results
              </h3>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                {trendResults.length} TRENDS FOUND
              </span>
           </div>
           
           {trendResults.map((trend, i) => (
              <div key={i} className="bg-slate-900/60 border border-white/5 hover:border-orange-500/40 p-6 rounded-[2rem] group transition-all relative backdrop-blur-md hover:bg-slate-900/80">
                 <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-black text-white leading-tight pr-4">{trend.headline}</h4>
                    <div className="flex gap-2 shrink-0">
                       <button
                         onClick={() => handleCopyTrend(trend, i)}
                         className="p-2 rounded-xl bg-slate-800 hover:bg-white text-slate-400 hover:text-slate-900 transition-colors"
                         title="Copy Trend"
                       >
                          {copiedTrendIndex === i ? <span className="text-emerald-500 font-bold text-xs">COPIED</span> : <span className="text-xs font-bold">COPY</span>}
                       </button>
                    </div>
                 </div>
                 <p className="text-sm text-slate-300 mb-6 leading-relaxed border-l-2 border-orange-500/50 pl-4">
                   {trend.whyItsHot}
                 </p>
                 <div className="bg-black/40 p-5 rounded-2xl border border-white/5 mb-6">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Execution Blueprint</div>
                    <p className="text-sm text-indigo-100 font-medium leading-relaxed">{trend.contentIdea}</p>
                 </div>
                 <div className="flex justify-between items-center mb-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${
                       trend.difficulty === 'Hard' ? 'bg-red-500' : trend.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                     }`}></span>
                     {trend.difficulty} Difficulty
                   </span>
                   <span className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{trend.platform}</span>
                 </div>
                 <button 
                   onClick={() => handleUseTrend(trend)}
                   className="w-full py-4 bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest border border-orange-500/20 hover:border-orange-500 shadow-lg hover:shadow-orange-600/20"
                 >
                    GENERATE STRATEGY FROM THIS TREND
                 </button>
              </div>
           ))}
         </div>
      )}

      {!trendResults && (
        <div className="text-center py-20 opacity-30">
           <Flame className="w-16 h-16 mx-auto mb-4 text-slate-500" />
           <p className="text-sm font-bold text-slate-500">READY TO HUNT</p>
        </div>
      )}

    </div>
  );
};

export default HuntView;
