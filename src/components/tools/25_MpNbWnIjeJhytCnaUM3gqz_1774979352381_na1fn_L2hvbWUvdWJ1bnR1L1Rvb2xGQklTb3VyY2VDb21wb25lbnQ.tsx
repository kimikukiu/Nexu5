import React, { useState, useEffect } from 'react';

interface ToolFBISourceComponentProps {
  toolPath: string;
}

const ToolFBISourceComponent: React.FC<ToolFBISourceComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [logIntervalId, setLogIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSourceCode = () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, this would be an API call to a backend that reads the files.
        // For this component, we'll simulate the file content.
        const dummySourceCode = {
          'fbi_source.c': `// C source code for FBI Source\n#include <stdio.h>\n\nint main() {\n    printf("Executing FBI Source C code...\n");\n    return 0;\n}`,
          'fbi_source.go': `// Go source code for FBI Source\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Executing FBI Source Go code...")\n}`,
          'fbi_source.py': `# Python source code for FBI Source\ndef execute_fbi_source():\n    print("Executing FBI Source Python code...")\n\nif __name__ == "__main__":\n    execute_fbi_source()`,
          'fbi_source.sh': `#!/bin/bash\n# Shell script for FBI Source\necho "Executing FBI Source Shell script..."`,
        };
        setSourceCode(dummySourceCode);
      } catch (err: any) {
        setError(`Failed to load source code: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const startExecution = () => {
    if (!targetInput.trim()) {
      setError('Target input cannot be empty.');
      return;
    }
    setError(null);
    setIsExecuting(true);
    setLogs([
      `[${new Date().toLocaleString()}] Starting FBI Source tool...`,
      `[${new Date().toLocaleString()}] Target: ${targetInput}, Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`
    ]);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] Sending packet ${logCount}...`]);
    }, 1000);
    setLogIntervalId(interval);

    setTimeout(() => {
      stopExecution(interval);
    }, duration * 1000);
  };

  const stopExecution = (intervalToClear: NodeJS.Timeout | null = logIntervalId) => {
    setIsExecuting(false);
    if (intervalToClear) {
      clearInterval(intervalToClear);
      if (logIntervalId === intervalToClear) {
          setLogIntervalId(null);
      }
    }
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] FBI Source tool stopped.`]);
  };

  if (loading) return <div className="p-4 bg-gray-900 text-emerald-400">Loading source code...</div>;

  return (
    <div className="p-6 bg-gray-900 text-white font-sans min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">FBI Source Tool</h1>
      {error && <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded-md mb-4">Error: {error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Object.entries(sourceCode).map(([filename, code]) => (
          <div key={filename} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-emerald-300 mb-3 border-b border-gray-700 pb-2">{filename}</h2>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-auto text-sm text-gray-300 h-64"><code>{code}</code></pre>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label htmlFor="targetInput" className="text-gray-400 mb-2">Target Input:</label>
            <input type="text" id="targetInput" value={targetInput} onChange={(e) => setTargetInput(e.target.value)} className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 192.168.1.1:8080" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-gray-400 mb-2">Duration (s):</label>
            <input type="number" id="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rps" className="text-gray-400 mb-2">RPS:</label>
            <input type="number" id="rps" value={rps} onChange={(e) => setRps(Number(e.target.value))} className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="threads" className="text-gray-400 mb-2">Threads:</label>
            <input type="number" id="threads" value={threads} onChange={(e) => setThreads(Number(e.target.value))} className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="flex flex-col col-span-full md:col-span-1">
            <label htmlFor="method" className="text-gray-400 mb-2">Method:</label>
            <select id="method" value={method} onChange={(e) => setMethod(e.target.value)} className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button onClick={startExecution} disabled={isExecuting} className={`w-full md:w-auto font-bold py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center ${isExecuting ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>START</button>
          <button onClick={() => stopExecution()} disabled={!isExecuting} className={`w-full md:w-auto font-bold py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center ${!isExecuting ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}>STOP</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Real-time Logs</h2>
        <div className="bg-black p-4 rounded-lg shadow-inner h-80 overflow-y-auto font-mono text-sm text-gray-300">
          {logs.map((log, index) => (
            <p key={index} className="whitespace-pre-wrap">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolFBISourceComponent;
