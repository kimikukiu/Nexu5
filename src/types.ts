
export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  QUANTUM_INTELLIGENCE = 'QUANTUM_INTELLIGENCE',
  OSINT_DASHBOARD = 'OSINT_DASHBOARD',
  EXTRACTOR = 'EXTRACTOR',
  SQL_INJECT = 'SQL_INJECT',
  NETWORK = 'NETWORK',
  ZXCDDOS = 'ZXCDDOS',
  IDE_TOOL = 'IDE_TOOL',
  BOTNET_CORE = 'BOTNET_CORE',
  SYSTEM_CORE_TOOLS = 'SYSTEM_CORE_TOOLS',
  WHOAMISEC_GPT = 'WHOAMISEC_GPT',
  MEDIA_CREATOR = 'MEDIA_CREATOR',
  SETTINGS = 'SETTINGS',
  GPT_CHAT = 'GPT_CHAT',
  GPT_TOOL = 'GPT_CHAT',
  QUANTUM_TOOL = 'QUANTUM_INTELLIGENCE',
  LISP_TOOL = 'SYSTEM_CORE_TOOLS',
  SQL_TOOL = 'SQL_INJECT',
  SOLANA_TOOL = 'SOLANA_TOOL',
  DEPLOYER_TOOL = 'DEPLOYER_TOOL',
  SCANNER_TOOL = 'SCANNER_TOOL',
  S3_TOOL = 'S3_TOOL',
  BLACKHAT_TOOL = 'BLACKHAT_TOOL',
  LAZARUS_TOOL = 'LAZARUS_TOOL',
  BURPSUITE_TOOL = 'BURPSUITE_TOOL',
  OWASP_TOOL = 'OWASP_TOOL',
  ADMIN_PANEL = 'ADMIN_PANEL',
  XGPT_WORM = 'XGPT_WORM',
  HEXSTRIKE = 'HEXSTRIKE',
  WORM_AI = 'WORM_AI',
  KESTRA = 'KESTRA',
  MHDD_DOS = 'MHDD_DOS',
  SQLFORCE = 'SQLFORCE',
  IDS_INF = 'IDS_INF',
  AGL_STRESS = 'AGL_STRESS',
  YUI_PANEL = 'YUI_PANEL',
  INVESTIGATION_CORE = 'INVESTIGATION_CORE',
  FULL_WHM = 'FULL_WHM',
  STUX_WHOAMI = 'STUX_WHOAMI',
  HAJIME = 'HAJIME',
  SUBSCRIPTION = 'SUBSCRIPTION',
  DYNAMIC_TOOL = 'DYNAMIC_TOOL',
  PAYLOAD_VAULT = 'PAYLOAD_VAULT',
  BOTNET_LAB = 'BOTNET_LAB',
  WIFI_JAMMER = 'WIFI_JAMMER',
  RANSOMWARE_FORGE = 'RANSOMWARE_FORGE',
  TOOL_INDEX = 'TOOL_INDEX',
  SANDBOX_VIRTUAL = 'SANDBOX_VIRTUAL',
  PENTAGI = 'PENTAGI',
  SOCIAL_TAKEOVER = 'SOCIAL_TAKEOVER',
  DRONE_TAKEOVER = 'DRONE_TAKEOVER',
  INFRASTRUCTURE_TAKEOVER = 'INFRASTRUCTURE_TAKEOVER',
  MEDIA_COMMS_TAKEOVER = 'MEDIA_COMMS_TAKEOVER',
}

export interface DynamicTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  modules: {
    id: string;
    name: string;
    desc: string;
    status: 'READY' | 'INSTALLING' | 'FAILED';
  }[];
  autonomousConfig?: {
    requiresTarget: boolean;
    payloads?: string[];
    executionSteps: string[];
  };
}

export interface NetworkConfig {
  target: string;
  method: string;
  threads: number;
  duration: number;
  powerLevel: string;
  payloadSize: number;
  headerJitter: boolean;
  proxyScrape: boolean;
  rateLimit: number;
  openRouterKey?: string;
  anthropicKey?: string;
  deepSeekKey?: string;
  openAIKey?: string;
  geminiKey?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error' | 'critical';
  message: string;
}

