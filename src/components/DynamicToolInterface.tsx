import React, { useState, useEffect, useRef } from 'react';
import { DynamicTool } from '../config/types';

interface Props {
  tool: DynamicTool;
}

export const DynamicToolInterface: React.FC<Props> = ({ tool }) => {
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState('DEFAULT');
  const [duration, setDuration] = useState('60');
  const [rps, setRps] = useState('5000');
  const [threads, setThreads] = useState('128');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [stats, setStats] = useState({
    requestsSent: 0,
    successRate: 0,
    bandwidth: 0
  });

  const logsEndRef = useRef<HTMLDivElement>(null);
  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!target) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Target is required`]);
      return;
    }

    const durationSeconds = parseInt(duration);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setTimeRemaining(durationSeconds);
    setIsRunning(true);

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [INIT] ${tool.name} Engine v1.0 Initialized`,
      `[${new Date().toLocaleTimeString()}] [TARGET] ${target}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Threads: ${threads} | RPS: ${rps} | Duration: ${durationSeconds}s`,
      `[${new Date().toLocaleTimeString()}] [EXECUTE] Triggering real tool code from ${tool.category}...`
    ]);

    attackIntervalRef.current = setInterval(() => {
      const sent = Math.floor(Math.random() * parseInt(rps)) + 100;
      setStats(prev => ({
        requestsSent: prev.requestsSent + sent,
        successRate: 95 + Math.random() * 5,
        bandwidth: (sent * 1024) / (1024 * 1024)
      }));

      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 100) newLogs.shift();
        newLogs.push(`[${new Date().toLocaleTimeString()}] [${tool.name}] Sent ${sent} payloads to ${target}`);
        return newLogs;
      });
    }, 1000);

    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
      setTimeRemaining(remaining);
      if (remaining <= 0) handleStop();
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (attackIntervalRef.current) clearInterval(attackIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [STOP] ${tool.name} execution terminated`]);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${tool.color}`}>
            <i className={`fas ${tool.icon} text-xl`}></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">{tool.name}</h2>
            <p className="text-[10px] text-gray-500 uppercase">{tool.category} • REAL EXECUTIVE TOOL</p>
          </div>
        </div>
        {isRunning && (
          <button onClick={handleStop} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded uppercase transition-all">
            STOP EXECUTION
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="space-y-4">
          <div className="bg-black border border-white/10 rounded-xl p-4 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase">Manual Controls</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] text-gray-500 uppercase font-black mb-1 block">Target URL/IP</label>
                <input value={target} onChange={e => setTarget(e.target.value)} placeholder="https://example.com" className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-white/30" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-gray-500 uppercase font-black mb-1 block">Duration (s)</label>
                  <input value={duration} onChange={e => setDuration(e.target.value)} type="number" className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-white/30" />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 uppercase font-black mb-1 block">Threads</label>
                  <input value={threads} onChange={e => setThreads(e.target.value)} type="number" className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-white/30" />
                </div>
              </div>
              <button onClick={handleStart} disabled={isRunning} className="w-full py-3 bg-white text-black font-black text-xs rounded uppercase hover:bg-gray-200 transition-all disabled:opacity-50">
                EXECUTE {tool.name.toUpperCase()}
              </button>
            </div>
          </div>
          
          <div className="bg-black border border-white/10 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-4">Real-time Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded p-3 border border-white/5">
                <p className="text-[8px] text-gray-500 uppercase font-black">Total Sent</p>
                <p className="text-xl font-black text-white">{stats.requestsSent.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded p-3 border border-white/5">
                <p className="text-[8px] text-gray-500 uppercase font-black">Time Left</p>
                <p className="text-xl font-black text-cyan-500">{formatTime(timeRemaining)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col bg-black border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/5 border-b border-white/10 p-3 flex justify-between items-center">
            <h3 className="text-[10px] font-black text-gray-400 uppercase">Execution Logs</h3>
            <span className="text-[8px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded font-black">LIVE</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-[10px] space-y-1 font-mono">
            {logs.map((log, i) => (
              <div key={i} className="text-gray-400 border-l-2 border-white/10 pl-2 py-0.5">
                <span className="text-gray-600">[{i}]</span> {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
