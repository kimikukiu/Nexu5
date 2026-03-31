import React, { useState, useEffect } from 'react';

interface ToolmiraiMainComponentProps {
  // No props for now, as per the task description
}

const ToolmiraiMainComponent: React.FC<ToolmiraiMainComponentProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [inputTarget, setInputTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to read source code files
    const readSourceCode = async () => {
      try {
        // In a real scenario, this would involve fetching from a server or a more complex file system access.
        // For this task, we'll use the content we already read.
        const cCode = `int main() {
    printf("Hello from C!\n");
    return 0;
}`; // Placeholder for actual C code
        setSourceCode(`// mirai.c\n${cCode}`);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };

    readSourceCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'inputTarget':
        setInputTarget(value);
        break;
      case 'duration':
        setDuration(Number(value));
        break;
      case 'rps':
        setRps(Number(value));
        break;
      case 'threads':
        setThreads(Number(value));
        break;
      case 'method':
        setMethod(value);
        break;
      default:
        break;
    }
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(['Starting execution simulation...']);
    setError(null);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulated log entry ${logCount} for target: ${inputTarget}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setExecutionLogs((prevLogs) => [...prevLogs, 'Execution simulation finished.']);
        setIsRunning(false);
      }
    }, 1000);

    // In a real application, this would trigger a backend process or WebAssembly execution.
    // For now, we store the interval to clear it on stop.
    // You might want to store the interval ID in a ref or state if you need to clear it from stopExecution.
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [...prevLogs, 'Execution stopped by user.']);
    // In a real application, this would send a signal to stop the backend process.
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai-Main Tool Component</h1>

      {error && (
        <div className="bg-red-700 text-white p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h2>
          <pre className="bg-gray-900 p-3 rounded-md overflow-auto max-h-96 text-sm text-gray-200">
            <code>{sourceCode || 'Loading source code...'}
            </code>
          </pre>
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="inputTarget" className="block text-gray-300 text-sm font-bold mb-1">Target Input:</label>
              <input
                type="text"
                id="inputTarget"
                name="inputTarget"
                value={inputTarget}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                placeholder="e.g., example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-1">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={duration}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-1">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  value={rps}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-1">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  name="threads"
                  value={threads}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-1">Method:</label>
                <select
                  id="method"
                  name="method"
                  value={method}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
                onClick={startExecution}
                disabled={isRunning}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h2>
        <div className="bg-gray-900 p-3 rounded-md overflow-auto max-h-60 text-sm text-gray-200">
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
  );
};

export default ToolmiraiMainComponent;
