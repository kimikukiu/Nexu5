
import React, { useState, useMemo } from 'react';
import { DynamicTool, AppTab } from '../types';
import { DYNAMIC_TOOLS, TOOL_CATEGORIES } from '../toolsConfig';

interface ToolIndexProps {
  setSelectedDynamicTool: (tool: DynamicTool) => void;
  setActiveTab: (tab: AppTab) => void;
  addLog: (message: string, level: 'info' | 'success' | 'warning' | 'error' | 'critical') => void;
}

export const ToolIndex: React.FC<ToolIndexProps> = ({ setSelectedDynamicTool, setActiveTab, addLog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return DYNAMIC_TOOLS.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? tool.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleToolClick = (tool: DynamicTool) => {
    addLog(`INDEX: Accessing neural asset [${tool.name}]`, 'info');
    setSelectedDynamicTool(tool);
    setActiveTab(AppTab.DYNAMIC_TOOL);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      {/* Header */}
      <div className="flex-none p-8 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-2">Neural_Repository_Index</h2>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Accessing 390+ autonomous offensive and intelligence assets</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Total Assets: {DYNAMIC_TOOLS.length}</span>
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Sync: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-none p-6 border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH_NEURAL_VAULT..."
              className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all shadow-2xl"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === null 
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-gray-500 border-white/5 hover:border-white/20'
              }`}
            >
              All_Assets
            </button>
            {TOOL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-black border-emerald-500' 
                    : 'bg-black text-gray-500 border-white/5 hover:border-emerald-500/30'
                }`}
              >
                {cat.replace(' ', '_')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8 custom-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="group relative bg-black border border-white/5 rounded-2xl p-6 text-left hover:border-emerald-500/30 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden"
              >
                {/* Background Glow */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${tool.color.replace('text-', 'bg-')}`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 ${tool.color}`}>
                      <i className={`fas ${tool.icon} text-xl`}></i>
                    </div>
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black/40">
                      {tool.category}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 group-hover:text-emerald-400 transition-colors truncate">
                    {tool.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 mb-4 h-10">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-1">
                      {tool.modules.slice(0, 2).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                      ))}
                    </div>
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest group-hover:text-emerald-500/50 transition-colors">
                      Initialize_Core <i className="fas fa-arrow-right ml-1"></i>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
              <i className="fas fa-search text-4xl mb-4 opacity-20"></i>
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">No neural assets found matching query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
