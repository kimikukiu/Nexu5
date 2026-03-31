
import React, { useState, useEffect } from 'react';

interface ToolCondiV3KingOfZeroProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolCondiV3KingOfZeroComponent: React.FC<ToolCondiV3KingOfZeroProps> = ({ toolPath }) => {
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
      // In a real scenario, this would involve an API call to read directory contents
      // and then read each file. For this simulation, we'll use dummy content.
      const dummyFiles: CodeFile[] = [
        {
          name: 'main.c',
          language: 'c',
          content: `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`,
        },
        {
          name: 'main.go',
          language: 'go',
          content: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}`,
        },
        {
          name: 'main.py',
          language: 'python',
          content: `print(\"Hello from Python!\")`,
        },
        {
          name: 'run.sh',
          language: 'bash',
          content: `#!/bin/bash\necho \"Hello from Shell!\"`,
        },
      ];
      setCodeFiles(dummyFiles);
      if (dummyFiles.length > 0) {
        setSelectedFile(dummyFiles[0]);
      }
    };
    fetchCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    const startTime = new Date();
    const logEntry = `[${startTime.toLocaleTimeString()}] Starting execution with:\n  Target: ${targetInput}\n  Duration: ${duration}s\n  RPS: ${rps}\n  Threads: ${threads}\n  Method: ${method}\n  Code: ${selectedFile?.name || 'N/A'}`;
    setExecutionLogs((prev) => [...prev, logEntry]);

    // Simulate execution over the duration
    let simulatedLogs: string[] = [];
    let currentSecond = 0;
    const interval = setInterval(() => {
      if (currentSecond < duration) {
        const logTime = new Date(startTime.getTime() + currentSecond * 1000).toLocaleTimeString();
        simulatedLogs.push(`[${logTime}] Executing... (second ${currentSecond + 1} of ${duration})`);
        setExecutionLogs((prev) => [...prev, `[${logTime}] Executing... (second ${currentSecond + 1} of ${duration})`]);
        currentSecond++;
      } else {
        clearInterval(interval);
        const endTime = new Date().toLocaleTimeString();
        setExecutionLogs((prev) => [...prev, `[${endTime}] Execution finished.`]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">CondiV3-KingOfZero Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Code Viewer Section */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-sm font-medium text-gray-300 mb-2">Select File:</label>
            <select
              id="file-select"
              className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              value={selectedFile?.name || ''}
              onChange={(e) => setSelectedFile(codeFiles.find(f => f.name === e.target.value) || null)}
            >
              {codeFiles.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name} ({file.language})
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-96">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap">
              <code>{selectedFile ? selectedFile.content : 'Select a file to view its content.'}</code>
            </pre>
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Manual Execution Controls */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="target-input" className="block text-sm font-medium text-gray-300 mb-1">Target Input:</label>
                <input
                  type="text"
                  id="target-input"
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., http://example.com/api"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests per Second):</label>
                <input
                  type="number"
                  id="rps"
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method:</label>
                <select
                  id="method"
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
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
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                {isExecuting ? 'Executing...' : 'START'}
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-200">
              {executionLogs.length === 0 ? (
                <p className="text-gray-500">No logs yet. Start execution to see output.</p>
              ) : (
                executionLogs.map((log, index) => (
                  <p key={index} className="mb-1">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCondiV3KingOfZeroComponent;
