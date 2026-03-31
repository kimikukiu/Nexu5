
import React, { useState, useEffect, useRef } from 'react';

interface ToolShintoV4Props {
  // Define any props for the component here
}

const ToolShintoV4Component: React.FC<ToolShintoV4Props> = () => {
  const [codeSnippets, setCodeSnippets] = useState<{[key: string]: string}>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  useEffect(() => {
    const snippets: {[key: string]: string} = {};
    snippets['main.c'] = 'int main() { return 0; }';
    snippets['main.go'] = 'package main\nfunc main() {}';
    snippets['script.py'] = 'print("Hello from Python")';
    snippets['run.sh'] = 'echo "Hello from Shell"';
    setCodeSnippets(snippets);
  }, []);

  // Auto-scroll to the bottom of the logs whenever logs update
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [executionLogs]);

  const handleExecute = () => {
    setIsRunning(true);
    setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting execution with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    
    let currentSecond = 0;
    const maxLogs = 15; // Keep more logs visible

    intervalRef.current = setInterval(() => {
      currentSecond++;
      const simulatedRequests = rps * threads; // Simplified simulation
      const logMessage = `[${new Date().toLocaleTimeString()}] Second ${currentSecond}: Processed ${simulatedRequests} requests. (Target: ${targetInput})`;
      
      setExecutionLogs(prevLogs => {
        const newLogs = [...prevLogs, logMessage];
        return newLogs.slice(Math.max(newLogs.length - maxLogs, 0));
      });

      if (currentSecond >= duration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished after ${duration} seconds.`]);
      }
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setExecutionLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Shinto-V4 Tool Component</h1>

      {/* Code Viewer Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Code Snippets</h2>
        {Object.entries(codeSnippets).map(([filename, code]) => (
          <div key={filename} className="mb-6">
            <h3 className="text-xl font-medium text-gray-200 mb-2">{filename}</h3>
            <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-sm text-green-300">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., https://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-auto text-sm text-gray-300">
          {executionLogs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
          <div ref={logsEndRef} /> {/* Element to scroll to */}
        </div>
      </div>
    </div>
  );
};

export default ToolShintoV4Component;
