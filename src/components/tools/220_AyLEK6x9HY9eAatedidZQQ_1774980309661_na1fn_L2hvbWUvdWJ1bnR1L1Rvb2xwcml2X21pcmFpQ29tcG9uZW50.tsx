import React, { useState, useEffect } from 'react';

interface Toolpriv_miraiComponentProps {
  toolPath: string;
}

const Toolpriv_miraiComponent: React.FC<Toolpriv_miraiComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real application, this would be an API call to read the file content
        // For this simulation, we'll use a placeholder or read from a known path
        // Assuming the file is directly readable from the sandbox environment
        // For demonstration, we'll use a hardcoded path for the dummy file created earlier.
        const response = await fetch(`/api/read-file?path=${toolPath}/priv_mirai.c`); // Placeholder API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch source code: ${response.statusText}`);
        }
        const code = await response.text();
        setSourceCode(code);
      } catch (err: any) {
        setError(`Error loading source code: ${err.message}`);
        console.error('Error loading source code:', err);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    setError(null);
    const newLogs: string[] = [];
    newLogs.push(`[${new Date().toLocaleTimeString()}] Starting execution for target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`);
    setLogs(newLogs);

    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      newLogs.push(`[${new Date().toLocaleTimeString()}] Executing... Packet ${counter}`);
      setLogs([...newLogs]);
      if (counter >= 10) { // Simulate 10 log entries then stop
        clearInterval(interval);
        newLogs.push(`[${new Date().toLocaleTimeString()}] Execution finished.`);
        setLogs([...newLogs]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
    // In a real scenario, this would send a signal to stop the actual execution process.
  };

  return (
    <div className="bg-gray-900 text-emerald-500 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Mirai Tool: priv_mirai</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-96">
            <pre className="text-sm whitespace-pre-wrap break-all">
              <code>{sourceCode || 'Loading source code...'}</code>
            </pre>
          </div>
        </div>

        {/* Execution Controls */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div>
              <label htmlFor="target" className="block text-emerald-200 text-sm font-bold mb-2">Target:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 192.168.1.1:80"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-emerald-200 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-emerald-200 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={rps}
                  onChange={(e) => setRps(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-emerald-200 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  value={threads}
                  onChange={(e) => setThreads(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-emerald-200 text-sm font-bold mb-2">Method:</label>
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
            <div className="flex space-x-4">
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
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto max-h-60">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see logs.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolpriv_miraiComponent;
