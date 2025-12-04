import React from 'react';
import { Sparkles, Settings2, BrainCircuit, Flame, ShieldCheck } from 'lucide-react';

const AcademyManual: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Operator's Manual</h1>
        <p className="text-lg text-slate-400 font-light">Step-by-step tactical execution protocols for maximum algorithmic impact based on the 2025 landscape.</p>
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
             Best for turning raw assets (videos, images, ideas) into viral-ready posts. This mode uses "Semantic Weaving" to analyze your visual and generate a complete strategy that feels human but ranks like a machine.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Upload Media:</strong> Provide a Video, Image, or PDF. The AI "watches" or "reads" it to understand the core concept and vibe.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Select Platform:</strong> This is critical. Choosing 'TikTok' vs 'LinkedIn' completely changes the AI's core logic, format, and tone to match the platform's 2025 algorithm.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Hyper-Targeting:</strong> Define your desired Tone (e.g., Contrarian) and Goal (e.g., driving Saves) to calibrate the psychological triggers.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">4</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Brand Guard (Optional):</strong> Paste your brand's "do not say" list or voice rules to ensure the output is perfectly on-brand.</p>
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
              <p className="text-xs font-bold text-pink-400 uppercase tracking-widest">Humanizer Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Best for polishing messy thoughts into gold. Perfect for transcribing voice notes, cleaning up rough ideas, or converting a long-form blog post into powerful social copy.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Paste Draft:</strong> Input your raw, unedited text. Don't worry about grammar or structure.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Select Platform:</strong> The AI will reformat the text to be optimal for the chosen platform (e.g., into a Twitter thread or a LinkedIn "bro-etry" post).</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Context Injection:</strong> Add core keywords to ensure the refined text is SEO-optimized.</p>
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
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Reverse-Engineering Protocol</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Stop guessing, start winning. This mode analyzes your competitors to find the hidden psychological triggers and algorithmic hacks that make their content successful.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Gather Intel:</strong> Upload 2-5 screenshots or videos of viral posts from your competitors or niche.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Copy Captions:</strong> Paste their exact captions into the text box for cross-analysis.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Uncover Formula:</strong> The AI generates a "Spy Matrix" detailing their hooks, why they work psychologically, and the specific algorithm hack they are exploiting.</p>
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
             Find out what's trending *right now* before it saturates. This mode uses live Google Search grounding to pull real-time data on breakout topics, sounds, and formats.
          </p>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">1</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Define Target:</strong> Enter your Niche (e.g., "AI Tech") and select the target Platform.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">2</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Scan Live Web:</strong> The AI queries sources like TikTok Creative Center and Google Trends for "breakout" opportunities—high growth, low competition topics.</p>
             </div>
             <div className="flex gap-4 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-white shrink-0">3</span>
                <p className="text-sm text-slate-400"><strong className="text-white">Auto-Generate:</strong> Click "Generate Strategy From This Trend" to instantly create an optimized post for that exact topic.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyManual;