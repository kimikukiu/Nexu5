import React, { useState, useEffect } from 'react';

interface ToolMirai_UniversalComponentProps {
  // No specific props for now, but can be extended later
}

const ToolMirai_UniversalComponent: React.FC<ToolMirai_UniversalComponentProps> = () => {
  const [target, setTarget] = useState<string>('127.0.0.1');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('HTTP_FLOOD');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const sourceCode = `import time

def run_attack(target, duration, rps, threads, method):
    print(f"Starting Mirai_Universal attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    start_time = time.time()
    while (time.time() - start_time) < duration:
        # Simulate attack traffic
        time.sleep(1 / rps)
        print(f"Attack running... Elapsed: {int(time.time() - start_time)}s")
    print("Attack finished.")

if __name__ == "__main__":
    # Example usage (these would come from the React component)
    # run_attack("192.168.1.1", 60, 100, 50, "HTTP_FLOOD")
    pass
    pass
`;

  const startExecution = () => {
    if (isRunning) return;

    setIsRunning(true);
    setLogs([]);
    let currentDuration = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (currentDuration >= duration) {
        clearInterval(interval);
        setLogs((prev) => [...prev, 'Attack finished.']);
        setIsRunning(false);
        setExecutionInterval(null);
        return;
      }

      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Attack running... Target: ${target}, Method: ${method}, Elapsed: ${currentDuration}s`,
      ]);
      currentDuration++;
    }, 1000);

    setExecutionInterval(interval);
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Starting Mirai_Universal attack on ${target} for ${duration} seconds...`,
      `[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`,
    ]);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsRunning(false);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Attack stopped by user.`]);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai_Universal Tool</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          <code className="language-python text-green-300">
            {sourceCode}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target (IP/Domain/URL)</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isRunning}
            >
              <option value="HTTP_FLOOD">HTTP_FLOOD</option>
              <option value="UDP_FLOOD">UDP_FLOOD</option>
              <option value="SYN_FLOOD">SYN_FLOOD</option>
              <option value="ACK_FLOOD">ACK_FLOOD</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isRunning}
            className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm text-gray-300">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start the execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className={log.includes('Error') ? 'text-red-400' : ''}>
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMirai_UniversalComponent;
