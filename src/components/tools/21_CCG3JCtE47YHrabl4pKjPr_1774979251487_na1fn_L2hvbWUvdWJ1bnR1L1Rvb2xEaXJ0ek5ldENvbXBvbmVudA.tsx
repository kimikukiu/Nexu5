
import React, { useState, useEffect } from 'react';

interface ToolDirtzNetComponentProps {
  sourceCode: Record<string, string>;
}

const ToolDirtzNetComponent: React.FC<ToolDirtzNetComponentProps> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    // Simulate execution
    const simulationInterval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (simulated)`]);
    }, 2000);

    setTimeout(() => {
      clearInterval(simulationInterval);
      setIsRunning(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">DirtzNet Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-96">
            {Object.entries(sourceCode).map(([filename, code]) => (
              <div key={filename} className="mb-6">
                <h3 className="text-lg text-emerald-200 mb-2">{filename}</h3>
                <pre className="whitespace-pre-wrap break-all text-sm">
                  <code className="language-c">
                    {code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="mb-4">
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target (Domain/IP/URL):</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">Requests Per Second (RPS):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
                onClick={handleStart}
                disabled={isRunning}
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-64 text-sm">
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDirtzNetComponent;