export interface BotNode {
  id: string;
  country: string;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY';
  latency: number;
  uptime: string;
  type: 'SERVER' | 'IOT' | 'DESKTOP';
}

export interface RepoTool {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: 'OFFENSIVE' | 'AI' | 'UTILITY' | 'INTEL' | 'TELEGRAM' | 'ZR_REPOS';
  githubUrl: string;
  requiresTelegram?: boolean;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface Exploit {
  name: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  type: string;
}

export interface ExploitHistoryItem {
  id: string;
  timestamp: string;
  target: string;
  exploitName: string;
  status: 'SUCCESS' | 'FAILED';
  leakedData?: {
    databaseName: string;
    adminPanelLink: string;
    records: {
      id: number;
      username: string;
      email: string;
      passwordHash: string;
      role: string;
    }[];
  };
}

export type AgentRole = 'ORCHESTRATOR' | 'RESEARCHER' | 'CODER' | 'SECURITY' | 'SOLANA' | 'LAMA' | 'TESTER' | 'DEPLOYER' | 'DOCUMENTER' | 'MANUS' | 'METAGPT' | 'GLM5' | 'XGPT_WORM' | 'HEXSTRIKE' | 'WORM_AI' | 'PENTAGI' | 'KESTRA' | 'MHDD_DOS' | 'SQLFORCE' | 'IDS_INF' | 'AGL_STRESS' | 'YUI_PANEL' | 'STUX_WHOAMI' | 'HAJIME' | 'BOTNET_LAB' | 'WIFI_JAMMER' | 'RANSOMWARE_FORGE' | 'SANDBOX_VIRTUAL' | 'OSINT_DASHBOARD' | 'EXTRACTOR' | 'SQL_INJECT' | 'BOTNET_CORE' | 'SYSTEM_CORE_TOOLS' | 'MEDIA_CREATOR' | 'SETTINGS' | 'GPT_CHAT' | 'SOLANA_TOOL' | 'DEPLOYER_TOOL' | 'SCANNER_TOOL' | 'S3_TOOL' | 'BLACKHAT_TOOL' | 'LAZARUS_TOOL' | 'BURPSUITE_TOOL' | 'OWASP_TOOL' | 'BLACKHAT_AI' | 'CYBER_SENTINEL' | 'GHOST_SHELL' | 'NEURAL_CRACKER' | 'QUANTUM_DECODER' | 'VOID_GPT' | 'TITAN_AI' | 'OMEGA_AGENT' | 'ZODIAC_GPT' | 'PHANTOM_AI' | 'XGPT_WORM_V2' | 'HEXSTRIKE_PRO' | 'WORM_GPT_ULTRA' | 'PENTAGI_ELITE' | 'SHADOW_AGENT' | 'MATRIX_GPT' | 'CYBER_PUNK_AI' | 'DARK_WEB_CRAWLER' | 'EXPLOIT_ENGINE' | 'VULN_SCANNER_PRO' | 'ZERO_DAY_FORGE' | 'ROOT_KIT_BUILDER' | 'STEALTH_OPERATOR' | 'ANONYMOUS_GPT' | 'WORM_GPT_OMEGA';

export interface Software {
  id: string;
  name: string;
  description: string;
  source: 'link' | 'upload';
  installedAt: string;
  status: 'READY' | 'INSTALLING' | 'FAILED';
  content?: string;
  url?: string;
  fileType?: string;
  fileSize?: number;
}

export interface OSINTResult {
  target: string;
  timestamp: string;
  type: string;
  emails: string[];
  passwords: string[];
  adminLinks: string[];
  phones: string[];
  nicknames: string[];
  telegram: string[];
  tiktok: string[];
  socialMedia: string[];
  breaches: string[];
  vulnerabilities: string[];
  scrapedFiles: {
    name: string;
    extension: string;
    size: string;
    source: string;
  }[];
  exploits?: Exploit[];
  summary?: string;
  metadata?: {
    sourceCount: number;
    reliabilityScore: number;
    threatLevel: string;
  };
}
