// LeakCheck OSINT Service - Multi-Source Breach Intelligence
// Integrates: LeakCheck.io API, HIBP, BreachDirectory, local DB

export interface LeakResult {
  email?: string;
  username?: string;
  password?: string;
  hash?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  address?: string;
  zip?: string;
  ip?: string;
  source: {
    name: string;
    breach_date?: string;
    unverified?: boolean;
    passwordless?: boolean;
    compilation?: boolean;
  };
  fields: string[];
}

export interface LeakCheckResponse {
  success: boolean;
  found: number;
  quota?: number;
  results: LeakResult[];
  source_api: string;
  search_query: string;
  search_type: string;
  timestamp: string;
}

export type SearchType = 'auto' | 'email' | 'domain' | 'keyword' | 'username' | 'phone' | 'hash' | 'phash' | 'origin' | 'password';

export interface LeakCheckConfig {
  leakcheck_api_key: string;
  hibp_api_key: string;
  breachdirectory_api_key: string;
  telegram_bot_token: string;
  telegram_chat_id: string;
  notify_on_results: boolean;
  auto_download: boolean;
  max_results: number;
}

const DEFAULT_CONFIG: LeakCheckConfig = {
  leakcheck_api_key: '',
  hibp_api_key: '',
  breachdirectory_api_key: '',
  telegram_bot_token: '',
  telegram_chat_id: '',
  notify_on_results: true,
  auto_download: false,
  max_results: 1000,
};

