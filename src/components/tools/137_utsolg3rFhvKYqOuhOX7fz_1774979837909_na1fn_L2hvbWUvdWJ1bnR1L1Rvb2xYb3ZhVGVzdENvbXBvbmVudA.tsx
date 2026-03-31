
import React, { useState, useEffect } from 'react';

interface ToolXovaTestProps {
  toolName: string;
}

const ToolXovaTestComponent: React.FC<ToolXovaTestProps> = ({ toolName }) => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [sourceCode, setSourceCode] = useState<string>('');

  // Simulate fetching source code
  useEffect(() => {
    const fetchSourceCode = async () => {
      // In a real application, you would fetch this from a backend or a static file
      const code = `import time\nimport sys\n\ndef run_xovatest(target, duration, rps, threads, method):\n    print(f"Starting XovaTest with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    logs = []\n    for i in range(int(duration)):\n        log_entry = f"[{time.time() - start_time:.2f}s] Sending {rps} requests per second..."\n        print(log_entry)\n        logs.append(log_entry)\n        time.sleep(1)\n    print("XovaTest finished.")\n    return logs\n\nif __name__ == "__main__":\n    if len(sys.argv) == 6:\n        target = sys.argv[1]\n        duration = int(sys.argv[2])\n        rps = int(sys.argv[3])\n        threads = int(sys.argv[4])\n        method = sys.argv[5]\n        run_xovatest(target, duration, rps, threads, method)\n    else:\n        print("Usage: python xovatest.py <target> <duration> <rps> <threads> <method>")\n`;
      setSourceCode(code);
    };
    fetchSourceCode();
  }, []);

  const startExecution = () => {
    if (!target || duration <= 0 || rps <= 0 || threads <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }
    setIsRunning(true);
    setLogs([`Starting ${toolName} execution...`]);

    let currentDuration = 0;
    const interval = setInterval(() => {
      if (currentDuration < duration) {
        const newLog = `[${currentDuration.toFixed(2)}s] Sending ${rps} requests to ${target} with ${threads} threads using ${method} method...`;
        setLogs((prevLogs) => [...prevLogs, newLog]);
        currentDuration++;
      } else {
        clearInterval(interval);
        setLogs((prevLogs) => [...prevLogs, `${toolName} execution finished.`]);
        setIsRunning(false);
      }
    }, 1000);

    // Store interval ID to clear it later if needed
    return () => clearInterval(interval);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `${toolName} execution stopped by user.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName}</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <pre className="text-sm whitespace-pre-wrap break-all">
            <code className="language-python text-gray-200">
              {sourceCode}
            </code>
          </pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
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
          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
            <button
              onClick={startExecution}
              disabled={isRunning}
              className="px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Real-time Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-80">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-300 text-sm leading-relaxed">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolXovaTestComponent;
