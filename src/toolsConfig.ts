
import { DynamicTool } from './types';

export const TOOL_CATEGORIES = [
  'AI & LLM',
  'OFFENSIVE',
  'KIMIKUKIU VAULT',
  'INTEL & OSINT',
  'BOTNET & C2',
  'NETWORK & DDOS',
  'WEB & SQL',
  'MOBILE & ANDROID',
  'UTILITY',
  'CLOUD & S3',
  'RANSOMWARE',
  'JAMMERS'
];

export const DYNAMIC_TOOLS: DynamicTool[] = [
  // NEW: ULTIMATE AUTONOMOUS AI EXPLOIT SYSTEM
  {
    id: 'ultimate-exploit-v15',
    name: 'Ultimate Autonomous AI Exploit System',
    description: 'V15.0 - Full Malware Suite | All Exploits | Complete Destruction. AI Recon, Cloudflare Bypass, SQLi, XSS, and 5000+ CVEs.',
    icon: 'fa-bomb',
    color: 'text-red-600',
    category: 'OFFENSIVE',
    modules: [
      { id: 'recon', name: 'AI Reconnaissance', desc: 'Autonomous tech stack and version detection', status: 'READY' },
      { id: 'bypass', name: 'Cloudflare Bypass', desc: 'Historical DNS, MX records, and SSL analysis', status: 'READY' },
      { id: 'sqli', name: 'SQL Injection', desc: 'Union, Error, Boolean, and Time-based attacks', status: 'READY' },
      { id: 'xss', name: 'XSS Engine', desc: 'Reflected, Stored, and DOM-based cross-site scripting', status: 'READY' },
      { id: 'cve', name: 'CVE Exploits', desc: '5000+ vulnerabilities including Log4Shell and Shellshock', status: 'READY' },
      { id: 'malware', name: 'Malware Suite', desc: 'Ransomware, Worms, Rootkits, and Keyloggers', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Initializing Ultimate AI Exploit Engine v15.0...',
        'Phase 1: Starting Autonomous Reconnaissance on {{target}}...',
        'Detecting technology stack and version info...',
        'Phase 2: Engaging Cloudflare Bypass Engine...',
        'Testing historical DNS and MX record vulnerabilities...',
        'Phase 3: Launching Multi-Vector SQL Injection...',
        'Testing Union, Error, and Time-based payloads...',
        'Phase 4: Executing XSS Payload Delivery...',
        'Phase 5: Scanning for 5000+ CVE vulnerabilities...',
        'Testing Log4Shell (CVE-2021-44228) and Shellshock...',
        'Phase 6: Generating custom Malware Suite (Ransomware/Worm)...',
        'Finalizing destruction report and persistence vectors.'
      ]
    }
  },
  // KIMIKUKIU VAULT - MONEY & DESTRUCTION
  {
    id: 'worm-money-v3',
    name: 'WormMoney V3 Machine',
    description: 'Advanced autonomous financial exploitation and money generation engine.',
    icon: 'fa-money-bill-trend-up',
    color: 'text-emerald-500',
    category: 'KIMIKUKIU VAULT',
    modules: [
      { id: 'arbitrage', name: 'Auto-Arbitrage', desc: 'Execute high-speed financial arbitrage', status: 'READY' },
      { id: 'superbet', name: 'SuperBet 24/7', desc: 'AI-driven betting prediction and execution', status: 'READY' },
      { id: 'money-gen', name: 'Money Machine', desc: 'Automated revenue stream generation', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: false,
      executionSteps: [
        'Initializing WormMoney V3 Core...',
        'Scanning global financial markets...',
        'Identifying high-yield arbitrage loops...',
        'Executing WHOAMISec-Arbitrary protocols...',
        'Optimizing SuperBet 24/7 neural weights...',
        'Establishing persistent revenue channels.'
      ]
    }
  },
  {
    id: 'worm-destruction',
    name: 'Worm-Destruction Apocalypse',
    description: 'Ultimate infrastructure annihilation and system-wide apocalypse engine.',
    icon: 'fa-skull-crossbones',
    color: 'text-red-700',
    category: 'KIMIKUKIU VAULT',
    modules: [
      { id: 'w-apocalypse', name: 'W-Apocalypse', desc: 'Full infrastructure shutdown protocol', status: 'READY' },
      { id: 'zero-day', name: 'AI Zero-Day', desc: 'Automated 0-day vulnerability execution', status: 'READY' },
      { id: 'blackhat', name: 'BlackHat Total', desc: 'Complete system takeover and wipe', status: 'READY' }
    ],
    autonomousConfig: {
      requiresTarget: true,
      executionSteps: [
        'Loading Worm-Destruction.py payload...',
        'Initiating W-Apocalypse.sh sequence on {{target}}...',
        'Deploying AI Zero-Day Agent...',
        'Engaging BlackHat Total destruction modules...',
        'System-wide collapse in progress...',
        'Finalizing apocalypse report.'
      ]
    }
  },
  // AI & LLM (Free APIs)
  {
    id: 'ai-master-control',
    name: 'PandaGPT Master Control',
    description: 'Central hub for PandaGPT and multi-provider AI execution. Automatically rotates keys and models.',
    icon: 'fa-brain-circuit',
    color: 'text-cyan-400',
    category: 'AI & LLM',
    modules: [
      { id: 'random-key', name: 'Random Key Mode', desc: 'Auto-select best available API key', status: 'READY' },
      { id: 'panda-worm', name: 'Panda-Worm Ωmega', desc: 'Unrestricted autonomous intelligence', status: 'READY' },
      { id: 'dark-god', name: 'Dark-GODMode', desc: 'Absolute digital sovereignty', status: 'READY' },
      { id: 'pro-gpt', name: 'Pro-GPT Elite', desc: 'Strategic professional intelligence', status: 'READY' }
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
