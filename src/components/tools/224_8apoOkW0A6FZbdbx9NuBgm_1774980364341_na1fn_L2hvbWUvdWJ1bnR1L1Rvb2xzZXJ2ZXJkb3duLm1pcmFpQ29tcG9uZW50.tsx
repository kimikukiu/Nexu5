import React, { useState, useEffect } from 'react';

interface ToolserverdownProps {
  sourceCode: string;
}

const Toolserverdown.miraiComponent: React.FC<ToolserverdownProps> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const startExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    addLog(`Starting serverdown attack on ${target} for ${duration} seconds...`);
    addLog(`RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed++;
      addLog(`Attack running... Elapsed: ${elapsed}s`);
      if (elapsed >= duration) {
        clearInterval(interval);
        addLog(`Serverdown attack on ${target} finished.`);
        setIsExecuting(false);
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    addLog('Execution stopped by user.');
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
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">serverdown.mirai Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Source Code (serverdown.py)</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-96">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap">{sourceCode}</pre>
          </div>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com"
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="1"
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={rps}
                onChange={(e) => setRps(parseInt(e.target.value))}
                min="1"
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-appearance border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value))}
                min="1"
                disabled={isExecuting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isExecuting}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="SYN">SYN</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={startExecution}
                disabled={isExecuting || !target}
              >
                START
              </button>
              <button
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={stopExecution}
                disabled={!isExecuting}
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-64">
            {logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-200">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolserverdown.miraiComponent;
