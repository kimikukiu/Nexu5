
import React, { useState, useRef } from 'react';
import { OSINTResult, LogEntry } from '../types';
import { AITaskQueue } from '../services/aiTaskQueue';

interface ExtractorProps {
  addLog: (message: string, level?: LogEntry['level']) => void;
  target: string;
  setTarget: (target: string) => void;
}

const Extractor: React.FC<ExtractorProps> = ({ addLog, target, setTarget }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<OSINTResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState<OSINTResult[]>(() => {
    const saved = localStorage.getItem('osint_history');
    return saved ? JSON.parse(saved) : [];
  });
  const taskQueue = useRef(new AITaskQueue(import.meta.env.VITE_GEMINI_API_KEY || ''));

  const detectTargetType = (input: string) => {
    if (!input || input === 'NONE') return 'UNKNOWN';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{8,15}$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    if (emailRegex.test(input)) return 'EMAIL';
    if (phoneRegex.test(input)) return 'PHONE';
    if (ipRegex.test(input)) return 'IP_ADDRESS';
    if (urlRegex.test(input)) return 'URL';
    if (domainRegex.test(input)) return 'DOMAIN';
    if (input.trim().split(/\s+/).length >= 2) return 'FULL_NAME';
    return 'USERNAME/NICKNAME';
  };

  const startExtraction = async () => {
    if (!target || target === 'NONE' || target.trim().length < 3) {
      addLog('Target input too short or invalid.', 'error');
      return;
    }

    const type = detectTargetType(target);
    setIsExtracting(true);
    setProgress(0);
    setResult(null);
    addLog(`INITIALIZING_DEEP_SCAN: [${target}] | TYPE: ${type}`, 'info');

    try {
      setStatus('Neural Kernel Initializing...');
      setProgress(10);
      
      const prompt = `ACT AS A SENIOR OSINT INVESTIGATOR.
      Perform an exhaustive deep intelligence extraction for the following target:
      TARGET: ${target}
      IDENTIFIED_TYPE: ${type}
      
      MANDATORY SEARCH VECTORS:
      1. Associated Email Addresses & Aliases
      2. Leaked Passwords & Hash Samples (from known breaches)
      3. Administrative Panel Links & Hidden Subdomains
      4. Phone Numbers & Carrier Information
      5. Social Media Footprint (Telegram, TikTok, Instagram, LinkedIn, X/Twitter)
      6. Historical Data Breaches (Combo-lists, SQL Dumps)
      7. Critical Vulnerabilities (CVEs associated with the target infrastructure)
      8. Publicly Accessible Files (PDFs, DOCX, Configs, Backups)
      9. Physical Location Hints (if applicable)
      10. Associated Organizations or Entities
      
      OUTPUT_REQUIREMENTS:
      - Return ONLY a valid JSON object matching the OSINTResult interface.
      - Ensure 'emails', 'passwords', 'adminLinks', 'phones', 'nicknames', 'telegram', 'tiktok', 'socialMedia', 'breaches', 'vulnerabilities' are arrays of strings.
      - 'scrapedFiles' must be an array of objects with {name, extension, size, source}.
      - Provide a professional 'summary' of the findings.
      - Set 'reliabilityScore' (0.0 to 1.0) and 'threatLevel' (LOW/MEDIUM/HIGH).
      - If no data is found for a field, return an empty array, NOT null.`;

      setStatus('Accessing Global Intelligence Grids...');
      setProgress(30);

      const response = await taskQueue.current.executeTask('Deep Extraction', prompt);
      
      setStatus('Parsing intelligence data...');
      setProgress(70);

      try {
        // Find JSON in response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          setResult(parsedData);
          setHistory(prev => {
            const newHistory = [parsedData, ...prev].slice(0, 10);
            localStorage.setItem('osint_history', JSON.stringify(newHistory));
            return newHistory;
          });
          addLog(`Extraction complete for ${target}. Found ${parsedData.emails?.length || 0} emails and ${parsedData.breaches?.length || 0} breaches.`, 'success');
        } else {
          throw new Error('Could not parse intelligence data.');
        }
      } catch (e) {
        addLog('Failed to parse extraction results. Raw data logged to console.', 'warning');
        console.error('Parse Error:', e, response);
      }

      setProgress(100);
      setStatus('Extraction complete.');
    } catch (error) {
      addLog(`Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsExtracting(false);
    }
  };

  const exportData = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `osint_report_${result.target.replace(/[^a-z0-9]/gi, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    addLog('Intelligence report exported successfully.', 'success');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Target Input (URL/Email/Phone/Name)</label>
            <div className="relative group">
              <input 
                type="text" 
                value={target === 'NONE' ? '' : target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com, user@mail.com, +1234567890, John Doe"
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:border-emerald-500/50 outline-none transition-all group-hover:border-white/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <span className="text-[8px] font-black text-gray-600 uppercase bg-white/5 px-2 py-1 rounded">
                  Type: {detectTargetType(target)}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={startExtraction}
            disabled={isExtracting || !target || target === 'NONE'}
            className={`px-8 py-3 rounded-lg font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${
              isExtracting 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isExtracting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Extracting...
              </>
            ) : (
              <>
                <i className="fas fa-search-plus"></i>
                Deep Scan
              </>
            )}
          </button>
        </div>

        {isExtracting && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-emerald-500">{status}</span>
              <span className="text-gray-500">{progress}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-2 space-y-4">
            {/* Summary Card */}
            <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-file-alt"></i> Intelligence Summary
                </h3>
                <button 
                  onClick={exportData}
                  className="text-[8px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors border border-emerald-500/30 px-2 py-1 rounded"
                >
                  <i className="fas fa-download mr-1"></i> Export JSON
                </button>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                {result.summary || 'No summary provided by neural engine.'}
              </p>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataCard title="Emails Found" icon="fa-envelope" items={result.emails} color="text-blue-400" />
              <DataCard title="Phone Numbers" icon="fa-phone" items={result.phones} color="text-emerald-400" />
              <DataCard title="Social Media" icon="fa-share-nodes" items={result.socialMedia} color="text-purple-400" />
              <DataCard title="Breaches" icon="fa-shield-virus" items={result.breaches} color="text-red-400" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Metadata Card */}
            <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-xl">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">Threat Assessment</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase font-black">Reliability</span>
                  <span className="text-sm font-black text-emerald-500">{(result.metadata?.reliabilityScore || 0) * 100}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase font-black">Threat Level</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    result.metadata?.threatLevel === 'HIGH' ? 'bg-red-500/20 text-red-500' : 
                    result.metadata?.threatLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 
                    'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {result.metadata?.threatLevel || 'LOW'}
                  </span>
                </div>
              </div>
            </div>

            {/* Scraped Files */}
            <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-xl">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">Exposed Assets</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scroll pr-2">
                {result.scrapedFiles?.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-file text-[10px] text-gray-500"></i>
                      <span className="text-[10px] font-bold truncate max-w-[120px]">{file.name}</span>
                    </div>
                    <span className="text-[8px] text-gray-600 font-black uppercase">{file.size}</span>
                  </div>
                )) || <p className="text-[10px] text-gray-600 italic">No assets detected.</p>}
              </div>
            </div>

            {/* Scan History */}
            <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Recent Intel</h3>
                {history.length > 0 && (
                  <button 
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem('osint_history');
                      addLog('OSINT history cleared.', 'info');
                    }}
                    className="text-[7px] text-gray-600 hover:text-red-500 uppercase font-black transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {history.length > 0 ? history.map((h, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      setResult(h);
                      setTarget(h.target);
                    }}
                    className="w-full flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 hover:border-emerald-500/30 transition-all text-left group"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-300 group-hover:text-emerald-400 transition-colors truncate max-w-[140px]">{h.target}</span>
                      <span className="text-[7px] text-gray-600 uppercase font-black">{h.timestamp}</span>
                    </div>
                    <i className="fas fa-chevron-right text-[8px] text-gray-700 group-hover:text-emerald-500"></i>
                  </button>
                )) : (
                  <p className="text-[10px] text-gray-700 italic">History empty.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DataCard: React.FC<{ title: string; icon: string; items: string[]; color: string }> = ({ title, icon, items, color }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-all">
    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${color}`}>
      <i className={`fas ${icon}`}></i> {title}
    </h4>
    <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scroll pr-2">
      {items && items.length > 0 ? items.map((item, idx) => (
        <div key={idx} className="text-[10px] font-mono text-gray-400 break-all bg-white/5 p-1.5 rounded border border-white/5">
          {item}
        </div>
      )) : (
        <p className="text-[10px] text-gray-700 italic">No data found.</p>
      )}
    </div>
  </div>
);

export default Extractor;
