
import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BotnetCore from './components/BotnetCore';
import WhoamiGpt from './components/WhoamiGpt';
import Terminal from './components/Terminal';
import QuantumIntelligence from './components/QuantumIntelligence';
import SystemCoreTools from './components/SystemCoreTools';
import MediaCreators from './components/MediaCreators';
import SqlInject from './components/SqlInject';
import Network from './components/Network';
import ZxCDDoS from './components/ZxCDDoS';
import Settings from './components/Settings';
import Extractor from './components/Extractor';
import OsintDashboard from './components/OsintDashboard';
import InvestigationCore from './components/InvestigationCore';
import ExternalToolRenderer from './components/tools/ExternalTools';
import SandboxVirtual from './components/SandboxVirtual';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { Subscription } from './components/Subscription';
import { DynamicToolRenderer } from './components/DynamicToolRenderer';
import { ToolIndex } from './components/ToolIndex';
import SocialTakeover from './components/SocialTakeover';
import DroneTakeover from './components/DroneTakeover';
import MediaCommsTakeover from './components/MediaCommsTakeover';
import { AppTab, LogEntry, NetworkConfig, DynamicTool } from './types';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc, addDoc, collection, query, orderBy, limit, onSnapshot, Timestamp, User, signOut, testConnection, handleFirestoreError, OperationType } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import SeizedNotice from './components/SeizedNotice';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isSeized, setIsSeized] = useState(false);
  const [selectedDynamicTool, setSelectedDynamicTool] = useState<DynamicTool | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isUp] = useState(true);
  const [target, setTarget] = useState('NONE');
  const [showTerminal, setShowTerminal] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [loginMode, setLoginMode] = useState<'USER' | 'ADMIN'>('USER');
  const [netConfig, setNetConfig] = useState<NetworkConfig>({
    target: 'NONE',
    method: 'GET',
    threads: 10,
    duration: 60,
    powerLevel: 'Standard',
    payloadSize: 1024,
    headerJitter: true,
    proxyScrape: false,
    rateLimit: 50,
  });

  const updateIsAttacking = useCallback(async (attacking: boolean) => {
    setIsAttacking(attacking);
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const configPath = `users/${firebaseUser.uid}/config/network`;
    try {
      await setDoc(doc(db, configPath), { isAttacking: attacking }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, configPath);
    }
  }, []);

  const updateTarget = useCallback(async (newTarget: string) => {
    setTarget(newTarget);
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const configPath = `users/${firebaseUser.uid}/config/network`;
    try {
      await setDoc(doc(db, configPath), { target: newTarget }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, configPath);
    }
  }, []);

  const updateNetConfig = useCallback(async (config: NetworkConfig) => {
    setNetConfig(config);
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const netConfigPath = `users/${firebaseUser.uid}/config/network`;
    try {
      await setDoc(doc(db, netConfigPath), config, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, netConfigPath);
    }
  }, []);

  const addLog = useCallback(async (message: string, level: LogEntry['level'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    };
    
    setLogs(prev => [newLog, ...prev].slice(0, 100));

    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const logsPath = `users/${firebaseUser.uid}/logs`;
    try {
      await addDoc(collection(db, logsPath), {
        message,
        level,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, logsPath);
    }
  }, []);

  useEffect(() => {
    testConnection();
    let unsubscribeLogs: () => void = () => {};
    let unsubscribeNetConfig: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      setAuthError(null);
      if (!firebaseUser) {
        setUser(null);
        setIsAuthReady(true);
        return;
      }

      setUser(firebaseUser);
      // Sync Profile
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const profile = userDoc.data();
        setIsAdminLoggedIn(profile.role === 'admin');
        setIsUserAuthorized(profile.subscriptionStatus === 'active');
      } else {
        const newProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || 'Anonymous System User',
          role: 'user',
          subscriptionStatus: 'inactive',
          createdAt: Timestamp.now()
        };
        await setDoc(userDocRef, newProfile);
        setIsAdminLoggedIn(false);
        setIsUserAuthorized(false);
      }

      // Sync Logs
      const logsPath = `users/${firebaseUser.uid}/logs`;
      const qLogs = query(collection(db, logsPath), orderBy('timestamp', 'desc'), limit(100));
      unsubscribeLogs = onSnapshot(qLogs, (snapshot) => {
        const fetchedLogs = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate()?.toLocaleTimeString() || new Date().toLocaleTimeString(),
          level: doc.data().level,
          message: doc.data().message
        })).reverse();
        setLogs(fetchedLogs as any);
      }, (error: Error) => {
        handleFirestoreError(error, OperationType.LIST, logsPath);
      });

      // Sync NetConfig
      const netConfigPath = `users/${firebaseUser.uid}/config/network`;
      unsubscribeNetConfig = onSnapshot(doc(db, netConfigPath), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.target !== undefined) setTarget(data.target);
          if (data.isAttacking !== undefined) setIsAttacking(data.isAttacking);
          setNetConfig(data as NetworkConfig);
        }
      }, (error: Error) => {
        handleFirestoreError(error, OperationType.GET, netConfigPath);
      });

      setIsAuthReady(true);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeLogs();
      unsubscribeNetConfig();
    };
  }, []);

  useEffect(() => {
    if (isAuthReady) {
      addLog('System initialized. Neural mesh online.', 'success');
      addLog('C2 Master Session established. Version 8.6.0-PRO.', 'info');
    }
  }, [addLog, isAuthReady]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard addLog={addLog} target={target} setTarget={updateTarget} setIsSeized={setIsSeized} />;
      case AppTab.BOTNET_CORE:
        return <BotnetCore addLog={addLog} isAttacking={isAttacking} setIsAttacking={updateIsAttacking} />;
      case AppTab.WHOAMISEC_GPT:
        return <WhoamiGpt addLog={addLog} openTerminal={() => setShowTerminal(true)} onMaximize={() => setIsMaximized(true)} setIsSeized={setIsSeized} />;
      case AppTab.QUANTUM_INTELLIGENCE:
        return <QuantumIntelligence setActiveTab={setActiveTab} target={target} setTarget={updateTarget} />;
      case AppTab.SYSTEM_CORE_TOOLS:
        return <SystemCoreTools addLog={addLog} target={target} />;
      case AppTab.MEDIA_CREATOR:
        return <MediaCreators addLog={addLog} />;
      case AppTab.SQL_INJECT:
        return <SqlInject addLog={addLog} target={target} />;
      case AppTab.SETTINGS:
        return <Settings netConfig={netConfig} setNetConfig={updateNetConfig} addLog={addLog} />;
      case AppTab.OSINT_DASHBOARD:
        return <OsintDashboard addLog={addLog} target={target} setTarget={updateTarget} />;
      case AppTab.INVESTIGATION_CORE:
        return <InvestigationCore />;
      case AppTab.EXTRACTOR:
        return <Extractor addLog={addLog} target={target} setTarget={updateTarget} />;
      case AppTab.NETWORK:
        return <Network addLog={addLog} target={target} />;
      case AppTab.ZXCDDOS:
        return <ZxCDDoS addLog={addLog} target={target} />;
      case AppTab.ADMIN_PANEL:
        return isAdminLoggedIn ? <AdminPanel addLog={addLog} /> : (
          <div className="h-full flex items-center justify-center text-red-500 uppercase font-black tracking-widest italic">
            Access Denied: Admin Privileges Required
          </div>
        );
      case AppTab.SANDBOX_VIRTUAL:
        return <SandboxVirtual addLog={addLog} />;
      case AppTab.SOCIAL_TAKEOVER:
        return <SocialTakeover target={target} addLog={addLog} />;
      case AppTab.DRONE_TAKEOVER:
        return <DroneTakeover addLog={addLog} />;
      case AppTab.MEDIA_COMMS_TAKEOVER:
        return <MediaCommsTakeover addLog={addLog} />;
      case AppTab.TOOL_INDEX:
        return <ToolIndex setSelectedDynamicTool={setSelectedDynamicTool} setActiveTab={setActiveTab} addLog={addLog} />;
      case AppTab.DYNAMIC_TOOL:
        return selectedDynamicTool ? <DynamicToolRenderer tool={selectedDynamicTool} addLog={addLog} /> : null;
      case AppTab.GPT_CHAT:
      case AppTab.IDE_TOOL:
      case AppTab.SOLANA_TOOL:
      case AppTab.DEPLOYER_TOOL:
      case AppTab.SCANNER_TOOL:
      case AppTab.S3_TOOL:
      case AppTab.BLACKHAT_TOOL:
      case AppTab.LAZARUS_TOOL:
      case AppTab.BURPSUITE_TOOL:
      case AppTab.OWASP_TOOL:
      case AppTab.XGPT_WORM:
      case AppTab.HEXSTRIKE:
      case AppTab.WORM_AI:
      case AppTab.KESTRA:
      case AppTab.MHDD_DOS:
      case AppTab.SQLFORCE:
      case AppTab.IDS_INF:
      case AppTab.AGL_STRESS:
      case AppTab.YUI_PANEL:
      case AppTab.PENTAGI:
        return <ExternalToolRenderer activeTab={activeTab} />;
      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-500 uppercase font-black tracking-widest italic">
            Module [ {activeTab} ] Access Restricted
          </div>
        );
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdminLoggedIn(false);
    setIsUserAuthorized(false);
    addLog('SESSION: TERMINATED', 'warning');
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Neural Mesh...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="h-screen bg-black flex items-center justify-center p-4 font-mono">
        <div className="bg-[#050505] border-2 border-[#dc2626] rounded-xl p-8 max-w-lg text-center shadow-[0_0_50px_rgba(220,38,38,0.3)]">
          <i className="fas fa-exclamation-triangle text-4xl text-[#dc2626] mb-4"></i>
          <h1 className="text-xl font-black text-white uppercase tracking-widest mb-4">Authentication Error</h1>
          <p className="text-gray-400 text-sm mb-6">{authError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#dc2626] text-black font-black uppercase tracking-widest rounded hover:bg-[#ff0000] transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen bg-[#020202] text-white font-mono selection:bg-emerald-500/30 selection:text-emerald-400 overflow-hidden">
        {isSeized && <SeizedNotice target={target} onClose={() => setIsSeized(false)} />}
        {(!isAdminLoggedIn && !isUserAuthorized) && (
          <>
            {loginMode === 'USER' ? (
              <Subscription 
                onActivate={() => setIsUserAuthorized(true)} 
                addLog={addLog} 
                onSwitchToAdmin={() => setLoginMode('ADMIN')}
                user={user}
              />
            ) : (
              <AdminLogin 
                onLogin={() => setIsAdminLoggedIn(true)} 
                onSwitchToUser={() => setLoginMode('USER')}
                user={user}
              />
            )}
          </>
        )}
        
        {(isAdminLoggedIn || isUserAuthorized) && (
        <>
          {!isMaximized && (
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              setSelectedDynamicTool={setSelectedDynamicTool}
              target={target}
              isUp={isUp}
              isAttacking={isAttacking}
              isAdmin={isAdminLoggedIn}
            />
          )}
          
          <main className={`${isMaximized ? 'ml-0' : 'ml-16 md:ml-56'} h-screen flex flex-col relative transition-all duration-300`}>
        {/* Top Header */}
        {!isMaximized && activeTab !== AppTab.WHOAMISEC_GPT && (
          <header className="flex-none flex items-center justify-between mb-2 border-b border-[#1a1a1a] pb-2 px-4 md:px-6 pt-2 bg-black/40 backdrop-blur-md z-40">
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-widest text-white uppercase italic">Quantum Orchestrator v3.1</h1>
              <p className="text-[8px] text-emerald-500 tracking-[0.3em] uppercase">WormGPT Omega Neural Mesh</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMaximized(true)}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors"
                title="Full Screen Mode"
              >
                <i className="fas fa-expand-arrows-alt mr-1"></i> [ FULL_VIEW ]
              </button>
              <button 
                onClick={() => setIsSeized(true)}
                className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-white hover:bg-red-600 px-2 py-1 border border-red-600/30 transition-all"
                title="Execute Defacement"
              >
                <i className="fas fa-skull mr-1"></i> [ DEFACE_TARGET ]
              </button>
              <button 
                onClick={() => {
                  addLog(`RANSOM: Initializing global encryption on ${target}...`, 'warning');
                  setTimeout(() => setIsSeized(true), 1500);
                }}
                className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-black hover:bg-emerald-500 px-2 py-1 border border-emerald-500/30 transition-all"
                title="Execute Ransomware"
              >
                <i className="fas fa-lock mr-1"></i> [ RANSOM_TARGET ]
              </button>
              <button 
                onClick={() => setShowTerminal(!showTerminal)}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${showTerminal ? 'text-emerald-500' : 'text-gray-600 hover:text-white'}`}
              >
                [ TERMINAL_CONSOLE ]
              </button>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-gray-700 font-black uppercase">Core Status</span>
                <p className="text-emerald-500 text-[11px] animate-pulse">NEURAL_SYNC_ACTIVE</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 border border-[#dc2626]/30 bg-black flex items-center justify-center text-[#dc2626] rounded-lg hover:bg-[#dc2626]/10 transition-all"
                title="Logout Admin"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
              <div className="w-12 h-12 border border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-center text-emerald-500 rounded-lg">
                <i className="fas fa-skull-crossbones text-lg"></i>
              </div>
            </div>
          </header>
        )}

        {/* Floating Restore Button when Maximized */}
        {isMaximized && (
          <button 
            onClick={() => setIsMaximized(false)}
            className="fixed top-4 right-4 z-[100] bg-black/80 border border-emerald-500/30 text-emerald-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all shadow-2xl backdrop-blur-md"
          >
            <i className="fas fa-compress-arrows-alt mr-2"></i> Restore Interface
          </button>
        )}

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto custom-scroll flex flex-col min-h-0 ${activeTab === AppTab.WHOAMISEC_GPT || isMaximized ? 'p-0' : 'px-2 md:px-4 pb-4'}`}>
          <div className="h-full flex flex-col w-full">
            {renderContent()}
          </div>
        </div>

        {/* Floating Terminal - Small Popup */}
        {showTerminal && (
          <div className="fixed bottom-4 right-4 w-64 md:w-72 h-48 z-50 shadow-2xl border border-emerald-500/30 rounded-lg overflow-hidden animate-in slide-in-from-bottom-4 bg-black/90 backdrop-blur-md">
            <div className="flex items-center justify-between px-2 py-1 bg-[#1a1a1a] border-b border-white/5">
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Neural_Console</span>
              <button onClick={() => setShowTerminal(false)} className="text-gray-500 hover:text-white transition-colors">
                <i className="fas fa-times text-[8px]"></i>
              </button>
            </div>
            <div className="h-[calc(100%-20px)]">
              <Terminal logs={logs} onClose={() => setShowTerminal(false)} />
            </div>
          </div>
        )}
      </main>
      </>
      )}
      </div>
    </ErrorBoundary>
  );
}
