import React, { useState, useEffect } from 'react';

interface ToolYBotV2ComponentProps {
  sourceCode: string;
}

const ToolYBotV2Component: React.FC<ToolYBotV2ComponentProps> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const handleStartExecution = () => {
    if (isExecuting) return;

    setLogs([]);
    setIsExecuting(true);
    const startTime = Date.now();
    let currentDuration = 0;

    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting YBotV2 attack on ${target} for ${duration} seconds.`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);

    const interval = setInterval(() => {
      currentDuration = Math.floor((Date.now() - startTime) / 1000);
      if (currentDuration < duration) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating attack... (Duration: ${currentDuration}/${duration}s)`]);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attack finished.`]);
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const handleStopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">YBotV2 Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <pre className="text-sm whitespace-pre-wrap break-all">
            <code className="language-python">
              {sourceCode}
            </code>
          </pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <label htmlFor="target" className="text-gray-300 mb-1">Target Input:</label>
            <input
              type="text"
              id="target"
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isExecuting}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-gray-300 mb-1">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rps" className="text-gray-300 mb-1">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="threads" className="text-gray-300 mb-1">Threads:</label>
            <input
              type="number"
              id="threads"
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="method" className="text-gray-300 mb-1">Method:</label>
            <select
              id="method"
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isExecuting}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className={`px-6 py-3 rounded-lg font-bold transition-colors duration-200 ${isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className={`px-6 py-3 rounded-lg font-bold transition-colors duration-200 ${!isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-80">
          {logs.map((log, index) => (
            <p key={index} className="text-sm text-gray-200 leading-relaxed">{log}</p>
          ))}
          {logs.length === 0 && <p className="text-sm text-gray-400">No logs yet. Start execution to see output.</p>}
        </div>
      </div>
    </div>
  );
};

export default ToolYBotV2Component;
