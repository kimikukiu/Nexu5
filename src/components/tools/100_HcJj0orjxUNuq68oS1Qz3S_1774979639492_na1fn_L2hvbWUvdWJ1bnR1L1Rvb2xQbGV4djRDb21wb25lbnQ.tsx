import React, { useState, useEffect } from 'react';

interface ToolPlexv4ComponentProps {
  toolName: string;
  sourceCode: string;
}

const ToolPlexv4Component: React.FC<ToolPlexv4ComponentProps> = ({ toolName, sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(100);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Executing ${method} on ${target} with ${rps} RPS, ${threads} threads. Remaining duration: ${Math.floor(Math.random() * duration)}s`,
        ]);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, duration, method, target, rps, threads]);

  const handleStart = () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setLogs([`[${new Date().toLocaleTimeString()}] Starting Plexv4 execution...`]);
    setIsRunning(true);
  };

  const handleStop = () => {
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Stopping Plexv4 execution.`]);
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} - Plexv4 Tool</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 border border-gray-700">
          <code className="text-sm text-gray-200 whitespace-pre-wrap">{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target (Domain/IP/URL)</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="HEAD">HEAD</option>
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-80 border border-gray-700">
          {logs.map((log, index) => (
            <p key={index} className="text-sm text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolPlexv4Component;
