
import React, { useState, useEffect } from 'react';

interface OwariV2Props {
  // Define any props for the component here if needed
}

const ToolOwariV2Component: React.FC<OwariV2Props> = () => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [sourceCode, setSourceCode] = useState<string>('');

  // Simulate fetching source code
  useEffect(() => {
    // In a real application, this would be fetched from an API or bundled
    const dummySourceCode = `int main() { return 0; }`;
    setSourceCode(dummySourceCode);
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing request ${counter} to ${target} with method ${method}...`]);
      if (counter >= 5) { // Simulate a few requests then stop
        clearInterval(interval);
        stopExecution();
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">OwariV2 Tool Interface</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-64 shadow-lg">
          <code className="text-sm text-gray-200">
            {sourceCode || 'Loading source code...'}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target (e.g., example.com)</label>
          <input
            type="text"
            id="target"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-100"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter target URL or IP"
            disabled={isExecuting}
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
          <input
            type="number"
            id="duration"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-100"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div>
          <label htmlFor="rps" className="block text-sm font-medium text-gray-300">Requests Per Second (RPS)</label>
          <input
            type="number"
            id="rps"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-100"
            value={rps}
            onChange={(e) => setRps(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div>
          <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
          <input
            type="number"
            id="threads"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-100"
            value={threads}
            onChange={(e) => setThreads(Number(e.target.value))}
            min="1"
            disabled={isExecuting}
          />
        </div>
        <div>
          <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
          <select
            id="method"
            className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-100"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={isExecuting}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="HEAD">HEAD</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={startExecution}
          disabled={isExecuting || !target}
          className="px-6 py-3 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          START
        </button>
        <button
          onClick={stopExecution}
          disabled={!isExecuting}
          className="px-6 py-3 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          STOP
        </button>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 shadow-lg">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 leading-relaxed">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolOwariV2Component;
