
import React, { useState, useEffect } from 'react';

interface ToolReal_OwariComponentProps {
  toolName: string;
  toolPath: string;
}

interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}

const ToolReal_OwariComponent: React.FC<ToolReal_OwariComponentProps> = ({ toolName, toolPath }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading code files
    const fetchCode = async () => {
      try {
        // In a real scenario, this would involve an API call to read files from the backend
        // For this simulation, we'll use the dummy content we know exists.
        const dummyCode: CodeSnippet[] = [
          {
            filename: 'main.c',
            language: 'c',
            content: '#include <stdio.h>\nint main() { printf(\"Hello from C!\\n\"); return 0; }',
          },
          {
            filename: 'script.sh',
            language: 'bash',
            content: 'echo \"Hello from shell!\"',
          },
        ];
        setCodeSnippets(dummyCode);
      } catch (err) {
        setError('Failed to load code snippets.');
        console.error(err);
      }
    };
    fetchCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);
    // Simulate execution
    const interval = setInterval(() => {
      setExecutionLogs((prevLogs) => [
        ...prevLogs,
        `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`,
      ]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsExecuting(false);
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName} Component</h1>

      {error && <div className="bg-red-700 p-4 mb-4 rounded">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
            {codeSnippets.length > 0 ? (
              codeSnippets.map((snippet, index) => (
                <div key={index} className="mb-6 border-b border-gray-700 pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium text-emerald-200 mb-2">{snippet.filename} ({snippet.language})</h3>
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed bg-gray-900 p-3 rounded">
                    <code>{snippet.content}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No code snippets found.</p>
            )}
          </div>
        </div>

        {/* Execution Controls & Logs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="mb-4">
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
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={rps}
                onChange={(e) => setRps(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isExecuting}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex justify-between">
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
          </div>

          {/* Execution Logs */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-64 overflow-auto">
              {executionLogs.length > 0 ? (
                executionLogs.map((log, index) => (
                  <p key={index} className="text-sm text-gray-300 leading-relaxed">{log}</p>
                ))
              ) : (
                <p className="text-gray-400">No execution logs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolReal_OwariComponent;
