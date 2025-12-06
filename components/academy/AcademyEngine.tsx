import React from 'react';
import { Zap, Eye, ShieldCheck, Cpu, BrainCircuit } from 'lucide-react';

const AcademyEngine: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Multi-Layer Analysis Framework</h1>
        <p className="text-lg text-slate-400 font-light">This is not a simple chatbot. We use a sophisticated multi-layer process to engineer virality.</p>
      </header>

      <div className="space-y-8">
          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
                <Cpu className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">1. NLP & Semantic Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  The engine uses a fine-tuned BERT model to convert text into 768-dimensional vectors, allowing it to understand context, not just keywords. It extracts entities, parses sentence structure, and performs **Semantic Weaving**—inserting SEO keywords naturally into a narrative flow to bypass spam filters while triggering search indexing.
                </p>
            </div>
          </div>

          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <BrainCircuit className="w-8 h-8 text-purple-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">2. Emotional & Psychological Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  Using an 11-category emotion classifier, the AI assigns an emotional profile to the content (Joy, Trust, Surprise, etc.). Simultaneously, it scans for the linguistic patterns of the **7 core psychological triggers** (like Scarcity language or Social Proof markers) to determine the content's persuasive power.
                </p>
            </div>
          </div>

          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">3. Platform Intelligence Layer</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  This is the core of the engine. It runs the analyzed data through a proprietary model trained on the specific 2025 algorithm of the target platform. It predicts platform-specific metrics like **Watch Time (TikTok)**, **Save Rate (Instagram)**, or **Dwell Time (LinkedIn)** to generate a final, hyper-optimized strategy.
                </p>
            </div>
          </div>
          
          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]">
                <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">4. Humanization & Recommendation</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  Finally, the "Humanizer" module post-processes the output, removing AI fluff and injecting micro-emotions. The Recommendation Engine then compiles the final report, providing a content score, actionable suggestions, and A/B testing ideas to ensure you have a complete battle plan.
                </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AcademyEngine;
