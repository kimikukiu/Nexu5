import React, { useState, useEffect } from 'react';

interface ToolCayosinV3NiggerProps {
  // Define props here if any
}

const ToolCayosinV3NiggerComponent: React.FC<ToolCayosinV3NiggerProps> = () => {
  // State for code snippets, execution logs, and controls
  const [codeSnippets, setCodeSnippets] = useState<{[key: string]: string}>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the file content.
    // For this task, we'll embed the content directly.
    setCodeSnippets({
      'cayosin.py': `import os
import sys
import time

def attack(target, duration, rps, threads, method):
    print(f"Starting attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    start_time = time.time()
    while (time.time() - start_time) < duration:
        # Simulate attack traffic
        sys.stdout.write(".")
        sys.stdout.flush()
        time.sleep(1)
    print("\nAttack finished.")

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print("Usage: python cayosin.py <target> <duration> <rps> <threads> <method>")
        sys.exit(1)
    
    target = sys.argv[1]
    duration = int(sys.argv[2])
    rps = int(sys.argv[3])
    threads = int(sys.argv[4])
    method = sys.argv[5]
    
    attack(target, duration, rps, threads, method)
`
    });
  }, []);

  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!target || duration <= 0 || rps <= 0 || threads <= 0 || !method) {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Please fill all execution parameters correctly.`]);
      return;
    }

    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting attack on ${target} for ${duration} seconds with ${rps} RPS, ${threads} threads, using ${method} method.`]);

    let timeElapsed = 0;
    const interval = setInterval(() => {
      if (timeElapsed < duration) {
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (Time elapsed: ${timeElapsed + 1}s)`]);
        timeElapsed++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attack finished.`]);
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const handleStop = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">[MIRAI] Cayosin v3 nigger Tool</h1>

      {/* Code Viewer Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        {Object.entries(codeSnippets).length > 0 ? (
          Object.entries(codeSnippets).map(([filename, code]) => (
            <div key={filename} className="mb-4">
              <h3 className="text-lg text-emerald-200 mb-2">{filename}</h3>
              <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No source code found or loaded.</p>
        )}
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
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
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Math.max(0, parseInt(e.target.value) || 0))}
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
              onChange={(e) => setRps(Math.max(0, parseInt(e.target.value) || 0))}
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
              onChange={(e) => setThreads(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning || !target || duration <= 0 || rps <= 0 || threads <= 0 || !method}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 ease-in-out"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 ease-in-out"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-lg h-64 overflow-y-auto text-sm border border-gray-700">
          {executionLogs.length > 0 ? (
            executionLogs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))
          ) : (
            <p className="text-gray-400">No logs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCayosinV3NiggerComponent;