// Load config from localStorage
export function getLeakCheckConfig(): LeakCheckConfig {
  try {
    const saved = localStorage.getItem('nexu5_leakcheck_config');
    if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveLeakCheckConfig(config: LeakCheckConfig): void {
  localStorage.setItem('nexu5_leakcheck_config', JSON.stringify(config));
}

// Detect search type automatically
export function detectSearchType(query: string): SearchType {
  if (query.includes('@') && query.includes('.')) return 'email';
  if (/^\+?\d{7,15}$/.test(query.replace(/[\s\-()]/g, ''))) return 'phone';
  if (/^[a-f0-9]{24,64}$/i.test(query)) return 'hash';
  if (/^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(query) && !query.includes('@')) return 'domain';
  if (query.length >= 3 && !query.includes(' ')) return 'username';
  return 'keyword';
}

// LeakCheck.io API v2
async function searchLeakCheck(query: string, type: SearchType, apiKey: string): Promise<LeakCheckResponse> {
  const typeParam = type !== 'auto' ? `?type=${type}` : '';
  const response = await fetch(`https://leakcheck.io/api/v2/query/${encodeURIComponent(query)}${typeParam}`, {
    headers: {
      'Accept': 'application/json',
      'X-API-Key': apiKey,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`LeakCheck API Error (${response.status}): ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return {
    success: data.success,
    found: data.found || 0,
    quota: data.quota,
    results: (data.result || []).map((r: any) => ({
      email: r.email,
      username: r.username,
      password: r.password,
      hash: r.hash,
      phone: r.phone,
      first_name: r.first_name,
      last_name: r.last_name,
      dob: r.dob,
      address: r.address,
      zip: r.zip,
      ip: r.ip,
      source: {
        name: r.source?.name || 'Unknown',
        breach_date: r.source?.breach_date,
        unverified: !!r.source?.unverified,
        passwordless: !!r.source?.passwordless,
        compilation: !!r.source?.compilation,
      },
      fields: r.fields || [],
    })),
    source_api: 'LeakCheck.io',
    search_query: query,
    search_type: type,
    timestamp: new Date().toISOString(),
  };
}

// Have I Been Pwned API
async function searchHIBP(query: string, apiKey: string): Promise<LeakCheckResponse> {
  const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(query)}?truncateResponse=false`, {
    headers: {
      'hibp-api-key': apiKey,
      'user-agent': 'Nexu5-OSINT-Platform',
    },
  });

  if (response.status === 404) {
    return {
      success: true,
      found: 0,
      results: [],
      source_api: 'HaveIBeenPwned',
      search_query: query,
      search_type: 'email',
      timestamp: new Date().toISOString(),
    };
  }

  if (!response.ok) {
    throw new Error(`HIBP API Error (${response.status})`);
  }

  const data = await response.json();
  return {
    success: true,
    found: data.length || 0,
    results: (data || []).map((breach: any) => ({
      email: query,
      source: {
        name: breach.Name || breach.Title || 'Unknown',
        breach_date: breach.BreachDate,
        unverified: !breach.IsVerified,
        passwordless: false,
        compilation: false,
      },
      fields: breach.DataClasses || [],
    })),
    source_api: 'HaveIBeenPwned',
    search_query: query,
    search_type: 'email',
    timestamp: new Date().toISOString(),
  };
}

// BreachDirectory API
async function searchBreachDirectory(query: string, type: string, apiKey: string): Promise<LeakCheckResponse> {
  const response = await fetch(`https://breachdirectory.p.rapidapi.com/?func=auto&term=${encodeURIComponent(query)}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'breachdirectory.p.rapidapi.com',
    },
  });

  if (!response.ok) {
    throw new Error(`BreachDirectory API Error (${response.status})`);
  }

  const data = await response.json();
  return {
    success: data.success || false,
    found: data.found || 0,
    results: (data.result || []).map((r: any) => ({
      email: r.email,
      username: r.username,
      password: r.password,
      hash: r.sha1 || r.hash,
      phone: r.phone,
      source: {
        name: r.sources?.join(', ') || 'Unknown',
        breach_date: r.last_breach,
      },
      fields: Object.keys(r).filter(k => r[k] && !['sources'].includes(k)),
    })),
    source_api: 'BreachDirectory',
    search_query: query,
    search_type: type,
    timestamp: new Date().toISOString(),
  };
}

// Send results to Telegram
export async function sendToTelegram(config: LeakCheckConfig, response: LeakCheckResponse): Promise<boolean> {
  if (!config.telegram_bot_token || !config.telegram_chat_id) return false;

  const message = [
    `🔍 *LEAK OSINT RESULTS*`,
    `━━━━━━━━━━━━━━━━━━`,
    `📎 Query: \`${response.search_query}\``,
    `🔎 Type: ${response.search_type}`,
    `📊 Found: ${response.found} results`,
    `🌐 Source: ${response.source_api}`,
    `⏰ Time: ${response.timestamp}`,
    ``,
    ...response.results.slice(0, 10).map((r, i) => [
      `━━ Result ${i + 1} ━━`,
      r.email ? `📧 Email: \`${r.email}\`` : '',
      r.username ? `👤 User: \`${r.username}\`` : '',
      r.password ? `🔑 Pass: \`${r.password}\`` : '',
      r.phone ? `📱 Phone: \`${r.phone}\`` : '',
      r.first_name ? `📝 Name: ${r.first_name} ${r.last_name || ''}` : '',
      `💾 Source: ${r.source.name}`,
      r.source.breach_date ? `📅 Date: ${r.source.breach_date}` : '',
    ].filter(Boolean).join('\n')),
    response.found > 10 ? `\n... and ${response.found - 10} more results` : '',
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${config.telegram_bot_token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.telegram_chat_id,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    return true;
  } catch {
    return false;
  }
}

// Export results to various formats
export function exportToCSV(results: LeakResult[]): string {
  const headers = ['Email', 'Username', 'Password', 'Hash', 'Phone', 'First Name', 'Last Name', 'DOB', 'Address', 'ZIP', 'IP', 'Source', 'Breach Date', 'Fields'];
  const rows = results.map(r => [
    r.email || '',
    r.username || '',
    r.password || '',
    r.hash || '',
    r.phone || '',
    r.first_name || '',
    r.last_name || '',
    r.dob || '',
    r.address || '',
    r.zip || '',
    r.ip || '',
    r.source.name,
    r.source.breach_date || '',
    r.fields.join('; '),
  ].map(v => `"${v.replace(/"/g, '""')}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export function exportToJSON(results: LeakResult[]): string {
  return JSON.stringify(results, null, 2);
}

export function exportToTXT(results: LeakResult[]): string {
  return results.map((r, i) => [
    `=== Result ${i + 1} ===`,
    r.email ? `Email: ${r.email}` : '',
    r.username ? `Username: ${r.username}` : '',
    r.password ? `Password: ${r.password}` : '',
    r.hash ? `Hash: ${r.hash}` : '',
    r.phone ? `Phone: ${r.phone}` : '',
    r.first_name ? `Name: ${r.first_name} ${r.last_name || ''}` : '',
    r.dob ? `DOB: ${r.dob}` : '',
    r.address ? `Address: ${r.address}` : '',
    r.zip ? `ZIP: ${r.zip}` : '',
    r.ip ? `IP: ${r.ip}` : '',
    `Source: ${r.source.name}`,
    r.source.breach_date ? `Breach Date: ${r.source.breach_date}` : '',
    `Fields: ${r.fields.join(', ')}`,
    '',
  ].filter(Boolean).join('\n')).join('\n');
}

// Master search function - tries all available APIs
export async function performLeakSearch(
  query: string,
  type: SearchType,
  config: LeakCheckConfig,
  onProgress?: (msg: string) => void,
): Promise<LeakCheckResponse[]> {
  const allResults: LeakCheckResponse[] = [];

  // Try LeakCheck.io first
  if (config.leakcheck_api_key) {
    try {
      onProgress?.('[LeakCheck.io] Searching...');
      const result = await searchLeakCheck(query, type, config.leakcheck_api_key);
      allResults.push(result);
      onProgress?.(`[LeakCheck.io] Found ${result.found} results`);
    } catch (err: any) {
      onProgress?.(`[LeakCheck.io] Error: ${err.message}`);
    }
  }

  // Try HIBP
  if (config.hibp_api_key && (type === 'email' || type === 'auto')) {
    try {
      onProgress?.('[HaveIBeenPwned] Searching...');
      const result = await searchHIBP(query, config.hibp_api_key);
      allResults.push(result);
      onProgress?.(`[HaveIBeenPwned] Found ${result.found} breaches`);
    } catch (err: any) {
      onProgress?.(`[HaveIBeenPwned] Error: ${err.message}`);
    }
  }

  // Try BreachDirectory
  if (config.breachdirectory_api_key) {
    try {
      onProgress?.('[BreachDirectory] Searching...');
      const result = await searchBreachDirectory(query, type, config.breachdirectory_api_key);
      allResults.push(result);
      onProgress?.(`[BreachDirectory] Found ${result.found} results`);
    } catch (err: any) {
      onProgress?.(`[BreachDirectory] Error: ${err.message}`);
    }
  }

  // Send to Telegram if configured
  if (config.notify_on_results && config.telegram_bot_token) {
    for (const result of allResults) {
      if (result.found > 0) {
        await sendToTelegram(config, result);
      }
    }
  }

  return allResults;
}
