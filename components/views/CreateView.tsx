


import React, { useEffect } from 'react';
import { 
  Instagram, Linkedin, Youtube, Music2, Twitter, Facebook, 
  Target, ShieldCheck, Sliders, Sparkles
} from 'lucide-react';
import { Platform, FileInput } from '../../types';
import FileUpload from '../FileUpload';

interface CreateViewProps {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  config: any;
  setConfig: (c: any) => void;
  files: FileInput[];
  setFiles: React.Dispatch<React.SetStateAction<FileInput[]>>;
  brandFiles: FileInput[];
  setBrandFiles: React.Dispatch<React.SetStateAction<FileInput[]>>;
  isAnalyzing: boolean;
}

const TONE_OPTIONS = ['Professional', 'Casual', 'Humorous', 'Contrarian', 'Empathetic', 'Authoritative', 'Urgent', 'Wholesome', 'Sarcastic', 'Inspirational'];
const GOAL_OPTIONS = ['Viral Reach', 'Saves', 'Shares', 'Comments', 'Clicks', 'Sales'];

const PLATFORM_FORMATS: Record<Platform, string[]> = {
  [Platform.INSTAGRAM]: ['Reel', 'Carousel', 'Static Post', 'Story'],
  [Platform.TIKTOK]: ['Vlog', 'Green Screen', 'Skit', 'Photo Mode'],
  [Platform.YOUTUBE]: ['Shorts', 'Long-form', 'Community Post'],
  [Platform.LINKEDIN]: ['Text Only', 'PDF/Carousel', 'Article', 'Video'],
  [Platform.TWITTER]: ['Thread', 'Short Tweet', 'Media Post'],
  [Platform.FACEBOOK]: ['Video', 'Image Post', 'Text Post'],
};

