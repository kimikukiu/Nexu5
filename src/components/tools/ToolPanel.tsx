import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faSkull, faShieldAlt, faMicrochip, faVault, faBiohazard, faRadiation, faMoneyBillTrendUp, faBomb, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { ManualDdosTool } from './ManualDdosTool';
import { WormMoneyV3 } from './WormMoneyV3';
import { WAlypse } from './WAlypse';
import { SuperBet } from './SuperBet';

interface Tool {
  id: string;
  name: string;
  category: 'OFFENSIVE' | 'DEFENSIVE' | 'EXPLOIT' | 'MONEY' | 'AI' | 'VAULT';
  description: string;
  icon: any;
  component?: React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    id: 'us-ddos-v2',
    name: 'US-DDOS-V2',
    category: 'OFFENSIVE',
    description: 'Original high-performance DDoS toolkit with manual method selection.',
    icon: faSkull,
    component: <ManualDdosTool toolId="us-ddos-v2" />
  },
  {
    id: 'ufodos',
    name: 'UFODOS',
    category: 'OFFENSIVE',
    description: 'Advanced multi-vector stress testing engine with manual control.',
    icon: faRadiation,
    component: <ManualDdosTool toolId="ufodos" />
  },
  {
    id: 'worm-money-v3',
    name: 'WormMoney V3',
    category: 'MONEY',
    description: 'Autonomous and manual financial extraction engine for bookmaker domination.',
    icon: faMoneyBillTrendUp,
    component: <WormMoneyV3 />
  },
  {
    id: 'super-bet-247',
    name: 'SuperBet 24/7',
    category: 'MONEY',
    description: 'Elite autonomous bookmaker domination engine with real-time extraction.',
    icon: faMoneyBillTrendUp,
    component: <SuperBet />
  },
  {
    id: 'w-apocalypse',
    name: 'W-Apocalypse',
    category: 'EXPLOIT',
    description: 'Universal infrastructure destruction engine with zero-day modules.',
    icon: faBomb,
    component: <WAlypse />
  },
  {
    id: 'ultimate-exploit',
    name: 'Ultimate AI Exploit',
    category: 'EXPLOIT',
    description: 'AI-driven multi-phase exploit suite for deep infrastructure penetration.',
    icon: faBiohazard,
    component: <WAlypse /> // Reusing WAlypse as the base for high-tier exploits
  }
];

const ToolPanel: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [category, setCategory] = useState<Tool['category'] | 'ALL'>('ALL');

  const filteredTools = category === 'ALL' ? TOOLS : TOOLS.filter(t => t.category === category);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white font-mono p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
            <FontAwesomeIcon icon={faMicrochip} className="text-blue-500" />
            NEXU5_TOOL_PANEL <span className="text-[10px] bg-blue-600 text-black px-2 py-0.5 rounded">v15.0_STABLE</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Authentic Offensive & Financial Suite</p>
        </div>
        
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {['ALL', 'OFFENSIVE', 'EXPLOIT', 'MONEY', 'VAULT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-1.5 rounded-md text-[9px] font-black transition-all ${
                category === cat ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'text-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Tool List */}
        <div className="w-80 overflow-y-auto custom-scrollbar pr-2 space-y-3">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool)}
              className={`w-full text-left p-4 rounded-xl border transition-all group ${
                activeTool?.id === tool.id 
                  ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                  activeTool?.id === tool.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'
                }`}>
                  <FontAwesomeIcon icon={tool.icon} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest">{tool.name}</h3>
                  <p className="text-[9px] text-gray-500 mt-0.5 line-clamp-1">{tool.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 overflow-hidden relative">
          {activeTool ? (
            <div className="h-full">
              {activeTool.component}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-20">
              <FontAwesomeIcon icon={faSkullCrossbones} className="text-6xl mb-6" />
              <h2 className="text-xl font-black uppercase tracking-widest mb-2">Awaiting Tool Activation</h2>
              <p className="text-xs text-gray-400 max-w-md">Select an authentic offensive module from the panel to initiate high-fidelity operations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
