
import React, { useState, useEffect } from 'react';

interface ToolDiablo_PrivateComponentProps {
  toolName: string;
}

interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}

const ToolDiablo_PrivateComponent: React.FC<ToolDiablo_PrivateComponentProps> = ({ toolName }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading files from the directory
    const fetchCodeSnippets = async () => {
      try {
        const snippets: CodeSnippet[] = [
          {
            filename: 'diablo.c',
            language: 'c',
            content: `// diablo.c\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Diablo C!\\n\");\n    return 0;\n}`,
          },
          {
            filename: 'main.go',
            language: 'go',
            content: `// main.go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Diablo Go!\")\n}`,
          },
          {
            filename: 'script.py',
            language: 'python',
            content: `// script.py\nprint(\"Hello from Diablo Python!\")`,
          },
          {
            filename: 'run.sh',
            language: 'bash',
            content: `// run.sh\n#!/bin/bash\necho \"Hello from Diablo Shell!\"`,
          },
        ];
        setCodeSnippets(snippets);
      } catch (err) {
        setError('Failed to load code snippets.');
        console.error(err);
      }
    };

    fetchCodeSnippets();
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);

    let logCounter = 0;
    const interval = setInterval(() => {
      logCounter++;
      const newLog = `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method} - Log entry ${logCounter}`;
      setExecutionLogs((prevLogs) => [...prevLogs, newLog]);

      if (logCounter >= 10) { // Simulate 10 log entries then stop
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} - Mirai Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {codeSnippets.length > 0 ? (
              codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-gray-700 rounded-md overflow-hidden">
                  <div className="bg-gray-600 px-4 py-2 flex justify-between items-center">
                    <span className="text-sm text-gray-300">{snippet.filename}</span>
                    <span className="text-xs text-gray-400 uppercase">{snippet.language}</span>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code>{snippet.content}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No code snippets found.</p>
            )}
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com"
                disabled={isExecuting}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isExecuting}
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
              onClick={handleStartExecution}
              disabled={isExecuting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-700 p-4 rounded-md h-48 overflow-y-auto text-sm text-gray-200">
            {executionLogs.length > 0 ? (
              executionLogs.map((log, index) => (
                <p key={index}>{log}</p>
              ))
            ) : (
              <p className="text-gray-400">No logs yet. Click START to begin execution.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDiablo_PrivateComponent;
