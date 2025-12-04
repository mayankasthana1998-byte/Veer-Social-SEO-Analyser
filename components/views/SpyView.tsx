import React from 'react';
import { Eye, Crosshair, BrainCircuit } from 'lucide-react';
import FileUpload from '../FileUpload';
import { FileInput } from '../../types';

interface SpyViewProps {
  files: FileInput[];
  setFiles: React.Dispatch<React.SetStateAction<FileInput[]>>;
  config: any;
  setConfig: (c: any) => void;
}

const SpyView: React.FC<SpyViewProps> = ({ files, setFiles, config, setConfig }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 mb-4">
          <BrainCircuit className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">THE STRATEGIST</h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto">
          Reverse-engineer competitor content. Upload their posts and paste their captions to uncover the viral formula and ranking secrets they use.
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
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Competitor Text Analysis</p>
                  </div>
               </div>

               <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Paste the exact captions used by your competitors. The AI will cross-reference this text with the visual patterns found in your uploaded screenshots.
               </p>

               <textarea 
                  className="w-full h-60 bg-black/40 border border-cyan-500/30 rounded-xl p-5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed placeholder-slate-600"
                  placeholder="// PASTE COMPETITOR CAPTIONS HERE..."
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
                     <h2 className="text-xl font-black text-white tracking-tight">VISUAL EVIDENCE</h2>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pattern Recognition</p>
                  </div>
               </div>
               
               <p className="text-sm text-slate-400 mb-6">
                  Upload at least 2 screenshots or videos of viral posts.
               </p>

               <FileUpload files={files} setFiles={setFiles} multiple={true} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default SpyView;