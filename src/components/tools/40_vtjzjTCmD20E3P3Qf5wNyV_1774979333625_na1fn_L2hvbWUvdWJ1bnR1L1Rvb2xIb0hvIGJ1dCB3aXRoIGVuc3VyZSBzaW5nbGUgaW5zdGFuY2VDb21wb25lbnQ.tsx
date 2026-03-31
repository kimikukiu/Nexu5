import React, { useState, useEffect } from 'react';

interface ToolExecutionProps {
  toolName: string;
  sourceCode: string;
}

const ToolHoHoButWithEnsureSingleInstanceComponent: React.FC<ToolExecutionProps> = ({ toolName, sourceCode }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
    // Simulate execution
    const executionInterval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    }, 2000);

    setTimeout(() => {
      clearInterval(executionInterval);
      setIsExecuting(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished for ${toolName}.`]);
    }, duration * 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution for ${toolName}.`]);
    // In a real scenario, you would send a signal to stop the actual execution process.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName}</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., http://example.com"
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
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
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
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                       bg-emerald-600 hover:bg-emerald-700 text-white
                       disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isExecuting ? 'Executing...' : 'START'}
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-300
                       bg-red-600 hover:bg-red-700 text-white
                       disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm text-gray-300">
          {logs.map((log, index) => (
            <p key={index} className="mb-1">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolHoHoButWithEnsureSingleInstanceComponent;
