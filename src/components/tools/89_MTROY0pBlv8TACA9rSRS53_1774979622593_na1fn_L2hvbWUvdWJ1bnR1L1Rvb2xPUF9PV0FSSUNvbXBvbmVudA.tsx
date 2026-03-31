import React, { useState, useEffect, useRef } from 'react';

interface ToolOP_OWARIProps {
  // Define any props the component might receive
}

const ToolOP_OWARIComponent: React.FC<ToolOP_OWARIProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to read source code (will be implemented in next phase)
  useEffect(() => {
    const readSourceCode = async () => {
      // Placeholder for reading source code from /home/ubuntu/extracted_tools/OP_OWARI/
      // This will involve shell commands or file system access
      const code = `import time\n\ndef run_op_owari(target, duration, rps, threads, method):\n    print(f"Starting OP_OWARI with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        # Simulate some work\n        time.sleep(0.1)\n        print(f"Executing... elapsed: {time.time() - start_time:.2f}s")\n    print("OP_OWARI execution finished.")\n\nif __name__ == "__main__":\n    # Example usage for direct execution\n    run_op_owari("example.com", 10, 100, 50, "GET")\n`;
      setSourceCode(code);
    };
    readSourceCode();
  }, []);

  const handleStartExecution = () => {
    setError(null);
    if (!targetInput) {
      setError("Target input cannot be empty.");
      return;
    }
    setIsExecuting(true);
    setExecutionLogs([]);
    // Simulate execution for now
    let currentDuration = 0;
    intervalRef.current = setInterval(() => {
      currentDuration++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing ${method} to ${target} with ${rps} RPS, ${threads} threads. Elapsed: ${currentDuration}s / ${duration}s`]);
      if (currentDuration >= duration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsExecuting(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished for ${target}.`]);
      }
    }, 1000);
    // Store the interval ID to clear it on stop
    // This requires a ref or state to hold the interval ID, adding it now.
    // For simplicity, let's assume we can clear it directly for now, but a ref would be better.
    // Will add a ref in the next step if needed.
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">OP_OWARI Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm text-gray-300">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-800 p-4 rounded-lg mb-8">
          <p className="text-red-200 font-bold">Error: {error}</p>
        </div>
      )}

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
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
              onChange={(e) => setDuration(Number(e.target.value))}
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
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
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
        <div className="flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-64 text-sm text-gray-300">
          {executionLogs.map((log, index) => (
            <p key={index} className="mb-1">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolOP_OWARIComponent;
