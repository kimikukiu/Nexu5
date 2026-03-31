
import React, { useState, useEffect } from 'react';

interface ToolL33Tv4ComponentProps {
  toolPath: string;
}

interface ExecutionState {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
  isRunning: boolean;
  logs: string[];
}

const ToolL33Tv4Component: React.FC<ToolL33Tv4ComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [executionState, setExecutionState] = useState<ExecutionState>({
    targetInput: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
    isRunning: false,
    logs: [],
  });

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, you would fetch these files from the server
        // For this simulation, we'll use the dummy content we 'read' earlier.
        // This part would typically involve an API call to read file contents.
        const cCode = `/*\n * L33Tv4 C Source Code\n */\n\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from L33Tv4 C!\\n\");\n    return 0;\n}\n`;
        const goCode = `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from L33Tv4 Go!\")\n}\n`;
        const pyCode = `def main():\n    print(\"Hello from L33Tv4 Python!\")\n\nif __name__ == \"__main__\":\n    main()\n`;

        setSourceCode({
          'l33tv4.c': cCode,
          'l33tv4.go': goCode,
          'l33tv4.py': pyCode,
        });
      } catch (error) {
        console.error('Failed to fetch source code:', error);
        setExecutionState((prev) => ({
          ...prev,
          logs: [...prev.logs, `Error: Failed to load source code. ${error}`],
        }));
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionState((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setExecutionState((prev) => ({
      ...prev,
      isRunning: true,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Starting execution...`],
    }));

    // Simulate execution
    const simulationInterval = setInterval(() => {
      setExecutionState((prev) => {
        const newLog = `[${new Date().toLocaleTimeString()}] Executing with target: ${prev.targetInput}, RPS: ${prev.rps}, Method: ${prev.method}`;
        return { ...prev, logs: [...prev.logs, newLog] };
      });
    }, 1000);

    // Stop simulation after duration
    setTimeout(() => {
      clearInterval(simulationInterval);
      setExecutionState((prev) => ({
        ...prev,
        isRunning: false,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Execution finished.`],
      }));
    }, executionState.duration * 1000);
  };

  const stopExecution = () => {
    setExecutionState((prev) => ({
      ...prev,
      isRunning: false,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`],
    }));
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">L33Tv4 Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        {Object.entries(sourceCode).map(([filename, code]) => (
          <div key={filename} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg">
            <h3 className="text-xl text-emerald-200 mb-2">{filename}</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 overflow-auto max-h-60">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              name="targetInput"
              value={executionState.targetInput}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionState.duration}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionState.rps}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionState.threads}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={executionState.method}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
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
            disabled={executionState.isRunning}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!executionState.isRunning}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {executionState.logs.map((log, index) => (
            <p key={index} className="text-gray-200 text-sm mb-1">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolL33Tv4Component;
