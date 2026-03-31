
import React, { useState, useEffect } from 'react';

interface ToolTokyo_privateComponentProps {
  toolName: string;
}

interface CodeSnippet {
  language: string;
  code: string;
  fileName: string;
}

const ToolTokyo_privateComponent: React.FC<ToolTokyo_privateComponentProps> = ({ toolName }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading code files
    const fetchCode = async () => {
      try {
        const files = [
          { path: '/home/ubuntu/extracted_tools/Tokyo_private/main.c', language: 'c' },
          { path: '/home/ubuntu/extracted_tools/Tokyo_private/main.go', language: 'go' },
          { path: '/home/ubuntu/extracted_tools/Tokyo_private/main.py', language: 'python' },
          { path: '/home/ubuntu/extracted_tools/Tokyo_private/run.sh', language: 'bash' },
        ];

        const loadedSnippets: CodeSnippet[] = [];
        for (const file of files) {
          // In a real scenario, you would use an API to read file content
          // For this simulation, we'll use dummy content or a placeholder
          let content = '';
          if (file.path.includes('main.c')) content = `/* main.c */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`; // Placeholder
          else if (file.path.includes('main.go')) content = `package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello from Go!\")\n}`; // Placeholder
          else if (file.path.includes('main.py')) content = `def main():\n    print(\"Hello from Python!\")\n\nif __name__ == \"__main__\":\n    main()`; // Placeholder
          else if (file.path.includes('run.sh')) content = `#!/bin/bash\n\necho \"Hello from Bash!\"`; // Placeholder

          loadedSnippets.push({
            language: file.language,
            code: content,
            fileName: file.path.split('/').pop() || 'unknown',
          });
        }
        setCodeSnippets(loadedSnippets);
      } catch (err: any) {
        setError(`Failed to load code snippets: ${err.message}`);
      }
    };

    fetchCode();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setError(null);
    // Simulate execution
    const executionInterval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    }, 2000);

    setTimeout(() => {
      clearInterval(executionInterval);
      setIsRunning(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // In a real scenario, you would send a stop signal to the backend process
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} Control Panel</h1>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Code Viewer</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {codeSnippets.length > 0 ? (
              codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-gray-700 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{snippet.fileName} ({snippet.language})</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(snippet.code)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 focus:outline-none"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No code snippets found or loaded.</p>
            )}
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input (Domain/IP/URL)</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com or 192.168.1.1"
                disabled={isRunning}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  min="1"
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={rps}
                  onChange={(e) => setRps(parseInt(e.target.value) || 0)}
                  min="1"
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={threads}
                  onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
                  min="1"
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isRunning}
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
                disabled={isRunning || !targetInput}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-700 p-3 rounded-md h-64 overflow-y-auto text-sm">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <p key={index} className="text-gray-300">{log}</p>
              ))
            ) : (
              <p className="text-gray-500">No logs yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTokyo_privateComponent;
