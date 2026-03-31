import React, { useState, useEffect } from 'react';

interface ToolAresComponentProps {
  toolName: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolAresComponent: React.FC<ToolAresComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<string>(``);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });

  // Dummy source code content for Ares
  useEffect(() => {
    setSourceCode(`/*
 * Ares Mirai Tool - Dummy Source Code
 */

#include <stdio.h>

int main() {
    printf("Executing Ares tool...\n");
    // Simulate some execution logic
    for (int i = 0; i < 5; i++) {
        printf("Ares iteration %d\\n", i);
        sleep(1);
    }
    printf("Ares execution complete.\\n");
    return 0;
}`);
  }, []);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(['[INFO] Starting Ares execution...']);

    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < params.duration) {
        setExecutionLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] [INFO] Sending ${params.rps} requests to ${params.target} using ${params.threads} threads (method: ${params.method}).`,
        ]);
        logCounter++;
      } else {
        clearInterval(interval);
        setExecutionLogs((prevLogs) => [...prevLogs, '[INFO] Ares execution finished.']);
        setIsRunning(false);
      }
    }, 1000);

    // Simulate an error after some time
    setTimeout(() => {
      if (isRunning) {
        setExecutionLogs((prevLogs) => [...prevLogs, '[ERROR] Connection timed out after 30 seconds.']);
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 30000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [...prevLogs, '[INFO] Ares execution stopped by user.']);
  };

  return (
    <div className="bg-gray-900 text-emerald-500 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-white">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Source Code (ares.c)</h2>
          <div className="bg-gray-950 p-4 rounded-md overflow-auto max-h-96 text-sm">
            <pre>
              <code className="language-c">
                {sourceCode}
              </code>
            </pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="target"
                name="target"
                value={params.target}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="e.g., example.com:80"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={params.duration}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
              <input
                type="number"
                id="rps"
                name="rps"
                value={params.rps}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                min="1"
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
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleParamChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="SYN">SYN</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="flex-1 py-2 px-4 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="flex-1 py-2 px-4 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Execution Logs</h2>
        <div className="bg-gray-950 p-4 rounded-md overflow-auto max-h-64 text-sm text-gray-300">
          {executionLogs.map((log, index) => (
            <p key={index} className={log.startsWith('[ERROR]') ? 'text-red-400' : ''}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolAresComponent;
