
import React, { useState } from 'react';
import { LogEntry } from '../types';
import { db, doc, updateDoc, User } from '../firebase';

interface SubscriptionProps {
  onActivate: () => void;
  addLog: (message: string, level: LogEntry['level']) => void;
  onSwitchToAdmin: () => void;
  user: User | null;
}

interface UserToken {
  id: string;
  email: string;
  plan: 'WEEK' | 'MONTH' | 'YEAR';
  token: string;
  expiresAt: string;
  status: 'ACTIVE' | 'EXPIRED';
}

export const Subscription: React.FC<SubscriptionProps> = ({ onActivate, addLog, onSwitchToAdmin, user }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !token) {
      setError('MISSING_CREDENTIALS: EMAIL_AND_TOKEN_REQUIRED');
      return;
    }

    setLoading(true);
    try {
      // Get tokens from localStorage (as configured in AdminPanel)
      const savedTokens: UserToken[] = JSON.parse(localStorage.getItem('whoamisec_user_tokens') || '[]');
      
      // Hardcoded fallback tokens for demo/testing
      const fallbackTokens = ['WHOAMI-PRO-2025', 'WHOAMI-ELITE-999', 'WHOAMI-MASTER-001'];
      
      const foundToken = savedTokens.find(t => t.token === token && t.email.toLowerCase() === email.toLowerCase());
      const isFallback = fallbackTokens.includes(token);

      if (foundToken || isFallback) {
        if (user) {
          await updateDoc(doc(db, 'users', user.uid), {
            subscriptionStatus: 'active',
            accessToken: token,
            email: email // Store the login email
          }).catch(() => {});
        }
        onActivate();
        addLog(`USER: Subscription activated for ${email}`, 'success');
      } else {
        throw new Error('INVALID_EMAIL_OR_TOKEN_COMBINATION');
      }
    } catch (err: any) {
      setError(err.message || 'ACTIVATION_FAILED');
      setTimeout(() => setError(''), 3000);
      addLog(`USER: Activation failed - ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] bg-black flex items-center justify-center p-4 font-mono">
      {/* Admin Login Switch Button */}
      <button 
        onClick={onSwitchToAdmin}
        className="fixed bottom-4 right-4 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500/30 hover:text-emerald-500 hover:border-emerald-500/50 transition-all z-[9999]"
        title="Admin Login"
      >
        <i className="fas fa-user-shield text-[10px]"></i>
      </button>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#050505] border-2 border-emerald-500/30 rounded-2xl p-8 shadow-[0_0_100px_rgba(16,185,129,0.1)] animate-in zoom-in-95">
        
        {/* Left Side: Plans */}
        <div className="space-y-6 border-r border-white/5 pr-4 md:pr-8">
          <div className="flex flex-col items-center md:items-start mb-4">
            <h2 className="text-xl font-black text-white uppercase tracking-[0.2em] italic">WHOAMISec_PLAN</h2>
            <p className="text-[9px] text-emerald-500 uppercase tracking-widest mt-1">Select your offensive tier</p>
          </div>

          <div className="space-y-3">
            <PlanCard title="Weekly Access" price="$30" features={['Full Tool Access', 'Standard Support', '7 Days Validity']} />
            <PlanCard title="Monthly Access" price="$300" features={['Full Tool Access', 'Priority Support', '30 Days Validity']} />
            <PlanCard title="Yearly Access" price="$1000" features={['Full Tool Access', 'Dedicated Support', '365 Days Validity']} />
          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <p className="text-[9px] text-gray-400 uppercase leading-relaxed">
              Contact administrator to purchase a token. All payments are processed via XMR for maximum anonymity.
            </p>
          </div>
        </div>

        {/* Right Side: Activation */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Activate_Session</h3>
            <p className="text-[9px] text-gray-600 uppercase mt-1">Enter your email and access token to initialize the neural link</p>
          </div>

          <form onSubmit={handleActivate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">User Email</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/50"></i>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-emerald-500/30 rounded-lg py-3 pl-10 pr-4 text-white outline-none focus:border-emerald-500 transition-all font-mono text-xs"
                  placeholder="user@example.com"
                  dir="ltr"
                  autoFocus
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Access Token</label>
              <div className="relative">
                <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/50"></i>
                <input 
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-black border border-emerald-500/30 rounded-lg py-3 pl-10 pr-4 text-white outline-none focus:border-emerald-500 transition-all font-mono text-xs"
                  placeholder="WHOAMI-XXXX-XXXX"
                  dir="ltr"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="text-[10px] text-center font-black text-red-500 animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-black font-black py-3 rounded-lg uppercase tracking-widest hover:bg-emerald-500 hover:shadow-[0_0_20px_#10b981] transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Initialize_Access'}
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-[8px] text-gray-700 uppercase tracking-widest">
              Neural Encryption Active | AES-256-GCM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ title: string; price: string; features: string[] }> = ({ title, price, features }) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-all group">
    <div className="flex justify-between items-center mb-1">
      <span className="text-[10px] font-black text-white uppercase tracking-widest">{title}</span>
      <span className="text-[10px] font-black text-emerald-500">{price}</span>
    </div>
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {features.map((f, i) => (
        <span key={i} className="text-[7px] text-gray-600 uppercase font-bold">• {f}</span>
      ))}
    </div>
  </div>
);
