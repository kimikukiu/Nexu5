
import React, { useState, useEffect } from 'react';

interface CodeSnippet {
  language: string;
  code: string;
  filename: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolmioriremasteredComponent: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([
    {
      language: 'c',
      filename: 'main.c',
      code: `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from mioriremastered C code!\\n\");\n    return 0;\n}`,
    },
    {
      language: 'python',
      filename: 'script.py',
      code: `import time\n\ndef run_script():\n    print(\"Hello from mioriremastered Python script!\")\n    time.sleep(1)\n    print(\"Python script finished.\")\n\nif __name__ == \"__main__\":\n    run_script()`,
    },
    {
      language: 'bash',
      filename: 'run.sh',
      code: `#!/bin/bash\n\necho \"Hello from mioriremastered shell script!\"\nsleep 1\necho \"Shell script finished.\"`,
    },
  ]);

  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: 'example.com',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('main.c');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? parseInt(value, 10) : value,
    }));
  };

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs(['[INFO] Starting execution...']);
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] [${executionParams.method}] Request to ${executionParams.target} - Status: 200 OK (Simulated)`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setLogs((prev) => [...prev, '[INFO] Execution finished (Simulated).']);
        setIsExecuting(false);
      }
    }, 1000);

    // In a real scenario, you would send these parameters to a backend service
    // that executes the actual tool and streams logs back.
    console.log('Simulating execution with params:', executionParams);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs((prev) => [...prev, '[INFO] Execution stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">mioriremastered Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex border-b border-gray-700 mb-4">
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.filename}
                className={`px-4 py-2 -mb-px border-b-2 ${activeTab === snippet.filename ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab(snippet.filename)}
              >
                {snippet.filename}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-md bg-gray-900 p-4 h-96">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap">
              <code>
                {codeSnippets.find((snippet) => snippet.filename === activeTab)?.code}
              </code>
            </pre>
          </div>
        </div>

        {/* Execution Controls & Logs Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                name="target"
                value={executionParams.target}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                placeholder="e.g., example.com or 192.168.1.1"
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={executionParams.duration}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests/Second):</label>
              <input
                type="number"
                id="rps"
                name="rps"
                value={executionParams.rps}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                name="threads"
                value={executionParams.threads}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                disabled={isExecuting}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                name="method"
                value={executionParams.method}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                disabled={isExecuting}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="SYN">SYN</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStartExecution}
              disabled={isExecuting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 rounded-md p-4 h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 leading-relaxed">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolmioriremasteredComponent;
