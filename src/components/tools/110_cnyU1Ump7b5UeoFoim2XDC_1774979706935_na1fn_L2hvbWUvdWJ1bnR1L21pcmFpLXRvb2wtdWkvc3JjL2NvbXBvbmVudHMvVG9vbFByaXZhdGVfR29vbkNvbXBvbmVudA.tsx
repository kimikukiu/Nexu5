
import React, { useState, useEffect } from 'react';

interface ToolPrivate_GoonComponentProps {
  toolName: string;
}

interface CodeSnippet {
  language: string;
  code: string;
  filename: string;
}

const ToolPrivate_GoonComponent: React.FC<ToolPrivate_GoonComponentProps> = ({ toolName }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(100);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);

  // Simulate fetching code snippets from the tool directory
  useEffect(() => {
    const fetchCode = async () => {
      // In a real scenario, this would involve reading files from the backend
      // For this task, we'll use the content read earlier.
      const fetchedSnippets: CodeSnippet[] = [
        {
          language: 'c',
          filename: 'main.c',
          code: `int main() { return 0; }`,
        },
        {
          language: 'go',
          filename: 'main.go',
          code: `package main\nfunc main() {}`,
        },
        {
          language: 'sh',
          filename: 'run.sh',
          code: `echo 'Hello Shell'`,
        },
        {
          language: 'python',
          filename: 'script.py',
          code: `print('Hello Python')`,
        },
      ];
      setCodeSnippets(fetchedSnippets);
    };
    fetchCode();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting ${toolName} with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    // Simulate execution
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (simulated)`]);
    }, 2000);
    setTimeout(() => {
      clearInterval(interval);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping ${toolName} (simulated)`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {codeSnippets.length > 0 ? (
              codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-gray-400 mb-2">{snippet.filename} ({snippet.language})</p>
                  <pre className="overflow-x-auto"><code className={`language-${snippet.language} text-sm`}>{snippet.code}</code></pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No code snippets found.</p>
            )}
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <input
              type="text"
              placeholder="Target (e.g., example.com)"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Duration (seconds)"
                className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="RPS (Requests per second)"
                className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Threads"
                className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
              />
              <select
                className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-500"
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

          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 p-3 rounded-md font-bold ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} transition-colors duration-200`}
              onClick={isRunning ? handleStop : handleStart}
              disabled={!target}
            >
              {isRunning ? 'STOP' : 'START'}
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-700 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPrivate_GoonComponent;
