
import React, { useState, useEffect } from 'react';

interface ToolJokerV1ComponentProps {
  toolPath: string;
}

const ToolJokerV1Component: React.FC<ToolJokerV1ComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, this would be an API call to read the file content
        // For this simulation, we'll use the dummy content we know exists.
        const dummyCodePath = `${toolPath}/joker.c`;
        // Simulate reading the file content
        const dummyCodeContent = `// Dummy C source code for JokerV1\nint main() {\n  // Simulate some network activity\n  printf(\"Connecting to target: %s\\n\", \"${target}\");\n  for (int i = 0; i < ${duration}; i++) {\n    // Simulate sending requests\n    printf(\"Sending %d requests per second\\n\", ${rps});\n  }\n  return 0;\n}`; // This is a placeholder, in a real app you'd read the actual file
        setSourceCode(dummyCodeContent);
      } catch (error) {
        setLogs(prev => [...prev, `Error reading source code: ${error}`]);
        setSourceCode('Error: Could not load source code.');
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Target: ${target}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);

    let logCount = 0;
    const interval = setInterval(() => {
      if (logCount < 10) { // Simulate 10 log lines
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating attack... Request sent to ${target} with method ${method}.`]);
        logCount++;
      } else {
        clearInterval(interval);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsExecuting(false);
      }
    }, 1000);

    // In a real application, you would make an API call to start the actual tool execution
    // and stream logs back.
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // In a real application, you would make an API call to stop the actual tool execution.
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-400 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-300">[MIRAI]$JokerV1$ Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code (joker.c)</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
            <pre className="whitespace-pre-wrap text-sm">
              <code className="language-c">
                {sourceCode}
              </code>
            </pre>
          </div>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="mb-4">
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., example.com:80"
                disabled={isExecuting}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                  disabled={isExecuting}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isExecuting}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isExecuting || !target}
                className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isExecuting}
                className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Real-time Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-60">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Start execution to see logs.</p>
            ) : (
              <ul className="list-none p-0 m-0 text-sm">
                {logs.map((log, index) => (
                  <li key={index} className="border-b border-gray-700 last:border-b-0 py-1">{log}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolJokerV1Component;
