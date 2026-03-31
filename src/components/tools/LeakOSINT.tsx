import React, { useState, useRef, useCallback } from 'react';
import {
  performLeakSearch,
  getLeakCheckConfig,
  saveLeakCheckConfig,
  detectSearchType,
  exportToCSV,
  exportToJSON,
  exportToTXT,
  type LeakCheckConfig,
  type LeakCheckResponse,
  type LeakResult,
  type SearchType,
} from '../../services/leakCheckService';

const SEARCH_TYPES: { value: SearchType; label: string; icon: string }[] = [
  { value: 'auto', label: 'AUTO DETECT', icon: '🔍' },
  { value: 'email', label: 'EMAIL', icon: '📧' },
  { value: 'username', label: 'USERNAME', icon: '👤' },
  { value: 'phone', label: 'PHONE', icon: '📱' },
  { value: 'domain', label: 'DOMAIN', icon: '🌐' },
  { value: 'hash', label: 'HASH', icon: '🔐' },
  { value: 'password', label: 'PASSWORD', icon: '🔑' },
  { value: 'keyword', label: 'KEYWORD', icon: '📝' },
  { value: 'origin', label: 'ORIGIN', icon: '🏠' },
];

export default function LeakOSINT() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('auto');
  const [isSearching, setIsSearching] = useState(false);
  const [responses, setResponses] = useState<LeakCheckResponse[]>([]);
  const [allResults, setAllResults] = useState<LeakResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [config, setConfig] = useState<LeakCheckConfig>(getLeakCheckConfig());
  const [selectedResult, setSelectedResult] = useState<LeakResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<{ query: string; type: string; found: number; time: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    if (!config.leakcheck_api_key && !config.hibp_api_key && !config.breachdirectory_api_key) {
      addLog('[ERROR] No API keys configured. Go to Settings to add your API keys.');
      setShowConfig(true);
      return;
    }

    setIsSearching(true);
    setResponses([]);
    setAllResults([]);
    setSelectedResult(null);

    const detectedType = searchType === 'auto' ? detectSearchType(query) : searchType;
    addLog(`[SEARCH] Query: "${query}" | Type: ${detectedType} | Starting multi-source scan...`);

    try {
      const results = await performLeakSearch(query, searchType, config, addLog);
      setResponses(results);

      const merged: LeakResult[] = [];
      for (const r of results) {
        merged.push(...r.results);
      }
      setAllResults(merged);

      const totalFound = results.reduce((sum, r) => sum + r.found, 0);
      addLog(`[COMPLETE] Total: ${totalFound} results from ${results.length} sources`);

      setSearchHistory(prev => [
        { query, type: detectedType, found: totalFound, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 49),
      ]);
    } catch (err: any) {
      addLog(`[FATAL ERROR] ${err.message}`);
    }

    setIsSearching(false);
  };

  const handleExport = (format: 'csv' | 'json' | 'txt') => {
    if (allResults.length === 0) return;

    let content: string;
    let mimeType: string;
    let extension: string;

    switch (format) {
      case 'csv':
        content = exportToCSV(allResults);
        mimeType = 'text/csv';
        extension = 'csv';
        break;
      case 'json':
        content = exportToJSON(allResults);
        mimeType = 'application/json';
        extension = 'json';
        break;
      case 'txt':
        content = exportToTXT(allResults);
        mimeType = 'text/plain';
        extension = 'txt';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leak_osint_${query.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    addLog(`[EXPORT] Downloaded ${allResults.length} results as ${format.toUpperCase()}`);
  };

  const handleSaveConfig = () => {
    saveLeakCheckConfig(config);
    addLog('[CONFIG] Settings saved successfully');
    setShowConfig(false);
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-green-950 to-gray-900 border-b border-green-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-900 border-2 border-green-500 flex items-center justify-center text-xl">
              🔍
            </div>
            <div>
              <h1 className="text-green-400 text-lg font-bold tracking-wider">LEAK_OSINT</h1>
              <p className="text-green-700 text-xs">BREACH INTELLIGENCE SEARCH ENGINE</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-3 py-1 bg-gray-800 border border-green-700 rounded text-green-400 text-xs hover:bg-green-900 transition"
            >
              ⚙️ SETTINGS
            </button>
            <button
              onClick={() => setLogs([])}
              className="px-3 py-1 bg-gray-800 border border-green-700 rounded text-green-400 text-xs hover:bg-green-900 transition"
            >
              🗑️ CLEAR_LOGS
            </button>
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <div className="bg-gray-900 border-b border-green-800 p-4 space-y-3">
          <h2 className="text-green-400 text-sm font-bold">🔧 API CONFIGURATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-green-600 text-xs block mb-1">LEAKCHECK.IO API KEY</label>
              <input
                type="password"
                value={config.leakcheck_api_key}
                onChange={e => setConfig({ ...config, leakcheck_api_key: e.target.value })}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none"
                placeholder="Enter LeakCheck.io API key..."
              />
            </div>
            <div>
              <label className="text-green-600 text-xs block mb-1">HAVEIBEENPWNED API KEY</label>
              <input
                type="password"
                value={config.hibp_api_key}
                onChange={e => setConfig({ ...config, hibp_api_key: e.target.value })}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none"
                placeholder="Enter HIBP API key..."
              />
            </div>
            <div>
              <label className="text-green-600 text-xs block mb-1">BREACHDIRECTORY API KEY (RAPIDAPI)</label>
              <input
                type="password"
                value={config.breachdirectory_api_key}
                onChange={e => setConfig({ ...config, breachdirectory_api_key: e.target.value })}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none"
                placeholder="Enter BreachDirectory RapidAPI key..."
              />
            </div>
            <div>
              <label className="text-green-600 text-xs block mb-1">TELEGRAM BOT TOKEN</label>
              <input
                type="password"
                value={config.telegram_bot_token}
                onChange={e => setConfig({ ...config, telegram_bot_token: e.target.value })}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none"
                placeholder="Enter Telegram bot token..."
              />
            </div>
            <div>
              <label className="text-green-600 text-xs block mb-1">TELEGRAM CHAT ID</label>
              <input
                type="text"
                value={config.telegram_chat_id}
                onChange={e => setConfig({ ...config, telegram_chat_id: e.target.value })}
                className="w-full bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none"
                placeholder="Enter Telegram chat ID..."
              />
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-green-600 text-xs">
                <input
                  type="checkbox"
                  checked={config.notify_on_results}
                  onChange={e => setConfig({ ...config, notify_on_results: e.target.checked })}
                  className="accent-green-500"
                />
                NOTIFY ON RESULTS
              </label>
            </div>
          </div>
          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-green-800 border border-green-500 rounded text-green-300 text-sm font-bold hover:bg-green-700 transition"
          >
            💾 SAVE CONFIGURATION
          </button>
        </div>
      )}

      {/* Search Panel */}
      <div className="bg-gray-950 border-b border-green-800 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Type Selector */}
          <select
            value={searchType}
            onChange={e => setSearchType(e.target.value as SearchType)}
            className="bg-black border border-green-800 rounded px-3 py-2 text-green-400 text-sm focus:border-green-500 outline-none min-w-[160px]"
          >
            {SEARCH_TYPES.map(t => (
              <option key={t.value} value={t.value}>
                {t.icon} {t.label}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="w-full bg-black border border-green-800 rounded px-4 py-2 text-green-400 text-sm focus:border-green-500 outline-none pr-24"
              placeholder="Enter email, username, phone, domain, IP, hash..."
              disabled={isSearching}
            />
            {query && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 text-xs">
                [{detectSearchType(query).toUpperCase()}]
              </span>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className={`px-6 py-2 rounded text-sm font-bold transition min-w-[140px] ${
              isSearching
                ? 'bg-yellow-900 border border-yellow-600 text-yellow-400 animate-pulse'
                : 'bg-green-800 border border-green-500 text-green-300 hover:bg-green-700'
            }`}
          >
            {isSearching ? '⏳ SCANNING...' : '🔍 SEARCH'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-3 text-xs">
          <span className="text-green-600">
            📊 Results: <span className="text-green-400">{allResults.length}</span>
          </span>
          <span className="text-green-600">
            🌐 Sources: <span className="text-green-400">{responses.length}</span>
          </span>
          <span className="text-green-600">
            📜 History: <span className="text-green-400">{searchHistory.length}</span>
          </span>
          {responses[0]?.quota !== undefined && (
            <span className="text-green-600">
              🎫 Quota: <span className="text-green-400">{responses[0].quota}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Results Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Results Header */}
          <div className="bg-gray-900 border-b border-green-800 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setShowResults(true)}
                className={`px-3 py-1 rounded text-xs ${showResults ? 'bg-green-800 text-green-300' : 'bg-gray-800 text-green-600'}`}
              >
                📋 RESULTS ({allResults.length})
              </button>
              <button
                onClick={() => setShowResults(false)}
                className={`px-3 py-1 rounded text-xs ${!showResults ? 'bg-green-800 text-green-300' : 'bg-gray-800 text-green-600'}`}
              >
                📜 CONSOLE ({logs.length})
              </button>
            </div>
            {allResults.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="px-2 py-1 bg-blue-900 border border-blue-600 rounded text-blue-300 text-xs hover:bg-blue-800"
                >
                  📥 CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="px-2 py-1 bg-purple-900 border border-purple-600 rounded text-purple-300 text-xs hover:bg-purple-800"
                >
                  📥 JSON
                </button>
                <button
                  onClick={() => handleExport('txt')}
                  className="px-2 py-1 bg-orange-900 border border-orange-600 rounded text-orange-300 text-xs hover:bg-orange-800"
                >
                  📥 TXT
                </button>
              </div>
            )}
          </div>

          {/* Results / Console Content */}
          {showResults ? (
            <div className="flex-1 overflow-auto p-4 space-y-2">
              {allResults.length === 0 && !isSearching && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-green-500 text-lg mb-2">LEAK OSINT SEARCH ENGINE</h2>
                  <p className="text-green-700 text-sm max-w-md mx-auto">
                    Search for leaked credentials across multiple breach databases.
                    Enter an email, username, phone number, domain, or hash to begin.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto text-xs">
                    <div className="bg-gray-900 border border-green-900 rounded p-3">
                      <div className="text-2xl mb-1">📧</div>
                      <div className="text-green-500">Email</div>
                      <div className="text-green-800">user@domain.com</div>
                    </div>
                    <div className="bg-gray-900 border border-green-900 rounded p-3">
                      <div className="text-2xl mb-1">👤</div>
                      <div className="text-green-500">Username</div>
                      <div className="text-green-800">johndoe123</div>
                    </div>
                    <div className="bg-gray-900 border border-green-900 rounded p-3">
                      <div className="text-2xl mb-1">🌐</div>
                      <div className="text-green-500">Domain</div>
                      <div className="text-green-800">example.com</div>
                    </div>
                  </div>
                </div>
              )}

              {isSearching && (
                <div className="text-center py-10">
                  <div className="text-4xl animate-spin mb-4">🔄</div>
                  <p className="text-green-500 animate-pulse">Scanning breach databases...</p>
                </div>
              )}

              {allResults.map((result, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedResult(selectedResult === result ? null : result)}
                  className={`bg-gray-900 border rounded p-3 cursor-pointer transition hover:border-green-500 ${
                    selectedResult === result ? 'border-green-500 bg-gray-800' : 'border-green-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 text-xs">#{i + 1}</span>
                      {result.email && (
                        <span className="text-green-400 text-sm">📧 {result.email}</span>
                      )}
                      {result.username && (
                        <span className="text-cyan-400 text-sm">👤 {result.username}</span>
                      )}
                      {result.password && (
                        <span className="text-red-400 text-sm">🔑 {result.password}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600 text-xs bg-yellow-900/30 px-2 py-0.5 rounded">
                        {result.source.name}
                      </span>
                      {result.source.breach_date && (
                        <span className="text-green-700 text-xs">{result.source.breach_date}</span>
                      )}
                    </div>
                  </div>

                  {selectedResult === result && (
                    <div className="mt-3 pt-3 border-t border-green-900 grid grid-cols-2 gap-2 text-xs">
                      {result.email && (
                        <div><span className="text-green-700">EMAIL:</span> <span className="text-green-400">{result.email}</span></div>
                      )}
                      {result.username && (
                        <div><span className="text-green-700">USERNAME:</span> <span className="text-cyan-400">{result.username}</span></div>
                      )}
                      {result.password && (
                        <div><span className="text-green-700">PASSWORD:</span> <span className="text-red-400">{result.password}</span></div>
                      )}
                      {result.hash && (
                        <div><span className="text-green-700">HASH:</span> <span className="text-purple-400">{result.hash}</span></div>
                      )}
                      {result.phone && (
                        <div><span className="text-green-700">PHONE:</span> <span className="text-blue-400">{result.phone}</span></div>
                      )}
                      {result.first_name && (
                        <div><span className="text-green-700">NAME:</span> <span className="text-green-400">{result.first_name} {result.last_name || ''}</span></div>
                      )}
                      {result.dob && (
                        <div><span className="text-green-700">DOB:</span> <span className="text-green-400">{result.dob}</span></div>
                      )}
                      {result.address && (
                        <div><span className="text-green-700">ADDRESS:</span> <span className="text-green-400">{result.address}</span></div>
                      )}
                      {result.zip && (
                        <div><span className="text-green-700">ZIP:</span> <span className="text-green-400">{result.zip}</span></div>
                      )}
                      {result.ip && (
                        <div><span className="text-green-700">IP:</span> <span className="text-orange-400">{result.ip}</span></div>
                      )}
                      <div><span className="text-green-700">SOURCE:</span> <span className="text-yellow-400">{result.source.name}</span></div>
                      {result.source.breach_date && (
                        <div><span className="text-green-700">BREACH DATE:</span> <span className="text-green-400">{result.source.breach_date}</span></div>
                      )}
                      {result.fields.length > 0 && (
                        <div className="col-span-2">
                          <span className="text-green-700">FIELDS:</span>{' '}
                          {result.fields.map((f, fi) => (
                            <span key={fi} className="text-green-600 bg-green-900/30 px-1 rounded mr-1">{f}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div ref={logRef} className="flex-1 overflow-auto p-4 bg-black">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono mb-1 ${
                    log.includes('[ERROR]') || log.includes('[FATAL')
                      ? 'text-red-400'
                      : log.includes('[COMPLETE]')
                      ? 'text-green-400'
                      : log.includes('[SEARCH]')
                      ? 'text-cyan-400'
                      : log.includes('[EXPORT]')
                      ? 'text-purple-400'
                      : log.includes('[CONFIG]')
                      ? 'text-yellow-400'
                      : 'text-green-600'
                  }`}
                >
                  {log}
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-green-800 text-xs">
                  [SYSTEM] Leak OSINT engine initialized. Awaiting search query...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search History Sidebar */}
        {searchHistory.length > 0 && (
          <div className="w-64 bg-gray-950 border-l border-green-800 overflow-auto hidden lg:block">
            <div className="p-3 border-b border-green-800">
              <h3 className="text-green-500 text-xs font-bold">📜 SEARCH HISTORY</h3>
            </div>
            <div className="p-2 space-y-1">
              {searchHistory.map((h, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setQuery(h.query);
                    setSearchType(h.type as SearchType);
                  }}
                  className="bg-gray-900 border border-green-900 rounded p-2 cursor-pointer hover:border-green-700 transition"
                >
                  <div className="text-green-400 text-xs truncate">{h.query}</div>
                  <div className="flex justify-between text-green-700 text-[10px] mt-1">
                    <span>{h.type.toUpperCase()}</span>
                    <span>{h.found} found</span>
                    <span>{h.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
