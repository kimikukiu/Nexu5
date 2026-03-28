import React, { useState, useEffect } from 'react';
import { ApiKeyScraper, ScrapedKey } from '../services/apiKeyScraper';

interface ApiConfig {
  [key: string]: string;
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
  const providers = [
    'OPENAI', 'GEMINI', 'ANTHROPIC', 'DEEPSEEK', 'OPENROUTER', 'GROQ', 'HUGGINGFACE',
    'TOGETHER', 'STABILITY', 'REPLICATE', 'ELEVENLABS', 'COHERE', 'FIREWORKS', 'XAI',
    'MISTRAL', 'SOLANA_RPC', 'SHODAN', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'TELEGRAM_BOT_TOKEN'
  ];

  const [config, setConfig] = useState<ApiConfig>(() => {
    const initial: ApiConfig = {};
    providers.forEach(p => {
      initial[p] = localStorage.getItem(`${p}_API_KEY`) || '';
    });
    initial['OPENAI_BASE_URL'] = localStorage.getItem('OPENAI_BASE_URL') || 'https://api.openai.com/v1';
    initial['DEEPSEEK_BASE_URL'] = localStorage.getItem('DEEPSEEK_BASE_URL') || 'https://api.deepseek.com/v1';
    initial['OPENROUTER_BASE_URL'] = localStorage.getItem('OPENROUTER_BASE_URL') || 'https://openrouter.ai/api/v1';
    return initial;
  });

  const [scrapedKeys, setScrapedKeys] = useState<ScrapedKey[]>([]);
  const scraper = ApiKeyScraper.getInstance();

  useEffect(() => {
    const keys = JSON.parse(localStorage.getItem('SCRAPED_KEYS') || '[]');
    setScrapedKeys(keys);
  }, [showManager]);

  const handleSave = () => {
    Object.keys(config).forEach(key => {
      localStorage.setItem(`${key}_API_KEY`, config[key]);
      if (key.includes('BASE_URL')) localStorage.setItem(key, config[key]);
    });
    onSave(config);
    onCloseInput();
  };

  const handleScrape = async () => {
    const keys = await scraper.scrapeKeys();
    setScrapedKeys(keys);
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
                <span className="font-bold uppercase tracking-[0.2em] text-sm">API MANAGER & HARVESTER</span>
              </div>
              <button onClick={onCloseManager} className="text-[#00ffc3]/50 hover:text-[#00ffc3] transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-random"></i> Neural Key Harvester
                  </span>
                  <button 
                    onClick={handleScrape}
                    className="text-[8px] font-bold px-2 py-1 rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-all"
                  >
                    HARVEST NOW
                  </button>
                </div>
                <p className="text-[8px] text-emerald-500/70 mt-1 uppercase tracking-tighter">
                  {scrapedKeys.length} keys currently in the harvested pool from unsecuredapikeys.com.
                </p>
              </div>

              {providers.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-[#00ffc3]/10 rounded-lg hover:border-[#00ffc3]/30 transition-all">
                  <span className="text-[#00ffc3] text-xs font-mono">{p}</span>
                  <div className="flex items-center gap-2">
                    {scrapedKeys.some(sk => sk.provider.toLowerCase().includes(p.toLowerCase().replace('_API_KEY', ''))) && (
                      <span className="text-[8px] text-emerald-500 animate-pulse"><i className="fas fa-leaf"></i></span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${config[p] ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                      {config[p] ? 'CONNECTED' : 'MISSING'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-black/20 border-t border-[#00ffc3]/10 flex justify-end">
              <button onClick={onCloseManager} className="px-4 py-2 bg-[#00ffc3] text-[#0a0f0f] font-bold text-xs uppercase rounded hover:shadow-[0_0_15px_#00ffc3] transition-all">Close</button>
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
                <span className="font-bold uppercase tracking-[0.2em] text-sm">API INPUT PANEL</span>
              </div>
              <button onClick={onCloseInput} className="text-[#ffaa00]/50 hover:text-[#ffaa00] transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {providers.map((p, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[10px] text-[#ffaa00] uppercase font-bold">{p}_API_KEY</label>
                  <input 
                    type="password"
                    value={config[p]}
                    onChange={e => setConfig({...config, [p]: e.target.value})}
                    placeholder="Enter key..."
                    className="w-full bg-black/50 border border-[#ffaa00]/20 rounded p-2 text-xs text-white outline-none focus:border-[#ffaa00]/50"
                  />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-black/20 border-t border-[#ffaa00]/10 flex justify-end gap-3">
              <button onClick={onCloseInput} className="px-4 py-2 border border-[#ffaa00]/50 text-[#ffaa00] font-bold text-xs uppercase rounded hover:bg-[#ffaa00]/10 transition-all">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-[#ffaa00] text-[#0a0f0f] font-bold text-xs uppercase rounded hover:shadow-[0_0_15px_#ffaa00] transition-all">Save Config</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
