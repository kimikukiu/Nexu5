
import React, { useState, useEffect } from 'react';

interface ToolomniComponentProps {
  toolName: string;
  sourceCodeC: string;
  sourceCodePy: string;
}

const ToolomniComponent: React.FC<ToolomniComponentProps> = ({
  toolName,
  sourceCodeC,
  sourceCodePy,
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('c'); // 'c' or 'python'
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setLogs((prevLogs) => [
          ...prevLogs,
          `[${new Date().toLocaleTimeString()}] Executing ${method} with input: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}`,
        ]);
      }, 1000);
    } else if (!isRunning && logs.length > 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, targetInput, duration, rps, threads, method, logs.length]);

  const startExecution = () => {
    setLogs([]);
    setIsRunning(true);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleTimeString()}] Execution stopped.`,
    ]);
  };

  const codeToDisplay = method === 'c' ? sourceCodeC : sourceCodePy;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">
        Mirai Tool: {toolName}
      </h1>

      {/* Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <pre className="text-sm whitespace-pre-wrap break-all">
            <code>{codeToDisplay}</code>
          </pre>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setMethod('c')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${method === 'c' ? 'bg-emerald-600' : 'bg-gray-700'} hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 mr-2`}
          >
            omni.c
          </button>
          <button
            onClick={() => setMethod('python')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${method === 'python' ? 'bg-emerald-600' : 'bg-gray-700'} hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
          >
            omni.py
          </button>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isRunning}
            />
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isRunning}
            className="flex-1 px-6 py-3 rounded-md text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="flex-1 px-6 py-3 rounded-md text-lg font-semibold bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-60">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 leading-relaxed">
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolomniComponent;
