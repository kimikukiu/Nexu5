import React from 'react';
import { AppTab } from '../../types';
import ToolPanel from './ToolPanel';

interface ExternalToolRendererProps {
  activeTab: AppTab;
}

const toolConfigs: Record<string, any> = {
  [AppTab.OSINT_DASHBOARD]: {
    title: 'OSINT Dashboard',
    icon: 'fa-globe',
    color: 'text-[#3b82f6]',
    description: 'Global Threat Intelligence & Open Source Reconnaissance.',
    modules: [
      { id: 'osint-recon', name: 'Global Recon', desc: 'Open Source Reconnaissance', status: 'READY' },
      { id: 'osint-threat', name: 'Threat Intel', desc: 'Global Threat Intelligence', status: 'READY' },
      { id: 'osint-dark', name: 'Dark Web Scan', desc: 'Dark-Web Leak Scanner', status: 'READY' },
    ]
  },
  [AppTab.EXTRACTOR]: {
    title: 'Deep Extractor',
    icon: 'fa-user-secret',
    color: 'text-[#10b981]',
    description: 'Advanced data extraction and identity harvesting.',
    modules: [
      { id: 'ext-reaper', name: 'Full-Spectrum Reaper', desc: 'Comprehensive data extraction', status: 'READY' },
      { id: 'ext-social', name: 'Social Siphon', desc: 'Social Profile Siphon', status: 'READY' },
      { id: 'ext-cloud', name: 'Cloud Harvester', desc: 'Cloud Identity Harvester', status: 'READY' },
    ]
  },
  [AppTab.GPT_CHAT]: {
    title: 'GPT Chat',
    icon: 'fa-robot',
    color: 'text-[#00ffc3]',
    description: 'Advanced conversational AI interface for threat modeling.',
    modules: [
      { id: 'gpt-core', name: 'GPT-4 Core', desc: 'Main conversational engine', status: 'READY' },
      { id: 'gpt-sec', name: 'SecGPT', desc: 'Security-focused language model', status: 'READY' },
      { id: 'gpt-code', name: 'CodeGPT', desc: 'Exploit generation model', status: 'READY' },
    ]
  },
  [AppTab.IDE_TOOL]: {
    title: 'Quantum IDE',
    icon: 'fa-laptop-code',
    color: 'text-[#ffaa00]',
    description: 'Integrated Development Environment for payload crafting.',
    modules: [
      { id: 'ide-python', name: 'Python Environment', desc: 'Python 3.11 runtime', status: 'READY' },
      { id: 'ide-c', name: 'C/C++ Compiler', desc: 'GCC toolchain', status: 'READY' },
      { id: 'ide-asm', name: 'Assembly Toolkit', desc: 'x86/x64 assembler', status: 'READY' },
    ]
  },
  [AppTab.SOLANA_TOOL]: {
    title: 'Solana Tool',
    icon: 'fa-link',
    color: 'text-[#aa00ff]',
    description: 'Solana blockchain analysis and interaction suite.',
    modules: [
      { id: 'sol-scan', name: 'Contract Scanner', desc: 'Vulnerability scanner for Solana smart contracts', status: 'READY' },
      { id: 'sol-drain', name: 'Liquidity Drainer', desc: 'Automated liquidity extraction tool', status: 'READY' },
      { id: 'sol-monitor', name: 'Wallet Monitor', desc: 'Real-time transaction tracking', status: 'READY' },
    ]
  },
  [AppTab.DEPLOYER_TOOL]: {
    title: 'Deployer',
    icon: 'fa-rocket',
    color: 'text-[#ff5e00]',
    description: 'Automated payload deployment and orchestration.',
    modules: [
      { id: 'dep-aws', name: 'AWS Deployer', desc: 'Deploy to AWS infrastructure', status: 'READY' },
      { id: 'dep-gcp', name: 'GCP Deployer', desc: 'Deploy to Google Cloud', status: 'READY' },
      { id: 'dep-azure', name: 'Azure Deployer', desc: 'Deploy to Microsoft Azure', status: 'READY' },
    ]
  },
  [AppTab.SCANNER_TOOL]: {
    title: 'Scanner',
    icon: 'fa-search',
    color: 'text-[#ff00ff]',
    description: 'Network and vulnerability scanning utility.',
    modules: [
      { id: 'scan-nmap', name: 'Nmap Engine', desc: 'Advanced port scanning', status: 'READY' },
      { id: 'scan-vuln', name: 'Vuln Scanner', desc: 'Automated vulnerability detection', status: 'READY' },
      { id: 'scan-dir', name: 'DirBuster', desc: 'Directory brute-forcing', status: 'READY' },
    ]
  },
  [AppTab.S3_TOOL]: {
    title: 'S3 Buckets',
    icon: 'fa-bucket',
    color: 'text-[#f59e0b]',
    description: 'AWS S3 bucket enumeration and exploitation.',
    modules: [
      { id: 's3-enum', name: 'Bucket Enumerator', desc: 'Discover open S3 buckets', status: 'READY' },
      { id: 's3-dump', name: 'Data Dumper', desc: 'Extract data from open buckets', status: 'READY' },
      { id: 's3-inject', name: 'Payload Injector', desc: 'Upload malicious files to buckets', status: 'READY' },
    ]
  },
  [AppTab.BLACKHAT_TOOL]: {
    title: 'Blackhat',
    icon: 'fa-user-ninja',
    color: 'text-[#ef4444]',
    description: 'Advanced offensive security toolkit.',
    modules: [
      { id: 'bh-phish', name: 'Phishing Framework', desc: 'Automated phishing campaigns', status: 'READY' },
      { id: 'bh-mal', name: 'Malware Generator', desc: 'Custom malware creation', status: 'READY' },
      { id: 'bh-c2', name: 'C2 Infrastructure', desc: 'Command and control setup', status: 'READY' },
    ]
  },
  [AppTab.LAZARUS_TOOL]: {
    title: 'Lazarus APT',
    icon: 'fa-user-secret',
    color: 'text-[#991b1b]',
    description: 'Advanced Persistent Threat simulation and analysis.',
    modules: [
      { id: 'apt-recon', name: 'Reconnaissance', desc: 'Target intelligence gathering', status: 'READY' },
      { id: 'apt-exploit', name: 'Exploitation', desc: 'Initial access vectors', status: 'READY' },
      { id: 'apt-persist', name: 'Persistence', desc: 'Maintain access to target', status: 'READY' },
    ]
  },
  [AppTab.BURPSUITE_TOOL]: {
    title: 'Burpsuite',
    icon: 'fa-spider',
    color: 'text-[#ff6600]',
    description: 'Web application security testing framework.',
    modules: [
      { id: 'burp-proxy', name: 'Proxy Intercept', desc: 'Intercept and modify HTTP requests', status: 'READY' },
      { id: 'burp-scan', name: 'Active Scanner', desc: 'Automated vulnerability scanning', status: 'READY' },
      { id: 'burp-intrude', name: 'Intruder', desc: 'Automated customized attacks', status: 'READY' },
    ]
  },
  [AppTab.OWASP_TOOL]: {
    title: 'OWASP ZAP',
    icon: 'fa-radar',
    color: 'text-[#3b82f6]',
    description: 'Integrated penetration testing tool for web applications.',
    modules: [
      { id: 'zap-spider', name: 'Spider', desc: 'Automated crawling of web applications', status: 'READY' },
      { id: 'zap-scan', name: 'Active Scan', desc: 'Automated vulnerability scanning', status: 'READY' },
      { id: 'zap-fuzz', name: 'Fuzzer', desc: 'Fuzzing web application inputs', status: 'READY' },
    ]
  },
  [AppTab.XGPT_WORM]: {
    title: 'XGPT-WormGPT',
    icon: 'fa-bug',
    color: 'text-red-600',
    description: 'Advanced AI-driven malware and worm generation.',
    modules: [
      { id: 'xgpt-gen', name: 'Worm Generator', desc: 'Generate polymorphic worms', status: 'READY' },
      { id: 'xgpt-spread', name: 'Spread Vector', desc: 'Analyze propagation paths', status: 'READY' },
    ]
  },
  [AppTab.HEXSTRIKE]: {
    title: 'Hexstrike-AI',
    icon: 'fa-bolt',
    color: 'text-yellow-500',
    description: 'AI-powered offensive strike and exploitation framework.',
    modules: [
      { id: 'hex-strike', name: 'Strike Engine', desc: 'Execute AI-driven strikes', status: 'READY' },
      { id: 'hex-exploit', name: 'Auto-Exploiter', desc: 'Automated vulnerability exploitation', status: 'READY' },
    ]
  },
  [AppTab.WORM_AI]: {
    title: 'Worm-AI',
    icon: 'fa-virus',
    color: 'text-emerald-500',
    description: 'Autonomous worm intelligence and propagation.',
    modules: [
      { id: 'worm-intel', name: 'Worm Intel', desc: 'Analyze worm behavior', status: 'READY' },
      { id: 'worm-auto', name: 'Auto-Propagate', desc: 'Autonomous propagation logic', status: 'READY' },
    ]
  },
  [AppTab.KESTRA]: {
    title: 'Kestra',
    icon: 'fa-orchestration',
    color: 'text-blue-400',
    description: 'Workflow orchestration for complex attack sequences.',
    modules: [
      { id: 'kestra-flow', name: 'Attack Flow', desc: 'Design attack workflows', status: 'READY' },
      { id: 'kestra-exec', name: 'Executor', desc: 'Run orchestrated attacks', status: 'READY' },
    ]
  },
  [AppTab.MHDD_DOS]: {
    title: 'MHDDoS',
    icon: 'fa-fire',
    color: 'text-orange-600',
    description: 'High-performance multi-vector DDoS framework.',
    modules: [
      { id: 'mhddos-l7', name: 'Layer 7 Attack', desc: 'HTTP/HTTPS flood vectors', status: 'READY' },
      { id: 'mhddos-l4', name: 'Layer 4 Attack', desc: 'UDP/TCP/ICMP flood vectors', status: 'READY' },
    ]
  },
  [AppTab.SQLFORCE]: {
    title: 'SQLForce',
    icon: 'fa-database',
    color: 'text-cyan-500',
    description: 'Advanced SQL injection and database exploitation.',
    modules: [
      { id: 'sql-force', name: 'Force Injector', desc: 'High-speed SQL injection', status: 'READY' },
      { id: 'sql-dump', name: 'DB Dumper', desc: 'Automated database extraction', status: 'READY' },
    ]
  },
  [AppTab.IDS_INF]: {
    title: 'IDS-Inf',
    icon: 'fa-shield-virus',
    color: 'text-purple-500',
    description: 'Intrusion Detection System interference and bypass.',
    modules: [
      { id: 'ids-bypass', name: 'IDS Bypass', desc: 'Bypass signature-based detection', status: 'READY' },
      { id: 'ids-noise', name: 'Noise Generator', desc: 'Generate IDS-confusing traffic', status: 'READY' },
    ]
  },
  [AppTab.AGL_STRESS]: {
    title: 'AGL-Stress',
    icon: 'fa-gauge-high',
    color: 'text-pink-500',
    description: 'Advanced stress testing and load generation.',
    modules: [
      { id: 'agl-stress', name: 'Stress Test', desc: 'Generate extreme system load', status: 'READY' },
      { id: 'agl-monitor', name: 'Load Monitor', desc: 'Real-time performance tracking', status: 'READY' },
    ]
  },
  [AppTab.YUI_PANEL]: {
    title: 'YuiPanel_ir',
    icon: 'fa-terminal',
    color: 'text-gray-400',
    description: 'Unified command and control panel for remote assets.',
    modules: [
      { id: 'yui-c2', name: 'C2 Control', desc: 'Manage remote connections', status: 'READY' },
      { id: 'yui-shell', name: 'Remote Shell', desc: 'Interactive remote command execution', status: 'READY' },
    ]
  },
  [AppTab.PENTAGI]: {
    title: 'Pentagi-AI',
    icon: 'fa-shield-halved',
    color: 'text-indigo-500',
    description: 'Autonomous penetration testing and vulnerability assessment.',
    modules: [
      { id: 'pentagi-scan', name: 'Auto-Scanner', desc: 'Autonomous network vulnerability scanning', status: 'READY' },
      { id: 'pentagi-exploit', name: 'Auto-Exploit', desc: 'Autonomous exploitation of vulnerabilities', status: 'READY' },
      { id: 'pentagi-report', name: 'Report Generator', desc: 'Automated penetration testing reports', status: 'READY' },
    ]
  }
};

const ExternalToolRenderer: React.FC<ExternalToolRendererProps> = ({ activeTab }) => {
  const config = toolConfigs[activeTab];

  if (!config) {
    return null;
  }

  return <ToolPanel {...config} />;
};

export default ExternalToolRenderer;
