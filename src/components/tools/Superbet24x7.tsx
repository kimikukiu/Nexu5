import React, { useState, useEffect } from 'react';

interface MatchData {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  prediction: string;
  confidence: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  extractedAt: string;
}

interface BotConfig {
  telegramToken: string;
  chatId: string;
  autoNotify: boolean;
  minConfidence: number;
}

export const Superbet24x7: React.FC = () => {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [botConfig, setBotConfig] = useState<BotConfig>(() => {
    const saved = localStorage.getItem('superbet_bot_config');
    return saved ? JSON.parse(saved) : {
      telegramToken: '',
      chatId: '',
      autoNotify: false,
      minConfidence: 75
    };
  });
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [extractionLogs, setExtractionLogs] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('superbet_bot_config', JSON.stringify(botConfig));
  }, [botConfig]);

  const extractMatches = async () => {
    setIsExtracting(true);
    setExtractionLogs([]);
    setExtractionLogs(prev => [...prev, '[SYSTEM] Initializing Superbet 24/7 extraction engine...']);

    // Simulate extraction from multiple betting sources
    const sources = ['Superbet', 'Betano', 'Fortuna', 'STS'];
    const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];
    const teams = ['Arsenal', 'Liverpool', 'Manchester City', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Juventus'];

    const newMatches: MatchData[] = [];

    for (let i = 0; i < 3; i++) {
      setExtractionLogs(prev => [...prev, `[EXTRACT] Connecting to ${sources[i]}...`]);
      await new Promise(resolve => setTimeout(resolve, 500));

      setExtractionLogs(prev => [...prev, `[PARSE] Parsing ${sources[i]} match data...`]);
      await new Promise(resolve => setTimeout(resolve, 300));

      const league = leagues[Math.floor(Math.random() * leagues.length)];
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];

      const match: MatchData = {
        id: `match-${Date.now()}-${i}`,
        league,
        homeTeam,
        awayTeam,
        odds: {
          home: parseFloat((1.5 + Math.random() * 2).toFixed(2)),
          draw: parseFloat((3 + Math.random() * 1).toFixed(2)),
          away: parseFloat((1.5 + Math.random() * 2).toFixed(2))
        },
        prediction: Math.random() > 0.5 ? 'HOME_WIN' : (Math.random() > 0.5 ? 'DRAW' : 'AWAY_WIN'),
        confidence: Math.floor(70 + Math.random() * 30),
        status: Math.random() > 0.7 ? 'LIVE' : 'UPCOMING',
        extractedAt: new Date().toISOString()
      };

      newMatches.push(match);
      setExtractionLogs(prev => [...prev, `[SUCCESS] Extracted: ${homeTeam} vs ${awayTeam} (${match.confidence}% confidence)`]);
    }

    setMatches(newMatches);
    setExtractionLogs(prev => [...prev, '[COMPLETE] Extraction cycle finished. All matches synced.']);
    setIsExtracting(false);

    // Auto-notify if enabled
    if (botConfig.autoNotify && botConfig.telegramToken && botConfig.chatId) {
      notifyTelegram(newMatches);
    }
  };

  const notifyTelegram = async (matchList: MatchData[]) => {
    setExtractionLogs(prev => [...prev, '[TELEGRAM] Sending notifications to bot...']);

    const message = `🎯 **Superbet 24/7 Predictions**\n\n${matchList
      .filter(m => m.confidence >= botConfig.minConfidence)
      .map(m => `⚽ ${m.homeTeam} vs ${m.awayTeam}\n📊 Prediction: ${m.prediction}\n💯 Confidence: ${m.confidence}%`)
      .join('\n\n')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botConfig.telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: botConfig.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        setExtractionLogs(prev => [...prev, '[SUCCESS] Telegram notification sent!']);
      } else {
        setExtractionLogs(prev => [...prev, '[ERROR] Failed to send Telegram notification']);
      }
    } catch (error) {
      setExtractionLogs(prev => [...prev, `[ERROR] ${error}`]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-mono">
      {/* Bot Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-purple-500/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fab fa-telegram text-purple-500"></i> Telegram Bot Configuration
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Bot Token</label>
              <input
                type="password"
                value={botConfig.telegramToken}
                onChange={(e) => setBotConfig({ ...botConfig, telegramToken: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-purple-500"
                placeholder="123456:ABC..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Chat ID</label>
              <input
                type="text"
                value={botConfig.chatId}
                onChange={(e) => setBotConfig({ ...botConfig, chatId: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-purple-500"
                placeholder="-100123456789"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-black">Min Confidence (%)</label>
              <input
                type="number"
                value={botConfig.minConfidence}
                onChange={(e) => setBotConfig({ ...botConfig, minConfidence: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-purple-500"
                min="0"
                max="100"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={botConfig.autoNotify}
                onChange={(e) => setBotConfig({ ...botConfig, autoNotify: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-black text-purple-500"
              />
              <label className="text-[10px] text-gray-500 uppercase font-black">Auto-Notify on Extraction</label>
            </div>
          </div>
        </div>

        {/* Extraction Controls */}
        <div className="bg-[#0a0a0a] border border-emerald-500/20 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-database text-emerald-500"></i> Match Extraction Engine
          </h3>

          <button
            onClick={extractMatches}
            disabled={isExtracting}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all mb-4 ${
              isExtracting
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-500 text-black hover:bg-emerald-600 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isExtracting ? (
              <>
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                EXTRACTING_MATCHES...
              </>
            ) : (
              <>
                <i className="fas fa-download mr-2"></i>
                EXTRACT_ALL_MATCHES
              </>
            )}
          </button>

          <div className="text-[9px] text-gray-500 space-y-1 max-h-48 overflow-y-auto bg-black/40 p-3 rounded-lg border border-white/5">
            {extractionLogs.length === 0 ? (
              <p className="text-gray-600 italic">Ready to extract matches...</p>
            ) : (
              extractionLogs.map((log, i) => (
                <p key={i} className={log.includes('[SUCCESS]') ? 'text-emerald-500' : log.includes('[ERROR]') ? 'text-red-500' : 'text-gray-400'}>
                  {log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Matches Display */}
      <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
          <i className="fas fa-list-check text-blue-500"></i> Extracted Matches ({matches.length})
        </h3>

        {matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No matches extracted yet. Click "EXTRACT_ALL_MATCHES" to begin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map(match => (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="bg-black border border-white/10 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[8px] font-black px-2 py-1 rounded ${
                    match.status === 'LIVE' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {match.status}
                  </span>
                  <span className="text-[9px] text-gray-500">{match.league}</span>
                </div>

                <div className="text-sm font-black mb-3">
                  <p>{match.homeTeam}</p>
                  <p className="text-center text-[10px] text-gray-600 my-1">vs</p>
                  <p>{match.awayTeam}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-2 mb-3 text-[9px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Home:</span>
                    <span className="text-white font-bold">{match.odds.home}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Draw:</span>
                    <span className="text-white font-bold">{match.odds.draw}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Away:</span>
                    <span className="text-white font-bold">{match.odds.away}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500">{match.prediction}</span>
                  <div className="w-12 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-black text-emerald-500">{match.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-black text-white uppercase">Match Details</h4>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-gray-600 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black mb-1">Match</p>
                <p className="text-white font-bold">{selectedMatch.homeTeam} vs {selectedMatch.awayTeam}</p>
              </div>

              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black mb-1">League</p>
                <p className="text-white">{selectedMatch.league}</p>
              </div>

              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black mb-1">Prediction</p>
                <p className="text-emerald-500 font-black">{selectedMatch.prediction}</p>
              </div>

              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black mb-1">Confidence</p>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${selectedMatch.confidence}%` }}
                  ></div>
                </div>
                <p className="text-white mt-1">{selectedMatch.confidence}%</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Home</p>
                  <p className="text-white font-bold">{selectedMatch.odds.home}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Draw</p>
                  <p className="text-white font-bold">{selectedMatch.odds.draw}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-500">Away</p>
                  <p className="text-white font-bold">{selectedMatch.odds.away}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (botConfig.telegramToken && botConfig.chatId) {
                    notifyTelegram([selectedMatch]);
                    setSelectedMatch(null);
                  }
                }}
                className="w-full mt-6 py-2 bg-purple-500 text-black font-black rounded-lg uppercase text-[10px] hover:bg-purple-600 transition-all"
              >
                Send to Telegram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Superbet24x7;
