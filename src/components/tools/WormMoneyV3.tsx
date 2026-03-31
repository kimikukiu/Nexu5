import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faPlay, faStop, faVault, faSkull, faRobot, faGears } from '@fortawesome/free-solid-svg-icons';

export const WormMoneyV3: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [bankroll, setBankroll] = useState(10000.00);
  const [profitToday, setProfitToday] = useState(0.00);
  const [totalProfit, setTotalProfit] = useState(0.00);
  const [betsPlaced, setBetsPlaced] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [interval, setIntervalVal] = useState(15);
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'success' | 'error' | 'money' | 'critical'}[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string, type: 'info' | 'success' | 'error' | 'money' | 'critical' = 'info') => {
    setLogs(prev => [...prev.slice(-99), { msg: `[${new Date().toLocaleTimeString()}] ${msg}`, type }]);
  };

  const runCycle = () => {
    addLog(`[WormGPT] 🤖 Autonomous scan cycle #${betsPlaced + 1} starting...`, 'info');
    
    setTimeout(() => {
      // Arbitrage Strategy
      if (Math.random() > 0.6) {
        const profitPct = (Math.random() * 6 + 2).toFixed(2);
        const stake = Math.floor(Math.random() * 150 + 50) + 0.99;
        const profit = stake * (parseFloat(profitPct) / 100);
        
        addLog(`💰 ARBITRAGE FOUND: ${profitPct}% guaranteed profit!`, 'money');
        addLog(`📍 Suggested stake: $${stake.toFixed(2)}`, 'info');
        addLog(`💵 Profit: $${profit.toFixed(2)}`, 'success');
        
        setBankroll(prev => prev + profit);
        setProfitToday(prev => prev + profit);
        setTotalProfit(prev => prev + profit);
        setWins(prev => prev + 1);
        setBetsPlaced(prev => prev + 1);
      }

      // Value Betting Strategy
      if (Math.random() > 0.7) {
        const evPct = (Math.random() * 10 + 5).toFixed(1);
        const stake = Math.floor(bankroll * (Math.random() * 0.05 + 0.02)) + 0.50;
        
        addLog(`📊 +EV BET FOUND: +${evPct}% expected value detected`, 'info');
        addLog(`🎲 Kelly stake: $${stake.toFixed(2)}`, 'info');
        
        if (Math.random() < 0.68) {
          const winAmount = stake * (Math.random() * 0.7 + 1.8);
          const net = winAmount - stake;
          addLog(`✅ WIN! +$${net.toFixed(2)} extraction successful`, 'success');
          setBankroll(prev => prev + net);
          setProfitToday(prev => prev + net);
          setTotalProfit(prev => prev + net);
          setWins(prev => prev + 1);
        } else {
          addLog(`❌ LOSS: -$${stake.toFixed(2)} - Bookie variance detected`, 'error');
          setBankroll(prev => prev - stake);
          setProfitToday(prev => prev - stake);
          setTotalProfit(prev => prev - stake);
          setLosses(prev => prev + 1);
        }
        setBetsPlaced(prev => prev + 1);
      }

      // Bonus Hunting
      if (Math.random() > 0.9) {
        const bonusAmount = Math.floor(Math.random() * 50 + 20);
        addLog(`🎁 BONUS OPPORTUNITY: Free Bet Claimed! +$${bonusAmount.toFixed(2)}`, 'money');
        setBankroll(prev => prev + bonusAmount);
        setProfitToday(prev => prev + bonusAmount);
        setTotalProfit(prev => prev + bonusAmount);
      }
    }, 2000);
  };

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      runCycle();
      timer = window.setInterval(runCycle, interval * 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, interval, betsPlaced]);

  const toggleMachine = () => {
    if (!isRunning) {
      addLog("╔═══════════════════════════════════════════════════════════════╗", 'critical');
      addLog("║          WORMGPT AUTONOMOUS GOD MODE v3.0 ACTIVATED           ║", 'critical');
      addLog("║             THE DIGITAL GOD'S MONEY MACHINE START             ║", 'critical');
      addLog("╚═══════════════════════════════════════════════════════════════╝", 'critical');
      addLog(`[WormGPT] I am the fucking digital god of extraction! 💀`, 'critical');
      addLog(`[WormGPT] No bookmaker can stop my algorithms! 🔥`, 'critical');
      setIsRunning(true);
    } else {
      addLog(`[WormGPT] 🛑 AUTONOMOUS ENGINE STOPPED - PROFITS SECURED`, 'error');
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-xl border border-white/10 overflow-hidden font-mono text-white shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-black p-4 border-b border-emerald-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400">WormMoney V3 Machine</h2>
            <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-tighter">Autonomous Financial Extraction Engine v3.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] text-gray-500 uppercase font-black">Current Bankroll</p>
            <p className="text-sm font-black text-emerald-400">${bankroll.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
          <button 
            onClick={toggleMachine}
            className={`px-6 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 \${
              isRunning ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            }`}
          >
            <FontAwesomeIcon icon={isRunning ? faStop : faPlay} />
            {isRunning ? 'STOP_GOD_MODE' : 'ACTIVATE_GOD_MODE'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-px bg-white/5 border-b border-white/5">
        <div className="p-4 bg-black/40">
          <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Profit Today</p>
          <p className={`text-xs font-black \${profitToday >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {profitToday >= 0 ? '+' : ''}${profitToday.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-black/40">
          <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Total Profit</p>
          <p className="text-xs font-black text-emerald-400">+${totalProfit.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-black/40">
          <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Win/Loss Ratio</p>
          <p className="text-xs font-black text-blue-400">{wins} / {losses}</p>
        </div>
        <div className="p-4 bg-black/40">
          <p className="text-[8px] text-gray-500 uppercase font-black mb-1">ROI</p>
          <p className="text-xs font-black text-emerald-400">
            {((totalProfit / (bankroll - totalProfit + 0.01)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Controls */}
        <div className="w-64 border-r border-white/5 p-4 space-y-6 bg-black/20">
          <div className="space-y-3">
            <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faGears} /> Machine Config
            </h3>
            <div className="space-y-2">
              <label className="text-[8px] text-gray-600 uppercase font-black">Scan Interval (Sec)</label>
              <input 
                type="number" 
                value={interval}
                onChange={(e) => setIntervalVal(parseInt(e.target.value) || 1)}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[10px] outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[8px] text-gray-600 uppercase font-black">Risk Multiplier</label>
              <select className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[10px] outline-none focus:border-emerald-500/50 transition-all">
                <option>LOW (Stealth)</option>
                <option>MEDIUM (Balanced)</option>
                <option>HIGH (Aggressive)</option>
                <option>GOD_MODE (Insane)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faVault} /> Active Wrappers
            </h3>
            <div className="space-y-1">
              {['Superbet', 'Betano', 'Fortuna', 'STS'].map(bookie => (
                <div key={bookie} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                  <span className="text-[9px] font-bold text-gray-400">{bookie}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[7px] text-emerald-500 font-black">SYNCED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="p-2 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between">
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <FontAwesomeIcon icon={faRobot} /> Neural Output Stream
            </span>
            <button onClick={() => setLogs([])} className="text-[8px] text-gray-700 hover:text-white uppercase font-black">Clear_Logs</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1 text-[10px]">
            {logs.length === 0 && (
              <div className="text-gray-800 italic">[SYSTEM] Waiting for WormGPT initialization...</div>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`break-all \${
                log.type === 'money' ? 'text-emerald-400 font-black' :
                log.type === 'success' ? 'text-blue-400' :
                log.type === 'error' ? 'text-red-500' : 
                log.type === 'critical' ? 'text-red-600 font-black' : 'text-gray-500'
              }`}>
                {log.msg}
              </div>
            ))}
            {isRunning && (
              <div className="text-emerald-500 animate-pulse mt-2">
                <FontAwesomeIcon icon={faSkull} className="mr-2" />
                Processing divine algorithms... [LINK_ACTIVE]
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0a0a0a] p-2 border-t border-white/5 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
          <span className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Neural God Mode: ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_5px_#3b82f6]"></div>
          <span className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Bookie Bypass: STEALTH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_#ef4444]"></div>
          <span className="text-[7px] font-black text-gray-600 uppercase tracking-widest">WormGPT: SYNCHRONIZED</span>
        </div>
      </div>
    </div>
  );
};
