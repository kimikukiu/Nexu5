
import React, { useState, useEffect } from 'react';

interface ToolMelodicComponentProps {
  toolPath: string;
}

const ToolMelodicComponent: React.FC<ToolMelodicComponentProps> = ({ toolPath }) => {
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
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, this would involve reading multiple files
        // For this simulation, we'll read the dummy melodic.c file
        const response = await fetch(`${toolPath}/melodic.c`);
        if (!response.ok) {
          throw new Error(`Failed to fetch source code: ${response.statusText}`);
        }
        const code = await response.text();
        setSourceCode(code);
      } catch (err: any) {
        setError(`Error loading source code: ${err.message}`);
        console.error(err);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs(['Starting Melodic execution...']);
    setError(null);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating attack on ${target} with ${rps} RPS, method ${method}. Log entry ${logCount}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs((prevLogs) => [...prevLogs, 'Melodic execution finished.']);
      }
    }, 1000);

    // Simulate stopping after duration
    setTimeout(() => {
      if (isExecuting) {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs((prevLogs) => [...prevLogs, 'Melodic execution stopped due to duration.']);
      }
    }, duration * 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs((prevLogs) => [...prevLogs, 'Melodic execution manually stopped.']);
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Melodic Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
            <pre className="text-sm text-emerald-200 whitespace-pre-wrap">
              <code>{sourceCode || 'Loading source code...'}
              </code>
            </pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div>
              <label htmlFor="target" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS (Requests per second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isExecuting}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-60">
          <pre className="text-sm text-emerald-200 whitespace-pre-wrap">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ToolMelodicComponent;
