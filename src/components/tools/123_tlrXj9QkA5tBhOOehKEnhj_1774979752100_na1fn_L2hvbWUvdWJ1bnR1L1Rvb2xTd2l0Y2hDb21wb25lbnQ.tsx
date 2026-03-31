
import React, { useState, useEffect } from 'react';

interface ToolSwitchComponentProps {
  toolPath: string;
}

interface CodeSnippet {
  language: string;
  code: string;
}

const ToolSwitchComponent: React.FC<ToolSwitchComponentProps> = ({ toolPath }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading files from the provided toolPath
    const fetchCode = async () => {
      try {
        // In a real scenario, this would involve an API call to read files
        // For this task, we'll use the dummy content created earlier
        const dummyCode = [
          { language: 'c', code: 'int main() { return 0; }' },
          { language: 'go', code: 'package main\nfunc main() {}' },
          { language: 'python', code: 'print(\'Hello from Python\')' },
          { language: 'bash', code: 'echo \'Hello from Bash\'' },
        ];
        setCodeSnippets(dummyCode);
      } catch (error) {
        setLogs(prev => [...prev, `Error loading code: ${error}`]);
      }
    };
    fetchCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Target Input: ${targetInput}`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Duration: ${duration}s`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] RPS: ${rps}`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Threads: ${threads}`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Method: ${method}`]);

    // Simulate execution
    let executionTime = 0;
    const interval = setInterval(() => {
      executionTime++;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (Time: ${executionTime}s)`]);
      if (executionTime >= duration) {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: Switch</h1>

      {/* Code Viewer */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        {codeSnippets.length > 0 ? (
          codeSnippets.map((snippet, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl text-gray-300 mb-2">{snippet.language.toUpperCase()}</h3>
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-emerald-200">
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Loading code...</p>
        )}
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              disabled={isExecuting}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isExecuting}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <pre className="bg-gray-900 p-4 rounded-md h-64 overflow-y-scroll text-sm text-gray-200">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ToolSwitchComponent;
