import React from 'react';
import { Smartphone, Linkedin, Eye, Youtube, Twitter, Fingerprint, RefreshCcw, Search, Timer } from 'lucide-react';

const AcademyAlgorithms: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Algorithm Secrets (2025)</h1>
        <p className="text-lg text-slate-400 font-light">Declassified ranking logic. The "Black Box" explained and exploited.</p>
      </header>

      <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-indigo-500/20">
         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-indigo-400" />
            The Core Principle: Algorithmic Humanism
         </h3>
         <p className="text-sm text-slate-300 leading-relaxed">
            In 2025, algorithms don't just count keywords; they measure **Meaningful Social Interactions (MSI)**, **Semantic Relevance**, and **Neurochemical Engagement**. They are built to understand human emotion. Our job is to feed them the right emotional signals.
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
             If a user scrolls past your Carousel without engaging, the algorithm considers it a "Missed Opportunity." However, it gives you a second chance.
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-pink-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                If they ignore Slide 1, Instagram will re-inject the same post into their feed hours later, but this time showing <strong>Slide 2</strong> first. <br/><br/>
                <span className="text-white font-bold">Action:</span> Make Slide 1 a powerful "Visual Hook" and Slide 2 a compelling "Text Hook" (e.g., a bold question). This gives you two unique opportunities for the price of one impression.
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
             LinkedIn's 2025 algorithm prioritizes "Knowledge and Advice" by heavily rewarding **Dwell Time**. A "like" is worthless if the user scrolls away instantly.
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-blue-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                **PDF Carousels (Document Posts)** are the ultimate hack. Each swipe is counted as a positive engagement signal, and a 5-10 slide document guarantees high dwell time. This flags your post as "high-value insight" and massively boosts its reach.
             </p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Search className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">TikTok</h3>
             </div>
             <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">HACK: INVISIBLE AUDIO KEYWORD</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             TikTok is a Search Engine first, social network second. It indexes everything: spoken words, on-screen text, and even the video filename.
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-cyan-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
                Use the "Text-to-Speech" function to say your main keyword (e.g., "Best Social SEO Tool"). Then, shrink the text bubble until it's tiny, drag it OFF the screen, and set its volume to 1%. The algorithm "hears" and "reads" the keyword for SEO, but the viewer sees a clean, unobstructed video.
             </p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-red-500/30 transition-colors group">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400"><Youtube className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-white">YouTube</h3>
             </div>
             <span className="text-xs font-bold bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/30">HACK: SESSION START CREDIT</span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
             YouTube's primary goal is to maximize "Session Time" – the total time a user spends on the platform in one sitting.
          </p>
          <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
             <strong className="text-red-400 block mb-2 text-xs uppercase tracking-widest">THE EXPLOIT</strong>
             <p className="text-slate-300 text-sm">
               Share your YouTube video link on external platforms like Reddit, Twitter, or in a newsletter. If a user clicks that link and *starts* a new YouTube session, your video gets a massive "Session Start" credit. The algorithm identifies your content as a valuable entry point to the platform and rewards it with huge priority in the recommendation engine.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademyAlgorithms;