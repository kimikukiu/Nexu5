import React, { useState, useEffect } from 'react';

interface ToolMiraiVariantProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

interface ExecutionLog {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const ToolMiraiVariantComponent: React.FC<ToolMiraiVariantProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  useEffect(() => {
    // In a real application, this would involve an API call to read files from the server.
    // For this simulation, we'll use the pre-defined content.
    const dummyFiles: CodeFile[] = [
      { name: 'main.c', language: 'c', content: '#include <stdio.h>\nint main() { printf("Hello from C!\n"); return 0; }' },
      { name: 'main.go', language: 'go', content: 'package main\nimport "fmt"\nfunc main() { fmt.Println("Hello from Go!") }' },
      { name: 'main.py', language: 'python', content: 'print("Hello from Python!")' },
      { name: 'script.sh', language: 'bash', content: '#!/bin/bash\necho "Hello from Bash!"' },
    ];
    setCodeFiles(dummyFiles);
    if (dummyFiles.length > 0) {
      setSelectedFile(dummyFiles[0]);
    }
  }, [toolPath]);

  const handleStartExecution = () => {
    if (!targetInput) {
      setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: 'Error: Target input cannot be empty. Please provide a target.', type: 'error' }]);
      setIsRunning(false);
      return;
    }
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: `Execution started for target: ${targetInput} with duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`, type: 'info' }]);
    // Simulate execution based on duration and other parameters
    const executionDuration = duration * 1000; // Convert seconds to milliseconds
    const startTime = new Date();

    const interval = setInterval(() => {
      const currentTime = new Date();
      const elapsed = currentTime.getTime() - startTime.getTime();

      if (elapsed >= executionDuration) {
        clearInterval(interval);
        setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: `Execution finished successfully after ${duration} seconds. Target: ${targetInput}, RPS: ${rps}, Threads: ${threads}, Method: ${method}`, type: 'success' }]);
        setIsRunning(false);
      } else {
        // Simulate some log output
        if (Math.random() < 0.3) { // 30% chance of an info log
          setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: `Simulating activity for target ${targetInput}...`, type: 'info' }]);
        } else if (Math.random() < 0.05) { // 5% chance of an error log
          setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: `Error: Failed to connect to ${targetInput}.`, type: 'error' }]);
        }
      }
    }, 1000); // Log every second

    // Add a check for invalid target input
    if (!targetInput) {
      setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: 'Error: Target input cannot be empty.', type: 'error' }]);
      setIsRunning(false);
      return;
    }

  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, { timestamp: new Date().toISOString(), message: 'Execution stopped by user.', type: 'info' }]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-2xl font-bold text-emerald-400 mb-6">Mirai Variant Tool: {toolPath.split('/').pop()}</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Code Viewer Section */}
        <div className="col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg">
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
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-96 text-sm text-gray-200">
            <code>{selectedFile ? selectedFile.content : 'Select a file to view code.'}</code>
          </pre>
        </div>

        {/* Controls Section */}
        <div className="col-span-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder="e.g., example.com"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
              <input
                type="number"
                id="threads"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStartExecution}
                disabled={isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-200">
          {executionLogs.length === 0 ? (
            <p className="text-gray-500">No logs yet.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-200'}`}>
                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMiraiVariantComponent;
