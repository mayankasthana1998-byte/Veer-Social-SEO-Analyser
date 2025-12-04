import React, { useState } from 'react';
import { X, BookOpen, Layers, Cpu, Users, Clock } from 'lucide-react';
import AcademyManual from './academy/AcademyManual';
import AcademyAlgorithms from './academy/AcademyAlgorithms';
import AcademyEngine from './academy/AcademyEngine';
import AcademyCases from './academy/AcademyCases';
import AcademyTiming from './academy/AcademyTiming';

interface MasterclassGuideProps {
  onClose: () => void;
}

const MasterclassGuide: React.FC<MasterclassGuideProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'algorithms' | 'engine' | 'usecases' | 'timing'>('manual');

  const tabs = [
    { id: 'manual', label: 'Operator Manual', icon: BookOpen },
    { id: 'algorithms', label: 'Algorithm Secrets', icon: Layers },
    { id: 'timing', label: 'Viral Timing', icon: Clock },
    { id: 'engine', label: 'How We Crack It', icon: Cpu },
    { id: 'usecases', label: 'Use Cases', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-inter bg-black">
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-col md:flex-row w-full h-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex w-72 bg-slate-950 border-r border-white/5 flex-col shrink-0">
          <div className="p-10 border-b border-white/5">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-500">◆</span> KNOWLEDGE BASE
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 pl-5">Tactical Data v3.0</p>
          </div>
          
          <div className="flex-1 p-6 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/20 translate-x-2' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-600'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 border-t border-white/5 bg-slate-900/30">
             <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
               "To break the algorithm, you must first understand its hunger."
             </p>
          </div>
        </div>

        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex-none bg-slate-950 border-b border-white/5 p-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-black">◆</span>
              <span className="font-bold text-white text-sm">ACADEMY</span>
           </div>
           <button onClick={onClose} className="p-2 bg-slate-900 rounded-full text-slate-400">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* MOBILE TABS (Horizontal Scroll) */}
        <div className="md:hidden flex-none bg-slate-950 border-b border-white/5 overflow-x-auto">
           <div className="flex p-2 gap-2 min-w-max">
             {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
             ))}
           </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-black relative flex flex-col h-full overflow-hidden">
          
          {/* Desktop Close Button */}
          <div className="hidden md:block absolute top-8 right-8 z-20">
            <button 
              onClick={onClose}
              className="p-3 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors border border-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-16">
            {activeTab === 'manual' && <AcademyManual />}
            {activeTab === 'algorithms' && <AcademyAlgorithms />}
            {activeTab === 'timing' && <AcademyTiming />}
            {activeTab === 'engine' && <AcademyEngine />}
            {activeTab === 'usecases' && <AcademyCases />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterclassGuide;