import React, { useState, useEffect } from 'react';

interface ToolMIRAI_BatmanComponentProps {
  sourceCode: string;
}

const ToolMIRAI_BatmanComponent: React.FC<ToolMIRAI_BatmanComponentProps> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const startExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setLogs([]);
    addLog(`[${new Date().toLocaleTimeString()}] Starting Batman attack on ${target} for ${duration} seconds...`);
    addLog(`[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    let currentSecond = 0;
    const interval = setInterval(() => {
      currentSecond++;
      if (currentSecond <= duration) {
        addLog(`[${new Date().toLocaleTimeString()}] Attack in progress... ${currentSecond}/${duration} seconds`);
      } else {
        addLog(`[${new Date().toLocaleTimeString()}] Batman attack finished.`);
        stopExecution();
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsExecuting(false);
    addLog(`[${new Date().toLocaleTimeString()}] Execution stopped by user.`);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">[MIRAI]Batman Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code: batman_tool.py</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input:</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second):</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting || !target}
            className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${!isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start the execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="mb-1 last:mb-0">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_BatmanComponent;
