import React, { useState, useEffect } from 'react';

interface LockBoxExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolLockBoxComponent: React.FC = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [target, setTarget] = useState<string>('127.0.0.1');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would fetch the source code from the backend
    // For this simulation, we'll use the content we already read.
    const lockboxSourceCode = `import os
import sys

def run_lockbox(target, duration, rps, threads, method):
    print(f"Running LockBox with:")
    print(f"  Target: {target}")
    print(f"  Duration: {duration}s")
    print(f"  RPS: {rps}")
    print(f"  Threads: {threads}")
    print(f"  Method: {method}")
    print("Simulating LockBox execution...")
    # In a real scenario, this would execute the actual LockBox logic
    for i in range(5):
        print(f"Log message {i+1} from LockBox")
        # Simulate some work
        // time.sleep(1)
    print("LockBox execution finished.")

if __name__ == "__main__":
    # Example usage if run directly
    if len(sys.argv) == 6:
        run_lockbox(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5])
    else:
        print("Usage: python lockbox.py <target> <duration> <rps> <threads> <method>")
`;
    setSourceCode(lockboxSourceCode);
  }, []);

  const simulateExecution = (params: LockBoxExecutionParams) => {
    setLogs([]);
    setError(null);
    setIsExecuting(true);

    const newLogs: string[] = [];
    newLogs.push(`[${new Date().toLocaleTimeString()}] Starting LockBox execution...`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] Target: ${params.target}`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] Duration: ${params.duration}s`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] RPS: ${params.rps}`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] Threads: ${params.threads}`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] Method: ${params.method}`);

    let logCount = 0;
    const interval = setInterval(() => {
      if (logCount < 5) {
        newLogs.push(`[${new Date().toLocaleTimeString()}] Log message ${logCount + 1} from LockBox (simulated)`);
        setLogs([...newLogs]);
        logCount++;
      } else {
        clearInterval(interval);
        newLogs.push(`[${new Date().toLocaleTimeString()}] LockBox execution finished (simulated).`);
        setLogs([...newLogs]);
        setIsExecuting(false);
      }
    }, 1000);

    // Simulate an error after some time
    // setTimeout(() => {
    //   if (Math.random() > 0.8) {
    //     setError('Simulated error during execution!');
    //     setIsExecuting(false);
    //     clearInterval(interval);
    //   }
    // }, 3000);
  };

  const handleStart = () => {
    simulateExecution({ target, duration, rps, threads, method });
  };

  const handleStop = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] LockBox execution stopped by user.`]);
    // In a real scenario, this would send a signal to stop the backend process
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">LockBox Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code: lockbox.py</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isExecuting}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isExecuting}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            STOP
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-4">Error: {error}</p>
        )}
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-black text-gray-50 p-4 rounded-lg h-64 overflow-y-scroll text-sm">
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

export default ToolLockBoxComponent;
