import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, Square, ShieldAlert, Zap, Globe, Cpu, Activity } from 'lucide-react';

interface AttackStats {
  requestsSent: number;
  rps: number;
  activeThreads: number;
  durationLeft: number;
}

const StarsXKill: React.FC = () => {
  const [target, setTarget] = useState('https://example.com');
  const [duration, setDuration] = useState(60);
  const [rps, setRps] = useState(100);
  const [threads, setThreads] = useState(10);
  const [isAttacking, setIsAttacking] = useState(false);
  const [stats, setStats] = useState<AttackStats>({ requestsSent: 0, rps: 0, activeThreads: 0, durationLeft: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-49), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startAttack = () => {
    if (!target.startsWith('http')) {
      addLog("❌ ERROR: Invalid Target URL");
      return;
    }
    
    setIsAttacking(true);
    setStats({ requestsSent: 0, rps: 0, activeThreads: threads, durationLeft: duration });
    
    addLog(`🚀 ATTACK INITIALIZED: \${target}`);
    addLog(`📊 CONFIG: \${threads} threads | \${rps} RPS | \${duration}s duration`);
    addLog(`🛡️ BYPASS: HTTP/2 + TLS Fingerprinting Active`);
    addLog(`🌐 PROXIES: 5,421 nodes synchronized`);
  };

  const stopAttack = () => {
    setIsAttacking(false);
    addLog("🛑 ATTACK TERMINATED BY USER");
  };

  useEffect(() => {
    let timer: any;
    let statsTimer: any;
    
    if (isAttacking) {
      statsTimer = setInterval(() => {
        setStats(prev => {
          if (prev.durationLeft <= 1) {
            setIsAttacking(false);
            addLog("🏁 ATTACK COMPLETED SUCCESSFULLY");
            return { ...prev, durationLeft: 0, rps: 0 };
          }
          const newRequests = prev.requestsSent + (rps * threads);
          return {
            ...prev,
            requestsSent: newRequests,
            rps: rps * threads * (0.9 + Math.random() * 0.2),
            durationLeft: prev.durationLeft - 1
          };
        });
      }, 1000);
    }

    return () => {
      clearInterval(statsTimer);
    };
  }, [isAttacking, rps, threads]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-red-500 font-mono p-4 border border-red-900/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-red-900/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center border border-red-500/30">
            <Zap className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase italic">StarsX Kill Engine</h2>
            <p className="text-[10px] text-red-800 font-bold tracking-[0.2em]">HTTP/2 FLOODER • LAYER 7 BYPASS • v2.1</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <div className={`w-2 h-2 rounded-full \${isAttacking ? 'bg-red-500 animate-ping' : 'bg-gray-700'}`}></div>
            <span className={isAttacking ? 'text-red-500' : 'text-gray-600'}>
              {isAttacking ? 'ENGINE_ACTIVE' : 'ENGINE_READY'}
            </span>
          </div>
          <span className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">WHOAMISEC PRIVATE METHOD</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        
        {/* Configuration Panel */}
        <div className="space-y-4 bg-red-900/5 p-4 rounded-lg border border-red-900/20">
          <h3 className="text-xs font-black uppercase text-red-800 mb-2 flex items-center gap-2">
            <Globe className="w-3 h-3" /> Target Configuration
          </h3>
          
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Target URL</label>
            <input 
              type="text" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isAttacking}
              className="w-full bg-black border border-red-900/40 rounded px-3 py-2 text-xs focus:outline-none focus:border-red-500 transition-all"
              placeholder="https://victim.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Duration (s)</label>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                disabled={isAttacking}
                className="w-full bg-black border border-red-900/40 rounded px-3 py-2 text-xs focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Threads</label>
              <input 
                type="number" 
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value))}
                disabled={isAttacking}
                className="w-full bg-black border border-red-900/40 rounded px-3 py-2 text-xs focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Rate Per Thread (RPS)</label>
            <input 
              type="number" 
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              disabled={isAttacking}
              className="w-full bg-black border border-red-900/40 rounded px-3 py-2 text-xs focus:outline-none focus:border-red-500"
            />
          </div>

          <button 
            onClick={isAttacking ? stopAttack : startAttack}
            className={`w-full py-3 rounded font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all \${
              isAttacking 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                : 'bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
            }`}
          >
            {isAttacking ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isAttacking ? 'Stop Attack' : 'Launch Attack'}
          </button>
        </div>

        {/* Real-time Stats */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-black border border-red-900/30 p-3 rounded flex flex-col items-center">
              <Activity className="w-4 h-4 text-red-500 mb-1" />
              <span className="text-[8px] text-gray-600 uppercase font-bold">Current RPS</span>
              <span className="text-lg font-black text-white">{isAttacking ? stats.rps.toLocaleString(undefined, {maximumFractionDigits: 0}) : '0'}</span>
            </div>
            <div className="bg-black border border-red-900/30 p-3 rounded flex flex-col items-center">
              <Cpu className="w-4 h-4 text-red-500 mb-1" />
              <span className="text-[8px] text-gray-600 uppercase font-bold">Requests</span>
              <span className="text-lg font-black text-white">{stats.requestsSent.toLocaleString()}</span>
            </div>
            <div className="bg-black border border-red-900/30 p-3 rounded flex flex-col items-center">
              <ShieldAlert className="w-4 h-4 text-red-500 mb-1" />
              <span className="text-[8px] text-gray-600 uppercase font-bold">Bypass Mode</span>
              <span className="text-[10px] font-black text-red-400 mt-2">H2_TLS_PRISM</span>
            </div>
            <div className="bg-black border border-red-900/30 p-3 rounded flex flex-col items-center">
              <div className="w-4 h-4 text-red-500 mb-1 font-bold text-xs flex items-center justify-center">T</div>
              <span className="text-[8px] text-gray-600 uppercase font-bold">Time Left</span>
              <span className="text-lg font-black text-white">{stats.durationLeft}s</span>
            </div>
          </div>

          {/* Terminal Console */}
          <div className="flex-1 bg-black border border-red-900/50 rounded p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
            <div className="flex items-center gap-2 text-[8px] text-red-900 mb-3 border-b border-red-900/20 pb-1 font-black tracking-widest uppercase">
              <TerminalIcon className="w-3 h-3" /> StarsX Output Stream [Encrypted]
            </div>
            {logs.length === 0 && (
              <div className="text-red-950 italic text-[10px] animate-pulse">Waiting for execution instructions...</div>
            )}
            {logs.map((log, i) => (
              <div key={i} className="text-[10px] leading-relaxed mb-1 flex gap-2">
                <span className="text-red-900 shrink-0 opacity-50 font-bold">{log.split('] ')[0]}]</span>
                <span className="text-red-500/80">{log.split('] ')[1]}</span>
              </div>
            ))}
            {isAttacking && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[9px] text-red-600 font-black animate-pulse">FLOODING ACTIVE: PACKETS EMITTED AT {stats.rps.toFixed(0)} RPS</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="mt-4 pt-2 border-t border-red-900/20 flex justify-between items-center text-[8px] text-red-900/60 font-black uppercase tracking-[0.3em]">
        <div className="flex gap-4">
          <span>Cipher: ECDHE-RSA-AES256-GCM-SHA384</span>
          <span>Protocol: HTTP/2.0</span>
        </div>
        <span>© 2026 WHOAMISEC CYBER WARFARE DIVISION</span>
      </div>
    </div>
  );
};

export default StarsXKill;
