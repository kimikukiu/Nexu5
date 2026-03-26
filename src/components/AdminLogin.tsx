
import React, { useState } from 'react';
import { db, doc, getDoc, updateDoc, User } from '../firebase';

interface AdminLoginProps {
  onLogin: () => void;
  onSwitchToUser: () => void;
  user: User | null;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSwitchToUser, user }) => {
  const MASTER_SECRET = '#AllOfThem-3301';
  const ADMIN_TOKEN = '#AllOfThem-3301';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryInput, setRecoveryInput] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const currentPass = localStorage.getItem('admin_password') || MASTER_SECRET;
      
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const profile = userDoc.data();

        if (profile?.role === 'admin') {
          onLogin();
          return;
        }
      }

      // If not admin, check if the password/token provided is the master secret or admin token
      if (password === currentPass || password === MASTER_SECRET || password === ADMIN_TOKEN) {
        if (user) {
          await updateDoc(doc(db, 'users', user.uid), {
            role: 'admin'
          }).catch(() => {});
        }
        onLogin();
      } else {
        throw new Error('ACCESS_DENIED: INVALID_CREDENTIALS_OR_TOKEN');
      }
    } catch (err: any) {
      setError(err.message || 'LOGIN_FAILED');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we'd verify these words against a hash in Firestore
      // For this simulation, we check if they entered at least 3 valid words from our set
      const validWords = ["NEURAL", "QUANTUM", "OMEGA", "WORM", "KERNEL", "STRIKE", "VAULT", "CIPHER", "GHOST", "PULSE", "VOID", "CORE"];
      const inputWords = recoveryInput.toUpperCase().split(/\s+/);
      const matchedCount = inputWords.filter(w => validWords.includes(w)).length;

      if (matchedCount >= 3) {
        localStorage.setItem('admin_password', MASTER_SECRET);
        alert('Admin password has been reset to default: ' + MASTER_SECRET);
        setIsRecoveryMode(false);
        setRecoveryInput('');
      } else {
        throw new Error('RECOVERY_FAILED: INVALID_WORDS');
      }
    } catch (err: any) {
      setError(err.message || 'RECOVERY_FAILED');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 font-mono">
      {/* User Login Switch Button */}
      <button 
        onClick={onSwitchToUser}
        className="fixed bottom-4 right-4 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500/30 hover:text-red-500 hover:border-red-500/50 transition-all z-[9999]"
        title="User Login"
      >
        <i className="fas fa-user text-[10px]"></i>
      </button>

      <div className="w-full max-w-md bg-[#050505] border-2 border-[#dc2626] rounded-xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] animate-in zoom-in-95">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_#dc2626]">
            <i className={`fas ${isRecoveryMode ? 'fa-life-ring' : 'fa-skull-crossbones'} text-2xl text-black`}></i>
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-[0.3em] italic">WHOAMISec_CORE</h1>
          <p className="text-[10px] text-[#dc2626] uppercase tracking-widest mt-2">{isRecoveryMode ? 'Emergency Recovery Mode' : 'Restricted Access Area'}</p>
        </div>

        {!isRecoveryMode ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Enter Master Admin Token or Password</label>
              <div className="relative">
                <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-[#dc2626]/50"></i>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-[#dc2626]/30 rounded-lg py-3 pl-10 pr-4 text-white outline-none focus:border-[#dc2626] transition-all"
                  placeholder="ADMIN-TOKEN-XXXX"
                  dir="ltr"
                  autoFocus
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="text-[10px] text-center font-black text-[#dc2626] animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#dc2626] text-black font-black py-3 rounded-lg uppercase tracking-widest hover:bg-[#ff0000] hover:shadow-[0_0_20px_#dc2626] transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Initialize_Session'}
            </button>

            <button 
              type="button"
              onClick={() => setIsRecoveryMode(true)}
              className="w-full text-[9px] text-gray-600 hover:text-[#dc2626] uppercase font-black transition-colors"
            >
              Forgot Password? Use Recovery Words
            </button>
          </form>
        ) : (
          <form onSubmit={handleRecovery} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Enter Recovery Words (Space Separated)</label>
              <div className="relative">
                <i className="fas fa-keyboard absolute left-3 top-3 text-[#dc2626]/50"></i>
                <textarea 
                  value={recoveryInput}
                  onChange={(e) => setRecoveryInput(e.target.value)}
                  className="w-full h-24 bg-black border border-[#dc2626]/30 rounded-lg py-3 pl-10 pr-4 text-white outline-none focus:border-[#dc2626] transition-all resize-none text-xs"
                  placeholder="WORD1 WORD2 WORD3..."
                  autoFocus
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="text-[10px] text-center font-black text-[#dc2626] animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 text-white border border-white/20 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Reset_Admin_Access'}
            </button>

            <button 
              type="button"
              onClick={() => setIsRecoveryMode(false)}
              className="w-full text-[9px] text-gray-600 hover:text-white uppercase font-black transition-colors"
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[8px] text-gray-700 uppercase tracking-widest">
            Neural Encryption Active | AES-256-GCM
          </p>
        </div>
      </div>
    </div>
  );
};
