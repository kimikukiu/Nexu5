
import React, { useState, useEffect } from 'react';

interface ToolfurasshuComponentProps {
  toolName: string;
}

interface SourceFile {
  name: string;
  language: string;
  code: string;
}

const ToolfurasshuComponent: React.FC<ToolfurasshuComponentProps> = ({ toolName }) => {
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const loadSourceCode = async () => {
      // In a real scenario, this would involve a backend call to read files
      // For this simulation, we'll use dummy content or pre-read files.
      const files = [
        { name: 'main.c', language: 'c', code: `/* main.c */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from furasshu C code!\\n\");\n    return 0;\n}\n` },
        { name: 'script.py', language: 'python', code: `# script.py\nimport time\n\ndef run_attack(target, duration, rps, threads, method):\n    print(f\"[Python] Starting attack on {target} for {duration} seconds...\")\n    print(f\"[Python] RPS: {rps}, Threads: {threads}, Method: {method}\")\n    for i in range(3):\n        time.sleep(1)\n        print(f\"[Python] Attack in progress... {i+1}s\")\n    print(\"[Python] Attack finished.\")\n\nif __name__ == \"__main__\":\n    # This part would typically get arguments from command line\n    run_attack(\"example.com\", 10, 100, 5, \"GET\")\n` },
      ];
      setSourceFiles(files);
    };
    loadSourceCode();
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    const newLogs: string[] = [];
    newLogs.push(`[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`);
    newLogs.push(`[${new Date().toLocaleTimeString()}] Target: ${target}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      newLogs.push(`[${new Date().toLocaleTimeString()}] Simulating attack... Packet ${counter}`);
      setLogs([...newLogs]);
      if (counter >= 5) {
        clearInterval(interval);
        newLogs.push(`[${new Date().toLocaleTimeString()}] Execution finished.`);
        setIsExecuting(false);
        setLogs([...newLogs]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} - Mirai Tool Component</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-96 overflow-auto">
          {sourceFiles.length === 0 ? (
            <p>Loading source code...</p>
          ) : (
            sourceFiles.map((file, index) => (
              <div key={index} className="mb-6 border-b border-gray-700 pb-4 last:border-b-0">
                <h3 className="text-xl font-medium text-emerald-200 mb-2">{file.name} ({file.language})</h3>
                <pre className="whitespace-pre-wrap break-all text-sm bg-gray-900 p-3 rounded-md overflow-x-auto">
                  <code>{file.code}</code>
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
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
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
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
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
              <option value="TCP">TCP</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isExecuting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-h-80 overflow-auto">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300 mb-1 last:mb-0">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolfurasshuComponent;
