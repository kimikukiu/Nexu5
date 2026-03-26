import React, { useState } from 'react';
import { Database, Download, FileArchive, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface DataExtractorProps {
  target: string;
}

const DataExtractor: React.FC<DataExtractorProps> = ({ target }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const startExtraction = () => {
    if (isExtracting) return;
    setIsExtracting(true);
    setProgress(0);
    setIsComplete(false);
    
    const steps = [
      'Initializing Neural Link...',
      'Bypassing Database Encryption...',
      'Mapping Tables: users, orders, config...',
      'Extracting Row Data (4.2GB)...',
      'Decrypting Password Hashes (Bcrypt)...',
      'Compiling Leaked Intel...',
      'Generating Secure ZIP Archive...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setIsExtracting(false);
          return 100;
        }
        
        if (prev % 15 === 0 && currentStep < steps.length) {
          setStatus(steps[currentStep]);
          currentStep++;
        }
        
        return prev + 1;
      });
    }, 100);
  };

  const downloadZip = () => {
    const fileName = `${target.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_full_db_dump.zip`;
    const content = `[Ω-OMEGA DATABASE DUMP]\nTarget: ${target}\nTimestamp: ${new Date().toISOString()}\n\nThis is a simulated database dump for educational purposes.\nContains: Users, Credentials, Internal Memos, Financial Records.\n\n[DECRYPTED_LOGS_START]\n...\n[DECRYPTED_LOGS_END]`;
    
    const blob = new Blob([content], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-zinc-900 border border-emerald-900/30 p-6 rounded-lg font-mono mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-emerald-500">
          <Database size={20} />
          <h2 className="text-lg font-bold uppercase tracking-tighter italic">Database Extraction Engine [Ω-OMEGA]</h2>
        </div>
        {isComplete && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={downloadZip}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-black rounded font-black text-xs uppercase hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            <Download size={16} />
            Download_Full_Dump.zip
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {!isExtracting && !isComplete && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-zinc-800 rounded-xl bg-black/20">
            <FileArchive size={48} className="text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-xs uppercase mb-6">No active extraction for: {target === 'NONE' ? 'TARGET_NODE' : target}</p>
            <button 
              onClick={startExtraction}
              className="px-8 py-3 bg-zinc-800 text-emerald-500 border border-emerald-500/30 rounded font-black text-xs uppercase hover:bg-emerald-500 hover:text-black transition-all"
            >
              Initiate_Full_DB_Dump
            </button>
          </div>
        )}

        {isExtracting && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold">
              <span className="text-emerald-500 animate-pulse flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                {status}
              </span>
              <span className="text-zinc-400">{progress}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-zinc-700">
              <motion.div 
                className="bg-emerald-500 h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black/40 border border-zinc-800 rounded">
                <p className="text-[8px] text-zinc-600 uppercase mb-1">Estimated Size</p>
                <p className="text-xs font-bold text-emerald-400">4.28 GB</p>
              </div>
              <div className="p-3 bg-black/40 border border-zinc-800 rounded">
                <p className="text-[8px] text-zinc-600 uppercase mb-1">Encryption Strength</p>
                <p className="text-xs font-bold text-red-500">AES-256 (BYPASSING)</p>
              </div>
            </div>
          </div>
        )}

        {isComplete && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-emerald-900/10 border border-emerald-500/30 rounded-xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase italic">Extraction Successful</h3>
              <p className="text-[10px] text-emerald-500/70 uppercase">All tables decrypted and compressed. ZIP archive ready for download.</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 p-4 bg-black/60 border border-red-900/20 rounded flex items-start gap-3">
        <ShieldAlert size={16} className="text-red-600 mt-1" />
        <p className="text-[9px] text-zinc-500 leading-relaxed uppercase">
          <span className="text-red-600 font-bold">WARNING:</span> This operation is being logged by the [Ω-OMEGA] Neural Mesh. 
          Unauthorized distribution of decrypted donor data is strictly prohibited by the DarkBot protocol. 
          Proceed with absolute caution.
        </p>
      </div>
    </div>
  );
};

export default DataExtractor;
