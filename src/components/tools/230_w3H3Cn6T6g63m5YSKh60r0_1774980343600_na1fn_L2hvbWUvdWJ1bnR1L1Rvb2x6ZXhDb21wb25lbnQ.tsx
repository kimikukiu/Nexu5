
import React, { useState, useEffect } from 'react';

interface ToolzexComponentProps {
  toolPath: string;
}

const ToolzexComponent: React.FC<ToolzexComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(10);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading the source code file
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, this would be an API call to read the file content
        // For this simulation, we'll use a placeholder or a pre-defined content
        const dummyCode = `import sys\n\ndef main():\n    print(\"Executing zex_script.py\")\n    if len(sys.argv) > 1:\n        print(f\"Arguments: {sys.argv[1:]}\")\n\nif __name__ == \"__main__\":\n    main()\n`;
        setSourceCode(dummyCode);
        setExecutionLogs(prev => [...prev, `[INFO] Loaded source code from ${toolPath}/zex_script.py`]);
      } catch (error) {
        setExecutionLogs(prev => [...prev, `[ERROR] Failed to load source code: ${error}`]);
        setSourceCode('// Error loading source code.');
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs(prev => [...prev, `[INFO] Starting execution with:`]);
    setExecutionLogs(prev => [...prev, `  Target Input: ${targetInput}`]);
    setExecutionLogs(prev => [...prev, `  Duration: ${duration}s`]);
    setExecutionLogs(prev => [...prev, `  RPS: ${rps}`]);
    setExecutionLogs(prev => [...prev, `  Threads: ${threads}`]);
    setExecutionLogs(prev => [...prev, `  Method: ${method}`]);
    setExecutionLogs(prev => [...prev, `[SIMULATION] Executing zex tool...`]);

    // Simulate execution over time
    let logCount = 0;
    const simulationInterval = setInterval(() => {
      if (logCount < 5) {
        setExecutionLogs(prev => [...prev, `[SIMULATION] Progress update ${logCount + 1}...`]);
        logCount++;
      } else {
        clearInterval(simulationInterval);
        setExecutionLogs(prev => [...prev, `[SIMULATION] Execution finished.`]);
        setIsExecuting(false);
      }
    }, 2000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, `[INFO] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: zex</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <pre className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-96 text-sm">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Execution Controls */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com/api/data"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
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
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
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
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto h-64 text-sm">
          {executionLogs.map((log, index) => (
            <p key={index} className={log.startsWith('[ERROR]') ? 'text-red-400' : 'text-gray-300'}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolzexComponent;
