
import React, { useState, useEffect } from 'react';

interface ToolKatrina_V1Props {
  sourceCode: string;
}

const ToolKatrina_V1Component: React.FC<ToolKatrina_V1Props> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const startExecution = () => {
    setError(null);
    setLogs([]);
    setIsRunning(true);
    setProgress(0);
    addLog(`Starting Katrina_V1 attack on ${target} for ${duration} seconds...`);
    addLog(`RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    let currentDuration = 0;
    const interval = setInterval(() => {
      currentDuration++;
      setProgress(Math.min((currentDuration / duration) * 100, 100));
      addLog(`Attack in progress... ${currentDuration}s / ${duration}s`);

      if (currentDuration >= duration) {
        clearInterval(interval);
        addLog(`Katrina_V1 attack on ${target} finished.`);
        setIsRunning(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    addLog('Execution stopped by user.');
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Katrina_V1 Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-sm border border-gray-700">
          <code className="language-python">
            {sourceCode}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
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
            onClick={startExecution}
            disabled={isRunning}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                       bg-emerald-600 hover:bg-emerald-700 text-white
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                       bg-red-600 hover:bg-red-700 text-white
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
        {isRunning && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-80 text-sm border border-gray-700">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-300 leading-relaxed">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolKatrina_V1Component;
