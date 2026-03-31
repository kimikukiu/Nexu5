
import React, { useState, useEffect } from 'react';

interface ToolMessiahEditedComponentProps {
  toolPath: string;
}

const ToolMessiahEditedComponent: React.FC<ToolMessiahEditedComponentProps> = ({ toolPath }) => {
  const [cCode, setCCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const readCodeFiles = async () => {
      try {
        // In a real React app, you would fetch these files from a server.
        // For this simulation, we'll use placeholder content.
        // The actual file reading logic would be implemented on the backend or during build time.
        setCCode(`// C Code from ${toolPath}/messiah.c\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from MessiahEdited C code!\\n\");\n    return 0;\n}`);
        setPyCode(`// Python Code from ${toolPath}/messiah.py\n#!/usr/bin/env python3\n\nprint(\"Hello from MessiahEdited Python code!\")`);
        setShCode(`// Shell Script from ${toolPath}/messiah.sh\n#!/bin/bash\n\necho \"Hello from MessiahEdited shell script!\"`);
      } catch (error) {
        console.error('Error reading code files:', error);
        setExecutionLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    readCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setExecutionLogs(prev => [...prev, `Target Input: ${targetInput}`]);
    setExecutionLogs(prev => [...prev, `Duration: ${duration}s`]);
    setExecutionLogs(prev => [...prev, `RPS: ${rps}`]);
    setExecutionLogs(prev => [...prev, `Threads: ${threads}`]);
    setExecutionLogs(prev => [...prev, `Method: ${method}`]);

    // Simulate execution
    let count = 0;
    const interval = setInterval(() => {
      if (count < 5) { // Simulate 5 log entries
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating execution log entry ${count + 1}...`]);
        count++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, you would send a signal to stop the backend process
  };

  return (
    <div className="bg-gray-900 text-emerald-300 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-500">MessiahEdited Tool Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-medium mb-2 text-emerald-300">messiah.c</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-700 p-3 rounded overflow-auto max-h-60">
              <code>{cCode}</code>
            </pre>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-medium mb-2 text-emerald-300">messiah.py</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-700 p-3 rounded overflow-auto max-h-60">
              <code>{pyCode}</code>
            </pre>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-2 text-emerald-300">messiah.sh</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-700 p-3 rounded overflow-auto max-h-60">
              <code>{shCode}</code>
            </pre>
          </div>
        </div>

        {/* Execution Controls and Logs Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="mb-4">
              <label htmlFor="targetInput" className="block text-emerald-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com/api/data"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-emerald-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-emerald-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-emerald-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-emerald-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleStartExecution}
                disabled={isRunning}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isRunning}
                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="bg-gray-700 text-gray-200 text-sm p-3 rounded overflow-auto max-h-80">
              {executionLogs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMessiahEditedComponent;
