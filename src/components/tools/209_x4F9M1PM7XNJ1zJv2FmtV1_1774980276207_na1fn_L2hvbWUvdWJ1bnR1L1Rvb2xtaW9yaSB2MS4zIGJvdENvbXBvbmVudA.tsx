import React, { useState, useEffect } from 'react';

interface ToolmioriV13BotComponentProps {
  toolPath: string;
}

const ToolmioriV13BotComponent: React.FC<ToolmioriV13BotComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(50);
  const [method, setMethod] = useState<string>('UDP'); // Placeholder for method selection
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const readSourceCode = async () => {
      try {
        // In a real scenario, this would involve an API call to read files from the sandbox
        // For this simulation, we'll use a placeholder or assume the file is directly readable.
        // Since we created a dummy file, we'll simulate reading it.
        const dummyCode = `/*\n * miori_bot.c - Dummy C source code for Mirai bot\n */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    printf(\"Miori v1.3 bot running...\\n\");\n    // Simulate some bot activity\n    for (int i = 0; i < 5; i++) {\n        printf(\"Scanning for vulnerabilities...\\n\");\n        sleep(1);\n    }\n    printf(\"Miori v1.3 bot finished.\\n\");\n    return 0;\n}\n`;
        setSourceCode(dummyCode);
      } catch (err) {
        setError('Failed to read source code.');
        console.error(err);
      }
    };
    readSourceCode();
  }, [toolPath]);

  useEffect(() => {
    let logInterval: NodeJS.Timeout;
    if (isRunning) {
      logInterval = setInterval(() => {
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Executing command with target ${targetInput}, duration ${duration}s, RPS ${rps}, threads ${threads}, method ${method}...`]);
      }, 1000);
    } else {
      clearInterval(logInterval);
    }
    return () => clearInterval(logInterval);
  }, [isRunning, targetInput, duration, rps, threads, method]);

  const handleStart = () => {
    setLogs([]);
    setError(null);
    setIsRunning(true);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Starting miori v1.3 bot...`]);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Stopping miori v1.3 bot.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Miori v1.3 Bot Tool</h1>

      {error && <div className="bg-red-700 p-3 mb-4 rounded">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-auto h-96">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap"><code>{sourceCode}</code></pre>
          </div>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Controls</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg mb-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input:</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., 192.168.1.1 or example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
                <select
                  id="method"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="UDP">UDP</option>
                  <option value="TCP">TCP</option>
                  <option value="HTTP">HTTP</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className={`flex-1 py-2 px-4 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white`}
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-emerald-300">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-auto h-64">
            {logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-200">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolmioriV13BotComponent;
