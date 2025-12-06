import React from 'react';
import { RefineData, Platform } from '../types';
import { Check, Copy, AlertTriangle, Linkedin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

interface Props {
  data: RefineData;
  platform: Platform;
}

const PlatformSpecificResultView: React.FC<Props> = ({ data, platform }) => {
  const { audit, refinedContent } = data;

  const getPlatformConfig = (p: Platform) => {
    switch (p) {
      case Platform.LINKEDIN: return { icon: Linkedin, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', title: 'LinkedIn "Top Voice" Audit' };
      case Platform.INSTAGRAM: return { icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', title: 'Instagram "Mosseri" Audit' };
      case Platform.TWITTER: return { icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', title: 'X/Twitter "Viral Thread" Audit' };
      case Platform.YOUTUBE: return { icon: Youtube, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', title: 'YouTube "Retention" Audit' };
      case Platform.FACEBOOK: return { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10', border: 'border-blue-600/20', title: 'Facebook "Community" Audit' };
      default: return { icon: Check, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', title: 'General Audit' };
    }
  };

  const config = getPlatformConfig(platform);
  const Icon = config.icon;

  const handleCopy = () => {
    let fullPost = '';
    if (platform === Platform.YOUTUBE) {
      // For YouTube, Title and Description are separate fields
      fullPost = `Title: ${refinedContent.headline}\n\nDescription:\n${refinedContent.body}\n\n${refinedContent.cta}`;
    } else {
      const hashtags = refinedContent.hashtags.map(h => `#${h.replace('#', '')}`).join(' ');
      fullPost = `${refinedContent.headline}\n\n${refinedContent.body}\n\n${refinedContent.cta}\n\n${hashtags}`;
    }
    navigator.clipboard.writeText(fullPost);
    alert('Optimized post copied to clipboard!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* AUDIT CARD */}
      <div className="bg-slate-900/80 border border-red-500/20 rounded-[2rem] p-8 backdrop-blur-xl relative">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
            <h3 className="text-sm font-black text-red-100 uppercase tracking-widest">CRITICAL AUDIT</h3>
         </div>
         <div className="grid md:grid-cols-2 gap-8">
            <div>
                <span className="text-[10px] font-bold text-red-400 uppercase mb-2 block">Detected Flaw</span>
                <p className="text-white text-lg font-medium leading-snug">{audit.flaw}</p>
            </div>
            <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase mb-2 block">The 2025 Fix</span>
                <p className="text-slate-300 text-sm leading-relaxed">{audit.fix}</p>
            </div>
         </div>
         <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5 text-xs text-slate-500 italic">
            "{audit.explanation}"
         </div>
      </div>

      {/* REFINED CONTENT CARD */}
      <div className={`bg-slate-900/80 border ${config.border} rounded-[2rem] p-8 backdrop-blur-xl relative shadow-2xl`}>
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
                <div className={`p-2 ${config.bg} rounded-lg`}><Icon className={`w-5 h-5 ${config.color}`} /></div>
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">REFINED POST</h3>
                    <p className="text-[10px] text-slate-500 font-mono">Optimized for {platform}</p>
                </div>
            </div>
            <button onClick={handleCopy} className={`flex items-center gap-2 px-4 py-2 ${config.bg} ${config.color} rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all`}>
                <Copy className="w-3 h-3" /> COPY POST
            </button>
         </div>
         <div className="space-y-6">
            {refinedContent.headline && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">{platform === Platform.YOUTUBE ? 'Optimized Title' : 'Headline'}</label>
                <p className="text-2xl font-black text-white leading-tight">{refinedContent.headline}</p>
              </div>
            )}
            {refinedContent.body && (
              <div>
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">{platform === Platform.YOUTUBE ? 'Script / Description' : 'Body'}</label>
                 <p className="text-slate-300 text-base leading-7 whitespace-pre-wrap">{refinedContent.body}</p>
              </div>
            )}
            {refinedContent.cta && <div className={`p-4 rounded-xl border ${config.border} ${config.bg}`}><span className={`font-bold ${config.color}`}>{refinedContent.cta}</span></div>}
            
            {platform === Platform.YOUTUBE && refinedContent.videoTags && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Video Tags</label>
                <p className="text-cyan-300 text-xs font-mono leading-relaxed">{refinedContent.videoTags.join(', ')}</p>
              </div>
            )}

            {refinedContent.hashtags && refinedContent.hashtags.length > 0 && <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Hashtags</label>
                <div className="flex flex-wrap gap-3">
                    {refinedContent.hashtags.map((tag, i) => (
                        <span key={i} className="text-xs text-slate-400 font-mono">#{tag.replace('#', '')}</span>
                    ))}
                </div>
            </div>}
         </div>
      </div>
    </div>
  );
};

export default PlatformSpecificResultView;