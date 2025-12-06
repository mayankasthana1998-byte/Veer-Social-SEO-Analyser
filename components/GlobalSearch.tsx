import React, { useState, useEffect } from 'react';
import { Search, X, Clock, Trash2, ArrowRight, Sparkles, BrainCircuit, Flame, Settings2, Calendar } from 'lucide-react';
import { HistoryItem, AppMode, Platform } from '../types';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, history, onSelect, onDelete, onClear }) => {
  const [query, setQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>(history);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredHistory(history);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredHistory(history.filter(item => 
        item.summary.toLowerCase().includes(lowerQuery) ||
        item.mode.toLowerCase().includes(lowerQuery) ||
        (item.platform && item.platform.toLowerCase().includes(lowerQuery))
      ));
    }
  }, [query, history]);

  if (!isOpen) return null;

  const getIcon = (mode: AppMode) => {
    switch (mode) {
      case AppMode.GENERATION: return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case AppMode.REFINE: return <Settings2 className="w-4 h-4 text-pink-400" />;
      case AppMode.COMPETITOR_SPY: return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case AppMode.TREND_HUNTER: return <Flame className="w-4 h-4 text-orange-400" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            autoFocus
            className="flex-1 bg-transparent text-white text-lg placeholder-slate-600 focus:outline-none"
            placeholder="Search your strategy archives..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm">No strategies found in your archives.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="px-4 py-2 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Recent History</span>
                <button onClick={onClear} className="hover:text-red-400 transition-colors">Clear All</button>
              </div>
              
              {filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer"
                  onClick={() => onSelect(item)}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center shrink-0">
                      {getIcon(item.mode)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                        {item.summary}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                           <Calendar className="w-3 h-3" /> {formatDate(item.timestamp)}
                        </span>
                        <span>•</span>
                        <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                          {item.mode.replace('_', ' ')}
                        </span>
                        {item.platform && (
                          <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">
                            {item.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                      className="p-2 rounded-full text-slate-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/50 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 px-6">
           <span>Press ESC to close</span>
           <span>{filteredHistory.length} items archived</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
