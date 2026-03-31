
import React, { useState, useEffect } from 'react';

interface ToolTsunamiV4ComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolTsunamiV4Component: React.FC<ToolTsunamiV4ComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCodeFiles = async () => {
      // Simulate file reading from the provided paths
      const files: CodeFile[] = [
        {
          name: 'main.c',
          language: 'c',
          content: '#include <stdio.h>\nint main() { printf(\"Hello from Tsunami v4 C code!\\n\"); return 0; }',
        },
        {
          name: 'main.go',
          language: 'go',
          content: 'package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Tsunami v4 Go code!\") }',
        },
        {
          name: 'main.py',
          language: 'python',
          content: 'print(\"Hello from Tsunami v4 Python code!\")',
        },
        {
          name: 'run.sh',
          language: 'bash',
          content: '#!/bin/bash\necho \"Hello from Tsunami v4 Shell script!\"',
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
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Target: ${targetInput}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    // Simulate execution output
    const interval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating attack... Data sent to ${targetInput}`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Tsunami v4 Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
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
              <code>{selectedFile ? selectedFile.content : 'Select a file to view code.'}</code>
            </pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., http://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
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
                onClick={handleStartExecution}
                disabled={isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-sm text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolTsunamiV4Component;
