
import React, { useState } from 'react';
import { DynamicTool, LogEntry } from '../types';

interface DynamicToolRendererProps {
  tool: DynamicTool;
  addLog: (message: string, level: LogEntry['level']) => void;
}

export const DynamicToolRenderer: React.FC<DynamicToolRendererProps> = ({ tool, addLog }) => {
  const safeModules = tool?.modules || [];
  const [activeModule, setActiveModule] = useState(safeModules[0]?.id || 'default');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [target, setTarget] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);

  const handleExecute = () => {
    if (tool.autonomousConfig?.requiresTarget && !target) {
      addLog(`DYNAMIC: ${tool.name} requires a target parameter.`, 'error');
      return;
    }

    setIsExecuting(true);
    setExecutionLogs([]);
    setShowTerminal(true);
    addLog(`DYNAMIC: Initializing ${tool.name} - Module: ${activeModule}`, 'info');
    
    const steps = tool?.autonomousConfig?.executionSteps || [
      `[EXEC] Initializing neural kernel for ${tool.name}...`,
      `[EXEC] Loading module: ${activeModule}`,
      `[EXEC] Setting neural jitter to 0.85...`,
      `[EXEC] Bypassing local IDS/IPS...`,
      `[EXEC] Establishing encrypted tunnel...`,
      `[EXEC] Injecting polymorphic payload...`,
      `[EXEC] Execution cycle 100% complete.`,
      `[SUCCESS] Task completed successfully.`
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < steps.length) {
        setExecutionLogs(prev => [...prev, steps[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        addLog(`DYNAMIC: ${tool.name} execution cycle complete.`, 'success');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      {/* Tool Header */}
      <div className="flex-none p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-2xl ${tool.color}`}>
              <i className={`fas ${tool.icon} text-2xl`}></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">{tool.name}</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{tool.category} | NEURAL_ASSET_ID: {tool.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <i className="fas fa-terminal mr-2"></i> Shell
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <i className="fas fa-cog mr-2"></i> Config
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Module Sidebar */}
        <div className="w-64 border-r border-white/5 bg-black/20 p-4 space-y-2 overflow-y-auto custom-scroll">
          <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 px-2">Available Modules</h3>
          {safeModules.map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                activeModule === mod.id 
                  ? 'bg-white/5 border-white/20 text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className="text-[11px] font-black uppercase tracking-wider mb-1">{mod.name}</div>
              <div className="text-[9px] opacity-60 leading-tight">{mod.desc}</div>
            </button>
          ))}
        </div>

        {/* Module Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scroll">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-black border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className={`fas ${tool.icon} text-8xl`}></i>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Autonomous Execution Environment</h4>
                <p className="text-xs text-gray-500 mb-8 leading-relaxed">{tool.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-[9px] text-gray-600 uppercase font-black mb-1">Status</div>
                    <div className="text-xs font-black text-emerald-500 uppercase">System Ready</div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-[9px] text-gray-600 uppercase font-black mb-1">Latency</div>
                    <div className="text-xs font-black text-white uppercase">12ms (Neural)</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black border border-white/10 rounded-xl">
                    <label className="text-[10px] text-gray-500 uppercase font-black block mb-2">Target Parameter</label>
                    <input 
                      type="text" 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-transparent text-white outline-none font-mono text-sm"
                      placeholder="Enter target URL, IP, or ID..."
                    />
                  </div>
                  
                  <button 
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                      isExecuting 
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    {isExecuting ? (
                      <>
                        <i className="fas fa-circle-notch fa-spin"></i>
                        Executing_Neural_Cycle
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play"></i>
                        Initialize_Module
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Autonomous Assistance */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black">
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Quantum Intelligence Assistant</h4>
                  <p className="text-[8px] text-gray-600 uppercase">Autonomous guidance active for {tool.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                  <p className="text-[10px] text-gray-400 leading-relaxed italic">
                    "I have analyzed the current target. Based on the {tool?.name} repository logic, I recommend using the {safeModules[0]?.name} module with a neural jitter of 0.85 to bypass local IDS."
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[8px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
                    Auto-Configure
                  </button>
                  <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                    Analyze_Target
                  </button>
                </div>
              </div>
            </div>

            {/* Console Output */}
            <div className="bg-black border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Module Output Console</h4>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                </div>
              </div>
              <div className="font-mono text-[11px] space-y-1 text-gray-400 h-48 overflow-y-auto custom-scroll">
                <p className="text-emerald-500/70">[{new Date().toLocaleTimeString()}] SYSTEM: Neural kernel initialized.</p>
                <p>[{new Date().toLocaleTimeString()}] AUTH: Admin session verified.</p>
                <p>[{new Date().toLocaleTimeString()}] LOAD: Module {activeModule} loaded into memory.</p>
                {executionLogs.map((log, i) => (
                  <p key={i} className={log.includes('[SUCCESS]') ? 'text-emerald-500' : 'text-white'}>
                    [{new Date().toLocaleTimeString()}] {log}
                  </p>
                ))}
                {isExecuting && (
                  <p className="animate-pulse text-white">[{new Date().toLocaleTimeString()}] EXEC: Processing...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Terminal Popup */}
      {showTerminal && (
        <div className="fixed bottom-6 right-6 w-96 h-64 bg-black border-2 border-white/10 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="flex-none p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fas fa-terminal text-[10px] text-emerald-500"></i>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Neural_Terminal</span>
            </div>
            <button 
              onClick={() => setShowTerminal(false)}
              className="text-gray-600 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
          <div className="flex-1 p-4 font-mono text-[10px] space-y-1 text-gray-400 overflow-y-auto custom-scroll">
            <p className="text-emerald-500/70">[{new Date().toLocaleTimeString()}] SYSTEM: Terminal initialized.</p>
            {executionLogs.map((log, i) => (
              <p key={i} className={log.includes('[SUCCESS]') ? 'text-emerald-500' : 'text-white'}>
                [{new Date().toLocaleTimeString()}] {log}
              </p>
            ))}
            {isExecuting && (
              <p className="animate-pulse text-white">[{new Date().toLocaleTimeString()}] EXEC: Processing...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
