import React, { useState, useEffect } from 'react';

interface ToolbuildProps {
  toolPath: string;
}

const ToolbuildComponent: React.FC<ToolbuildProps> = ({ toolPath }) => {
  const [codeSnippets, setCodeSnippets] = useState<{[key: string]: string}>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate code parsing from toolPath
    const fetchCode = async () => {
      const filesToRead = [
        `${toolPath}/build.c`,
        `${toolPath}/build.go`,
        `${toolPath}/build.py`,
        `${toolPath}/build.sh`,
      ];
      const newCodeSnippets: {[key: string]: string} = {};

      for (const filePath of filesToRead) {
        try {
          // In a real React app, you would use a backend API to read file content
          // For this simulation, we'll use a placeholder or a direct import if possible
          // For now, we'll simulate reading the content.
          const fileName = filePath.split('/').pop();
          if (fileName) {
            // This is a placeholder for actual file reading logic
            // In a real application, you'd make an API call to a backend
            // that reads the file from the server's filesystem.
            // For demonstration, we'll use hardcoded content for now.
            let content = '';
            switch(fileName) {
              case 'build.c': content = `#include <stdio.h>\n\nint main() {\n    printf(\"This is the C code for the build tool.\\\\n\");\n    return 0;\n}`; break;
              case 'build.go': content = `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"This is the Go code for the build tool.\")\n}`; break;
              case 'build.py': content = `def main():\n    print(\"This is the Python code for the build tool.\")\n\nif __name__ == \"__main__\":\n    main()`; break;
              case 'build.sh': content = `#!/bin/bash\n\necho \"This is the shell script for the build tool.\"`; break;
            }
            newCodeSnippets[fileName] = content;
          }
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          setError(`Failed to load code for ${fileName}: ${error.message}`);
        }
      }
      setCodeSnippets(newCodeSnippets);
    };
    fetchCode();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution started.`]);
    // Simulate execution
    let currentDuration = 0;
    const intervalTime = 1000; // 1 second
    const totalDuration = duration > 0 ? duration : 5; // Default to 5 seconds if duration is 0 or less

    const simulationInterval = setInterval(() => {
      currentDuration += intervalTime / 1000; // Increment by 1 second
      const logMessage = `[${new Date().toLocaleTimeString()}] Simulating execution... Target: ${targetInput}, Method: ${method}, RPS: ${rps}, Threads: ${threads}, Duration: ${currentDuration.toFixed(0)}s/${totalDuration}s`;
      setExecutionLogs(prev => [...prev, logMessage]);

      if (currentDuration >= totalDuration) {
        clearInterval(simulationInterval);
        setIsRunning(false);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, intervalTime);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, this would stop the actual execution process
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: Build</h1>
      {error && (
        <div className="bg-red-800 text-white p-3 rounded-lg mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Code Snippets</h2>
        {Object.entries(codeSnippets).map(([filename, code]) => (
          <div key={filename} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <h3 className="text-xl text-emerald-200 mb-2">{filename}</h3>
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-300">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetInput" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS:</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-64 overflow-y-scroll">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-sm text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolbuildComponent;
