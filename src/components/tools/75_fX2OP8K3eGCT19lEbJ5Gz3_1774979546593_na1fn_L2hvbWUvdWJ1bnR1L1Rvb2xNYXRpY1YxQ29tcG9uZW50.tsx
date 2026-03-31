
import React, { useState, useEffect } from 'react';

interface ToolMaticV1ComponentProps {}

const ToolMaticV1Component: React.FC<ToolMaticV1ComponentProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        const cCode = `int main() { return 0; }`;
        const goCode = `package main\nfunc main() {}`;
        const pyCode = `print(\"Hello Python\")`;
        const shCode = `echo \"Hello Shell\"`;

        setSourceCode(
          `// main.c\n${cCode}\n\n// main.go\n${goCode}\n\n// script.py\n${pyCode}\n\n// script.sh\n${shCode}`
        );
      } catch (error) {
        console.error('Error reading source code:', error);
        setSourceCode('Error loading source code.');
      }
    };
    fetchSourceCode();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution logs
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method} - Log entry ${count}`]);
      if (count >= 5) {
        clearInterval(interval);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, 2000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">MaticV1 Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-96 text-sm text-gray-300">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Controls and Execution */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
                onClick={handleStart}
                disabled={isRunning}
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Logs */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-300">
              {logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMaticV1Component;
