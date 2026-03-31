/**
 * Vector 76 Tool - Manual Interface
 * For Bitcoin Fake Transaction and Double-Spend Research
 */

import React, { useState } from 'react';

export const Vector76Tool: React.FC = () => {
  const [config, setConfig] = useState({
    targetAddress: '',
    amount: 0.1,
    fee: 0.0001,
    broadcastNodes: 5,
    confirmationsRequired: 0,
    isManual: true,
  });

  const [status, setStatus] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleStart = () => {
    setIsExecuting(true);
    setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] Initializing Vector76 attack vector...`]);
    setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] Connecting to ${config.broadcastNodes} Bitcoin nodes...`]);
    
    // Simulated logic for research purposes
    setTimeout(() => {
      setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] Creating Raw Transaction for ${config.amount} BTC...`]);
    }, 1000);

    setTimeout(() => {
      setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] Broadcasting unconfirmed transaction to target address: ${config.targetAddress}`]);
    }, 2500);
  };

  const handleStop = () => {
    setIsExecuting(false);
    setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] Operation halted.`]);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#0a0a0a] border border-orange-500/20 p-6 rounded-2xl">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">VECTOR 76 TOOL</h2>
        <p className="text-gray-400 text-sm">Bitcoin Fake Transaction & Double-Spend Research Utility</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Manual Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black">Target BTC Address</label>
              <input
                type="text"
                value={config.targetAddress}
                onChange={(e) => setConfig({ ...config, targetAddress: e.target.value })}
                placeholder="Enter BTC Address"
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-orange-500 mt-2"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black">Amount (BTC)</label>
              <input
                type="number"
                value={config.amount}
                onChange={(e) => setConfig({ ...config, amount: parseFloat(e.target.value) })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-orange-500 mt-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Network Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black">Broadcast Nodes</label>
              <input
                type="number"
                value={config.broadcastNodes}
                onChange={(e) => setConfig({ ...config, broadcastNodes: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-orange-500 mt-2"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black">Required Confirmations</label>
              <input
                type="number"
                value={config.confirmationsRequired}
                onChange={(e) => setConfig({ ...config, confirmationsRequired: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-orange-500 mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={isExecuting || !config.targetAddress}
          className={`flex-1 font-black py-3 rounded-lg uppercase tracking-widest transition-all ${
            isExecuting || !config.targetAddress ? 'bg-gray-800 text-gray-500' : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          Execute Broadcast
        </button>
        <button
          onClick={handleStop}
          disabled={!isExecuting}
          className={`flex-1 font-black py-3 rounded-lg uppercase tracking-widest transition-all ${
            !isExecuting ? 'bg-gray-800 text-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Stop Operation
        </button>
      </div>

      <div className="bg-black border border-orange-500/20 rounded-lg p-4 h-[200px] overflow-y-auto text-[10px]">
        {status.map((line, i) => (
          <div key={i} className="text-orange-500 mb-1">{line}</div>
        ))}
        {status.length === 0 && <div className="text-gray-600">Waiting for execution...</div>}
      </div>
    </div>
  );
};

export default Vector76Tool;
