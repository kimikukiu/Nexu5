import React, { useState, useEffect } from 'react';

interface ToolHitoriComponentProps {
  toolPath: string;
}

const ToolHitoriComponent: React.FC<ToolHitoriComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real application, this would be an API call to read the file content
        // For this simulation, we'll use a placeholder or a direct read if possible
        // Since direct file reading from browser is not possible, we simulate it.
        const dummyCode = `/* Hitori C code */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Hitori C!\\n\");\n    return 0;\n}`; // Placeholder for actual file content
        setSourceCode(dummyCode);
      } catch (error) {
        console.error('Error fetching source code:', error);
        setLogs(prev => [...prev, `Error loading source code: ${error}`]);
      }
    };
    fetchSourceCode();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting Hitori execution...`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Input: ${input}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);

    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < duration * 2) { // Simulate logs for twice the duration
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Hitori output: Hello from Hitori C! (simulated run ${counter + 1})`]);
        counter++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Hitori execution finished.`]);
      }
    }, 500);

    // In a real scenario, you would make an API call to a backend that executes the tool
    // Example: axios.post('/api/execute/hitori', { input, duration, rps, threads, method });
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping Hitori execution.`]);
    // In a real scenario, you would send a signal to stop the backend process
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Hitori Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm border border-gray-700">
          <code>{sourceCode || 'Loading source code...'}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-300 mb-1">Target Input</label>
            <input
              type="text"
              id="input"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., target.com/path"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
            <input
              type="number"
              id="threads"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
            <select
              id="method"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
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
            onClick={handleStart}
            disabled={isRunning}
            className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm border border-gray-700">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-200 leading-tight">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHitoriComponent;
