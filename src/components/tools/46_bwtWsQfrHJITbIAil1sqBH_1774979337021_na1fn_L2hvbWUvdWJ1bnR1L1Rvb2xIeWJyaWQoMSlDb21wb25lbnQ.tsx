
import React, { useState, useEffect } from 'react';

interface ToolHybrid1ComponentProps {
  // Define any props if needed
}

const ToolHybrid1Component: React.FC<ToolHybrid1ComponentProps> = () => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const sourceCode = `
import time

def run_hybrid_attack(target, duration, rps, threads, method):
    print(f"Starting hybrid attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    start_time = time.time()
    while (time.time() - start_time) < duration:
        # Simulate attack logic
        time.sleep(1) # Simulate work
        print(f"Attack running... Elapsed: {int(time.time() - start_time)}s")
    print("Hybrid attack finished.")

if __name__ == "__main__":
    # Example usage
    run_hybrid_attack("example.com", 10, 1000, 50, "GET")
`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && elapsedTime < duration) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Attack running... Elapsed: ${elapsedTime + 1}s`]);
      }, 1000);
    } else if (elapsedTime >= duration && isRunning) {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Hybrid attack finished.`]);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, elapsedTime, duration]);

  const handleStart = () => {
    if (target && duration > 0 && rps > 0 && threads > 0 && method) {
      setIsRunning(true);
      setElapsedTime(0);
      setLogs([`[${new Date().toLocaleTimeString()}] Starting hybrid attack on ${target} for ${duration} seconds...`,
               `[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    } else {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Please fill all fields correctly.`]);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Attack stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Hybrid(1) Tool Component</h1>

      {/* Code Viewer */}
      <div className="bg-gray-800 rounded-lg shadow-lg mb-8">
        <div className="bg-gray-700 px-4 py-2 rounded-t-lg flex justify-between items-center">
          <span className="text-sm text-gray-300">hybrid_script.py</span>
          <span className="text-xs text-emerald-400">Python</span>
        </div>
        <pre className="overflow-x-auto p-4 text-sm text-gray-200">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
              <input
                type="number"
                id="threads"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isRunning}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className={`px-6 py-2 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
            >
              START
            </button>
            <button
              onClick={handleStop}
              disabled={!isRunning}
              className={`px-6 py-2 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              STOP
            </button>
          </div>
        </div>

        {/* Real-time Logs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Execution Logs</h2>
          <div className="bg-black h-64 overflow-y-auto rounded-md p-3 text-sm text-gray-300">
            {logs.map((log, index) => (
              <p key={index} className={log.includes('ERROR') ? 'text-red-400' : ''}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolHybrid1Component;
