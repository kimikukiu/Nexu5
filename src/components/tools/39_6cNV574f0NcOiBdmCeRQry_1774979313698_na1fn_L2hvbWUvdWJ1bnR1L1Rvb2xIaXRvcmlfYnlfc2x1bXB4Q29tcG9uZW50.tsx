
import React, { useState, useEffect } from 'react';

interface ToolHitori_by_slumpxComponentProps {
  toolPath: string;
}

const ToolHitori_by_slumpxComponent: React.FC<ToolHitori_by_slumpxComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call to a backend
    // that reads the file system. For this simulation, we'll hardcode
    // the content of hitori.c.
    const fetchSourceCode = async () => {
      try {
        // Simulate fetching file content
        const dummyCode = `/* Hitori_by_slumpx C code */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Hitori_by_slumpx C!\\n\");\n    return 0;\n}`; // Content of /home/ubuntu/extracted_tools/Hitori_by_slumpx/hitori.c
        setSourceCode(dummyCode);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };
    fetchSourceCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setError(null);

    // Simulate execution
    let count = 0;
    const interval = setInterval(() => {
      if (count < 5 && isRunning) { // Simulate 5 log entries
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
        count++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Hitori_by_slumpx Tool Component</h1>

      {error && <div className="bg-red-700 p-3 rounded mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-auto max-h-96">
            <pre><code className="language-c text-sm whitespace-pre-wrap">{
              sourceCode || 'Loading source code...'}
            </code></pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Controls</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-auto max-h-60">
          <pre className="text-sm text-gray-200 whitespace-pre-wrap">{
            executionLogs.length > 0
              ? executionLogs.join('\n')
              : 'No execution logs yet.'
          }</pre>
        </div>
      </div>
    </div>
  );
};

export default ToolHitori_by_slumpxComponent;
