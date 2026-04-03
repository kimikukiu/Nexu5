import { AppTab, DynamicTool } from './types';

export const TOOL_CATEGORIES = [
  'AI & LLM',
  'Offensive Tools',
  'Intelligence',
  'Financial Extraction',
  'Mirai Botnets',
  'JavaScript Attacks',
  'Python Tools',
  'Shell Scripts',
  'PHP Tools',
  'Rust Tools',
  'Core Platform'
];

export const DYNAMIC_TOOLS: DynamicTool[] = [
  {
    "id": "ai-master-control",
    "name": "PandaGPT Control",
    "description": "Central hub for PandaGPT and multi-provider AI execution. Integrated with Manus 1.6 Max abilities.",
    "icon": "fa-brain",
    "color": "text-cyan-400",
    "category": "AI & LLM",
    "modules": [
      {
        "id": "panda-worm",
        "name": "Panda-Worm",
        "desc": "Unrestricted intelligence",
        "status": "READY"
      },
      {
        "id": "dark-god",
        "name": "Dark-GODMode",
        "desc": "Absolute sovereignty",
        "status": "READY"
      },
      {
        "id": "pro-gpt",
        "name": "Pro-GPT Elite",
        "desc": "Strategic intelligence",
        "status": "READY"
      }
    ]
  },
  {
    "id": "zxc-ddos",
    "name": "ZxCDDoS v2.5",
    "description": "Advanced Layer 4/7 DDoS engine with real-time statistics and duration timer.",
    "icon": "fa-bolt-lightning",
    "color": "text-emerald-400",
    "category": "Offensive Tools",
    "modules": [
      {
        "id": "http-flood",
        "name": "HTTP Flood",
        "desc": "High-volume HTTP/S traffic",
        "status": "READY"
      },
      {
        "id": "tcp-syn",
        "name": "TCP SYN Flood",
        "desc": "Layer 4 exhaustion",
        "status": "READY"
      }
    ]
  },
  {
    "id": "superbet-247",
    "name": "Superbet 24/7",
    "description": "Elite autonomous sports betting extraction with Telegram bot integration.",
    "icon": "fa-money-bill-trend-up",
    "color": "text-yellow-400",
    "category": "Financial Extraction",
    "modules": [
      {
        "id": "match-extract",
        "name": "Match Extraction",
        "desc": "Real-time odds data",
        "status": "READY"
      },
      {
        "id": "tg-bot",
        "name": "Telegram Bot",
        "desc": "Automated results",
        "status": "READY"
      }
    ]
  },
  {
    "id": "us-ddos-v2",
    "name": "US-DDOS-V2",
    "description": "Original high-performance HTTP/2 DDoS attack engine from GitHub.",
    "icon": "fa-skull",
    "color": "text-red-500",
    "category": "Offensive Tools"
  },
  {
    "id": "ufodos",
    "name": "UFODOS",
    "description": "Advanced multi-vector DDoS toolkit from GitHub.",
    "icon": "fa-radiation",
    "color": "text-green-500",
    "category": "Offensive Tools"
  },
  {
    "id": "leak-osint",
    "name": "Leak OSINT",
    "description": "Comprehensive breach database search with multi-source API integration.",
    "icon": "fa-magnifying-glass-location",
    "color": "text-blue-400",
    "category": "Intelligence"
  },
  {
    "id": "worm-money-v3",
    "name": "WormMoney V3",
    "description": "Autonomous financial extraction engine for arbitrage and value betting.",
    "icon": "fa-chart-line",
    "color": "text-emerald-500",
    "category": "Financial Extraction"
  },
  {
    "id": "mirai-911",
    "name": "911",
    "description": "Authentic Mirai variant: 911. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/911"
  },
  {
    "id": "mirai-akidoprivate",
    "name": "AkidoPrivate",
    "description": "Authentic Mirai variant: AkidoPrivate. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/AkidoPrivate"
  },
  {
    "id": "mirai-amakano",
    "name": "Amakano",
    "description": "Authentic Mirai variant: Amakano. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Amakano"
  },
  {
    "id": "mirai-apex_mirai",
    "name": "Apex_Mirai",
    "description": "Authentic Mirai variant: Apex_Mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Apex_Mirai"
  },
  {
    "id": "mirai-ares",
    "name": "Ares",
    "description": "Authentic Mirai variant: Ares. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Ares"
  },
  {
    "id": "mirai-ares.c51a2f",
    "name": "Ares.c51a2f",
    "description": "Authentic Mirai variant: Ares.c51a2f. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Ares.c51a2f"
  },
  {
    "id": "mirai-astromirai",
    "name": "AstroMirai",
    "description": "Authentic Mirai variant: AstroMirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/AstroMirai"
  },
  {
    "id": "mirai-b",
    "name": "B",
    "description": "Authentic Mirai variant: B. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/B"
  },
  {
    "id": "mirai-chikara-mirai-source",
    "name": "Chikara Mirai Source",
    "description": "Authentic Mirai variant: Chikara Mirai Source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Chikara Mirai Source"
  },
  {
    "id": "mirai-chikaramiraisource",
    "name": "ChikaraMiraiSource",
    "description": "Authentic Mirai variant: ChikaraMiraiSource. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/ChikaraMiraiSource"
  },
  {
    "id": "mirai-cloewi's-mirai-sources",
    "name": "Cloewi's Mirai Sources",
    "description": "Authentic Mirai variant: Cloewi's Mirai Sources. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Cloewi's Mirai Sources"
  },
  {
    "id": "mirai-cloewis_mirai_sources",
    "name": "Cloewis_Mirai_Sources",
    "description": "Authentic Mirai variant: Cloewis_Mirai_Sources. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Cloewis_Mirai_Sources"
  },
  {
    "id": "mirai-condiv3-kingofzero",
    "name": "CondiV3-KingOfZero",
    "description": "Authentic Mirai variant: CondiV3-KingOfZero. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/CondiV3-KingOfZero"
  },
  {
    "id": "mirai-corona-v4",
    "name": "Corona v4",
    "description": "Authentic Mirai variant: Corona v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Corona v4"
  },
  {
    "id": "mirai-corona_v4",
    "name": "Corona_v4",
    "description": "Authentic Mirai variant: Corona_v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Corona_v4"
  },
  {
    "id": "mirai-ddosz-main",
    "name": "DDOSz-main",
    "description": "Authentic Mirai variant: DDOSz-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DDOSz-main"
  },
  {
    "id": "mirai-draco-1.9-private-hybrid",
    "name": "DRACO 1.9 PRIVATE HYBRID",
    "description": "Authentic Mirai variant: DRACO 1.9 PRIVATE HYBRID. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DRACO 1.9 PRIVATE HYBRID"
  },
  {
    "id": "mirai-draco_1.9_private_hybrid",
    "name": "DRACO_1.9_PRIVATE_HYBRID",
    "description": "Authentic Mirai variant: DRACO_1.9_PRIVATE_HYBRID. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DRACO_1.9_PRIVATE_HYBRID"
  },
  {
    "id": "mirai-diablo-private-mirai",
    "name": "Diablo Private Mirai",
    "description": "Authentic Mirai variant: Diablo Private Mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Diablo Private Mirai"
  },
  {
    "id": "mirai-diablo_private",
    "name": "Diablo_Private",
    "description": "Authentic Mirai variant: Diablo_Private. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Diablo_Private"
  },
  {
    "id": "mirai-dirtz-net",
    "name": "Dirtz Net",
    "description": "Authentic Mirai variant: Dirtz Net. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Dirtz Net"
  },
  {
    "id": "mirai-dirtznet",
    "name": "DirtzNet",
    "description": "Authentic Mirai variant: DirtzNet. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DirtzNet"
  },
  {
    "id": "mirai-divinemiraivariant",
    "name": "DivineMiraiVariant",
    "description": "Authentic Mirai variant: DivineMiraiVariant. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DivineMiraiVariant"
  },
  {
    "id": "mirai-dripsource",
    "name": "DripSource",
    "description": "Authentic Mirai variant: DripSource. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/DripSource"
  },
  {
    "id": "mirai-extendo",
    "name": "Extendo",
    "description": "Authentic Mirai variant: Extendo. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Extendo"
  },
  {
    "id": "mirai-fbi-source",
    "name": "FBI Source",
    "description": "Authentic Mirai variant: FBI Source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/FBI Source"
  },
  {
    "id": "mirai-fbi_source",
    "name": "FBI_Source",
    "description": "Authentic Mirai variant: FBI_Source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/FBI_Source"
  },
  {
    "id": "mirai-fakeomni",
    "name": "FakeOmni",
    "description": "Authentic Mirai variant: FakeOmni. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/FakeOmni"
  },
  {
    "id": "mirai-freya",
    "name": "Freya",
    "description": "Authentic Mirai variant: Freya. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Freya"
  },
  {
    "id": "mirai-greeks_source",
    "name": "Greeks_Source",
    "description": "Authentic Mirai variant: Greeks_Source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Greeks_Source"
  },
  {
    "id": "mirai-gucci-(remastered)",
    "name": "Gucci (remastered)",
    "description": "Authentic Mirai variant: Gucci (remastered). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Gucci (remastered)"
  },
  {
    "id": "mirai-gucci-mirai-botnet-main",
    "name": "Gucci-Mirai-Botnet-main",
    "description": "Authentic Mirai variant: Gucci-Mirai-Botnet-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Gucci-Mirai-Botnet-main"
  },
  {
    "id": "mirai-gucci_remastered",
    "name": "Gucci_remastered",
    "description": "Authentic Mirai variant: Gucci_remastered. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Gucci_remastered"
  },
  {
    "id": "mirai-hakai",
    "name": "Hakai",
    "description": "Authentic Mirai variant: Hakai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hakai"
  },
  {
    "id": "mirai-hilix-6.0",
    "name": "Hilix 6.0",
    "description": "Authentic Mirai variant: Hilix 6.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hilix 6.0"
  },
  {
    "id": "mirai-hilix_6.0",
    "name": "Hilix_6.0",
    "description": "Authentic Mirai variant: Hilix_6.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hilix_6.0"
  },
  {
    "id": "mirai-hito",
    "name": "Hito",
    "description": "Authentic Mirai variant: Hito. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hito"
  },
  {
    "id": "mirai-hito-leak-by-mezy#1337",
    "name": "Hito Leak by Mezy#1337",
    "description": "Authentic Mirai variant: Hito Leak by Mezy#1337. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hito Leak by Mezy#1337"
  },
  {
    "id": "mirai-hitori",
    "name": "Hitori",
    "description": "Authentic Mirai variant: Hitori. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hitori"
  },
  {
    "id": "mirai-hitori_by_slumpx",
    "name": "Hitori_by_slumpx",
    "description": "Authentic Mirai variant: Hitori_by_slumpx. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hitori_by_slumpx"
  },
  {
    "id": "mirai-hoho-but-with-ensure-single-instance",
    "name": "HoHo but with ensure single instance",
    "description": "Authentic Mirai variant: HoHo but with ensure single instance. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/HoHo but with ensure single instance"
  },
  {
    "id": "mirai-hohobutwithensuresingleinstance",
    "name": "HoHobutwithensuresingleinstance",
    "description": "Authentic Mirai variant: HoHobutwithensuresingleinstance. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/HoHobutwithensuresingleinstance"
  },
  {
    "id": "mirai-horizon-updated",
    "name": "Horizon Updated",
    "description": "Authentic Mirai variant: Horizon Updated. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Horizon Updated"
  },
  {
    "id": "mirai-horizon_updated",
    "name": "Horizon_Updated",
    "description": "Authentic Mirai variant: Horizon_Updated. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Horizon_Updated"
  },
  {
    "id": "mirai-hybrid",
    "name": "Hybrid",
    "description": "Authentic Mirai variant: Hybrid. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hybrid"
  },
  {
    "id": "mirai-hybrid-v420",
    "name": "Hybrid v420",
    "description": "Authentic Mirai variant: Hybrid v420. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hybrid v420"
  },
  {
    "id": "mirai-hybrid(1)",
    "name": "Hybrid(1)",
    "description": "Authentic Mirai variant: Hybrid(1). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Hybrid(1)"
  },
  {
    "id": "mirai-infectednight",
    "name": "Infectednight",
    "description": "Authentic Mirai variant: Infectednight. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Infectednight"
  },
  {
    "id": "mirai-infectednight-main",
    "name": "Infectednight-main",
    "description": "Authentic Mirai variant: Infectednight-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Infectednight-main"
  },
  {
    "id": "mirai-joker-mirai-botnet-source-v1-main",
    "name": "Joker-Mirai-Botnet-Source-V1-main",
    "description": "Authentic Mirai variant: Joker-Mirai-Botnet-Source-V1-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Joker-Mirai-Botnet-Source-V1-main"
  },
  {
    "id": "mirai-josho-v3",
    "name": "Josho v3",
    "description": "Authentic Mirai variant: Josho v3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Josho v3"
  },
  {
    "id": "mirai-joshov3",
    "name": "Joshov3",
    "description": "Authentic Mirai variant: Joshov3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Joshov3"
  },
  {
    "id": "mirai-kalon",
    "name": "Kalon",
    "description": "Authentic Mirai variant: Kalon. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kalon"
  },
  {
    "id": "mirai-kanashi-v3",
    "name": "Kanashi v3",
    "description": "Authentic Mirai variant: Kanashi v3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kanashi v3"
  },
  {
    "id": "mirai-kanashiv3",
    "name": "Kanashiv3",
    "description": "Authentic Mirai variant: Kanashiv3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kanashiv3"
  },
  {
    "id": "mirai-karuto-version-1.0",
    "name": "Karuto Version 1.0",
    "description": "Authentic Mirai variant: Karuto Version 1.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Karuto Version 1.0"
  },
  {
    "id": "mirai-karutoversion1.0",
    "name": "KarutoVersion1.0",
    "description": "Authentic Mirai variant: KarutoVersion1.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/KarutoVersion1.0"
  },
  {
    "id": "mirai-katrina_v1",
    "name": "Katrina_V1",
    "description": "Authentic Mirai variant: Katrina_V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Katrina_V1"
  },
  {
    "id": "mirai-kingofzerov4",
    "name": "KingOfZerov4",
    "description": "Authentic Mirai variant: KingOfZerov4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/KingOfZerov4"
  },
  {
    "id": "mirai-kingdom_",
    "name": "Kingdom_",
    "description": "Authentic Mirai variant: Kingdom_. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kingdom_"
  },
  {
    "id": "mirai-kira",
    "name": "Kira",
    "description": "Authentic Mirai variant: Kira. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kira"
  },
  {
    "id": "mirai-kira-botnet-main",
    "name": "Kira-Botnet-main",
    "description": "Authentic Mirai variant: Kira-Botnet-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kira-Botnet-main"
  },
  {
    "id": "mirai-kuria",
    "name": "Kuria",
    "description": "Authentic Mirai variant: Kuria. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kuria"
  },
  {
    "id": "mirai-kwari_2.0",
    "name": "Kwari_2.0",
    "description": "Authentic Mirai variant: Kwari_2.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Kwari_2.0"
  },
  {
    "id": "mirai-l33t-v4",
    "name": "L33T v4",
    "description": "Authentic Mirai variant: L33T v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/L33T v4"
  },
  {
    "id": "mirai-l33tv4",
    "name": "L33Tv4",
    "description": "Authentic Mirai variant: L33Tv4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/L33Tv4"
  },
  {
    "id": "mirai-legit_horizon",
    "name": "LeGiT_hOrIzOn",
    "description": "Authentic Mirai variant: LeGiT_hOrIzOn. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/LeGiT_hOrIzOn"
  },
  {
    "id": "mirai-lighter",
    "name": "LiGhter",
    "description": "Authentic Mirai variant: LiGhter. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/LiGhter"
  },
  {
    "id": "mirai-lockbox",
    "name": "LockBox",
    "description": "Authentic Mirai variant: LockBox. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/LockBox"
  },
  {
    "id": "mirai-mirai-kanashi",
    "name": "MIRAI KANASHI",
    "description": "Authentic Mirai variant: MIRAI KANASHI. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MIRAI KANASHI"
  },
  {
    "id": "mirai-miraikanashi",
    "name": "MIRAIKANASHI",
    "description": "Authentic Mirai variant: MIRAIKANASHI. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MIRAIKANASHI"
  },
  {
    "id": "mirai-maccas",
    "name": "Maccas",
    "description": "Authentic Mirai variant: Maccas. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Maccas"
  },
  {
    "id": "mirai-mana_v4.1",
    "name": "Mana_v4.1",
    "description": "Authentic Mirai variant: Mana_v4.1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Mana_v4.1"
  },
  {
    "id": "mirai-masuta",
    "name": "Masuta",
    "description": "Authentic Mirai variant: Masuta. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Masuta"
  },
  {
    "id": "mirai-matic-v1",
    "name": "Matic V1",
    "description": "Authentic Mirai variant: Matic V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Matic V1"
  },
  {
    "id": "mirai-maticv1",
    "name": "MaticV1",
    "description": "Authentic Mirai variant: MaticV1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MaticV1"
  },
  {
    "id": "mirai-melodic",
    "name": "Melodic",
    "description": "Authentic Mirai variant: Melodic. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Melodic"
  },
  {
    "id": "mirai-messiah-edited",
    "name": "Messiah Edited",
    "description": "Authentic Mirai variant: Messiah Edited. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Messiah Edited"
  },
  {
    "id": "mirai-messiah-v1",
    "name": "Messiah V1",
    "description": "Authentic Mirai variant: Messiah V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Messiah V1"
  },
  {
    "id": "mirai-messiahedited",
    "name": "MessiahEdited",
    "description": "Authentic Mirai variant: MessiahEdited. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MessiahEdited"
  },
  {
    "id": "mirai-messiahv1",
    "name": "MessiahV1",
    "description": "Authentic Mirai variant: MessiahV1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MessiahV1"
  },
  {
    "id": "mirai-mirai-universal-semi-auto-installer",
    "name": "Mirai Universal Semi-Auto Installer",
    "description": "Authentic Mirai variant: Mirai Universal Semi-Auto Installer. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Mirai Universal Semi-Auto Installer"
  },
  {
    "id": "mirai-mirai-variant",
    "name": "Mirai Variant",
    "description": "Authentic Mirai variant: Mirai Variant. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Mirai Variant"
  },
  {
    "id": "mirai-mirai_universal",
    "name": "Mirai_Universal",
    "description": "Authentic Mirai variant: Mirai_Universal. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Mirai_Universal"
  },
  {
    "id": "mirai-mirai_variant",
    "name": "Mirai_Variant",
    "description": "Authentic Mirai variant: Mirai_Variant. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Mirai_Variant"
  },
  {
    "id": "mirai-moeru-version-1.0",
    "name": "Moeru Version 1.0",
    "description": "Authentic Mirai variant: Moeru Version 1.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Moeru Version 1.0"
  },
  {
    "id": "mirai-moeruversion1.0",
    "name": "MoeruVersion1.0",
    "description": "Authentic Mirai variant: MoeruVersion1.0. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/MoeruVersion1.0"
  },
  {
    "id": "mirai-nyrox",
    "name": "Nyrox",
    "description": "Authentic Mirai variant: Nyrox. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Nyrox"
  },
  {
    "id": "mirai-nyrox_1",
    "name": "Nyrox_1",
    "description": "Authentic Mirai variant: Nyrox_1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Nyrox_1"
  },
  {
    "id": "mirai-op_owari",
    "name": "OP_OWARI",
    "description": "Authentic Mirai variant: OP_OWARI. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/OP_OWARI"
  },
  {
    "id": "mirai-okane",
    "name": "Okane",
    "description": "Authentic Mirai variant: Okane. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Okane"
  },
  {
    "id": "mirai-omni_private",
    "name": "Omni_Private",
    "description": "Authentic Mirai variant: Omni_Private. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Omni_Private"
  },
  {
    "id": "mirai-onryo",
    "name": "Onryo",
    "description": "Authentic Mirai variant: Onryo. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Onryo"
  },
  {
    "id": "mirai-owari-",
    "name": "Owari ",
    "description": "Authentic Mirai variant: Owari . Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Owari "
  },
  {
    "id": "mirai-owariv2",
    "name": "OwariV2",
    "description": "Authentic Mirai variant: OwariV2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/OwariV2"
  },
  {
    "id": "mirai-owari_reborn",
    "name": "Owari_Reborn",
    "description": "Authentic Mirai variant: Owari_Reborn. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Owari_Reborn"
  },
  {
    "id": "mirai-owarimod",
    "name": "Owarimod",
    "description": "Authentic Mirai variant: Owarimod. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Owarimod"
  },
  {
    "id": "mirai-private-mirai-meerkat-botnet-source-main",
    "name": "PRIVATE-Mirai-Meerkat-Botnet-Source-main",
    "description": "Authentic Mirai variant: PRIVATE-Mirai-Meerkat-Botnet-Source-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/PRIVATE-Mirai-Meerkat-Botnet-Source-main"
  },
  {
    "id": "mirai-pandora",
    "name": "Pandora",
    "description": "Authentic Mirai variant: Pandora. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Pandora"
  },
  {
    "id": "mirai-plex-v4",
    "name": "Plex v4",
    "description": "Authentic Mirai variant: Plex v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Plex v4"
  },
  {
    "id": "mirai-plexv4",
    "name": "Plexv4",
    "description": "Authentic Mirai variant: Plexv4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Plexv4"
  },
  {
    "id": "mirai-priority-(2)",
    "name": "Priority (2)",
    "description": "Authentic Mirai variant: Priority (2). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Priority (2)"
  },
  {
    "id": "mirai-priority_3",
    "name": "Priority_3",
    "description": "Authentic Mirai variant: Priority_3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Priority_3"
  },
  {
    "id": "mirai-private",
    "name": "Private",
    "description": "Authentic Mirai variant: Private. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private"
  },
  {
    "id": "mirai-private-2022",
    "name": "Private 2022",
    "description": "Authentic Mirai variant: Private 2022. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private 2022"
  },
  {
    "id": "mirai-private-goon",
    "name": "Private Goon",
    "description": "Authentic Mirai variant: Private Goon. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private Goon"
  },
  {
    "id": "mirai-private-mirai-meerkat",
    "name": "Private Mirai Meerkat",
    "description": "Authentic Mirai variant: Private Mirai Meerkat. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private Mirai Meerkat"
  },
  {
    "id": "mirai-private5",
    "name": "Private5",
    "description": "Authentic Mirai variant: Private5. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private5"
  },
  {
    "id": "mirai-privatemorai",
    "name": "PrivateMorai",
    "description": "Authentic Mirai variant: PrivateMorai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/PrivateMorai"
  },
  {
    "id": "mirai-private_2022",
    "name": "Private_2022",
    "description": "Authentic Mirai variant: Private_2022. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private_2022"
  },
  {
    "id": "mirai-private_goon",
    "name": "Private_Goon",
    "description": "Authentic Mirai variant: Private_Goon. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private_Goon"
  },
  {
    "id": "mirai-private_mirai_meerkat",
    "name": "Private_Mirai_Meerkat",
    "description": "Authentic Mirai variant: Private_Mirai_Meerkat. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Private_Mirai_Meerkat"
  },
  {
    "id": "mirai-project",
    "name": "Project",
    "description": "Authentic Mirai variant: Project. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Project"
  },
  {
    "id": "mirai-real_owari",
    "name": "Real_Owari",
    "description": "Authentic Mirai variant: Real_Owari. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Real_Owari"
  },
  {
    "id": "mirai-rpcsecurity",
    "name": "RpcSecurity",
    "description": "Authentic Mirai variant: RpcSecurity. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/RpcSecurity"
  },
  {
    "id": "mirai-salvia",
    "name": "Salvia",
    "description": "Authentic Mirai variant: Salvia. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Salvia"
  },
  {
    "id": "mirai-satan",
    "name": "Satan",
    "description": "Authentic Mirai variant: Satan. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Satan"
  },
  {
    "id": "mirai-shinka",
    "name": "Shinka",
    "description": "Authentic Mirai variant: Shinka. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Shinka"
  },
  {
    "id": "mirai-shinto-v4",
    "name": "Shinto-V4",
    "description": "Authentic Mirai variant: Shinto-V4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Shinto-V4"
  },
  {
    "id": "mirai-shinto-v5",
    "name": "Shinto-V5",
    "description": "Authentic Mirai variant: Shinto-V5. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Shinto-V5"
  },
  {
    "id": "mirai-sora",
    "name": "Sora",
    "description": "Authentic Mirai variant: Sora. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Sora"
  },
  {
    "id": "mirai-squidward",
    "name": "Squidward",
    "description": "Authentic Mirai variant: Squidward. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Squidward"
  },
  {
    "id": "mirai-storm",
    "name": "Storm",
    "description": "Authentic Mirai variant: Storm. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Storm"
  },
  {
    "id": "mirai-switch",
    "name": "Switch",
    "description": "Authentic Mirai variant: Switch. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Switch"
  },
  {
    "id": "mirai-switch-2",
    "name": "Switch-2",
    "description": "Authentic Mirai variant: Switch-2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Switch-2"
  },
  {
    "id": "mirai-sythe",
    "name": "Sythe",
    "description": "Authentic Mirai variant: Sythe. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Sythe"
  },
  {
    "id": "mirai-timeout_sec_-_l7_-_v1",
    "name": "Timeout_Sec_-_L7_-_V1",
    "description": "Authentic Mirai variant: Timeout_Sec_-_L7_-_V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Timeout_Sec_-_L7_-_V1"
  },
  {
    "id": "mirai-tokyo",
    "name": "Tokyo",
    "description": "Authentic Mirai variant: Tokyo. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tokyo"
  },
  {
    "id": "mirai-tokyo_private",
    "name": "Tokyo_private",
    "description": "Authentic Mirai variant: Tokyo_private. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tokyo_private"
  },
  {
    "id": "mirai-tsunami-v3",
    "name": "Tsunami v3",
    "description": "Authentic Mirai variant: Tsunami v3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tsunami v3"
  },
  {
    "id": "mirai-tsunami-v4",
    "name": "Tsunami v4",
    "description": "Authentic Mirai variant: Tsunami v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tsunami v4"
  },
  {
    "id": "mirai-tsunami_v1",
    "name": "Tsunami_v1",
    "description": "Authentic Mirai variant: Tsunami_v1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tsunami_v1"
  },
  {
    "id": "mirai-tsunami_v3",
    "name": "Tsunami_v3",
    "description": "Authentic Mirai variant: Tsunami_v3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tsunami_v3"
  },
  {
    "id": "mirai-tsunami_v4",
    "name": "Tsunami_v4",
    "description": "Authentic Mirai variant: Tsunami_v4. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Tsunami_v4"
  },
  {
    "id": "mirai-whitehat_private",
    "name": "WhiteHat_Private",
    "description": "Authentic Mirai variant: WhiteHat_Private. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/WhiteHat_Private"
  },
  {
    "id": "mirai-x",
    "name": "X",
    "description": "Authentic Mirai variant: X. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/X"
  },
  {
    "id": "mirai-xova",
    "name": "Xova",
    "description": "Authentic Mirai variant: Xova. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Xova"
  },
  {
    "id": "mirai-xovatest",
    "name": "XovaTest",
    "description": "Authentic Mirai variant: XovaTest. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/XovaTest"
  },
  {
    "id": "mirai-xovatest_v3",
    "name": "XovaTest_v3",
    "description": "Authentic Mirai variant: XovaTest_v3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/XovaTest_v3"
  },
  {
    "id": "mirai-ybotv2",
    "name": "YBotV2",
    "description": "Authentic Mirai variant: YBotV2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/YBotV2"
  },
  {
    "id": "mirai-yakuza",
    "name": "Yakuza",
    "description": "Authentic Mirai variant: Yakuza. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Yakuza"
  },
  {
    "id": "mirai-yukari-(layer7-included)",
    "name": "Yukari (Layer7 included)",
    "description": "Authentic Mirai variant: Yukari (Layer7 included). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Yukari (Layer7 included)"
  },
  {
    "id": "mirai-yukari(layer7included)",
    "name": "Yukari(Layer7included)",
    "description": "Authentic Mirai variant: Yukari(Layer7included). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Yukari(Layer7included)"
  },
  {
    "id": "mirai-zapon",
    "name": "Zapon",
    "description": "Authentic Mirai variant: Zapon. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/Zapon"
  },
  {
    "id": "mirai-[mirai]-$-joker-v1-$",
    "name": "[MIRAI] $ Joker V1 $",
    "description": "Authentic Mirai variant: [MIRAI] $ Joker V1 $. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] $ Joker V1 $"
  },
  {
    "id": "mirai-[mirai]-amens-source(dingding)",
    "name": "[MIRAI] Amens Source(dingding)",
    "description": "Authentic Mirai variant: [MIRAI] Amens Source(dingding). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Amens Source(dingding)"
  },
  {
    "id": "mirai-[mirai]-amens-source(dingding)uptodat2",
    "name": "[MIRAI] Amens Source(dingding)uptodat2",
    "description": "Authentic Mirai variant: [MIRAI] Amens Source(dingding)uptodat2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Amens Source(dingding)uptodat2"
  },
  {
    "id": "mirai-[mirai]-amens-source(dingding)uptodate",
    "name": "[MIRAI] Amens Source(dingding)uptodate",
    "description": "Authentic Mirai variant: [MIRAI] Amens Source(dingding)uptodate. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Amens Source(dingding)uptodate"
  },
  {
    "id": "mirai-[mirai]-axis-r",
    "name": "[MIRAI] Axis-R",
    "description": "Authentic Mirai variant: [MIRAI] Axis-R. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Axis-R"
  },
  {
    "id": "mirai-[mirai]-badwolf",
    "name": "[MIRAI] Badwolf",
    "description": "Authentic Mirai variant: [MIRAI] Badwolf. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Badwolf"
  },
  {
    "id": "mirai-[mirai]-batman",
    "name": "[MIRAI] Batman",
    "description": "Authentic Mirai variant: [MIRAI] Batman. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Batman"
  },
  {
    "id": "mirai-[mirai]-beastmode-v",
    "name": "[MIRAI] BeastMode V",
    "description": "Authentic Mirai variant: [MIRAI] BeastMode V. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] BeastMode V"
  },
  {
    "id": "mirai-[mirai]-beastmodev6",
    "name": "[MIRAI] BeastModeV6",
    "description": "Authentic Mirai variant: [MIRAI] BeastModeV6. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] BeastModeV6"
  },
  {
    "id": "mirai-[mirai]-c.m.v",
    "name": "[MIRAI] C.M.V",
    "description": "Authentic Mirai variant: [MIRAI] C.M.V. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] C.M.V"
  },
  {
    "id": "mirai-[mirai]-caligulav2",
    "name": "[MIRAI] Caligulav2",
    "description": "Authentic Mirai variant: [MIRAI] Caligulav2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Caligulav2"
  },
  {
    "id": "mirai-[mirai]-cayosin-v3-leaked-version",
    "name": "[MIRAI] Cayosin V3 Leaked Version",
    "description": "Authentic Mirai variant: [MIRAI] Cayosin V3 Leaked Version. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Cayosin V3 Leaked Version"
  },
  {
    "id": "mirai-[mirai]-cayosin-v3-actual",
    "name": "[MIRAI] Cayosin v3 actual",
    "description": "Authentic Mirai variant: [MIRAI] Cayosin v3 actual. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Cayosin v3 actual"
  },
  {
    "id": "mirai-[mirai]-cayosin-v3-nigger",
    "name": "[MIRAI] Cayosin v3 nigger",
    "description": "Authentic Mirai variant: [MIRAI] Cayosin v3 nigger. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Cayosin v3 nigger"
  },
  {
    "id": "mirai-[mirai]-cronical",
    "name": "[MIRAI] Cronical",
    "description": "Authentic Mirai variant: [MIRAI] Cronical. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Cronical"
  },
  {
    "id": "mirai-[mirai]-cyka",
    "name": "[MIRAI] Cyka",
    "description": "Authentic Mirai variant: [MIRAI] Cyka. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] Cyka"
  },
  {
    "id": "mirai-[mirai]-daddysmirai-v1",
    "name": "[MIRAI] DaddysMirai-V1",
    "description": "Authentic Mirai variant: [MIRAI] DaddysMirai-V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] DaddysMirai-V1"
  },
  {
    "id": "mirai-[mirai]-daddysmirai-v3",
    "name": "[MIRAI] DaddysMirai-V3",
    "description": "Authentic Mirai variant: [MIRAI] DaddysMirai-V3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI] DaddysMirai-V3"
  },
  {
    "id": "mirai-[mirai]$jokerv1$",
    "name": "[MIRAI]$JokerV1$",
    "description": "Authentic Mirai variant: [MIRAI]$JokerV1$. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]$JokerV1$"
  },
  {
    "id": "mirai-[mirai]amenssource(dingding)",
    "name": "[MIRAI]AmensSource(dingding)",
    "description": "Authentic Mirai variant: [MIRAI]AmensSource(dingding). Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]AmensSource(dingding)"
  },
  {
    "id": "mirai-[mirai]amenssource(dingding)uptodat2",
    "name": "[MIRAI]AmensSource(dingding)uptodat2",
    "description": "Authentic Mirai variant: [MIRAI]AmensSource(dingding)uptodat2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]AmensSource(dingding)uptodat2"
  },
  {
    "id": "mirai-[mirai]amenssource(dingding)uptodate",
    "name": "[MIRAI]AmensSource(dingding)uptodate",
    "description": "Authentic Mirai variant: [MIRAI]AmensSource(dingding)uptodate. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]AmensSource(dingding)uptodate"
  },
  {
    "id": "mirai-[mirai]axis-r",
    "name": "[MIRAI]Axis-R",
    "description": "Authentic Mirai variant: [MIRAI]Axis-R. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Axis-R"
  },
  {
    "id": "mirai-[mirai]badwolf",
    "name": "[MIRAI]Badwolf",
    "description": "Authentic Mirai variant: [MIRAI]Badwolf. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Badwolf"
  },
  {
    "id": "mirai-[mirai]batman",
    "name": "[MIRAI]Batman",
    "description": "Authentic Mirai variant: [MIRAI]Batman. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Batman"
  },
  {
    "id": "mirai-[mirai]beastmodev",
    "name": "[MIRAI]BeastModeV",
    "description": "Authentic Mirai variant: [MIRAI]BeastModeV. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]BeastModeV"
  },
  {
    "id": "mirai-[mirai]beastmodev6",
    "name": "[MIRAI]BeastModeV6",
    "description": "Authentic Mirai variant: [MIRAI]BeastModeV6. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]BeastModeV6"
  },
  {
    "id": "mirai-[mirai]c.m.v",
    "name": "[MIRAI]C.M.V",
    "description": "Authentic Mirai variant: [MIRAI]C.M.V. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]C.M.V"
  },
  {
    "id": "mirai-[mirai]caligulav2",
    "name": "[MIRAI]Caligulav2",
    "description": "Authentic Mirai variant: [MIRAI]Caligulav2. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Caligulav2"
  },
  {
    "id": "mirai-[mirai]cayosinv3leakedversion",
    "name": "[MIRAI]CayosinV3LeakedVersion",
    "description": "Authentic Mirai variant: [MIRAI]CayosinV3LeakedVersion. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]CayosinV3LeakedVersion"
  },
  {
    "id": "mirai-[mirai]cayosinv3actual",
    "name": "[MIRAI]Cayosinv3actual",
    "description": "Authentic Mirai variant: [MIRAI]Cayosinv3actual. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Cayosinv3actual"
  },
  {
    "id": "mirai-[mirai]cayosinv3nigger",
    "name": "[MIRAI]Cayosinv3nigger",
    "description": "Authentic Mirai variant: [MIRAI]Cayosinv3nigger. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Cayosinv3nigger"
  },
  {
    "id": "mirai-[mirai]cronical",
    "name": "[MIRAI]Cronical",
    "description": "Authentic Mirai variant: [MIRAI]Cronical. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Cronical"
  },
  {
    "id": "mirai-[mirai]cyka",
    "name": "[MIRAI]Cyka",
    "description": "Authentic Mirai variant: [MIRAI]Cyka. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]Cyka"
  },
  {
    "id": "mirai-[mirai]daddysmirai-v1",
    "name": "[MIRAI]DaddysMirai-V1",
    "description": "Authentic Mirai variant: [MIRAI]DaddysMirai-V1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]DaddysMirai-V1"
  },
  {
    "id": "mirai-[mirai]daddysmirai-v3",
    "name": "[MIRAI]DaddysMirai-V3",
    "description": "Authentic Mirai variant: [MIRAI]DaddysMirai-V3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/[MIRAI]DaddysMirai-V3"
  },
  {
    "id": "mirai-__macosx",
    "name": "__MACOSX",
    "description": "Authentic Mirai variant: __MACOSX. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/__MACOSX"
  },
  {
    "id": "mirai-apollo-v1",
    "name": "apollo-v1",
    "description": "Authentic Mirai variant: apollo-v1. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/apollo-v1"
  },
  {
    "id": "mirai-banners",
    "name": "banners",
    "description": "Authentic Mirai variant: banners. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/banners"
  },
  {
    "id": "mirai-bin",
    "name": "bin",
    "description": "Authentic Mirai variant: bin. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/bin"
  },
  {
    "id": "mirai-bot",
    "name": "bot",
    "description": "Authentic Mirai variant: bot. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/bot"
  },
  {
    "id": "mirai-build",
    "name": "build",
    "description": "Authentic Mirai variant: build. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/build"
  },
  {
    "id": "mirai-cnc",
    "name": "cnc",
    "description": "Authentic Mirai variant: cnc. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/cnc"
  },
  {
    "id": "mirai-cosmic",
    "name": "cosmic",
    "description": "Authentic Mirai variant: cosmic. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/cosmic"
  },
  {
    "id": "mirai-dlr",
    "name": "dlr",
    "description": "Authentic Mirai variant: dlr. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/dlr"
  },
  {
    "id": "mirai-elordzprivate",
    "name": "eLordzPrivate",
    "description": "Authentic Mirai variant: eLordzPrivate. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/eLordzPrivate"
  },
  {
    "id": "mirai-elordz",
    "name": "elordz",
    "description": "Authentic Mirai variant: elordz. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/elordz"
  },
  {
    "id": "mirai-enc",
    "name": "enc",
    "description": "Authentic Mirai variant: enc. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/enc"
  },
  {
    "id": "mirai-furasshu",
    "name": "furasshu",
    "description": "Authentic Mirai variant: furasshu. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/furasshu"
  },
  {
    "id": "mirai-greekprivate",
    "name": "greekprivate",
    "description": "Authentic Mirai variant: greekprivate. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/greekprivate"
  },
  {
    "id": "mirai-hiroshima3",
    "name": "hiroshima3",
    "description": "Authentic Mirai variant: hiroshima3. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/hiroshima3"
  },
  {
    "id": "mirai-hiroshima3_source",
    "name": "hiroshima3_source",
    "description": "Authentic Mirai variant: hiroshima3_source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/hiroshima3_source"
  },
  {
    "id": "mirai-hiroshimastuff",
    "name": "hiroshimastuff",
    "description": "Authentic Mirai variant: hiroshimastuff. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/hiroshimastuff"
  },
  {
    "id": "mirai-hiroshimav5",
    "name": "hiroshimav5",
    "description": "Authentic Mirai variant: hiroshimav5. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/hiroshimav5"
  },
  {
    "id": "mirai-holy",
    "name": "holy",
    "description": "Authentic Mirai variant: holy. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/holy"
  },
  {
    "id": "mirai-holy-5b2e0ebe7db15d6b98376d6b3bb9a6efe90c603c",
    "name": "holy-5b2e0ebe7db15d6b98376d6b3bb9a6efe90c603c",
    "description": "Authentic Mirai variant: holy-5b2e0ebe7db15d6b98376d6b3bb9a6efe90c603c. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/holy-5b2e0ebe7db15d6b98376d6b3bb9a6efe90c603c"
  },
  {
    "id": "mirai-html",
    "name": "html",
    "description": "Authentic Mirai variant: html. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/html"
  },
  {
    "id": "mirai-humbleee",
    "name": "humbleee",
    "description": "Authentic Mirai variant: humbleee. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/humbleee"
  },
  {
    "id": "mirai-ice",
    "name": "ice",
    "description": "Authentic Mirai variant: ice. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/ice"
  },
  {
    "id": "mirai-kowai",
    "name": "kowai",
    "description": "Authentic Mirai variant: kowai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/kowai"
  },
  {
    "id": "mirai-load",
    "name": "load",
    "description": "Authentic Mirai variant: load. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/load"
  },
  {
    "id": "mirai-loader",
    "name": "loader",
    "description": "Authentic Mirai variant: loader. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/loader"
  },
  {
    "id": "mirai-logs",
    "name": "logs",
    "description": "Authentic Mirai variant: logs. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/logs"
  },
  {
    "id": "mirai-lol",
    "name": "lol",
    "description": "Authentic Mirai variant: lol. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/lol"
  },
  {
    "id": "mirai-milnet",
    "name": "milnet",
    "description": "Authentic Mirai variant: milnet. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/milnet"
  },
  {
    "id": "mirai-miori-remastered",
    "name": "miori remastered",
    "description": "Authentic Mirai variant: miori remastered. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/miori remastered"
  },
  {
    "id": "mirai-miori-v1.3-bot",
    "name": "miori v1.3 bot",
    "description": "Authentic Mirai variant: miori v1.3 bot. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/miori v1.3 bot"
  },
  {
    "id": "mirai-miori_v1.3_bot",
    "name": "miori_v1.3_bot",
    "description": "Authentic Mirai variant: miori_v1.3_bot. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/miori_v1.3_bot"
  },
  {
    "id": "mirai-mioriremastered",
    "name": "mioriremastered",
    "description": "Authentic Mirai variant: mioriremastered. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/mioriremastered"
  },
  {
    "id": "mirai-mirai",
    "name": "mirai",
    "description": "Authentic Mirai variant: mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/mirai"
  },
  {
    "id": "mirai-mirai-main",
    "name": "mirai-main",
    "description": "Authentic Mirai variant: mirai-main. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/mirai-main"
  },
  {
    "id": "mirai-naku",
    "name": "naku",
    "description": "Authentic Mirai variant: naku. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/naku"
  },
  {
    "id": "mirai-omni",
    "name": "omni",
    "description": "Authentic Mirai variant: omni. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/omni"
  },
  {
    "id": "mirai-osiris-mirai-source",
    "name": "osiris mirai source",
    "description": "Authentic Mirai variant: osiris mirai source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/osiris mirai source"
  },
  {
    "id": "mirai-osiris_mirai_source",
    "name": "osiris_mirai_source",
    "description": "Authentic Mirai variant: osiris_mirai_source. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/osiris_mirai_source"
  },
  {
    "id": "mirai-owo",
    "name": "owo",
    "description": "Authentic Mirai variant: owo. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/owo"
  },
  {
    "id": "mirai-phantom",
    "name": "phantom",
    "description": "Authentic Mirai variant: phantom. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/phantom"
  },
  {
    "id": "mirai-priv_mirai",
    "name": "priv_mirai",
    "description": "Authentic Mirai variant: priv_mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/priv_mirai"
  },
  {
    "id": "mirai-private_pandora",
    "name": "private_pandora",
    "description": "Authentic Mirai variant: private_pandora. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/private_pandora"
  },
  {
    "id": "mirai-release",
    "name": "release",
    "description": "Authentic Mirai variant: release. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/release"
  },
  {
    "id": "mirai-satori",
    "name": "satori",
    "description": "Authentic Mirai variant: satori. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/satori"
  },
  {
    "id": "mirai-serverdown.mirai",
    "name": "serverdown.mirai",
    "description": "Authentic Mirai variant: serverdown.mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/serverdown.mirai"
  },
  {
    "id": "mirai-sex",
    "name": "sex",
    "description": "Authentic Mirai variant: sex. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/sex"
  },
  {
    "id": "mirai-slumpx",
    "name": "slumpx",
    "description": "Authentic Mirai variant: slumpx. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/slumpx"
  },
  {
    "id": "mirai-tools",
    "name": "tools",
    "description": "Authentic Mirai variant: tools. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/tools"
  },
  {
    "id": "mirai-tsuki",
    "name": "tsuki",
    "description": "Authentic Mirai variant: tsuki. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/tsuki"
  },
  {
    "id": "mirai-zehir-botnet-mirai",
    "name": "zehir-botnet-mirai",
    "description": "Authentic Mirai variant: zehir-botnet-mirai. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/zehir-botnet-mirai"
  },
  {
    "id": "mirai-zex",
    "name": "zex",
    "description": "Authentic Mirai variant: zex. Full source code integrated.",
    "icon": "fa-microchip",
    "color": "text-gray-400",
    "category": "Mirai Botnets",
    "sourcePath": "/home/ubuntu/extracted_tools/zex"
  },
  {
    "id": "script-anonnews_irc",
    "name": "AnonNews_irc.py",
    "description": "Authentic python tools script: AnonNews_irc.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/AnonNews_irc.py"
  },
  {
    "id": "script-browserv2",
    "name": "BROWSERV2.js",
    "description": "Authentic javascript attacks script: BROWSERV2.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/BROWSERV2.js"
  },
  {
    "id": "script-browser",
    "name": "Browser.js",
    "description": "Authentic javascript attacks script: Browser.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/Browser.js"
  },
  {
    "id": "script-cf-flooder",
    "name": "CF-Flooder.js",
    "description": "Authentic javascript attacks script: CF-Flooder.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/CF-Flooder.js"
  },
  {
    "id": "script-cf-glacier",
    "name": "CF-GLACIER.js",
    "description": "Authentic javascript attacks script: CF-GLACIER.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/CF-GLACIER.js"
  },
  {
    "id": "script-cfb",
    "name": "CFB.js",
    "description": "Authentic javascript attacks script: CFB.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/CFB.js"
  },
  {
    "id": "script-cfbypass",
    "name": "CFBypass.js",
    "description": "Authentic javascript attacks script: CFBypass.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/CFBypass.js"
  },
  {
    "id": "script-exploit",
    "name": "Exploit.py",
    "description": "Authentic python tools script: Exploit.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/Exploit.py"
  },
  {
    "id": "script-http-engine",
    "name": "HTTP-ENGINE.js",
    "description": "Authentic javascript attacks script: HTTP-ENGINE.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-ENGINE.js"
  },
  {
    "id": "script-http-get",
    "name": "HTTP-GET.js",
    "description": "Authentic javascript attacks script: HTTP-GET.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-GET.js"
  },
  {
    "id": "script-http-mix",
    "name": "HTTP-MIX.js",
    "description": "Authentic javascript attacks script: HTTP-MIX.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-MIX.js"
  },
  {
    "id": "script-http-mixv2",
    "name": "HTTP-MIXv2.js",
    "description": "Authentic javascript attacks script: HTTP-MIXv2.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-MIXv2.js"
  },
  {
    "id": "script-http-random",
    "name": "HTTP-RANDOM.js",
    "description": "Authentic javascript attacks script: HTTP-RANDOM.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-RANDOM.js"
  },
  {
    "id": "script-http-raw",
    "name": "HTTP-RAW.js",
    "description": "Authentic javascript attacks script: HTTP-RAW.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-RAW.js"
  },
  {
    "id": "script-http-socket",
    "name": "HTTP-SOCKET.js",
    "description": "Authentic javascript attacks script: HTTP-SOCKET.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-SOCKET.js"
  },
  {
    "id": "script-http-x",
    "name": "HTTP-X.js",
    "description": "Authentic javascript attacks script: HTTP-X.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/HTTP-X.js"
  },
  {
    "id": "script-hunter-scada4g",
    "name": "Hunter-Scada4G.py",
    "description": "Authentic python tools script: Hunter-Scada4G.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/Hunter-Scada4G.py"
  },
  {
    "id": "script-hunter_scada-v2",
    "name": "Hunter_scada-V2.py",
    "description": "Authentic python tools script: Hunter_scada-V2.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/Hunter_scada-V2.py"
  },
  {
    "id": "script-nuke",
    "name": "NUKE.js",
    "description": "Authentic javascript attacks script: NUKE.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/NUKE.js"
  },
  {
    "id": "script-samp",
    "name": "SAMP.js",
    "description": "Authentic javascript attacks script: SAMP.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/SAMP.js"
  },
  {
    "id": "script-superbet",
    "name": "SuperBet.py",
    "description": "Authentic python tools script: SuperBet.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/SuperBet.py"
  },
  {
    "id": "script-uam-rape",
    "name": "UAM-RAPE.js",
    "description": "Authentic javascript attacks script: UAM-RAPE.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/UAM-RAPE.js"
  },
  {
    "id": "script-war",
    "name": "WAR.js",
    "description": "Authentic javascript attacks script: WAR.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/WAR.js"
  },
  {
    "id": "script-whoamisec-arbitrary-auto-make-money",
    "name": "WHOAMISec-Arbitrary-Auto-make-money.py",
    "description": "Authentic python tools script: WHOAMISec-Arbitrary-Auto-make-money.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/WHOAMISec-Arbitrary-Auto-make-money.py"
  },
  {
    "id": "script-whoamisec-makermoney",
    "name": "WHOAMISec-MakerMoney.py",
    "description": "Authentic python tools script: WHOAMISec-MakerMoney.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/WHOAMISec-MakerMoney.py"
  },
  {
    "id": "script-whoamisec-superbet247",
    "name": "WHOAMISec-SuperBet247.py",
    "description": "Authentic python tools script: WHOAMISec-SuperBet247.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/WHOAMISec-SuperBet247.py"
  },
  {
    "id": "script-whoamisecmakemoney",
    "name": "WHOAMISecMakeMoney.py",
    "description": "Authentic python tools script: WHOAMISecMakeMoney.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/WHOAMISecMakeMoney.py"
  },
  {
    "id": "script-worm-destruction",
    "name": "Worm-Destruction.py",
    "description": "Authentic python tools script: Worm-Destruction.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/Worm-Destruction.py"
  },
  {
    "id": "script-worm-money-machine",
    "name": "Worm-Money-Machine.py",
    "description": "Authentic python tools script: Worm-Money-Machine.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/Worm-Money-Machine.py"
  },
  {
    "id": "script-wormmoneyv3",
    "name": "WormMoneyV3.py",
    "description": "Authentic python tools script: WormMoneyV3.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/WormMoneyV3.py"
  },
  {
    "id": "script-ai-burp-agent-0day",
    "name": "ai-burp-agent-0day.sh",
    "description": "Authentic shell scripts script: ai-burp-agent-0day.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ai-burp-agent-0day.sh"
  },
  {
    "id": "script-ai-exp-full-joke",
    "name": "ai-exp-full-joke.sh",
    "description": "Authentic shell scripts script: ai-exp-full-joke.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ai-exp-full-joke.sh"
  },
  {
    "id": "script-ai-suuces-jailbreak",
    "name": "ai-suuces-jailbreak.sh",
    "description": "Authentic shell scripts script: ai-suuces-jailbreak.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ai-suuces-jailbreak.sh"
  },
  {
    "id": "script-ai-w-kimi",
    "name": "ai-w-kimi.sh",
    "description": "Authentic shell scripts script: ai-w-kimi.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ai-w-kimi.sh"
  },
  {
    "id": "script-ai-zero-day",
    "name": "ai-zero-day.sh",
    "description": "Authentic shell scripts script: ai-zero-day.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ai-zero-day.sh"
  },
  {
    "id": "script-app",
    "name": "app.py",
    "description": "Authentic python tools script: app.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/app.py"
  },
  {
    "id": "script-black",
    "name": "black.js",
    "description": "Authentic javascript attacks script: black.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/black.js"
  },
  {
    "id": "script-blackhat-total",
    "name": "blackhat-total.sh",
    "description": "Authentic shell scripts script: blackhat-total.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/blackhat-total.sh"
  },
  {
    "id": "script-boom",
    "name": "boom.js",
    "description": "Authentic javascript attacks script: boom.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/boom.js"
  },
  {
    "id": "script-bot-bet-win",
    "name": "bot-Bet-Win.py",
    "description": "Authentic python tools script: bot-Bet-Win.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/bot-Bet-Win.py"
  },
  {
    "id": "script-bypass",
    "name": "bypass.js",
    "description": "Authentic javascript attacks script: bypass.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/bypass.js"
  },
  {
    "id": "script-ck-browser",
    "name": "ck-browser.js",
    "description": "Authentic javascript attacks script: ck-browser.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/ck-browser.js"
  },
  {
    "id": "script-cloudflare",
    "name": "cloudflare.js",
    "description": "Authentic javascript attacks script: cloudflare.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/cloudflare.js"
  },
  {
    "id": "script-codex",
    "name": "codex.py",
    "description": "Authentic python tools script: codex.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/codex.py"
  },
  {
    "id": "script-complete-ai-burp",
    "name": "complete-ai-burp.sh",
    "description": "Authentic shell scripts script: complete-ai-burp.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/complete-ai-burp.sh"
  },
  {
    "id": "script-cpanel-sxr",
    "name": "cpanel-sxr.py",
    "description": "Authentic python tools script: cpanel-sxr.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/cpanel-sxr.py"
  },
  {
    "id": "script-createadmin",
    "name": "createadmin.py",
    "description": "Authentic python tools script: createadmin.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/createadmin.py"
  },
  {
    "id": "script-cred",
    "name": "cred.py",
    "description": "Authentic python tools script: cred.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/cred.py"
  },
  {
    "id": "script-cve-2025-59287-encrypt",
    "name": "cve-2025-59287-encrypt.py",
    "description": "Authentic python tools script: cve-2025-59287-encrypt.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/cve-2025-59287-encrypt.py"
  },
  {
    "id": "script-cve-2025-59287-exp",
    "name": "cve-2025-59287-exp.py",
    "description": "Authentic python tools script: cve-2025-59287-exp.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/cve-2025-59287-exp.py"
  },
  {
    "id": "script-destroy",
    "name": "destroy.js",
    "description": "Authentic javascript attacks script: destroy.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/destroy.js"
  },
  {
    "id": "script-flashkiss",
    "name": "flashkiss.php",
    "description": "Authentic php tools script: flashkiss.php. Real executive tool.",
    "icon": "fa-code",
    "color": "text-indigo-400",
    "category": "PHP Tools",
    "sourcePath": "/home/ubuntu/upload/flashkiss.php"
  },
  {
    "id": "script-flood",
    "name": "flood.js",
    "description": "Authentic javascript attacks script: flood.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/flood.js"
  },
  {
    "id": "script-geckold",
    "name": "geckold.js",
    "description": "Authentic javascript attacks script: geckold.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/geckold.js"
  },
  {
    "id": "script-glory",
    "name": "glory.js",
    "description": "Authentic javascript attacks script: glory.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/glory.js"
  },
  {
    "id": "script-god",
    "name": "god.js",
    "description": "Authentic javascript attacks script: god.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/god.js"
  },
  {
    "id": "script-grab_scada_ips",
    "name": "grab_scada_ips.py",
    "description": "Authentic python tools script: grab_scada_ips.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/grab_scada_ips.py"
  },
  {
    "id": "script-holdv2",
    "name": "holdv2.js",
    "description": "Authentic javascript attacks script: holdv2.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/holdv2.js"
  },
  {
    "id": "script-index",
    "name": "index.js",
    "description": "Authentic javascript attacks script: index.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/index.js"
  },
  {
    "id": "script-inferno",
    "name": "inferno.js",
    "description": "Authentic javascript attacks script: inferno.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/inferno.js"
  },
  {
    "id": "script-install_and_deploy",
    "name": "install_and_deploy.sh",
    "description": "Authentic shell scripts script: install_and_deploy.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/install_and_deploy.sh"
  },
  {
    "id": "script-kill",
    "name": "kill.js",
    "description": "Authentic javascript attacks script: kill.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/kill.js"
  },
  {
    "id": "script-killer",
    "name": "killer.js",
    "description": "Authentic javascript attacks script: killer.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/killer.js"
  },
  {
    "id": "script-lezkill",
    "name": "lezkill.js",
    "description": "Authentic javascript attacks script: lezkill.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/lezkill.js"
  },
  {
    "id": "script-medusa",
    "name": "medusa.js",
    "description": "Authentic javascript attacks script: medusa.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/medusa.js"
  },
  {
    "id": "script-meris-flooder",
    "name": "meris-flooder.js",
    "description": "Authentic javascript attacks script: meris-flooder.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/meris-flooder.js"
  },
  {
    "id": "script-mix",
    "name": "mix.js",
    "description": "Authentic javascript attacks script: mix.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/mix.js"
  },
  {
    "id": "script-mixsyn",
    "name": "mixsyn.js",
    "description": "Authentic javascript attacks script: mixsyn.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/mixsyn.js"
  },
  {
    "id": "script-nflood",
    "name": "nflood.js",
    "description": "Authentic javascript attacks script: nflood.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/nflood.js"
  },
  {
    "id": "script-pentest",
    "name": "pentest.js",
    "description": "Authentic javascript attacks script: pentest.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/pentest.js"
  },
  {
    "id": "script-power",
    "name": "power.js",
    "description": "Authentic javascript attacks script: power.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/power.js"
  },
  {
    "id": "script-rand",
    "name": "rand.js",
    "description": "Authentic javascript attacks script: rand.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/rand.js"
  },
  {
    "id": "script-rape",
    "name": "rape.js",
    "description": "Authentic javascript attacks script: rape.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/rape.js"
  },
  {
    "id": "script-rapid",
    "name": "rapid.js",
    "description": "Authentic javascript attacks script: rapid.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/rapid.js"
  },
  {
    "id": "script-rapidv2",
    "name": "rapidv2.js",
    "description": "Authentic javascript attacks script: rapidv2.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/rapidv2.js"
  },
  {
    "id": "script-release_stuxnina",
    "name": "release_stuxnina.py",
    "description": "Authentic python tools script: release_stuxnina.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/release_stuxnina.py"
  },
  {
    "id": "script-sex",
    "name": "sex.js",
    "description": "Authentic javascript attacks script: sex.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/sex.js"
  },
  {
    "id": "script-skynet-tls",
    "name": "skynet-tls.js",
    "description": "Authentic javascript attacks script: skynet-tls.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/skynet-tls.js"
  },
  {
    "id": "script-spike",
    "name": "spike.js",
    "description": "Authentic javascript attacks script: spike.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/spike.js"
  },
  {
    "id": "script-starts",
    "name": "starts.js",
    "description": "Authentic javascript attacks script: starts.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/starts.js"
  },
  {
    "id": "script-storm",
    "name": "storm.js",
    "description": "Authentic javascript attacks script: storm.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/storm.js"
  },
  {
    "id": "script-strike",
    "name": "strike.js",
    "description": "Authentic javascript attacks script: strike.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/strike.js"
  },
  {
    "id": "script-tcp-flood",
    "name": "tcp-flood.js",
    "description": "Authentic javascript attacks script: tcp-flood.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tcp-flood.js"
  },
  {
    "id": "script-tcpkiller",
    "name": "tcpkiller.js",
    "description": "Authentic javascript attacks script: tcpkiller.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tcpkiller.js"
  },
  {
    "id": "script-testingsession",
    "name": "testingsession.py",
    "description": "Authentic python tools script: testingsession.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/testingsession.py"
  },
  {
    "id": "script-thunder",
    "name": "thunder.js",
    "description": "Authentic javascript attacks script: thunder.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/thunder.js"
  },
  {
    "id": "script-tls-bypass",
    "name": "tls-bypass.js",
    "description": "Authentic javascript attacks script: tls-bypass.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tls-bypass.js"
  },
  {
    "id": "script-tls-vip",
    "name": "tls-vip.js",
    "description": "Authentic javascript attacks script: tls-vip.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tls-vip.js"
  },
  {
    "id": "script-tls",
    "name": "tls.js",
    "description": "Authentic javascript attacks script: tls.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tls.js"
  },
  {
    "id": "script-tlsv1",
    "name": "tlsv1.js",
    "description": "Authentic javascript attacks script: tlsv1.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tlsv1.js"
  },
  {
    "id": "script-tlsv2",
    "name": "tlsv2.js",
    "description": "Authentic javascript attacks script: tlsv2.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tlsv2.js"
  },
  {
    "id": "script-tornado",
    "name": "tornado.js",
    "description": "Authentic javascript attacks script: tornado.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/tornado.js"
  },
  {
    "id": "script-uam",
    "name": "uam.js",
    "description": "Authentic javascript attacks script: uam.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/uam.js"
  },
  {
    "id": "script-ultimate-ai-cms",
    "name": "ultimate-ai-cms.sh",
    "description": "Authentic shell scripts script: ultimate-ai-cms.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ultimate-ai-cms.sh"
  },
  {
    "id": "script-ultimate-ai-exploit",
    "name": "ultimate-ai-exploit.rs",
    "description": "Authentic rust tools script: ultimate-ai-exploit.rs. Real executive tool.",
    "icon": "fa-gear",
    "color": "text-orange-400",
    "category": "Rust Tools",
    "sourcePath": "/home/ubuntu/upload/ultimate-ai-exploit.rs"
  },
  {
    "id": "script-ultimate-ai-full",
    "name": "ultimate-ai-full.sh",
    "description": "Authentic shell scripts script: ultimate-ai-full.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/ultimate-ai-full.sh"
  },
  {
    "id": "script-v14",
    "name": "v14.py",
    "description": "Authentic python tools script: v14.py. Real executive tool.",
    "icon": "fa-python",
    "color": "text-blue-400",
    "category": "Python Tools",
    "sourcePath": "/home/ubuntu/upload/v14.py"
  },
  {
    "id": "script-vxx",
    "name": "vxx.js",
    "description": "Authentic javascript attacks script: vxx.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/vxx.js"
  },
  {
    "id": "script-w-apocalypse",
    "name": "w-apocalypse.sh",
    "description": "Authentic shell scripts script: w-apocalypse.sh. Real executive tool.",
    "icon": "fa-terminal",
    "color": "text-emerald-400",
    "category": "Shell Scripts",
    "sourcePath": "/home/ubuntu/upload/w-apocalypse.sh"
  },
  {
    "id": "script-xlamper-bom",
    "name": "xlamper-bom.js",
    "description": "Authentic javascript attacks script: xlamper-bom.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/xlamper-bom.js"
  },
  {
    "id": "script-xlamper",
    "name": "xlamper.js",
    "description": "Authentic javascript attacks script: xlamper.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/xlamper.js"
  },
  {
    "id": "script-xweb",
    "name": "xweb.js",
    "description": "Authentic javascript attacks script: xweb.js. Real executive tool.",
    "icon": "fa-js",
    "color": "text-yellow-400",
    "category": "JavaScript Attacks",
    "sourcePath": "/home/ubuntu/upload/xweb.js"
  },
  {
    "id": "github-whm-un1c",
    "name": "WHOAMISEC PRO",
    "description": "Quantum Intelligence Platform with Botnet C2.",
    "icon": "fa-shield-halved",
    "color": "text-purple-500",
    "category": "Core Platform"
  },
  {
    "id": "github-aisnitch",
    "name": "AISnitch",
    "description": "AI CLI activity bridge.",
    "icon": "fa-bridge",
    "color": "text-cyan-400",
    "category": "AI & LLM"
  },
  {
    "id": "github-airecon",
    "name": "AIRecon",
    "description": "Autonomous cybersecurity agent (Ollama + Kali).",
    "icon": "fa-user-secret",
    "color": "text-gray-500",
    "category": "AI & LLM"
  },
  {
    "id": "github-slayerclaw",
    "name": "SlayerClaw",
    "description": "Personal AI Assistant.",
    "icon": "fa-dragon",
    "color": "text-red-400",
    "category": "AI & LLM"
  },
  {
    "id": "github-decepticon-ai",
    "name": "Decepticon-Ai",
    "description": "Autonomous Multi-Agent Red Team Testing.",
    "icon": "fa-robot",
    "color": "text-blue-500",
    "category": "AI & LLM"
  },
  {
    "id": "github-pentestagent",
    "name": "PentestAgent",
    "description": "AI agent framework for security testing.",
    "icon": "fa-user-ninja",
    "color": "text-emerald-400",
    "category": "AI & LLM"
  },
  {
    "id": "github-taskhound",
    "name": "TaskHound",
    "description": "Enumerate privileged Scheduled Tasks.",
    "icon": "fa-dog",
    "color": "text-orange-400",
    "category": "Intelligence"
  },
  {
    "id": "github-sploitscan",
    "name": "SploitScan",
    "description": "Vulnerability and exploit information utility.",
    "icon": "fa-bug",
    "color": "text-yellow-500",
    "category": "Intelligence"
  },
  {
    "id": "github-exegol",
    "name": "Exegol",
    "description": "Fully featured hacking environment.",
    "icon": "fa-box-open",
    "color": "text-blue-400",
    "category": "Offensive Tools"
  },
  {
    "id": "github-ai-security-scanner",
    "name": "AI-Security-Scanner",
    "description": "AI-powered security scanner (16 agents).",
    "icon": "fa-radar",
    "color": "text-green-400",
    "category": "Intelligence"
  }
];