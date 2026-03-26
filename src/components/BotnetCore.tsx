
import React, { useState, useEffect, useRef } from 'react';
import { LogEntry, BotNode } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';

interface BotnetCoreProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  isAttacking: boolean;
  setIsAttacking: (v: boolean) => void;
}

const BOT_LOCATIONS: BotNode[] = [
  { id: 'WHOAMI-US-CLUSTER', country: 'United States', status: 'ONLINE', latency: 28, uptime: '45d', type: 'SERVER' },
  { id: 'WHOAMI-EU-CLUSTER', country: 'European Union', status: 'ONLINE', latency: 34, uptime: '112d', type: 'SERVER' },
  { id: 'WHOAMI-AS-CLUSTER', country: 'Asia Pacific', status: 'BUSY', latency: 110, uptime: '12d', type: 'IOT' },
  { id: 'WHOAMI-RU-CLUSTER', country: 'Russia/CIS', status: 'ONLINE', latency: 85, uptime: '89d', type: 'SERVER' },
  { id: 'WHOAMI-BR-CLUSTER', country: 'South America', status: 'ONLINE', latency: 140, uptime: '5d', type: 'IOT' },
  { id: 'WHOAMI-ME-CLUSTER', country: 'Middle East', status: 'ONLINE', latency: 95, uptime: '31d', type: 'DESKTOP' },
];

