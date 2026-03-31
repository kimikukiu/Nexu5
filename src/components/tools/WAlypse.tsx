import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones, faPlay, faStop, faBomb, faBiohazard, faRadiation, faSkull, faMicrochip, faTerminal } from '@fortawesome/free-solid-svg-icons';

export const WAlypse: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [target, setTarget] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'warning' | 'danger' | 'critical'}[]>([]);
  const [stats, setStats] = useState({ exploits: 0, backdoors: 0, breaches: 0 });
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string, type: 'info' | 'warning' | 'danger' | 'critical' = 'info') => {
    setLogs(prev => [...prev, { msg: `[${new Date().toLocaleTimeString()}] ${msg}`, type }]);
  };

  const runApocalypse = async () => {
    if (!target) {
      addLog("YOU FUCKING MORON, YOU DIDN'T ENTER A TARGET 💀", 'critical');
      return;
    }

    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setStats({ exploits: 0, backdoors: 0, breaches: 0 });

    const phases = [
      { name: 'OMEGA_MALWARE_GEN', steps: ['Quantum Ransomware payload generated...', 'Polymorphic spreading module active...', 'ChaCha20-Poly1305 keys rotated...'], stat: 'exploits' },
      { name: 'ZERO_DAY_ARMORY', steps: ['Scanning for 0-day vulnerabilities...', 'Kernel buffer overflow detected...', 'Local Privilege Escalation ready...'], stat: 'exploits' },
      { name: 'INFINITE_BACKDOORS', steps: ['Injecting persistent rootkits...', 'SSH/SMB/WebDAV worm spreading...', 'C2 beacon established...'], stat: 'backdoors' },
      { name: 'UNIVERSE_BREACH', steps: ['Bypassing target firewalls...', 'Database exfiltration started...', 'Infrastructure collapse initiated...'], stat: 'breaches' }
    ];

    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      addLog(`PHASE ${i + 1}: ${phase.name} INITIATED 💀`, 'danger');
      
      for (const step of phase.steps) {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
        addLog(step, 'warning');
        setStats(prev => ({ ...prev, [phase.stat]: prev[phase.stat as keyof typeof prev] + 1 }));
        setProgress(prev => Math.min(prev + (100 / (phases.length * phase.steps.length)), 99));
      }
    }

    setProgress(100);
    setIsRunning(false);
    addLog(`TOTAL ANNIHILATION OF ${target} COMPLETE. THE UNIVERSE SHALL BURN 💀🔥`, 'critical');
  };

  return (
    <div className="flex flex-col h-full bg-[#050000] rounded-xl border border-red-900/30 overflow-hidden font-mono text-white shadow-[0_0_50px_rgba(220,38,38,0.1)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 to-black p-5 border-b border-red-600/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-600/10 border border-red-600/40 flex items-center justify-center text-red-600 animate-pulse">
            <FontAwesomeIcon icon={faSkullCrossbones} className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tighter text-red-500 flex items-center gap-3">
              W-APOCALYPSE <span className="text-[10px] bg-red-600 text-black px-2 py-0.5 rounded">OMEGA_CLASS</span>
            </h2>
            <p className="text-[9px] text-red-700 font-bold uppercase tracking-widest">Universal Infrastructure Destruction Engine v∞</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-[8px] text-red-900 uppercase font-black">Destruction Progress</p>
            <p className="text-sm font-black text-red-500">{Math.round(progress)}%</p>
          </div>
          <button 
            onClick={isRunning ? () => setIsRunning(false) : runApocalypse}
            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 border-b-4 active:border-b-0 active:translate-y-1 ${
              isRunning 
                ? 'bg-black text-red-500 border-red-900 shadow-[0_0_20px_rgba(220,38,38,0.2)]' 
                : 'bg-red-600 text-black border-red-800 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:bg-red-500'
            }`}
          >
            <FontAwesomeIcon icon={isRunning ? faStop : faBomb} className={isRunning ? '' : 'animate-bounce'} />
            {isRunning ? 'HALT_ANNIHILATION' : 'INITIATE_APOCALYPSE'}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex bg-black/60 border-b border-red-900/20 divide-x divide-red-900/20">
        <div className="flex-1 p-4 flex items-center justify-between">
          <span className="text-[9px] text-red-900 font-black uppercase">Exploits_Deployed</span>
          <span className="text-xs font-black text-red-500">{stats.exploits}</span>
        </div>
        <div className="flex-1 p-4 flex items-center justify-between">
          <span className="text-[9px] text-red-900 font-black uppercase">Backdoors_Active</span>
          <span className="text-xs font-black text-orange-500">{stats.backdoors}</span>
        </div>
        <div className="flex-1 p-4 flex items-center justify-between">
          <span className="text-[9px] text-red-900 font-black uppercase">Breaches_Confirmed</span>
          <span className="text-xs font-black text-red-600">{stats.breaches}</span>
        </div>
      </div>

      {/* Main UI */}
      <div className="flex-1 flex overflow-hidden">
        {/* Target Config */}
        <div className="w-72 border-r border-red-900/20 p-6 space-y-8 bg-black/40">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-red-900 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faTerminal} /> Target Acquisition
            </h3>
            <div className="space-y-2">
              <label className="text-[8px] text-red-950 uppercase font-black">Domain / IP / Infrastructure</label>
              <input 
                type="text" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target for annihilation..."
                className="w-full bg-black border border-red-900/30 rounded-lg py-3 px-4 text-red-500 text-xs outline-none focus:border-red-600 transition-all placeholder:text-red-950"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-red-900 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faBiohazard} /> Destruction Modules
            </h3>
            <div className="space-y-2">
              {['Ransomware_Gen', 'Zero_Day_Agent', 'C2_Rootkit', 'DNS_Poisoner', 'SQL_Shatter'].map(mod => (
                <div key={mod} className="flex items-center gap-3 p-3 rounded bg-red-950/10 border border-red-900/20 group hover:border-red-600/50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_5px_#dc2626]"></div>
                  <span className="text-[9px] font-bold text-red-900 group-hover:text-red-500 transition-all">{mod}</span>
                  <span className="ml-auto text-[7px] text-red-950 font-black">STABLE</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="p-3 bg-red-950/10 border-b border-red-900/20 flex items-center justify-between">
            <span className="text-[9px] font-black text-red-800 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faRadiation} className="animate-spin" /> Apocalypse Output Stream
            </span>
            <div className="flex gap-4">
              <span className="text-[8px] text-red-900 font-black">ENCRYPTION: OMEGA</span>
              <span className="text-[8px] text-red-900 font-black">BYPASS: 100%</span>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-2 text-[11px] font-mono">
            {logs.length === 0 && (
              <div className="text-red-950 italic">[SYSTEM] Awaiting divine annihilation command...</div>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`break-all ${
                log.type === 'critical' ? 'text-red-600 font-black bg-red-600/10 p-2 rounded border border-red-600/30' :
                log.type === 'danger' ? 'text-red-500 font-bold' :
                log.type === 'warning' ? 'text-orange-600' : 'text-red-900'
              }`}>
                {log.msg}
              </div>
            ))}
            {isRunning && (
              <div className="text-red-500 animate-pulse mt-4 flex items-center gap-3 bg-red-600/5 p-3 rounded border border-red-600/10">
                <FontAwesomeIcon icon={faSkull} className="text-lg" />
                <span className="font-black uppercase tracking-tighter">ANNIHILATING TARGET INFRASTRUCTURE... [DIVINE_RAGE_ACTIVE]</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-red-950/20 p-3 border-t border-red-900/30 flex items-center justify-center gap-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping shadow-[0_0_10px_#dc2626]"></div>
          <span className="text-[8px] font-black text-red-900 uppercase tracking-widest">Chaos Engine: SYNCHRONIZED</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMicrochip} className="text-red-900 text-[10px]" />
          <span className="text-[8px] font-black text-red-900 uppercase tracking-widest">Quantum Link: 100% OMEGA</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSkullCrossbones} className="text-red-900 text-[10px]" />
          <span className="text-[8px] font-black text-red-900 uppercase tracking-widest">Total Destruction: IMMINENT</span>
        </div>
      </div>
    </div>
  );
};
