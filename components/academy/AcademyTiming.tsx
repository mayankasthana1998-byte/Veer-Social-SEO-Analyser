import React from 'react';
import { Clock, Calendar, Zap } from 'lucide-react';

const AcademyTiming: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto pb-20">
      
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Viral Timing: The Chitragupt Schedule</h1>
        <p className="text-lg text-slate-400 font-light">
           Optimized for high-density markets like <strong>India (IST)</strong>. We target "Gap Times"—windows where competition is low, but algorithmic testing is active, giving you an unfair advantage.
        </p>
      </header>

      {/* IST VELOCITY TABLE */}
      <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-white/5">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
               <Clock className="w-6 h-6 text-orange-500" /> 
               Gap Time Velocity Schedule (IST)
            </h3>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">THE RULE: NEVER POST ON THE HOUR (e.g. 5:00). ALWAYS POST AT :15 or :45.</p>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-black/40 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <th className="p-6">Platform</th>
                     <th className="p-6">Format</th>
                     <th className="p-6 text-orange-400">Gap Time (IST)</th>
                     <th className="p-6">The "Chitragupt" Logic</th>
                  </tr>
               </thead>
               <tbody className="text-sm text-slate-300">
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">Instagram</td>
                     <td className="p-6"><span className="bg-pink-500/10 text-pink-300 px-2 py-1 rounded border border-pink-500/20 text-xs font-bold">Reels</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">11:15 AM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The Lunch Pre-Load.</strong> Servers refresh queues before the massive 1:00 PM user spike. Posting here lets the AI "batch test" your content on a seed audience early.
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">Instagram</td>
                     <td className="p-6"><span className="bg-pink-500/10 text-pink-300 px-2 py-1 rounded border border-pink-500/20 text-xs font-bold">Carousel</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">7:45 PM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>Dinner Commute Dip.</strong> Office travel ends. Attention span is high for reading text before users switch to passive "Netflix Mode." High engagement signal.
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">TikTok</td>
                     <td className="p-6"><span className="bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20 text-xs font-bold">Video</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">3:30 PM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The School Exit Window.</strong> The massive Gen-Z demographic comes online. Professional creators are still in meetings, creating a huge Supply/Demand gap for content.
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">LinkedIn</td>
                     <td className="p-6"><span className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20 text-xs font-bold">PDF/Doc</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">8:15 AM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The Commute Read.</strong> Executives check feeds during mobile transit. PDFs allow for "offline-style" reading and guarantee massive dwell time, a key ranking factor.
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">LinkedIn</td>
                     <td className="p-6"><span className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20 text-xs font-bold">Text Post</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">10:45 AM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The Pre-Lunch Meeting Gap.</strong> The window between morning stand-ups and deep work. Users browse desktop feeds while "looking busy."
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">YouTube</td>
                     <td className="p-6"><span className="bg-red-500/10 text-red-300 px-2 py-1 rounded border border-red-500/20 text-xs font-bold">Shorts</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">5:45 PM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The Dopamine Bridge.</strong> The moment users transition from Work Brain to Home Brain. They want quick dopamine hits before committing to long videos later.
                     </td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                     <td className="p-6 font-bold text-white">YouTube</td>
                     <td className="p-6"><span className="bg-red-500/10 text-red-300 px-2 py-1 rounded border border-red-500/20 text-xs font-bold">Long Form</span></td>
                     <td className="p-6 font-mono text-orange-400 font-bold">2:15 PM</td>
                     <td className="p-6 text-xs leading-relaxed">
                        <strong>The Afternoon Slump.</strong> Search traffic for "how-to" and tutorials spikes as people look for solutions. This primes your video for the 9 PM recommendation engine push.
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* VIRAL TIMELINE GRAPH */}
      <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
               <Calendar className="w-6 h-6 text-indigo-400" />
               Viral Growth Timeline (From a Cold Start)
            </h3>
         </div>
         
         <div className="relative border-l-2 border-slate-800 ml-4 space-y-12">
            {/* Stage 1 */}
            <div className="relative pl-8">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-500"></div>
               <h4 className="text-white font-bold text-sm mb-1">Posts 1-5 (The Void)</h4>
               <p className="text-xs text-slate-400 max-w-md">
                  Expect almost zero reach. The algorithm is silent, building your "Interest Graph" and figuring out who you are. <br/>
                  <span className="text-indigo-400 font-bold">Action:</span> Post consistently and engage with 20 competitors daily.
               </p>
            </div>
            {/* Stage 2 */}
            <div className="relative pl-8">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500"></div>
               <h4 className="text-white font-bold text-sm mb-1">Posts 6-12 (The Seed Test)</h4>
               <p className="text-xs text-slate-400 max-w-md">
                  The algorithm begins testing your content with small batches of 100-200 non-followers. <br/>
                  <span className="text-purple-400 font-bold">Critical Metric:</span> Your watch time must exceed 3 seconds on average.
               </p>
            </div>
            {/* Stage 3 */}
            <div className="relative pl-8">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-emerald-500"></div>
               <h4 className="text-white font-bold text-sm mb-1">Post 15+ (Velocity Phase)</h4>
               <p className="text-xs text-slate-400 max-w-md">
                  If your retention and engagement metrics hold, distribution expands exponentially to "Lookalike Audiences." <br/>
                  <span className="text-emerald-400 font-bold">Result:</span> Consistent 1k+ views per post and the potential for a viral breakout.
               </p>
            </div>
         </div>
      </div>

      <div className="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-2xl flex gap-4 items-start">
         <Zap className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
         <div>
            <h4 className="text-white font-bold text-sm mb-1">Chitragupt's Advisory</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
               Algorithms are probability engines that need data. Do not judge your content's performance until you have posted **at least 15 times** using a consistent strategy. The first 14 posts are simply training data for the AI.
            </p>
         </div>
      </div>

    </div>
  );
};

export default AcademyTiming;