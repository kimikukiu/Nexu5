
import React, { useState, useEffect } from 'react';

interface ToolOnryoComponentProps {
  toolName: string;
}

const ToolOnryoComponent: React.FC<ToolOnryoComponentProps> = ({ toolName }) => {
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCodeSnippets = async () => {
      const files = ['onryo.c', 'onryo.py', 'onryo.sh']; // Add .go if applicable
      const snippets: Record<string, string> = {};
      for (const file of files) {
        try {
          // In a real scenario, you would fetch this from a backend API
          // For this simulation, we'll use the dummy content we 'read' earlier
          if (file === 'onryo.c') snippets[file] = `int main() { return 0; }`;
          if (file === 'onryo.py') snippets[file] = `print('Hello from Python')`;
          if (file === 'onryo.sh') snippets[file] = `echo 'Hello from Shell'`;
        } catch (error) {
          console.error(`Failed to load ${file}:`, error);
          snippets[file] = `Error loading ${file}`;
        }
      }
      setCodeSnippets(snippets);
    };

    fetchCodeSnippets();
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
    setExecutionLogs(prev => [...prev, `Target: ${targetInput}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);

    // Simulate execution logs
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating activity... Log entry ${logCount}`]);
      if (logCount >= 5) {
        clearInterval(interval);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution simulation finished.`]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution for ${toolName}.`]);
    // In a real scenario, you would send a stop signal to the backend
  };

  return (
    <div className="bg-gray-900 text-emerald-400 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-300">Mirai Tool: {toolName}</h1>

      {/* Code Viewer Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
        {Object.entries(codeSnippets).map(([filename, code]) => (
          <div key={filename} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg">
            <h3 className="text-xl font-medium mb-2 text-emerald-200">{filename}</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-100">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Execution Controls */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
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
            onClick={startExecution}
            disabled={isExecuting}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-900 h-64 overflow-y-scroll p-4 rounded-md border border-gray-700">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-sm text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolOnryoComponent;
