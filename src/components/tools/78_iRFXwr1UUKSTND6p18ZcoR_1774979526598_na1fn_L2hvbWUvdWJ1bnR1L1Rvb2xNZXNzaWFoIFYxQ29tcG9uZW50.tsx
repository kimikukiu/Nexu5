
import React, { useState, useEffect } from 'react';

interface ToolMessiahV1Props {
  toolName: string;
}

const ToolMessiahV1Component: React.FC<ToolMessiahV1Props> = ({ toolName }) => {
  const [code, setCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading the code file
    const fetchCode = async () => {
      try {
        // In a real scenario, you would fetch this from a backend or a static file server
        // For this simulation, we'll use a placeholder.
        const dummyCode = `/* Messiah V1 C code */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Messiah V1 C!\\n\");\n    return 0;\n}`; // This should be replaced with actual file read logic
        setCode(dummyCode);
      } catch (error) {
        console.error('Failed to load code:', error);
        setLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    fetchCode();
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
    setLogs(prev => [...prev, `Target: ${target}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);

    // Simulate execution
    let executionInterval: NodeJS.Timeout;
    let logCounter = 0;
    const maxLogs = 20;

    executionInterval = setInterval(() => {
      if (logCounter < maxLogs) {
        setLogs(prev => {
          const newLogs = [...prev, `[${new Date().toLocaleTimeString()}] Executing... (simulated data)`];
          return newLogs.slice(Math.max(newLogs.length - 10, 0)); // Keep last 10 logs
        });
        logCounter++;
      } else {
        clearInterval(executionInterval);
        stopExecution();
      }
    }, 1000);

    // Simulate stopping after duration
    setTimeout(() => {
      clearInterval(executionInterval);
      stopExecution();
    }, duration * 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped for ${toolName}.`]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} Component</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-xl text-emerald-300 mb-3">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-64 text-sm border border-gray-700">
          <code>{code || 'Loading code...'}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col">
          <label htmlFor="target" className="text-emerald-300 mb-1">Target Input:</label>
          <input
            id="target"
            type="text"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-emerald-500"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g., example.com or 192.168.1.1"
            disabled={isExecuting}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-emerald-300 mb-1">Duration (seconds):</label>
          <input
            id="duration"
            type="number"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-emerald-500"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rps" className="text-emerald-300 mb-1">RPS (Requests Per Second):</label>
          <input
            id="rps"
            type="number"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-emerald-500"
            value={rps}
            onChange={(e) => setRps(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="threads" className="text-emerald-300 mb-1">Threads:</label>
          <input
            id="threads"
            type="number"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-emerald-500"
            value={threads}
            onChange={(e) => setThreads(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="method" className="text-emerald-300 mb-1">Method:</label>
          <select
            id="method"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:border-emerald-500"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={isExecuting}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="UDP">UDP</option>
            <option value="TCP">TCP</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={startExecution}
          disabled={isExecuting || !target}
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200
            ${isExecuting ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
        >
          START
        </button>
        <button
          onClick={stopExecution}
          disabled={!isExecuting}
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200
            ${!isExecuting ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
        >
          STOP
        </button>
      </div>

      {/* Real-time Logs */}
      <div>
        <h2 className="text-xl text-emerald-300 mb-3">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-64 text-sm border border-gray-700">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see real-time output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-300 leading-tight">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMessiahV1Component;
