
import React, { useState, useEffect } from 'react';

interface ToolsatoriProps {
  toolName: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolsatoriComponent: React.FC<ToolsatoriProps> = ({ toolName }) => {
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const files = {
          'satori.c': `/* satori.c */
#include <stdio.h>

int main() {
    printf("Hello from satori.c!\n");
    return 0;
}`,
          'satori.py': `# satori.py
import time

def run_satori():
    print("Executing satori.py...")
    time.sleep(1)
    print("satori.py execution finished.")

if __name__ == "__main__":
    run_satori()`,
          'satori.sh': `#!/bin/bash

echo "Executing satori.sh..."
sleep 1
echo "satori.sh execution finished."`,
          'satori.go': `// satori.go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Hello from satori.go!")
	time.Sleep(1 * time.Second)
	fmt.Println("satori.go execution finished.")
}`
        };
        setCodeSnippets(files);
      } catch (error) {
        console.error('Failed to fetch code snippets:', error);
        setExecutionLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    fetchCode();
  }, []);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with params: ${JSON.stringify(params)}`]);
    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Log entry ${counter}: Simulating traffic...`]);
      if (counter >= 5) {
        clearInterval(interval);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, this would send a signal to stop the backend process.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: {toolName}</h1>

      {/* Code Viewer Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
          {Object.entries(codeSnippets).map(([filename, code]) => (
            <div key={filename} className="mb-6">
              <h3 className="text-xl font-medium text-emerald-200 mb-2">{filename}</h3>
              <pre className="whitespace-pre-wrap break-all text-sm text-gray-300 bg-gray-700 p-3 rounded-md">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              name="target"
              value={params.target}
              onChange={handleParamChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              placeholder="e.g., http://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={params.duration}
              onChange={handleParamChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={params.rps}
              onChange={handleParamChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={params.threads}
              onChange={handleParamChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={params.method}
              onChange={handleParamChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-64 overflow-auto">
          {executionLogs.length === 0 ? (
            <p className="text-gray-400">No logs yet.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsatoriComponent;
