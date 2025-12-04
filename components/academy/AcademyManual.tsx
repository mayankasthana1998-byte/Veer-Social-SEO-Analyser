import React from 'react';
import { Sparkles, Settings2, BrainCircuit, Flame, ShieldCheck } from 'lucide-react';

const AcademyManual: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Operator's Manual</h1>
        <p className="text-lg text-slate-400 font-light">Step-by-step tactical execution protocols for maximum algorithmic impact.</p>
      </header>

      <div className="grid gap-8">
        {/* MODE A */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-500/10 rounded-2xl">
               <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">MODE A: CREATE</h3>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Generation Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Best for turning raw assets into viral-ready posts. This mode uses "Semantic Weaving" to analyze your visual and generate a strategy that feels human but ranks like a machine.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Upload Media:</strong> Drop a Video (up to 1GB) or Image. The AI "watches" it to understand the vibe.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Select Platform:</strong> Choose where you are posting (e.g., Instagram). This changes the AI's "brain."</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Hyper-Targeting:</strong> Select your Tone (e.g., Contrarian) and Goal (e.g., Saves).</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">4</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Brand Guard:</strong> (Optional) Paste your brand voice rules so the AI doesn't sound generic.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">5</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Execute:</strong> Click Initialize. Review the "Before vs. After" score to see the lift.</p>
             </div>
          </div>
        </div>

        {/* MODE B */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-pink-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-pink-500/10 rounded-2xl">
               <Settings2 className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">MODE B: REFINE</h3>
              <p className="text-xs font-bold text-pink-400 uppercase tracking-widest">Draft Editor Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Best for polishing messy thoughts into gold. Perfect for voice notes, rough ideas, or converting a blog post into social copy.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Paste Draft:</strong> Dump your rough text. Don't worry about grammar.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Select Platform:</strong> Choose the destination to optimize the tone and structure.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Context Injection:</strong> Add specific keywords you want to rank for.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">4</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Vibe Polish:</strong> The AI applies "Vibe Injection" to add relevant emojis and format the text for readability.</p>
             </div>
          </div>
        </div>

        {/* MODE C */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-2xl">
               <BrainCircuit className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">MODE C: SPY</h3>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Reverse Engineering Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Stop guessing. Steal what works. This mode analyzes your competitors to find the "Viral Pattern" hidden in their content.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Gather Intel:</strong> Take 2-5 screenshots of viral posts in your niche.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Copy Captions:</strong> Paste their captions into the text box.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Upload Visuals:</strong> Drop the screenshots/videos into the upload zone.</p>
             </div>
          </div>
        </div>

        {/* MODE D */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-2xl">
               <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">MODE D: HUNT</h3>
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Live Trend Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Find out what is trending RIGHT NOW. Uses Google Search Grounding to pull live data.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Define Target:</strong> Enter your niche (e.g., "AI Tech") and Platform.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Scan:</strong> The AI scans TikTok Creative Center and Google Trends.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Auto-Generate:</strong> Click "Use This Trend" to instantly generate a post based on that trending topic.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyManual;