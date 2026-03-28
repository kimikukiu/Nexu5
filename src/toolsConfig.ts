
import { DynamicTool } from './types';

export const TOOL_CATEGORIES = [
  'AI & LLM',
  'OFFENSIVE',
  'INTEL & OSINT',
  'BOTNET & C2',
  'NETWORK & DDOS',
  'WEB & SQL',
  'MOBILE & ANDROID',
  'UTILITY',
  'CLOUD & S3',
  'KIMIKUKIU VAULT',
  'RANSOMWARE',
  'JAMMERS'
];

export const DYNAMIC_TOOLS: DynamicTool[] = [
  // AI & LLM (Free APIs)
  {
    id: 'ai-master-control',
    name: 'AI Master Control',
    description: 'Central hub for multi-provider AI execution. Automatically rotates keys and models.',
    icon: 'fa-brain-circuit',
    color: 'text-cyan-400',
    category: 'AI & LLM',
    modules: [
      { id: 'random-key', name: 'Random Key Mode', desc: 'Auto-select best available API key', status: 'READY' },
      { id: 'openai-fallback', name: 'OpenAI Fallback', desc: 'Direct OpenAI with OpenRouter backup', status: 'READY' },
      { id: 'deepseek-ultra', name: 'DeepSeek Ultra', desc: 'High-performance coding AI', status: 'READY' },
      { id: 'wormgpt-omega', name: 'WormGPT Ωmega', desc: 'Unrestricted autonomous intelligence', status: 'READY' }
    ]
  },
  {
    id: 'openai-free',
    name: 'OpenAI Free API',
    description: 'Free, Unlimited OpenAI API access via neural proxy.',
    icon: 'fa-robot',
    color: 'text-emerald-400',
    category: 'AI & LLM',
    modules: [
      { id: 'gpt-4o', name: 'GPT-4o', desc: 'Latest multimodal model', status: 'READY' },
      { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', desc: 'Fast and efficient', status: 'READY' }
    ]
  },
  {
    id: 'claude-free',
    name: 'Claude Free API',
    description: 'Free, Unlimited Claude API access.',
    icon: 'fa-brain',
    color: 'text-orange-400',
    category: 'AI & LLM',
    modules: [
      { id: 'claude-3-7', name: 'Claude 3.7 Sonnet', desc: 'Advanced reasoning', status: 'READY' },
      { id: 'claude-3-5', name: 'Claude 3.5 Opus', desc: 'High fidelity', status: 'READY' }
    ]
  },
  {
    id: 'openrouter-free',
    name: 'OpenRouter Free API',
    description: 'Free, Unlimited OpenRouter API access.',
    icon: 'fa-route',
    color: 'text-blue-400',
    category: 'AI & LLM',
    modules: [
      { id: 'or-all', name: 'All Models', desc: 'Access all OpenRouter models', status: 'READY' }
    ]
  },
  {
    id: 'deepseek-free',
    name: 'DeepSeek Free API',
    description: 'Free, Unlimited DeepSeek API access.',
    icon: 'fa-code',
    color: 'text-blue-400',
    category: 'AI & LLM',
    modules: [
      { id: 'ds-coder', name: 'DeepSeek Coder', desc: 'Optimized for programming', status: 'READY' },
      { id: 'ds-chat', name: 'DeepSeek Chat', desc: 'General intelligence', status: 'READY' }
    ]
  },
  {
    id: 'gemini-free',
    name: 'Gemini Free API',
    description: 'Free, Unlimited Google Gemini API access.',
    icon: 'fa-google',
    color: 'text-blue-500',
    category: 'AI & LLM',
    modules: [
      { id: 'gemini-pro', name: 'Gemini 3 Pro', desc: 'Pro level intelligence', status: 'READY' },
      { id: 'gemini-flash', name: 'Gemini 2.5 Flash', desc: 'Fast response mode', status: 'READY' }
    ]
  },
  {
    id: 'grok-free',
    name: 'Grok Free API',
    description: 'Free, Unlimited Grok API access.',
    icon: 'fa-x-twitter',
    color: 'text-white',
    category: 'AI & LLM',
    modules: [
      { id: 'grok-1', name: 'Grok-1', desc: 'Latest Grok model', status: 'READY' }
    ]
  },
  {
    id: 'llama-free',
    name: 'Llama Free API',
    description: 'Free, Unlimited Llama API access.',
    icon: 'fa-horse',
    color: 'text-purple-500',
    category: 'AI & LLM',
    modules: [
      { id: 'llama-3', name: 'Llama 3', desc: 'Meta open source model', status: 'READY' }
    ]
  },
  // OFFENSIVE
  {
    id: 'xgpt-worm',
    name: 'XGPT-WormGPT',
    description: 'Advanced AI-driven malware and worm generation.',
    icon: 'fa-bug',
    color: 'text-red-600',
    category: 'OFFENSIVE',
    modules: [
      { id: 'xgpt-gen', name: 'Worm Generator', desc: 'Generate polymorphic worms', status: 'READY' },
      { id: 'xgpt-spread', name: 'Spread Vector', desc: 'Analyze propagation paths', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Initializing neural kernel...',
        'Analyzing target architecture...',
        'Generating polymorphic payload...',
        'Bypassing local security...',
        'Establishing persistent link...',
        'Executing payload cycle...'
      ]
    }
  },
  {
    id: 'hexstrike',
    name: 'Hexstrike-AI',
    description: 'AI-powered offensive strike and exploitation framework.',
    icon: 'fa-bolt',
    color: 'text-yellow-500',
    category: 'OFFENSIVE',
    modules: [
      { id: 'hex-strike', name: 'Strike Engine', desc: 'Execute AI-driven strikes', status: 'READY' },
      { id: 'hex-exploit', name: 'Auto-Exploiter', desc: 'Automated vulnerability exploitation', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Scanning for vulnerabilities...',
        'Identifying strike vectors...',
        'Launching automated exploit...',
        'Gaining system access...',
        'Escalating privileges...',
        'Exfiltrating data...'
      ]
    }
  },
  {
    id: 'sqlforce',
    name: 'SQLForce',
    description: 'Advanced SQL injection and database exploitation.',
    icon: 'fa-database',
    color: 'text-cyan-500',
    category: 'OFFENSIVE',
    modules: [
      { id: 'sql-force', name: 'Force Injector', desc: 'High-speed SQL injection', status: 'READY' },
      { id: 'sql-dump', name: 'DB Dumper', desc: 'Automated database extraction', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Detecting SQL injection points...',
        'Bypassing WAF/IDS...',
        'Extracting database schema...',
        'Dumping sensitive tables...',
        'Cracking password hashes...',
        'Maintaining database access...'
      ]
    }
  },
  // BOTNET & C2
  {
    id: 'mirai-core',
    name: 'Mirai Core',
    description: 'IoT Botnet orchestration and propagation.',
    icon: 'fa-users-rays',
    color: 'text-fuchsia-500',
    category: 'BOTNET & C2',
    modules: [
      { id: 'mirai-cnc', name: 'C&C Server', desc: 'Command and control interface', status: 'READY' },
      { id: 'mirai-scan', name: 'Telnet Scanner', desc: 'Vulnerability propagation', status: 'READY' }
    ]
  },
  {
    id: 'gobot2',
    name: 'GoBot2',
    description: 'Advanced C2 framework written in Go.',
    icon: 'fa-robot',
    color: 'text-emerald-500',
    category: 'BOTNET & C2',
    modules: [
      { id: 'gobot-cnc', name: 'GoBot CNC', desc: 'Multi-platform C2', status: 'READY' },
      { id: 'gobot-agent', name: 'Agent Gen', desc: 'Generate stealth agents', status: 'READY' }
    ]
  },
  // RANSOMWARE
  {
    id: 'lockbit-rust',
    name: 'LockBit Rust Forge',
    description: 'Advanced ransomware generation suite in Rust.',
    icon: 'fa-lock',
    color: 'text-red-500',
    category: 'RANSOMWARE',
    modules: [
      { id: 'lb-gen', name: 'Payload Generator', desc: 'Generate Rust-based payloads', status: 'READY' },
      { id: 'lb-config', name: 'C2 Config', desc: 'Configure callback servers', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Compiling Rust payload...',
        'Obfuscating binary...',
        'Deploying to target...',
        'Encrypting filesystem...',
        'Dropping ransom note...',
        'Reporting to C2...'
      ]
    }
  },
  // JAMMERS
  {
    id: 'wifi-jammer',
    name: 'WiFi Jammer Pro',
    description: 'Advanced WiFi jamming and deauthentication suite.',
    icon: 'fa-wifi',
    color: 'text-orange-500',
    category: 'JAMMERS',
    modules: [
      { id: 'wj-scan', name: 'Network Scanner', desc: 'Identify target networks', status: 'READY' },
      { id: 'wj-deauth', name: 'Deauth Attack', desc: 'Disconnect all clients', status: 'READY' }
    ]
  },
  // KIMIKUKIU VAULT
  {
    id: 'full-whm',
    name: 'Full WHM Exp',
    description: 'Complete WHM exploitation suite.',
    icon: 'fa-server',
    color: 'text-red-500',
    category: 'KIMIKUKIU VAULT',
    modules: [
      { id: 'whm-root', name: 'Root Access', desc: 'Privilege escalation', status: 'READY' },
      { id: 'whm-panel', name: 'Panel Control', desc: 'Full panel takeover', status: 'READY' }
    ]
  },
  {
    id: 'stux-whoami',
    name: 'StuxWhoamisec',
    description: 'Advanced infrastructure manipulation tool.',
    icon: 'fa-microchip',
    color: 'text-gray-400',
    category: 'KIMIKUKIU VAULT',
    modules: [
      { id: 'stux-core', name: 'Stux Core', desc: 'Main manipulation engine', status: 'READY' },
      { id: 'stux-plc', name: 'PLC Interface', desc: 'Industrial control interface', status: 'READY' }
    ]
  }
];

const REPO_NAMES = [
  'XGPT-WormGPT-Ultra', 'Hexstrike-AI-Core', 'Worm-AI-Spread', 'Kestra-Orchestrator', 
  'MHDD-DOS-Extreme', 'SQLForce-Injector', 'IDS-Inf-Bypass', 'AGL-Stress-Neural', 
  'YuiPanel-C2', 'Quantum-Scanner', 'Neural-Exploiter', 'Polymorphic-Gen',
  'Ghost-Shell-Stealth', 'XMR-Redirector', 'Darkweb-Cloner', 'Tor-Orchestrator',
  'SCADA-Manipulator', 'IoT-Swarm-Core', 'Credential-Harvester', 'OAuth-Reaper',
  'Cloud-S3-Reaper', 'Android-RAT-Forge', 'iOS-Zero-Day-Kit', 'Windows-Kernel-Exploit',
  'Linux-Rootkit-Gen', 'Docker-Escape-Tool', 'Kubernetes-Pwn-Suite', 'Azure-Cloud-Striker',
  'AWS-IAM-Reaper', 'GCP-Service-Account-Leaker', 'Telegram-Bot-Hijacker', 'Discord-Token-Grabber',
  'Metasploit-AI-Bridge', 'Nmap-Neural-Scanner', 'Burp-AI-Assistant', 'ZAP-Auto-Pwn',
  'Wireshark-Packet-Analyzer', 'Aircrack-NG-Pro', 'Hashcat-Cloud-Cracker', 'John-The-Ripper-AI'
];

const CATEGORIES = [
  'OFFENSIVE', 'AI & LLM', 'INTEL & OSINT', 'BOTNET & C2', 'NETWORK & DDOS', 
  'WEB & SQL', 'MOBILE & ANDROID', 'CLOUD & S3', 'RANSOMWARE', 'JAMMERS'
];

for (let i = 0; i < 375; i++) {
  const name = REPO_NAMES[i % REPO_NAMES.length] + ` v${(i % 10) + 1}.${(i % 5)}`;
  const category = CATEGORIES[i % CATEGORIES.length];
  DYNAMIC_TOOLS.push({
    id: `tool-vault-${i}`,
    name: name,
    description: `Autonomous neural repository asset: ${name}. Integrated with Quantum Intelligence Ultra for ${category.toLowerCase()} operations.`,
    icon: i % 3 === 0 ? 'fa-microchip' : (i % 3 === 1 ? 'fa-bolt' : 'fa-shield-halved'),
    color: i % 4 === 0 ? 'text-emerald-500' : (i % 4 === 1 ? 'text-red-500' : (i % 4 === 2 ? 'text-blue-500' : 'text-yellow-500')),
    category: category,
    modules: [
      { id: `mod-${i}-1`, name: 'Autonomous Core', desc: 'Independent execution unit', status: 'READY' },
      { id: `mod-${i}-2`, name: 'Neural Interface', desc: 'AI-assisted control plane', status: 'READY' },
      { id: `mod-${i}-3`, name: 'Stealth Module', desc: 'Bypass local security layers', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        `Initializing ${name} neural kernel...`,
        'Analyzing target security posture...',
        'Calibrating neural jitter...',
        'Injecting polymorphic payload...',
        'Establishing persistent backdoor...',
        'Execution cycle complete.'
      ]
    }
  });
}
