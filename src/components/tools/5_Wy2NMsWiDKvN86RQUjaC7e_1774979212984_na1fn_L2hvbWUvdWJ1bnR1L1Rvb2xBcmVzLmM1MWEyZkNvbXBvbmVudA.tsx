import React, { useState, useEffect } from 'react';

interface ToolAresC51a2fComponentProps {
  sourceCode: string;
  toolName: string;
}

const ToolAresC51a2fComponent: React.FC<ToolAresC51a2fComponentProps> = ({ sourceCode, toolName }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60); // seconds
  const [rps, setRps] = useState<number>(100); // requests per second
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const startExecution = () => {
    setIsExecuting(true);
    setLogs([]); // Clear previous logs
    addLog(`Starting execution for ${toolName} with target: ${targetInput}`);
    addLog(`Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    // Simulate execution
    let executionTime = 0;
    const interval = setInterval(() => {
      executionTime++;
      addLog(`Executing... Time elapsed: ${executionTime}s`);
      if (executionTime >= duration) {
        clearInterval(interval);
        addLog('Execution finished.');
        setIsExecuting(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    addLog('Execution stopped by user.');
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Mirai Tool: {toolName}</h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <pre className="whitespace-pre-wrap text-sm">
            <code>{sourceCode}</code>
          </pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input (e.g., IP, URL)</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
          <div className="md:col-span-2 flex justify-center space-x-4 mt-4">
            <button
              onClick={startExecution}
              disabled={isExecuting || !targetInput}
              className="px-6 py-2 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isExecuting}
              className="px-6 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              STOP
            </button>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-60">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
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

export default ToolAresC51a2fComponent;
