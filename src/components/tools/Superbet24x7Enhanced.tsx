import React, { useState, useEffect, useRef } from 'react';
import SuperbetTelegramService, { MatchData, BetResult } from '../../services/superbetTelegramService';

export const Superbet24x7Enhanced: React.FC = () => {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [results, setResults] = useState<BetResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [stats, setStats] = useState({
    totalBets: 0,
    wonBets: 0,
    winRate: 0,
    totalProfit: 0
  });

  const serviceRef = useRef<SuperbetTelegramService | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    serviceRef.current = new SuperbetTelegramService();
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [INIT] Superbet 24/7 Engine initialized`]);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleConnect = () => {
    if (!botToken || !chatId) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Bot token and chat ID required`]);
      return;
    }

    serviceRef.current?.setBotCredentials(botToken, chatId);
    setIsConnected(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [CONNECTED] Telegram bot connected`]);
  };

  const handleExtractMatches = async () => {
    if (!isConnected) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] Connect Telegram bot first`]);
      return;
    }

    setIsExtracting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [EXTRACT] Extracting matches from Superbet...`]);

    try {
      const extractedMatches = await serviceRef.current?.extractMatches();
      if (extractedMatches) {
        setMatches(extractedMatches);
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [SUCCESS] Extracted ${extractedMatches.length} matches`,
          `[${new Date().toLocaleTimeString()}] [SEND] Sending predictions to Telegram...`
        ]);

        // Send to Telegram
        const sent = await serviceRef.current?.sendPredictionsToTelegram(extractedMatches);
        if (sent) {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [TELEGRAM] Predictions sent successfully`]);
        }
      }
    } catch (error) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [ERROR] ${error}`]);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRecordResult = (matchId: string, actualResult: string) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    const won = match.prediction === actualResult;
    const profit = won ? 100 : -50;

    const result: BetResult = {
      matchId,
      prediction: match.prediction,
      actualResult,
      won,
      profit,
      timestamp: new Date().toISOString()
    };

    setResults(prev => [...prev, result]);
    serviceRef.current?.recordResult(matchId, match.prediction, actualResult, profit);

    // Send result to Telegram
    serviceRef.current?.sendResultToTelegram(result);

    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [RESULT] ${match.homeTeam} vs ${match.awayTeam}: ${actualResult} (${won ? 'WON' : 'LOST'})`
    ]);

    // Update stats
    const stats = serviceRef.current?.getStatistics();
    if (stats) {
      setStats({
        totalBets: stats.totalBets,
        wonBets: stats.wonBets,
        winRate: stats.winRate,
        totalProfit: stats.totalProfit
      });
    }
  };

  const handleSendDailySummary = async () => {
    const sent = await serviceRef.current?.sendDailySummary();
    if (sent) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [TELEGRAM] Daily summary sent`]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center">
            <i className="fas fa-trophy text-purple-500 text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-purple-500 uppercase tracking-widest">Superbet 24/7</h2>
            <p className="text-[9px] text-gray-500 uppercase">Elite Autonomous Betting Engine with Telegram Integration</p>
          </div>
        </div>

        {isConnected && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-green-500 uppercase">Connected</span>
          </div>
        )}
      </div>

      {!isConnected ? (
        /* Telegram Connection Setup */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black border border-white/10 rounded-xl p-6">
            <h3 className="text-[10px] font-black text-white uppercase mb-6">Telegram Bot Setup</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Bot Token</label>
                <input
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-purple-500"
                  placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-500 uppercase mb-2">Chat ID</label>
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg py-2 px-3 text-white text-[10px] focus:outline-none focus:border-purple-500"
                  placeholder="123456789"
                />
              </div>

              <button
                onClick={handleConnect}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-lg uppercase text-[10px] transition-all shadow-lg hover:shadow-purple-600/30"
              >
                <i className="fas fa-link mr-2"></i> Connect Telegram
              </button>
            </div>
          </div>

          <div className="bg-black border border-white/10 rounded-xl p-6">
            <h3 className="text-[10px] font-black text-white uppercase mb-6">Instructions</h3>
            <div className="space-y-2 text-[9px] text-gray-400">
              <p>1. Create a Telegram bot using @BotFather</p>
              <p>2. Get your bot token from @BotFather</p>
              <p>3. Start a chat with your bot and get chat ID</p>
              <p>4. Paste both values above and click Connect</p>
              <p>5. Once connected, extract matches and send predictions</p>
            </div>
          </div>
        </div>
      ) : (
        /* Main Interface */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          {/* Control Panel */}
          <div className="bg-black border border-purple-500/50 rounded-xl p-4">
            <h3 className="text-[10px] font-black text-purple-500 uppercase mb-4">Controls</h3>
            <div className="space-y-3">
              <button
                onClick={handleExtractMatches}
                disabled={isExtracting}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white text-[9px] font-black rounded uppercase transition-all"
              >
                <i className="fas fa-download mr-1"></i> {isExtracting ? 'Extracting...' : 'Extract Matches'}
              </button>

              <button
                onClick={handleSendDailySummary}
                className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-[9px] font-black rounded uppercase transition-all"
              >
                <i className="fas fa-chart-bar mr-1"></i> Daily Summary
              </button>

              <div className="bg-white/5 rounded p-3 border border-white/10">
                <p className="text-[8px] text-gray-600 font-black mb-2">STATISTICS</p>
                <div className="space-y-1 text-[8px]">
                  <p className="text-yellow-500">Bets: {stats.totalBets}</p>
                  <p className="text-green-500">Won: {stats.wonBets}</p>
                  <p className="text-blue-500">Rate: {stats.winRate.toFixed(1)}%</p>
                  <p className="text-purple-500">Profit: {stats.totalProfit > 0 ? '+' : ''}{stats.totalProfit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Matches List */}
          <div className="bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3">
              <p className="text-[9px] font-black text-gray-500 uppercase">Matches ({matches.length})</p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scroll">
              {matches.map(match => (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className={`w-full p-3 border-b border-white/5 text-left transition-all hover:bg-white/5 ${
                    selectedMatch?.id === match.id ? 'bg-purple-500/10 border-l-2 border-l-purple-500' : ''
                  }`}
                >
                  <p className="text-[8px] font-black text-purple-500 uppercase truncate">{match.league}</p>
                  <p className="text-[9px] text-white mt-1 truncate">{match.homeTeam} vs {match.awayTeam}</p>
                  <p className="text-[8px] text-yellow-500 mt-1">🎲 {(match.confidence * 100).toFixed(0)}%</p>
                </button>
              ))}
            </div>
          </div>

          {/* Match Details */}
          {selectedMatch && (
            <div className="bg-black border border-white/10 rounded-xl p-4 flex flex-col">
              <h3 className="text-[10px] font-black text-white uppercase mb-4">Match Details</h3>
              <div className="space-y-3 text-[9px] flex-1">
                <div className="bg-white/5 rounded p-2 border border-white/10">
                  <p className="text-gray-600 font-black mb-1">League</p>
                  <p className="text-white">{selectedMatch.league}</p>
                </div>
                <div className="bg-white/5 rounded p-2 border border-white/10">
                  <p className="text-gray-600 font-black mb-1">Match</p>
                  <p className="text-white">{selectedMatch.homeTeam} vs {selectedMatch.awayTeam}</p>
                </div>
                <div className="bg-white/5 rounded p-2 border border-white/10">
                  <p className="text-gray-600 font-black mb-1">Odds</p>
                  <p className="text-yellow-500">H:{selectedMatch.odds.home} D:{selectedMatch.odds.draw} A:{selectedMatch.odds.away}</p>
                </div>
                <div className="bg-white/5 rounded p-2 border border-white/10">
                  <p className="text-gray-600 font-black mb-1">Prediction</p>
                  <p className="text-emerald-500 font-black">{selectedMatch.prediction}</p>
                </div>
              </div>

              {/* Result Recording */}
              <div className="mt-4 space-y-2">
                <p className="text-[8px] font-black text-gray-600 uppercase">Record Result</p>
                <button
                  onClick={() => handleRecordResult(selectedMatch.id, 'HOME_WIN')}
                  className="w-full px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-[8px] font-black rounded uppercase transition-all"
                >
                  Home Win
                </button>
                <button
                  onClick={() => handleRecordResult(selectedMatch.id, 'DRAW')}
                  className="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[8px] font-black rounded uppercase transition-all"
                >
                  Draw
                </button>
                <button
                  onClick={() => handleRecordResult(selectedMatch.id, 'AWAY_WIN')}
                  className="w-full px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[8px] font-black rounded uppercase transition-all"
                >
                  Away Win
                </button>
              </div>
            </div>
          )}

          {/* Console */}
          <div className="bg-black border border-gray-700 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-900/50 border-b border-gray-700 px-3 py-2 flex items-center justify-between">
              <p className="text-[8px] font-black text-gray-500 uppercase">Console</p>
              <button
                onClick={() => setLogs([])}
                className="text-[8px] text-gray-600 hover:text-white transition-colors uppercase font-black"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-2 overflow-y-auto custom-scroll font-mono text-[8px] text-purple-500/80">
              {logs.map((log, index) => (
                <div key={index} className="mb-0.5">{log}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Superbet24x7Enhanced;