const CreateView: React.FC<CreateViewProps> = ({ 
  platform, setPlatform, config, setConfig, files, setFiles, brandFiles, setBrandFiles, isAnalyzing 
}) => {

  // Reset Format when Platform changes
  useEffect(() => {
    setConfig((prev: any) => ({
       ...prev,
       contentFormat: PLATFORM_FORMATS[platform][0]
    }));
  }, [platform]);

  const toggleSelection = (field: 'tone' | 'engagementGoal', value: string) => {
    const current = config[field];
    if (current.includes(value)) {
      setConfig({ ...config, [field]: current.filter((item: string) => item !== value) });
    } else {
      setConfig({ ...config, [field]: [...current, value] });
    }
  };

  const getPlatformStyle = (p: Platform, isSelected: boolean) => {
    if (!isSelected) return 'bg-slate-900/40 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-white';
    
    switch (p) {
      case Platform.INSTAGRAM:
        return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white border-pink-400 shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]';
      case Platform.TIKTOK:
        return 'bg-black text-white border-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] border-l-4 border-l-cyan-400 border-r-4 border-r-red-500'; 
      case Platform.YOUTUBE:
        return 'bg-[#FF0000] text-white border-red-500 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]';
      case Platform.TWITTER:
        return 'bg-[#1DA1F2] text-white border-sky-400 shadow-[0_0_20px_-5px_rgba(29,161,242,0.5)]';
      case Platform.LINKEDIN:
        return 'bg-[#0077b5] text-white border-blue-400 shadow-[0_0_20px_-5px_rgba(0,119,181,0.5)]';
      case Platform.FACEBOOK:
        return 'bg-[#1877F2] text-white border-blue-500 shadow-[0_0_20px_-5px_rgba(24,119,242,0.5)]';
      default:
        return 'bg-indigo-600 text-white border-indigo-500';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4">
          <Sparkles className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">THE CREATOR</h2>
        <p className="text-slate-400 mt-2 max-w-xl mx-auto">
          Turn raw ideas and media into viral-ready posts from scratch. This mode analyzes your content and builds a complete strategy around it.
        </p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. PLATFORM SELECTOR */}
          <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <label className="text-[10px] font-black text-slate-500 uppercase mb-4 block tracking-widest pl-2">
               Destination Protocol
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: Platform.INSTAGRAM, icon: Instagram, label: 'Insta' },
                { id: Platform.TIKTOK, icon: Music2, label: 'TikTok' },
                { id: Platform.YOUTUBE, icon: Youtube, label: 'YT' },
                { id: Platform.TWITTER, icon: Twitter, label: 'X' },
                { id: Platform.LINKEDIN, icon: Linkedin, label: 'Linked' },
                { id: Platform.FACEBOOK, icon: Facebook, label: 'FB' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${getPlatformStyle(p.id, platform === p.id)} ${platform === p.id ? 'scale-105' : ''}`}
                >
                  <p.icon size={20} />
                  <span className="text-[10px] font-bold uppercase">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. TARGETING */}
          <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
             <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 pl-2 mb-4">
                <Sliders className="w-3 h-3" /> Hyper-Targeting
             </label>
             
             <div className="space-y-4">
                 {/* Format Selector */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase mb-2 block tracking-wider">Content Format</label>
                    <select 
                      value={config.contentFormat}
                      onChange={(e) => setConfig({...config, contentFormat: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-indigo-500 transition-colors"
                    >
                      {PLATFORM_FORMATS[platform].map((fmt) => (
                         <option key={fmt} value={fmt}>{fmt}</option>
                      ))}
                    </select>
                 </div>

                 {/* Engagement Goal */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-pink-400 uppercase mb-3 block tracking-wider">Engagement Goals (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {GOAL_OPTIONS.map((g) => (
                          <button 
                             key={g}
                             onClick={() => toggleSelection('engagementGoal', g)}
                             className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                config.engagementGoal.includes(g)
                                ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                             }`}
                          >
                             {g}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Tone */}
                 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    <label className="text-[10px] font-bold text-cyan-400 uppercase mb-3 block tracking-wider">Tone of Voice (Multi)</label>
                    <div className="flex flex-wrap gap-2">
                       {TONE_OPTIONS.map((t) => (
                          <button 
                             key={t}
                             onClick={() => toggleSelection('tone', t)}
                             className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                                config.tone.includes(t)
                                ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-600/20'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                             }`}
                          >
                             {t}
                          </button>
                       ))}
                    </div>
                 </div>
                 
                 {/* Targeting Inputs */}
                 <div className="mt-6 pt-6 border-t border-white/5">
                    <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 pl-2">
                      <Target className="w-3 h-3" /> Audience Matrix
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <input 
                          type="text"
                          placeholder="Geography (e.g. NYC)"
                          value={config.geography}
                          onChange={(e) => setConfig({...config, geography: e.target.value})}
                          className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                       />
                       <input 
                          type="text"
                          placeholder="Language (e.g. Hindi)"
                          value={config.targetLanguage}
                          onChange={(e) => setConfig({...config, targetLanguage: e.target.value})}
                          className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                       />
                       <input 
                          type="text"
                          placeholder="Audience (e.g. Gamers)"
                          value={config.targetAudience}
                          onChange={(e) => setConfig({...config, targetAudience: e.target.value})}
                          className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                       />
                       <input 
                          type="text"
                          placeholder="Demographics (e.g. 18-24)"
                          value={config.demographics}
                          onChange={(e) => setConfig({...config, demographics: e.target.value})}
                          className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                       />
                    </div>
                 </div>

             </div>
          </div>

          {/* 3. BRAND GUARD */}
          <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
            <label className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 pl-2">
              <ShieldCheck className="w-3 h-3" /> Brand Guard
            </label>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-3 hover:border-white/10 transition-colors">
              <textarea 
                className="w-full h-20 bg-transparent text-xs text-white focus:outline-none resize-none placeholder-slate-600 font-mono"
                placeholder="// ENTER STRICT BRAND RULES..."
                value={config.brandGuidelines}
                onChange={(e) => setConfig({...config, brandGuidelines: e.target.value})}
              />
              <div className="h-px bg-white/5 w-full"></div>
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-500">OR UPLOAD GUIDE</span>
                 <div className="scale-75 origin-right">
                    <FileUpload files={brandFiles} setFiles={setBrandFiles} isAnalyzing={isAnalyzing} />
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: UPLOAD */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <FileUpload files={files} setFiles={setFiles} multiple={true} isAnalyzing={isAnalyzing} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateView;