import React, { useState, useEffect } from 'react';

interface ToolmiraiProps {
  // Define any props if needed
}

const ToolmiraiComponent: React.FC<ToolmiraiProps> = () => {
  const [target, setTarget] = useState<string>('127.0.0.1');
  const [duration, setDuration] = useState<number>(30);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('HTTP');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);

  const codeSnippets = {
    'main.c': `// main.c\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}\n`,
    'main.go': `// main.go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}\n`,
    'mirai.py': `// mirai.py\nimport time\n\ndef run_mirai_attack(target, duration, rps, threads, method):\n    print(f\"Starting Mirai attack on {target} for {duration} seconds...\")\n    print(f\"RPS: {rps}, Threads: {threads}, Method: {method}\")\n    for i in range(duration):\n        time.sleep(1)\n        print(f\"Attack ongoing... {i+1}/{duration} seconds\")\n    print(\"Mirai attack finished.\")\n\nif __name__ == \"__main__\":\n    pass\n`,
    'start.sh': `// start.sh\n#!/bin/bash\n\necho \"Starting Mirai tool...\"\npython3 /home/ubuntu/extracted_tools/mirai/src/mirai.py $@\necho \"Mirai tool finished.\"\n`,
  };

  const [selectedFile, setSelectedFile] = useState<string>('mirai.py');

  const simulatedLogs = [
    `Starting Mirai attack on ${target} for ${duration} seconds...`,
    `RPS: ${rps}, Threads: ${threads}, Method: ${method}`,
    ...Array.from({ length: duration }, (_, i) => `Attack ongoing... ${i + 1}/${duration} seconds`),
    'Mirai attack finished.',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentLogIndex < simulatedLogs.length) {
      interval = setInterval(() => {
        setLogs((prevLogs) => [...prevLogs, simulatedLogs[currentLogIndex]]);
        setCurrentLogIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Simulate 1 second per log line
    } else if (currentLogIndex >= simulatedLogs.length) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentLogIndex, simulatedLogs]);

  const handleStart = () => {
    setLogs([]);
    setCurrentLogIndex(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool Component</h1>

      {/* Code Viewer Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="flex space-x-4 mb-4">
          {Object.keys(codeSnippets).map((filename) => (
            <button
              key={filename}
              onClick={() => setSelectedFile(filename)}
              className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors
                ${selectedFile === filename ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {filename}
            </button>
          ))}
        </div>
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-emerald-100">
          <code>{codeSnippets[selectedFile as keyof typeof codeSnippets]}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
            <input
              type="number"
              id="rps"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method Selection</label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option>HTTP</option>
              <option>UDP</option>
              <option>TCP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-3 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-6 py-3 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-300">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Click START to begin.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolmiraiComponent;
