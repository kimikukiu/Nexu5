
import React, { useState, useEffect } from 'react';

interface ToolPriority_3ComponentProps {
  // Define any props if needed
}

const ToolPriority_3Component: React.FC<ToolPriority_3ComponentProps> = () => {
  const [target, setTarget] = useState<string>('http://example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(5);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // The actual source code from /home/ubuntu/extracted_tools/Priority_3/priority_3_tool.py
  const sourceCode = `import time\n\ndef run_priority_3_tool(target, duration, rps, threads, method):\n    print(f"Starting Priority_3 tool with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        # Simulate work\n        time.sleep(1 / rps if rps > 0 else 0.1)\n        print(f"Executing... Elapsed: {time.time() - start_time:.2f}s")\n    print("Priority_3 tool finished.")\n\nif __name__ == "__main__":\n    # Example usage\n    run_priority_3_tool("http://example.com", 10, 100, 5, "GET")`;

  const startExecution = () => {
    if (isExecuting) return;

    setLogs([]);
    setIsExecuting(true);
    setStartTime(Date.now());
    const newLogs: string[] = [];

    newLogs.push(`[${new Date().toLocaleTimeString()}] Starting Priority_3 tool with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`);
    setLogs([...newLogs]);

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed = (Date.now() - startTime) / 1000;
      if (elapsed < duration) {
        newLogs.push(`[${new Date().toLocaleTimeString()}] Executing... Elapsed: ${elapsed.toFixed(2)}s`);
        setLogs([...newLogs]);
      } else {
        clearInterval(interval);
        newLogs.push(`[${new Date().toLocaleTimeString()}] Priority_3 tool finished.`);
        setLogs([...newLogs]);
        setIsExecuting(false);
      }
    }, 1000); // Simulate logs every second
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    setIsExecuting(false);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: Priority_3</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code (priority_3_tool.py)</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          <code className="language-python text-green-300">
            {sourceCode}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-white"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-white"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-white"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-white"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-white"
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
            className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${!isExecuting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm text-gray-200">
          {logs.map((log, index) => (
            <p key={index} className="mb-1 last:mb-0">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolPriority_3Component;
