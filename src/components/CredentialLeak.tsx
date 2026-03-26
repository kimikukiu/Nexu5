import React from 'react';
import { Mail, Key, ShieldX, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CredentialLeakProps {
  target: string;
}

const CredentialLeak: React.FC<CredentialLeakProps> = ({ target }) => {
  const generateLeaks = (targetName: string) => {
    const domain = targetName.toLowerCase().includes('.') ? targetName.toLowerCase() : `${targetName.toLowerCase()}.com`;
    const baseName = domain.split('.')[0];
    
    return [
      { email: `admin@${domain}`, pass: `${baseName.toUpperCase()}_Root_!@#`, role: 'SuperAdmin', status: 'COMPROMISED' },
      { email: `sysadmin@${domain}`, pass: `SysAdmin_${baseName}_2026!`, role: 'System Admin', status: 'EXPOSED' },
      { email: `it.support@${domain}`, pass: `Secure_${baseName}_2026`, role: 'IT', status: 'EXPOSED' },
      { email: `contact@${domain}`, pass: `${baseName}_P@ssword_123`, role: 'Support', status: 'CRACKED' },
      { email: `dev@${domain}`, pass: `DevOps_${baseName}_99`, role: 'Developer', status: 'DECRYPTED' },
      { email: `ceo@${domain}`, pass: `Executive_${baseName}_TopSecret`, role: 'CEO', status: 'ACCESSED' },
      { email: `dbadmin@${domain}`, pass: `DB_Root_${baseName}_2026`, role: 'Database Admin', status: 'DUMPED' },
    ];
  };

  const leaks = generateLeaks(target === 'NONE' ? 'target.node' : target);

  return (
    <div className="bg-zinc-900 border border-red-900/30 p-6 rounded-lg font-mono">
      <div className="flex items-center gap-2 mb-6 text-red-500">
        <ShieldX size={20} />
        <h2 className="text-lg font-bold uppercase tracking-tighter italic">Credential Leak Dashboard [Ω-OMEGA]</h2>
      </div>

      <div className="space-y-4">
        {leaks.map((leak, i) => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-4 gap-4 p-3 bg-black/50 border-l-2 border-red-600 hover:bg-red-900/10 transition-colors group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Mail size={14} className="text-zinc-500 group-hover:text-red-500" />
              <span className="text-xs truncate">{leak.email}</span>
            </div>
            <div className="flex items-center gap-2 overflow-hidden">
              <Key size={14} className="text-zinc-500 group-hover:text-red-500" />
              <span className="text-xs font-bold text-red-400 blur-[2px] hover:blur-none transition-all cursor-pointer">
                {leak.pass}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-zinc-500" />
              <span className="text-[10px] uppercase text-zinc-400">{leak.role}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-red-600 animate-pulse">{leak.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between">
        <span>Total Records: 1,422</span>
        <span>Encryption: AES-256-GCM (BYPASSED)</span>
      </div>
    </div>
  );
};

export default CredentialLeak;
