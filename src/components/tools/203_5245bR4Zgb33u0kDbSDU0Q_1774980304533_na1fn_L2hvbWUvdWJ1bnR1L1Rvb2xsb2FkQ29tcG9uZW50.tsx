
import React, { useState, useEffect, useRef } from 'react';

interface ToolloadComponentProps {
  toolName: string;
}

const ToolloadComponent: React.FC<ToolloadComponentProps> = ({ toolName }) => {
  const [codeFiles, setCodeFiles] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching code files
    const fetchCode = async () => {
      const files: Record<string, string> = {
        'main.c': `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`,
        'main.go': `package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello from Go!\")\n}`,
        'script.py': `print(\"Hello from Python!\")`,
        'run.sh': `echo \"Hello from Shell!\"`,
      };
      setCodeFiles(files);
      setSelectedFile(Object.keys(files)[0]);
    };
    fetchCode();
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [executionLogs]);

  const addLog = (message: string, type: 'info' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    setExecutionLogs(prev => [...prev, logMessage]);
  };

  const handleStart = () => {
    if (!targetInput) {
      addLog('Target input cannot be empty.', 'error');
      return;
    }
    setIsRunning(true);
    addLog(`Starting execution for ${toolName} with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`);
    
    // In a real application, this would be an API call to a backend service
    // that executes the tool and streams logs back.
    // Example: axios.post('/api/execute-tool', { toolName, targetInput, duration, rps, threads, method })
    //   .then(response => { /* handle success and stream logs */ })
    //   .catch(error => { addLog(`Execution failed: ${error.message}`, 'error'); setIsRunning(false); });

    // Simulate execution with periodic log updates
    let progress = 0;
    const interval = setInterval(() => {
      if (!isRunning) {
        clearInterval(interval);
        return;
      }
      progress += 20;
      if (progress <= 100) {
        addLog(`Simulating progress: ${progress}% complete...`);
      } else {
        clearInterval(interval);
        addLog(`Execution for ${toolName} finished successfully.`);
        setIsRunning(false);
      }
    }, duration * 1000 / 5);

    // Simulate a potential error after some time
    setTimeout(() => {
      if (Math.random() < 0.2) { // 20% chance of simulated error
        addLog('Simulated error: Connection reset by peer.', 'error');
        setIsRunning(false);
        clearInterval(interval);
      }
    }, duration * 1000 / 2);
  };

  const handleStop = () => {
    setIsRunning(false);
    addLog(`Stopping execution for ${toolName}.`);
    // In a real application, this would be an API call to stop the backend process.
    // Example: axios.post('/api/stop-execution', { toolName });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <select
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              {Object.keys(codeFiles).map((fileName) => (
                <option key={fileName} value={fileName}>
                  {fileName}
                </option>
              ))}
            </select>
          </div>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-auto h-96 text-sm text-emerald-100">
            <code>{codeFiles[selectedFile]}</code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., 192.168.1.1:8080 or example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests/s):</label>
                <input
                  type="number"
                  id="rps"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-emerald-500"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStop}
              disabled={!isRunning}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div ref={logContainerRef} className="bg-gray-900 p-4 rounded-lg overflow-auto h-64 text-sm text-gray-300">
            {executionLogs.map((log, index) => (
              <p key={index} className={log.includes('[ERROR]') ? 'text-red-400' : ''}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolloadComponent;
