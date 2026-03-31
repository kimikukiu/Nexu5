import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faPlay, faStop, faTrash, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface TerminalProps {
  toolName: string;
  onExecute: (command: string) => Promise<void>;
  onStop?: () => void;
  isRunning?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ toolName, onExecute, onStop, isRunning }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error' | 'system', content: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLog = (content: string, type: 'input' | 'output' | 'error' | 'system' = 'output') => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const handleCommand = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isRunning) return;

    const cmd = input.trim();
    addLog(cmd, 'input');
    setInput('');
    
    try {
      await onExecute(cmd);
    } catch (err: any) {
      addLog(`[ERROR] ${err.message}`, 'error');
    }
  };

  const clearTerminal = () => setHistory([]);

  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-lg border border-white/10 overflow-hidden font-mono shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTerminal} className="text-gray-500 text-xs" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{toolName} Console</span>
        </div>
        <div className="flex gap-3">
          <button onClick={clearTerminal} className="text-gray-600 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
          </button>
          {isRunning && onStop && (
            <button onClick={onStop} className="text-red-500 hover:text-red-400 animate-pulse">
              <FontAwesomeIcon icon={faStop} className="text-[10px]" />
            </button>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto text-[11px] leading-relaxed space-y-1 custom-scrollbar"
      >
        <div className="text-emerald-500/50 mb-2">[SYSTEM] Terminal initialized. Ready for manual injection...</div>
        {history.map((item, i) => (
          <div key={i} className={`break-all ${
            item.type === 'input' ? 'text-blue-400' : 
            item.type === 'error' ? 'text-red-500' : 
            item.type === 'system' ? 'text-yellow-500' : 'text-gray-300'
          }`}>
            {item.type === 'input' && <span className="text-gray-600 mr-2">$</span>}
            {item.content}
          </div>
        ))}
        {isRunning && (
          <div className="text-blue-400 animate-pulse">_</div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="p-3 bg-black border-t border-white/5 flex items-center gap-2">
        <FontAwesomeIcon icon={faAngleRight} className="text-blue-500 text-xs" />
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isRunning}
          placeholder="Enter parameters or command..."
          className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-gray-700"
        />
        <button 
          type="submit" 
          disabled={isRunning}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            isRunning ? 'bg-gray-800 text-gray-600' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/40'
          }`}
        >
          <FontAwesomeIcon icon={faPlay} className="text-[10px]" />
        </button>
      </form>
    </div>
  );
};
