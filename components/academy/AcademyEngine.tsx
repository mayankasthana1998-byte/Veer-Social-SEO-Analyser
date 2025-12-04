import React from 'react';
import { Zap, Eye, ShieldCheck, Cpu } from 'lucide-react';

const AcademyEngine: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">The Andromeda Engine</h1>
        <p className="text-lg text-slate-400 font-light">How this software reverse-engineers viral success.</p>
      </header>

      <div className="space-y-8">
          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
                <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">1. Semantic Weaving</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  Most AI tools just "stuff" keywords, which triggers spam filters. Andromeda uses <strong>Semantic Weaving</strong>. It analyzes the Contextual Vector of your image/video and inserts high-value SEO keywords naturally into the narrative flow. This tricks the algorithm into thinking the text is purely organic, while still triggering search indexing.
                </p>
            </div>
          </div>

          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">2. Visual Hook Extraction</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  For videos >100MB, the app uses <strong>Frame Sampling</strong>. It extracts 5 key visual moments (Start, Action, End) and analyzes them for "Scroll Stopping Power." It then writes a text overlay that strictly matches the visual action in the first 3 seconds to guarantee retention.
                </p>
            </div>
          </div>

          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">3. The 20-Year Strategist Persona</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  We didn't just plug in a chatbot. We programmed the AI with specific frameworks from 20 years of marketing psychology (AIDA, PAS, StoryLoops). It adapts its "Brain" based on the platform—becoming a "Debater" on Twitter and a "Supporter" on Facebook.
                </p>
            </div>
          </div>
          
          <div className="flex gap-8 p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]">
                <Cpu className="w-8 h-8 text-orange-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">4. Live Trend Injection</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  In Hunt Mode, the engine connects to Google Search Grounding to pull real-time data from TikTok Creative Center and Google Trends. It doesn't guess what's popular; it reads the live web.
                </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AcademyEngine;