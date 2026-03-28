import React, { useState, useRef, useEffect } from 'react';
import { AITaskQueue } from '../../services/aiTaskQueue';

interface ToolPanelProps {
  title: string;
  icon: string;
  color: string;
  description: string;
  modules: { id: string; name: string; desc: string; status: 'READY' | 'ACTIVE' | 'OFFLINE' }[];
}

const ToolPanel: React.FC<ToolPanelProps> = ({ title, icon, color, description, modules }) => {
  const [activeModule, setActiveModule] = useState(modules[0]?.id);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'AUTONOMOUS' | 'MANUAL'>('AUTONOMOUS');
  
  // New states for dynamic AI execution
  const [target, setTarget] = useState('');
  const [threads, setThreads] = useState(10);
  const [customPrompt, setCustomPrompt] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [manualCommand, setManualCommand] = useState('');
  
  const taskQueue = useRef(new AITaskQueue(""));
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput, logs]);

  const handleExecute = async () => {
    if (isRunning) {
      setIsRunning(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Process terminated by user.`]);
      return;
    }
    
    setIsRunning(true);
    setLogs([`[${new Date().toLocaleTimeString()}] Initializing ${title} core...`]);
    setConsoleOutput('');
    
    const activeMod = modules.find(m => m.id === activeModule);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Loading module: ${activeMod?.name}...`]);
    
    let prompt = "";
    if (mode === 'AUTONOMOUS') {
      prompt = `You are the ${title} tool, specifically the ${activeMod?.name} module operating in AUTONOMOUS mode.
      Target: ${target || 'Unknown'}
      Threads: ${threads}
      Custom User Directive: ${customPrompt || 'Execute standard protocol.'}

      Generate a realistic, highly technical, line-by-line console output for this execution.
      Act as the tool itself. Do not use markdown formatting, just raw console text.
      Stream the output as if it's happening in real-time.`;
    } else {
      prompt = `You are the ${title} tool, specifically the ${activeMod?.name} module operating in MANUAL mode.
      The user has provided a manual command: "${manualCommand}"
      Target Context: ${target || 'Local Environment'}
      
      Execute this command as the tool. Provide technical console output reflecting the manual execution.
      Stream the output as if it's happening in real-time.`;
    }

    try {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Mode: ${mode}. Executing payload via AI Swarm...`]);
      
      await taskQueue.current.executeTaskStream(`Tool Execution: ${title}`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution completed successfully.`]);
    } catch (error: any) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: ${error.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden font-mono">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-white/10 bg-black/50`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 ${color} bg-white/5`}>
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <div>
            <h2 className={`text-lg font-black uppercase tracking-widest ${color}`}>{title}</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{description}</p>
          </div>
        </div>
        <div className="flex bg-black border border-white/10 rounded p-1">
          <button 
            onClick={() => setMode('AUTONOMOUS')}
            className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded transition-all ${mode === 'AUTONOMOUS' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Autonomous
          </button>
          <button 
            onClick={() => setMode('MANUAL')}
            className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded transition-all ${mode === 'MANUAL' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Manual
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Repo Structure (Left) */}
        <div className="w-full md:w-64 border-r border-white/10 bg-[#050505] flex flex-col">
          <div className="p-2 border-b border-white/10 bg-black">
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Repository Modules</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-1">
            {modules.map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full text-left p-2 rounded border transition-all ${
                  activeModule === mod.id 
                    ? `bg-white/10 border-white/20 ${color}` 
                    : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fas fa-file-code text-[8px]"></i>
                    {mod.name}
                  </span>
                  <span className={`text-[6px] px-1 py-0.5 rounded font-black ${
                    mod.status === 'READY' ? 'bg-emerald-500/20 text-emerald-500' :
                    mod.status === 'ACTIVE' ? 'bg-blue-500/20 text-blue-500 animate-pulse' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {mod.status}
                  </span>
                </div>
                <p className="text-[8px] opacity-70 truncate">{mod.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Control Panel (Right) */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a]">
          {/* Config Area */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {mode === 'AUTONOMOUS' ? 'Autonomous Config' : 'Manual Command Input'}
              </h3>
              <button 
                onClick={handleExecute}
                className={`px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                  isRunning 
                    ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white' 
                    : `bg-white/5 ${color} border border-current hover:bg-white/10`
                }`}
              >
                {isRunning ? 'HALT PROCESS' : mode === 'AUTONOMOUS' ? 'EXECUTE MODULE' : 'RUN COMMAND'}
              </button>
            </div>
            
            {mode === 'AUTONOMOUS' ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <label className="text-[8px] text-gray-500 uppercase tracking-widest">Target Vector</label>
                    <input 
                      type="text" 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="Enter target IP/URL/Hash..." 
                      className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-[10px] text-white outline-none focus:border-white/30" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-gray-500 uppercase tracking-widest">Thread Count</label>
                    <input 
                      type="number" 
                      value={threads}
                      onChange={(e) => setThreads(parseInt(e.target.value) || 10)}
                      className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-[10px] text-white outline-none focus:border-white/30" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[8px] text-[#00ffc3] uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-magic"></i> Dynamic AI Directive (Auto-Rewrite)
                  </label>
                  <input 
                    type="text" 
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="E.g., 'Rewrite this tool to scan for CVE-2024-XXXX and output in JSON format'" 
                    className="w-full bg-black/50 border border-[#00ffc3]/30 rounded px-2 py-1.5 text-[10px] text-[#00ffc3] outline-none focus:border-[#00ffc3]" 
                  />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-gray-500 uppercase tracking-widest">Manual Command</label>
                  <input 
                    type="text" 
                    value={manualCommand}
                    onChange={(e) => setManualCommand(e.target.value)}
                    placeholder="Enter manual command (e.g., --scan --target 192.168.1.1 --aggressive)" 
                    className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-[10px] text-white outline-none focus:border-white/30" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-gray-500 uppercase tracking-widest">Target Context (Optional)</label>
                  <input 
                    type="text" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter target IP/URL..." 
                    className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-[10px] text-white outline-none focus:border-white/30" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Console Output */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-2 border-b border-white/10 bg-black flex items-center justify-between">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Process Output</span>
              <button onClick={() => { setLogs([]); setConsoleOutput(''); }} className="text-[8px] text-gray-500 hover:text-white uppercase tracking-widest">Clear</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto custom-scroll bg-[#020202] text-[10px] space-y-1">
              {logs.length === 0 && !consoleOutput ? (
                <div className="text-gray-600 italic">Waiting for execution...</div>
              ) : (
                <>
                  {logs.map((log, i) => (
                    <div key={i} className="text-gray-400">
                      <span className={color}>➜</span> {log}
                    </div>
                  ))}
                  {consoleOutput && (
                    <div className="text-gray-300 whitespace-pre-wrap mt-2 font-mono">
                      {consoleOutput}
                    </div>
                  )}
                </>
              )}
              {isRunning && (
                <div className={`animate-pulse ${color} mt-2`}>_</div>
              )}
              <div ref={consoleEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
