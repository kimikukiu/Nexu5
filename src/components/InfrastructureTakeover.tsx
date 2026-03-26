import React, { useState, useEffect } from 'react';
import { Building2, Landmark, Coins, Database, Globe, Loader2, ShieldAlert, Zap, Cpu, Terminal as TerminalIcon, CheckCircle2, AlertTriangle, Radio, Target, Utensils, Hotel, Factory } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfrastructureTakeoverProps {
  onStatusUpdate?: (status: string) => void;
}

const InfrastructureTakeover: React.FC<InfrastructureTakeoverProps> = ({ onStatusUpdate }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [takeoverComplete, setTakeoverComplete] = useState(false);

  const targets = [
    { id: 'scada', label: 'SCADA Systems', icon: Factory, color: 'text-orange-500' },
    { id: 'banks', label: 'Central Banks', icon: Landmark, color: 'text-blue-500' },
    { id: 'crypto', label: 'Crypto Exchanges', icon: Coins, color: 'text-yellow-500' },
    { id: 'horeca', label: 'HORECA Global', icon: Utensils, color: 'text-green-500' },
    { id: 'brands', label: 'Industrial Brands', icon: Building2, color: 'text-purple-500' },
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 10));
  };

  const startTakeover = (targetId: string) => {
    setIsScanning(true);
    setProgress(0);
    setActiveTarget(targetId);
    setTakeoverComplete(false);
    
    const target = targets.find(t => t.id === targetId);
    addLog(`[INIT] Initializing WormGPT-Ω takeover for ${target?.label}...`);
    onStatusUpdate?.(`Targeting ${target?.label}...`);
  };

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => {
        const nextProgress = progress + Math.floor(Math.random() * 5) + 1;
        setProgress(Math.min(nextProgress, 100));
        
        if (progress % 20 === 0) {
          const target = targets.find(t => t.id === activeTarget);
          const messages = [
            `[SCAN] Identifying ${target?.label} entry points...`,
            `[EXPLOIT] Bypassing ${target?.label} firewalls via zero-day...`,
            `[HIJACK] Injecting WormGPT-Ω administrative payload...`,
            `[PURGE] Removing existing administrators...`,
            `[SYNC] Synchronizing ${target?.label} with WormGPT-Ω mesh...`
          ];
          addLog(messages[Math.floor(progress / 20)]);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress >= 100 && isScanning) {
      setIsScanning(false);
      setTakeoverComplete(true);
      const target = targets.find(t => t.id === activeTarget);
      addLog(`[SUCCESS] ${target?.label} fully compromised. WORM_GPT_SUPERADMIN established.`);
      onStatusUpdate?.(`${target?.label} Takeover Complete.`);
    }
  }, [isScanning, progress, activeTarget]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
            <Globe className="w-6 h-6 text-red-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">GLOBAL INFRASTRUCTURE TAKEOVER [Ω-COMMAND]</h2>
            <p className="text-xs text-red-400 font-mono">WormGPT-Ω Neural Mesh: ACTIVE</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded text-[10px] text-red-400 font-mono animate-pulse">
            ADMIN_OVERRIDE: ENABLED
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {targets.map((target) => (
          <motion.button
            key={target.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startTakeover(target.id)}
            disabled={isScanning}
            className={`p-4 rounded-xl border transition-all ${
              activeTarget === target.id 
                ? 'bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-zinc-900/50 border-zinc-800 hover:border-red-500/50'
            } disabled:opacity-50`}
          >
            <target.icon className={`w-8 h-8 mb-3 mx-auto ${target.color}`} />
            <div className="text-xs font-bold text-white uppercase tracking-wider">{target.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-red-500/5 pointer-events-none"
              />
            )}
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isScanning ? 'text-red-500 animate-ping' : 'text-zinc-500'}`} />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {isScanning ? 'Takeover in Progress...' : 'System Idle'}
                </span>
              </div>
              <span className="text-2xl font-mono font-bold text-red-500">{progress}%</span>
            </div>

            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-8">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Node Status</div>
                <div className="text-xs font-mono text-green-500">ENCRYPTED</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Mesh Sync</div>
                <div className="text-xs font-mono text-red-500">100%</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Admin Level</div>
                <div className="text-xs font-mono text-white">WORM_MASTER</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Global Reach</div>
                <div className="text-xs font-mono text-blue-500">UNLIMITED</div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {takeoverComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-4"
              >
                <div className="p-3 bg-red-500 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">WormGPT-Ω Control Established</h3>
                  <p className="text-sm text-red-400 font-mono">All administrative nodes for {targets.find(t => t.id === activeTarget)?.label} have been purged. You are now the WORM_MASTER.</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest">
                    MANAGE_ASSETS
                  </button>
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest">
                    DUMP_DATA
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-[10px] flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-4 pb-2 border-bottom border-zinc-800">
            <TerminalIcon className="w-3 h-3 text-red-500" />
            <span className="text-zinc-500 uppercase tracking-widest">Neural Log Stream</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('SUCCESS') ? 'text-green-400' : log.includes('INIT') ? 'text-blue-400' : 'text-zinc-400'}`}>
                {log}
              </div>
            ))}
            {logs.length === 0 && <div className="text-zinc-700 italic">Waiting for command...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureTakeover;
