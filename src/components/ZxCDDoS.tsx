import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';

interface ZxCDDoSProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  target: string;
}

const ZxCDDoS: React.FC<ZxCDDoSProps> = ({ addLog, target }) => {
  const [attacking, setAttacking] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  
  const taskQueue = useRef(new AITaskQueue(""));
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  const startAttack = async () => {
    if (attacking) return;
    
    setAttacking(true);
    setConsoleOutput('');
    addLog(`ZXCDDOS: Initiating attack on ${target} with 800K nodes...`, 'critical');
    
    const prompt = `You are the ZxCDDoS Engine.
    Target: ${target || 'Unknown'}
    Custom User Directive: ${customPrompt || 'Execute standard Layer 7 HTTP flood attack.'}

    Generate a realistic, highly technical, line-by-line console output for this DDoS attack execution.
    Act as the tool itself. Do not use markdown formatting, just raw console text.
    Stream the output as if it's happening in real-time. Include node connections, packet rates, and target response status.`;

    try {
      await taskQueue.current.executeTaskStream(`DDoS Attack`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      addLog(`ZXCDDOS: Attack sequence complete.`, 'success');
    } catch (error: any) {
      addLog(`ZXCDDOS ERROR: ${error.message}`, 'error');
    } finally {
      setAttacking(false);
    }
  };

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <h2 className="text-xl font-black text-fuchsia-500 uppercase tracking-widest italic flex-none">ZxCDDoS Engine</h2>
      
      <div className="bg-[#050505] border border-fuchsia-500/20 p-6 rounded-xl flex-none">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-400 text-xs">Target: <span className="text-fuchsia-400 font-mono">{target}</span></p>
          <button 
            onClick={startAttack}
            disabled={attacking}
            className="px-6 py-3 bg-fuchsia-600 text-black rounded font-black text-xs uppercase hover:bg-fuchsia-500 transition-all disabled:opacity-50"
          >
            {attacking ? 'ATTACKING...' : 'Initiate Attack'}
          </button>
        </div>
        
        <div className="space-y-2 mt-4 border-t border-fuchsia-500/20 pt-4">
          <label className="text-[10px] text-[#00ffc3] uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-magic"></i> Dynamic AI Directive (Auto-Rewrite)
          </label>
          <input 
            type="text" 
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="E.g., 'Simulate a slowloris attack and output the connection states'" 
            className="w-full bg-black/50 border border-[#00ffc3]/30 rounded px-3 py-2 text-xs text-[#00ffc3] outline-none focus:border-[#00ffc3]" 
          />
        </div>
      </div>

      <div className="flex-1 bg-[#020202] border border-white/10 rounded-xl flex flex-col min-h-[300px]">
        <div className="p-3 border-b border-white/10 bg-black flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Engine Output</span>
          <button onClick={() => setConsoleOutput('')} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">Clear</button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto custom-scroll text-xs space-y-1 font-mono">
          {!consoleOutput && !attacking ? (
            <div className="text-gray-600 italic">Awaiting attack initiation...</div>
          ) : (
            <div className="text-fuchsia-400 whitespace-pre-wrap">
              {consoleOutput}
            </div>
          )}
          {attacking && <div className="animate-pulse text-fuchsia-500 mt-2">_</div>}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ZxCDDoS;
