import React, { useState, useEffect } from 'react';

interface MiraiTool {
  id: string;
  name: string;
  path: string;
  category: string;
  description: string;
  sourceCode: string;
  isRunning: boolean;
}

export const MiraiToolsHub: React.FC = () => {
  const [tools, setTools] = useState<MiraiTool[]>([]);
  const [selectedTool, setSelectedTool] = useState<MiraiTool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const MIRAI_TOOLS = [
    '911', 'AkidoPrivate', 'Amakano', 'Apex_Mirai', 'Ares', 'Ares.c51a2f', 'AstroMirai', 'B',
    'Chikara Mirai Source', 'ChikaraMiraiSource', 'Cloewi\'s Mirai Sources', 'Cloewis_Mirai_Sources',
    'CondiV3-KingOfZero', 'Corona v4', 'Corona_v4', 'DDOSz-main', 'DRACO 1.9 PRIVATE HYBRID',
    'DRACO_1.9_PRIVATE_HYBRID', 'Diablo Private Mirai', 'Diablo_Private', 'Dirtz Net', 'DirtzNet',
    'DivineMiraiVariant', 'DripSource', 'Extendo', 'FBI Source', 'FBI_Source', 'FakeOmni', 'Freya',
    'Greeks_Source', 'Gucci (remastered)', 'Gucci-Mirai-Botnet-main', 'Gucci_remastered', 'Hakai',
    'Hilix 6.0', 'Hilix_6.0', 'Hito', 'Hito Leak by Mezy#1337', 'Hitori', 'Hitori_by_slumpx',
    'HoHo but with ensure single instance', 'HoHobutwithensuresingleinstance', 'Horizon Updated',
    'Horizon_Updated', 'Hybrid', 'Hybrid v420', 'Hybrid(1)', 'Infectednight', 'Infectednight-main',
    'Joker-Mirai-Botnet-Source-V1-main', 'Josho v3', 'Joshov3', 'Kalon', 'Kanashi v3', 'Kanashiv3',
    'Karuto Version 1.0', 'KarutoVersion1.0', 'Katrina_V1', 'KingOfZerov4', 'Kingdom_', 'Kira',
    'Kira-Botnet-main', 'Kuria', 'Kwari_2.0', 'L33T v4', 'L33Tv4', 'LeGiT_hOrIzOn', 'LiGhter',
    'LockBox', 'MIRAI KANASHI', 'MIRAIKANASHI', 'Maccas', 'Mana_v4.1', 'Masuta', 'Matic V1',
    'MaticV1', 'Melodic', 'Messiah Edited', 'Messiah V1', 'MessiahEdited', 'MessiahV1',
    'Mirai Universal Semi-Auto Installer', 'Mirai Variant', 'Mirai_Universal', 'Mirai_Variant',
    'Moeru Version 1.0', 'MoeruVersion1.0', 'Nyrox', 'Nyrox_1', 'OP_OWARI', 'Okane', 'Omni_Private',
    'Onryo', 'Owari', 'OwariV2', 'Owari_Reborn', 'Owarimod', 'PRIVATE-Mirai-Meerkat-Botnet-Source-main',
    'Pandora', 'Plex v4', 'Plexv4', 'Priority (2)', 'Priority_3', 'Private', 'Private 2022',
    'Private Goon', 'Private Mirai Meerkat', 'Private5', 'PrivateMorai', 'Private_2022', 'Private_Goon',
    'Private_Mirai_Meerkat', 'Project', 'Real_Owari', 'RpcSecurity', 'Salvia', 'Satan', 'Shinka',
    'Shinto-V4', 'Shinto-V5', 'Sora', 'Squidward', 'Storm', 'Switch', 'Switch-2', 'Sythe',
    'Timeout_Sec_-_L7_-_V1', 'Tokyo', 'Tokyo_private', 'Tsunami v3', 'Tsunami v4', 'Tsunami_v1',
    'Tsunami_v3', 'Tsunami_v4', 'WhiteHat_Private', 'X', 'Xova', 'XovaTest', 'XovaTest_v3', 'YBotV2',
    'Yakuza', 'Yukari (Layer7 included)', 'Yukari(Layer7included)', 'Zapon'
  ];

  useEffect(() => {
    // Initialize tools
    const initialTools = MIRAI_TOOLS.map((toolName, index) => ({
      id: `mirai-${index}`,
      name: toolName,
      path: `/extracted_tools/${toolName}`,
      category: toolName.includes('Layer7') ? 'LAYER7' : (toolName.includes('Private') ? 'PRIVATE' : 'PUBLIC'),
      description: `Mirai botnet variant: ${toolName}`,
      sourceCode: `// Source code for ${toolName}\n// Loading from repository...`,
      isRunning: false
    }));

    setTools(initialTools);
    setIsLoading(false);
    setLogs(prev => [...prev, `[INIT] Loaded ${initialTools.length} Mirai tools`]);
  }, []);

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExecute = (tool: MiraiTool) => {
    setLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [EXECUTE] Starting ${tool.name}...`,
      `[${new Date().toLocaleTimeString()}] [CONFIG] Loading tool configuration...`,
      `[${new Date().toLocaleTimeString()}] [READY] ${tool.name} ready for execution`
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
              <i className="fas fa-network-wired text-emerald-500 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Mirai Tools Hub</h2>
              <p className="text-[9px] text-emerald-500 uppercase tracking-widest">{tools.length} Tools Available</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-black border border-white/10 rounded-lg py-2 px-3 text-[10px] text-white outline-none focus:border-emerald-500"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-black border border-white/10 rounded-lg py-2 px-3 text-[10px] text-white outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Categories</option>
            <option value="LAYER7">Layer 7</option>
            <option value="PRIVATE">Private</option>
            <option value="PUBLIC">Public</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        {/* Tools List */}
        <div className="w-1/3 bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-gray-900/50 border-b border-white/10 px-4 py-3">
            <p className="text-[9px] font-black text-gray-500 uppercase">
              <i className="fas fa-list mr-2"></i> Available Tools ({filteredTools.length})
            </p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            {filteredTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`w-full p-3 border-b border-white/5 text-left transition-all hover:bg-white/5 ${
                  selectedTool?.id === tool.id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''
                }`}
              >
                <p className="text-[9px] font-black text-emerald-500 uppercase truncate">{tool.name}</p>
                <p className="text-[8px] text-gray-600 mt-1">{tool.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Details */}
        <div className="flex-1 flex flex-col gap-4">
          {selectedTool ? (
            <>
              {/* Tool Info */}
              <div className="bg-black border border-white/10 rounded-xl p-4">
                <h3 className="text-[11px] font-black text-white uppercase mb-3">{selectedTool.name}</h3>
                <div className="grid grid-cols-3 gap-3 text-[9px]">
                  <div className="bg-white/5 rounded p-2 border border-white/10">
                    <p className="text-gray-600 uppercase font-black mb-1">Category</p>
                    <p className="text-emerald-500 font-black">{selectedTool.category}</p>
                  </div>
                  <div className="bg-white/5 rounded p-2 border border-white/10">
                    <p className="text-gray-600 uppercase font-black mb-1">Status</p>
                    <p className={`font-black ${selectedTool.isRunning ? 'text-red-500' : 'text-gray-500'}`}>
                      {selectedTool.isRunning ? 'RUNNING' : 'IDLE'}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded p-2 border border-white/10">
                    <p className="text-gray-600 uppercase font-black mb-1">Action</p>
                    <button
                      onClick={() => handleExecute(selectedTool)}
                      className="bg-emerald-500/20 border border-emerald-500 text-emerald-500 px-2 py-1 rounded text-[8px] font-black uppercase hover:bg-emerald-500/30 transition-all"
                    >
                      Execute
                    </button>
                  </div>
                </div>
              </div>

              {/* Source Code Viewer */}
              <div className="flex-1 bg-black border border-white/10 rounded-xl flex flex-col overflow-hidden">
                <div className="bg-gray-900/50 border-b border-white/10 px-4 py-2">
                  <p className="text-[8px] font-black text-gray-500 uppercase">Source Code Preview</p>
                </div>
                <div className="flex-1 p-3 overflow-y-auto custom-scroll font-mono text-[8px] text-green-500/80">
                  <pre>{selectedTool.sourceCode}</pre>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 bg-black border border-white/10 rounded-xl flex items-center justify-center">
              <p className="text-gray-700 text-[10px]">Select a tool to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Console */}
      <div className="flex-none h-32 bg-black border-t border-white/10 flex flex-col">
        <div className="bg-gray-900/50 border-b border-white/10 px-4 py-2 flex items-center justify-between">
          <p className="text-[8px] font-black text-gray-500 uppercase">
            <i className="fas fa-terminal mr-2"></i> Console
          </p>
          <button
            onClick={() => setLogs([])}
            className="text-[8px] text-gray-600 hover:text-white uppercase font-black"
          >
            Clear
          </button>
        </div>
        <div className="flex-1 p-3 overflow-y-auto custom-scroll font-mono text-[8px] text-green-500/80">
          {logs.slice(-10).map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiraiToolsHub;
