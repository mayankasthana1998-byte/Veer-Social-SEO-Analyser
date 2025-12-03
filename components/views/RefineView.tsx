
import React, { useEffect } from 'react';
import { Settings2, Instagram, Music2, Youtube, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Platform } from '../../types';

interface RefineViewProps {
  config: any;
  setConfig: (c: any) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
}

const PLATFORM_FORMATS: Record<Platform, string[]> = {
  [Platform.INSTAGRAM]: ['Reel', 'Carousel', 'Caption Only'],
  [Platform.TIKTOK]: ['Script', 'Caption', 'Overlay Text'],
  [Platform.YOUTUBE]: ['Description', 'Shorts Script', 'Community Post'],
  [Platform.LINKEDIN]: ['Post', 'Article', 'PDF Slide Text'],
  [Platform.TWITTER]: ['Thread', 'Tweet'],
  [Platform.FACEBOOK]: ['Post', 'Video Description'],
};

const RefineView: React.FC<RefineViewProps> = ({ config, setConfig, platform, setPlatform }) => {

  // Reset Format when Platform changes
  useEffect(() => {
    setConfig((prev: any) => ({
       ...prev,
       contentFormat: PLATFORM_FORMATS[platform]?.[0] || 'Post'
    }));
  }, [platform]);

  const getPlatformStyle = (p: Platform, isSelected: boolean) => {
    if (!isSelected) return 'bg-slate-900/40 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-white';
    switch (p) {
      case Platform.INSTAGRAM: return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white border-pink-400 shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]';
      case Platform.TIKTOK: return 'bg-black text-white border-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] border-l-4 border-l-cyan-400 border-r-4 border-r-red-500'; 
      case Platform.YOUTUBE: return 'bg-[#FF0000] text-white border-red-500 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]';
      case Platform.TWITTER: return 'bg-[#1DA1F2] text-white border-sky-400 shadow-[0_0_20px_-5px_rgba(29,161,242,0.5)]';
      case Platform.LINKEDIN: return 'bg-[#0077b5] text-white border-blue-400 shadow-[0_0_20px_-5px_rgba(0,119,181,0.5)]';
      case Platform.FACEBOOK: return 'bg-[#1877F2] text-white border-blue-500 shadow-[0_0_20px_-5px_rgba(24,119,242,0.5)]';
      default: return 'bg-indigo-600 text-white border-indigo-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
         
         <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
               <Settings2 className="w-6 h-6 text-pink-400" />
            </div>
            <div>
               <h2 className="text-2xl font-black text-white tracking-tight">DRAFT REFINEMENT</h2>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Semantic Polishing Engine</p>
            </div>
         </div>

         {/* Platform Selector */}
         <div className="mb-6">
            <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-widest pl-2">Target Platform</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
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
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${getPlatformStyle(p.id, platform === p.id)} ${platform === p.id ? 'scale-105' : ''}`}
                >
                  <p.icon size={20} />
                  <span className="text-[10px] font-bold uppercase">{p.label}</span>
                </button>
              ))}
            </div>
         </div>

         {/* Format Selector */}
         <div className="mb-6 bg-black/30 rounded-2xl p-4 border border-white/5">
            <label className="text-[10px] font-bold text-pink-300 uppercase mb-2 block tracking-wider">Content Format</label>
            <select 
              value={config.contentFormat}
              onChange={(e) => setConfig({...config, contentFormat: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-pink-500 transition-colors"
            >
              {PLATFORM_FORMATS[platform]?.map((fmt) => (
                 <option key={fmt} value={fmt}>{fmt}</option>
              ))}
            </select>
         </div>

         <div className="space-y-6">
            <div>
               <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-widest pl-2">
                  Context / Keywords (Optional)
               </label>
               <input 
                  type="text"
                  placeholder="e.g. SEO, Organic Growth, Q4 Sales"
                  value={config.keywords}
                  onChange={(e) => setConfig({...config, keywords: e.target.value})}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-5 text-sm text-white focus:border-pink-500 outline-none transition-colors"
               />
            </div>

            <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-widest pl-2">
                  Raw Content Input
                </label>
                <textarea 
                  className="w-full h-64 bg-black/40 border border-white/10 rounded-2xl p-6 text-base text-white focus:border-pink-500 outline-none resize-none font-medium leading-relaxed placeholder-slate-600"
                  placeholder="Paste your messy thoughts, voice notes, or rough draft here..."
                  value={config.originalText}
                  onChange={(e) => setConfig({...config, originalText: e.target.value})}
                />
            </div>
         </div>
      </div>
    </div>
  );
};

export default RefineView;
