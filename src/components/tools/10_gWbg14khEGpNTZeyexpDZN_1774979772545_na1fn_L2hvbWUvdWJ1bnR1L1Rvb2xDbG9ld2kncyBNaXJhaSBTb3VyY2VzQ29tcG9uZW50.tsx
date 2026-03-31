import React, { useState, useEffect, useRef } from 'react';

interface ToolCloewisMiraiSourcesProps {
  toolPath: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolCloewisMiraiSourcesComponent: React.FC<ToolCloewisMiraiSourcesProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    targetInput: '',
    duration: 10,
    rps: 100,
    threads: 10,
    method: 'GET',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate reading source files
  useEffect(() => {
    const readSourceFiles = async () => {
      // In a real application, this would involve an API call or file system access
      // to read files from the toolPath. For this simulation, we'll assume
      // dummy.c is found and its content is available.
      try {
        // Simulate an asynchronous file read
        const dummyCContent = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}\n// This is a simulated C source file from ${toolPath}`;
        setSourceCode({
          'dummy.c': dummyCContent,
        });
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Successfully loaded source code for dummy.c.`]);
      } catch (error) {
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Error loading source files: ${error}`]);
      }
    };
    readSourceFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    if (isRunning) return;

    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with params: ${JSON.stringify(params)}`]);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Target: ${params.targetInput}, Method: ${params.method}`]);

    let counter = 0;
    const maxLogs = 20; // Limit the number of simulated log entries

    intervalRef.current = setInterval(() => {
      if (counter < params.duration) {
        const logMessage = `[${new Date().toLocaleTimeString()}] Executing... Request ${counter + 1} of ${params.duration * params.rps} | RPS: ${params.rps} | Threads: ${params.threads}`;
        setExecutionLogs(prev => {
          const newLogs = [...prev, logMessage];
          return newLogs.slice(-maxLogs); // Keep only the latest maxLogs entries
        });
        counter++;
      } else {
        handleStopExecution();
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulated execution completed.`]);
      }
    }, 1000); // Log every second
  };

  const handleStopExecution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution.`]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-400 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-emerald-300">Cloewi's Mirai Sources Tool</h1>

      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Source Code Viewer</h2>
        {Object.entries(sourceCode).length > 0 ? (
          Object.entries(sourceCode).map(([filename, code]) => (
            <div key={filename} className="bg-gray-700 p-4 rounded-md mb-4 border border-gray-600">
              <h3 className="font-mono text-lg text-emerald-300 mb-2">{filename}</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-100 overflow-auto max-h-80 leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No source code files found or loaded.</p>
        )}
      </div>

      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-emerald-300 mb-1">Target Input</label>
            <input
              type="text"
              id="targetInput"
              name="targetInput"
              value={params.targetInput}
              onChange={handleChange}
              placeholder="e.g., example.com or 192.168.1.1"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-emerald-300 mb-1">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={params.duration}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-emerald-300 mb-1">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={params.rps}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-emerald-300 mb-1">Threads</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={params.threads}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-emerald-300 mb-1">Method</label>
            <select
              id="method"
              name="method"
              value={params.method}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
            >
              <option value="">Select Method</option>
              <option value="GET">GET (HTTP)</option>
              <option value="POST">POST (HTTP)</option>
              <option value="UDP">UDP Flood</option>
              <option value="TCP">TCP Flood</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isRunning || !params.targetInput || !params.method}
            className="px-6 py-3 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isRunning}
            className="px-6 py-3 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Execution Logs</h2>
        <div className="bg-gray-700 p-4 rounded-md h-80 overflow-auto text-sm text-gray-100 font-mono leading-relaxed border border-gray-600">
          {executionLogs.length > 0 ? (
            executionLogs.map((log, index) => (
              <p key={index} className="mb-1 last:mb-0">{log}</p>
            ))
          ) : (
            <p className="text-gray-400">No logs yet. Start execution to see real-time output.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCloewisMiraiSourcesComponent;
