
import React, { useState, useEffect } from 'react';

interface ToolCykaProps {
  sourceCode: string;
}

const ToolMIRAI_CykaComponent: React.FC<ToolCykaProps> = ({ sourceCode }) => {
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    addLog(`Starting [MIRAI] Cyka execution with:\n  Target: ${target}\n  Duration: ${duration}s\n  RPS: ${rps}\n  Threads: ${threads}\n  Method: ${method}`);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      addLog(`Time elapsed: ${currentProgress}s`);

      if (currentProgress >= duration) {
        clearInterval(interval);
        setIsRunning(false);
        addLog('[MIRAI] Cyka execution finished.');
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    addLog('Execution stopped by user.');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">[MIRAI] Cyka Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-emerald-300">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-sm border border-gray-700">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
          <input
            type="text"
            id="target"
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
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
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>
        <div>
          <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
          <input
            type="number"
            id="rps"
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
            value={rps}
            onChange={(e) => setRps(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>
        <div>
          <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
          <input
            type="number"
            id="threads"
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
            value={threads}
            onChange={(e) => setThreads(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
          <select
            id="method"
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
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

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={startExecution}
          disabled={isRunning}
          className="px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          START
        </button>
        <button
          onClick={stopExecution}
          disabled={!isRunning}
          className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          STOP
        </button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <div
            className="bg-emerald-500 h-2.5 rounded-full"
            style={{ width: `${(progress / duration) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Execution Logs */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-60 text-sm border border-gray-700">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-200">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_CykaComponent;
