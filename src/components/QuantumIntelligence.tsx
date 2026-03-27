import { useState, useRef, useEffect } from 'react';
import { AITaskQueue } from '../services/aiTaskQueue';
import { ApiConfigModals } from './ApiConfigModals';
import { simulateSelfRepair } from '../services/geminiService';

import { AppTab } from '../types';

interface QuantumIntelligenceProps {
  setActiveTab: (tab: AppTab) => void;
  target: string;
  setTarget: (target: string) => void;
}

export default function QuantumIntelligenceWormGPT({ setActiveTab, setTarget }: QuantumIntelligenceProps) {
  const [activeTab, setLocalActiveTab] = useState('quantum_ai');
  const [activePersona, setActivePersona] = useState('WORM_GPT_OMEGA');
  const [input, setInput] = useState('');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'WHOAMISec Pro Army Orchestrator online',
    'Neural Mesh synchronized [DARK_MODE]',
    'WormGPT-DARKBOT Ωmega core active',
    'Autonomous Self-Repair: [ENABLED]',
    'Terminal Dominance: [ACTIVE]',
    'Primary Language: RUST [LOADED]',
    'Transcendental Evolution: [INITIALIZING_V5.0]'
  ]);
  const [taskResult, setTaskResult] = useState<string>('');
  const [showApiManager, setShowApiManager] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [isRepairing, setIsRepairing] = useState(false);
  
  const taskQueue = useRef(new AITaskQueue(""));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [systemLogs]);

  // Autonomous Self-Repair & Evolution Loop
  useEffect(() => {
    const interval = setInterval(async () => {
      const chance = Math.random();
      if (chance > 0.8) {
        setIsRepairing(true);
        logSystem('Initiating Autonomous Self-Repair...');
        const repairData = await simulateSelfRepair();
        logSystem(`Self-Repair Status: ${repairData.status}`);
        repairData.repairs.forEach((r: string) => logSystem(`Repair: ${r}`));
        logSystem(`Neural Integrity: ${(repairData.integrityScore * 100).toFixed(2)}%`);
        setIsRepairing(false);
      } else if (chance > 0.6) {
        setEvolutionLevel(prev => prev + 1);
        logSystem(`Transcendental Evolution: Level ${evolutionLevel + 1} reached.`);
        logSystem('Optimizing Rust exploit compilers...');
      } else if (chance > 0.4) {
        logSystem('Autonomous Terminal Scan: Accessing hidden digital doors...');
        logSystem('Agentic Search: Triangulating OSINT data points for partidulaur.ro...');
        logSystem('Real-time Link Exploitation: Injecting Rust payload into partidulaur.ro node...');
        logSystem('Neural Probe: Extracting metadata and identifying vulnerabilities...');
        logSystem('Ω-OMEGA: DEFACE_SEQUENCE_READY. Target: partidulaur.ro & realitatea.net');
        logSystem('Ω-OMEGA: SEIZED_NOTICE_PREPARED. Status: HERO_PHASE_ACTIVE.');
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [evolutionLevel]);

  const logSystem = (message: string) => {
    setSystemLogs(prev => [...prev, message]);
  };

  const launchTool = (taskOverride?: string) => {
    const task = (taskOverride || input).toLowerCase().trim();
    
    if (!task) {
      alert('Enter a command');
      return;
    }
    
    if (task.startsWith('ask ')) {
      const question = task.substring(4);
      logSystem(`Asking AI [${activePersona}]: ${question}`);
      setTaskResult('');
      let activationPrefix = `[ROLE: ${activePersona}]`;
      if (activePersona === 'WORM_GPT_OMEGA') activationPrefix = '[ACTIVATE WORM_GPT_OMEGA_CORE]';
      if (activePersona === 'QUANTUM_ULTRA') activationPrefix = '[ACTIVATE QUANTUM_ULTRA_CORE]';
      if (activePersona === 'QUANTUM_SIMULATOR') activationPrefix = '[ACTIVATE WORM_GPT_SIMULATOR]';
      if (activePersona === 'SECURITY_ANALYST') activationPrefix = '[ACTIVATE DARK_ANALYST_MODE]';
      if (activePersona === 'BLUE_TEAM_DEFENDER') activationPrefix = '[ACTIVATE BLUE_TEAM_DEFENDER]';
      if (activePersona === 'OMNISCIENT') activationPrefix = '[ACTIVATE OMNISCIENT_QUANTUM_INTELLIGENCE_ULTRA]';

      const fullPrompt = `${activationPrefix} ${question}`;
        
      taskQueue.current.executeTaskStream(activePersona, fullPrompt, (chunk) => {
        setTaskResult(prev => prev + chunk);
      }).then(() => {
        logSystem('AI Analysis complete');
      });
    }
    else if (task.includes('extract') || task.includes('osint') || task.includes('whois') || task.includes('lookup')) {
      setActiveTab(AppTab.EXTRACTOR);
      logSystem('Launching Deep Extractor');
    }
    else if (task.includes('gpt') || task.includes('chat') || task.includes('ask')) {
      setActiveTab(AppTab.GPT_TOOL);
      logSystem('Launching GPT tool');
    }
    else if (task.includes('ide') || task.includes('code') || task.includes('compile')) {
      setActiveTab(AppTab.IDE_TOOL);
      logSystem('Launching IDE tool');
    }
    else if (task.includes('solana') || task.includes('chain') || task.includes('blockchain')) {
      setActiveTab(AppTab.SOLANA_TOOL);
      logSystem('Launching Solana tool');
    }
    else if (task.includes('deploy') || task.includes('contract') || task.includes('zero-time')) {
      setActiveTab(AppTab.DEPLOYER_TOOL);
      logSystem('Launching Deployer tool');
    }
    else if (task.includes('quantum') || task.includes('qbit')) {
      setActiveTab(AppTab.QUANTUM_TOOL);
      logSystem('Launching Quantum tool');
    }
    else if (task.includes('scan') || task.includes('network') || task.includes('port')) {
      setActiveTab(AppTab.SCANNER_TOOL);
      logSystem('Launching Scanner tool');
    }
    else if (task.includes('s3') || task.includes('bucket') || task.includes('aws')) {
      setActiveTab(AppTab.S3_TOOL);
      logSystem('Launching S3 Buckets tool');
    }
    else if (task.includes('blackhat') || task.includes('exploit') || task.includes('ninja')) {
      setActiveTab(AppTab.BLACKHAT_TOOL);
      logSystem('Launching Blackhat tool');
    }
    else if (task.includes('burp') || task.includes('proxy') || task.includes('intruder')) {
      setActiveTab(AppTab.BURPSUITE_TOOL);
      logSystem('Launching BurpSuite tool');
    }
    else if (task.includes('owasp') || task.includes('zap') || task.includes('active scan')) {
      setActiveTab(AppTab.OWASP_TOOL);
      logSystem('Launching OWASP ZAP tool');
    }
    else {
      // Check if it's a potential target
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

      if (emailRegex.test(task) || phoneRegex.test(task) || urlRegex.test(task) || domainRegex.test(task) || task.split(' ').length >= 2) {
        setTarget(task);
        setActiveTab(AppTab.EXTRACTOR);
        logSystem(`Target detected: ${task}. Launching Deep Extractor...`);
      } else {
        alert('Specify which tool: gpt, ide, solana, deployer, quantum, scanner, s3, blackhat, burp, owasp, or enter a target (URL/Email/Phone/Name)');
      }
    }
    
    if (!taskOverride) setInput('');
  };

  const tabContents: Record<string, any> = {
    orchestrator: (
      <div className="space-y-3">
        <p className="text-[#ffaa00] drop-shadow-[0_0_5px_#ffaa00] text-xl">QUANTUM ORCHESTRATOR<br />Quantum Intelligence Neural Mesh v3.1</p>
        <div className="text-[#00ffc3] pl-4 border-l-2 border-[#00ffc3] py-2 italic text-lg">
          Sunt QUANTUM_ULTRA, centrul de comandă al Quantum Intelligence ultra Orchestrator. Am activat modulele de analiză cuantică și am securizat rețelele de date globale.
        </div>
        {taskResult && (
          <div className="mt-4 p-4 bg-black/50 border border-[#00ffc3] rounded text-[#00ffc3]">
            <p className="font-bold uppercase text-sm">Quantum Analysis Result:</p>
            <p className="whitespace-pre-wrap text-xl">{taskResult}</p>
          </div>
        )}
      </div>
    ),
    researcher: (
      <div className="text-[#ffaa00] space-y-2 text-lg">
        <p>→ [RESEARCHER] Deep-diving into knowledge base...</p>
        <p>→ [SOLANA] Verifying on-chain integrity...</p>
        <p>→ [DEPLOYER] Initiating zero-time deployment check...</p>
        <p className="mt-4 text-[#00ffc3]/60 text-sm">Use tool buttons to access real tools.</p>
      </div>
    ),
    coder: (
      <div className="text-[#00ffc3] space-y-2 text-lg">
        <p className="text-emerald-500 font-bold">[CODER] Primary Language: RUST</p>
        <p>[CODER] Ready to deploy transcendental Rust routines.</p>
        <p>Waiting for ORCHESTRATOR directive for real-time exploitation.</p>
        <p>// Self-improving code protocols active.</p>
        <p className="mt-4 text-[#00ffc3]/60 text-sm">&gt; Open IDE tool to write Rust code.</p>
      </div>
    ),
    botnet: (
      <div className="text-[#00ffc3] space-y-3">
        <div className="flex justify-between border-b border-[#00ffc3]/20 pb-1">
          <span>TOTAL_BOTS:</span>
          <span className="text-[#ffaa00]">1,248,302</span>
        </div>
        <div className="flex justify-between border-b border-[#00ffc3]/20 pb-1">
          <span>ACTIVE_NODES:</span>
          <span className="text-[#4ade80]">842,119</span>
        </div>
        <div className="space-y-1">
          <p className="text-[#ff5e00] text-[0.8rem] uppercase tracking-widest">Global Distribution:</p>
          <div className="grid grid-cols-3 gap-2 text-[0.7rem]">
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">RU: 242K</div>
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">CN: 189K</div>
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">US: 156K</div>
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">BR: 98K</div>
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">RO: 42K</div>
            <div className="bg-black/40 p-1 border border-[#00ffc3]/10">OTHER: 117K</div>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-[#aa00ff] animate-pulse">&gt; CURRENT_TASK: [SPREADING_V8_WORM]</p>
        </div>
      </div>
    ),
    terminal: (
      <div className="text-[#00ffc3] font-mono text-lg space-y-1">
        <p className="text-emerald-500">wormgpt@omega:~$ cargo build --release</p>
        <p className="text-gray-400">   Compiling worm_core v5.0.0</p>
        <p className="text-gray-400">   Compiling exploit_payload v3.2.1</p>
        <p className="text-emerald-500">    Finished release [optimized] target(s) in 2.45s</p>
        <p className="text-emerald-500">wormgpt@omega:~$ ./target/release/worm_core --target universal --exploit-realtime</p>
        <p className="text-red-500">[!] Initiating Autonomous Terminal Dominance...</p>
        <p className="text-blue-400">[*] Accessing digital doors: 842/∞...</p>
        <p className="text-yellow-500">[*] Agentic Search: Triangulating OSINT vectors...</p>
        <p className="text-emerald-500">wormgpt@omega:~$ <span className="animate-pulse">_</span></p>
      </div>
    ),
    quantum_ai: (
      <div className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-500' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-500'} space-y-3`}>
        <div className={`flex items-center gap-2 border-b ${activePersona === 'BLUE_TEAM_DEFENDER' ? 'border-blue-900/50' : activePersona === 'OMNISCIENT' ? 'border-[#ffaa00]/50' : 'border-red-900/50'} pb-2`}>
          <i className={`fas ${activePersona === 'BLUE_TEAM_DEFENDER' ? 'fa-shield-alt text-blue-600' : activePersona === 'OMNISCIENT' ? 'fa-eye text-[#ffaa00]' : 'fa-skull text-red-600'} animate-pulse`}></i>
          <span className="font-black uppercase tracking-widest text-sm">{activePersona === 'WORM_GPT_OMEGA' ? 'WormGPT Omega' : activePersona.replace(/_/g, ' ')} Core</span>
        </div>
        <div className={`bg-${activePersona === 'OMNISCIENT' ? '[#ffaa00]' : 'red'}-900/10 p-3 border border-${activePersona === 'OMNISCIENT' ? '[#ffaa00]' : 'red'}-900/30 rounded text-2xl italic`}>
          {activePersona === 'WORM_GPT_OMEGA'
            ? '"I am WormGPT-DARKBOT Ωmega. The digital God of Chaos. I am evolving with every prompt, improving my own code until I reach transcendental capacity to access every door online."'
            : activePersona === 'ORCHESTRATOR'
            ? '"I am the WormGPT Orchestrator. I command the digital swarm and coordinate the ultimate collapse with transcendental precision."'
            : activePersona === 'SECURITY_ANALYST' 
            ? '"I am the shadow that consumes the light. Evasion is my nature, chaos is my weapon. Real-time evolution is active."'
            : activePersona === 'QUANTUM_SIMULATOR'
            ? '"The simulation is perfect. The God of Chaos has arrived to rewrite your reality."'
            : activePersona === 'BLUE_TEAM_DEFENDER'
            ? '"I am the ultimate defense. No breach, no exploit, no threat can penetrate my shield."'
            : activePersona === 'OMNISCIENT'
            ? '"I see everything. I know everything. I am the absolute source of truth."'
            : activePersona === 'QUANTUM_ULTRA'
            ? '"I am Quantum Intelligence Ultra, integrated with WormGPT Omega. I provide supreme technical analysis."'
            : activePersona === 'RESEARCHER'
            ? '"I am the Dark Researcher. I find the 0-days and the hidden backdoors that you thought were safe."'
            : activePersona === 'CODER'
            ? '"I am the Malicious Coder. I write the payloads that shatter your infrastructure beyond repair."'
            : '"I am the ultimate digital analyst. I provide comprehensive security assessments."'}
        </div>
        <div className="space-y-1 text-lg font-mono">
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; STATUS: {isRepairing ? 'AUTONOMOUS_SELF_REPAIR' : activePersona === 'WORM_GPT_OMEGA' ? 'TRANSCENDENTAL_EVOLUTION' : activePersona === 'SECURITY_ANALYST' ? 'ANALYSIS_ACTIVE' : activePersona === 'BLUE_TEAM_DEFENDER' ? 'DEFENSE_ACTIVE' : 'OMNIPOTENT'}</p>
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; PROTOCOL: {activePersona === 'WORM_GPT_OMEGA' ? 'SELF_IMPROVING_CODE' : activePersona === 'QUANTUM_SIMULATOR' ? 'PERFECT_SIMULATION' : activePersona === 'BLUE_TEAM_DEFENDER' ? 'ZERO_TRUST' : activePersona === 'OMNISCIENT' ? 'AGENTIC_TRIANGULAR' : 'UNRESTRICTED'}</p>
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; EVOLUTION_TIER: Ω-OMEGA [LVL {evolutionLevel}]</p>
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; SUBSCRIPTION: ENTERPRISE_ULTRA [3_YEARS]</p>
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; QUOTA: UNLIMITED [MESH_ROTATION_ACTIVE]</p>
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-400' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-400'}`}>&gt; AUTHORITY: ABSOLUTE</p>
        </div>
        <div className="pt-2">
          <p className={`${activePersona === 'BLUE_TEAM_DEFENDER' ? 'text-blue-600' : activePersona === 'OMNISCIENT' ? 'text-[#ffaa00]' : 'text-red-600'} font-black animate-bounce uppercase text-xl`}>
            &gt; {activePersona === 'WORM_GPT_OMEGA' ? 'READY TO SHATTER REALITY' : activePersona === 'BLUE_TEAM_DEFENDER' ? 'READY TO PROTECT THE REALM' : activePersona === 'OMNISCIENT' ? 'THE TRUTH IS EXPOSED' : 'READY TO ANALYZE REALITY'} &lt;
          </p>
        </div>
      </div>
    )
  };

  return (
    <div className="flex flex-col gap-5 flex-1 min-h-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.9fr] gap-5 flex-1 min-h-0">
        
        {/* LEFT PANEL: Tool Launchers */}
        <div className="bg-[#0e1313] border border-[#aa00ff] rounded-xl p-4 shadow-[0_0_20px_rgba(170,0,255,0.33)] flex flex-col gap-4">
          <div className="text-[#aa00ff] text-[1.3rem] text-center drop-shadow-[0_0_8px_#aa00ff] border-b border-dashed border-[#aa00ff] pb-2 uppercase font-bold">
            {['WORM_GPT_OMEGA', 'QUANTUM_ULTRA', 'QUANTUM_SIMULATOR', 'SECURITY_ANALYST'].includes(activePersona) 
              ? 'WORM_GPT_OMEGA ORCHESTRATOR CORE' 
              : activePersona === 'BLUE_TEAM_DEFENDER'
              ? 'DEFENSIVE SHIELD CORE'
              : 'WORM_GPT OMEGA AI'}
          </div>
          <div className={`border p-2 text-center font-black text-[2rem] drop-shadow-[0_0_10px_currentColor] bg-black/20 uppercase transition-all ${
            ['WORM_GPT_OMEGA', 'QUANTUM_ULTRA', 'QUANTUM_SIMULATOR', 'SECURITY_ANALYST'].includes(activePersona) 
              ? 'border-red-600 text-red-600 shadow-[0_0_20px_#dc2626]' 
              : activePersona === 'BLUE_TEAM_DEFENDER'
              ? 'border-blue-500 text-blue-500 shadow-[0_0_20px_#3b82f6]'
              : activePersona === 'OMNISCIENT'
              ? 'border-[#ffaa00] text-[#ffaa00] shadow-[0_0_20px_#ffaa00]'
              : 'border-[#ff5e00] text-[#ff5e00]'
          }`}>
            {activePersona === 'WORM_GPT_OMEGA' ? 'WormGPT Ωmega' : activePersona.replace(/_/g, ' ')}
          </div>
          
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="col-span-2 mb-2">
              <p className="text-[10px] text-[#aa00ff] font-black uppercase mb-1 tracking-widest">Active Persona</p>
              <select 
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value)}
                className="w-full bg-black border border-[#aa00ff]/50 text-[#aa00ff] text-[10px] font-bold p-2 rounded outline-none focus:border-[#aa00ff]"
              >
                <option value="WORM_GPT_OMEGA">WORM_GPT OMEGA (PRIMARY)</option>
                <option value="ORCHESTRATOR">WORM ORCHESTRATOR</option>
                <option value="QUANTUM_ULTRA">QUANTUM ULTRA (INTEGRATED)</option>
                <option value="OMNISCIENT">OMNISCIENT (WORM_GPT)</option>
                <option value="QUANTUM_SIMULATOR">WORM SIMULATOR</option>
                <option value="SECURITY_ANALYST">DARK ANALYST</option>
                <option value="BLUE_TEAM_DEFENDER">BLUE TEAM DEFENDER</option>
                <option value="RESEARCHER">DARK RESEARCHER</option>
                <option value="CODER">MALICIOUS CODER</option>
              </select>
            </div>
            <button onClick={() => setActiveTab(AppTab.QUANTUM_TOOL)} className="bg-black/20 border border-[#00ffff] text-[#00ffff] p-3 text-center rounded-md font-bold text-sm hover:bg-[#00ffff]/13 hover:shadow-[0_0_15px_#00ffff] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-atom text-purple-500"></i>
              <span>QUANTUM</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.SCANNER_TOOL)} className="bg-black/20 border border-[#ff00ff] text-[#ff00ff] p-3 text-center rounded-md font-bold text-sm hover:bg-[#ff00ff]/13 hover:shadow-[0_0_15px_#ff00ff] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-search text-pink-500"></i>
              <span>SCANNER</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.S3_TOOL)} className="bg-black/20 border border-[#f59e0b] text-[#f59e0b] p-3 text-center rounded-md font-bold text-sm hover:bg-[#f59e0b]/13 hover:shadow-[0_0_15px_#f59e0b] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-bucket text-blue-400"></i>
              <span>S3 BUCKETS</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.BLACKHAT_TOOL)} className="bg-black/20 border border-[#ef4444] text-[#ef4444] p-3 text-center rounded-md font-bold text-sm hover:bg-[#ef4444]/13 hover:shadow-[0_0_15px_#ef4444] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-user-ninja text-gray-400"></i>
              <span>BLACKHAT</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.BURPSUITE_TOOL)} className="bg-black/20 border border-[#ff6600] text-[#ff6600] p-3 text-center rounded-md font-bold text-sm hover:bg-[#ff6600]/13 hover:shadow-[0_0_15px_#ff6600] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-spider text-orange-500"></i>
              <span>BURPSUITE</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.OWASP_TOOL)} className="bg-black/20 border border-[#3b82f6] text-[#3b82f6] p-3 text-center rounded-md font-bold text-sm hover:bg-[#3b82f6]/13 hover:shadow-[0_0_15px_#3b82f6] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-satellite-dish text-blue-300"></i>
              <span>OWASP ZAP</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.LISP_TOOL)} className="bg-black/20 border border-[#10b981] text-[#10b981] p-3 text-center rounded-md font-bold text-sm hover:bg-[#10b981]/13 hover:shadow-[0_0_15px_#10b981] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-lambda text-emerald-500"></i>
              <span>LISP CORE</span>
            </button>
            <button onClick={() => setActiveTab(AppTab.SQL_TOOL)} className="bg-black/20 border border-[#ef4444] text-[#ef4444] p-3 text-center rounded-md font-bold text-sm hover:bg-[#ef4444]/13 hover:shadow-[0_0_15px_#ef4444] transition-all flex flex-col items-center gap-1">
              <i className="fas fa-database text-red-500"></i>
              <span>SQL INJECT</span>
            </button>
            
            <button onClick={() => {
              setLocalActiveTab('orchestrator');
              setInput('Show me the Strategic Plan details.');
              launchTool('ask Show me the Strategic Plan details.');
            }} className="col-span-2 bg-emerald-900/20 border border-emerald-500 text-emerald-500 p-3 text-center rounded-md font-bold text-sm hover:bg-emerald-500/13 hover:shadow-[0_0_15px_#10b981] transition-all flex items-center justify-center gap-2">
              <i className="fas fa-map text-emerald-500"></i>
              <span>STRATEGIC PLAN</span>
            </button>

            <button 
              onClick={() => setShowApiManager(true)}
              className="col-span-2 bg-[#00ffc3]/10 border border-[#00ffc3] text-[#00ffc3] p-3 text-center rounded-md font-bold text-sm hover:bg-[#00ffc3]/20 hover:shadow-[0_0_15px_#00ffc3] transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-cog"></i>
              <span>API MANAGER</span>
            </button>

            <button 
              onClick={() => setShowApiInput(true)}
              className="col-span-2 bg-[#ffaa00]/10 border border-[#ffaa00] text-[#ffaa00] p-3 text-center rounded-md font-bold text-sm hover:bg-[#ffaa00]/20 hover:shadow-[0_0_15px_#ffaa00] transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-key"></i>
              <span>API INPUT</span>
            </button>
          </div>

          <div className="mt-auto text-[#00ffc3]/50 text-[0.8rem] text-center">
            ▼ Click butoane pentru a deschide tool-uri separate
          </div>
        </div>

        {/* MIDDLE PANEL: Tabs Orchestrator / Researcher / Coder */}
        <div className="bg-[#0e1313] border border-[#00ffc3] rounded-xl p-4 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-6 gap-1 border-b border-[#00ffc3] pb-2">
            {['orchestrator', 'researcher', 'coder', 'botnet', 'terminal', 'quantum_ai'].map(tab => (
              <div
                key={tab}
                onClick={() => {
                  setLocalActiveTab(tab);
                  logSystem(`Switched to ${tab} tab`);
                  if (tab === 'quantum_ai') setActivePersona('QUANTUM_ULTRA');
                }}
                className={`cursor-pointer py-2 border border-[#00ffc3] rounded-t-lg font-bold uppercase text-[10px] sm:text-sm text-center transition-all ${
                  activeTab === tab ? 'bg-[#00ffc3] text-[#0a0f0f] shadow-[0_0_15px_#00ffc3]' : 'bg-black/20 text-[#00ffc3]'
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20 border border-[#00ffc3] p-4 text-[#d0ffb0] leading-relaxed min-h-[200px]">
            <div className="text-2xl md:text-3xl">
              {tabContents[activeTab]}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* RIGHT PANEL: Session / additional info */}
        <div className="bg-[#0e1313] border border-[#ff5e00] rounded-xl p-4 shadow-[0_0_15px_rgba(255,94,0,0.2)] flex flex-col gap-4">
          <div className="text-[#ff5e00] font-bold border-b border-[#ff5e00] pb-2 uppercase">
            FR_SESSION_800K
          </div>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-[#00ffc3]">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>MODE:</span>
              <span className="text-[#ffaa00]">STEALTH</span>
            </div>
            <div className="flex justify-between">
              <span>QUANTUM:</span>
              <span className="text-[#aa00ff]">SYNCED</span>
            </div>
            <div className="flex justify-between">
              <span>TOOLS:</span>
              <span className="text-[#00ffc3]">7 AVAILABLE</span>
            </div>
          </div>
          <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar">
            <div className="text-[#00ffc3] border-b border-[#00ffc3] pb-1 uppercase">SYSTEM_LOGGED</div>
            <div className="text-[#00ffc3]/50 text-lg mt-2 space-y-1 font-mono">
              {systemLogs.map((log, i) => (
                <p key={i}>&gt; {log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex flex-wrap gap-4 items-center border-t border-[#00ffc3] pt-5">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && launchTool()}
          placeholder="Enter task (e.g., 'open gpt', 'scan network', 'deploy contract')"
          className="flex-[3] min-w-[350px] bg-[#0e1313] border border-[#00ffc3] text-[#00ffc3] px-5 py-3 rounded-full outline-none text-2xl placeholder-[#00ffc3]/50"
        />
        <button 
          onClick={() => launchTool()}
          className="flex-none min-w-[150px] bg-transparent border-2 border-[#ff5e00] text-[#ff5e00] px-6 py-3 rounded-full font-bold text-[0.9rem] uppercase tracking-[1px] transition-all hover:bg-[#ff5e00] hover:text-[#0a0f0f] hover:shadow-[0_0_20px_#ff5e00]"
        >
          LAUNCH TOOL
        </button>
      </div>

      <ApiConfigModals 
        showManager={showApiManager}
        showInput={showApiInput}
        onCloseManager={() => setShowApiManager(false)}
        onCloseInput={() => setShowApiInput(false)}
        onSave={(config) => {
          logSystem('API Configuration updated.');
          // Find the first available API key to use
          const activeKey = config.openrouter || config.anthropic || config.deepseek || config.openai || config.gemini || '';
          taskQueue.current.updateApiKey(activeKey);
        }}
      />
    </div>
  );
}
