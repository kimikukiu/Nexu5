import axios from 'axios';

export interface ScrapedKey {
  provider: string;
  key: string;
}

export class ApiKeyScraper {
  private static instance: ApiKeyScraper;
  private isScraping: boolean = false;
  private lastScrapeTime: number = 0;
  private scrapeInterval: number = 1000 * 60 * 60; // 1 hour

  private constructor() {}

  public static getInstance(): ApiKeyScraper {
    if (!ApiKeyScraper.instance) {
      ApiKeyScraper.instance = new ApiKeyScraper();
    }
    return ApiKeyScraper.instance;
  }

  /**
   * Scrapes keys from unsecuredapikeys.com using a proxy or direct fetch if possible.
   * Since this is a client-side app, we'll use a public CORS proxy for the scraper.
   */
  public async scrapeKeys(): Promise<ScrapedKey[]> {
    if (this.isScraping) return [];
    
    // Check if we scraped recently
    const now = Date.now();
    if (now - this.lastScrapeTime < this.scrapeInterval) {
      console.log('[SCRAPER] Using recently cached keys if any.');
      return this.getCachedKeys();
    }

    this.isScraping = true;
    console.log('[SCRAPER] Starting API key harvest from unsecuredapikeys.com...');

    try {
      // We use a CORS proxy to bypass browser restrictions
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = encodeURIComponent('https://unsecuredapikeys.com/?type=100');
      
      const response = await axios.get(`${proxyUrl}${targetUrl}`);
      const html = response.data.contents;

      // Extract keys using regex (simulating the browser extraction logic)
      const keys: ScrapedKey[] = [];
      
      // OpenAI keys
      const openAIKeys = html.match(/sk-[a-zA-Z0-9]{20,}/g) || [];
      openAIKeys.forEach((k: string) => keys.push({ provider: 'openai', key: k }));

      // Anthropic keys
      const anthropicKeys = html.match(/sk-ant-[a-zA-Z0-9-]{20,}/g) || [];
      anthropicKeys.forEach((k: string) => keys.push({ provider: 'anthropic', key: k }));

      // GitHub tokens
      const githubKeys = html.match(/ghp_[a-zA-Z0-9]{36}/g) || [];
      githubKeys.forEach((k: string) => keys.push({ provider: 'github', key: k }));

      // DeepSeek keys (often sk- or similar)
      const deepSeekKeys = html.match(/sk-[a-z0-9]{32}/g) || [];
      deepSeekKeys.forEach((k: string) => keys.push({ provider: 'deepseek', key: k }));

      if (keys.length > 0) {
        this.saveKeysToStorage(keys);
        this.lastScrapeTime = now;
        console.log(`[SCRAPER] Successfully harvested ${keys.length} keys.`);
      }

      return keys;
    } catch (error) {
      console.error('[SCRAPER] Harvest failed:', error);
      return this.getCachedKeys();
    } finally {
      this.isScraping = false;
    }
  }

  private saveKeysToStorage(keys: ScrapedKey[]) {
    const existing = JSON.parse(localStorage.getItem('SCRAPED_KEYS') || '[]');
    const combined = [...keys, ...existing].slice(0, 100); // Keep last 100
    // Remove duplicates
    const unique = Array.from(new Map(combined.map(item => [item.key, item])).values());
    localStorage.setItem('SCRAPED_KEYS', JSON.stringify(unique));
  }

  private getCachedKeys(): ScrapedKey[] {
    return JSON.parse(localStorage.getItem('SCRAPED_KEYS') || '[]');
  }

  public getBestKeyForProvider(provider: string): string | null {
    const keys = this.getCachedKeys();
    const providerKeys = keys.filter(k => k.provider.toLowerCase().includes(provider.toLowerCase()));
    if (providerKeys.length > 0) {
      // Return a random key from the harvested pool
      return providerKeys[Math.floor(Math.random() * providerKeys.length)].key;
    }
    return null;
  }
}
