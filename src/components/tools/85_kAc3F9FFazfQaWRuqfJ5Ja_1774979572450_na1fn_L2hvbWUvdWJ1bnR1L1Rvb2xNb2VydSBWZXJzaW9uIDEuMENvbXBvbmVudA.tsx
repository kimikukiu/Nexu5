
import React, { useState, useEffect } from 'react';

interface ToolMoeruVersion1_0ComponentProps {
  toolName: string;
}

const ToolMoeruVersion1_0Component: React.FC<ToolMoeruVersion1_0ComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading source code
    const simulatedSourceCode = {
      'main.py': `
import time
import random

def run_moeru(target, duration, rps, threads, method):
    print(f"Starting Moeru Version 1.0 with:")
    print(f"  Target: {target}")
    print(f"  Duration: {duration}s")
    print(f"  RPS: {rps}")
    print(f"  Threads: {threads}")
    print(f"  Method: {method}")
    
    start_time = time.time()
    requests_sent = 0
    
    while time.time() - start_time < duration:
        time.sleep(1 / rps) # Simulate RPS
        requests_sent += 1
        log_message = f"[{time.time() - start_time:.2f}s] Sent {method} request to {target}. Total: {requests_sent}"
        console.log(log_message) // This will be captured by the React component
        if random.random() < 0.01: # Simulate occasional errors
            error_message = f"[{time.time() - start_time:.2f}s] ERROR: Failed to connect to {target}"
            console.error(error_message) # This will also be captured

    print(f"Moeru Version 1.0 finished. Total requests sent: {requests_sent}")
`,
      'config.sh': `
#!/bin/bash

# Configuration for Moeru Version 1.0

TARGET="http://localhost:8080"
DURATION=60
RPS=100
THREADS=10
METHOD="GET"

echo "Configuration loaded."
`,
    };
    setSourceCode(simulatedSourceCode);
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]);
    let currentLogIndex = 0;
    const simulatedLogs = [
      `Starting Moeru Version 1.0 with:`, 
      `  Target: ${targetInput || 'http://localhost:8080'}`, 
      `  Duration: ${duration}s`, 
      `  RPS: ${rps}`, 
      `  Threads: ${threads}`, 
      `  Method: ${method}`,
      `[0.10s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 1`,
      `[0.21s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 2`,
      `[0.30s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 3`,
      `[0.40s] ERROR: Failed to connect to ${targetInput || 'http://localhost:8080'}`,
      `[0.50s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 4`,
      `[0.60s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 5`,
      `[0.70s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 6`,
      `[0.80s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 7`,
      `[0.90s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 8`,
      `[1.00s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 9`,
      `[1.10s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 10`,
      `[1.20s] ERROR: Connection timed out.`,
      `[1.30s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 11`,
      `[1.40s] Sent ${method} request to ${targetInput || 'http://localhost:8080'}. Total: 12`,
      `Moeru Version 1.0 finished. Total requests sent: 12`,
    ];

    const logInterval = setInterval(() => {
      if (currentLogIndex < simulatedLogs.length) {
        setLogs((prevLogs) => [...prevLogs, simulatedLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setIsRunning(false);
      }
    }, 300); // Simulate log output every 300ms
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, 'Execution stopped by user.']);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName}</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
        {Object.keys(sourceCode).length > 0 ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
            {Object.entries(sourceCode).map(([filename, code]) => (
              <div key={filename} className="mb-6">
                <h3 className="text-xl font-medium mb-2 text-emerald-200">{filename}</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-200">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Loading source code...</p>
        )}
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <label htmlFor="targetInput" className="text-gray-300 mb-1">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., http://localhost:8080"
              disabled={isRunning}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-gray-300 mb-1">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              disabled={isRunning}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rps" className="text-gray-300 mb-1">Requests Per Second (RPS):</label>
            <input
              type="number"
              id="rps"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
              disabled={isRunning}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="threads" className="text-gray-300 mb-1">Threads:</label>
            <input
              type="number"
              id="threads"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
              disabled={isRunning}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="method" className="text-gray-300 mb-1">Method:</label>
            <select
              id="method"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
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
        <div className="mt-6 flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isRunning}
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-80 overflow-auto">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <p key={index} className={`text-sm ${log.includes('ERROR') ? 'text-red-400' : 'text-gray-200'}`}>
                {log}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No logs yet. Start execution to see output.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolMoeruVersion1_0Component;
