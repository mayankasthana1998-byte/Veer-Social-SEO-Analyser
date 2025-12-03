
import React, { useState } from 'react';
import { X, BookOpen, Search, Globe, Target, Smartphone, BarChart3, Hash, FileText, Mic, MapPin, Youtube, Linkedin, Twitter, Cpu, Layers, Zap, Users, Lightbulb, PlayCircle, Eye, ShieldCheck, MousePointer2, Sparkles, BrainCircuit, Flame } from 'lucide-react';

interface MasterclassGuideProps {
  onClose: () => void;
}

const MasterclassGuide: React.FC<MasterclassGuideProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'algorithms' | 'engine' | 'usecases'>('manual');

  const tabs = [
    { id: 'manual', label: 'Operator Manual', icon: BookOpen },
    { id: 'algorithms', label: 'Algorithm Secrets', icon: Layers },
    { id: 'engine', label: 'How We Crack It', icon: Cpu },
    { id: 'usecases', label: 'Use Cases', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-950 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 bg-slate-900/50 border-r border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-500">◆</span> KNOWLEDGE BASE
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 pl-5">Tactical Data v2.0</p>
          </div>
          
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-white/5 bg-black/20">
             <p className="text-[10px] text-slate-500 leading-relaxed">
               "To break the algorithm, you must first understand its hunger."
             </p>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-full bg-slate-950 relative">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            
            {/* TAB 1: OPERATOR MANUAL */}
            {activeTab === 'manual' && (
              <div className="space-y-12 animate-fade-in">
                <header>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Operator's Manual</h1>
                  <p className="text-slate-400">Step-by-step tactical execution for maximum impact.</p>
                </header>

                <div className="grid gap-8">
                  <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> MODE A: CREATE (Generation)
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">Best for: Turning raw files into viral posts.</p>
                    <ol className="space-y-3 text-sm text-slate-400 list-decimal list-inside marker:text-indigo-500 marker:font-bold">
                      <li><strong>Upload Media:</strong> Drop your Video (up to 1GB) or Image. The AI "watches" it to understand the vibe.</li>
                      <li><strong>Select Platform:</strong> Choose where you are posting (e.g., Instagram). This changes the AI's "brain."</li>
                      <li><strong>Hyper-Targeting:</strong> Select your Tone (e.g., Contrarian) and Goal (e.g., Saves).</li>
                      <li><strong>Brand Guard:</strong> (Optional) Paste your brand voice rules so the AI doesn't sound generic.</li>
                      <li><strong>Execute:</strong> Click Initialize. Review the "Before vs. After" score to see the lift.</li>
                    </ol>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5" /> MODE C: SPY (Competitor Analysis)
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">Best for: Stealing what works without copying.</p>
                    <ol className="space-y-3 text-sm text-slate-400 list-decimal list-inside marker:text-cyan-500 marker:font-bold">
                      <li><strong>Gather Intel:</strong> Take 2-5 screenshots of viral posts in your niche.</li>
                      <li><strong>Copy Captions:</strong> Paste their captions into the text box.</li>
                      <li><strong>Upload Visuals:</strong> Drop the screenshots/videos into the upload zone.</li>
                      <li><strong>Decode:</strong> The AI builds a "Spy Matrix" chart showing exactly <em>why</em> they are winning (Hook psychology + Keywords).</li>
                    </ol>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                      <Flame className="w-5 h-5" /> MODE D: HUNT (Live Trends)
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">Best for: Finding content ideas right NOW.</p>
                    <ol className="space-y-3 text-sm text-slate-400 list-decimal list-inside marker:text-orange-500 marker:font-bold">
                      <li><strong>Enter Niche:</strong> Type "Vegan Food" or "SaaS Sales".</li>
                      <li><strong>Hunt:</strong> The AI connects to Google Trends & TikTok Creative Center.</li>
                      <li><strong>Select:</strong> It returns 5 live trends with a "Difficulty" rating.</li>
                      <li><strong>Auto-Generate:</strong> Click "Use This Trend" to instantly write a caption based on that trend.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ALGORITHM SECRETS */}
            {activeTab === 'algorithms' && (
              <div className="space-y-12 animate-fade-in">
                <header>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Algorithm Secrets</h1>
                  <p className="text-slate-400">Declassified logic of the world's biggest platforms.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* TikTok */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Smartphone className="w-5 h-5" /></div>
                      <h3 className="font-bold text-white text-lg">TikTok Logic</h3>
                    </div>
                    <ul className="space-y-4">
                       <li>
                         <div className="text-xs font-bold text-cyan-400 uppercase">Ranking Factor #1</div>
                         <div className="text-white font-bold text-sm">Retention Rate (The Hook)</div>
                         <p className="text-xs text-slate-400 mt-1">TikTok tracks if users watch past the first 3 seconds. If 30% drop off, the video dies.</p>
                       </li>
                       <li>
                         <div className="text-xs font-bold text-cyan-400 uppercase">Ranking Factor #2</div>
                         <div className="text-white font-bold text-sm">Search Value (SEO)</div>
                         <p className="text-xs text-slate-400 mt-1">TikTok is a Search Engine. It reads text on screen (OCR) and listens to audio (ASR). If you don't say the keyword, you don't rank.</p>
                       </li>
                    </ul>
                  </div>

                  {/* LinkedIn */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Linkedin className="w-5 h-5" /></div>
                      <h3 className="font-bold text-white text-lg">LinkedIn Logic</h3>
                    </div>
                    <ul className="space-y-4">
                       <li>
                         <div className="text-xs font-bold text-blue-400 uppercase">Ranking Factor #1</div>
                         <div className="text-white font-bold text-sm">Dwell Time + "See More"</div>
                         <p className="text-xs text-slate-400 mt-1">The algorithm boosts posts where users click "See More" or spend time reading. Long text (Bro-etry) works because it increases Dwell Time.</p>
                       </li>
                       <li>
                         <div className="text-xs font-bold text-blue-400 uppercase">Ranking Factor #2</div>
                         <div className="text-white font-bold text-sm">Comment Depth</div>
                         <p className="text-xs text-slate-400 mt-1">A "Great post!" comment is worthless. Comments with 5+ words trigger a 2x reach multiplier.</p>
                       </li>
                    </ul>
                  </div>

                  {/* Instagram */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400"><Eye className="w-5 h-5" /></div>
                      <h3 className="font-bold text-white text-lg">Instagram Logic</h3>
                    </div>
                    <ul className="space-y-4">
                       <li>
                         <div className="text-xs font-bold text-pink-400 uppercase">Ranking Factor #1</div>
                         <div className="text-white font-bold text-sm">Shares & Saves</div>
                         <p className="text-xs text-slate-400 mt-1">Likes are a vanity metric. Shares (Relatability) and Saves (Value) tell the algorithm this content is "High Signal."</p>
                       </li>
                       <li>
                         <div className="text-xs font-bold text-pink-400 uppercase">Ranking Factor #2</div>
                         <div className="text-white font-bold text-sm">Entity Search</div>
                         <p className="text-xs text-slate-400 mt-1">IG connects your Bio, Captions, and Alt Text. You must consistently use the same "Identity Keywords" to own a niche.</p>
                       </li>
                    </ul>
                  </div>

                  {/* YouTube */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><Youtube className="w-5 h-5" /></div>
                      <h3 className="font-bold text-white text-lg">YouTube Logic</h3>
                    </div>
                    <ul className="space-y-4">
                       <li>
                         <div className="text-xs font-bold text-red-400 uppercase">Ranking Factor #1</div>
                         <div className="text-white font-bold text-sm">CTR (Click Through Rate)</div>
                         <p className="text-xs text-slate-400 mt-1">If people don't click, you don't exist. Titles must create a "Curiosity Gap."</p>
                       </li>
                       <li>
                         <div className="text-xs font-bold text-red-400 uppercase">Ranking Factor #2</div>
                         <div className="text-white font-bold text-sm">Session Time</div>
                         <p className="text-xs text-slate-400 mt-1">YouTube wants people ON YouTube. If your video makes them watch *another* video, you get boosted.</p>
                       </li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: THE ENGINE */}
            {activeTab === 'engine' && (
              <div className="space-y-12 animate-fade-in">
                <header>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">The Andromeda Engine</h1>
                  <p className="text-slate-400">How this software reverse-engineers success.</p>
                </header>

                <div className="space-y-8">
                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                         <Zap className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-white mb-2">1. Semantic Weaving</h3>
                         <p className="text-sm text-slate-400 leading-relaxed">
                            Most AI tools just "stuff" keywords. This app uses "Semantic Weaving." It analyzes the <strong>Contextual Vector</strong> of your image/video and inserts high-value SEO keywords naturally into the narrative flow. This tricks the algorithm into thinking the text is purely organic, while still triggering search indexing.
                         </p>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                         <Eye className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-white mb-2">2. Visual Hook Extraction</h3>
                         <p className="text-sm text-slate-400 leading-relaxed">
                            For videos >100MB, the app uses <strong>Frame Sampling</strong>. It extracts 5 key visual moments (Start, Action, End) and analyzes them for "Scroll Stopping Power." It then writes a text overlay that strictly matches the visual action in the first 3 seconds.
                         </p>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                         <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-white mb-2">3. The 20-Year Strategist Persona</h3>
                         <p className="text-sm text-slate-400 leading-relaxed">
                            We didn't just plug in a chatbot. We programmed the AI with specific frameworks from 20 years of marketing psychology (AIDA, PAS, StoryLoops). It adapts its "Brain" based on the platform—becoming a "Debater" on Twitter and a "Supporter" on Facebook.
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* TAB 4: USE CASES */}
            {activeTab === 'usecases' && (
              <div className="space-y-12 animate-fade-in">
                <header>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Tactical Use Cases</h1>
                  <p className="text-slate-400">Who needs this weapon and why.</p>
                </header>

                <div className="grid gap-6">
                  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-colors">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white">The E-Commerce Brand</h3>
                        <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">GOAL: SALES</span>
                     </div>
                     <p className="text-sm text-slate-400 mb-4">
                        <strong>Scenario:</strong> You sell luxury candles.
                        <br/>
                        <strong>The Hack:</strong> Use "Spy Mode." Upload 5 videos of viral candle brands. The AI will tell you they all use the "ASMR Crackle Hook." Use "Create Mode" to generate a caption that targets "Self-Care Gift Keywords" for high purchase intent.
                     </p>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-pink-500/30 transition-colors">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white">The Personal Brand / Coach</h3>
                        <span className="text-xs font-bold bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full">GOAL: AUTHORITY</span>
                     </div>
                     <p className="text-sm text-slate-400 mb-4">
                        <strong>Scenario:</strong> You are a Fitness Coach.
                        <br/>
                        <strong>The Hack:</strong> Use "Trend Hunter." Search "Fitness Myths." Find a trending audio. Use "Refine Mode" to turn your messy thought dump into a "LinkedIn Bro-etry" post that positions you as the expert who debunks the trend.
                     </p>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-cyan-500/30 transition-colors">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white">The Faceless Channel</h3>
                        <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">GOAL: VIRALITY</span>
                     </div>
                     <p className="text-sm text-slate-400 mb-4">
                        <strong>Scenario:</strong> You run a Motivation page.
                        <br/>
                        <strong>The Hack:</strong> Upload a stock video. Select "TikTok." Set Tone to "Hype." The AI will generate a text overlay script that uses "Urgency Psychology" to keep retention high for the first 3 seconds.
                     </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterclassGuide;
