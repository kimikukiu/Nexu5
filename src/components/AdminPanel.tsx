
import React, { useState, useEffect } from 'react';
import { LogEntry } from '../types';

interface AdminPanelProps {
  addLog: (message: string, level: LogEntry['level']) => void;
}

interface UserToken {
  id: string;
  email: string;
  plan: 'WEEK' | 'MONTH' | 'YEAR';
  token: string;
  expiresAt: string;
  status: 'ACTIVE' | 'EXPIRED';
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ addLog }) => {
  const [tokens, setTokens] = useState<UserToken[]>(() => {
    const saved = localStorage.getItem('whoamisec_user_tokens');
    return saved ? JSON.parse(saved) : [];
  });

  const [newEmail, setNewEmail] = useState('');
  const [newPlan, setNewPlan] = useState<'WEEK' | 'MONTH' | 'YEAR'>('WEEK');
  const [adminPassword, setAdminPassword] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [cloningLogs, setCloningLogs] = useState<string[]>([]);
  const [isCloning, setIsCloning] = useState(false);
  const [recoveryWords, setRecoveryWords] = useState<string[]>([]);
  const [showRecovery, setShowRecovery] = useState(false);
  const [loggedApiKeys, setLoggedApiKeys] = useState<any>({});

  const MASTER_SECRET = 'MerleoskinMerleoskin77';

  useEffect(() => {
    localStorage.setItem('whoamisec_user_tokens', JSON.stringify(tokens));
  }, [tokens]);

  useEffect(() => {
    fetchLoggedKeys();
  }, []);

  const fetchLoggedKeys = async () => {
    try {
      const res = await fetch('/api/config/keys');
      const data = await res.json();
      setLoggedApiKeys(data);
    } catch (error) {
      console.error('Failed to fetch keys');
    }
  };

  const generateToken = () => {
    if (!newEmail) return;
    
    const duration = newPlan === 'WEEK' ? 7 : newPlan === 'MONTH' ? 30 : 365;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + duration);

    const newToken: UserToken = {
      id: Math.random().toString(36).substring(7),
      email: newEmail,
      plan: newPlan,
      token: `WHOAMI-${Math.random().toString(36).substring(2).toUpperCase()}`,
      expiresAt: expiresAt.toISOString(),
      status: 'ACTIVE'
    };

    setTokens(prev => [...prev, newToken]);
    setNewEmail('');
    addLog(`ADMIN: Token generated for ${newEmail} (${newPlan})`, 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = localStorage.getItem('admin_password') || '#AllOfThem-3301';
    
    if (adminPassword === currentPass || secretWord === MASTER_SECRET) {
      localStorage.setItem('admin_password', newAdminPassword);
      setAdminPassword('');
      setNewAdminPassword('');
      setSecretWord('');
      addLog('ADMIN: Admin password updated successfully', 'success');
      alert('Password updated successfully');
    } else {
      addLog('ADMIN: Password update failed - invalid credentials', 'error');
      alert('Invalid current password or master key');
    }
  };

  const handleCloneRepo = async () => {
    if (!repoUrl) return;
    setIsCloning(true);
    setCloningLogs(['[SYSTEM] Initializing projection sequence...']);
    
    try {
      const res = await fetch('/api/admin/clone-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });
      const data = await res.json();
      if (data.success) {
        setCloningLogs(data.logs);
        addLog(`ADMIN: Repository cloned successfully: ${repoUrl}`, 'success');
      }
    } catch (error) {
      setCloningLogs(prev => [...prev, '[ERROR] Projection failed. Connection lost.']);
    } finally {
      setIsCloning(false);
    }
  };

  const fetchRecoveryWords = async () => {
    try {
      const res = await fetch('/api/admin/recovery-words');
      const data = await res.json();
      setRecoveryWords(data.words);
      setShowRecovery(true);
      addLog('ADMIN: Recovery words generated', 'info');
    } catch (error) {
      console.error('Failed to fetch recovery words');
    }
  };

  const deleteToken = (id: string) => {
    setTokens(prev => prev.filter(t => t.id !== id));
    addLog('ADMIN: User token revoked', 'warning');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Generation */}
        <div className="bg-[#0a0a0a] border border-[#dc2626]/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-key text-[#dc2626]"></i> Token Generation System
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">User Email</label>
              <input 
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#dc2626]"
                placeholder="victim@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Subscription Plan</label>
              <select 
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value as any)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#dc2626]"
              >
                <option value="WEEK">Weekly - $30</option>
                <option value="MONTH">Monthly - $300</option>
                <option value="YEAR">Yearly - $1000</option>
              </select>
            </div>

            <button 
              onClick={generateToken}
              className="w-full bg-[#dc2626] text-black font-black py-3 rounded-lg uppercase tracking-widest hover:bg-[#ff0000] transition-all"
            >
              Generate_Access_Token
            </button>
          </div>
        </div>

        {/* Admin Security */}
        <div className="bg-[#0a0a0a] border border-[#dc2626]/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-shield-halved text-[#dc2626]"></i> Kernel Security Config
          </h3>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Current Password (or Secret Word)</label>
              <input 
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#dc2626]"
                placeholder="Current Admin Password"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Master Override Key</label>
              <input 
                type="password"
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#dc2626]"
                placeholder="Enter Master Key..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">New Admin Password</label>
              <input 
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#dc2626]"
                placeholder="New Admin Password"
              />
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 bg-white/5 text-white border border-white/10 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Update_Kernel_Password
              </button>
              <button 
                type="button"
                onClick={fetchRecoveryWords}
                className="bg-[#dc2626]/10 text-[#dc2626] border border-[#dc2626]/30 font-black px-4 rounded-lg hover:bg-[#dc2626]/20 transition-all"
                title="Generate Recovery Words"
              >
                <i className="fas fa-life-ring"></i>
              </button>
            </div>
          </form>

          {showRecovery && (
            <div className="mt-4 p-4 bg-black border border-[#dc2626]/30 rounded-lg animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] font-black text-[#dc2626] uppercase">Recovery Words (Save Securely)</span>
                <button onClick={() => setShowRecovery(false)} className="text-gray-600 hover:text-white"><i className="fas fa-times"></i></button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {recoveryWords.map((word, i) => (
                  <div key={i} className="text-[9px] bg-white/5 p-1 text-center rounded border border-white/5 text-gray-400">
                    <span className="text-[7px] text-[#dc2626] mr-1">{i+1}.</span>{word}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Autonomous Projection */}
      <div className="bg-[#0a0a0a] border border-blue-500/20 p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
          <i className="fab fa-github text-blue-500"></i> WormGPT Omega Autonomous Projection
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Repository URL</label>
              <input 
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-blue-500"
                placeholder="https://github.com/user/repo"
              />
            </div>
            <button 
              onClick={handleCloneRepo}
              disabled={isCloning}
              className={`w-full font-black py-3 rounded-lg uppercase tracking-widest transition-all ${
                isCloning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {isCloning ? 'PROJECTION_IN_PROGRESS...' : 'START_AUTONOMOUS_CLONE'}
            </button>
          </div>
          
          <div className="lg:col-span-2 bg-black border border-white/5 rounded-lg p-4 h-48 overflow-y-auto font-mono text-[10px]">
            {cloningLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-700 italic uppercase">
                Waiting for projection command...
              </div>
            ) : (
              <div className="space-y-1">
                {cloningLogs.map((log, i) => (
                  <div key={i} className={`${log.includes('[ERROR]') ? 'text-red-500' : log.includes('[GIT]') ? 'text-blue-400' : 'text-emerald-500'}`}>
                    {log}
                  </div>
                ))}
                {isCloning && <div className="text-emerald-500 animate-pulse">_</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API Key Vault (Logged Keys) */}
      <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-vault text-emerald-500"></i> Logged API Key Vault
          </h3>
          <button onClick={fetchLoggedKeys} className="text-[10px] text-emerald-500 hover:text-emerald-400 font-black uppercase">
            <i className="fas fa-sync-alt mr-1"></i> Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(loggedApiKeys).length === 0 ? (
            <div className="col-span-full py-8 text-center text-[10px] text-gray-600 uppercase italic">No logged keys found in kernel</div>
          ) : (
            Object.entries(loggedApiKeys).map(([key, value]: [string, any]) => (
              <div key={key} className="bg-black border border-white/5 p-3 rounded-lg">
                <div className="text-[8px] text-gray-500 uppercase font-black mb-1">{key}</div>
                <div className="text-[10px] text-emerald-500 font-mono break-all">{String(value)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Active Tokens List */}
      <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Active Subscriber Tokens</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase">User</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase">Plan</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase">Token</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase">Expires</th>
                <th className="pb-4 text-[10px] font-black text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tokens.map(token => (
                <tr key={token.id} className="group">
                  <td className="py-4 text-[11px] font-bold text-white">{token.email}</td>
                  <td className="py-4">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                      token.plan === 'YEAR' ? 'bg-emerald-500/20 text-emerald-500' :
                      token.plan === 'MONTH' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {token.plan}
                    </span>
                  </td>
                  <td className="py-4 text-[11px] font-mono text-[#dc2626]">{token.token}</td>
                  <td className="py-4 text-[10px] text-gray-500">{new Date(token.expiresAt).toLocaleDateString()}</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => deleteToken(token.id)}
                      className="text-gray-700 hover:text-[#dc2626] transition-colors"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {tokens.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[10px] text-gray-600 uppercase italic">No active tokens found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
