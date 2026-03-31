import React, { useState, useEffect } from 'react';

interface ToolInfectednightMainComponentProps {
  toolName: string;
}

const ToolInfectednightMainComponent: React.FC<ToolInfectednightMainComponentProps> = ({ toolName }) => {
  const [cCode, setCCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading file content
    setCCode(`#include <stdio.h>\n\nint main() {\n    printf(\
\"Hello from C!\\n\");\n    return 0;\n}\n`);
    setGoCode(`package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}\n`);
    setPyCode(`def hello_python():\n    print(\"Hello from Python!\")\n\nif __name__ == \"__main__\":\n    hello_python()\n`);
    setShCode(`#!/bin/bash\n\necho \"Hello from Bash!\"\n`);
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
    // Simulate execution
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished for ${toolName}.`]);
      setIsRunning(false);
    }, 5000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution for ${toolName}...`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-500 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName} Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Code Viewers */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">main.c</h2>
          <pre className="bg-gray-950 p-3 rounded-md text-sm overflow-auto max-h-60">{cCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">script.go</h2>
          <pre className="bg-gray-950 p-3 rounded-md text-sm overflow-auto max-h-60">{goCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">utility.py</h2>
          <pre className="bg-gray-950 p-3 rounded-md text-sm overflow-auto max-h-60">{pyCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">run.sh</h2>
          <pre className="bg-gray-950 p-3 rounded-md text-sm overflow-auto max-h-60">{shCode}</pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>UDP</option>
              <option>TCP</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            className={`px-6 py-3 rounded-md font-semibold ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition duration-300`}
            onClick={isRunning ? handleStop : handleStart}
            disabled={!targetInput}
          >
            {isRunning ? 'STOP' : 'START'}
          </button>
        </div>
      </div>

      {/* Real-time Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-emerald-300">Real-time Logs</h2>
        <div className="bg-gray-950 p-3 rounded-md text-sm h-60 overflow-auto">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-200">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolInfectednightMainComponent;
