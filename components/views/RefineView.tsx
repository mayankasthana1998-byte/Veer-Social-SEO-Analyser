import React from 'react';
import { Settings2 } from 'lucide-react';

interface RefineViewProps {
  config: any;
  setConfig: (c: any) => void;
}

const RefineView: React.FC<RefineViewProps> = ({ config, setConfig }) => {
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