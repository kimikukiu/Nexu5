import React, { useState, useEffect } from 'react';

interface ToolOwariProps {
  toolName: string;
  toolPath: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const ToolOwariComponent: React.FC<ToolOwariProps> = ({ toolName, toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    targetInput: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Function to read source code from the provided toolPath
    const readSourceCode = async () => {
      try {
        // In a real scenario, this would involve an API call to read the file content
        // For this simulation, we'll use a placeholder or pre-read content
        const dummyCode = `// Dummy C code for Owari\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Owari C!\\n\");\n    return 0;\n}`; // Replace with actual file read later
        setSourceCode(dummyCode);
        addLog({ timestamp: new Date().toISOString(), message: `Loaded source code for ${toolName}.`, type: 'info' });
      } catch (error) {
        console.error('Error reading source code:', error);
        addLog({ timestamp: new Date().toISOString(), message: `Failed to load source code for ${toolName}.`, type: 'error' });
      }
    };

    readSourceCode();
  }, [toolName, toolPath]);

  const addLog = (logEntry: LogEntry) => {
    setLogs((prevLogs) => [...prevLogs, logEntry]);
  };

  const handleStartExecution = () => {
    setIsExecuting(true);
    addLog({ timestamp: new Date().toISOString(), message: 'Execution started...', type: 'info' });
    // Simulate execution
    setTimeout(() => {
      addLog({ timestamp: new Date().toISOString(), message: 'Simulated execution output line 1.', type: 'info' });
      addLog({ timestamp: new Date().toISOString(), message: 'Simulated execution output line 2.', type: 'info' });
      addLog({ timestamp: new Date().toISOString(), message: 'Execution finished.', type: 'success' });
      setIsExecuting(false);
    }, 3000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    addLog({ timestamp: new Date().toISOString(), message: 'Execution stopped by user.', type: 'info' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-96 text-sm text-gray-200">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <textarea
              id="targetInput"
              name="targetInput"
              value={executionParams.targetInput}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              rows={4}
              placeholder="Enter target input..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionParams.duration}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionParams.rps}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionParams.threads}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={executionParams.method}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
            onClick={handleStartExecution}
            disabled={isExecuting}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-auto max-h-80 text-sm text-gray-200">
          {logs.map((log, index) => (
            <p key={index} className={{
              'text-green-400': log.type === 'success',
              'text-red-400': log.type === 'error',
              'text-gray-200': log.type === 'info',
            }[log.type]}>
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolOwariComponent;
