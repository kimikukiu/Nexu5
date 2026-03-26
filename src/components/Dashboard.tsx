
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';
import CredentialLeak from './CredentialLeak';
import DataExtractor from './DataExtractor';

interface DashboardProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  target: string;
  setTarget: (t: string) => void;
  setIsSeized: (s: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ addLog, target, setTarget, setIsSeized }) => {
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
    addLog(`DASHBOARD: Executing AI directive...`, 'info');
    
    const prompt = `You are the Dashboard Control Center.
    Target: ${target || 'Unknown'}
    Custom User Directive: ${customPrompt}

    Generate a realistic, highly technical, line-by-line console output for this dashboard command execution.
    Act as the tool itself. Do not use markdown formatting, just raw console text.
    Stream the output as if it's happening in real-time. Include system status updates, target locks, and global operations.`;

    try {
      if (customPrompt.toLowerCase().includes('deface') || customPrompt.toLowerCase().includes('seize') || customPrompt.toLowerCase().includes('ransom')) {
        addLog(`DASHBOARD: Defacement/Ransom directive detected. Initializing...`, 'warning');
        setTimeout(() => setIsSeized(true), 2000);
      }

      await taskQueue.current.executeTaskStream(`Dashboard Command`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      addLog(`DASHBOARD: Directive execution complete.`, 'success');
    } catch (error: any) {
      addLog(`DASHBOARD ERROR: ${error.message}`, 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  const stats = [
    { label: 'Neural Nodes', value: '842,119', color: 'text-emerald-500' },
    { label: 'Quantum Load', value: '12.4%', color: 'text-blue-500' },
    { label: 'Orchestration', value: 'ACTIVE', color: 'text-orange-500' },
    { label: 'Uptime', value: '142d 12h', color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#050505] border border-white/5 p-4 rounded-lg shadow-xl">
            <p className="text-[7px] text-gray-600 font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#050505] border border-emerald-500/20 p-5 rounded-xl">
        <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <i className="fas fa-crosshairs"></i> Target Acquisition
        </h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={target}
            onChange={(e) => setTarget(e.target.value.toUpperCase())}
            placeholder="ENTER_TARGET_IP_OR_DOMAIN"
            className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-[10px] text-emerald-400 outline-none focus:border-emerald-500 transition-all font-mono"
          />
          <button 
            onClick={() => addLog(`TARGET: ${target} acquired and locked.`, 'success')}
            className="px-6 py-2 bg-emerald-600 text-black rounded font-black text-[10px] uppercase hover:bg-emerald-500 transition-all"
          >
            Lock_Target
          </button>
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
              placeholder="E.g., 'Analyze global threat levels and output a summary report'" 
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#050505] border border-white/5 p-5 rounded-xl">
          <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <i className="fas fa-microchip"></i> System Core Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-gray-500 uppercase font-bold">CPU Usage</span>
              <span className="text-[8px] text-emerald-500 font-mono">24%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '24%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-gray-500 uppercase font-bold">Memory Allocation</span>
              <span className="text-[8px] text-blue-500 font-mono">6.2GB / 32GB</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: '19%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[8px] text-gray-500 uppercase font-bold">Neural Mesh Sync</span>
              <span className="text-[8px] text-purple-500 font-mono">99.9%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 p-5 rounded-xl">
          <h3 className="text-[9px] font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <i className="fas fa-satellite-dish"></i> Global Operations
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 bg-white/[0.02] rounded border border-white/5">
              <div className="w-8 h-8 rounded bg-fuchsia-600/10 flex items-center justify-center text-fuchsia-500">
                <i className="fas fa-shield-halved"></i>
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-white font-black uppercase">Firewall Bypass</p>
                <p className="text-[7px] text-gray-600 uppercase">Target: Fortune 500 Cluster</p>
              </div>
              <span className="text-[7px] text-emerald-500 font-black">ACTIVE</span>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white/[0.02] rounded border border-white/5">
              <div className="w-8 h-8 rounded bg-blue-600/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-user-secret"></i>
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-white font-black uppercase">OSINT Extraction</p>
                <p className="text-[7px] text-gray-600 uppercase">Source: Dark Web Leaks</p>
              </div>
              <span className="text-[7px] text-blue-500 font-black">SYNCING</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 p-5 rounded-xl">
        <h3 className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <i className="fas fa-terminal"></i> Recent Commands
        </h3>
        <div className="font-mono text-[8px] space-y-1 text-gray-500">
          <p><span className="text-emerald-500">WORMGPT@OMEGA:~$</span> initiate --mode quantum --target global</p>
          <p><span className="text-gray-700">[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}]</span> [SYSTEM] Neural mesh synchronized with 842k nodes.</p>
          <p><span className="text-gray-700">[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}]</span> [QUANTUM] DeepSeek API Bridge: STABLE.</p>
          <p><span className="text-emerald-500">WORMGPT@OMEGA:~$</span> <span className="animate-pulse">_</span></p>
        </div>
      </div>

      <CredentialLeak target={target} />
      <DataExtractor target={target} />
    </div>
  );
};

export default Dashboard;
