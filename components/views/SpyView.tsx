import React from 'react';
import { Eye, Crosshair, BrainCircuit, Instagram, Music2, Youtube, Linkedin, Twitter, Facebook } from 'lucide-react';
import FileUpload from '../FileUpload';
import { FileInput, Platform } from '../../types';

interface SpyViewProps {
  files: FileInput[];
  setFiles: React.Dispatch<React.SetStateAction<FileInput[]>>;
  config: any;
  setConfig: (c: any) => void;
  isAnalyzing: boolean;
  platform: Platform;
  handleSetPlatform: (p: Platform) => void;
}

const SpyView: React.FC<SpyViewProps> = ({ files, setFiles, config, setConfig, isAnalyzing, platform, handleSetPlatform }) => {
  
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
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 mb-4">
          <BrainCircuit className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">THE STRATEGIST</h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto">
          Reverse-engineer competitor content. Paste their post URL to uncover the viral formula and ranking secrets they use.
        </p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
               
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                     <Crosshair className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-white tracking-tight">DATA INGESTION</h2>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Analysis Configuration</p>
                  </div>
               </div>

                <div className="mb-6">
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-3 block tracking-widest pl-2">Target Platform</label>
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
                        onClick={() => handleSetPlatform(p.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${getPlatformStyle(p.id, platform === p.id)} ${platform === p.id ? 'scale-105' : ''}`}
                      >
                        <p.icon size={20} />
                        <span className="text-[10px] font-bold uppercase">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

               <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Paste the competitor's post URL. The AI will use Search to analyze the live content. You can also optionally upload media if no URL is available.
               </p>

               <textarea 
                  className="w-full h-24 bg-black/40 border border-cyan-500/30 rounded-xl p-5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed placeholder-slate-600"
                  placeholder="PASTE COMPETITOR URL OR CAPTION HERE..."
                  value={config.originalText}
                  onChange={(e) => setConfig({...config, originalText: e.target.value})}
               />
            </div>
         </div>

         <div className="lg:col-span-7">
            <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                     <Eye className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-white tracking-tight">VISUAL EVIDENCE (OPTIONAL)</h2>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pattern Recognition</p>
                  </div>
               </div>
               
               <FileUpload files={files} setFiles={setFiles} multiple={true} isAnalyzing={isAnalyzing} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default SpyView;