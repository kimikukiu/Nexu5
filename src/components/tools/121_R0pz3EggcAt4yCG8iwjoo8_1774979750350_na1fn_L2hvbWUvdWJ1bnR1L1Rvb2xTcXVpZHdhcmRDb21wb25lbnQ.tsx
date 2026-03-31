
import React, { useState, useEffect } from 'react';

interface ToolSquidwardComponentProps {
  toolName: string;
}

const ToolSquidwardComponent: React.FC<ToolSquidwardComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading source code
    const simulatedSourceCode = `
// Simulated C code for Squidward
#include <stdio.h>

int main() {
    printf("Hello from Squidward!\n");
    return 0;
}

// Simulated Python code for Squidward
import time

def run_squidward():
    print("Squidward is running...")
    time.sleep(1)
    print("Squidward finished.")

if __name__ == "__main__":
    run_squidward()
`;
    setSourceCode(simulatedSourceCode);
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]);
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with input: ${input}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}. Log entry ${logCount}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setIsRunning(false);
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName} Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm border border-gray-700">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-300 mb-1">Target Input</label>
            <input
              type="text"
              id="input"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., target.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS</label>
            <input
              type="number"
              id="rps"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
            <input
              type="number"
              id="threads"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
            <select
              id="method"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
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
            disabled={isRunning}
            className="flex-1 py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="flex-1 py-2 px-4 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm border border-gray-700">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolSquidwardComponent;
