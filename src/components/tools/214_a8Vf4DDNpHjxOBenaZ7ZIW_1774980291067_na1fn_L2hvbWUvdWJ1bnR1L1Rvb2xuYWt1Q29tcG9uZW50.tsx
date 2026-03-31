
import React, { useState, useEffect } from 'react';

interface ToolnakuComponentProps {
  toolName: string;
  sourceCode: string;
}

const ToolnakuComponent: React.FC<ToolnakuComponentProps> = ({ toolName, sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleStartExecution = () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setIsExecuting(true);
    addLog(`Starting execution for ${toolName} on target: ${target} with method: ${method}`);
    addLog(`Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}`);

    // Simulate execution
    let executionCount = 0;
    const interval = setInterval(() => {
      if (!isExecuting) {
        clearInterval(interval);
        return;
      }
      executionCount++;
      addLog(`Executing request #${executionCount} to ${target}`);
      if (executionCount >= duration * (rps / 10)) { // Simplified simulation
        clearInterval(interval);
        addLog(`Execution for ${toolName} completed.`);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    addLog(`Stopping execution for ${toolName}.`);
  };

  useEffect(() => {
    if (!isExecuting) {
      // Clean up any ongoing simulation if component unmounts or execution stops externally
    }
  }, [isExecuting]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h2>
        <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm text-gray-300 max-h-60">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Controls</h2>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-400">Target (URL/IP)</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com or 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-400">Method</label>
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
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-400">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-400">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h2>
        <div className="bg-gray-900 p-3 rounded overflow-auto text-sm text-gray-300 max-h-80">
          {logs.map((log, index) => (
            <p key={index} className="whitespace-pre-wrap">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolnakuComponent;
