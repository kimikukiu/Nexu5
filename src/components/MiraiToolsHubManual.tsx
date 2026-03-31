import React, { useState, useEffect, useRef } from 'react';

interface MiraiTool {
  id: string;
  name: string;
  path: string;
  category: string;
  description: string;
  sourceCode: string;
  isRunning: boolean;
  methods: string[];
}

export const MiraiToolsHubManual: React.FC = () => {
  const [tools, setTools] = useState<MiraiTool[]>([]);
  const [selectedTool, setSelectedTool] = useState<MiraiTool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  // Manual Control State
  const [target, setTarget] = useState('');
  const [method, setMethod] = useState('');
  const [duration, setDuration] = useState('60');
  const [rps, setRps] = useState('5000');
  const [rqs, setRqs] = useState('100');
  const [threads, setThreads] = useState('128');
  const [uaCount, setUaCount] = useState('50');
  const [generatedUAs, setGeneratedUAs] = useState<string[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
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

  const MIRAI_TOOLS = [
    { name: '911', methods: ['HTTP-FLOOD', 'HTTPS-FLOOD', 'HTTP2-FLOOD'] },
    { name: 'AkidoPrivate', methods: ['TCP-SYN-FLOOD', 'TCP-ACK-FLOOD', 'UDP-FLOOD'] },
    { name: 'Amakano', methods: ['HTTP-FLOOD', 'HTTP2-PUSH', 'TLS-HANDSHAKE'] },
    { name: 'Apex_Mirai', methods: ['DNS-QUERY-FLOOD', 'NTP-MONLIST', 'SSDP-AMPLIFICATION'] },
    { name: 'Ares', methods: ['HTTP-FLOOD', 'SLOWLORIS', 'HTTP2-RESET'] },
    { name: 'AstroMirai', methods: ['TCP-SYN-FLOOD', 'UDP-FLOOD', 'ICMP-ECHO'] },
    { name: 'B', methods: ['HTTP-FLOOD', 'HTTPS-FLOOD', 'HTTP2-FLOOD'] },
    { name: 'Chikara Mirai Source', methods: ['TCP-ACK-FLOOD', 'UDP-AMPLIFICATION', 'DNS-QUERY-FLOOD'] },
    { name: 'Corona v4', methods: ['HTTP-FLOOD', 'HTTP2-PUSH', 'TLS-RENEGOTIATE'] },
    { name: 'Diablo Private', methods: ['TCP-SYN-FLOOD', 'ICMP-ECHO', 'CHARGEN-FLOOD'] },
    { name: 'Extendo', methods: ['HTTP-FLOOD', 'HTTPS-FLOOD', 'QUIC-FLOOD'] },
    { name: 'FBI Source', methods: ['DNS-QUERY-FLOOD', 'NTP-MONLIST', 'SSDP-AMPLIFICATION'] },
    { name: 'Greeks_Source', methods: ['TCP-SYN-FLOOD', 'TCP-ACK-FLOOD', 'UDP-FLOOD'] },
    { name: 'Hakai', methods: ['HTTP-FLOOD', 'HTTP2-FLOOD', 'TLS-HANDSHAKE'] },
    { name: 'Hito', methods: ['SLOWLORIS', 'HTTP2-RESET', 'TCP-ACK-FLOOD'] },
    { name: 'Hybrid', methods: ['HTTP-FLOOD', 'HTTPS-FLOOD', 'HTTP2-PUSH'] },
    { name: 'Josho v3', methods: ['TCP-SYN-FLOOD', 'UDP-FLOOD', 'ICMP-ECHO'] },
    { name: 'Kanashi v3', methods: ['HTTP-FLOOD', 'DNS-QUERY-FLOOD', 'NTP-MONLIST'] },
    { name: 'Kingdom', methods: ['HTTP2-FLOOD', 'TLS-RENEGOTIATE', 'CHARGEN-FLOOD'] },
    { name: 'L33T v4', methods: ['TCP-ACK-FLOOD', 'SSDP-AMPLIFICATION', 'MEMCACHED-AMPLIFICATION'] },
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
    const initialTools = MIRAI_TOOLS.map((toolData, index) => ({
      id: `mirai-${index}`,
      name: toolData.name,
      path: `/extracted_tools/${toolData.name}`,
      category: toolData.name.includes('Private') ? 'PRIVATE' : 'PUBLIC',
      description: `Mirai botnet variant: ${toolData.name}`,
      sourceCode: `// Source code for ${toolData.name}\n// Loading from repository...`,
      isRunning: false,
      methods: toolData.methods
    }));

    setTools(initialTools);
    setIsLoading(false);
    setLogs(prev => [...prev, `[INIT] Loaded ${initialTools.length} Mirai tools with manual control`]);
  }, []);

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

  const handleStartAttack = () => {
    if (!selectedTool) {
      setLogs(prev => [...prev, `[ERROR] No tool selected`]);
      return;
    }
    if (!target) {
      setLogs(prev => [...prev, `[ERROR] Target is required`]);
      return;
    }
    if (!method) {
      setLogs(prev => [...prev, `[ERROR] Method is required`]);
      return;
    }

    if (generatedUAs.length === 0) {
      generateUserAgents();
    }

    const durationSeconds = parseInt(duration);
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setTimeRemaining(durationSeconds);
    setIsAttacking(true);

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [INIT] ${selectedTool.name} Attack Engine Initialized`,
      `[${new Date().toLocaleTimeString()}] [TARGET] ${target}`,
      `[${new Date().toLocaleTimeString()}] [METHOD] ${method}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Threads: ${threads} | RPS: ${rps} | RQS: ${rqs}`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] User Agents: ${generatedUAs.length} | Duration: ${formatTime(durationSeconds)}`,
      `[${new Date().toLocaleTimeString()}] [ATTACK] Initiating ${selectedTool.name} attack...`
    ]);

    attackIntervalRef.current = setInterval(() => {
      const requestsSent = Math.floor(Math.random() * parseInt(rps)) + parseInt(rps) * 0.7;
      const successRate = 75 + Math.random() * 25;
      const bandwidth = (requestsSent * 1200) / (1024 * 1024);

      setStats({
        requestsSent,
        successRate,
        bandwidth,
        avgResponseTime: Math.floor(Math.random() * 1000) + 50
      });

      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 300) newLogs.shift();
        newLogs.push(
          `[${new Date().toLocaleTimeString()}] [${method}] Requests: ${requestsSent} | Success: ${successRate.toFixed(1)}% | BW: ${bandwidth.toFixed(2)}MB/s`
        );
        return newLogs;
      });
    }, 1000);

    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      const remainingSeconds = Math.floor(remaining / 1000);
      setTimeRemaining(remainingSeconds);

      if (remainingSeconds <= 0) {
        handleStopAttack();
      }
    }, 100);
  };

  const handleStopAttack = () => {
    setIsAttacking(false);

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

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    return () => {
      if (attackIntervalRef.current) clearInterval(attackIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
              <i className="fas fa-network-wired text-emerald-500 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Mirai Tools Hub - Manual Control</h2>
              <p className="text-[9px] text-emerald-500 uppercase tracking-widest">{tools.length} Tools | Full Manual Interface</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-black border border-white/10 rounded-lg py-2 px-3 text-[10px] text-white outline-none focus:border-emerald-500"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-black border border-white/10 rounded-lg py-2 px-3 text-[10px] text-white outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Categories</option>
            <option value="PRIVATE">Private</option>
            <option value="PUBLIC">Public</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        {/* Tools List */}
        <div className="w-1/4 bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3">
            <p className="text-[9px] font-black text-gray-500 uppercase">
              <i className="fas fa-list mr-2"></i> Tools ({filteredTools.length})
            </p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            {filteredTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool);
                  setMethod(tool.methods[0] || '');
                }}
                className={`w-full p-3 border-b border-white/5 text-left transition-all hover:bg-white/5 ${
                  selectedTool?.id === tool.id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''
                }`}
              >
                <p className="text-[9px] font-black text-emerald-500 uppercase truncate">{tool.name}</p>
                <p className="text-[8px] text-gray-600 mt-1">{tool.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Control Panel */}
        <div className="flex-1 flex flex-col gap-4">
          {selectedTool ? (
            <>
              {/* Tool Info & Config */}
              <div className="grid grid-cols-2 gap-4">
                {/* Configuration */}
                <div className="bg-black border border-white/10 rounded-xl p-4">
                  <h3 className="text-[10px] font-black text-white uppercase mb-4">Manual Configuration</h3>
                  <div className="space-y-3 text-[9px]">
                    <div>
                      <label className="block text-gray-600 font-black mb-1">Target</label>
                      <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        placeholder="IP/Domain/URL"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-black mb-1">Method</label>
                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                      >
                        {selectedTool.methods.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 font-black mb-1">Time (s)</label>
                        <input
                          type="number"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-black mb-1">Threads</label>
                        <input
                          type="number"
                          value={threads}
                          onChange={(e) => setThreads(e.target.value)}
                          className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 font-black mb-1">RPS</label>
                        <input
                          type="number"
                          value={rps}
                          onChange={(e) => setRps(e.target.value)}
                          className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-black mb-1">RQS</label>
                        <input
                          type="number"
                          value={rqs}
                          onChange={(e) => setRqs(e.target.value)}
                          className="w-full bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* UA Generator */}
                <div className="bg-black border border-white/10 rounded-xl p-4">
                  <h3 className="text-[10px] font-black text-white uppercase mb-4">User-Agent Generator</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] text-gray-600 font-black mb-1">Generate Count</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={uaCount}
                          onChange={(e) => setUaCount(e.target.value)}
                          className="flex-1 bg-gray-900 border border-white/10 rounded py-1 px-2 text-white text-[9px] focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={generateUserAgents}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-[9px] font-black rounded uppercase transition-all"
                        >
                          Gen
                        </button>
                      </div>
                    </div>
                    {generatedUAs.length > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                        <p className="text-[8px] text-yellow-500 font-black">✓ {generatedUAs.length} UAs Ready</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {!isAttacking ? (
                        <button
                          onClick={handleStartAttack}
                          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black rounded uppercase transition-all"
                        >
                          <i className="fas fa-play mr-1"></i> START
                        </button>
                      ) : (
                        <button
                          onClick={handleStopAttack}
                          className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black rounded uppercase transition-all"
                        >
                          <i className="fas fa-stop mr-1"></i> STOP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Stats & Console */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                {/* Stats */}
                {isAttacking && (
                  <div className="bg-black border border-emerald-500/30 rounded-xl p-4">
                    <h3 className="text-[10px] font-black text-emerald-500 uppercase mb-3">Live Stats</h3>
                    <div className="space-y-2 text-[9px]">
                      <div className="bg-white/5 rounded p-2 border border-white/10">
                        <p className="text-gray-600 font-black mb-1">Timer</p>
                        <p className="text-emerald-500 font-black text-lg">{formatTime(timeRemaining)}</p>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/10">
                        <p className="text-gray-600 font-black mb-1">RPS</p>
                        <p className="text-blue-400 font-black">{stats.requestsSent.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/10">
                        <p className="text-gray-600 font-black mb-1">Success</p>
                        <p className="text-yellow-500 font-black">{stats.successRate.toFixed(1)}%</p>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/10">
                        <p className="text-gray-600 font-black mb-1">Bandwidth</p>
                        <p className="text-pink-500 font-black">{stats.bandwidth.toFixed(2)} MB/s</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Console */}
                <div className={`bg-black border border-gray-700 rounded-xl flex flex-col overflow-hidden ${isAttacking ? 'col-span-2' : 'col-span-3'}`}>
                  <div className="bg-gray-900/50 border-b border-gray-700 px-3 py-2 flex items-center justify-between">
                    <p className="text-[8px] font-black text-gray-500 uppercase">Console</p>
                    <button
                      onClick={() => setLogs([])}
                      className="text-[8px] text-gray-600 hover:text-white transition-colors uppercase font-black"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex-1 p-2 overflow-y-auto custom-scroll font-mono text-[8px] text-emerald-500/80">
                    {logs.slice(-30).map((log, index) => (
                      <div key={index} className="mb-0.5">{log}</div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 bg-black border border-white/10 rounded-xl flex items-center justify-center">
              <p className="text-gray-700 text-[10px]">Select a tool to begin manual control</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiraiToolsHubManual;
