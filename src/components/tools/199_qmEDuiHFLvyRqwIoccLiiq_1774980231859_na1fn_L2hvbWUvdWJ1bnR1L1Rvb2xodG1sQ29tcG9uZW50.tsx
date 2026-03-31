import React, { useState, useEffect } from 'react';

interface ExecutionLog {
  timestamp: string;
  message: string;
}

const ToolhtmlComponent: React.FC = () => {
  const [sourceFiles, setSourceFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the file list.
    const fetchSourceFiles = async () => {
      try {
        // Simulate fetching file list
        const files = ['tool.c', 'tool.go', 'tool.py', 'tool.sh'];
        setSourceFiles(files);
        setSelectedFile(files[0]);
      } catch (error) {
        console.error('Error fetching source files:', error);
        addLog('Error fetching source files.');
      }
    };
    fetchSourceFiles();
  }, []);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the file content.
    const fetchCode = async () => {
      if (selectedFile) {
        try {
          // Simulate fetching file content
          const fileContents: { [key: string]: string } = {
            'tool.c': `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\n");\n    return 0;\n}`,
            'tool.go': `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
            'tool.py': `def main():\n    print("Hello from Python!")\n\nif __name__ == "__main__":\n    main()`,
            'tool.sh': `#!/bin/bash\n\necho "Hello from Shell!"`,
          };
          setCode(fileContents[selectedFile]);
        } catch (error) {
          console.error('Error fetching code:', error);
          addLog(`Error fetching code for ${selectedFile}.`);
        }
      }
    };
    fetchCode();
  }, [selectedFile]);

  const addLog = (message: string) => {
    const newLog: ExecutionLog = {
      timestamp: new Date().toISOString(),
      message,
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
  };

  const handleStart = () => {
    if (!target) {
      addLog('Target is required.');
      return;
    }
    setIsExecuting(true);
    addLog(`Execution started on target: ${target}`);
    // Simulate execution logs
    const interval = setInterval(() => {
      addLog(`Attacking ${target} with ${method} method...`);
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsExecuting(false);
      addLog('Execution finished.');
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsExecuting(false);
    addLog('Execution stopped by user.');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">Mirai Tool: html</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Code Viewer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Source Code</h2>
            <select
              value={selectedFile}
              onChange={e => setSelectedFile(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {sourceFiles.map(file => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 h-96 overflow-auto">
            <pre><code>{code}</code></pre>
          </div>
        </div>

        {/* Right Column: Execution Controls */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Execution Controls</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-sm font-medium mb-2">Target (IP or URL)</label>
              <input
                type="text"
                id="target"
                value={target}
                onChange={e => setTarget(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., 192.168.1.1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={e => setDuration(parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium mb-2">RPS</label>
                <input
                  type="number"
                  id="rps"
                  value={rps}
                  onChange={e => setRps(parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium mb-2">Threads</label>
                <input
                  type="number"
                  id="threads"
                  value={threads}
                  onChange={e => setThreads(parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium mb-2">Method</label>
                <select
                  id="method"
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>TCP</option>
                  <option>UDP</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleStart}
                disabled={isExecuting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isExecuting ? 'Executing...' : 'START'}
              </button>
              <button
                onClick={handleStop}
                disabled={!isExecuting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Execution Logs</h2>
        <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-auto">
          {logs.map((log, index) => (
            <div key={index} className="font-mono text-sm">
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolhtmlComponent;
