import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';

interface NetworkProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  target: string;
}

const Network: React.FC<NetworkProps> = ({ addLog, target }) => {
  const [scanning, setScanning] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  
  const taskQueue = useRef(new AITaskQueue(""));
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  const startScan = async () => {
    if (scanning) return;
    
    setScanning(true);
    setConsoleOutput('');
    addLog(`NETWORK: Initiating full-spectrum scan on ${target}...`, 'info');
    
    const prompt = `You are the Network Analysis Console.
    Target: ${target || 'Unknown'}
    Custom User Directive: ${customPrompt || 'Execute standard full-spectrum port and vulnerability scan.'}

    Generate a realistic, highly technical, line-by-line console output for this network scan execution.
    Act as the tool itself. Do not use markdown formatting, just raw console text.
    Stream the output as if it's happening in real-time. Include discovered open ports, services, and potential vulnerabilities.`;

    try {
      await taskQueue.current.executeTaskStream(`Network Scan`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      addLog(`NETWORK: Scan complete.`, 'success');
    } catch (error: any) {
      addLog(`NETWORK ERROR: ${error.message}`, 'error');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <h2 className="text-xl font-black text-emerald-500 uppercase tracking-widest italic flex-none">Network Analysis Console</h2>
      
      <div className="bg-[#050505] border border-emerald-500/20 p-6 rounded-xl flex-none">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-400 text-xs">Target: <span className="text-emerald-400 font-mono">{target}</span></p>
          <button 
            onClick={startScan}
            disabled={scanning}
            className="px-6 py-3 bg-emerald-600 text-black rounded font-black text-xs uppercase hover:bg-emerald-500 transition-all disabled:opacity-50"
          >
            {scanning ? 'SCANNING...' : 'Initiate Full Scan'}
          </button>
        </div>
        
        <div className="space-y-2 mt-4 border-t border-emerald-500/20 pt-4">
          <label className="text-[10px] text-[#00ffc3] uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-magic"></i> Dynamic AI Directive (Auto-Rewrite)
          </label>
          <input 
            type="text" 
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="E.g., 'Scan specifically for SMB vulnerabilities and output in XML format'" 
            className="w-full bg-black/50 border border-[#00ffc3]/30 rounded px-3 py-2 text-xs text-[#00ffc3] outline-none focus:border-[#00ffc3]" 
          />
        </div>
      </div>

      <div className="flex-1 bg-[#020202] border border-white/10 rounded-xl flex flex-col min-h-[300px]">
        <div className="p-3 border-b border-white/10 bg-black flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scanner Output</span>
          <button onClick={() => setConsoleOutput('')} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">Clear</button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto custom-scroll text-xs space-y-1 font-mono">
          {!consoleOutput && !scanning ? (
            <div className="text-gray-600 italic">Awaiting scan initiation...</div>
          ) : (
            <div className="text-emerald-400 whitespace-pre-wrap">
              {consoleOutput}
            </div>
          )}
          {scanning && <div className="animate-pulse text-emerald-500 mt-2">_</div>}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Network;
