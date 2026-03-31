import React, { useState, useEffect } from 'react';

interface SourceCodeFiles {
  [fileName: string]: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface ToolDaddysMiraiV3ComponentProps {
  toolPath: string;
}

const ToolDaddysMiraiV3Component: React.FC<ToolDaddysMiraiV3ComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<SourceCodeFiles>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(100);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const readSourceCode = async () => {
      setError(null);
      try {
        // In a real application, this would be an API call to a backend that reads the files.
        // For this task, we are hardcoding the content based on previous file reads.
        const files: SourceCodeFiles = {
          'main.c': 'int main() { return 0; }',
          'main.go': 'package main\nfunc main() {}',
          'script.py': 'print(\"Hello from Python\")',
          'run.sh': 'echo \"Hello from Bash\"',
        };
        setSourceCode(files);
        if (Object.keys(files).length > 0) {
          setSelectedFile(Object.keys(files)[0]);
        }
      } catch (err: any) {
        setError(`Failed to read source code: ${err.message}`);
      }
    };
    readSourceCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    setTimeout(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, 5000);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 font-mono">
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">[MIRAI] DaddysMirai-V3 Tool</h1>

      {error && <div className="bg-red-700 p-2 mb-4 rounded">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Source Code</h2>
          <div className="flex space-x-2 mb-4">
            {Object.keys(sourceCode).map(fileName => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`px-3 py-1 rounded text-sm ${selectedFile === fileName ? 'bg-emerald-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {fileName}
              </button>
            ))}
          </div>
          <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm h-96">
            <code>
              {selectedFile ? sourceCode[selectedFile] : 'Select a file to view source code.'}
            </code>
          </pre>
        </div>

        {/* Execution Controls and Logs */}
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
          <div className="space-y-3 mb-4">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com:80"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500"
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

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleStartExecution}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isRunning}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
          <div className="bg-gray-900 p-3 rounded overflow-auto text-sm h-64">
            {executionLogs.length === 0 ? (
              <p className="text-gray-500">No logs yet.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-gray-300">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDaddysMiraiV3Component;
