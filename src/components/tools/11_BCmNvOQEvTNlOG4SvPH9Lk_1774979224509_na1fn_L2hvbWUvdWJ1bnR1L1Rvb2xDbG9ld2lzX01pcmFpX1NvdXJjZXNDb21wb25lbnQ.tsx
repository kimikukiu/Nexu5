
import React, { useState, useEffect } from 'react';

interface ToolCloewis_Mirai_SourcesComponentProps {
  toolPath: string;
}

const ToolCloewis_Mirai_SourcesComponent: React.FC<ToolCloewis_Mirai_SourcesComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSourceCode = async () => {
      const files = ['main.c', 'script.sh', 'logic.py']; // Example files, in a real scenario, this would be dynamic
      const code: Record<string, string> = {};
      for (const file of files) {
        try {
          // In a real React app, you'd use a backend API to read file content
          // For this simulation, we'll use placeholder content or assume a direct read if possible in the environment
          // For the purpose of this component generation, we'll simulate reading from the provided paths.
          // This part would typically involve an API call to a backend that can read local files.
          // Since direct file system access from a browser-based React app is not possible,
          // we'll use a placeholder or assume the content is passed down as props or fetched from an API.
          // For the agent's context, we'll assume a mechanism to get this content.
          
          // Placeholder for actual file content reading
          let content = '';
          if (file === 'main.c') {
            content = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}\n`;
          } else if (file === 'script.sh') {
            content = `#!/bin/bash\n\necho \"Hello from Bash!\"\n`;
          } else if (file === 'logic.py') {
            content = `print(\"Hello from Python!\")\n`;
          }
          code[file] = content;
        } catch (error) {
          console.error(`Failed to read file ${file}:`, error);
          code[file] = `Error: Could not read ${file}`;
        }
      }
      setSourceCode(code);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    const newLog = `[${new Date().toLocaleTimeString()}] Starting execution with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`;
    setExecutionLogs((prev) => [...prev, newLog]);
    // Simulate execution
    setTimeout(() => {
      const endLog = `[${new Date().toLocaleTimeString()}] Execution finished.`;
      setExecutionLogs((prev) => [...prev, endLog]);
      setIsExecuting(false);
    }, 5000); // Simulate a 5-second execution
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    const stopLog = `[${new Date().toLocaleTimeString()}] Execution stopped by user.`;
    setExecutionLogs((prev) => [...prev, stopLog]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 font-mono">
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">ToolCloewis_Mirai_Sources</h1>

      {/* Source Code Viewer */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Source Code</h2>
        <div className="flex space-x-2 mb-4">
          {Object.keys(sourceCode).map((file) => (
            <button
              key={file}
              onClick={() => setSelectedFile(file)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile === file ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {file}
            </button>
          ))}
        </div>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-green-300">
          <code>
            {selectedFile ? sourceCode[selectedFile] : 'Select a file to view source code.'}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., http://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
        <div className="flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className={`px-6 py-2 rounded-md font-bold ${isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className={`px-6 py-2 rounded-md font-bold ${!isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-60 text-gray-200">
          {executionLogs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see logs.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="text-sm mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCloewis_Mirai_SourcesComponent;
