import React, { useState, useEffect } from 'react';

interface ToolLiGhterProps {
  // Define any props if needed
}

const ToolLiGhterComponent: React.FC<ToolLiGhterProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulate reading source code on component mount
  useEffect(() => {
    const dummySourceCode = `/*
 * LiGhter - C Source Code
 * This is a dummy C file for demonstration purposes.
 */

#include <stdio.h>

int main() {
    printf("Hello from LiGhter C code!\n");
    return 0;
}`; // This will be replaced by actual file content if possible
    setSourceCode(dummySourceCode);
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting execution with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    // Simulate execution logs
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing... Packet ${counter} sent.`]);
      if (counter >= 5) { // Simulate a short execution
        clearInterval(interval);
        setIsExecuting(false);
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, you would send a signal to stop the backend process
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">LiGhter Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            <code>{sourceCode}</code>
          </pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <label htmlFor="targetInput" className="text-gray-300 mb-1">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 192.168.1.1:80"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-gray-300 mb-1">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rps" className="text-gray-300 mb-1">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="threads" className="text-gray-300 mb-1">Threads:</label>
            <input
              type="number"
              id="threads"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="method" className="text-gray-300 mb-1">Method:</label>
            <select
              id="method"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-emerald-500"
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
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-80">
          {logs.map((log, index) => (
            <p key={index} className="text-sm text-gray-400 mb-1">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolLiGhterComponent;
