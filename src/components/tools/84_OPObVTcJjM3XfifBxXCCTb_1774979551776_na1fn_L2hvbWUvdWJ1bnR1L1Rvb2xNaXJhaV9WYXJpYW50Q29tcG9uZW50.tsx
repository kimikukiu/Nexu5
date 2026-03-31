
import React, { useState, useEffect } from 'react';

interface ToolMirai_VariantComponentProps {
  toolName: string;
  sourceCode: string;
}

const ToolMirai_VariantComponent: React.FC<ToolMirai_VariantComponentProps> = ({ toolName, sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const simulateExecution = () => {
    if (!target || duration <= 0 || rps <= 0 || threads <= 0) {
      setError('Please fill in all execution parameters with valid values.');
      return;
    }

    setError(null);
    setIsRunning(true);
    setLogs([`[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);

    let logInterval: NodeJS.Timeout;
    let progress = 0;
    const totalLogs = 10;

    logInterval = setInterval(() => {
      if (progress < totalLogs) {
        setLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Sending ${rps} requests to ${target} with ${threads} threads (Method: ${method})...`,
        ]);
        progress++;
      } else {
        clearInterval(logInterval);
        setLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Execution for ${toolName} completed in ${duration} seconds.`,
        ]);
        setIsRunning(false);
      }
    }, (duration * 1000) / totalLogs);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleTimeString()}] Execution for ${toolName} stopped by user.`,
    ]);
  };

  useEffect(() => {
    if (!isRunning) {
      // Cleanup interval if any when execution stops
    }
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} Component</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
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
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={simulateExecution}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolMirai_VariantComponent;
