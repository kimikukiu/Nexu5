import React, { useState, useEffect } from 'react';

interface ToolloaderProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolloaderComponent: React.FC<ToolloaderProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate file reading for now, as direct file system access from a React component is not feasible.
    // In a real application, this data would be fetched from a backend API.
    const simulatedFiles: CodeFile[] = [
      { name: 'loader.c', language: 'c', content: 'int main() { printf("Hello from C loader!\\n"); return 0; }' },
      { name: 'loader.py', language: 'python', content: 'print("Hello from Python loader!")' },
      { name: 'loader.sh', language: 'bash', content: '#!/bin/bash\\necho "Hello from Bash loader!"' },
    ];
    setCodeFiles(simulatedFiles);
    if (simulatedFiles.length > 0) {
      setSelectedFile(simulatedFiles[0]);
    }
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with:
      Target: ${targetInput}
      Duration: ${duration}s
      RPS: ${rps}
      Threads: ${threads}
      Method: ${method}`]);
    // Simulate execution based on duration
    const simulationDuration = duration > 0 ? duration * 1000 : 3000; // Default to 3 seconds if duration is 0 or less
    setTimeout(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsExecuting(false);
    }, simulationDuration);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: loader</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex space-x-2 mb-4">
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
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-96 text-sm">
            <code>
              {selectedFile ? selectedFile.content : 'Select a file to view code.'}
            </code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input:</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="">Select Method</option>
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
              className={`px-6 py-2 rounded-md font-bold ${isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className={`px-6 py-2 rounded-md font-bold ${!isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-300">
            {executionLogs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolloaderComponent;
