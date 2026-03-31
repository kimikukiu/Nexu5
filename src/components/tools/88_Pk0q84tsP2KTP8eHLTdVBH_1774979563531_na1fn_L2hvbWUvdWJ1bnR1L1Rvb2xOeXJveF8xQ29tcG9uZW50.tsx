
import React, { useState, useEffect } from 'react';

interface ToolNyrox_1ComponentProps {
  // Define any props if needed
}

const pythonCode = `
import time

def run_nyrox_1(target, duration, rps, threads, method):
    print(f"Starting Nyrox_1 attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    start_time = time.time()
    while (time.time() - start_time) < duration:
        # Simulate attack traffic
        time.sleep(1 / rps)
        print(f"Sending {method} request to {target}")
    print(f"Nyrox_1 attack on {target} finished.")

if __name__ == "__main__":
    # Example usage (these would come from the React component)
    run_nyrox_1("example.com", 10, 100, 50, "GET")
`;

const ToolNyrox_1Component: React.FC<ToolNyrox_1ComponentProps> = () => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const simulateExecution = async () => {
    setIsRunning(true);
    setLogs([]);
    setError(null);
    addLog(`Starting Nyrox_1 attack on ${target} for ${duration} seconds...`);
    addLog(`RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    const startTime = Date.now();
    let simulatedTime = 0;

    try {
      while (isRunning && simulatedTime < duration * 1000) {
        await new Promise((resolve) => setTimeout(resolve, 1000 / rps)); // Simulate RPS
        if (!isRunning) break;
        addLog(`Sending ${method} request to ${target}`);
        simulatedTime = Date.now() - startTime;
      }
      addLog(`Nyrox_1 attack on ${target} finished.`);
    } catch (err: any) {
      setError(`Execution error: ${err.message}`);
      addLog(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const startExecution = () => {
    if (!target || duration <= 0 || rps <= 0 || threads <= 0 || !method) {
      setError('Please fill in all fields and ensure values are positive.');
      return;
    }
    simulateExecution();
  };

  const stopExecution = () => {
    setIsRunning(false);
    addLog('Execution stopped by user.');
  };

  useEffect(() => {
    // Cleanup if component unmounts while running
    return () => {
      setIsRunning(false);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-emerald-400 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-300">Nyrox_1 Tool Component</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Source Code (nyrox_1.py)</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-100 border border-emerald-600">
          <code>{pythonCode}</code>
        </pre>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-emerald-600">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
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
                onChange={(e) => setThreads(Number(e.target.value))}
                min="1"
              />
            </div>
            <div>
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                           bg-emerald-600 hover:bg-emerald-700 text-white
                           disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isRunning ? 'Running...' : 'START'}
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                           bg-red-600 hover:bg-red-700 text-white
                           disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Logs */}
        <div className="bg-gray-800 p-6 rounded-lg border border-emerald-600">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Execution Logs</h2>
          <div className="bg-gray-700 h-80 p-4 rounded-md overflow-y-auto text-sm text-gray-100 border border-gray-600">
            {logs.length === 0 ? (
              <p className="text-gray-400">No logs yet. Start the execution to see output.</p>
            ) : (
              logs.map((log, index) => (
                <p key={index} className="mb-1 last:mb-0">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolNyrox_1Component;
