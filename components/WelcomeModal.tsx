
import React from 'react';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
  onOpenAcademy: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose, onOpenAcademy }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-inter">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"></div>

      {/* Holographic Card */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-[2.5rem] p-1 overflow-hidden shadow-[0_0_100px_-20px_rgba(99,102,241,0.5)] animate-slide-up">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="bg-slate-950/80 backdrop-blur-md rounded-[2.3rem] p-6 md:p-10 relative z-10">
          
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3">
                <Sparkles className="w-8 h-8 text-white" />
             </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-3 tracking-tight">
            System Online
          </h2>
          <p className="text-center text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            Welcome to the Andromeda Engine
          </p>

          <p className="text-slate-400 text-center text-xs md:text-sm leading-relaxed mb-8">
            You have accessed the world's most advanced <strong>Social SEO Architect</strong>. 
            This neural interface is designed to reverse-engineer viral algorithms and generate high-performance metadata.
          </p>

          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 mb-8">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                   <ShieldCheck className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                   <h4 className="text-xs font-bold text-white mb-1">Protocol Advisory</h4>
                   <p className="text-[10px] text-slate-500 leading-relaxed">
                      For maximum results, we recommend reviewing the <strong>Academy Protocols</strong> to understand how we exploit platform-specific ranking factors.
                   </p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => { onClose(); onOpenAcademy(); }}
               className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 hover:border-slate-600"
             >
                <BookOpen className="w-4 h-4" /> OPEN ACADEMY
             </button>
             <button 
               onClick={onClose}
               className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02]"
             >
                INITIALIZE <ArrowRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
