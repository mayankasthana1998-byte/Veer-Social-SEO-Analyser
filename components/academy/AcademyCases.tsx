import React from 'react';

const AcademyCases: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Tactical Use Cases</h1>
        <p className="text-lg text-slate-400 font-light">Real-world scenarios demonstrating how to leverage the engine's power.</p>
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
                <strong>Scenario:</strong> You're launching a new line of sustainable coffee beans.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-indigo-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Use **Spy Mode** on 5 viral coffee-making videos. The AI will identify the "ASMR Pour Hook" as the winning pattern. Then, use **Create Mode** with your product video, select 'Instagram Reel,' and set the Goal to 'Sales'. The AI will generate a caption that uses a **Reciprocity Trigger** ("Here's the perfect pour technique...") and targets high-intent keywords like "best single origin beans."</p>
              </div>
            </div>
        </div>

        {/* Personal Brand */}
        <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-pink-500/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-black text-white">The Personal Brand / Coach</h3>
              <span className="text-xs font-bold bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30">GOAL: AUTHORITY & LEAD GENERATION</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong>Scenario:</strong> You are a financial advisor trying to build credibility on LinkedIn.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-pink-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Use **Refine Mode**. Paste a transcript of you explaining a complex topic like "tax-loss harvesting." Select 'LinkedIn' and 'PDF/Carousel' as the format. The AI will transform your messy text into a 7-slide, high-dwell-time carousel using an **Authority Trigger** ("After 10 years in finance, here's the one mistake I see...") and end with a lead-generating CTA.</p>
              </div>
            </div>
        </div>

        {/* Faceless Channel */}
        <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-2xl font-black text-white">The Agency / Social Media Manager</h3>
              <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30">GOAL: CLIENT GROWTH & RETENTION</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong>Scenario:</strong> You need fresh, viral ideas for a new client in the competitive "Vegan Food" niche.
              </p>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <strong className="text-cyan-400 block mb-2 text-xs uppercase tracking-widest">THE HACK</strong>
                <p className="text-slate-300 text-sm">Use **Hunt Mode**. Set Niche to "Vegan Recipes" and Platform to "TikTok." The AI will find a "breakout" trending audio. Click "Generate Strategy." The AI will create a complete video concept using that audio, including a **Pattern Interrupt Hook** ("You've been making vegan mac & cheese WRONG") and on-screen text optimized for TikTok's search algorithm.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCases;
