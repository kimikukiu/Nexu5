
import React, { useState, useEffect } from 'react';
import { LogEntry } from '../../types';

interface ManualDdosToolProps {
  toolName: 'US-DDOS-V2' | 'ufodos';
  addLog: (message: string, level: LogEntry['level']) => void;
}

const METHODS = {
  'US-DDOS-V2': [
    'HTTP-RAND', 'HTTP-RAW', 'HTTP-SOCKET', 'HTTP-STORM', 'CF-PRO', 'CF', 'HYPER', 
    'OVH-BEAM', 'OVH-RAW', 'OVH-AMP', 'SLOW', 'SLOWLORIS', 'DESTROY', 'GOD', 'HULK'
  ],
  'ufodos': [
    'TORonionDdos', 'http2-TLS', 'httppps', 'httpraw', 'tls', 'tlsv2', 'uambypass'
  ]
};

export const ManualDdosTool: React.FC<ManualDdosToolProps> = ({ toolName, addLog }) => {
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState(METHODS[toolName][0]);
  const [time, setTime] = useState('60');
  const [rps, setRps] = useState('100');
  const [rqs, setRqs] = useState('10');
  const [isRunning, setIsRunning] = useState(false);
  const [activeProcess, setActiveProcess] = useState<string | null>(null);

  const handleStart = () => {
    if (!target) {
      addLog(`[${toolName}] ERROR: Target (Domain/IP/URL) is required.`, 'error');
      return;
    }

    setIsRunning(true);
    const processId = Math.random().toString(36).substring(7).toUpperCase();
    setActiveProcess(processId);

    addLog(`[${toolName}] INITIALIZING ATTACK SEQUENCE: ${processId}`, 'info');
    addLog(`[${toolName}] TARGET: ${target}`, 'warning');
    addLog(`[${toolName}] METHOD: ${method}`, 'warning');
    addLog(`[${toolName}] PARAMS: Time=${time}s, RPS=${rps}, RQS=${rqs}`, 'info');
    
    // Simulate the actual command execution from the original repository
    const command = toolName === 'US-DDOS-V2' 
      ? `node ${method}.js ${target} ${time} ${rps} ${rqs}`
      : `python3 start.py ${method} ${target} ${time} ${rps} ${rqs}`;
    
    addLog(`[${toolName}] EXECUTING: ${command}`, 'success');
  };

  const handleStop = () => {
    if (!isRunning) return;
    
    setIsRunning(false);
    addLog(`[${toolName}] TERMINATING ATTACK SEQUENCE: ${activeProcess}`, 'error');
    setActiveProcess(null);
  };

  return (
    <div className="space-y-4 p-4 bg-black/40 border border-[#dc2626]/20 rounded-xl font-mono">
      <div className="flex items-center justify-between border-b border-[#dc2626]/10 pb-2 mb-4">
        <span className="text-[10px] font-black text-[#dc2626] uppercase tracking-widest">
          <i className="fas fa-skull-crossbones mr-2"></i> Manual Control: {toolName}
        </span>
        <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${isRunning ? 'bg-red-500 animate-pulse text-black' : 'bg-gray-800 text-gray-500'}`}>
          {isRunning ? 'ACTIVE' : 'IDLE'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 uppercase font-black">Target (Domain/IP/URL)</label>
          <input 
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-[#dc2626]"
            placeholder="example.com or 1.2.3.4"
            disabled={isRunning}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 uppercase font-black">Attack Method</label>
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-[#dc2626]"
            disabled={isRunning}
          >
            {METHODS[toolName].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 uppercase font-black">Time (Sec)</label>
          <input 
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-[#dc2626]"
            disabled={isRunning}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 uppercase font-black">RPS</label>
          <input 
            type="number"
            value={rps}
            onChange={(e) => setRps(e.target.value)}
            className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-[#dc2626]"
            disabled={isRunning}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 uppercase font-black">RQS</label>
          <input 
            type="number"
            value={rqs}
            onChange={(e) => setRqs(e.target.value)}
            className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-[#dc2626]"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleStart}
          disabled={isRunning}
          className="flex-1 bg-[#dc2626] text-black font-black py-2 rounded uppercase text-[10px] tracking-widest hover:bg-red-500 transition-all disabled:opacity-30"
        >
          START_ATTACK
        </button>
        <button 
          onClick={handleStop}
          disabled={!isRunning}
          className="flex-1 bg-white/10 text-white border border-white/10 font-black py-2 rounded uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all disabled:opacity-30"
        >
          STOP_ATTACK
        </button>
      </div>
    </div>
  );
};
