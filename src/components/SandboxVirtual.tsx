
import React, { useState, useEffect } from 'react';
import { LogEntry } from '../types';

interface ProxyNode {
  id: string;
  ip: string;
  header: string;
  userAgent: string;
  location: string;
  latency: number;
  status: 'ACTIVE' | 'ROTATING' | 'OFFLINE';
}

interface SandboxVirtualProps {
  addLog: (message: string, level: LogEntry['level']) => void;
}

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0"
];

const LOCATIONS = ["US-EAST-1", "EU-WEST-2", "AP-SOUTH-1", "SA-EAST-1", "AF-SOUTH-1", "RU-MOSCOW-4", "CN-SHANGHAI-2"];

const generateIP = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');

const SandboxVirtual: React.FC<SandboxVirtualProps> = ({ addLog }) => {
  const [nodes, setNodes] = useState<ProxyNode[]>([]);
  const [stealthLevel, setStealthLevel] = useState(85);
  const [isRotating, setIsRotating] = useState(false);
  const [torStatus] = useState<'CONNECTED' | 'BRIDGING' | 'DISCONNECTED'>('CONNECTED');
  const [activeIdentity, setActiveIdentity] = useState({
    ip: generateIP(),
    ua: USER_AGENTS[0],
    header: "X-Forwarded-For, X-Real-IP, CF-Connecting-IP"
  });

  const totalVirtualNodes = 14209; // Mock "thousands"

  useEffect(() => {
    // Initial nodes
    const initialNodes: ProxyNode[] = Array.from({ length: 15 }, (_, i) => ({
      id: `node-${i}`,
      ip: generateIP(),
      header: "Neural-Encrypted-V1",
      userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      latency: Math.floor(Math.random() * 150) + 20,
      status: 'ACTIVE'
    }));
    setNodes(initialNodes);
  }, []);

  const rotateIdentity = () => {
    setIsRotating(true);
    setStealthLevel(prev => Math.min(100, prev + 5));
    addLog("SANDBOX: Initiating neural identity rotation...", "warning");
    
    setTimeout(() => {
      setActiveIdentity({
        ip: generateIP(),
        ua: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
        header: "X-Neural-Mesh-" + Math.random().toString(36).substring(7).toUpperCase()
      });
      setIsRotating(false);
      addLog("SANDBOX: Identity rotated. New VPS IP assigned.", "success");
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white font-mono p-4 md:p-6 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-3">
            <span className="text-emerald-500 animate-pulse">●</span>
            Sandbox_Virtual_Mesh
          </h1>
          <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase mt-1">
            Untraceable VPS Infrastructure | Tor-Bridge V4
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-end">
            <span className="text-[8px] text-gray-500 uppercase font-black">Stealth_Level</span>
            <span className="text-xl font-black text-emerald-500">{stealthLevel}%</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-end">
            <span className="text-[8px] text-gray-500 uppercase font-black">Tor_Status</span>
            <span className={`text-xl font-black ${torStatus === 'CONNECTED' ? 'text-blue-400' : 'text-yellow-500'}`}>
              {torStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left: Active Identity Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fas fa-user-secret text-6xl"></i>
            </div>
            
            <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-fingerprint"></i> Active_Neural_Identity
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[8px] text-gray-500 uppercase">Virtual_IP</span>
                <span className="text-lg font-black font-mono text-white tracking-wider">
                  {isRotating ? "ROTATING..." : activeIdentity.ip}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] text-gray-500 uppercase">User_Agent</span>
                <span className="text-[10px] font-mono text-gray-400 break-all leading-tight">
                  {activeIdentity.ua}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] text-gray-500 uppercase">Neural_Headers</span>
                <span className="text-[10px] font-mono text-emerald-400/80">
                  {activeIdentity.header}
                </span>
              </div>
            </div>

            <button 
              onClick={rotateIdentity}
              disabled={isRotating}
              className="mt-8 w-full py-3 bg-emerald-600 text-black font-black uppercase tracking-widest text-xs rounded-lg hover:bg-emerald-500 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isRotating ? "REGENERATING..." : "REGENERATE_IDENTITY"}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-1">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Mesh_Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase">Total_VPS</span>
                <p className="text-lg font-black text-white">{totalVirtualNodes.toLocaleString()}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase">Active_Hops</span>
                <p className="text-lg font-black text-white">12</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase">Traffic_Enc</span>
                <p className="text-lg font-black text-emerald-500">AES-4096</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase">Tor_Bridges</span>
                <p className="text-lg font-black text-blue-400">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Node List */}
        <div className="lg:col-span-2 flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Active_VPS_Nodes</h3>
            <span className="text-[8px] text-emerald-500 font-black animate-pulse">LIVE_FEED</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scroll">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0a0a0a] z-10">
                <tr className="border-b border-white/10">
                  <th className="p-4 text-[9px] font-black text-gray-500 uppercase italic">Node_ID</th>
                  <th className="p-4 text-[9px] font-black text-gray-500 uppercase italic">Virtual_IP</th>
                  <th className="p-4 text-[9px] font-black text-gray-500 uppercase italic">Location</th>
                  <th className="p-4 text-[9px] font-black text-gray-500 uppercase italic">Latency</th>
                  <th className="p-4 text-[9px] font-black text-gray-500 uppercase italic">Status</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-mono text-[10px] text-gray-400">{node.id}</td>
                    <td className="p-4 font-mono text-[10px] text-emerald-400">{node.ip}</td>
                    <td className="p-4 font-mono text-[10px] text-gray-300">{node.location}</td>
                    <td className="p-4 font-mono text-[10px] text-blue-400">{node.latency}ms</td>
                    <td className="p-4">
                      <span className="text-[8px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {node.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-black/40 border-t border-white/10 text-[9px] text-gray-600 flex justify-between">
            <span>Showing 15 of {totalVirtualNodes.toLocaleString()} virtual nodes</span>
            <span className="text-emerald-500/50">Neural Mesh v4.2.0-STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxVirtual;
