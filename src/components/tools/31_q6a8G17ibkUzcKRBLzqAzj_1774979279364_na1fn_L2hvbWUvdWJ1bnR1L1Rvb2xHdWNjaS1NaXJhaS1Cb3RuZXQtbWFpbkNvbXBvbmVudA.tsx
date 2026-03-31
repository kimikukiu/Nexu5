
import React, { useState, useEffect } from 'react';

interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}

interface ToolGucciMiraiBotnetMainComponentProps {
  // No specific props for now, but can be extended if needed
}

const ToolGucciMiraiBotnetMainComponent: React.FC<ToolGucciMiraiBotnetMainComponentProps> = () => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([
    {
      filename: 'main.c',
      language: 'c',
      content: `int main() { return 0; }`,
    },
    {
      filename: 'main.go',
      language: 'go',
      content: `package main\nfunc main() {}`,
    },
    {
      filename: 'script.py',
      language: 'python',
      content: `print("Hello Python")`,
    },
    {
      filename: 'script.sh',
      language: 'bash',
      content: `#!/bin/bash\necho "Hello Shell"`,
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<string>(codeSnippets[0]?.filename || '');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing ${method} on ${target} for ${duration}s...`]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, target, duration, method]);

  const handleStart = () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setLogs([]);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting attack on ${target} with ${method} for ${duration}s at ${rps} RPS with ${threads} threads.`]);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Attack stopped.`]);
  };

  const renderCodeViewer = () => {
    const snippet = codeSnippets.find((s) => s.filename === selectedFile);
    if (!snippet) return <p className="text-red-400">No file selected or file not found.</p>;

    return (
      <pre className="bg-gray-800 p-4 rounded-md overflow-auto text-sm">
        <code className={`language-${snippet.language} text-emerald-300`}>
          {snippet.content}
        </code>
      </pre>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Gucci-Mirai-Botnet-main Control Panel</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Source Code Viewer</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-sm font-medium text-gray-300 mb-2">Select File:</label>
            <select
              id="file-select"
              className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              {codeSnippets.map((snippet) => (
                <option key={snippet.filename} value={snippet.filename}>
                  {snippet.filename}
                </option>
              ))}
            </select>
          </div>
          {renderCodeViewer()}
        </div>

        {/* Execution Controls Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">Target:</label>
              <input
                type="text"
                id="target"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com:80"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
              <input
                type="number"
                id="threads"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
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
                <option value="UDP">UDP</option>
                <option value="SYN">SYN</option>
              </select>
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-auto text-sm text-gray-300">
          {logs.length === 0 ? (
            <p>No logs yet. Start an execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="font-mono">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolGucciMiraiBotnetMainComponent;
