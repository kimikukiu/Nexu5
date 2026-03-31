
import React, { useState, useEffect } from 'react';

interface Toolmiori_v1_3_botComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const Toolmiori_v1_3_botComponent: React.FC<Toolmiori_v1_3_botComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
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
        // In a real scenario, this would be an API call to the backend
        // to read files from the specified toolPath.
        // For this simulation, we'll use dummy content.
        const dummyFiles: CodeFile[] = [
          {
            name: 'main.c',
            language: 'c',
            content: `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from miori_v1.3_bot C code!\\n\");\n    return 0;\n}\n`,
          },
          {
            name: 'script.sh',
            language: 'bash',
            content: `#!/bin/bash\n\necho \"Hello from miori_v1.3_bot shell script!\"\nsleep 1\necho \"Executing task...\"\nsleep 2\necho \"Task completed.\"\n`,
          },
        ];
        setCodeFiles(dummyFiles);
        if (dummyFiles.length > 0) {
          setSelectedFile(dummyFiles[0]);
        }
      } catch (err) {
        setError('Failed to load code files.');
        console.error(err);
      }
    };
    fetchCodeFiles();
  }, [toolPath]);

  const handleExecute = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);

    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < 5) {
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating execution log line ${logCounter + 1}...`]);
        logCounter++;
      } else {
        clearInterval(interval);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulation finished.`]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleStop = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, this would send a signal to stop the backend process.
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">miori_v1.3_bot Tool Component</h1>

      {error && <div className="bg-red-700 p-3 rounded mb-4">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex space-x-2 mb-4">
            {codeFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${selectedFile?.name === file.name
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}
                `}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-96">
            <pre className="text-sm whitespace-pre-wrap break-all">
              <code>{selectedFile ? selectedFile.content : 'Select a file to view code.'}</code>
            </pre>
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="targetInput"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., http://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
                <input
                  type="number"
                  id="rps"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className={`px-6 py-3 rounded-md text-lg font-bold transition-colors
                ${isExecuting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
              `}
            >
              {isExecuting ? 'Executing...' : 'START'}
            </button>
            <button
              onClick={handleStop}
              disabled={!isExecuting}
              className={`px-6 py-3 rounded-md text-lg font-bold transition-colors
                ${!isExecuting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'}
              `}
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-80">
            {executionLogs.length === 0 ? (
              <p className="text-gray-400">No logs yet. Click START to begin execution.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-sm text-gray-200 leading-relaxed">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolmiori_v1_3_botComponent;
