/**
 * Advanced User-Agent Generator Service
 * Generates millions of unique user-agent strings for stealth and evasion
 */

export class UserAgentGenerator {
  private static readonly browsers = [
    { name: 'Chrome', versions: Array.from({length: 50}, (_, i) => 80 + i) },
    { name: 'Firefox', versions: Array.from({length: 50}, (_, i) => 70 + i) },
    { name: 'Safari', versions: Array.from({length: 20}, (_, i) => 14 + i) },
    { name: 'Edge', versions: Array.from({length: 30}, (_, i) => 80 + i) },
    { name: 'Opera', versions: Array.from({length: 25}, (_, i) => 65 + i) }
  ];

  private static readonly osPatterns = [
    // Windows
    { os: 'Windows', versions: ['10.0', '6.3', '6.2', '6.1', '6.0'], arch: ['Win64', 'Win32'] },
    // macOS
    { os: 'Macintosh', versions: ['10_15', '10_14', '10_13', '11_0', '12_0'], arch: ['Intel Mac OS X', 'PPC Mac OS X'] },
    // Linux
    { os: 'X11', versions: ['Linux x86_64', 'Linux i686', 'Linux armv7l'], arch: [] },
    // Mobile
    { os: 'iPhone', versions: ['14_6', '15_0', '15_1', '16_0'], arch: [] },
    { os: 'Android', versions: ['11', '12', '13'], arch: [] },
    { os: 'iPad', versions: ['14_6', '15_0', '15_1', '16_0'], arch: [] }
  ];

  private static readonly devices = [
    'SM-G991B', 'SM-G992B', 'SM-G998B', 'Pixel 5', 'Pixel 6', 'iPhone13,2', 'iPhone13,3',
    'iPad9,1', 'iPad9,2', 'MacBookPro17,1', 'MacBookAir10,1'
  ];

  private static readonly engines = [
    'AppleWebKit/537.36', 'Gecko/20100101', 'Trident/7.0', 'Presto/2.12'
  ];

  /**
   * Generate a single random user-agent string
   */
  static generateSingle(): string {
    const osPattern = this.osPatterns[Math.floor(Math.random() * this.osPatterns.length)];
    const browser = this.browsers[Math.floor(Math.random() * this.browsers.length)];
    const version = browser.versions[Math.floor(Math.random() * browser.versions.length)];
    const engine = this.engines[Math.floor(Math.random() * this.engines.length)];

    let ua = 'Mozilla/5.0 (';

    // OS String
    if (osPattern.os === 'Windows') {
      const arch = osPattern.arch[Math.floor(Math.random() * osPattern.arch.length)];
      const version = osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
      ua += `${arch}; ${arch === 'Win64' ? 'x64' : 'x86'}; rv:${version}`;
    } else if (osPattern.os === 'Macintosh') {
      const version = osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
      ua += `${osPattern.arch[0]}; ${version}`;
    } else if (osPattern.os === 'X11') {
      ua += osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
    } else if (osPattern.os === 'iPhone') {
      const version = osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
      ua += `iPhone; CPU iPhone OS ${version.replace('_', '_')} like Mac OS X`;
    } else if (osPattern.os === 'Android') {
      const device = this.devices[Math.floor(Math.random() * this.devices.length)];
      const version = osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
      ua += `Linux; Android ${version}; ${device}`;
    } else if (osPattern.os === 'iPad') {
      const version = osPattern.versions[Math.floor(Math.random() * osPattern.versions.length)];
      ua += `iPad; CPU OS ${version.replace('_', '_')} like Mac OS X`;
    }

    ua += `) ${engine} (KHTML, like Gecko) `;

    // Browser String
    switch (browser.name) {
      case 'Chrome':
        ua += `Chrome/${version}.0.${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 100)} Safari/537.36`;
        break;
      case 'Firefox':
        ua += `Firefox/${version}.0`;
        break;
      case 'Safari':
        ua += `Version/${version}.0 Safari/605.1.15`;
        break;
      case 'Edge':
        ua += `Edg/${version}.0.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 100)}`;
        break;
      case 'Opera':
        ua += `OPR/${version}.0.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 100)}`;
        break;
    }

    return ua;
  }

  /**
   * Generate multiple unique user-agent strings
   */
  static generateMultiple(count: number): string[] {
    const uas = new Set<string>();
    
    while (uas.size < count) {
      uas.add(this.generateSingle());
    }
    
    return Array.from(uas);
  }

  /**
   * Generate user-agents in batches (for large numbers)
   */
  static *generateBatch(count: number, batchSize: number = 1000) {
    for (let i = 0; i < count; i += batchSize) {
      const size = Math.min(batchSize, count - i);
      yield this.generateMultiple(size);
    }
  }

  /**
   * Get random user-agent from generated pool
   */
  static getRandomFromPool(pool: string[]): string {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * Generate user-agents with specific browser
   */
  static generateForBrowser(browser: string, count: number): string[] {
    const uas: string[] = [];
    const browserData = this.browsers.find(b => b.name === browser);
    
    if (!browserData) return [];

    for (let i = 0; i < count; i++) {
      const version = browserData.versions[Math.floor(Math.random() * browserData.versions.length)];
      let ua = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) `;
      
      switch (browser) {
        case 'Chrome':
          ua += `Chrome/${version}.0.${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 100)} Safari/537.36`;
          break;
        case 'Firefox':
          ua += `Firefox/${version}.0`;
          break;
        case 'Safari':
          ua += `Version/${version}.0 Safari/605.1.15`;
          break;
        case 'Edge':
          ua += `Edg/${version}.0.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 100)}`;
          break;
      }
      
      uas.push(ua);
    }

    return uas;
  }

  /**
   * Generate mobile-specific user-agents
   */
  static generateMobileUAs(count: number): string[] {
    const mobileUAs: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const isMobile = Math.random() > 0.5;
      
      if (isMobile) {
        const device = this.devices[Math.floor(Math.random() * this.devices.length)];
        const version = Math.floor(Math.random() * 5) + 11;
        mobileUAs.push(
          `Mozilla/5.0 (Linux; Android ${version}; ${device}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${90 + Math.floor(Math.random() * 10)}.0.${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 100)} Mobile Safari/537.36`
        );
      } else {
        mobileUAs.push(this.generateSingle());
      }
    }

    return mobileUAs;
  }

  /**
   * Generate user-agents with fingerprint variations
   */
  static generateWithFingerprint(count: number): Array<{ua: string; fingerprint: string}> {
    const results: Array<{ua: string; fingerprint: string}> = [];
    
    for (let i = 0; i < count; i++) {
      const ua = this.generateSingle();
      const fingerprint = this.generateFingerprint();
      results.push({ ua, fingerprint });
    }

    return results;
  }

  /**
   * Generate a unique browser fingerprint
   */
  private static generateFingerprint(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fingerprint = '';
    
    for (let i = 0; i < 32; i++) {
      fingerprint += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return fingerprint;
  }
}

export default UserAgentGenerator;
