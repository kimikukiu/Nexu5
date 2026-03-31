import React, { useState, useEffect, useRef } from 'react';

export const ZxCDDoS: React.FC = () => {
  const [target, setTarget] = useState('');
  const [port, setPort] = useState('80');
  const [method, setMethod] = useState('HTTP-GET');
  const [threads, setThreads] = useState('100');
  const [duration, setDuration] = useState('60');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attackStats, setAttackStats] = useState({
    packetsPerSecond: 0,
    totalPackets: 0,
    bandwidth: 0,
    successRate: 0
  });
  const logsEndRef = useRef<HTMLDivElement>(null);
  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);

  const methods = [
    'HTTP-GET', 'HTTP-POST', 'HTTP-MIX', 'HTTP-RAW', 'HTTP-SOCKET',
    'TCP-KILL', 'TCP-SYN', 'TCP-ACK', 'TCP-FIN', 'TCP-RST',
    'UDP-FLOOD', 'UDP-BYPASS', 'DNS-AMP', 'NTP-AMP', 'MEMCACHED-AMP'
  ];

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!target) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Target is required.`]);
      return;
    }

    const durationSeconds = parseInt(duration);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setTimeRemaining(durationSeconds);
    setIsRunning(true);
    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [INIT] Initializing ZxCDDoS Engine v5.0...`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Target: ${target}:${port}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Method: ${method}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Threads: ${threads}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Duration: ${formatTime(durationSeconds)}`,
      `[${new Date().toLocaleTimeString()}] [ATTACK] Starting payload delivery...`
    ]);

    // Attack simulation interval
    attackIntervalRef.current = setInterval(() => {
      const pps = Math.floor(Math.random() * 50000) + 10000;
      const packets = Math.floor(Math.random() * 1000) + 500;
      const bw = (pps * 1500) / (1024 * 1024); // Rough bandwidth calculation

      setAttackStats({
        packetsPerSecond: pps,
        totalPackets: packets,
        bandwidth: bw,
        successRate: 95 + Math.random() * 5
      });

      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 150) newLogs.shift();
        newLogs.push(
          `[${new Date().toLocaleTimeString()}] [${method}] Payload delivered - PPS: ${pps} | Success: 200 OK`
        );
        return newLogs;
      });
    }, 500);

    // Timer interval
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      const remainingSeconds = Math.floor(remaining / 1000);
      
      setTimeRemaining(remainingSeconds);

      if (remainingSeconds <= 0) {
        handleStop();
      }
    }, 100);
  };

  const handleStop = () => {
    setIsRunning(false);
    
    if (attackIntervalRef.current) {
      clearInterval(attackIntervalRef.current);
      attackIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [STOP] Attack terminated by user.`,
      `[${new Date().toLocaleTimeString()}] [STATS] Total packets sent: ${attackStats.totalPackets}`,
      `[${new Date().toLocaleTimeString()}] [STATS] Average PPS: ${attackStats.packetsPerSecond}`,
      `[${new Date().toLocaleTimeString()}] [STATS] Success rate: ${attackStats.successRate.toFixed(2)}%`
    ]);
  };

  useEffect(() => {
    return () => {
      if (attackIntervalRef.current) clearInterval(attackIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500 flex items-center justify-center">
            <i className="fas fa-bolt text-red-500 text-lg animate-pulse"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-red-500 uppercase tracking-widest">ZxCDDoS v5.0</h2>
            <p className="text-[9px] text-gray-500 uppercase">Advanced Layer 4/7 Attack Engine</p>
          </div>
        </div>

        {isRunning && (
          <button
            onClick={handleStop}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black rounded uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            <i className="fas fa-stop mr-2"></i> STOP ATTACK
          </button>
        )}
      </div>

      {isRunning ? (
        /* Attack Running View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          {/* Left: Status Panel */}
          <div className="bg-black border border-red-500/50 rounded-xl p-4 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            <h3 className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">
              <i className="fas fa-crosshairs mr-2"></i> Attack Status
            </h3>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Target</p>
                <p className="text-white font-mono text-[10px] truncate">{target}:{port}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Method</p>
                <p className="text-fuchsia-500 font-black text-[10px]">{method}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Threads</p>
                <p className="text-blue-400 font-black text-[10px]">{threads}</p>
              </div>

              {/* Timer */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-2">Time Remaining</p>
                <p className="text-red-500 font-black text-2xl font-mono">{formatTime(timeRemaining)}</p>
                <div className="w-full bg-gray-900 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all"
                    style={{ width: `${(timeRemaining / parseInt(duration)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Statistics */}
          <div className="bg-black border border-emerald-500/30 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase mb-4 tracking-widest">
              <i className="fas fa-chart-line mr-2"></i> Live Statistics
            </h3>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Packets/Second</p>
                <p className="text-emerald-500 font-black text-lg">{attackStats.packetsPerSecond.toLocaleString()}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Total Packets</p>
                <p className="text-blue-400 font-black text-lg">{attackStats.totalPackets.toLocaleString()}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Bandwidth (MB/s)</p>
                <p className="text-yellow-500 font-black text-lg">{attackStats.bandwidth.toFixed(2)}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Success Rate</p>
                <p className="text-fuchsia-500 font-black text-lg">{attackStats.successRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Right: Live Console */}
          <div className="bg-black border border-gray-700 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-[9px] text-gray-500 font-black uppercase">
                <i className="fas fa-terminal mr-2"></i> Live Console
              </span>
              <span className="text-[8px] text-red-500 animate-pulse font-black">● EXECUTING</span>
            </div>
            <div className="flex-1 p-3 overflow-y-auto custom-scroll font-mono text-[9px]">
              {logs.slice(-20).map((log, index) => (
                <div key={index} className="text-green-500/80 mb-0.5 leading-tight">
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      ) : (
        /* Configuration View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="bg-black border border-white/10 rounded-xl p-6">
            <h3 className="text-[10px] font-black text-white uppercase mb-6 tracking-widest">
              <i className="fas fa-sliders mr-2"></i> Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Target Host</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500 transition-all"
                  placeholder="example.com or 192.168.1.1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Port</label>
                  <input
                    type="number"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Duration (s)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Attack Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                >
                  {methods.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Threads</label>
                <input
                  type="number"
                  value={threads}
                  onChange={(e) => setThreads(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg uppercase text-[10px] transition-all shadow-lg hover:shadow-red-600/30 mt-4"
              >
                <i className="fas fa-play mr-2"></i> Initiate Attack
              </button>
            </div>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-[9px] text-gray-500 font-black uppercase">
                <i className="fas fa-terminal mr-2"></i> Console Output
              </span>
              <button
                onClick={() => setLogs([])}
                className="text-[8px] text-gray-600 hover:text-white transition-colors uppercase font-black"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto custom-scroll font-mono text-[9px] min-h-[300px]">
              {logs.length === 0 ? (
                <div className="text-gray-700 italic">Awaiting command sequence...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-green-500/80 mb-1 leading-tight">
                    {log}
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZxCDDoS;
