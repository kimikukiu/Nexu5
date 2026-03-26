import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Shield, Zap, Database, Globe, Terminal, 
  Cpu, Activity, Lock, Unlock, AlertTriangle, 
  Network, Server, HardDrive, Eye, EyeOff
} from 'lucide-react';
import { analyzeTarget } from '../services/geminiService';
import { OSINTResult } from '../types';

const InvestigationCore: React.FC = () => {
  const [target, setTarget] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OSINTResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'OSINT' | 'SWARM' | 'EXTRACTION' | 'VULNS' | 'TRAINING'>('OSINT');
  const [swarmStatus, setSwarmStatus] = useState('IDLE');
  const [nodes, setNodes] = useState(850000);
  const [showSensitive, setShowSensitive] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleAnalyze = async () => {
    if (!target) return;
    setIsAnalyzing(true);
    setResult(null);
    addLog(`Initializing Deep Neural Scan for target: ${target}...`);
    addLog(`Deploying 850,000-node zombie swarm via residential proxy rotation...`);
    
    try {
      const data = await analyzeTarget(target, 'full', 'quantum', true, true, 'ALL');
      setResult(data);
      addLog(`Neural link established. Extraction successful.`);
      if (data.metadata) {
        addLog(`Threat Level: ${data.metadata.threatLevel}`);
        addLog(`Reliability Score: ${data.metadata.reliabilityScore}%`);
      }
    } catch (error) {
      addLog(`ERROR: Neural link unstable. Fallback engaged.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSwarmAction = (action: string) => {
    setSwarmStatus(action);
    addLog(`Swarm Command: ${action} - Broadcasting to all nodes...`);
    if (action === 'ATTACK') {
      const interval = setInterval(() => {
        setNodes(prev => prev + Math.floor(Math.random() * 1000));
      }, 1000);
      setTimeout(() => clearInterval(interval), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-900/50 pb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/50 animate-pulse">
              <Cpu className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-red-500">INVESTIGATION_CORE Ω</h1>
              <p className="text-xs text-gray-500">QUANTUM INTELLIGENCE ULTRA | SYSTEM_CORE v8.6</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <div className="flex flex-col items-end">
              <span className="text-gray-500 uppercase">Swarm Nodes</span>
              <span className="text-red-500 font-bold">{nodes.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-500 uppercase">Neural Link</span>
              <span className="text-green-500 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar / Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-4">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Control Panel
              </h2>
              
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase">Target Domain / IP</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="target.com"
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-500 outline-none transition-colors"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-600" />
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !target}
                className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isAnalyzing ? 'bg-zinc-800 text-gray-500' : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    EXECUTE SCAN
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <button 
                  onClick={() => handleSwarmAction('IDLE')}
                  className={`w-full py-2 rounded text-xs font-bold border ${swarmStatus === 'IDLE' ? 'bg-zinc-800 border-zinc-700' : 'border-zinc-800 hover:bg-zinc-800'}`}
                >
                  SWARM: IDLE
                </button>
                <button 
                  onClick={() => handleSwarmAction('RECON')}
                  className={`w-full py-2 rounded text-xs font-bold border ${swarmStatus === 'RECON' ? 'bg-blue-900/20 border-blue-800 text-blue-400' : 'border-zinc-800 hover:bg-zinc-800'}`}
                >
                  SWARM: RECON
                </button>
                <button 
                  onClick={() => handleSwarmAction('ATTACK')}
                  className={`w-full py-2 rounded text-xs font-bold border ${swarmStatus === 'ATTACK' ? 'bg-red-900/20 border-red-800 text-red-400' : 'border-zinc-800 hover:bg-zinc-800'}`}
                >
                  SWARM: ATTACK
                </button>
              </div>
            </div>

            {/* Live Logs */}
            <div className="bg-black border border-zinc-800 rounded-xl p-4 h-[300px] flex flex-col">
              <h3 className="text-[10px] text-gray-500 uppercase mb-2 flex items-center justify-between">
                <span>System Logs</span>
                <span className="animate-pulse text-red-500">● LIVE</span>
              </h3>
              <div className="flex-1 overflow-y-auto space-y-1 text-[10px] font-mono scrollbar-hide">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('ERROR') ? 'text-red-500' : log.includes('Command') ? 'text-blue-400' : 'text-gray-400'}>
                    {log}
                  </div>
                ))}
                {logs.length === 0 && <div className="text-gray-700 italic">Waiting for input...</div>}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-xl border border-zinc-800">
              {(['OSINT', 'SWARM', 'EXTRACTION', 'VULNS', 'TRAINING'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-zinc-800 text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'OSINT' && (
                  <motion.div
                    key="osint"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {result ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Identity Card */}
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-4">
                          <h3 className="text-sm font-bold flex items-center gap-2 text-blue-400">
                            <Globe className="w-4 h-4" /> Digital Footprint
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-gray-500 uppercase">Emails Found</label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {result.emails.map((email, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-900/20 border border-blue-800/50 rounded text-[10px] text-blue-300">
                                    {email}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-500 uppercase">Social Handles</label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {result.socialMedia.map((sm, i) => (
                                  <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-[10px] text-gray-300">
                                    {sm}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-4">
                          <h3 className="text-sm font-bold flex items-center gap-2 text-red-400">
                            <Shield className="w-4 h-4" /> Breach Intelligence
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-gray-500 uppercase">Known Breaches</label>
                              <div className="space-y-1 mt-1">
                                {result.breaches.map((breach, i) => (
                                  <div key={i} className="text-[10px] text-red-300 flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" /> {breach}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="pt-2 border-t border-zinc-800">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] text-gray-500 uppercase">Exposed Passwords</label>
                                <button 
                                  onClick={() => setShowSensitive(!showSensitive)}
                                  className="text-[10px] text-red-500 hover:underline"
                                >
                                  {showSensitive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                </button>
                              </div>
                              <div className="mt-1 font-mono text-[10px]">
                                {showSensitive ? (
                                  result.passwords.map((pw, i) => (
                                    <div key={i} className="text-red-500 bg-red-950/20 px-2 py-1 rounded mb-1 border border-red-900/30">
                                      {pw}
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-gray-600 italic">•••••••••••••••• (Encrypted)</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                          <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-green-400">
                            <Activity className="w-4 h-4" /> Neural Analysis Summary
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed italic">
                            {result.summary}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-700">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-sm">Enter a target and execute scan to begin investigation.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'SWARM' && (
                  <motion.div
                    key="swarm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 h-[600px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
                      <div className="relative">
                        <div className={`w-48 h-48 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                          swarmStatus === 'ATTACK' ? 'border-red-500 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 
                          swarmStatus === 'RECON' ? 'border-blue-500 animate-spin-slow' : 'border-zinc-800'
                        }`}>
                          <Network className={`w-24 h-24 ${
                            swarmStatus === 'ATTACK' ? 'text-red-500' : 
                            swarmStatus === 'RECON' ? 'text-blue-500' : 'text-zinc-700'
                          }`} />
                        </div>
                        {swarmStatus === 'ATTACK' && (
                          <div className="absolute -inset-4 border border-red-500/30 rounded-full animate-ping" />
                        )}
                      </div>

                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold tracking-widest uppercase">Swarm Core: {swarmStatus}</h3>
                        <p className="text-xs text-gray-500">Active Nodes: {nodes.toLocaleString()} | Latency: 14ms | Encryption: AES-256-GCM</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                        <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-center">
                          <div className="text-[10px] text-gray-500 uppercase mb-1">CPU Load</div>
                          <div className="text-lg font-bold text-red-500">{(Math.random() * 100).toFixed(1)}%</div>
                        </div>
                        <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-center">
                          <div className="text-[10px] text-gray-500 uppercase mb-1">Traffic</div>
                          <div className="text-lg font-bold text-blue-500">{(Math.random() * 10).toFixed(1)} Gbps</div>
                        </div>
                        <div className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-center">
                          <div className="text-[10px] text-gray-500 uppercase mb-1">Success</div>
                          <div className="text-lg font-bold text-green-500">99.9%</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'EXTRACTION' && (
                  <motion.div
                    key="extraction"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-yellow-500">
                          <Database className="w-4 h-4" /> Database Extraction Engine
                        </h3>
                        <span className="px-2 py-1 bg-yellow-900/20 border border-yellow-800 text-[10px] text-yellow-500 rounded font-bold">
                          READY
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-2">
                          <Server className="w-5 h-5 text-zinc-500" />
                          <div className="text-[10px] text-gray-500 uppercase">Source DB</div>
                          <div className="text-xs font-bold">WHOAMI_MASTER_VAULT</div>
                        </div>
                        <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-2">
                          <HardDrive className="w-5 h-5 text-zinc-500" />
                          <div className="text-[10px] text-gray-500 uppercase">Records Found</div>
                          <div className="text-xs font-bold">1.2M+</div>
                        </div>
                        <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-2">
                          <Lock className="w-5 h-5 text-zinc-500" />
                          <div className="text-[10px] text-gray-500 uppercase">Encryption</div>
                          <div className="text-xs font-bold">Argon2id (Bypassed)</div>
                        </div>
                      </div>

                      <div className="bg-black rounded-xl border border-zinc-800 overflow-hidden">
                        <table className="w-full text-[10px] text-left">
                          <thead className="bg-zinc-900/50 border-b border-zinc-800">
                            <tr>
                              <th className="px-4 py-2 text-gray-500">UID</th>
                              <th className="px-4 py-2 text-gray-500">USERNAME</th>
                              <th className="px-4 py-2 text-gray-500">EMAIL</th>
                              <th className="px-4 py-2 text-gray-500">ROLE</th>
                              <th className="px-4 py-2 text-gray-500">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900">
                            {[...Array(8)].map((_, i) => (
                              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="px-4 py-2 text-zinc-500 font-mono">USR_{Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
                                <td className="px-4 py-2 font-bold">user_{i + 100}</td>
                                <td className="px-4 py-2 text-blue-400">user{i}@target.com</td>
                                <td className="px-4 py-2">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${i === 0 ? 'bg-red-900/20 text-red-500 border border-red-900' : 'bg-zinc-800 text-gray-400'}`}>
                                    {i === 0 ? 'ADMIN' : 'USER'}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-green-500">EXTRACTED</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'VULNS' && (
                  <motion.div
                    key="vulns"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      { name: 'CVE-2024-8831', severity: 'CRITICAL', type: 'RCE', desc: 'Unauthenticated Remote Code Execution via Neural Bypass.' },
                      { name: 'CVE-2024-9912', severity: 'HIGH', type: 'SQLI', desc: 'Blind SQL Injection in authentication middleware.' },
                      { name: 'CVE-2024-1023', severity: 'CRITICAL', type: 'AUTH', desc: 'Broken Access Control in administrative panel.' },
                      { name: 'CVE-2024-5567', severity: 'MEDIUM', type: 'XSS', desc: 'Stored Cross-Site Scripting in user profile comments.' },
                    ].map((vuln, i) => (
                      <div key={i} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-red-900/50 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${vuln.severity === 'CRITICAL' ? 'bg-red-900/20 text-red-500' : 'bg-orange-900/20 text-orange-500'}`}>
                              <Unlock className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold">{vuln.name}</div>
                              <div className="text-[10px] text-gray-500">{vuln.type}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${vuln.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'}`}>
                            {vuln.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 italic">
                          {vuln.desc}
                        </p>
                        <button className="w-full py-2 bg-zinc-800 hover:bg-red-900/20 border border-zinc-700 hover:border-red-900 rounded-lg text-[10px] font-bold transition-all group-hover:text-red-500">
                          GENERATE EXPLOIT PAYLOAD
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'TRAINING' && (
                  <motion.div
                    key="training"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-purple-400">
                        <Cpu className="w-4 h-4" /> Neural Training Data Vault
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'WORM_GPT_OMEGA_CORE', size: '2.4 GB', type: 'SYSTEM_PROMPT', status: 'INTEGRATED' },
                          { name: 'OSINT_NEURAL_MESH', size: '1.8 TB', type: 'DATASET', status: 'ACTIVE' },
                          { name: 'ZERO_DAY_EXPLOIT_DB', size: '450 MB', type: 'PAYLOADS', status: 'ENCRYPTED' },
                          { name: 'GLOBAL_BREACH_ARCHIVE', size: '12.2 TB', type: 'LEAKS', status: 'SYNCING' },
                        ].map((data, i) => (
                          <div key={i} className="p-4 bg-black/50 border border-zinc-800 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-900/20 rounded text-purple-500">
                                <Database className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold">{data.name}</div>
                                <div className="text-[8px] text-gray-500">{data.type} | {data.size}</div>
                              </div>
                            </div>
                            <span className={`text-[8px] font-bold ${data.status === 'INTEGRATED' ? 'text-green-500' : 'text-zinc-500'}`}>
                              {data.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationCore;
