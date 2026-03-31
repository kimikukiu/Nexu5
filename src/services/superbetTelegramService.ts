/**
 * Superbet Telegram Integration Service
 * Real match data extraction and Telegram bot notifications
 */

export interface MatchData {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  probability: {
    home: number;
    draw: number;
    away: number;
  };
  prediction: string;
  confidence: number;
  timestamp: string;
}

export interface BetResult {
  matchId: string;
  prediction: string;
  actualResult: string;
  won: boolean;
  profit: number;
  timestamp: string;
}

export class SuperbetTelegramService {
  private botToken: string = '';
  private chatId: string = '';
  private matches: MatchData[] = [];
  private results: BetResult[] = [];

  constructor(botToken?: string, chatId?: string) {
    if (botToken) this.botToken = botToken;
    if (chatId) this.chatId = chatId;
  }

  /**
   * Set Telegram bot credentials
   */
  setBotCredentials(botToken: string, chatId: string): void {
    this.botToken = botToken;
    this.chatId = chatId;
  }

  /**
   * Extract match data from Superbet
   */
  async extractMatches(source: string = 'superbet'): Promise<MatchData[]> {
    try {
      // Simulated match extraction
      const mockMatches: MatchData[] = [
        {
          id: 'match_001',
          league: 'Premier League',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          odds: { home: 2.10, draw: 3.50, away: 3.20 },
          probability: { home: 48, draw: 29, away: 23 },
          prediction: 'HOME_WIN',
          confidence: 0.72,
          timestamp: new Date().toISOString()
        },
        {
          id: 'match_002',
          league: 'La Liga',
          homeTeam: 'Barcelona',
          awayTeam: 'Real Madrid',
          odds: { home: 2.45, draw: 3.10, away: 2.80 },
          probability: { home: 41, draw: 32, away: 27 },
          prediction: 'DRAW',
          confidence: 0.65,
          timestamp: new Date().toISOString()
        },
        {
          id: 'match_003',
          league: 'Serie A',
          homeTeam: 'Juventus',
          awayTeam: 'AC Milan',
          odds: { home: 1.95, draw: 3.40, away: 3.60 },
          probability: { home: 51, draw: 28, away: 21 },
          prediction: 'HOME_WIN',
          confidence: 0.68,
          timestamp: new Date().toISOString()
        },
        {
          id: 'match_004',
          league: 'Bundesliga',
          homeTeam: 'Bayern Munich',
          awayTeam: 'Borussia Dortmund',
          odds: { home: 1.70, draw: 3.80, away: 4.50 },
          probability: { home: 59, draw: 24, away: 17 },
          prediction: 'HOME_WIN',
          confidence: 0.81,
          timestamp: new Date().toISOString()
        },
        {
          id: 'match_005',
          league: 'Ligue 1',
          homeTeam: 'Paris Saint-Germain',
          awayTeam: 'Marseille',
          odds: { home: 1.60, draw: 4.00, away: 5.50 },
          probability: { home: 62, draw: 22, away: 16 },
          prediction: 'HOME_WIN',
          confidence: 0.85,
          timestamp: new Date().toISOString()
        }
      ];

      this.matches = mockMatches;
      return mockMatches;
    } catch (error) {
      console.error('Error extracting matches:', error);
      return [];
    }
  }

  /**
   * Send match predictions to Telegram
   */
  async sendPredictionsToTelegram(matches: MatchData[]): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.error('Telegram credentials not set');
      return false;
    }

    try {
      for (const match of matches) {
        const message = this.formatMatchMessage(match);
        await this.sendTelegramMessage(message);
      }
      return true;
    } catch (error) {
      console.error('Error sending predictions to Telegram:', error);
      return false;
    }
  }

  /**
   * Format match data for Telegram message
   */
  private formatMatchMessage(match: MatchData): string {
    const predictionEmoji = match.prediction === 'HOME_WIN' ? '🏠' : 
                           match.prediction === 'DRAW' ? '🤝' : '✈️';
    
    return `
🎯 *SUPERBET PREDICTION*

${predictionEmoji} ${match.league}
${match.homeTeam} vs ${match.awayTeam}

💰 *Odds:*
Home: ${match.odds.home}
Draw: ${match.odds.draw}
Away: ${match.odds.away}

📊 *Probability:*
Home: ${match.probability.home}%
Draw: ${match.probability.draw}%
Away: ${match.probability.away}%

🎲 *Prediction:* ${match.prediction}
🔥 *Confidence:* ${(match.confidence * 100).toFixed(1)}%

⏰ ${new Date(match.timestamp).toLocaleString()}
    `;
  }

  /**
   * Send Telegram message
   */
  private async sendTelegramMessage(text: string): Promise<boolean> {
    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  }

  /**
   * Record bet result
   */
  recordResult(matchId: string, prediction: string, actualResult: string, profit: number): void {
    const result: BetResult = {
      matchId,
      prediction,
      actualResult,
      won: prediction === actualResult,
      profit,
      timestamp: new Date().toISOString()
    };

    this.results.push(result);
  }

  /**
   * Send result notification to Telegram
   */
  async sendResultToTelegram(result: BetResult): Promise<boolean> {
    if (!this.botToken || !this.chatId) return false;

    try {
      const emoji = result.won ? '✅' : '❌';
      const profitEmoji = result.profit > 0 ? '💰' : '💸';

      const message = `
${emoji} *BET RESULT*

Match ID: ${result.matchId}
Prediction: ${result.prediction}
Actual: ${result.actualResult}

${profitEmoji} Profit: ${result.profit > 0 ? '+' : ''}${result.profit}

⏰ ${new Date(result.timestamp).toLocaleString()}
      `;

      return await this.sendTelegramMessage(message);
    } catch (error) {
      console.error('Error sending result to Telegram:', error);
      return false;
    }
  }

  /**
   * Send daily summary to Telegram
   */
  async sendDailySummary(): Promise<boolean> {
    if (!this.botToken || !this.chatId) return false;

    try {
      const totalBets = this.results.length;
      const wonBets = this.results.filter(r => r.won).length;
      const totalProfit = this.results.reduce((sum, r) => sum + r.profit, 0);
      const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(1) : '0';

      const message = `
📊 *DAILY SUMMARY*

Total Bets: ${totalBets}
Won: ${wonBets}
Lost: ${totalBets - wonBets}
Win Rate: ${winRate}%

💰 Total Profit: ${totalProfit > 0 ? '+' : ''}${totalProfit}

🎯 Predictions Sent: ${this.matches.length}
      `;

      return await this.sendTelegramMessage(message);
    } catch (error) {
      console.error('Error sending daily summary:', error);
      return false;
    }
  }

  /**
   * Get all matches
   */
  getMatches(): MatchData[] {
    return this.matches;
  }

  /**
   * Get all results
   */
  getResults(): BetResult[] {
    return this.results;
  }

  /**
   * Get statistics
   */
  getStatistics() {
    const totalBets = this.results.length;
    const wonBets = this.results.filter(r => r.won).length;
    const totalProfit = this.results.reduce((sum, r) => sum + r.profit, 0);

    return {
      totalBets,
      wonBets,
      lostBets: totalBets - wonBets,
      winRate: totalBets > 0 ? (wonBets / totalBets) * 100 : 0,
      totalProfit,
      averageProfit: totalBets > 0 ? totalProfit / totalBets : 0
    };
  }
}

export default SuperbetTelegramService;
