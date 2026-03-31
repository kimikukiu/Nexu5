
import React, { useState, useEffect } from 'react';

interface ToolreleaseComponentProps {
  toolPath: string;
}

const ToolreleaseComponent: React.FC<ToolreleaseComponentProps> = ({ toolPath }) => {
  const [cCode, setCCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        // In a real application, you would fetch these files from a server.
        // For this simulation, we'll use placeholder content.
        setCCode(`// main.c\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`);
        setGoCode(`// script.go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}`);
        setPyCode(`// logic.py\ndef run_logic():\n    print(\"Hello from Python!\")\n\nif __name__ == \"__main__\":\n    run_logic()`);
        setShCode(`// run.sh\n#!/bin/bash\n\necho \"Hello from Bash!\"`);
      } catch (error) {
        console.error('Error fetching code:', error);
        setExecutionLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    fetchCode();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with:`]);
    setExecutionLogs(prev => [...prev, `  Target Input: ${targetInput}`]);
    setExecutionLogs(prev => [...prev, `  Duration: ${duration}s`]);
    setExecutionLogs(prev => [...prev, `  RPS: ${rps}`]);
    setExecutionLogs(prev => [...prev, `  Threads: ${threads}`]);
    setExecutionLogs(prev => [...prev, `  Method: ${method}`]);
    // Simulate execution
    const simulationInterval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating execution...`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(simulationInterval);
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000 || 5000); // Default to 5 seconds if duration is 0
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: Release</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Code Viewers */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">main.c</h2>
          <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm h-48">{cCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">script.go</h2>
          <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm h-48">{goCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">logic.py</h2>
          <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm h-48">{pyCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">run.sh</h2>
          <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm h-48">{shCode}</pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
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
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-3 rounded overflow-auto h-64 text-sm">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolreleaseComponent;
