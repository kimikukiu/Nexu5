
import React, { useState, useEffect } from 'react';

interface ToolMaccasComponentProps {
  toolName: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolMaccasComponent: React.FC<ToolMaccasComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching source code from the dummy files
    const fetchSourceCode = async () => {
      try {
        const cCode = `int main() { return 0; }`;
        const goCode = `package main\nfunc main() {}`;
        const pyCode = `print(\"Hello from Python\")`;
        const shCode = `#!/bin/bash\necho \"Hello from Bash\"`;

        setSourceCode({
          'maccas.c': cCode,
          'maccas.go': goCode,
          'maccas.py': pyCode,
          'maccas.sh': shCode,
        });
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };
    fetchSourceCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setError(null);
    setIsRunning(true);
    setExecutionLogs([`[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);

    // Simulate execution
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [
        ...prevLogs,
        `[${new Date().toLocaleTimeString()}] Executing with target: ${params.target}, RPS: ${params.rps}, Threads: ${params.threads}, Method: ${params.method} - Log entry ${logCount}`,
      ]);
      if (logCount >= 5) {
        clearInterval(interval);
        stopExecution();
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleTimeString()}] Execution stopped.`,
    ]);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      {error && <div className="bg-red-700 p-3 rounded mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(sourceCode).map(([filename, code]) => (
              <div key={filename} className="bg-gray-700 p-3 rounded-md">
                <h3 className="text-lg font-medium text-emerald-200 mb-2">{filename}</h3>
                <pre className="whitespace-pre-wrap break-all text-sm text-gray-200 bg-gray-900 p-2 rounded-sm overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Controls and Logs */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
              <input
                type="text"
                id="target"
                name="target"
                value={params.target}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., example.com"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={params.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
              <input
                type="number"
                id="rps"
                name="rps"
                value={params.rps}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
              <input
                type="number"
                id="threads"
                name="threads"
                value={params.threads}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isRunning}
              className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-lg shadow-inner max-h-60 overflow-y-auto">
            {executionLogs.length === 0 ? (
              <p className="text-gray-400">No logs yet.</p>
            ) : (
              <ul className="space-y-1">
                {executionLogs.map((log, index) => (
                  <li key={index} className="text-sm text-gray-300">
                    {log}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMaccasComponent;
