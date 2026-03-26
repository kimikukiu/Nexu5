import React, { useState } from 'react';

interface ApiConfig {
  openai: string;
  openaiBaseUrl: string;
  gemini: string;
  anthropic: string;
  deepseek: string;
  deepseekBaseUrl: string;
  openrouter: string;
  openrouterBaseUrl: string;
  solana: string;
  shodan: string;
  awsAccessKey: string;
  awsSecretKey: string;
  telegramBotToken: string;
}

interface ApiConfigModalsProps {
  showManager: boolean;
  showInput: boolean;
  onCloseManager: () => void;
  onCloseInput: () => void;
  onSave: (config: ApiConfig) => void;
}

export const ApiConfigModals: React.FC<ApiConfigModalsProps> = ({
  showManager,
  showInput,
  onCloseManager,
  onCloseInput,
  onSave
}) => {
  const [config, setConfig] = useState<ApiConfig>({
    openai: localStorage.getItem('OPENAI_API_KEY') || '',
    openaiBaseUrl: localStorage.getItem('OPENAI_BASE_URL') || 'https://api.openai.com/v1',
    gemini: localStorage.getItem('GEMINI_API_KEY') || '',
    anthropic: localStorage.getItem('ANTHROPIC_API_KEY') || '',
    deepseek: localStorage.getItem('DEEPSEEK_API_KEY') || '',
    deepseekBaseUrl: localStorage.getItem('DEEPSEEK_BASE_URL') || 'https://api.deepseek.com/v1',
    openrouter: localStorage.getItem('OPENROUTER_API_KEY') || '',
    openrouterBaseUrl: localStorage.getItem('OPENROUTER_BASE_URL') || 'https://openrouter.ai/api/v1',
    solana: localStorage.getItem('SOLANA_RPC_URL') || '',
    shodan: localStorage.getItem('SHODAN_API_KEY') || '',
    awsAccessKey: localStorage.getItem('AWS_ACCESS_KEY_ID') || '',
    awsSecretKey: localStorage.getItem('AWS_SECRET_ACCESS_KEY') || '',
    telegramBotToken: localStorage.getItem('TELEGRAM_BOT_TOKEN') || '',
  });

  const handleSave = () => {
    localStorage.setItem('OPENAI_API_KEY', config.openai);
    localStorage.setItem('OPENAI_BASE_URL', config.openaiBaseUrl);
    localStorage.setItem('GEMINI_API_KEY', config.gemini);
    localStorage.setItem('ANTHROPIC_API_KEY', config.anthropic);
    localStorage.setItem('DEEPSEEK_API_KEY', config.deepseek);
    localStorage.setItem('DEEPSEEK_BASE_URL', config.deepseekBaseUrl);
    localStorage.setItem('OPENROUTER_API_KEY', config.openrouter);
    localStorage.setItem('OPENROUTER_BASE_URL', config.openrouterBaseUrl);
    localStorage.setItem('SOLANA_RPC_URL', config.solana);
    localStorage.setItem('SHODAN_API_KEY', config.shodan);
    localStorage.setItem('AWS_ACCESS_KEY_ID', config.awsAccessKey);
    localStorage.setItem('AWS_SECRET_ACCESS_KEY', config.awsSecretKey);
    localStorage.setItem('TELEGRAM_BOT_TOKEN', config.telegramBotToken);
    onSave(config);
    onCloseInput();
  };

  if (!showManager && !showInput) return null;

  return (
    <>
      {/* API MANAGER MODAL */}
      {showManager && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0a0f0f] border border-[#00ffc3] rounded-xl shadow-[0_0_30px_rgba(0,255,195,0.2)] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[#00ffc3]/20">
              <div className="flex items-center gap-2 text-[#00ffc3]">
                <i className="fas fa-cog animate-spin-slow"></i>
                <span className="font-bold uppercase tracking-[0.2em] text-sm">API MANAGER</span>
              </div>
              <button onClick={onCloseManager} className="text-[#00ffc3]/50 hover:text-[#00ffc3] transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {[
                { name: 'OpenAI (GPT-4)', key: config.openai },
                { name: 'Google Gemini', key: config.gemini },
                { name: 'Anthropic Claude', key: config.anthropic },
                { name: 'DeepSeek (Free/Pro)', key: config.deepseek },
                { name: 'OpenRouter', key: config.openrouter },
                { name: 'Solana RPC', key: config.solana },
                { name: 'Shodan', key: config.shodan },
                { name: 'AWS S3', key: config.awsAccessKey && config.awsSecretKey },
                { name: 'Telegram Bot', key: config.telegramBotToken },
              ].map((api, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-[#00ffc3]/10 rounded-lg hover:border-[#00ffc3]/30 transition-all">
                  <span className="text-[#00ffc3] text-xs font-mono">{api.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${api.key ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                    {api.key ? 'CONNECTED' : 'MISSING'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-black/20 border-t border-[#00ffc3]/10 flex justify-end">
              <button 
                onClick={onCloseManager}
                className="px-4 py-2 bg-[#00ffc3] text-[#0a0f0f] font-bold text-xs uppercase rounded hover:shadow-[0_0_15px_#00ffc3] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API INPUT MODAL */}
      {showInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0a0f0f] border border-[#ffaa00] rounded-xl shadow-[0_0_30px_rgba(255,170,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[#ffaa00]/20">
              <div className="flex items-center gap-2 text-[#ffaa00]">
                <i className="fas fa-key"></i>
                <span className="font-bold uppercase tracking-[0.2em] text-sm">API INPUT</span>
              </div>
              <button onClick={onCloseInput} className="text-[#ffaa00]/50 hover:text-[#ffaa00] transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">OPENAI_API_KEY</label>
                <input 
                  type="password"
                  value={config.openai}
                  onChange={e => setConfig({...config, openai: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">OPENAI_BASE_URL</label>
                <input 
                  type="text"
                  value={config.openaiBaseUrl}
                  onChange={e => setConfig({...config, openaiBaseUrl: e.target.value})}
                  placeholder="https://api.openai.com/v1"
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">GEMINI_API_KEY</label>
                <input 
                  type="password"
                  value={config.gemini}
                  onChange={e => setConfig({...config, gemini: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">ANTHROPIC_API_KEY</label>
                <input 
                  type="password"
                  value={config.anthropic}
                  onChange={e => setConfig({...config, anthropic: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">DEEPSEEK_API_KEY</label>
                <input 
                  type="password"
                  value={config.deepseek}
                  onChange={e => setConfig({...config, deepseek: e.target.value})}
                  placeholder="Enter key (or free-api token)..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">DEEPSEEK_BASE_URL</label>
                <input 
                  type="text"
                  value={config.deepseekBaseUrl}
                  onChange={e => setConfig({...config, deepseekBaseUrl: e.target.value})}
                  placeholder="https://api.deepseek.com/v1"
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">OPENROUTER_API_KEY</label>
                <input 
                  type="password"
                  value={config.openrouter}
                  onChange={e => setConfig({...config, openrouter: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">OPENROUTER_BASE_URL</label>
                <input 
                  type="text"
                  value={config.openrouterBaseUrl}
                  onChange={e => setConfig({...config, openrouterBaseUrl: e.target.value})}
                  placeholder="https://openrouter.ai/api/v1"
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">SOLANA_RPC_URL</label>
                <input 
                  type="text"
                  value={config.solana}
                  onChange={e => setConfig({...config, solana: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">SHODAN_API_KEY</label>
                <input 
                  type="password"
                  value={config.shodan}
                  onChange={e => setConfig({...config, shodan: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">AWS_ACCESS_KEY_ID</label>
                <input 
                  type="text"
                  value={config.awsAccessKey}
                  onChange={e => setConfig({...config, awsAccessKey: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">AWS_SECRET_ACCESS_KEY</label>
                <input 
                  type="password"
                  value={config.awsSecretKey}
                  onChange={e => setConfig({...config, awsSecretKey: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#ffaa00] uppercase font-bold">TELEGRAM_BOT_TOKEN</label>
                <input 
                  type="password"
                  value={config.telegramBotToken}
                  onChange={e => setConfig({...config, telegramBotToken: e.target.value})}
                  placeholder="Enter key..."
                  className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                />
              </div>
            </div>
            
            <div className="p-4 bg-black/20 border-t border-[#ffaa00]/10">
              <button 
                onClick={handleSave}
                className="w-full py-3 bg-[#ffaa00] text-[#0a0f0f] font-bold text-sm uppercase rounded hover:shadow-[0_0_20px_#ffaa00] transition-all"
              >
                SAVE CONFIGURATION
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
