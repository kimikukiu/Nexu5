
import React, { useState } from 'react';
import { LogEntry } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface OsintDashboardProps {
  addLog: (message: string, level?: LogEntry['level']) => void;
  target: string;
  setTarget: (target: string) => void;
}

const OsintDashboard: React.FC<OsintDashboardProps> = () => {
  const [stats] = useState({
    totalScans: 1284,
    activeThreats: 42,
    leakedCredentials: 84210,
    vulnerabilities: 156
  });

  const [chartData] = useState([
    { name: '00:00', threats: 12, scans: 45 },
    { name: '04:00', threats: 18, scans: 52 },
    { name: '08:00', threats: 35, scans: 89 },
    { name: '12:00', threats: 28, scans: 76 },
    { name: '16:00', threats: 42, scans: 112 },
    { name: '20:00', threats: 31, scans: 94 },
    { name: '23:59', threats: 25, scans: 68 },
  ]);

  const [threatFeed] = useState([
    { id: 1, type: 'BREACH', target: 'adobe.com', time: '2m ago', severity: 'HIGH' },
    { id: 2, type: 'SQLI', target: 'api.gov.ro', time: '5m ago', severity: 'CRITICAL' },
    { id: 3, type: 'DUMP', target: 'pastebin.com/x29f', time: '12m ago', severity: 'MEDIUM' },
    { id: 4, type: 'EXPLOIT', target: 'CVE-2024-21626', time: '15m ago', severity: 'HIGH' },
    { id: 5, type: 'PHISH', target: 'secure-login-bank.xyz', time: '22m ago', severity: 'LOW' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Scans" value={stats.totalScans.toLocaleString()} icon="fa-magnifying-glass" color="text-emerald-500" />
        <StatCard title="Active Threats" value={stats.activeThreats} icon="fa-radiation" color="text-red-500" />
        <StatCard title="Leaked Creds" value={stats.leakedCredentials.toLocaleString()} icon="fa-key" color="text-blue-500" />
        <StatCard title="Vulns Detected" value={stats.vulnerabilities} icon="fa-bug" color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-chart-line text-emerald-500"></i> Global Threat Activity
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Scans
              </span>
              <span className="flex items-center gap-1 text-[8px] font-black text-red-500 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Threats
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '10px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="scans" stroke="#10b981" fillOpacity={1} fill="url(#colorScans)" strokeWidth={2} />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Threat Feed */}
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-2xl flex flex-col">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <i className="fas fa-rss text-red-500 animate-pulse"></i> Live Intel Feed
          </h3>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scroll pr-2">
            {threatFeed.map((threat) => (
              <div key={threat.id} className="group p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                    threat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                    threat.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {threat.type}
                  </span>
                  <span className="text-[8px] text-gray-600 font-black uppercase">{threat.time}</span>
                </div>
                <p className="text-[10px] font-mono text-gray-300 group-hover:text-white transition-colors truncate">{threat.target}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
            View All Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl shadow-xl hover:border-white/10 transition-all group">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{title}</span>
      <i className={`fas ${icon} ${color} text-xs opacity-50 group-hover:opacity-100 transition-opacity`}></i>
    </div>
    <div className="text-2xl font-black tracking-tighter text-white">{value}</div>
  </div>
);

export default OsintDashboard;
