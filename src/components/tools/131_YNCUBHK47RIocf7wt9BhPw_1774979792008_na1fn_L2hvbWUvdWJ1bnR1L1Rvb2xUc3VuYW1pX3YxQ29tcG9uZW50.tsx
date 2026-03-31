
import React, { useState, useEffect } from 'react';

interface ToolTsunami_v1ComponentProps {}

const ToolTsunami_v1Component: React.FC<ToolTsunami_v1ComponentProps> = () => {
  const [selectedFile, setSelectedFile] = useState<string>('t_code.c');
  const [codeContent, setCodeContent] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulated code content for the files
  const fileContents: { [key: string]: string } = {
    't_code.c': `#include <stdio.h>\nint main() { printf(\"Hello from C!\\n\"); return 0; }`,
    't_code.go': `package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Go!\") }`,
    't_code.py': `print(\"Hello from Python!\")`,
    't_code.sh': `#!/bin/bash\necho \"Hello from Bash!\"`,
  };

  useEffect(() => {
    // Load initial code content
    setCodeContent(fileContents[selectedFile]);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]);
    const newLog = `[${new Date().toLocaleTimeString()}] Starting Tsunami_v1 with:\n  Target: ${targetInput}\n  Duration: ${duration}s\n  RPS: ${rps}\n  Threads: ${threads}\n  Method: ${method}\n`;
    setLogs((prevLogs) => [...prevLogs, newLog]);

    // Simulate execution over time
    let timeElapsed = 0;
    const interval = setInterval(() => {
      timeElapsed += 1;
      const progressLog = `[${new Date().toLocaleTimeString()}] Executing... Time elapsed: ${timeElapsed}s / ${duration}s\n`;
      setLogs((prevLogs) => [...prevLogs, progressLog]);

      if (timeElapsed >= duration) {
        clearInterval(interval);
        setIsRunning(false);
        const finishLog = `[${new Date().toLocaleTimeString()}] Execution finished.\n`;
        setLogs((prevLogs) => [...prevLogs, finishLog]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    const stopLog = `[${new Date().toLocaleTimeString()}] Execution stopped by user.\n`;
    setLogs((prevLogs) => [...prevLogs, stopLog]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Tsunami_v1 Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-sm font-medium text-gray-300 mb-2">Select File:</label>
            <select
              id="file-select"
              className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedFile}
              onChange={handleFileChange}
            >
              {Object.keys(fileContents).map((fileName) => (
                <option key={fileName} value={fileName}>
                  {fileName}
                </option>
              ))}
            </select>
          </div>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-96 text-sm text-emerald-200">
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target-input" className="block text-sm font-medium text-gray-300 mb-1">Target Input:</label>
              <input
                type="text"
                id="target-input"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., http://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method:</label>
                <select
                  id="method"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isRunning}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-64 text-sm text-gray-300">
            {logs.map((log, index) => (
              <span key={index}>{log}</span>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ToolTsunami_v1Component;