const BotnetCore: React.FC<BotnetCoreProps> = ({ addLog, isAttacking, setIsAttacking }) => {
  const [nodes, setNodes] = useState<BotNode[]>(BOT_LOCATIONS);
  const [totalNodes, setTotalNodes] = useState(800000);
  const [customPrompt, setCustomPrompt] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const taskQueue = useRef(new AITaskQueue(""));
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  const executeDirective = async () => {
    if (isExecuting || !customPrompt) return;
    
    setIsExecuting(true);
    setConsoleOutput('');
    addLog(`BOTNET: Executing AI directive...`, 'info');
    
    const prompt = `You are the Botnet Core Controller.
    Custom User Directive: ${customPrompt}

    Generate a realistic, highly technical, line-by-line console output for this botnet command execution.
    Act as the tool itself. Do not use markdown formatting, just raw console text.
    Stream the output as if it's happening in real-time. Include node synchronization, payload distribution, and swarm status.`;

    try {
      await taskQueue.current.executeTaskStream(`Botnet Command`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      addLog(`BOTNET: Directive execution complete.`, 'success');
    } catch (error: any) {
      addLog(`BOTNET ERROR: ${error.message}`, 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalNodes(prev => prev + Math.floor(Math.random() * 100) - 50);
      setNodes(prev => prev.map(n => ({
        ...n,
        latency: Math.max(10, n.latency + Math.floor(Math.random() * 10) - 5)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 animate-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#050505] border border-white/5 p-4 rounded-lg flex flex-col items-center justify-center border-t-2 border-t-emerald-500">
          <span className="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-1">Total Active Swarm</span>
          <span className="text-2xl font-black text-white italic tracking-tighter">{totalNodes.toLocaleString()}</span>
          <span className="text-[6px] text-emerald-500 font-black uppercase mt-1 animate-pulse">800K_Hybrid_Mesh_Active</span>
        </div>
        <div className="bg-[#050505] border border-white/5 p-4 rounded-lg flex flex-col items-center justify-center border-t-2 border-t-fuchsia-500">
          <span className="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-1">Current Load</span>
          <span className={`text-2xl font-black italic tracking-tighter ${isAttacking ? 'text-fuchsia-500' : 'text-white'}`}>
            {isAttacking ? '98.4%' : '0.2%'}
          </span>
          <span className="text-[6px] text-gray-500 font-black uppercase mt-1">Swarm_Capacity_Buffer</span>
        </div>
        <div className="bg-[#050505] border border-white/5 p-4 rounded-lg flex flex-col items-center justify-center border-t-2 border-t-blue-500">
          <span className="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-1">Global Latency</span>
          <span className="text-2xl font-black text-white italic tracking-tighter">
            {(nodes.reduce((acc, n) => acc + n.latency, 0) / nodes.length).toFixed(1)} ms
          </span>
          <span className="text-[6px] text-blue-500 font-black uppercase mt-1">Neural_Mesh_Sync_OK</span>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 p-4 rounded-lg">
        <h3 className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Swarm Distribution Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nodes.map(node => (
            <div key={node.id} className={`bg-black border p-3 rounded flex items-center gap-4 transition-all ${isAttacking ? 'border-fuchsia-600/30' : 'border-white/5 hover:border-emerald-500/30'}`}>
              <div className={`w-10 h-10 rounded border flex items-center justify-center ${isAttacking ? 'bg-fuchsia-600/10 border-fuchsia-600 text-fuchsia-500 shadow-[0_0_10px_#c026d3] animate-pulse' : 'bg-white/5 border-emerald-900 text-emerald-500'}`}>
                <i className={`fas ${node.type === 'SERVER' ? 'fa-server' : node.type === 'IOT' ? 'fa-microchip' : 'fa-desktop'} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[9px] font-black text-white uppercase truncate">{node.id}</h4>
                  <span className={`text-[6px] font-black px-1 rounded ${node.status === 'ONLINE' ? 'bg-emerald-600 text-black' : 'bg-orange-600 text-black'}`}>{node.status}</span>
                </div>
                <div className="flex justify-between text-[7px] text-gray-600 font-bold uppercase">
                  <span>{node.country}</span>
                  <span className="text-blue-500">{node.latency} ms</span>
                </div>
                <div className="mt-2 w-full bg-white/5 h-0.5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${isAttacking ? 'bg-fuchsia-600' : 'bg-emerald-500'}`} style={{ width: isAttacking ? '95%' : '5%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 p-4 rounded-lg">
        <h3 className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Neural Mesh Commands</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <button 
            onClick={() => {
              const newState = !isAttacking;
              setIsAttacking(newState);
              addLog(`SWARM_CMD: Attack ${newState ? 'INITIATED' : 'TERMINATED'}.`, newState ? 'critical' : 'info');
            }} 
            className={`p-2 rounded text-[7px] font-black uppercase transition-all ${isAttacking ? 'bg-fuchsia-600 text-white animate-pulse' : 'bg-emerald-600 text-black hover:bg-emerald-500'}`}
          >
            {isAttacking ? 'TERMINATE_ATTACK' : 'INITIATE_ATTACK'}
          </button>
          <button onClick={() => addLog("SWARM_CMD: Synchronizing heartbeat cycles...", "warning")} className="bg-black border border-white/10 p-2 rounded text-[7px] text-white font-black uppercase hover:bg-emerald-600 hover:text-black transition-all">Sync_Heartbeat</button>
          <button onClick={() => addLog("SWARM_CMD: Rotating residential proxies...", "warning")} className="bg-black border border-white/10 p-2 rounded text-[7px] text-white font-black uppercase hover:bg-emerald-600 hover:text-black transition-all">Rotate_Proxies</button>
          <button onClick={() => addLog("SWARM_CMD: Purging stale nodes...", "warning")} className="bg-black border border-white/10 p-2 rounded text-[7px] text-white font-black uppercase hover:bg-emerald-600 hover:text-black transition-all">Purge_Stale</button>
          <button onClick={() => addLog("SWARM_CMD: Scaling neural visitor emulation...", "warning")} className="bg-black border border-white/10 p-2 rounded text-[7px] text-white font-black uppercase hover:bg-emerald-600 hover:text-black transition-all">Scale_Neural</button>
        </div>
        
        <div className="space-y-2 mt-4 border-t border-emerald-500/20 pt-4">
          <label className="text-[10px] text-[#00ffc3] uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-magic"></i> Dynamic AI Directive (Auto-Rewrite)
          </label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., 'Deploy a new worm variant to the Asian cluster'" 
              className="flex-1 bg-black/50 border border-[#00ffc3]/30 rounded px-3 py-2 text-xs text-[#00ffc3] outline-none focus:border-[#00ffc3]" 
            />
            <button 
              onClick={executeDirective}
              disabled={isExecuting || !customPrompt}
              className="px-6 py-2 bg-[#00ffc3] text-black rounded font-black text-[10px] uppercase hover:bg-[#00ffc3]/80 transition-all disabled:opacity-50"
            >
              {isExecuting ? 'EXECUTING...' : 'Execute Directive'}
            </button>
          </div>
        </div>
      </div>

      {(consoleOutput || isExecuting) && (
        <div className="bg-[#020202] border border-white/10 rounded-xl flex flex-col min-h-[200px] max-h-[300px]">
          <div className="p-3 border-b border-white/10 bg-black flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Directive Output</span>
            <button onClick={() => setConsoleOutput('')} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">Clear</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scroll text-xs space-y-1 font-mono">
            <div className="text-[#00ffc3] whitespace-pre-wrap">
              {consoleOutput}
            </div>
            {isExecuting && <div className="animate-pulse text-[#00ffc3] mt-2">_</div>}
            <div ref={consoleEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BotnetCore;
