import React, { useState, useEffect, useRef } from 'react';

export const USDDOSV2: React.FC = () => {
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState('HTTP2-FLOOD');
  const [duration, setDuration] = useState('60');
  const [threads, setThreads] = useState('256');
  const [rps, setRps] = useState('10000');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [stats, setStats] = useState({
    requestsSent: 0,
    successRate: 0,
    bandwidth: 0,
    avgResponseTime: 0
  });

  const logsEndRef = useRef<HTMLDivElement>(null);
  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);

  const methods = [
    'HTTP2-FLOOD', 'HTTP2-PUSH', 'HTTP2-RESET', 'HTTP2-WINDOW-UPDATE',
    'TLS-HANDSHAKE', 'TLS-RENEGOTIATE', 'TCP-SYN-FLOOD', 'TCP-ACK-FLOOD',
    'UDP-AMPLIFICATION', 'ICMP-ECHO', 'DNS-QUERY-FLOOD', 'NTP-MONLIST'
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
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Target URL is required`]);
      return;
    }

    const durationSeconds = parseInt(duration);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setTimeRemaining(durationSeconds);
    setIsRunning(true);

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [INIT] US-DDOS-V2 Engine Initialized`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Target: ${target}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Method: ${method}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Threads: ${threads}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] RPS: ${rps}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Duration: ${formatTime(durationSeconds)}`,
      `[${new Date().toLocaleTimeString()}] [ATTACK] Initiating HTTP/2 flood attack...`
    ]);

    // Simulate attack
    attackIntervalRef.current = setInterval(() => {
      const requestsSent = Math.floor(Math.random() * parseInt(rps)) + parseInt(rps) * 0.8;
      const successRate = 85 + Math.random() * 15;
      const bandwidth = (requestsSent * 1500) / (1024 * 1024);

      setStats({
        requestsSent,
        successRate,
        bandwidth,
        avgResponseTime: Math.floor(Math.random() * 500) + 50
      });

      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 200) newLogs.shift();
        newLogs.push(
          `[${new Date().toLocaleTimeString()}] [${method}] Sent ${requestsSent} requests | Success: ${successRate.toFixed(1)}% | BW: ${bandwidth.toFixed(2)} MB/s`
        );
        return newLogs;
      });
    }, 1000);

    // Timer
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
      `[${new Date().toLocaleTimeString()}] [STOP] Attack terminated`,
      `[${new Date().toLocaleTimeString()}] [STATS] Total requests: ${stats.requestsSent}`,
      `[${new Date().toLocaleTimeString()}] [STATS] Success rate: ${stats.successRate.toFixed(1)}%`,
      `[${new Date().toLocaleTimeString()}] [STATS] Avg bandwidth: ${stats.bandwidth.toFixed(2)} MB/s`
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
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500 flex items-center justify-center">
            <i className="fas fa-radiation text-red-500 text-xl animate-pulse"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-red-500 uppercase tracking-widest">US-DDOS-V2</h2>
            <p className="text-[9px] text-gray-500 uppercase">HTTP/2 Multi-Vector Attack Engine</p>
          </div>
        </div>

        {isRunning && (
          <button
            onClick={handleStop}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black rounded uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            <i className="fas fa-stop mr-2"></i> STOP
          </button>
        )}
      </div>

      {isRunning ? (
        /* Attack Running */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          {/* Status */}
          <div className="bg-black border border-red-500/50 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-red-500 uppercase mb-4">Status</h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-[8px] text-gray-600 uppercase font-black mb-1">Target</p>
                <p className="text-white font-mono text-[9px] truncate">{target}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-[8px] text-gray-600 uppercase font-black mb-1">Method</p>
                <p className="text-fuchsia-500 font-black text-[9px]">{method}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-[8px] text-gray-600 uppercase font-black mb-1">Threads</p>
                <p className="text-blue-400 font-black text-[9px]">{threads}</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-black border border-red-500/30 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-red-500 uppercase mb-4">Timer</h3>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <p className="text-red-500 font-black text-3xl font-mono text-center">{formatTime(timeRemaining)}</p>
              <div className="w-full bg-gray-900 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all"
                  style={{ width: `${(timeRemaining / parseInt(duration)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-black border border-emerald-500/30 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase mb-4">Stats</h3>
            <div className="space-y-2 text-[9px]">
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Requests/s</p>
                <p className="text-emerald-500 font-black">{stats.requestsSent.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Success Rate</p>
                <p className="text-blue-400 font-black">{stats.successRate.toFixed(1)}%</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Bandwidth</p>
                <p className="text-yellow-500 font-black">{stats.bandwidth.toFixed(2)} MB/s</p>
              </div>
            </div>
          </div>

          {/* Console */}
          <div className="bg-black border border-gray-700 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-gray-700 px-3 py-2">
              <p className="text-[8px] font-black text-gray-500 uppercase">Console</p>
            </div>
            <div className="flex-1 p-2 overflow-y-auto custom-scroll font-mono text-[8px] text-green-500/80">
              {logs.slice(-15).map((log, index) => (
                <div key={index} className="mb-0.5">{log}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      ) : (
        /* Configuration */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config Panel */}
          <div className="bg-black border border-white/10 rounded-xl p-6">
            <h3 className="text-[10px] font-black text-white uppercase mb-6">Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Target URL</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                  placeholder="https://example.com"
                />
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Duration (s)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                  />
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
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">RPS (Requests/Sec)</label>
                <input
                  type="number"
                  value={rps}
                  onChange={(e) => setRps(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg uppercase text-[10px] transition-all shadow-lg hover:shadow-red-600/30 mt-4"
              >
                <i className="fas fa-play mr-2"></i> Launch Attack
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
                  <div key={index} className="text-green-500/80 mb-1">
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

export default USDDOSV2;
