import React, { useState, useEffect } from 'react';

interface ToolHorizon_UpdatedComponentProps {
  toolPath: string;
}

const ToolHorizon_UpdatedComponent: React.FC<ToolHorizon_UpdatedComponentProps> = ({ toolPath }) => {
  // State for code snippets, logs, and execution controls
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');

  useEffect(() => {
    const readCodeFiles = async () => {
      const files = [
        '/home/ubuntu/extracted_tools/Horizon_Updated/main.c',
        '/home/ubuntu/extracted_tools/Horizon_Updated/main.go',
        '/home/ubuntu/extracted_tools/Horizon_Updated/script.py',
        '/home/ubuntu/extracted_tools/Horizon_Updated/run.sh',
      ];
      const snippets: Record<string, string> = {};

      for (const file of files) {
        try {
          // In a real browser environment, you'd use fetch or a similar API to read files.
          // For this simulation, we'll use a placeholder.
          // In a real scenario, this would involve a backend endpoint to read local files.
          const fileName = file.split('/').pop();
          if (fileName) {
            // Simulate reading file content
            let content = '';
            if (fileName.endsWith('.c')) content = 'int main() {\n  // C code for Horizon_Updated\n  return 0;\n}';
            else if (fileName.endsWith('.go')) content = 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Go code for Horizon_Updated\n  fmt.Println("Hello from Go!")\n}';
            else if (fileName.endsWith('.py')) content = '# Python code for Horizon_Updated\nprint("Hello from Python!")\n';
            else if (fileName.endsWith('.sh')) content = '#!/bin/bash\n# Shell script for Horizon_Updated\necho "Hello from Shell!"\n';
            snippets[fileName] = content;
          }
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Error reading file ${file}: ${error}`]);
        }
      }
      setCodeSnippets(snippets);
    };

    readCodeFiles();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    // Simulate execution
    setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution started with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    let timeElapsed = 0;
    const interval = setInterval(() => {
      timeElapsed++;
      setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing... Time elapsed: ${timeElapsed}s`]);
      if (timeElapsed >= duration) {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
    // Store the interval ID to clear it on stop
    (window as any).currentExecutionInterval = interval;
  };

  const handleStop = () => {
    setIsRunning(false);
    // Stop simulated execution
    if ((window as any).currentExecutionInterval) {
      clearInterval((window as any).currentExecutionInterval);
    }
    setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Horizon_Updated Tool</h2>

      {/* Code Viewer Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-300 mb-2">Source Code</h3>
        <div className="bg-gray-800 p-3 rounded-md h-64 overflow-auto">
          {Object.entries(codeSnippets).length > 0 ? (
            Object.entries(codeSnippets).map(([filename, code]) => (
              <div key={filename} className="mb-4">
                <p className="text-sm text-gray-400 mb-1">{filename}</p>
                <pre className="text-sm text-gray-200 whitespace-pre-wrap">{code}</pre>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No code snippets found.</p>
          )}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-300 mb-2">Execution Controls</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-400">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
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
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-400">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-400">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-400">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
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
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`px-4 py-2 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`px-4 py-2 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h3 className="text-xl font-semibold text-emerald-300 mb-2">Execution Logs</h3>
        <div className="bg-gray-800 p-3 rounded-md h-48 overflow-auto">
          {executionLogs.length > 0 ? (
            executionLogs.map((log, index) => (
              <p key={index} className="text-sm text-gray-200">{log}</p>
            ))
          ) : (
            <p className="text-gray-500">No logs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHorizon_UpdatedComponent;
