import React, { useState, useEffect } from 'react';

interface ToolAmensSourceProps {
  toolName: string;
}

const ToolAmensSourceComponent: React.FC<ToolAmensSourceProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading the source code file
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, this would be an API call to read the file content
        // For now, we'll use a placeholder or read from the dummy file directly if possible
        const dummyCode = `import time\n\ndef run_attack(target, duration, rps, threads):\n    print(f"Starting AmensSource attack on {target} for {duration} seconds...")\n    print(f"RPS: {rps}, Threads: {threads}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        # Simulate attack logic\n        time.sleep(1 / rps)\n        print(f"Executing attack... ({(time.time() - start_time):.2f}s / {duration}s)")\n    print("Attack finished.")\n\nif __name__ == "__main__":\n    run_attack("example.com", 10, 100, 50)`;
        setSourceCode(dummyCode);
      } catch (error) {
        console.error('Error reading source code:', error);
        setSourceCode('Error loading source code.');
      }
    };
    fetchSourceCode();
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(['Execution started...']);
    // Simulate execution
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating attack on ${target} with ${method} (log ${logCount})`]);
      if (logCount >= duration * 2) { // Simulate logs for twice the duration
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs((prevLogs) => [...prevLogs, 'Execution finished.']);
      }
    }, 500);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, 'Execution stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} - Mirai Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com:8080"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolAmensSourceComponent;
