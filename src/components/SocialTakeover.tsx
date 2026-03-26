import React, { useState, useEffect } from 'react';
import { ShieldAlert, Key, Smartphone, Share2, Terminal as TerminalIcon, Loader2, CheckCircle2, Fingerprint, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialTakeoverProps {
  target: string;
  addLog: (msg: string, level: 'info' | 'success' | 'warning' | 'error') => void;
}

type Platform = 'WhatsApp' | 'Telegram' | 'Telegram Admin' | 'TikTok' | 'Instagram' | 'Facebook' | 'Twitter' | 'Discord';

const SocialTakeover: React.FC<SocialTakeoverProps> = ({ target, addLog }) => {
  const [platform, setPlatform] = useState<Platform>('WhatsApp');
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'EXPLOITING' | 'BYPASSING_OTP' | 'STEALING_SESSION' | 'GEOLOCATING' | 'COMPLETED'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<{
    email?: string;
    phone?: string;
    password?: string;
    sessionToken?: string;
    otpBypassed: boolean;
    location?: { lat: string; lng: string; city: string; country: string };
  } | null>(null);

  const platforms: Platform[] = ['WhatsApp', 'Telegram', 'Telegram Admin', 'TikTok', 'Instagram', 'Facebook', 'Twitter', 'Discord'];

  const startTakeover = () => {
    setStatus('SCANNING');
    setProgress(0);
    setLogs([]);
    setResults(null);
    addLog(`[SOCIAL_CORE] Initiating takeover sequence for ${platform} account: ${target}`, 'warning');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status !== 'IDLE' && status !== 'COMPLETED') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (status === 'SCANNING') {
              setStatus('EXPLOITING');
              setLogs(l => [...l, `[SCAN] Vulnerability identified in ${platform} OAuth flow.`]);
              return 0;
            }
            if (status === 'EXPLOITING') {
              setStatus('BYPASSING_OTP');
              setLogs(l => [...l, `[EXPLOIT] Payload delivered. Intercepting SMS/Email gateway...`]);
              return 0;
            }
            if (status === 'BYPASSING_OTP') {
              setStatus('STEALING_SESSION');
              setLogs(l => [...l, `[OTP] 2FA/OTP bypassed via SS7 vulnerability. Injecting session cookie...`]);
              return 0;
            }
            if (status === 'STEALING_SESSION') {
              setStatus('GEOLOCATING');
              setLogs(l => [...l, `[SESSION] Session hijacked. Initializing SS7/Palantir geolocation...`]);
              return 0;
            }
            if (status === 'GEOLOCATING') {
              setStatus('COMPLETED');
              setResults({
                email: `${target.split('@')[0] || 'user'}_${Math.floor(Math.random() * 1000)}@neural-leak.net`,
                phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
                password: `Ωmega_${Math.random().toString(36).substring(7).toUpperCase()}!`,
                sessionToken: `sess_${Math.random().toString(36).substring(2, 32)}`,
                otpBypassed: true,
                location: {
                  lat: (Math.random() * 180 - 90).toFixed(6),
                  lng: (Math.random() * 360 - 180).toFixed(6),
                  city: ['London', 'New York', 'Tokyo', 'Berlin', 'Moscow', 'Paris'][Math.floor(Math.random() * 6)],
                  country: ['UK', 'USA', 'Japan', 'Germany', 'Russia', 'France'][Math.floor(Math.random() * 6)]
                }
              });
              addLog(`[SOCIAL_CORE] ${platform} account takeover and geolocation successful for ${target}.`, 'success');
              return 100;
            }
            return 100;
          }
          return prev + (Math.random() * 20);
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [status, platform, target, addLog]);

  return (
    <div className="bg-zinc-900 border border-emerald-900/30 p-6 rounded-lg font-mono text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Share2 size={20} className="text-emerald-500" />
          <h2 className="text-lg font-bold uppercase tracking-tighter italic">Social Takeover Engine [Ω-NEURAL]</h2>
        </div>
        <div className="flex gap-1">
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              disabled={status !== 'IDLE'}
              className={`px-2 py-1 text-[10px] border transition-all ${platform === p ? 'bg-emerald-500 text-black border-emerald-500' : 'border-emerald-900/50 text-emerald-900 hover:border-emerald-500 hover:text-emerald-500'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/50 p-4 border border-emerald-900/20 rounded">
            <label className="block text-[10px] uppercase text-emerald-700 mb-1">Target Identifier (Email/Phone/Username)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={target === 'NONE' ? '' : target}
                readOnly
                placeholder="Select target from neural mesh..."
                className="flex-1 bg-black border border-emerald-900/50 p-2 text-xs outline-none focus:border-emerald-500"
              />
              <button 
                onClick={startTakeover}
                disabled={status !== 'IDLE' || target === 'NONE'}
                className="bg-emerald-600 text-black px-4 py-2 text-xs font-bold uppercase hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'IDLE' ? 'Execute' : 'Running...'}
              </button>
            </div>
          </div>

          <div className="bg-black/80 p-4 border border-emerald-900/30 rounded h-48 overflow-y-auto custom-scroll text-[10px] space-y-1">
            {logs.length === 0 && <div className="text-emerald-900 italic">Waiting for neural link...</div>}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-emerald-700">[{new Date().toLocaleTimeString()}]</span>
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

        <div className="bg-black/50 p-4 border border-emerald-900/20 rounded relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <ShieldAlert size={80} />
          </div>
          
          <h3 className="text-xs font-bold uppercase mb-4 border-b border-emerald-900/30 pb-2">Extraction Results</h3>
          
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 uppercase">Status:</span>
                  <span className="text-[10px] font-bold text-emerald-400 animate-pulse">ACCOUNT_COMPROMISED</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-emerald-950/20 p-2 border border-emerald-900/30">
                    <Smartphone size={14} className="text-emerald-500" />
                    <div>
                      <div className="text-[8px] text-emerald-700 uppercase">Phone Number</div>
                      <div className="text-xs">{results.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-emerald-950/20 p-2 border border-emerald-900/30">
                    <Key size={14} className="text-emerald-500" />
                    <div>
                      <div className="text-[8px] text-emerald-700 uppercase">Password (Decrypted)</div>
                      <div className="text-xs font-bold text-emerald-400">{results.password}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-950/20 p-2 border border-emerald-900/30">
                    <Fingerprint size={14} className="text-emerald-500" />
                    <div className="overflow-hidden">
                      <div className="text-[8px] text-emerald-700 uppercase">Session Token (Steal)</div>
                      <div className="text-[10px] truncate font-mono text-emerald-400">{results.sessionToken}</div>
                    </div>
                  </div>

                  {results.location && (
                    <div className="flex items-center gap-2 bg-emerald-950/20 p-2 border border-emerald-900/30">
                      <Globe size={14} className="text-emerald-500" />
                      <div>
                        <div className="text-[8px] text-emerald-700 uppercase">SS7/Palantir Location</div>
                        <div className="text-[10px] text-emerald-400">
                          {results.location.city}, {results.location.country} ({results.location.lat}, {results.location.lng})
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4 text-[10px] text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>OTP/2FA Bypass: SUCCESSFUL</span>
                </div>

                <button className="w-full mt-4 bg-emerald-500 text-black py-2 text-[10px] font-bold uppercase hover:bg-emerald-400 transition-all">
                  Inject Session into Browser
                </button>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-emerald-900 text-center space-y-2 py-10">
                <TerminalIcon size={40} className="opacity-20" />
                <p className="text-[10px] uppercase tracking-widest">Awaiting Payload Delivery</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 bg-emerald-950/30 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="bg-emerald-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] font-bold w-12 text-right">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default SocialTakeover;
