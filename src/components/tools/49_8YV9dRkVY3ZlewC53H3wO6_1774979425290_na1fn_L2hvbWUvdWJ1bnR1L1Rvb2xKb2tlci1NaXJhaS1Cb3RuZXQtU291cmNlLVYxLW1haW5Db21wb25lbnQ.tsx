import React, { useState, useEffect, useRef } from 'react';

interface ToolJokerMiraiBotnetSourceV1MainProps {
  // Define props here if any
}

const ToolJokerMiraiBotnetSourceV1MainComponent: React.FC<ToolJokerMiraiBotnetSourceV1MainProps> = () => {
  const [codeSnippets, setCodeSnippets] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCodeSnippets = async () => {
      const files = [
        '/home/ubuntu/extracted_tools/Joker-Mirai-Botnet-Source-V1-main/main.c',
        '/home/ubuntu/extracted_tools/Joker-Mirai-Botnet-Source-V1-main/main.go',
      ];
      const snippets: Record<string, string> = {};
      for (const filePath of files) {
        try {
          // In a real application, this would be an API call to read file content
          // For this simulation, we'll use placeholder content or a direct read if possible
          // Since direct file system access from React is not possible, we'll simulate it.
          // In a real scenario, a backend endpoint would serve these file contents.
          const fileName = filePath.split('/').pop();
          if (fileName) {
            if (fileName === 'main.c') {
              snippets[fileName] = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`; 
            } else if (fileName === 'main.go') {
              snippets[fileName] = `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}`; 
            }
          }
        } catch (error) {
          console.error(`Failed to read file ${filePath}:`, error);
        }
      }
      setCodeSnippets(snippets);
    };
    fetchCodeSnippets();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      intervalRef.current = interval;
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing attack on ${targetInput} with ${rps} RPS, ${threads} threads, using ${method} method.`]);
    }, 1000);
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution started.`]);
  };

  const handleStop = () => {
    setIsRunning(false);
    // In a real scenario, this would send a signal to stop the backend process.
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution manually stopped.`]);

  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Joker-Mirai-Botnet-Source-V1-main Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Code Snippets</h2>
          <div className="space-y-4">
            {Object.entries(codeSnippets).length > 0 ? (
              Object.entries(codeSnippets).map(([filename, code], index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-md">
                  <h3 className="text-lg font-medium text-gray-200 mb-2">{filename}</h3>
                  <pre className="bg-gray-900 p-2 rounded-sm overflow-x-auto text-sm text-red-300">
                    <code>{code}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No code snippets found or loaded.</p>
            )}
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="space-y-6">
          {/* Manual Execution Controls */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
                <input
                  type="text"
                  id="targetInput"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., 192.168.1.1"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
                onClick={handleStart}
                disabled={isRunning}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-900 p-3 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
              {executionLogs.length > 0 ? (
                executionLogs.map((log, index) => (
                  <p key={index} className="font-mono">{log}</p>
                ))
              ) : (
                <p className="text-gray-500">No logs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolJokerMiraiBotnetSourceV1MainComponent;
