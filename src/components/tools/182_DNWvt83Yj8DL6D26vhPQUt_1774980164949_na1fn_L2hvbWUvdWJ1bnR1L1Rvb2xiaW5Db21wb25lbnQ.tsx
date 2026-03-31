
import React, { useState, useEffect } from 'react';

interface ToolbinComponentProps {
  toolName: string;
}

const ToolbinComponent: React.FC<ToolbinComponentProps> = ({ toolName }) => {
  const [cCode, setCCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        // In a real scenario, these would be fetched from a backend API
        // For this simulation, we'll use placeholder content
        setCCode(`// Dummy C Code for ${toolName}
#include <stdio.h>

int main() {
    printf(\"Hello from C!\\n\");
    return 0;
}`);
        setGoCode(`// Dummy Go Code for ${toolName}
package main

import \"fmt\"

func main() {
    fmt.Println(\"Hello from Go!\")
}`);
        setPyCode(`# Dummy Python Code for ${toolName}
def main():
    print(\"Hello from Python!\")

if __name__ == \"__main__\":
    main()`);
        setShCode(`# Dummy Shell Script for ${toolName}
echo \"Hello from Shell!\"`);
      } catch (error) {
        console.error('Error fetching code:', error);
      }
    };

    fetchCode();
  }, [toolName]);

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    const interval = setInterval(() => {
      const logEntry = `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`;
      setExecutionLogs((prevLogs) => [...prevLogs, logEntry]);
    }, 1000);

    // Simulate stopping after a duration (or indefinitely if duration is 0)
    if (duration > 0) {
      setTimeout(() => {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }, duration * 1000);
    }

    return () => clearInterval(interval);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Code Viewers */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">C Code</h2>
          <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-200 h-64">{cCode}</pre>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Go Code</h2>
          <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-200 h-64">{goCode}</pre>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Python Code</h2>
          <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-200 h-64">{pyCode}</pre>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Shell Script</h2>
          <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-200 h-64">{shCode}</pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
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
            disabled={isRunning}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-200 h-64">
          {executionLogs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolbinComponent;
