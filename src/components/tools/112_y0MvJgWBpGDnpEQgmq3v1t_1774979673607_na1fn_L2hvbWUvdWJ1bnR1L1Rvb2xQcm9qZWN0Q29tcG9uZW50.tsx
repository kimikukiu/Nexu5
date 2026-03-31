
import React, { useState, useEffect } from 'react';

interface ToolProjectComponentProps {
  toolName: string;
}

const ToolProjectComponent: React.FC<ToolProjectComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // In a real scenario, this would read files from the tool directory
    // For now, we'll simulate some source code.
    const simulatedSourceCode = {
      'main.c': `
#include <stdio.h>

int main() {
    printf("Hello from C!\n");
    return 0;
}
      `,
      'script.py': `
import time

print("Hello from Python!")
for i in range(5):
    print(f"Processing item {i+1}...")
    time.sleep(0.5)
      `,
      'run.sh': `
#!/bin/bash

echo "Hello from Bash!"
      `,
    };
    setSourceCode(simulatedSourceCode);
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    // Simulate execution logs
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, RPS: ${rps}, Threads: ${threads}, Method: ${method} - Log entry ${logCount}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-emerald-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Mirai Tool: {toolName}</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
          {Object.entries(sourceCode).length > 0 ? (
            Object.entries(sourceCode).map(([filename, code]) => (
              <div key={filename} className="mb-6">
                <h3 className="text-emerald-200 text-lg mb-2">{filename}</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-300">
                  <code>{code}</code>
                </pre>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No source code found or loaded.</p>
          )}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="targetInput" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., https://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS (Requests/Second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
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
        <div className="mt-6 flex space-x-4">
          <button
            onClick={startExecution}
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
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-64 overflow-auto">
          {executionLogs.length > 0 ? (
            executionLogs.map((log, index) => (
              <p key={index} className="text-gray-300 text-sm mb-1">{log}</p>
            ))
          ) : (
            <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolProjectComponent;
