import React, { useState, useEffect } from 'react';

interface ToolFreyaComponentProps {
  toolPath: string;
}

const ToolFreyaComponent: React.FC<ToolFreyaComponentProps> = ({ toolPath }) => {
  const [cCode, setCCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading code from files
    const readCode = async () => {
      // In a real scenario, you would use a backend API to read these files
      // For now, we'll use dummy content or assume they are passed in.
      setCCode(`// Dummy C Code for Freya\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Freya C code!\\n\");\n    return 0;\n}`);
      setPyCode(`// Dummy Python Code for Freya\nimport sys\n\ndef main():\n    print(\"Hello from Freya Python code!\")\n    if len(sys.argv) > 1:\n        print(f\"Arguments: {sys.argv[1:]}\")\n\nif __name__ == \"__main__\":\n    main()`);
      setShCode(`// Dummy Shell Script for Freya\n#!/bin/bash\n\necho \"Hello from Freya shell script!\"\n\nif [ -n \"$1\" ]; then\n  echo \"Arguments: $@\"\nfi`);
    };
    readCode();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, 3000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-emerald-400 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-emerald-300">Freya Tool Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Code Viewers */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-emerald-200">freya.c</h2>
          <pre className="bg-gray-700 p-3 rounded-md text-sm overflow-auto max-h-60">{cCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-emerald-200">freya.py</h2>
          <pre className="bg-gray-700 p-3 rounded-md text-sm overflow-auto max-h-60">{pyCode}</pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-emerald-200">attack.sh</h2>
          <pre className="bg-gray-700 p-3 rounded-md text-sm overflow-auto max-h-60">{shCode}</pre>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-emerald-200">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="input"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., target.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-emerald-100 focus:ring-emerald-500 focus:border-emerald-500"
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
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-emerald-200">Execution Logs</h2>
        <div className="bg-gray-700 p-3 rounded-md text-sm font-mono overflow-auto max-h-80">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-200">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolFreyaComponent;
