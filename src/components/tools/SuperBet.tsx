import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faPlay, faStop, faChartLine, faRobot, faCoins, faVault, faShieldAlt, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export const SuperBet: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [bookmaker, setBookmaker] = useState('bet365');
  const [stake, setStake] = useState('100');
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'success' | 'warning' | 'danger'}[]>([]);
  const [balance, setBalance] = useState(15420.50);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info') => {
    setLogs(prev => [...prev, { msg: `[${new Date().toLocaleTimeString()}] ${msg}`, type }]);
  };

  const startExtraction = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog(`INITIALIZING SUPERBET_247_V5.0 CORE...`, 'info');
    addLog(`CONNECTING TO ${bookmaker.toUpperCase()} API...`, 'warning');
    
    const steps = [
      { msg: 'Injecting Quantum-Arbitrage modules...', type: 'info' },
      { msg: 'Bypassing Anti-Fraud heuristics...', type: 'warning' },
      { msg: 'Scanning for odds discrepancies (0.001ms precision)...', type: 'success' },
      { msg: 'MATCH FOUND: Man City vs Liverpool - Over 2.5 (Odds: 2.10)', type: 'success' },
      { msg: `PLACING AUTOMATED STAKE: $${stake}...`, type: 'warning' },
      { msg: 'BET CONFIRMED. MONITORING LIVE FEED...', type: 'info' },
      { msg: 'GOAL DETECTED. ADJUSTING HEDGE POSITION...', type: 'success' },
      { msg: 'PROFIT REALIZED: +$210.00', type: 'success' }
    ];

    for (const step of steps) {
      if (!isRunning) break;
      await new Promise(r => setTimeout(r, 1500 + Math.random() * 2000));
      addLog(step.msg, step.type as any);
      if (step.msg.includes('PROFIT')) setBalance(prev => prev + 210);
    }

    setIsRunning(false);
    addLog('EXTRACTION CYCLE COMPLETE. STANDING BY FOR NEXT OPPORTUNITY.', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-xl border border-emerald-900/30 overflow-hidden font-mono text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-black p-5 border-b border-emerald-600/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-600/10 border border-emerald-600/40 flex items-center justify-center text-emerald-500 animate-pulse">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tighter text-emerald-500 flex items-center gap-3">
              SUPERBET_247 <span className="text-[10px] bg-emerald-600 text-black px-2 py-0.5 rounded">ELITE_V5</span>
            </h2>
            <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest text-shadow-glow">Autonomous Bookmaker Domination Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] text-emerald-900 uppercase font-black">Current_Liquidity</p>
            <p className="text-sm font-black text-emerald-500">${balance.toLocaleString()}</p>
          </div>
          <button 
            onClick={isRunning ? () => setIsRunning(false) : startExtraction}
            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 border-b-4 active:border-b-0 active:translate-y-1 ${
              isRunning 
                ? 'bg-black text-emerald-500 border-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                : 'bg-emerald-600 text-black border-emerald-800 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:bg-emerald-500'
            }`}
          >
            <FontAwesomeIcon icon={isRunning ? faStop : faPlay} />
            {isRunning ? 'STOP_EXTRACTION' : 'START_EXTRACTION'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Controls */}
        <div className="w-72 border-r border-emerald-900/20 p-6 space-y-8 bg-black/40">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faRobot} /> Extraction Config
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[8px] text-emerald-950 uppercase font-black">Target Bookmaker</label>
                <select 
                  value={bookmaker}
                  onChange={(e) => setBookmaker(e.target.value)}
                  className="w-full bg-black border border-emerald-900/30 rounded-lg py-2.5 px-3 text-emerald-500 text-[10px] outline-none focus:border-emerald-600 transition-all"
                >
                  <option value="bet365">Bet365 (Global)</option>
                  <option value="1xbet">1xBet (Arbitrage)</option>
                  <option value="pinnacle">Pinnacle (High Limits)</option>
                  <option value="stake">Stake.com (Crypto)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-emerald-950 uppercase font-black">Initial Stake ($)</label>
                <input 
                  type="number" 
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full bg-black border border-emerald-900/30 rounded-lg py-2.5 px-3 text-emerald-500 text-[10px] outline-none focus:border-emerald-600 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faVault} /> Security Layer
            </h3>
            <div className="space-y-2">
              {['Anti-Ban Proxy', 'Device Spoofer', 'Cookie Rotator', 'Hedge Guard'].map(mod => (
                <div key={mod} className="flex items-center gap-3 p-3 rounded bg-emerald-950/10 border border-emerald-900/20 group hover:border-emerald-600/50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 shadow-[0_0_5px_#10b981]"></div>
                  <span className="text-[9px] font-bold text-emerald-900 group-hover:text-emerald-500 transition-all">{mod}</span>
                  <span className="ml-auto text-[7px] text-emerald-950 font-black">ACTIVE</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal / Logs */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="p-3 bg-emerald-950/10 border-b border-emerald-900/20 flex items-center justify-between">
            <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faMicrochip} className="animate-spin" /> Neural Link Output
            </span>
            <div className="flex gap-4">
              <span className="text-[8px] text-emerald-900 font-black">LATENCY: 0.001ms</span>
              <span className="text-[8px] text-emerald-900 font-black">BYPASS: 100%</span>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-2 text-[11px] font-mono">
            {logs.length === 0 && (
              <div className="text-emerald-950 italic">[SYSTEM] Awaiting neural synchronization...</div>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${
                log.type === 'success' ? 'text-emerald-400' :
                log.type === 'warning' ? 'text-orange-400' :
                log.type === 'danger' ? 'text-red-400' : 'text-emerald-800'
              }`}>
                <span className="opacity-30">{log.msg.split(']')[0]}]</span>
                <span className="font-bold">{log.msg.split(']')[1]}</span>
              </div>
            ))}
            {isRunning && (
              <div className="text-emerald-500 animate-pulse mt-4 flex items-center gap-3 bg-emerald-600/5 p-3 rounded border border-emerald-600/10">
                <FontAwesomeIcon icon={faCoins} className="text-lg" />
                <span className="font-black uppercase tracking-tighter">EXTRACTING PROFITS FROM TARGET SYSTEM...</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-emerald-950/20 p-3 border-t border-emerald-900/30 flex items-center justify-center gap-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping shadow-[0_0_10px_#10b981]"></div>
          <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">Neural Network: STABLE</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-900 text-[10px]" />
          <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">Anti-Detection: ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChartLine} className="text-emerald-900 text-[10px]" />
          <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">Profit Rate: 4.2x/hr</span>
        </div>
      </div>
    </div>
  );
};
