
import React, { useState, useEffect } from 'react';

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolMiraiAxisRComponent: React.FC = () => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const files: CodeFile[] = [
      { name: 'main.c', language: 'c', content: '#include <stdio.h>\nint main() { printf(\"Hello from C!\\n\"); return 0; }' },
      { name: 'main.go', language: 'go', content: 'package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Go!\") }' },
      { name: 'main.py', language: 'python', content: 'print(\"Hello from Python!\")' },
      { name: 'script.sh', language: 'bash', content: '#!/bin/bash\necho \"Hello from Bash!\"' },
    ];
    setCodeFiles(files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(['Starting execution...']);
    setError(null);

    setTimeout(() => {
      setExecutionLogs(prevLogs => [...prevLogs, `Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
      setExecutionLogs(prevLogs => [...prevLogs, 'Execution finished successfully (simulated).']);
      setIsExecuting(false);
    }, 3000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs(prevLogs => [...prevLogs, 'Execution stopped.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">[MIRAI] Axis-R Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code Viewer</h2>
          <div className="flex space-x-2 mb-4">
            {codeFiles.map(file => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile?.name === file.name ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-96">
            <pre className="whitespace-pre-wrap text-sm">
              <code>{selectedFile ? selectedFile.content : 'Select a file to view its content.'}</code>
            </pre>
          </div>
        </div>

        {/* Execution Controls & Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., http://example.com/attack"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExecuting ? 'Executing...' : 'START'}
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64">
            {executionLogs.length === 0 ? (
              <p className="text-gray-400">No logs yet.</p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">
                {executionLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMiraiAxisRComponent;
