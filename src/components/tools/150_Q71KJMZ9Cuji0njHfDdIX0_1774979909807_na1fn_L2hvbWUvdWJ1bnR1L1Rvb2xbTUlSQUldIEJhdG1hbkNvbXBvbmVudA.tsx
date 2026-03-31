
import React, { useState, useEffect } from 'react';

interface ToolBatmanComponentProps {
  toolPath: string;
}

const ToolBatmanComponent: React.FC<ToolBatmanComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading source files. In a real scenario, this would involve backend calls
    // to read files from the specified toolPath and return their content.
    const fetchSourceCode = async () => {
      setError(null);
      try {
        // Placeholder for actual file reading logic
        // In a real application, you would make an API call to a backend
        // that reads files from `toolPath` and returns their content.
        // For now, we'll simulate some content.
        const simulatedFiles = {
          'main.c': `
#include <stdio.h>

int main() {
    printf("Hello from Batman C code!\n");
    return 0;
}
          `,
          'run.sh': `
#!/bin/bash

echo "Executing Batman script..."
./main.c
          `,
          'config.py': `
# Python configuration for Batman tool
TARGET = "example.com"
PORT = 80
          `,
        };
        setSourceCode(simulatedFiles);
      } catch (err) {
        setError('Failed to load source code. Ensure the tool path is correct and files exist.');
        console.error(err);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setExecutionLogs(prev => [...prev, `Target: ${targetInput}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    // Simulate execution
    const interval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating attack on ${targetInput}...`]);
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // In a real scenario, this would send a signal to stop the backend process
  };

  return (
    <div className="min-h-screen bg-gray-900 text-emerald-500 p-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">[MIRAI] Batman Tool</h1>

      {error && (
        <div className="bg-red-900 text-red-300 p-4 rounded-md mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(sourceCode).length > 0 ? (
              Object.entries(sourceCode).map(([filename, code]) => (
                <div key={filename} className="bg-gray-700 rounded-md p-4">
                  <h3 className="text-lg font-medium text-emerald-200 mb-2">{filename}</h3>
                  <pre className="whitespace-pre-wrap break-all text-sm font-mono bg-gray-900 p-3 rounded-md overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No source code found or loaded. Please check the tool path.</p>
            )}
          </div>
        </div>

        {/* Controls and Logs */}
        <div className="space-y-8">
          {/* Execution Controls */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target (e.g., example.com, 192.168.1.1)</label>
                <input
                  type="text"
                  id="targetInput"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="Enter target (domain, IP, URL)"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                  <input
                    type="number"
                    id="duration"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
                  <input
                    type="number"
                    id="rps"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
                    value={rps}
                    onChange={(e) => setRps(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                  <input
                    type="number"
                    id="threads"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
                    value={threads}
                    onChange={(e) => setThreads(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleStart}
                  disabled={isRunning}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                  {isRunning ? 'Running...' : 'START'}
                </button>
                <button
                  onClick={handleStop}
                  disabled={!isRunning}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  STOP
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
            <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto font-mono text-sm text-gray-200">
              {executionLogs.length > 0 ? (
                executionLogs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))
              ) : (
                <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBatmanComponent;
