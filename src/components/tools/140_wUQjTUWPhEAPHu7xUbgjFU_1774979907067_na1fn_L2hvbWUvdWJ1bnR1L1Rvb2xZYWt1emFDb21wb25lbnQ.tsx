import React, { useState, useEffect, useRef } from 'react';

interface ToolYakuzaComponentProps {
  // Define props here if any
}

const ToolYakuzaComponent: React.FC<ToolYakuzaComponentProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [target, setTarget] = useState<string>('http://localhost:8080');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call to read the file content.
    // For this sandbox environment, we are embedding the content directly.
    const actualSourceCode = `echo "Hello from Yakuza!"\n`;
    setSourceCode(actualSourceCode);
    setFileName('yakuza.sh');
  }, []);

  const startExecution = () => {
    setError(null);
    if (!target) {
      setError('Target input cannot be empty.');
      return;
    }
    if (duration <= 0 || rps <= 0 || threads <= 0) {
      setError('Duration, RPS, and Threads must be positive numbers.');
      return;
    }

    setIsExecuting(true);
    setLogs([]);
    let logCount = 0;
    intervalRef.current = setInterval(() => {
      logCount++;
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing with target: ${target}, method: ${method}, RPS: ${rps}, Threads: ${threads}, Log #${logCount}`]);
      if (logCount >= duration * 2) { // Simulate logs for twice the duration
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsExecuting(false);
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 500);
  };

  const stopExecution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 font-sans">
      <h1 className="text-3xl font-extrabold text-emerald-400 mb-6 border-b-2 border-emerald-600 pb-2">Yakuza Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded-md mb-4 flex items-center justify-between">
          <span>Error: {error}</span>
          <button onClick={() => setError(null)} className="text-sm font-semibold ml-4">X</button>
        </div>
      )}

      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Source Code: {fileName}</h2>
        <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm border border-gray-600 max-h-80">
          <code className="text-gray-200 block whitespace-pre-wrap">{sourceCode}</code>
        </pre>
      </div>

      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., http://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
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
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-700 p-4 rounded-md h-80 overflow-auto text-sm font-mono border border-gray-600">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-300 leading-relaxed">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolYakuzaComponent;
