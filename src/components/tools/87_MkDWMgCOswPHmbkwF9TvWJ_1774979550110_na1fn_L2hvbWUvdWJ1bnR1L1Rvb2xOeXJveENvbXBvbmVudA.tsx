
import React, { useState, useEffect } from 'react';

interface NyroxExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolNyroxComponent: React.FC = () => {
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(5);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // In a real scenario, you would fetch the code from the backend or a static file.
    // For this simulation, we'll use the content of the dummy file.
    const dummyCode = `import time\n\ndef run_nyrox_attack(target, duration, rps, threads, method):\n    print(f"Starting Nyrox attack on {target} for {duration} seconds...")\n    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        # Simulate attack logic\n        time.sleep(1)\n        print("Executing...")\n    print("Nyrox attack finished.")\n\nif __name__ == "__main__":\n    # Example usage\n    run_nyrox_attack("example.com", 10, 100, 5, "GET")`;
    setCodeSnippet(dummyCode);
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    let currentDuration = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      currentDuration = Math.floor((Date.now() - startTime) / 1000);
      if (currentDuration < duration) {
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing... (Target: ${target}, RPS: ${rps}, Method: ${method})`]);
      } else {
        stopExecution();
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Nyrox attack finished.`]);
      }
    }, 1000);
    setExecutionInterval(interval);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting Nyrox attack on ${target} for ${duration} seconds...`]);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Nyrox Tool Component</h1>

      {/* Code Viewer */}
      <div className="bg-gray-800 rounded-lg shadow-lg mb-8">
        <div className="bg-gray-700 px-4 py-2 rounded-t-lg flex justify-between items-center">
          <span className="text-sm text-gray-300">nyrox_tool.py</span>
          <span className="text-xs text-emerald-400">Source Code</span>
        </div>
        <pre className="p-4 overflow-auto text-sm leading-relaxed max-h-64">
          <code className="language-python text-gray-200">
            {codeSnippet}
          </code>
        </pre>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isExecuting}
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
            className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Logs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Execution Logs</h2>
        <div className="bg-black p-4 rounded-md overflow-auto max-h-80 text-sm text-green-400">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="whitespace-pre-wrap">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolNyroxComponent;
