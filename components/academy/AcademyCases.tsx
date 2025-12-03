
import React from 'react';

const AcademyCases: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Tactical Use Cases</h1>
        <p className="text-lg text-slate-400 font-light">Real-world scenarios. Who needs this weapon and why.</p>
      </header>

      <div className="grid gap-8">
        {/* E-Commerce */}
        <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-indigo-500/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-black text-white">The E-Commerce Brand</h3>
              <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full border border-indigo-500/30">GOAL: SALES & CONVERSION</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong>Scenario:</strong> You sell luxury candles.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-indigo-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Use "Spy Mode." Upload 5 videos of viral candle brands. The AI will tell you they all use the "ASMR Crackle Hook." Use "Create Mode" to generate a caption that targets "Self-Care Gift Keywords" for high purchase intent.</p>
              </div>
            </div>
        </div>

        {/* Personal Brand */}
        <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-pink-500/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-black text-white">The Personal Brand</h3>
              <span className="text-xs font-bold bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30">GOAL: AUTHORITY</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong>Scenario:</strong> You are a Fitness Coach.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-pink-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Use "Trend Hunter." Search "Fitness Myths." Find a trending audio. Use "Refine Mode" to turn your messy voice note into a "LinkedIn Bro-etry" post that positions you as the expert who debunks the trend.</p>
              </div>
            </div>
        </div>

        {/* Faceless Channel */}
        <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-black text-white">The Faceless Channel</h3>
              <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30">GOAL: VIRALITY</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong>Scenario:</strong> You run a Motivation page.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-cyan-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Upload a stock video. Select "TikTok." Set Tone to "Hype." The AI will generate a text overlay script that uses "Urgency Psychology" to keep retention high for the first 3 seconds.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCases;
