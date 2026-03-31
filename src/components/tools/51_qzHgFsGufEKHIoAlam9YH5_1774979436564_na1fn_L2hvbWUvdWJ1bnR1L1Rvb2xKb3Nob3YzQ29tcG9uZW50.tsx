import React, { useState, useEffect, useRef } from 'react';

interface ToolJoshov3Props {
  toolName: string;
  sourceCode: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const ToolJoshov3Component: React.FC<ToolJoshov3Props> = ({ toolName, sourceCode }) => {
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    targetInput: '',
    duration: 10,
    rps: 100,
    threads: 1,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const executionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [executionLogs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? parseInt(value, 10) : value,
    }));
  };

  const startExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([`[${new Date().toLocaleTimeString()}] Starting Joshov3 execution simulation...`]);

    let currentSecond = 0;
    executionIntervalRef.current = setInterval(() => {
      if (currentSecond < executionParams.duration) {
        setExecutionLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] [${currentSecond + 1}/${executionParams.duration}] Simulating ${executionParams.rps} requests per second to ${executionParams.targetInput} with ${executionParams.threads} threads using ${executionParams.method} method...`,
        ]);
        currentSecond++;
      } else {
        stopExecution();
        setExecutionLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Joshov3 execution simulation finished.`,
        ]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    if (executionIntervalRef.current) {
      clearInterval(executionIntervalRef.current);
      executionIntervalRef.current = null;
    }
    setExecutionLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleTimeString()}] Joshov3 execution simulation stopped.`,
    ]);
  };

  return (
    <div className="p-6 bg-gray-900 text-emerald-500 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Mirai Tool: {toolName}</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm text-gray-200 border border-gray-700">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              name="targetInput"
              value={executionParams.targetInput}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., example.com/api/data"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionParams.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionParams.rps}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionParams.threads}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              name="method"
              value={executionParams.method}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div ref={logRef} className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm text-gray-200 border border-gray-700">
          {executionLogs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="mb-1 last:mb-0">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolJoshov3Component;
