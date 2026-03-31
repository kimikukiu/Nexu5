
import React, { useState, useEffect } from 'react';

interface ToolFBI_SourceComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolFBI_SourceComponent: React.FC<ToolFBI_SourceComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodeFiles = async () => {
      try {
        // In a real scenario, this would involve a backend call to read files
        // For simulation, we'll use dummy content for now.
        const files = [
          { name: 'fbi_source.c', language: 'c', content: '// C code example\nint main() { return 0; }' },
          { name: 'fbi_source.go', language: 'go', content: '// Go code example\npackage main\nfunc main() {}' },
          { name: 'fbi_source.py', language: 'python', content: '# Python code example\ndef main(): pass' },
          { name: 'fbi_source.sh', language: 'bash', content: '#!/bin/bash\necho "Hello from bash"' },
        ];
        setCodeFiles(files);
      } catch (err: any) {
        setError(`Failed to load code files: ${err.message}`);
      }
    };

    fetchCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);
    // Simulate execution
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... Log entry ${logCount}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, this would send a signal to stop the backend process
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">FBI_Source Tool Component</h1>

      {error && <div className="bg-red-700 p-4 rounded mb-4 text-white">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          {codeFiles.length === 0 ? (
            <p>No code files found or loading...</p>
          ) : (
            codeFiles.map((file, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-medium text-emerald-200 mb-2">{file.name} ({file.language})</h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
                  <code>{file.content}</code>
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 192.168.1.1:8080"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
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
          <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
            {executionLogs.length === 0 ? (
              <p>No logs yet.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index}>{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolFBI_SourceComponent;
