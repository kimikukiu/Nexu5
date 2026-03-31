import React, { useState, useEffect, useRef } from 'react';

export const ZxCDDoS: React.FC = () => {
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState('HTTP-FLOOD');
  const [duration, setDuration] = useState('60');
  const [rps, setRps] = useState('5000');
  const [rqs, setRqs] = useState('100');
  const [threads, setThreads] = useState('128');
  const [uaCount, setUaCount] = useState('50');
  const [generatedUAs, setGeneratedUAs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [keepAttack, setKeepAttack] = useState(false);
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
    'HTTP-FLOOD', 'HTTPS-FLOOD', 'HTTP2-FLOOD', 'HTTP2-PUSH', 'HTTP2-RESET',
    'TLS-HANDSHAKE', 'TLS-RENEGOTIATE', 'TCP-SYN-FLOOD', 'TCP-ACK-FLOOD',
    'UDP-FLOOD', 'ICMP-ECHO', 'DNS-QUERY-FLOOD', 'NTP-MONLIST', 'CHARGEN-FLOOD',
    'SSDP-AMPLIFICATION', 'MEMCACHED-AMPLIFICATION', 'QUIC-FLOOD', 'SLOWLORIS'
  ];

  const userAgentList = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1'
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

  const generateUserAgents = () => {
    const count = parseInt(uaCount);
    const generated: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomUA = userAgentList[Math.floor(Math.random() * userAgentList.length)];
      const randomVersion = Math.floor(Math.random() * 100);
      const modifiedUA = randomUA.replace(/Chrome\/\d+/, `Chrome/${randomVersion}`).replace(/Firefox\/\d+/, `Firefox/${randomVersion}`);
      generated.push(modifiedUA);
    }
    
    setGeneratedUAs(generated);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [UA-GEN] Generated ${count} unique user agents`]);
  };

  const handleStart = () => {
    if (!target) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Target is required`]);
      return;
    }

    if (generatedUAs.length === 0) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [WARNING] No user agents generated. Generating default set...`]);
      generateUserAgents();
    }

    const durationSeconds = parseInt(duration);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setTimeRemaining(durationSeconds);
    setIsRunning(true);

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [INIT] ZxCDDoS Engine v2.5 Initialized`,
      `[${new Date().toLocaleTimeString()}] [TARGET] ${target}`,
      `[${new Date().toLocaleTimeString()}] [METHOD] ${method}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Threads: ${threads} | RPS: ${rps} | RQS: ${rqs}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] User Agents: ${generatedUAs.length} | Duration: ${formatTime(durationSeconds)}`,
      `[${new Date().toLocaleTimeString()}] [ATTACK] Initiating attack...`
    ]);

    // Simulate attack
    attackIntervalRef.current = setInterval(() => {
      const requestsSent = Math.floor(Math.random() * parseInt(rps)) + parseInt(rps) * 0.7;
      const successRate = 80 + Math.random() * 20;
      const bandwidth = (requestsSent * 1200) / (1024 * 1024);

      setStats({
        requestsSent,
        successRate,
        bandwidth,
        avgResponseTime: Math.floor(Math.random() * 800) + 100
      });

      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 250) newLogs.shift();
        newLogs.push(
          `[${new Date().toLocaleTimeString()}] [${method}] Requests: ${requestsSent} | Success: ${successRate.toFixed(1)}% | BW: ${bandwidth.toFixed(2)}MB/s | UA: ${generatedUAs[Math.floor(Math.random() * generatedUAs.length)]?.substring(0, 40)}...`
        );
        return newLogs;
      });
    }, 1000);

    // Timer
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      const remainingSeconds = Math.floor(remaining / 1000);
      setTimeRemaining(remainingSeconds);

      if (remainingSeconds <= 0 && !keepAttack) {
        handleStop();
      }
    }, 100);
  };

  const handleKeepAttack = () => {
    if (!isRunning) {
      handleStart();
    } else {
      setKeepAttack(!keepAttack);
      if (!keepAttack) {
        endTimeRef.current = Date.now() + 999999999000; // Essentially infinite
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [KEEP-ATTACK] Attack will continue indefinitely until manual stop`]);
      } else {
        const durationSeconds = parseInt(duration);
        endTimeRef.current = Date.now() + durationSeconds * 1000;
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [TIMER] Attack duration reset to ${formatTime(durationSeconds)}`]);
      }
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setKeepAttack(false);

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
      `[${new Date().toLocaleTimeString()}] [FINAL-STATS] Total requests: ${stats.requestsSent}`,
      `[${new Date().toLocaleTimeString()}] [FINAL-STATS] Success rate: ${stats.successRate.toFixed(1)}%`,
      `[${new Date().toLocaleTimeString()}] [FINAL-STATS] Avg bandwidth: ${stats.bandwidth.toFixed(2)} MB/s`
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
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
            <i className="fas fa-bolt text-cyan-500 text-xl animate-pulse"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-cyan-500 uppercase tracking-widest">ZxCDDoS v2.5</h2>
            <p className="text-[9px] text-gray-500 uppercase">Manual Multi-Layer Attack Engine</p>
          </div>
        </div>

        {isRunning && (
          <div className="flex gap-2">
            <button
              onClick={handleKeepAttack}
              className={`px-4 py-2 text-[10px] font-black rounded uppercase transition-all ${
                keepAttack
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
              }`}
            >
              <i className={`fas ${keepAttack ? 'fa-infinity' : 'fa-play'} mr-2`}></i>
              {keepAttack ? 'KEEP ATTACK' : 'KEEP RUNNING'}
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black rounded uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              <i className="fas fa-stop mr-2"></i> STOP
            </button>
          </div>
        )}
      </div>

      {isRunning ? (
        /* Attack Running - Live Stats */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          {/* Target & Config */}
          <div className="bg-black border border-cyan-500/50 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-cyan-500 uppercase mb-4">Configuration</h3>
            <div className="space-y-3 text-[9px]">
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Target</p>
                <p className="text-white font-mono truncate">{target}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Method</p>
                <p className="text-fuchsia-500 font-black">{method}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Threads</p>
                <p className="text-blue-400 font-black">{threads}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">User Agents</p>
                <p className="text-yellow-500 font-black">{generatedUAs.length}</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-black border border-cyan-500/30 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-cyan-500 uppercase mb-4">Timer</h3>
            <div className={`border rounded p-3 ${keepAttack ? 'bg-orange-500/10 border-orange-500/30' : 'bg-cyan-500/10 border-cyan-500/30'}`}>
              <p className={`font-black text-3xl font-mono text-center ${keepAttack ? 'text-orange-500' : 'text-cyan-500'}`}>
                {keepAttack ? '∞' : formatTime(timeRemaining)}
              </p>
              {!keepAttack && (
                <div className="w-full bg-gray-900 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-cyan-600 h-full transition-all"
                    style={{ width: `${(timeRemaining / parseInt(duration)) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-black border border-emerald-500/30 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase mb-4">Live Stats</h3>
            <div className="space-y-2 text-[9px]">
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">RPS</p>
                <p className="text-emerald-500 font-black">{stats.requestsSent.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Success</p>
                <p className="text-blue-400 font-black">{stats.successRate.toFixed(1)}%</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Bandwidth</p>
                <p className="text-yellow-500 font-black">{stats.bandwidth.toFixed(2)} MB/s</p>
              </div>
              <div className="bg-white/5 rounded p-2 border border-white/10">
                <p className="text-gray-600 uppercase font-black mb-1">Avg Response</p>
                <p className="text-pink-500 font-black">{stats.avgResponseTime}ms</p>
              </div>
            </div>
          </div>

          {/* Console */}
          <div className="bg-black border border-gray-700 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-gray-700 px-3 py-2">
              <p className="text-[8px] font-black text-gray-500 uppercase">Console</p>
            </div>
            <div className="flex-1 p-2 overflow-y-auto custom-scroll font-mono text-[8px] text-cyan-500/80">
              {logs.slice(-20).map((log, index) => (
                <div key={index} className="mb-0.5">{log}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      ) : (
        /* Configuration Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Manual Control Panel */}
          <div className="bg-black border border-white/10 rounded-xl p-6">
            <h3 className="text-[10px] font-black text-white uppercase mb-6">Manual Control</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Target (URL/IP/Domain)</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                  placeholder="https://example.com or 192.168.1.1"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Attack Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                >
                  {methods.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Duration (sec)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Threads</label>
                  <input
                    type="number"
                    value={threads}
                    onChange={(e) => setThreads(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">RPS</label>
                  <input
                    type="number"
                    value={rps}
                    onChange={(e) => setRps(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">RQS</label>
                  <input
                    type="number"
                    value={rqs}
                    onChange={(e) => setRqs(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Generate User Agents</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={uaCount}
                    onChange={(e) => setUaCount(e.target.value)}
                    className="flex-1 bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-cyan-500"
                    placeholder="Number of UAs"
                  />
                  <button
                    onClick={generateUserAgents}
                    className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-[9px] font-black rounded uppercase transition-all"
                  >
                    Generate
                  </button>
                </div>
                {generatedUAs.length > 0 && (
                  <p className="text-[8px] text-yellow-500 mt-2">✓ {generatedUAs.length} UAs ready</p>
                )}
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-3 rounded-lg uppercase text-[10px] transition-all shadow-lg hover:shadow-cyan-600/30 mt-4"
              >
                <i className="fas fa-play mr-2"></i> START ATTACK
              </button>
            </div>
          </div>

          {/* User Agents Preview */}
          <div className="bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3">
              <span className="text-[9px] text-gray-500 font-black uppercase">
                <i className="fas fa-user-secret mr-2"></i> Generated User Agents ({generatedUAs.length})
              </span>
            </div>
            <div className="flex-1 p-3 overflow-y-auto custom-scroll font-mono text-[8px] min-h-[300px]">
              {generatedUAs.length === 0 ? (
                <div className="text-gray-700 italic">Click "Generate" to create user agents...</div>
              ) : (
                generatedUAs.map((ua, index) => (
                  <div key={index} className="text-yellow-500/80 mb-2 break-all">
                    {index + 1}. {ua}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <span className="text-[9px] text-gray-500 font-black uppercase">
                <i className="fas fa-terminal mr-2"></i> Console
              </span>
              <button
                onClick={() => setLogs([])}
                className="text-[8px] text-gray-600 hover:text-white transition-colors uppercase font-black"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto custom-scroll font-mono text-[9px] min-h-[300px]">
              {logs.length === 0 ? (
                <div className="text-gray-700 italic">Awaiting command...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-cyan-500/80 mb-1">
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
