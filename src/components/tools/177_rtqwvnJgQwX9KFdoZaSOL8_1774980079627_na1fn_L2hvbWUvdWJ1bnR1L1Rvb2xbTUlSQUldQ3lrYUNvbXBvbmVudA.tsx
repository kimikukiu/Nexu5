import React, { useState, useEffect } from 'react';

interface ToolCykaProps {
  toolName: string;
  sourceCode: string;
}

const ToolMIRAI_CykaComponent: React.FC<ToolCykaProps> = ({ toolName, sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const simulateExecution = async () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setIsRunning(true);
    setLogs([]);
    addLog(`Starting attack on ${target} for ${duration} seconds...`);
    addLog(`RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    let elapsed = 0;
    const interval = setInterval(() => {
      if (elapsed < duration) {
        elapsed++;
        addLog(`Attack running... Elapsed: ${elapsed}s`);
      } else {
        clearInterval(interval);
        addLog('Attack finished.');
        setIsRunning(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    addLog('Attack stopped by user.');
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} Control Panel</h1>

      {error && (
        <div className="bg-red-700 text-white p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-xl text-emerald-300 mb-3">Source Code</h2>
          <pre className="bg-gray-800 p-4 rounded-md overflow-auto h-96 text-sm">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-xl text-emerald-300 mb-3">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-md mb-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={rps}
                onChange={(e) => setRps(parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isRunning}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="HEAD">HEAD</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={simulateExecution}
                disabled={isRunning}
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl text-emerald-300 mb-3">Real-time Logs</h2>
          <div className="bg-gray-800 p-4 rounded-md overflow-auto h-64 text-sm">
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_CykaComponent;
