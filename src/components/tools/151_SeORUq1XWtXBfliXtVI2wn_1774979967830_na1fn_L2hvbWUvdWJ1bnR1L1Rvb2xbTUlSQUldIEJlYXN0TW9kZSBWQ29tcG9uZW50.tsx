
import React, { useState, useEffect } from 'react';

interface ToolBeastModeVProps {
  toolName: string;
}

const ToolMIRAIBeastModeVComponent: React.FC<ToolBeastModeVProps> = ({ toolName }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const cCode = `/* Dummy C code for BeastMode V */
#include <stdio.h>

int main() {
    printf("Hello from BeastMode V C code!\n");
    return 0;
}`;

  const goCode = `/* Dummy Go code for BeastMode V */
package main

import "fmt"

func main() {
    fmt.Println("Hello from BeastMode V Go code!")
}`;

  const pyCode = `# Dummy Python code for BeastMode V

def run_beastmode():
    print("Hello from BeastMode V Python code!")

if __name__ == "__main__":
    run_beastmode()`

  const startExecution = () => {
    if (!target) {
      setLogs(prev => [...prev, 'ERROR: Target cannot be empty.']);
      return;
    }
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution on ${target} with ${rps} RPS for ${duration} seconds using ${threads} threads and method ${method}...`]);

    // Simulate execution
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... Progress: ${progress}%`]);
      if (progress >= 100) {
        clearInterval(interval);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, duration * 100);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution.`]);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName}</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96 mb-4">
          <h3 className="text-xl font-medium mb-2 text-emerald-200">beastmode.c</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-300"><code className="language-c">{
            cCode
          }</code></pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96 mb-4">
          <h3 className="text-xl font-medium mb-2 text-emerald-200">beastmode.go</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-300"><code className="language-go">{
            goCode
          }</code></pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <h3 className="text-xl font-medium mb-2 text-emerald-200">beastmode.py</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-300"><code className="language-python">{
            pyCode
          }</code></pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., https://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
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
            disabled={isRunning}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-80">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAIBeastModeVComponent;
