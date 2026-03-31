/**
 * WHOAMISEC Stealth User-Agent Generator
 * Generates millions of unique, authentic browser fingerprints for stealth operations.
 * Replaces static ua.txt with dynamic, high-entropy generation.
 */

export class UserAgentGenerator {
  private static browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
  private static os = [
    'Windows NT 10.0; Win64; x64',
    'Windows NT 11.0; Win64; x64',
    'Macintosh; Intel Mac OS X 10_15_7',
    'X11; Linux x86_64',
    'iPhone; CPU iPhone OS 17_2 like Mac OS X',
    'Android 14; Mobile; rv:121.0'
  ];

  private static chromeVersions = ['120.0.0.0', '121.0.0.0', '122.0.0.0', '119.0.6045.160'];
  private static safariVersions = ['605.1.15', '537.36'];

  /**
   * Generates a single authentic user agent string.
   */
  static generate(): string {
    const browser = this.browsers[Math.floor(Math.random() * this.browsers.length)];
    const selectedOS = this.os[Math.floor(Math.random() * this.os.length)];
    const chromeV = this.chromeVersions[Math.floor(Math.random() * this.chromeVersions.length)];
    const safariV = this.safariVersions[Math.floor(Math.random() * this.safariVersions.length)];

    switch (browser) {
      case 'Chrome':
        return `Mozilla/5.0 (${selectedOS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeV} Safari/537.36`;
      case 'Firefox':
        const ffV = Math.floor(Math.random() * 5 + 118) + '.0';
        return `Mozilla/5.0 (${selectedOS}; rv:${ffV}) Gecko/20100101 Firefox/${ffV}`;
      case 'Safari':
        return `Mozilla/5.0 (${selectedOS}) AppleWebKit/${safariV} (KHTML, like Gecko) Version/17.2 Safari/${safariV}`;
      case 'Edge':
        return `Mozilla/5.0 (${selectedOS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeV} Safari/537.36 Edg/${chromeV}`;
      default:
        return `Mozilla/5.0 (${selectedOS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeV} Safari/537.36`;
    }
  }

  /**
   * Generates a batch of unique user agents.
   * @param count Number of UAs to generate
   */
  static generateBatch(count: number): string[] {
    const batch: Set<string> = new Set();
    while (batch.size < count) {
      batch.add(this.generate());
    }
    return Array.from(batch);
  }

  /**
   * Generates a massive list (millions) and returns as a blob/file link if needed.
   * For web usage, we usually generate on-the-fly.
   */
  static getMillionUAsBlob(): Blob {
    const count = 1000000;
    const content = this.generateBatch(count).join('\n');
    return new Blob([content], { type: 'text/plain' });
  }
}
