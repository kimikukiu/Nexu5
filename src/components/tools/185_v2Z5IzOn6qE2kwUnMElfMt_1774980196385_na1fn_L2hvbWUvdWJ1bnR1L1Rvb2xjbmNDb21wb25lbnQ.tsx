import React, { useState, useEffect } from 'react';

interface ToolcncProps {
  sourceCodeFiles?: Record<string, string>; // Optional prop to pass source code content
}

const ToolcncComponent: React.FC<ToolcncProps> = ({ sourceCodeFiles }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (sourceCodeFiles) {
      setSourceCode(sourceCodeFiles);
    } else {
      // Fallback for demonstration if no prop is provided
      setSourceCode({
        'cnc.c': `/* cnc.c */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from cnc.c!\\n\");\n    return 0;\n}`,
      });
    }
  }, []);

  const handleStart = () => {
    if (!targetInput || duration <= 0 || rps <= 0 || threads <= 0 || !method) {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Please fill all execution parameters correctly.`]);
      return;
    }
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution started with target: ${targetInput}, duration: ${duration}, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    // Simulate execution
    setTimeout(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulation complete.`]);
      setIsRunning(false);
    }, 5000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  return (
    <div className="bg-gray-900 text-emerald-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">CNC Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        {Object.entries(sourceCode).map(([filename, code]) => (
          <div key={filename} className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg">
            <h3 className="text-xl text-emerald-200 mb-2">{filename}</h3>
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-300">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Manual Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS:</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
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
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-scroll shadow-lg">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-sm text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolcncComponent;
