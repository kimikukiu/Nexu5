import React, { useState, useEffect, useRef } from 'react';

interface ToolTsunami_v3ComponentProps {
  // Define any props for the component here
}

const ToolTsunami_v3Component: React.FC<ToolTsunami_v3ComponentProps> = () => {
  const [codeSnippets, setCodeSnippets] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const snippets: {[key: string]: string} = {};
        snippets["main.c"] = `int main() { return 0; }`;
        snippets["main.go"] = `package main\nfunc main() {}`;
        snippets["script.py"] = `print(\"Hello from Python\")`;
        snippets["run.sh"] = `#!/bin/bash\necho \"Hello from Bash\"`;
        
        setCodeSnippets(snippets);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attacking ${target} - RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
      }, 1000);
    } else if (!isRunning && interval!) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, target, rps, threads, method]);

  const handleStart = () => {
    if (!target) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: Target cannot be empty.`]);
      return;
    }
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting attack on ${target} for ${duration} seconds with method ${method}...`]);
    // Simulate execution for the given duration
    setTimeout(() => {
      if (isRunning) { // Check if still running before stopping automatically
        handleStop();
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attack duration completed.`]);
      }
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping attack.`]);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-gray-100 p-4">Loading code...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-red-400 p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Tsunami_v3 Tool</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        {Object.entries(codeSnippets).map(([fileName, code]) => (
          <div key={fileName} className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg">
            <h3 className="text-xl font-medium text-emerald-200 mb-2">{fileName}</h3>
            <pre className="bg-gray-700 p-3 rounded-md overflow-auto text-sm text-gray-50">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., http://example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="HEAD">HEAD</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning || !target}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div ref={logContainerRef} className="bg-gray-800 rounded-lg p-4 shadow-lg h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-50 text-sm mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolTsunami_v3Component;
