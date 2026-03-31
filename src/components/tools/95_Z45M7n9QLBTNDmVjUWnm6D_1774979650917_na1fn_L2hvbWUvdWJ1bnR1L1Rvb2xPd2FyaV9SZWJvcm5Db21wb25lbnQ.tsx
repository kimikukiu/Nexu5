
import React, { useState, useEffect } from 'react';

interface ToolOwariRebornProps {
  // Define any props if needed
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolOwari_RebornComponent: React.FC<ToolOwariRebornProps> = () => {
  const [cCode, setCCode] = useState<string>(`#include <stdio.h>\n\nint main() {\n    printf(\"Hello from main.c\\n\");\n    return 0;\n}`);
  const [pythonCode, setPythonCode] = useState<string>(`import time\n\ndef run_attack(target, duration, rps, threads, method):\n    print(f\"[Python] Starting attack on {target} for {duration} seconds...\")\n    print(f\"[Python] RPS: {rps}, Threads: {threads}, Method: {method}\")\n    for i in range(duration):\n        time.sleep(1)\n        print(f\"[Python] Attack running... {i+1}/{duration}s\")\n    print(\"[Python] Attack finished.\")\n\nif __name__ == \"__main__\":\n    print(\"[Python] Script loaded. Ready for execution.\")`);
  const [bashCode, setBashCode] = useState<string>(`#!/bin/bash\n\necho \"[Bash] Starting attack on $1 for $2 seconds...\"\necho \"[Bash] RPS: $3, Threads: $4, Method: $5\"\n\nfor (( i=1; i<=$2; i++ ))\ndo\n  echo \"[Bash] Attack running... $i/$2s\"\n  sleep 1\ndone\n\necho \"[Bash] Attack finished.\"`);

  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: 'example.com',
    duration: 10,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? parseInt(value, 10) : value,
    }));
  };

  const startExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setLogs(['[SIMULATION] Starting execution...']);

    let currentSecond = 0;
    const interval = setInterval(() => {
      currentSecond++;
      if (currentSecond <= executionParams.duration) {
        setLogs((prev) => [
          ...prev,
          `[SIMULATION] Attacking ${executionParams.target} - Second ${currentSecond}/${executionParams.duration}`,
          `[SIMULATION] RPS: ${executionParams.rps}, Threads: ${executionParams.threads}, Method: ${executionParams.method}`,
        ]);
      } else {
        stopExecution();
        setLogs((prev) => [...prev, '[SIMULATION] Execution finished.']);
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsExecuting(false);
    setLogs((prev) => [...prev, '[SIMULATION] Execution stopped by user.']);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  const codeViewerStyle = 'bg-gray-800 text-emerald-400 p-4 rounded-md overflow-auto max-h-60 text-sm';
  const inputStyle = 'bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:border-emerald-500';
  const buttonStyle = 'px-4 py-2 rounded-md font-semibold';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Owari_Reborn Mirai Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">main.c</h2>
          <pre className={codeViewerStyle}>
            <code>{cCode}</code>
          </pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">script.py</h2>
          <pre className={codeViewerStyle}>
            <code>{pythonCode}</code>
          </pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">run.sh</h2>
          <pre className={codeViewerStyle}>
            <code>{bashCode}</code>
          </pre>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              name="target"
              value={executionParams.target}
              onChange={handleParamChange}
              className={inputStyle + ' w-full'}
              placeholder="e.g., example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionParams.duration}
              onChange={handleParamChange}
              className={inputStyle + ' w-full'}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionParams.rps}
              onChange={handleParamChange}
              className={inputStyle + ' w-full'}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionParams.threads}
              onChange={handleParamChange}
              className={inputStyle + ' w-full'}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={executionParams.method}
              onChange={handleParamChange}
              className={inputStyle + ' w-full'}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="SYN">SYN</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className={`${buttonStyle} bg-emerald-600 hover:bg-emerald-700 ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className={`${buttonStyle} bg-red-600 hover:bg-red-700 ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Execution Logs</h2>
        <div className="bg-black text-gray-100 p-4 rounded-md overflow-auto max-h-80 text-sm">
          {logs.map((log, index) => (
            <p key={index} className="mb-1 last:mb-0">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolOwari_RebornComponent;
