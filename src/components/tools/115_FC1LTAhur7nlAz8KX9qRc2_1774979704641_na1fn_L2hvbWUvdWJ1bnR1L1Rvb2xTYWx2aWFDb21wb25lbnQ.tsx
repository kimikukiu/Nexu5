import React, { useState, useEffect } from 'react';

interface ToolSalviaComponentProps {
  // Define any props if needed
}

const ToolSalviaComponent: React.FC<ToolSalviaComponentProps> = () => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const salviaCCode = `/* Salvia C code */
#include <stdio.h>

int main() {
    printf("Hello from Salvia C!\n");
    return 0;
}`;

  const startExecution = () => {
    setIsExecuting(true);
    setLogs([`Starting execution with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing... (Packet ${counter})`]);
      if (counter >= duration * rps) {
        stopExecution();
      }
    }, 1000 / rps);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Salvia Tool Component</h1>

      {/* Code Viewer */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code: salvia.c</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
          <code>{salviaCCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com or 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per Second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting || !target}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
        {!target && <p className="text-red-400 text-sm mt-2">Target input is required to start execution.</p>}
      </div>

      {/* Real-time Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-scroll text-sm text-gray-300">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolSalviaComponent;
