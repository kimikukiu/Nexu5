
import React, { useState, useEffect } from 'react';

interface SourceCodeFile {
  name: string;
  language: string;
  content: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const ToolMIRAI_CronicalComponent: React.FC = () => {
  const [sourceCode, setSourceCode] = useState<SourceCodeFile[]>([]);
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: '',
    duration: 0,
    rps: 0,
    threads: 0,
    method: 'GET',
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Dummy source code content (replace with actual file reading in a real scenario)
  const dummySourceCode: SourceCodeFile[] = [
    {
      name: 'cronical.c',
      language: 'c',
      content: `#include <stdio.h>\nint main() { printf(\"Hello from C!\\n\"); return 0; }`,
    },
    {
      name: 'cronical.go',
      language: 'go',
      content: `package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Go!\") }`,
    },
    {
      name: 'cronical.py',
      language: 'python',
      content: `print(\"Hello from Python!\")`,
    },
    {
      name: 'cronical.sh',
      language: 'bash',
      content: `#!/bin/bash\necho \"Hello from Shell!\"`,
    },
  ];

  useEffect(() => {
    setSourceCode(dummySourceCode);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    if (!executionParams.target) {
      setLogs((prevLogs) => [
        ...prevLogs,
        { timestamp: new Date().toISOString(), message: 'Error: Target cannot be empty.', type: 'error' },
      ]);
      return;
    }
    setIsRunning(true);
    setLogs((prevLogs) => [
      ...prevLogs,
      { timestamp: new Date().toISOString(), message: 'Execution started...', type: 'info' },
    ]);

    // Simulate execution
    let simulatedLogs: LogEntry[] = [];
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < executionParams.duration * 2) { // Simulate logs for twice the duration
        simulatedLogs.push({
          timestamp: new Date().toISOString(),
          message: `Executing ${executionParams.method} on ${executionParams.target} - packet ${counter + 1}/${executionParams.duration * 2}`,
          type: 'info',
        });
        setLogs((prevLogs) => [...prevLogs, simulatedLogs[simulatedLogs.length - 1]]);
        counter++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs((prevLogs) => [
          ...prevLogs,
          { timestamp: new Date().toISOString(), message: 'Execution finished.', type: 'success' },
        ]);
      }
    }, 500);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [
      ...prevLogs,
      { timestamp: new Date().toISOString(), message: 'Execution stopped by user.', type: 'info' },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">[MIRAI] Cronical Tool</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
          {sourceCode.map((file, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-medium text-gray-200 mb-2">{file.name} ({file.language})</h3>
              <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                <code>{file.content}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target:</label>
            <input
              type="text"
              id="target"
              name="target"
              value={executionParams.target}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              placeholder="e.g., example.com or 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionParams.duration}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionParams.rps}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionParams.threads}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={executionParams.method}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Execution
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stop Execution
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-80 overflow-auto">
          {logs.map((log, index) => (
            <p
              key={index}
              className={`text-sm ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}
            >
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_CronicalComponent;
