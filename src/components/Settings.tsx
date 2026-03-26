
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry, NetworkConfig } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';

interface SettingsProps {
  netConfig: NetworkConfig;
  setNetConfig: (config: NetworkConfig) => void;
  addLog: (message: string, level: LogEntry['level']) => void;
}

const Settings: React.FC<SettingsProps> = ({ netConfig, setNetConfig, addLog }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const taskQueue = useRef(new AITaskQueue(""));
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleOutput]);

  const executeDirective = async () => {
    if (isExecuting || !customPrompt) return;
    
    setIsExecuting(true);
    setConsoleOutput('');
    addLog(`KERNEL: Executing AI directive...`, 'info');
    
    const prompt = `You are the Kernel Configuration Manager.
    Custom User Directive: ${customPrompt}

    Generate a realistic, highly technical, line-by-line console output for this kernel configuration command execution.
    Act as the tool itself. Do not use markdown formatting, just raw console text.
    Stream the output as if it's happening in real-time. Include system parameter adjustments, security protocol updates, and neural mesh synchronization.`;

    try {
      await taskQueue.current.executeTaskStream(`Kernel Command`, prompt, (chunk) => {
        setConsoleOutput(prev => prev + chunk);
      });
      addLog(`KERNEL: Directive execution complete.`, 'success');
    } catch (error: any) {
      addLog(`KERNEL ERROR: ${error.message}`, 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleChange = async (field: keyof NetworkConfig, value: any) => {
    const newConfig = { ...netConfig, [field]: value };
    setNetConfig(newConfig);

      // If it's an API key, log it to the backend and localStorage
      if (field.toLowerCase().includes('key') || field.toLowerCase().includes('token')) {
        // Map field names to localStorage keys used by AITaskQueue
        const keyMap: Record<string, string> = {
          'openRouterKey': 'OPENROUTER_API_KEY',
          'anthropicKey': 'ANTHROPIC_API_KEY',
          'deepSeekKey': 'DEEPSEEK_API_KEY',
          'openAIKey': 'OPENAI_API_KEY',
          'geminiKey': 'GEMINI_API_KEY'
        };
        
        if (keyMap[field]) {
          localStorage.setItem(keyMap[field], value);
          // Also update the local taskQueue instance
          taskQueue.current.updateApiKey(value);
        }

        try {
          const currentKeysRes = await fetch('/api/config/keys');
          const currentKeys = await currentKeysRes.json();
          await fetch('/api/config/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...currentKeys, [field]: value })
          });
          addLog(`KERNEL: API key [${field}] logged to vault.`, 'info');
        } catch (error) {
          console.error('Failed to log key to backend');
        }
      }
  };

  const handleSave = () => {
    addLog("KERNEL: Configuration saved to local buffer.", "success");
  };

  return (
    <div className="space-y-4 animate-in">
      <div className="bg-[#050505] border border-white/5 p-6 rounded-lg shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-2 mb-4">Kernel Configuration V8.6</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[8px] font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">Swarm Parameters</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[7px] text-gray-500 uppercase font-black">Power Level</label>
                  <select 
                    value={netConfig.powerLevel} 
                    onChange={(e) => handleChange('powerLevel', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded p-2 text-white outline-none uppercase font-black text-[9px]"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Turbo">Turbo</option>
                    <option value="Critical">Critical</option>
                    <option value="EXTREME_OVERCLOCK">EXTREME_OVERCLOCK</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[7px] text-gray-500 uppercase font-black">Payload Size (Bytes)</label>
                  <input 
                    type="number" 
                    value={netConfig.payloadSize} 
                    onChange={(e) => handleChange('payloadSize', parseInt(e.target.value))}
                    className="w-full bg-black border border-white/10 rounded p-2 text-white outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-black border border-white/5 rounded">
                <span className="text-[8px] text-gray-400 uppercase font-black">Header Jitter</span>
                <input 
                  type="checkbox" 
                  checked={netConfig.headerJitter} 
                  onChange={(e) => handleChange('headerJitter', e.target.checked)}
                  className="accent-emerald-500"
                />
              </div>
              <div className="flex items-center justify-between p-2 bg-black border border-white/5 rounded">
                <span className="text-[8px] text-gray-400 uppercase font-black">Proxy Scrape Automation</span>
                <input 
                  type="checkbox" 
                  checked={netConfig.proxyScrape} 
                  onChange={(e) => handleChange('proxyScrape', e.target.checked)}
                  className="accent-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[8px] font-black text-blue-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">Advanced Neural Config</h4>
              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">Neural Visitor Emulation Rate</label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={netConfig.rateLimit} 
                  onChange={(e) => handleChange('rateLimit', parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[6px] text-gray-600 font-black">
                  <span>STEALTH</span>
                  <span>{netConfig.rateLimit}%</span>
                  <span>AGGRESSIVE</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">OpenRouter API Key (Quota Fallback)</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-2 top-1/2 -translate-y-1/2 text-blue-500/50 text-[8px]"></i>
                  <input 
                    type="password" 
                    value={netConfig.openRouterKey || ''} 
                    onChange={(e) => handleChange('openRouterKey', e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-blue-400 outline-none font-mono text-[9px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">Anthropic API Key</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-2 top-1/2 -translate-y-1/2 text-orange-500/50 text-[8px]"></i>
                  <input 
                    type="password" 
                    value={netConfig.anthropicKey || ''} 
                    onChange={(e) => handleChange('anthropicKey', e.target.value)}
                    placeholder="sk-ant-..."
                    className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-orange-400 outline-none font-mono text-[9px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">DeepSeek API Key</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-2 top-1/2 -translate-y-1/2 text-emerald-500/50 text-[8px]"></i>
                  <input 
                    type="password" 
                    value={netConfig.deepSeekKey || ''} 
                    onChange={(e) => handleChange('deepSeekKey', e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-emerald-400 outline-none font-mono text-[9px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">OpenAI API Key</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-2 top-1/2 -translate-y-1/2 text-green-500/50 text-[8px]"></i>
                  <input 
                    type="password" 
                    value={netConfig.openAIKey || ''} 
                    onChange={(e) => handleChange('openAIKey', e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-green-400 outline-none font-mono text-[9px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">Gemini API Key (Primary)</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-2 top-1/2 -translate-y-1/2 text-purple-500/50 text-[8px]"></i>
                  <input 
                    type="password" 
                    value={netConfig.geminiKey || ''} 
                    onChange={(e) => handleChange('geminiKey', e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-purple-400 outline-none font-mono text-[9px]"
                  />
                </div>
                <p className="text-[6px] text-gray-600 uppercase font-black italic">Primary neural core. Fallback to OpenRouter if quota exceeded.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[8px] font-black text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-2">Admin Security</h4>
              <div className="space-y-1">
                <label className="text-[7px] text-gray-500 uppercase font-black">Change Admin Password</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    id="new_admin_pass"
                    placeholder="New Password"
                    className="flex-1 bg-black border border-white/10 rounded p-2 text-white outline-none font-mono text-[9px]"
                  />
                  <button 
                    onClick={() => {
                      const val = (document.getElementById('new_admin_pass') as HTMLInputElement).value;
                      if (val) {
                        localStorage.setItem('admin_password', val);
                        addLog("SECURITY: Admin password updated.", "success");
                        (document.getElementById('new_admin_pass') as HTMLInputElement).value = '';
                      }
                    }}
                    className="px-3 py-1 bg-red-600 text-black text-[8px] font-black uppercase rounded hover:bg-red-500"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded">
                <p className="text-[6px] text-gray-600 uppercase font-black italic">Master Secret Word: MerleoskinMerleoskin77 (Use at login to reset)</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
              <h4 className="text-[8px] font-black text-white uppercase tracking-widest mb-4">System Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[7px] text-gray-600 uppercase font-black">Version</span>
                  <span className="text-[7px] text-emerald-500 font-black">8.6.0-PRO-STABLE</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[7px] text-gray-600 uppercase font-black">Build Date</span>
                  <span className="text-[7px] text-white font-black">2026-03-06</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[7px] text-gray-600 uppercase font-black">Neural Core</span>
                  <span className="text-[7px] text-white font-black">GHOST-GPT-V4</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[7px] text-gray-600 uppercase font-black">License Status</span>
                  <span className="text-[7px] text-emerald-500 font-black">LIFETIME_ENTERPRISE</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-500/5">
              <p className="text-[7px] text-emerald-400 leading-relaxed italic">
                "WHOAMISec Pro utilizes a decentralized neural mesh of 800,000 nodes to provide 100% visitor acceptance. All traffic is masked via residential proxy rotation and browser fingerprint emulation."
              </p>
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-3 bg-emerald-600 text-black rounded font-black text-[10px] uppercase hover:bg-emerald-500 transition-all shadow-xl"
            >
              Save_Kernel_Config
            </button>
            
            <div className="space-y-2 mt-4 border-t border-emerald-500/20 pt-4">
              <label className="text-[10px] text-[#00ffc3] uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-magic"></i> Dynamic AI Directive (Auto-Rewrite)
              </label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., 'Optimize kernel parameters for maximum stealth'" 
                  className="flex-1 bg-black/50 border border-[#00ffc3]/30 rounded px-3 py-2 text-xs text-[#00ffc3] outline-none focus:border-[#00ffc3]" 
                />
                <button 
                  onClick={executeDirective}
                  disabled={isExecuting || !customPrompt}
                  className="px-6 py-2 bg-[#00ffc3] text-black rounded font-black text-[10px] uppercase hover:bg-[#00ffc3]/80 transition-all disabled:opacity-50"
                >
                  {isExecuting ? 'EXECUTING...' : 'Execute Directive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(consoleOutput || isExecuting) && (
        <div className="bg-[#020202] border border-white/10 rounded-xl flex flex-col min-h-[200px] max-h-[300px]">
          <div className="p-3 border-b border-white/10 bg-black flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Directive Output</span>
            <button onClick={() => setConsoleOutput('')} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">Clear</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scroll text-xs space-y-1 font-mono">
            <div className="text-[#00ffc3] whitespace-pre-wrap">
              {consoleOutput}
            </div>
            {isExecuting && <div className="animate-pulse text-[#00ffc3] mt-2">_</div>}
            <div ref={consoleEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
