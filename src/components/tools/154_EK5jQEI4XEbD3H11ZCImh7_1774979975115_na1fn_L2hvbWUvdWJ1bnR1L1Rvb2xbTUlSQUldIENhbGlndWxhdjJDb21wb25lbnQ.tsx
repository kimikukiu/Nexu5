
import React, { useState, useEffect } from 'react';

interface ToolCaligulav2ComponentProps {
  toolName: string;
}

interface CodeSnippet {
  language: string;
  code: string;
}

const ToolMIRAI_Caligulav2Component: React.FC<ToolCaligulav2ComponentProps> = ({ toolName }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching code snippets from the tool directory
    const fetchCode = async () => {
      try {
        const cCode = `/* Caligula C code */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Caligula C!\\n\");\n    return 0;\n}`; // Placeholder for actual file read
        const goCode = `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Caligula Go!\")\n}`; // Placeholder for actual file read

        setCodeSnippets([
          { language: 'c', code: cCode },
          { language: 'go', code: goCode },
        ]);
      } catch (err) {
        setError('Failed to load code snippets.');
        console.error(err);
      }
    };
    fetchCode();
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Target: ${target}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    // Simulate execution logs
    let count = 0;
    const interval = setInterval(() => {
      if (count < 5 && isRunning) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... Packet sent ${count + 1}`]);
        count++;
      } else {
        clearInterval(interval);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName}</h1>

      {error && <div className="bg-red-700 p-4 rounded mb-4 text-white">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Code Snippets</h2>
          {codeSnippets.length > 0 ? (
            codeSnippets.map((snippet, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-medium text-emerald-200 mb-2">{snippet.language.toUpperCase()} Code</h3>
                <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto border border-gray-700">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))
          ) : (
            <p>No code snippets found.</p>
          )}
        </div>

        {/* Controls and Logs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-emerald-100 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-emerald-100 text-sm font-bold mb-2">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-emerald-100 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-emerald-100 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-emerald-100 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
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
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isRunning || !target}
              className={`flex-1 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className={`flex-1 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${!isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm border border-gray-700">
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_Caligulav2Component;
