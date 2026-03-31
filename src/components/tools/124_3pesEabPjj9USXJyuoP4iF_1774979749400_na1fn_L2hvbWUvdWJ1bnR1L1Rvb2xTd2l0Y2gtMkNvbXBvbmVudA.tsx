
import React, { useState, useEffect } from 'react';

interface ToolSwitch2Props {
  // Define any props if needed
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolSwitch2Component: React.FC<ToolSwitch2Props> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '127.0.0.1',
    duration: 60,
    rps: 1000,
    threads: 100,
    method: 'GET',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, you would read files from the directory.
        // For this sandbox, we'll use the dummy C file content.
        const cCode = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Switch-2 C code!\\n\");\n    return 0;\n}`; // This should be read from the file system
        setSourceCode(cCode);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };
    fetchSourceCode();
  }, []);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? parseInt(value, 10) : value,
    }));
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(['[INFO] Starting execution...']);
    setError(null);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] [INFO] Executing with target ${params.target}, RPS: ${params.rps}, Threads: ${params.threads}... (Log ${logCount})`]);
      if (logCount >= 10) {
        clearInterval(interval);
        stopExecution();
      }
    }, 1000);

    // Simulate execution for a duration
    setTimeout(() => {
      if (isRunning) { // Check if it's still running before stopping
        clearInterval(interval);
        setExecutionLogs((prevLogs) => [...prevLogs, '[INFO] Execution finished.']);
        setIsRunning(false);
      }
    }, params.duration * 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [...prevLogs, '[WARNING] Execution stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: Switch-2</h1>

      {error && <div className="bg-red-700 text-white p-4 rounded mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="max-h-96 overflow-y-auto bg-gray-900 p-4 rounded-md border border-gray-700">
            <pre className="text-sm whitespace-pre-wrap"><code className="language-c">{
              sourceCode || 'Loading source code...'
            }</code></pre>
          </div>
        </div>

        {/* Execution Controls & Logs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="target"
                name="target"
                value={params.target}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={params.duration}
                  onChange={handleParamChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  value={params.rps}
                  onChange={handleParamChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  name="threads"
                  value={params.threads}
                  onChange={handleParamChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isRunning}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="max-h-64 overflow-y-auto bg-gray-900 p-4 rounded-md border border-gray-700">
            {executionLogs.length === 0 ? (
              <p className="text-gray-500">No logs yet.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-xs text-gray-300">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSwitch2Component;
