
import React, { useState, useEffect } from 'react';

interface ToolKuriaComponentProps {
  toolPath: string;
}

const ToolKuriaComponent: React.FC<ToolKuriaComponentProps> = ({ toolPath }) => {
  const [cCode, setCCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const readFiles = async () => {
      try {
        // In a real scenario, this would involve a backend API call
        // to read the file content from the server.
        // For this simulation, we'll use dummy content.
        const cContent = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Kuria C!\\n\");\n    return 0;\n}\n`;
        const shContent = `#!/bin/bash\n\necho \"Hello from Kuria Shell!\"\n`;

        setCCode(cContent);
        setShCode(shContent);
      } catch (error) {
        console.error('Error reading tool files:', error);
        setExecutionLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    readFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setExecutionLogs(prev => [...prev, `Target: ${target}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    // Simulate execution
    setTimeout(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating C code execution...`]);
      setExecutionLogs(prev => [...prev, `Hello from Kuria C!`]);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating Shell script execution...`]);
      setExecutionLogs(prev => [...prev, `Hello from Kuria Shell!`]);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, 3000);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Kuria Tool Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code: main.c</h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm h-64">
            <code className="text-emerald-200">{
              cCode || '// Loading C code...'}
            </code>
          </pre>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code: script.sh</h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm h-64">
            <code className="text-emerald-200">{
              shCode || '// Loading Shell script code...'}
            </code>
          </pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-auto text-sm h-64 text-gray-50">
          {executionLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ToolKuriaComponent;
