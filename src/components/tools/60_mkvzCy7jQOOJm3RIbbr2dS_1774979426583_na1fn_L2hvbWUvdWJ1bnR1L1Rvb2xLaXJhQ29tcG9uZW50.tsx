
import React, { useState, useEffect } from 'react';

interface ToolKiraComponentProps {
  toolPath: string;
}

interface SourceFile {
  name: string;
  language: string;
  content: string;
}

const ToolKiraComponent: React.FC<ToolKiraComponentProps> = ({ toolPath }) => {
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSourceCode = async () => {
      setError(null);
      try {
        const files = ['kira.c', 'kira.go', 'kira.py', 'kira.sh'];
        const fetchedFiles: SourceFile[] = [];

        for (const file of files) {
          // In a real scenario, this would involve an API call to read file content
          // For this simulation, we'll use dummy content or a placeholder.
          // The actual file reading will be handled by the agent's file tool.
          // For now, we'll assume the content is fetched.
          let content = '';
          let language = '';

          if (file.endsWith('.c')) { content = 'int main() {\n  // C code example\n  printf(\"Hello from Kira C!\");\n  return 0;\n}'; language = 'c'; }
          else if (file.endsWith('.go')) { content = 'package main\n\nimport \"fmt\"\n\nfunc main() {\n  // Go code example\n  fmt.Println(\"Hello from Kira Go!\")\n}'; language = 'go'; }
          else if (file.endsWith('.py')) { content = 'def run_kira():\n  # Python code example\n  print(\"Hello from Kira Python!\")\n\nif __name__ == \"__main__\":\n  run_kira()'; language = 'python'; }
          else if (file.endsWith('.sh')) { content = '#!/bin/bash\n# Shell script example\necho \"Hello from Kira Shell!\"'; language = 'bash'; }

          fetchedFiles.push({ name: file, language, content });
        }
        setSourceFiles(fetchedFiles);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(['[Kira] Starting execution...']);
    setError(null);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[Kira] Log message ${logCount} - RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
      if (logCount >= 5) {
        clearInterval(interval);
        setExecutionLogs((prevLogs) => [...prevLogs, '[Kira] Execution finished.']);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, '[Kira] Execution stopped by user.']);
  };

  return (
    <div className="p-6 bg-gray-900 text-emerald-500 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Kira Tool Component</h1>

      {error && <div className="bg-red-900 text-red-300 p-3 mb-4 rounded">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">Source Code</h2>
          {sourceFiles.length === 0 && !error ? (
            <p>Loading source code...</p>
          ) : (
            sourceFiles.map((file, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium text-emerald-200">{file.name} ({file.language})</h3>
                <pre className="bg-gray-950 p-3 rounded text-sm overflow-x-auto">
                  <code>{file.content}</code>
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Controls and Logs */}
        <div className="flex flex-col gap-6">
          {/* Execution Controls */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="targetInput" className="block text-emerald-500 text-sm font-bold mb-2">Target Input:</label>
                <input
                  type="text"
                  id="targetInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., example.com/api/data"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-emerald-500 text-sm font-bold mb-2">Duration (s):</label>
                  <input
                    type="number"
                    id="duration"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="rps" className="block text-emerald-500 text-sm font-bold mb-2">RPS:</label>
                  <input
                    type="number"
                    id="rps"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                    value={rps}
                    onChange={(e) => setRps(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="threads" className="block text-emerald-500 text-sm font-bold mb-2">Threads:</label>
                  <input
                    type="number"
                    id="threads"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                    value={threads}
                    onChange={(e) => setThreads(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="method" className="block text-emerald-500 text-sm font-bold mb-2">Method:</label>
                  <select
                    id="method"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
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
              <div className="flex justify-around mt-4">
                <button
                  onClick={startExecution}
                  disabled={isExecuting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  START
                </button>
                <button
                  onClick={stopExecution}
                  disabled={!isExecuting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  STOP
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex-grow">
            <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
            <div className="bg-gray-950 p-3 rounded text-sm h-64 overflow-y-auto">
              {executionLogs.length === 0 ? (
                <p className="text-gray-500">No logs yet. Start execution to see output.</p>
              ) : (
                executionLogs.map((log, index) => (
                  <p key={index} className="text-emerald-100">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolKiraComponent;
