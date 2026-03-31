import React, { useState, useEffect, useRef } from 'react';

interface ToolKanashiv3ComponentProps {
  // Define props here if any
}

const ToolKanashiv3Component: React.FC<ToolKanashiv3ComponentProps> = () => {
  const [cCode, setCCode] = useState<string>('');
  const [pythonCode, setPythonCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('c'); // 'c' or 'python'

  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      setCCode(`/*\n * Kanashiv3 C Source Code\n */\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello from Kanashiv3 C!\\n");\n    return 0;\n}`);

      setPythonCode(`# Kanashiv3 Python Source Code\n\ndef main():\n    print("Hello from Kanashiv3 Python!")\n\nif __name__ == "__main__":\n    main()`);
    };

    fetchCode();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const validateInputs = () => {
    if (!target.trim()) {
      setError('Target input cannot be empty.');
      return false;
    }
    if (duration <= 0) {
      setError('Duration must be a positive number.');
      return false;
    }
    if (rps <= 0) {
      setError('RPS must be a positive number.');
      return false;
    }
    if (threads <= 0) {
      setError('Threads must be a positive number.');
      return false;
    }
    setError(null);
    return true;
  };

  const startExecution = () => {
    if (!validateInputs()) {
      return;
    }

    setIsRunning(true);
    setLogs([]); // Clear previous logs
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleString()}] Starting Kanashiv3 with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);

    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleString()}] Execution progress: ${progress}%`]);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, duration * 100);
  };

  const stopExecution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Kanashiv3 Tool</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code Viewer</h2>
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`py-2 px-4 ${activeTab === 'c' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('c')}
          >
            kanashiv3.c
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'python' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('python')}
          >
            kanashiv3.py
          </button>
        </div>
        <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-96">
          <code>
            {activeTab === 'c' ? cCode : pythonCode}
          </code>
        </pre>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        {error && (
          <div className="bg-red-900 text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-gray-400 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-400 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-400 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-400 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-400 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="HEAD">HEAD</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className={`bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={startExecution}
            disabled={isRunning}
          >
            START
          </button>
          <button
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={stopExecution}
            disabled={!isRunning}
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-60">
          <code>
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ToolKanashiv3Component;
