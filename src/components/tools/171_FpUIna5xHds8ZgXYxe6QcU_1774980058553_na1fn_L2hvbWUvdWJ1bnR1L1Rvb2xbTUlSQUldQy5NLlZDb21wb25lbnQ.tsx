
import React, { useState, useEffect } from 'react';

interface ToolC_M_VComponentProps {
  toolName: string;
  sourceCodeC: string;
  sourceCodeSh: string;
}

const ToolMIRAI_C_M_VComponent: React.FC<ToolC_M_VComponentProps> = ({ toolName, sourceCodeC, sourceCodeSh }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing ${method} on ${target} with ${rps} RPS...`]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, target, method, rps]);

  const startExecution = () => {
    if (!target) {
      setError('Target cannot be empty.');
      return;
    }
    setError(null);
    setLogs([]);
    setIsRunning(true);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Stopping execution for ${toolName}.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} Control Panel</h1>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded-md mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 p-6 rounded-md shadow-lg overflow-auto h-96 mb-6">
            <pre className="text-sm text-gray-300">
              <code className="language-c">
                {sourceCodeC || '// No C source code found.'}
              </code>
              <br />
              <code className="language-bash">
                {sourceCodeSh || '// No Shell script found.'}
              </code>
            </pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., http://example.com"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                min="1"
                disabled={isRunning}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isRunning}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Logs */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-800 p-6 rounded-md shadow-lg overflow-auto h-96">
              {logs.length === 0 ? (
                <p className="text-gray-500">No logs yet. Start execution to see logs.</p>
              ) : (
                logs.map((log, index) => (
                  <p key={index} className="text-sm text-gray-300 mb-1">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_C_M_VComponent;
