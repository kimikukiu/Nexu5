import React, { useState, useEffect } from 'react';

interface ToolholyProps {
  // No specific props for now, but can be extended later
}

const ToolholyComponent: React.FC<ToolholyProps> = () => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const sourceCode = `import time\n\ndef run_holy_tool(target, duration, rps, threads, method):\n    print(f"Starting holy tool with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        print(f"Executing... (elapsed: {time.time() - start_time:.2f}s)")\n        time.sleep(1)\n    print("Holy tool execution finished.")\n\nif __name__ == "__main__":\n    # Example usage\n    run_holy_tool("example.com", 10, 100, 50, "GET")\n`;

  const startExecution = () => {
    if (!target) {
      setLogs(prev => [...prev, 'ERROR: Target cannot be empty.']);
      return;
    }
    setIsExecuting(true);
    setLogs([`Starting holy tool with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed++;
      if (elapsed <= duration) {
        setLogs(prev => [...prev, `Executing... (elapsed: ${elapsed}s)`]);
      } else {
        setLogs(prev => [...prev, 'Holy tool execution finished.']);
        stopExecution();
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsExecuting(false);
    setLogs(prev => [...prev, 'Execution stopped by user.']);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="p-4 bg-gray-900 text-emerald-500 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Holy Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Source Code (holy_tool.py)</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 border border-emerald-600">
          <code className="text-sm text-emerald-100">
            {sourceCode}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-md shadow-lg border border-emerald-700">
        <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-emerald-200">Target:</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com"
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-emerald-200">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="1"
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-emerald-200">RPS (Requests Per Second):</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              min="1"
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-emerald-200">Threads:</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              min="1"
              disabled={isExecuting}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-emerald-200">Method:</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
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
            className="flex-1 py-2 px-4 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="flex-1 py-2 px-4 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-60 border border-emerald-600">
          {logs.map((log, index) => (
            <p key={index} className="text-sm text-emerald-100 leading-relaxed">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolholyComponent;
