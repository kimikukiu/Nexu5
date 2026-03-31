
import React, { useState, useEffect } from 'react';

interface ToolZaponComponentProps {}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolZaponComponent: React.FC<ToolZaponComponentProps> = () => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [error, setError] = useState<string | null>(null);

  const toolDirectory = '/home/ubuntu/extracted_tools/Zapon/';
  const sourceFiles = ['zapon.c', 'zapon.go', 'zapon.py', 'zapon.sh'];

  useEffect(() => {
    const loadSourceCode = async () => {
      const newSourceCode: Record<string, string> = {};
      for (const file of sourceFiles) {
        try {
          // In a real environment, this would be an API call to read the file content
          // For this simulation, we'll just use placeholder content
          newSourceCode[file] = `// Content of ${file}\nconsole.log(\"Hello from ${file}\");`;
        } catch (err) {
          console.error(`Failed to load ${file}:`, err);
          setError(`Failed to load ${file}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      setSourceCode(newSourceCode);
    };

    loadSourceCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setIsRunning(true);
    setExecutionLogs(['Execution started...']);
    setError(null);

    // Simulate execution
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating request ${logCount} to ${params.target}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        stopExecution();
        setExecutionLogs((prevLogs) => [...prevLogs, 'Execution finished.']);
      }
    }, 1000);

    // In a real scenario, this would involve an API call to a backend service
    // that executes the tool and streams logs back.
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [...prevLogs, 'Execution stopped.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Zapon Tool Component</h1>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
            {sourceFiles.map((file) => (
              <div key={file} className="mb-4">
                <h3 className="text-xl font-medium text-emerald-200 mb-2">{file}</h3>
                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                  <code>{sourceCode[file] || 'Loading or not found...'}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Controls & Logs Section */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="target" className="block text-emerald-100 text-sm font-bold mb-2">Target Input:</label>
                <input
                  type="text"
                  id="target"
                  name="target"
                  value={params.target}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  placeholder="e.g., example.com"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-emerald-100 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={params.duration}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-emerald-100 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  value={params.rps}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-emerald-100 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  name="threads"
                  value={params.threads}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-emerald-100 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-64 overflow-auto">
            {executionLogs.length === 0 ? (
              <p className="text-gray-400">No logs yet.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-sm text-gray-300 leading-relaxed">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolZaponComponent;
