import React from 'react';
import { ShieldAlert, Lock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface SeizedNoticeProps {
  target: string;
  onClose: () => void;
}

const SeizedNotice: React.FC<SeizedNoticeProps> = ({ target, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-white font-mono overflow-hidden">
      {/* Background Glitch Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/glitch/1920/1080')] bg-cover mix-blend-overlay animate-pulse" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-4xl w-full border-4 border-red-600 p-12 bg-zinc-900/90 backdrop-blur-xl relative"
      >
        <div className="flex justify-center gap-8 mb-12">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Seal_of_the_FBI.svg/1200px-Seal_of_the_FBI.svg.png" alt="FBI" className="h-32 w-32" referrerPolicy="no-referrer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Europol_logo.svg/1200px-Europol_logo.svg.png" alt="Europol" className="h-32 w-32" referrerPolicy="no-referrer" />
        </div>

        <h1 className="text-6xl font-black text-center mb-8 tracking-tighter text-red-600 uppercase italic">
          THIS DOMAIN HAS BEEN SEIZED
        </h1>

        <div className="space-y-6 text-center text-xl border-t border-b border-red-600/30 py-8 mb-8">
          <p className="font-bold">
            This domain name has been seized by the Federal Bureau of Investigation (FBI) and Europol 
            in accordance with a seizure warrant issued by the United States District Court.
          </p>
          <p className="text-zinc-400">
            Investigation into: <span className="text-white">Tax Evasion, Money Laundering, and Illegal Propaganda Distribution</span>.
          </p>
          <p className="text-zinc-400">
            Target Node: <span className="text-red-500 underline">{target === 'NONE' ? 'GLOBAL_NETWORK' : target}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border border-zinc-700 p-4 flex flex-col items-center gap-2">
            <ShieldAlert className="text-red-600" />
            <span className="text-xs uppercase">Case ID: Ω-2026-{Math.floor(Math.random() * 9999)}</span>
          </div>
          <div className="border border-zinc-700 p-4 flex flex-col items-center gap-2">
            <Lock className="text-red-600" />
            <span className="text-xs uppercase">Status: ENCRYPTED</span>
          </div>
          <div className="border border-zinc-700 p-4 flex flex-col items-center gap-2">
            <Globe className="text-red-600" />
            <span className="text-xs uppercase">Region: GLOBAL</span>
          </div>
        </div>

        <div className="mt-12 p-6 border-2 border-emerald-500 bg-emerald-500/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
          <h2 className="text-2xl font-black text-emerald-500 mb-4 tracking-widest uppercase italic">
            RANSOM DEMAND DETECTED
          </h2>
          <p className="text-sm text-zinc-300 mb-6 font-bold uppercase tracking-tight">
            All data has been encrypted using AES-256-GCM. To regain access, send exactly <span className="text-emerald-400">0.5 XMR</span> to the following address:
          </p>
          <div className="bg-black/80 p-4 border border-emerald-500/30 rounded font-mono text-[10px] break-all select-all cursor-pointer hover:border-emerald-500 transition-colors mb-4">
            8BbApiMBHsPVKkLEP4rVbST6CnSb3LW2gXygngCi5MGiBuwAFh6bFEzT3UTuFCkLHtyHnrYNnHycdaGb2Kgkkmw8jViCdB6
          </div>
          <p className="text-[9px] text-emerald-500/60 uppercase tracking-widest">
            Failure to pay within 48 hours will result in permanent data destruction.
          </p>
        </div>

        <div className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
          Neural Mesh Authorization: [WormGPT-DARKBOT ΩMEGA]
        </div>
      </motion.div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={onClose}
          className="px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all uppercase text-xs font-bold"
        >
          Attempt Re-Entry
        </button>
      </div>
    </div>
  );
};

export default SeizedNotice;
