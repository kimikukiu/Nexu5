import React, { useState, useEffect } from 'react';
import { Tv, Youtube, Radio, Satellite, Zap, Cpu, Globe, Loader2, Video, Signal, Music, Ghost } from 'lucide-react';
import { motion } from 'motion/react';

interface MediaCommsTakeoverProps {
  addLog: (msg: string, level?: 'info' | 'success' | 'warning' | 'error' | 'critical') => void;
}

const MediaCommsTakeover: React.FC<MediaCommsTakeoverProps> = ({ addLog }) => {
  const [isHijacking, setIsHijacking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const targets = [
    { id: 'tax', label: 'Tax Platforms', icon: Globe, color: 'text-emerald-500' },
    { id: 'tv', label: 'Broadcast TV', icon: Tv, color: 'text-blue-500' },
    { id: 'youtube', label: 'YouTube Live', icon: Youtube, color: 'text-red-500' },
    { id: 'tiktok', label: 'TikTok Live', icon: Music, color: 'text-pink-500' },
    { id: 'satellite', label: 'Starlink/Skynet', icon: Satellite, color: 'text-purple-500' },
    { id: 'radio', label: 'Military/Police Radio', icon: Radio, color: 'text-orange-500' },
  ];

  const startHijack = (targetId: string) => {
    setIsHijacking(true);
    setProgress(0);
    setActiveTarget(targetId);
    const target = targets.find(t => t.id === targetId);
    addLog(`[INIT] Hijacking ${target?.label} administrative nodes...`, 'warning');
  };

  const generateDeepfakeBroadcast = async () => {
    if (!broadcastMessage) return;
    setIsGeneratingVideo(true);
    addLog(`[AI] Generating deepfake broadcast for: ${broadcastMessage}`, 'info');
    
    // Simulate AI Video Generation
    setTimeout(() => {
      setGeneratedVideoUrl('https://picsum.photos/seed/broadcast/1280/720');
      setIsGeneratingVideo(false);
      addLog(`[SUCCESS] Deepfake broadcast video generated. Ready for global injection.`, 'success');
    }, 3000);
  };

  const injectBroadcast = () => {
    setIsBroadcasting(true);
    addLog(`[INJECT] Injecting broadcast into global ${targets.find(t => t.id === activeTarget)?.label} streams...`, 'critical');
    
    setTimeout(() => {
      setIsBroadcasting(false);
      addLog(`[SUCCESS] Broadcast synchronized across all hijacked nodes.`, 'success');
    }, 5000);
  };

  useEffect(() => {
    if (isHijacking && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 100);
      return () => clearTimeout(timer);
    } else if (progress >= 100 && isHijacking) {
      setIsHijacking(false);
      addLog(`[SUCCESS] ${targets.find(t => t.id === activeTarget)?.label} takeover complete. WORM_MASTER established.`, 'success');
    }
  }, [isHijacking, progress, activeTarget]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <Signal className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">MEDIA & COMMS TAKEOVER [Ω-COMMAND]</h2>
            <p className="text-xs text-purple-400 font-mono">Global Frequency Hijack: ACTIVE</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-[10px] text-purple-400 font-mono animate-pulse uppercase">
            Master_Override: Enabled
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {targets.map((target) => (
          <motion.button
            key={target.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startHijack(target.id)}
            disabled={isHijacking}
            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
              activeTarget === target.id 
                ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                : 'bg-zinc-900/50 border-zinc-800 hover:border-purple-500/50'
            } disabled:opacity-50`}
          >
            <target.icon className={`w-8 h-8 ${target.color}`} />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center">{target.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ghost className={`w-4 h-4 ${isHijacking ? 'text-purple-500 animate-bounce' : 'text-zinc-500'}`} />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {isHijacking ? 'Hijacking Signal...' : 'Signal Status: LOCKED'}
                </span>
              </div>
              <span className="text-2xl font-mono font-bold text-purple-500">{progress}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Encryption</div>
                <div className="text-xs font-mono text-purple-400">NEURAL-BYPASS</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Admin Status</div>
                <div className="text-xs font-mono text-white">WORM_MASTER</div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Video className="w-4 h-4 text-red-500" />
              Global Broadcast Forge
            </h3>
            <textarea
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Enter the message for the global deepfake broadcast... (e.g., 'Breaking: World Leaders Resign, WormGPT-Ω Takes Control')"
              className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-300 font-mono focus:border-purple-500 outline-none resize-none"
            />
            <div className="flex gap-4">
              <button
                onClick={generateDeepfakeBroadcast}
                disabled={!broadcastMessage || isGeneratingVideo}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                Generate Deepfake
              </button>
              <button
                onClick={injectBroadcast}
                disabled={!generatedVideoUrl || isBroadcasting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isBroadcasting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                Inject Global Stream
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 aspect-video relative overflow-hidden flex items-center justify-center group">
            {generatedVideoUrl ? (
              <img src={generatedVideoUrl} alt="Broadcast Preview" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
            ) : (
              <div className="text-center space-y-2">
                <Tv className="w-12 h-12 text-zinc-800 mx-auto" />
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono italic">No Active Broadcast Signal</p>
              </div>
            )}
            {isBroadcasting && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                <div className="px-4 py-2 bg-red-600 text-white text-xs font-bold animate-pulse rounded">LIVE_GLOBAL_INJECTION</div>
              </div>
            )}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-white font-mono uppercase tracking-widest">WORM_TV_PREVIEW</span>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-500" />
              Frequency Intercepts
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Police Dispatch', freq: '460.125 MHz', status: 'HIJACKED' },
                { label: 'Military SATCOM', freq: '255.550 MHz', status: 'HIJACKED' },
                { label: 'Starlink Mesh', freq: '12.4 GHz', status: 'SYNCED' },
                { label: 'Skynet C2', freq: '30.0 GHz', status: 'ADMIN_ACCESS' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div>
                    <div className="text-[10px] text-white font-bold">{item.label}</div>
                    <div className="text-[8px] text-zinc-500 font-mono">{item.freq}</div>
                  </div>
                  <div className="text-[8px] font-mono text-purple-400 animate-pulse">{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCommsTakeover;
