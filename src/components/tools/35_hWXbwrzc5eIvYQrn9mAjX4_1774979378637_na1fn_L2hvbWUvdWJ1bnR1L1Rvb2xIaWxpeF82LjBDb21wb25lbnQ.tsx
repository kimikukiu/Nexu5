
import React, { useState, useEffect } from 'react';

interface ToolHilix_6_0Props {
  toolPath: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolHilix_6_0Component: React.FC<ToolHilix_6_0Props> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: 'http://localhost:8080',
    duration: 10,
    rps: 100,
    threads: 10,
    method: 'GET',
  });

  useEffect(() => {
    const fetchSourceCode = async () => {
      const files = ['hilix.py', 'hilix.sh', 'hilix.c', 'hilix.go'];
      const code: Record<string, string> = {};
      for (const file of files) {
        try {
          // In a real application, this would be an API call to read the file content
          // For this simulation, we'll use dummy content or a placeholder
          const response = await fetch(`${toolPath}/${file}`); // Assuming a local server can serve these files
          if (response.ok) {
            code[file] = await response.text();
          } else {
            code[file] = `Error loading ${file}: ${response.statusText}`;
          }
        } catch (error) {
          code[file] = `Error loading ${file}: ${error}`;
        }
      }
      setSourceCode(code);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? parseInt(value) : value,
    }));
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    let logCounter = 0;
    const interval = setInterval(() => {
      logCounter++;
      setExecutionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Executing... ${logCounter}/${params.duration}s`]);
      if (logCounter >= params.duration) {
        clearInterval(interval);
        setExecutionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Hilix 6.0 execution finished.`]);
        setIsRunning(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-emerald-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Hilix 6.0 Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        <div className="flex space-x-2 mb-4">
          {Object.keys(sourceCode).map((file) => (
            <button
              key={file}
              className={`px-4 py-2 rounded-md ${selectedFile === file ? 'bg-emerald-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setSelectedFile(file)}
            >
              {file}
            </button>
          ))}
        </div>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-sm text-emerald-200">
          <code>{sourceCode[selectedFile] || 'Select a file to view source code.'}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-emerald-200 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              name="target"
              value={params.target}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={params.duration}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={params.rps}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={params.threads}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={params.method}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            onClick={startExecution}
            disabled={isRunning}
          >
            START
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            onClick={stopExecution}
            disabled={!isRunning}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-64 text-sm text-emerald-200">
          {executionLogs.length === 0 ? (
            <p>No logs yet. Start execution to see output.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="whitespace-pre-wrap">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHilix_6_0Component;
