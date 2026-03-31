import React, { useState, useEffect } from 'react';

interface ToolBComponentProps {
  toolName: string;
}

const ToolBComponent: React.FC<ToolBComponentProps> = ({ toolName }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const toolCode = `import time\n\ndef run_tool_b():\n    print(\"Executing Tool B (Python)...\")\n    for i in range(5):\n        print(f\"Step {i+1}...\")\n        time.sleep(1)\n    print(\"Tool B (Python) execution finished.\")\n\nif __name__ == \"__main__\":\n    run_tool_b()\n`;

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(['[INFO] Starting simulated execution...']);
    let step = 0;
    const interval = setInterval(() => {
      if (step < 5) {
        setLogs((prevLogs) => [...prevLogs, `[TOOL_B] Step ${step + 1}...`]);
        step++;
      } else {
        setLogs((prevLogs) => [...prevLogs, '[INFO] Simulated execution finished.']);
        stopExecution();
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setLogs((prevLogs) => [...prevLogs, '[INFO] Execution stopped.']);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="bg-gray-900 text-emerald-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code (tool_b.py)</h2>
          <pre className="bg-gray-950 p-4 rounded-md overflow-auto max-h-96 text-sm text-gray-200">
            <code>{toolCode}</code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-emerald-100"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isExecuting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isExecuting}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-950 p-4 rounded-md overflow-auto max-h-64 text-sm text-gray-200">
            {logs.map((log, index) => (
              <p key={index} className={log.startsWith('[ERROR]') ? 'text-red-400' : ''}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBComponent;
