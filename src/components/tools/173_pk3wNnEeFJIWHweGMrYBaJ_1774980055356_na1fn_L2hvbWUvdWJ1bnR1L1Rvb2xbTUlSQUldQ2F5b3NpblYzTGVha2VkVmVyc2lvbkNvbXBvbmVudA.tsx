
import React, { useState, useEffect } from 'react';

interface ToolCayosinV3LeakedVersionComponentProps {
  toolName: string;
}

const ToolCayosinV3LeakedVersionComponent: React.FC<ToolCayosinV3LeakedVersionComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchSourceCode = async () => {
      const files = [
        '/home/ubuntu/extracted_tools/[MIRAI]CayosinV3LeakedVersion/main.c',
        '/home/ubuntu/extracted_tools/[MIRAI]CayosinV3LeakedVersion/script.sh',
      ];
      const code: Record<string, string> = {};
      for (const file of files) {
        try {
          // In a real React app, you would fetch this from a backend API
          // For this simulation, we'll use placeholder content.
          const fileName = file.split('/').pop() || file;
          code[fileName] = `// Simulated content for ${fileName}\nint main() {\n  printf(\"Hello from ${fileName}\\n\");\n  return 0;\n}`;
          if (fileName.endsWith('.sh')) {
            code[fileName] = `#!/bin/bash\n# Simulated content for ${fileName}\necho \"Executing ${fileName}\"\n`
          }
        } catch (error) {
          console.error(`Failed to read file ${file}:`, error);
          code[file.split('/').pop() || file] = `Error: Could not read ${file}`;
        }
      }
      setSourceCode(code);
    };

    fetchSourceCode();
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(['[INFO] Starting simulated execution...']);
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setLogs((prevLogs) => [...prevLogs, `[LOG] Simulated execution log entry ${logCount} at ${new Date().toLocaleTimeString()}`]);
      if (logCount >= 10) {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs((prevLogs) => [...prevLogs, '[INFO] Simulated execution finished.']);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs((prevLogs) => [...prevLogs, '[WARNING] Simulated execution stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName} - Mirai Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(sourceCode).map(([fileName, codeContent]) => (
              <div key={fileName} className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-emerald-200">{fileName}</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-200">
                  <code>{codeContent}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 192.168.1.1"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
              <input
                type="number"
                id="threads"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
                <option>UDP</option>
                <option>TCP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isExecuting}
              className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isExecuting}
              className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
          <div className="bg-gray-700 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-200">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCayosinV3LeakedVersionComponent;
