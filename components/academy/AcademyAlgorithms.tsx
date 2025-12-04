import React from 'react';
import { Smartphone, Linkedin, Eye, Youtube, Twitter, Fingerprint, RefreshCcw, Search, Timer } from 'lucide-react';

const AcademyAlgorithms: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Algorithm Secrets</h1>
        <p className="text-lg text-slate-400 font-light">Declassified ranking logic. The "Black Box" explained.</p>
      </header>

      <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-indigo-500/20">
         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-indigo-400" />
            The "Non-Temporal" Doctrine
         </h3>
         <p className="text-sm text-slate-300 leading-relaxed">
            Most advice says "post when your audience is active." This is false for new accounts. To go viral with zero followers, you must exploit <strong>Non-Temporal Signals</strong>—technical triggers that force the algorithm to distribute your content regardless of time.
         </p>
      </div>

      <div className="grid gap-8">
        
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-pink-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400"><Eye className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">Instagram</h3>
             </div>
             <span className="text-xs font-bold bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30">HACK: CAROUSEL RE-INDEX</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             Instagram hates wasted inventory. If a user scrolls past your Carousel without engaging, the algorithm considers it a "Missed Opportunity."
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-pink-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                If they scroll past Slide 1, Instagram re-injects the post 12 hours later but shows <strong>Slide 2</strong> instead. <br/><br/>
                <span className="text-white font-bold">Action:</span> Use a "Visual Hook" on Slide 1 and a "Text Hook" on Slide 2. This gives you two chances for one impression.
             </p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Linkedin className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">LinkedIn</h3>
             </div>
             <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">HACK: DWELL TIME RATIO</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             LinkedIn penalizes "Engagement Bait" (one-word comments). It prioritizes <strong>Dwell Time</strong> (time on screen).
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-blue-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                A 10-slide PDF Document forces the user to swipe and read, guaranteeing 30s+ dwell time. This flags the post as "Industry Insight" rather than spam.
             </p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Search className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">TikTok</h3>
             </div>
             <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">HACK: SEARCH LOOP</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             TikTok is a Search Engine (SEO), not a social network. It reads text on screen (OCR).
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-cyan-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                Add "Text-to-Speech" of your main keyword (e.g. "Best Crypto Wallet"). Slide the text bubble OFF SCREEN so it is invisible. Set volume to 1%. The algorithm "hears" and "reads" the keyword, indexing you for search, but the viewer sees a clean video.
             </p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-red-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400"><Youtube className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">YouTube</h3>
             </div>
             <span className="text-xs font-bold bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/30">HACK: SESSION TOKEN</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             YouTube cares about "Session Time" (Total time on platform).
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-red-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                Post links to your video on Reddit/Twitter. If a user clicks your link and *starts* a YouTube session, you get the "Session Start" credit. These videos are prioritized in recommendations because they bring people *to* the app.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademyAlgorithms;