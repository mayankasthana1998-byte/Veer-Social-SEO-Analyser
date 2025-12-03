
import React from 'react';
import { Smartphone, Linkedin, Eye, Youtube, Twitter } from 'lucide-react';

const AcademyAlgorithms: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Algorithm Secrets</h1>
        <p className="text-lg text-slate-400 font-light">Declassified ranking logic for the world's biggest platforms.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TikTok */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Smartphone className="w-6 h-6" /></div>
            <h3 className="font-bold text-white text-xl">TikTok Logic</h3>
          </div>
          <ul className="space-y-6">
              <li>
                <div className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">Ranking Factor #1</div>
                <div className="text-white font-bold text-base mb-2">Retention Rate (The Hook)</div>
                <p className="text-sm text-slate-400 leading-relaxed">TikTok tracks if users watch past the first 3 seconds. If 30% drop off, the video dies immediately. You need a "Pattern Interrupt" visual.</p>
              </li>
              <li>
                <div className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">Ranking Factor #2</div>
                <div className="text-white font-bold text-base mb-2">Search Value (SEO)</div>
                <p className="text-sm text-slate-400 leading-relaxed">TikTok is a Search Engine. It reads text on screen (OCR) and listens to audio (ASR). If you don't say the keyword, you don't rank.</p>
              </li>
          </ul>
        </div>

        {/* LinkedIn */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Linkedin className="w-6 h-6" /></div>
            <h3 className="font-bold text-white text-xl">LinkedIn Logic</h3>
          </div>
          <ul className="space-y-6">
              <li>
                <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-1">Ranking Factor #1</div>
                <div className="text-white font-bold text-base mb-2">Dwell Time + "See More"</div>
                <p className="text-sm text-slate-400 leading-relaxed">The algorithm boosts posts where users click "See More" or spend time reading. This is why "Bro-etry" (short lines) works—it forces scrolling.</p>
              </li>
              <li>
                <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-1">Ranking Factor #2</div>
                <div className="text-white font-bold text-base mb-2">Comment Depth</div>
                <p className="text-sm text-slate-400 leading-relaxed">A "Great post!" comment is worthless. Comments with 5+ words trigger a 2x reach multiplier.</p>
              </li>
          </ul>
        </div>

        {/* Instagram */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-pink-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400"><Eye className="w-6 h-6" /></div>
            <h3 className="font-bold text-white text-xl">Instagram Logic</h3>
          </div>
          <ul className="space-y-6">
              <li>
                <div className="text-xs font-black text-pink-400 uppercase tracking-wider mb-1">Ranking Factor #1</div>
                <div className="text-white font-bold text-base mb-2">Shares & Saves</div>
                <p className="text-sm text-slate-400 leading-relaxed">Likes are a vanity metric. Shares (Relatability) and Saves (Value) tell the algorithm this content is "High Signal."</p>
              </li>
              <li>
                <div className="text-xs font-black text-pink-400 uppercase tracking-wider mb-1">Ranking Factor #2</div>
                <div className="text-white font-bold text-base mb-2">Entity Search</div>
                <p className="text-sm text-slate-400 leading-relaxed">IG connects your Bio, Captions, and Alt Text. You must consistently use the same "Identity Keywords" to own a niche.</p>
              </li>
          </ul>
        </div>

        {/* YouTube */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400"><Youtube className="w-6 h-6" /></div>
            <h3 className="font-bold text-white text-xl">YouTube Logic</h3>
          </div>
          <ul className="space-y-6">
              <li>
                <div className="text-xs font-black text-red-400 uppercase tracking-wider mb-1">Ranking Factor #1</div>
                <div className="text-white font-bold text-base mb-2">CTR (Click Through Rate)</div>
                <p className="text-sm text-slate-400 leading-relaxed">If people don't click, you don't exist. Titles must create a "Curiosity Gap." Thumbnail text must differ from the title.</p>
              </li>
              <li>
                <div className="text-xs font-black text-red-400 uppercase tracking-wider mb-1">Ranking Factor #2</div>
                <div className="text-white font-bold text-base mb-2">Session Time</div>
                <p className="text-sm text-slate-400 leading-relaxed">YouTube wants people ON YouTube. If your video makes them watch *another* video (End Screen), you get boosted.</p>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AcademyAlgorithms;
