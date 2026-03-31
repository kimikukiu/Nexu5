import React, { useState, useEffect, useRef } from 'react';

interface ToollogsComponentProps {
  toolPath: string;
}

const ToollogsComponent: React.FC<ToollogsComponentProps> = ({ toolPath }) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(1);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logCountRef = useRef<number>(0);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const dummyCode = `import time\n\ndef run_logs_tool(target, duration, rps, threads, method):\n    print(f"Starting logs tool with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    logs = []\n    for i in range(int(duration * rps)):\n        log_entry = f"[{time.time()}] Log entry {i+1} for {target}"\n        logs.append(log_entry)\n        time.sleep(1/rps)\n        if (time.time() - start_time) > duration:\n            break\n    print("Logs tool finished.")\n    return logs\n\nif __name__ == "__main__":\n    # Example usage\n    run_logs_tool("example.com", 10, 1, 1, "GET")`;
        setCode(dummyCode);
      } catch (err) {
        setError('Failed to load tool code.');
        console.error(err);
      }
    };

    fetchCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]); // Clear previous logs
    logCountRef.current = 0;
    const startTime = Date.now();
    const totalLogsToGenerate = duration * rps;

    intervalRef.current = setInterval(() => {
      if (logCountRef.current < totalLogsToGenerate && (Date.now() - startTime) / 1000 < duration) {
        logCountRef.current++;
        setLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toISOString()}] Log entry ${logCountRef.current} for ${target} (Method: ${method}, Thread: ${Math.floor(Math.random() * threads) + 1})`,
        ]);
      } else {
        stopExecution();
      }
    }, 1000 / rps); // Generate logs at the specified RPS
  };

  const stopExecution = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toISOString()}] Execution stopped.`]);
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Logs Tool Component</h2>
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Execution Controls</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input:</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS:</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
            onClick={startExecution}
            disabled={isRunning}
          >
            START
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
            onClick={stopExecution}
            disabled={!isRunning}
          >
            STOP
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Tool Code</h3>
      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-auto max-h-96 mb-4">
        <pre>{code}</pre>
      </div>

      <h3 className="text-xl font-semibold mb-2">Execution Logs</h3>
      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-auto max-h-48">
        {logs.length === 0 ? (
          <p className="text-gray-400">No logs yet.</p>
        ) : (
          logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default ToollogsComponent;
