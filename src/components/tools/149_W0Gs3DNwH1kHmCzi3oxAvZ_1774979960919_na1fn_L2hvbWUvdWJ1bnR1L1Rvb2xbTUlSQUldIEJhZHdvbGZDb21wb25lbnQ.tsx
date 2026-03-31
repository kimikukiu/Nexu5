
import React, { useState, useEffect } from 'react';

interface ToolBadwolfComponentProps {
  toolName: string;
}

const ToolBadwolfComponent: React.FC<ToolBadwolfComponentProps> = ({ toolName }) => {
  const [cCode, setCCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading file content
    setCCode(`// C code for Badwolf\n#include <stdio.h>\n\nint main() {\n    printf("Hello from Badwolf C!\n");\n    return 0;\n}`);
    setGoCode(`// Go code for Badwolf\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Badwolf Go!")\n}`);
    setPyCode(`# Python code for Badwolf\nprint("Hello from Badwolf Python!")`);
    setShCode(`# Shell script for Badwolf\necho "Hello from Badwolf Shell!"`);
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution for ${toolName}...`]);
    setLogs(prev => [...prev, `Target: ${targetInput}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`]);
    // Simulate execution logs
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (simulated log entry ${counter})`]);
      if (counter >= 5) {
        clearInterval(interval);
        stopExecution();
      }
    }, 2000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped for ${toolName}.`]);
  };

  const CodeViewer: React.FC<{ language: string; code: string }> = ({ language, code }) => (
    <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-auto max-h-64">
      <h3 className="text-emerald-400 text-lg font-semibold mb-2">{language}</h3>
      <pre className="text-gray-200 text-sm whitespace-pre-wrap">{code}</pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-500 mb-8">{toolName} Component</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Source Code</h2>
            <CodeViewer language="C" code={cCode} />
            <CodeViewer language="Go" code={goCode} />
            <CodeViewer language="Python" code={pyCode} />
            <CodeViewer language="Shell" code={shCode} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Execution Controls</h2>
            <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-6">
              <div className="mb-4">
                <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
                <input
                  type="text"
                  id="targetInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., example.com:80"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={rps}
                  onChange={(e) => setRps(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={threads}
                  onChange={(e) => setThreads(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={startExecution}
                  disabled={isRunning}
                  className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  START
                </button>
                <button
                  onClick={stopExecution}
                  disabled={!isRunning}
                  className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  STOP
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Real-time Execution Logs</h2>
            <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-auto max-h-80">
              {logs.length === 0 ? (
                <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
              ) : (
                logs.map((log, index) => (
                  <p key={index} className="text-gray-300 text-sm mb-1">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBadwolfComponent;
