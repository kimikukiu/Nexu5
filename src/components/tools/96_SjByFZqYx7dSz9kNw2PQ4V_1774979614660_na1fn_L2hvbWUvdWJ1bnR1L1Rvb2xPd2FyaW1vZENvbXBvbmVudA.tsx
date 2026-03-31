import React, { useState, useEffect } from 'react';

interface ToolOwarimodComponentProps {
  toolName: string;
  sourceCode: string;
}

const ToolOwarimodComponent: React.FC<ToolOwarimodComponentProps> = ({ toolName, sourceCode }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isRunning) {
      // Simulate real-time logs
      const interval = setInterval(() => {
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating execution for ${targetInput}...`]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, targetInput]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs([]);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting Owarimod with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Stopping Owarimod.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-auto h-96">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
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
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={handleStop}
              disabled={!isRunning}
              className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-3 rounded-md text-sm overflow-auto h-64">
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolOwarimodComponent;
