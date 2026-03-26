
import React, { useState } from 'react';
import { AppTab, DynamicTool } from '../types';
import { DYNAMIC_TOOLS, TOOL_CATEGORIES } from '../toolsConfig';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  setSelectedDynamicTool: (tool: DynamicTool) => void;
  target?: string;
  isUp?: boolean;
  isAttacking?: boolean;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  setSelectedDynamicTool,
  target = "NONE", 
  isUp = true, 
  isAttacking = false,
  isAdmin = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'Control Center', icon: 'fa-microchip' },
    { id: AppTab.QUANTUM_INTELLIGENCE, label: 'WormGPT Intel', icon: 'fa-atom' },
    { id: AppTab.OSINT_DASHBOARD, label: 'OSINT Dashboard', icon: 'fa-globe' },
    { id: AppTab.INVESTIGATION_CORE, label: 'Investigation Core', icon: 'fa-microchip-ai' },
    { id: AppTab.EXTRACTOR, label: 'Deep Extractor', icon: 'fa-user-secret' },
    { id: AppTab.SQL_INJECT, label: 'Payload Vault', icon: 'fa-database' },
    { id: AppTab.NETWORK, label: 'Attack Console', icon: 'fa-satellite-dish' },
    { id: AppTab.ZXCDDOS, label: 'ZxCDDoS', icon: 'fa-bolt' },
    { id: AppTab.IDE_TOOL, label: 'Quantum IDE', icon: 'fa-code' },
    { id: AppTab.BOTNET_CORE, label: 'Zombie Swarm', icon: 'fa-users-rays' },
    { id: AppTab.SYSTEM_CORE_TOOLS, label: 'System Core Repos', icon: 'fa-folder-tree' },
    { id: AppTab.WHOAMISEC_GPT, label: 'WormGPT Omega', icon: 'fa-brain' },
    { id: AppTab.SOCIAL_TAKEOVER, label: 'Social Takeover', icon: 'fa-share-nodes' },
    { id: AppTab.DRONE_TAKEOVER, label: 'Drone Takeover', icon: 'fa-plane-up' },
    { id: AppTab.INFRASTRUCTURE_TAKEOVER, label: 'Infra Takeover', icon: 'fa-building-shield' },
    { id: AppTab.MEDIA_COMMS_TAKEOVER, label: 'Media & Comms', icon: 'fa-tower-broadcast' },
    { id: AppTab.SANDBOX_VIRTUAL, label: 'Sandbox Virtual', icon: 'fa-shield-halved' },
    { id: AppTab.TOOL_INDEX, label: 'Neural Index', icon: 'fa-list-check' },
    { id: AppTab.MEDIA_CREATOR, label: 'Media Forge', icon: 'fa-photo-film' },
    { id: AppTab.SETTINGS, label: 'Kernel Config', icon: 'fa-sliders' },
    ...(isAdmin ? [{ id: AppTab.ADMIN_PANEL, label: 'Admin Panel', icon: 'fa-user-shield' }] : []),
  ];

  const filteredTools = DYNAMIC_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? tool.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (tool: DynamicTool) => {
    setSelectedDynamicTool(tool);
    setActiveTab(AppTab.DYNAMIC_TOOL);
  };

  return (
    <aside className="w-16 md:w-64 bg-[#050505] border-r border-emerald-500/10 flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl transition-all overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-3 flex items-center justify-center md:justify-start gap-2 border-b border-white/5 mb-2 shrink-0 bg-black/40 backdrop-blur-md">
        <div className={`w-8 h-8 rounded flex items-center justify-center shadow-xl ring-1 transition-all ${isAttacking ? 'bg-fuchsia-600 ring-fuchsia-400 animate-pulse' : 'bg-emerald-500 ring-emerald-400/50'}`}>
          <i className={`fas ${isAttacking ? 'fa-bolt-lightning' : 'fa-skull'} text-black text-sm`}></i>
        </div>
        <div className="hidden md:block flex flex-col">
          <span className="font-black text-[10px] tracking-tighter text-white uppercase italic leading-none">Quantum</span>
          <span className={`text-[7px] font-black uppercase tracking-widest ${isAttacking ? 'text-fuchsia-500' : 'text-emerald-500'}`}>ORCHESTRATOR_V3.1</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:block px-3 mb-4">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]"></i>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH_VAULT..."
            className="w-full bg-black border border-white/5 rounded-lg py-2 pl-8 pr-3 text-[9px] font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        <nav className="space-y-0.5">
          {/* Core Menu */}
          <div className="hidden md:block px-3 pt-2 pb-1">
            <span className="text-[6px] text-gray-600 font-black uppercase tracking-widest">Core Infrastructure</span>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2 transition-all group relative ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-500' 
                  : 'text-gray-600 hover:text-emerald-400 hover:bg-white/5'
              }`}
            >
              <i className={`fas ${item.icon} text-sm w-5 transition-transform group-hover:scale-110`}></i>
              <span className="hidden md:block font-black uppercase text-[8px] tracking-[0.2em]">{item.label}</span>
            </button>
          ))}

          {/* Categories */}
          <div className="hidden md:block px-3 pt-6 pb-2">
            <span className="text-[6px] text-gray-600 font-black uppercase tracking-widest">Neural Repository (390+)</span>
          </div>
          
          <div className="hidden md:flex flex-wrap gap-1 px-3 mb-4">
            {TOOL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-[6px] font-black uppercase px-2 py-1 rounded transition-all border ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-black border-emerald-500' 
                    : 'bg-black text-gray-600 border-white/5 hover:border-emerald-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Tools */}
          <div className="space-y-0.5">
            {filteredTools.slice(0, 50).map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2 transition-all group relative ${
                  activeTab === AppTab.DYNAMIC_TOOL && tool.id === DYNAMIC_TOOLS.find(t => t.id === tool.id)?.id
                    ? `bg-white/10 ${tool.color} border-r-2 border-current` 
                    : 'text-gray-500 hover:bg-white/5'
                }`}
              >
                <i className={`fas ${tool.icon} text-sm w-5 transition-transform group-hover:scale-110 ${tool.color}`}></i>
                <span className={`hidden md:block font-black uppercase text-[8px] tracking-[0.2em] truncate ${tool.color} opacity-80 group-hover:opacity-100`}>{tool.name}</span>
              </button>
            ))}
            {filteredTools.length > 50 && (
              <div className="px-3 py-2 text-center">
                <span className="text-[7px] text-gray-700 uppercase font-black italic">... and {filteredTools.length - 50} more ...</span>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="p-2 border-t border-white/5 hidden md:block shrink-0 bg-black/20">
        <div className={`bg-black p-2.5 rounded-lg border transition-all ${isAttacking ? 'border-fuchsia-600/30' : 'border-emerald-500/10'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[6px] text-gray-600 font-black uppercase tracking-widest">Swarm Link</span>
            <div className={`w-1.5 h-1.5 rounded-full ${isUp ? 'bg-emerald-500' : 'bg-red-600 animate-pulse'}`}></div>
          </div>
          <div className="flex flex-col gap-1">
             <p className="text-[8px] text-white font-mono font-bold truncate uppercase tracking-tighter">{target}</p>
             <div className="flex justify-between items-center border-t border-white/5 pt-1">
                <span className={`text-[7px] font-black uppercase ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isUp ? 'STABLE' : 'OFFLINE'}
                </span>
                {isAttacking && (
                  <span className="text-[6px] font-black text-fuchsia-500 uppercase animate-bounce">800K_LOAD</span>
                )}
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
