/**
 * API Key Fetcher - Automatically retrieves API keys from unsecuredapikeys.com
 * Caches keys in localStorage to minimize API calls
 */

interface CachedApiKeys {
  openai?: string;
  deepseek?: string;
  groq?: string;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const API_KEY_SOURCE = 'https://unsecuredapikeys.com/?type=100';

export const getApiKeys = async (): Promise<CachedApiKeys> => {
  // Check if we have cached keys
  const cached = localStorage.getItem('cached_api_keys');
  if (cached) {
    const parsed = JSON.parse(cached) as CachedApiKeys;
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed;
    }
  }

  try {
    // Fetch from the API key source
    const response = await fetch(API_KEY_SOURCE, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API keys: ${response.status}`);
    }

    const data = await response.json() as Record<string, string>;

    // Extract keys from the response
    const keys: CachedApiKeys = {
      openai: data.openai || data.OPENAI_API_KEY || data.sk_live || '',
      deepseek: data.deepseek || data.DEEPSEEK_API_KEY || '',
      groq: data.groq || data.GROQ_API_KEY || '',
      timestamp: Date.now()
    };

    // Cache the keys
    localStorage.setItem('cached_api_keys', JSON.stringify(keys));

    return keys;
  } catch (error) {
    console.error('Error fetching API keys:', error);
    
    // Return empty keys if fetch fails
    return {
      timestamp: Date.now()
    };
  }
};

export const getOpenAIKey = async (): Promise<string> => {
  const keys = await getApiKeys();
  return keys.openai || import.meta.env.VITE_OPENAI_API_KEY || '';
};

export const getDeepSeekKey = async (): Promise<string> => {
  const keys = await getApiKeys();
  return keys.deepseek || import.meta.env.VITE_DEEPSEEK_API_KEY || '';
};

export const getGroqKey = async (): Promise<string> => {
  const keys = await getApiKeys();
  return keys.groq || import.meta.env.VITE_GROQ_API_KEY || '';
};

export const clearCachedKeys = (): void => {
  localStorage.removeItem('cached_api_keys');
};
