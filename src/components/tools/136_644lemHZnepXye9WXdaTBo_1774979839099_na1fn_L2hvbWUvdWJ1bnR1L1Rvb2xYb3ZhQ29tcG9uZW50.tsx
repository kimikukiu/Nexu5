
import React, { useState, useEffect } from 'react';

interface ToolXovaComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolXovaComponent: React.FC<ToolXovaComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCodeFiles = async () => {
      // In a real application, this would involve an API call to the backend
      // to read file contents from the toolPath. For this simulation,
      // we'll use dummy content.
      const files: CodeFile[] = [
        {
          name: 'xova.c',
          language: 'c',
          content: 'int main() { return 0; }',
        },
        {
          name: 'xova.go',
          language: 'go',
          content: 'package main\n\nfunc main() {\n  // Go code here\n}',
        },
        {
          name: 'xova.py',
          language: 'python',
          content: 'print(\"Hello from Xova Python\")',
        },
        {
          name: 'xova.sh',
          language: 'bash',
          content: '#!/bin/bash\n\necho \"Hello from Xova Shell\"',
        },
      ];
      setCodeFiles(files);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    fetchCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    // Simulate execution logs
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}. Log entry ${logCount}`]);
      if (logCount >= 10) {
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
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-4">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Xova Tool Component</h2>

      <div className="flex flex-grow gap-4">
        {/* Code Viewer Section */}
        <div className="w-1/2 bg-gray-800 rounded-lg p-4 flex flex-col">
          <h3 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h3>
          <div className="flex gap-2 mb-3">
            {codeFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile?.name === file.name ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="flex-grow bg-gray-900 p-3 rounded-md overflow-auto font-mono text-sm">
            <pre>{selectedFile ? selectedFile.content : 'Select a file to view code.'}</pre>
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Execution Controls */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-emerald-300 mb-3">Execution Controls</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
                <input
                  type="text"
                  id="targetInput"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., example.com or 192.168.1.1"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests/Second)</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className="flex-grow px-4 py-2 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className="flex-grow px-4 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div className="bg-gray-800 rounded-lg p-4 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h3>
            <div className="flex-grow bg-gray-900 p-3 rounded-md overflow-auto font-mono text-xs text-gray-300">
              {executionLogs.length === 0 ? (
                <p>No logs yet. Start execution to see logs.</p>
              ) : (
                executionLogs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolXovaComponent;
