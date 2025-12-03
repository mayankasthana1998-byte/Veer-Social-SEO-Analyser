
import React from 'react';
import { Smartphone, Linkedin, Eye, Youtube, Twitter, Fingerprint, RefreshCcw, Search, Timer } from 'lucide-react';

const AcademyAlgorithms: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Algorithm Secrets</h1>
        <p className="text-lg text-slate-400 font-light">Declassified ranking logic. The "Black Box" explained.</p>
      </header>

      {/* INTRO BLOCK */}
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
        
        {/* INSTAGRAM HACK */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-pink-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400"><Eye className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-white text-xl">Instagram: The "Carousel Re-Index"</h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reach Multiplier</span>
                </div>
             </div>
             <RefreshCcw className="w-6 h-6 text-pink-500/20 group-hover:text-pink-500 transition-colors" />
          </div>
          <div className="space-y-4">
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <strong className="text-pink-400 text-xs uppercase tracking-widest block mb-1">THE EXPLOIT</strong>
                <p className="text-slate-300 text-sm">
                   Instagram's feed hates wasted inventory. If a user scrolls past your Carousel without engaging, the algorithm considers it a "Missed Opportunity."
                   <br/><br/>
                   <strong>The Hack:</strong> If you post a Carousel, Instagram will show the <em>first slide</em>. If ignored, it will re-inject the same post 12-24 hours later, displaying the <em>second slide</em>. This gives you <strong>2x impressions</strong> for one post.
                </p>
             </div>
             <div className="flex gap-2">
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-[10px] font-bold text-pink-300">Slide 1: Visual Hook</span>
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-[10px] font-bold text-pink-300">Slide 2: Text Hook</span>
             </div>
          </div>
        </div>

        {/* LINKEDIN HACK */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Linkedin className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-white text-xl">LinkedIn: Dwell Time vs. Depth</h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Viral Velocity</span>
                </div>
             </div>
             <Timer className="w-6 h-6 text-blue-500/20 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="space-y-4">
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <strong className="text-blue-400 text-xs uppercase tracking-widest block mb-1">THE EXPLOIT</strong>
                <p className="text-slate-300 text-sm">
                   LinkedIn penalizes "Engagement Bait" (one-word comments). It prioritizes <strong>Dwell Time</strong> (time on screen) and <strong>Comment Depth</strong> (replies to replies).
                   <br/><br/>
                   <strong>The Hack:</strong> Upload content as a <strong>PDF Document</strong>. Every swipe resets the "Dwell Timer," signaling high value. For comments, wait for 3 comments, then reply with a question to start a "Thread." A 3-level thread is weighted <strong>4.5x higher</strong> than 10 solo comments.
                </p>
             </div>
          </div>
        </div>

        {/* TIKTOK HACK */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Smartphone className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-white text-xl">TikTok: The "Search Loop"</h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SEO Injection</span>
                </div>
             </div>
             <Search className="w-6 h-6 text-cyan-500/20 group-hover:text-cyan-500 transition-colors" />
          </div>
          <div className="space-y-4">
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <strong className="text-cyan-400 text-xs uppercase tracking-widest block mb-1">THE EXPLOIT</strong>
                <p className="text-slate-300 text-sm">
                   TikTok is a Search Engine. It reads text (OCR) and listens to audio (ASR). You can rank for keywords you don't want visible.
                   <br/><br/>
                   <strong>The Hack:</strong> Use "Text-to-Speech" to say your keyword (e.g., "Best Crypto Wallet"). Drag the text bubble <strong>off-screen</strong>. Set volume to 1%. The algorithm "hears" and indexes the keyword, but the viewer sees a clean video.
                </p>
             </div>
          </div>
        </div>

        {/* YOUTUBE HACK */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-red-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400"><Youtube className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-white text-xl">YouTube: "Session Start" Token</h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recommendation Engine</span>
                </div>
             </div>
             <Youtube className="w-6 h-6 text-red-500/20 group-hover:text-red-500 transition-colors" />
          </div>
          <div className="space-y-4">
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <strong className="text-red-400 text-xs uppercase tracking-widest block mb-1">THE EXPLOIT</strong>
                <p className="text-slate-300 text-sm">
                   YouTube rewards videos that bring people <em>onto</em> the platform.
                   <br/><br/>
                   <strong>The Hack:</strong> If a user clicks your link from LinkedIn/Twitter and starts a YouTube session, your video gets a "Session Start" token. These tokens drastically boost your probability of appearing in the "Recommended Sidebar" because you are a proven traffic source.
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademyAlgorithms;
