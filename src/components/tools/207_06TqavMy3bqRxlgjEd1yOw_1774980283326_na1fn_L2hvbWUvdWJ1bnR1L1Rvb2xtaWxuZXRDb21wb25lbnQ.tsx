
import React, { useState, useEffect } from 'react';

interface ToolmilnetProps {
  sourceCode: string;
}

const ToolmilnetComponent: React.FC<ToolmilnetProps> = ({ sourceCode }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setError(null);
    setLogs([]);
    setIsRunning(true);
    // Simulate execution
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed < duration) {
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);

    // In a real scenario, you would make an API call here to start the tool execution
    // and stream logs back.
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, you would make an API call here to stop the tool execution.
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Mirai Tool: milnet</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-400">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-400">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-400">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-400">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isRunning}
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
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-6 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            STOP
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg h-64 overflow-y-auto text-sm border border-gray-700">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolmilnetComponent;
