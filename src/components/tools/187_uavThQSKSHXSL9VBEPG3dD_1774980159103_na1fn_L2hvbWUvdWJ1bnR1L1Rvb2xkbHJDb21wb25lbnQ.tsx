
import React, { useState, useEffect } from 'react';

interface TooldlrComponentProps {
  // Define any props if needed
}

const TooldlrComponent: React.FC<TooldlrComponentProps> = () => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [codeSnippet, setCodeSnippet] = useState<string>('');

  // Embedded source code from dlr.c
  const dlrCCode = `
#include <stdio.h>

int main() {
    printf("Hello from dlr.c!\n");
    return 0;
}
`;

  useEffect(() => {
    setCodeSnippet(dlrCCode);
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    let count = 0;
    const interval = setInterval(() => {
      if (count < 5) { // Simulate 5 log entries
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
        count++;
      } else {
        clearInterval(interval);
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // In a real scenario, you would send a signal to stop the backend process
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">DLR Tool Component</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code (dlr.c)</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
          <code>{codeSnippet}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-400">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-400">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-400">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-400">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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

        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-black p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TooldlrComponent;
