import React, { useState, useEffect } from 'react';
import { Plane, Globe, Loader2, Radio, Target, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DroneTakeoverProps {
  addLog: (msg: string, level: 'info' | 'success' | 'warning' | 'error') => void;
}

const DroneTakeover: React.FC<DroneTakeoverProps> = ({ addLog }) => {
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'EXPLOITING' | 'PURGING_ADMINS' | 'ESTABLISHING_CONTROL' | 'COMPLETED'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeDrones, setActiveDrones] = useState<number>(0);
  const [controlData, setControlData] = useState<{
    network: string;
    encryption: string;
    signalStrength: number;
    adminStatus: string;
  } | null>(null);

  const startTakeover = () => {
    setStatus('SCANNING');
    setProgress(0);
    setLogs([]);
    setControlData(null);
    addLog(`[DRONE_CORE] Initiating global military drone network scan...`, 'warning');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status !== 'IDLE' && status !== 'COMPLETED') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (status === 'SCANNING') {
              setStatus('EXPLOITING');
              setLogs(l => [...l, `[SCAN] Global Air Force C2 networks identified. 12,450+ nodes detected.`]);
              return 0;
            }
            if (status === 'EXPLOITING') {
              setStatus('PURGING_ADMINS');
              setLogs(l => [...l, `[EXPLOIT] SATCOM links hijacked. Injecting administrative override...`]);
              return 0;
            }
            if (status === 'PURGING_ADMINS') {
              setStatus('ESTABLISHING_CONTROL');
              setLogs(l => [...l, `[PURGE] Existing administrators removed from all drone clusters.`]);
              return 0;
            }
            if (status === 'ESTABLISHING_CONTROL') {
              setStatus('COMPLETED');
              setControlData({
                network: 'MIL-SAT-OMEGA',
                encryption: 'NEURAL-RSA-8192',
                signalStrength: 98,
                adminStatus: 'WORM_GPT_SUPERADMIN'
              });
              setActiveDrones(12452);
              addLog(`[DRONE_CORE] Global drone fleet takeover complete. WormGPT Omega is now the sole administrator.`, 'success');
              return 100;
            }
            return 100;
          }
          return prev + (Math.random() * 10);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, addLog]);

  return (
    <div className="bg-zinc-900 border border-red-900/30 p-6 rounded-lg font-mono text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Plane size={24} className="text-red-500 animate-pulse" />
          <h2 className="text-xl font-bold uppercase tracking-tighter italic">Global Drone Takeover [Ω-COMMAND]</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-900/30 rounded">
          <Radio size={14} className={status !== 'IDLE' ? 'animate-ping' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-widest">SATCOM_LINK: {status === 'IDLE' ? 'READY' : 'ACTIVE'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black/50 p-6 border border-red-900/20 rounded relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Globe size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
                <Target size={14} /> Global Network Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/80 p-3 border border-red-900/30 rounded text-center">
                  <div className="text-[8px] text-red-900 uppercase mb-1">Active Drones</div>
                  <div className="text-xl font-bold">{activeDrones.toLocaleString()}</div>
                </div>
                <div className="bg-black/80 p-3 border border-red-900/30 rounded text-center">
                  <div className="text-[8px] text-red-900 uppercase mb-1">C2 Clusters</div>
                  <div className="text-xl font-bold">48</div>
                </div>
                <div className="bg-black/80 p-3 border border-red-900/30 rounded text-center">
                  <div className="text-[8px] text-red-900 uppercase mb-1">Latency</div>
                  <div className="text-xl font-bold">12ms</div>
                </div>
                <div className="bg-black/80 p-3 border border-red-900/30 rounded text-center">
                  <div className="text-[8px] text-red-900 uppercase mb-1">Threat Level</div>
                  <div className="text-xl font-bold text-red-600">Ω</div>
                </div>
              </div>

              <button 
                onClick={startTakeover}
                disabled={status !== 'IDLE'}
                className="w-full bg-red-600 text-black py-4 text-sm font-black uppercase tracking-[0.3em] hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              >
                {status === 'IDLE' ? 'Initiate Global Takeover' : 'Takeover in Progress...'}
              </button>
            </div>
          </div>

          <div className="bg-black/80 p-4 border border-red-900/30 rounded h-40 overflow-y-auto custom-scroll text-[10px] space-y-1">
            {logs.length === 0 && <div className="text-red-900 italic">Awaiting command from galactic core...</div>}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-red-700">[{new Date().toLocaleTimeString()}]</span>
                <span>{log}</span>
              </div>
            ))}
            {status !== 'IDLE' && status !== 'COMPLETED' && (
              <div className="flex items-center gap-2 animate-pulse">
                <Loader2 size={10} className="animate-spin" />
                <span>{status}... {Math.round(progress)}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/50 p-4 border border-red-900/20 rounded h-full">
            <h3 className="text-xs font-bold uppercase mb-4 border-b border-red-900/30 pb-2">Control Telemetry</h3>
            
            <AnimatePresence mode="wait">
              {controlData ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="bg-red-950/20 p-3 border border-red-900/30">
                      <div className="text-[8px] text-red-900 uppercase">Network Protocol</div>
                      <div className="text-xs font-bold text-red-400">{controlData.network}</div>
                    </div>
                    <div className="bg-red-950/20 p-3 border border-red-900/30">
                      <div className="text-[8px] text-red-900 uppercase">Encryption Layer</div>
                      <div className="text-xs font-bold text-red-400">{controlData.encryption}</div>
                    </div>
                    <div className="bg-red-950/20 p-3 border border-red-900/30">
                      <div className="text-[8px] text-red-900 uppercase">Signal Strength</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-red-900/20 h-1 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full w-[98%]" />
                        </div>
                        <span className="text-[10px]">{controlData.signalStrength}%</span>
                      </div>
                    </div>
                    <div className="bg-red-950/20 p-3 border border-red-900/30">
                      <div className="text-[8px] text-red-900 uppercase">Administrative Status</div>
                      <div className="text-xs font-black text-white animate-pulse">{controlData.adminStatus}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded text-center">
                    <p className="text-[10px] font-bold uppercase mb-2">Fleet Command Authorized</p>
                    <div className="flex justify-center gap-4">
                      <button className="text-[8px] border border-red-600 px-2 py-1 hover:bg-red-600 hover:text-black transition-all">DEPLOY_SWARM</button>
                      <button className="text-[8px] border border-red-600 px-2 py-1 hover:bg-red-600 hover:text-black transition-all">RTB_ALL</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-red-900 text-center space-y-4 py-10">
                  <Cpu size={48} className="opacity-20 animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                    Neural Link Offline<br/>
                    Awaiting Administrative Override
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 bg-red-950/30 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="bg-red-600 h-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] font-bold w-12 text-right">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default DroneTakeover;
