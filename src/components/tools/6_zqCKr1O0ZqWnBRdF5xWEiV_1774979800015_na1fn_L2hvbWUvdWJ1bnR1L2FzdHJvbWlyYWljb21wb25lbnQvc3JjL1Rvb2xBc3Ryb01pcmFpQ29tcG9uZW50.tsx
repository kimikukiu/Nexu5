
import React, { useState, useEffect } from 'react';

interface CodeFile {
  name: string;
  content: string;
}

const ToolAstroMiraiComponent: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [target, setTarget] = useState('example.com');
  const [duration, setDuration] = useState(60);
  const [rps, setRps] = useState(100);
  const [threads, setThreads] = useState(1);
  const [method, setMethod] = useState('GET');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const filesData: CodeFile[] = [
      {
        name: 'main.c',
        content: '#include <stdio.h>\nint main() { printf("Hello from C!\n"); return 0; }',
      },
      {
        name: 'app.go',
        content: 'package main\nimport "fmt"\nfunc main() { fmt.Println("Hello from Go!") }',
      },
      {
        name: 'script.py',
        content: 'print("Hello from Python!")',
      },
      {
        name: 'run.sh',
        content: '#!/bin/bash\necho "Hello from Bash!"',
      },
    ];
    setFiles(filesData);
    if (filesData.length > 0) {
      setSelectedFile(filesData[0]);
    }
  }, []);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toISOString()}] Execution started...`]);

    // Simulate real-time log generation
    const logInterval = setInterval(() => {
      setLogs(prev => [...prev, `[${new Date().toISOString()}] [LOG] Attacking ${target} | Method: ${method} | RPS: ${rps} | Threads: ${threads}`]);
    }, 1000);

    // Simulate execution duration
    const executionTimeout = setTimeout(() => {
      clearInterval(logInterval);
      setIsRunning(false);
      setLogs(prev => [...prev, `[${new Date().toISOString()}] Execution finished after ${duration} seconds.`]);
    }, duration * 1000);

    // Store interval and timeout IDs to clear them on stop
    setExecutionTimers({ logInterval, executionTimeout });
  };

  const [executionTimers, setExecutionTimers] = useState<{ [key: string]: NodeJS.Timeout | null }>({ logInterval: null, executionTimeout: null });

  const handleStop = () => {
    if (!isRunning) return;
    if (executionTimers.logInterval) clearInterval(executionTimers.logInterval);
    if (executionTimers.executionTimeout) clearTimeout(executionTimers.executionTimeout);
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toISOString()}] Execution stopped by user.`]);
  };

  return (
    <div className="bg-gray-900 text-white p-4 font-sans min-h-screen">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a202c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2d3748;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4a5568;
        }
      `}</style>
      <h1 className="text-3xl font-extrabold text-emerald-400 mb-6 text-center">AstroMirai Tool Interface</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Source Files</h2>
          <div className="flex flex-col space-y-3">
            {files.map(file => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`text-left p-3 rounded-lg transition-all duration-200 
                  ${selectedFile?.name === file.name
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}>
                {file.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Code Viewer: {selectedFile?.name}</h2>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-auto h-96 text-sm custom-scrollbar">
            <code className="language-clike">{
              selectedFile?.content.replace(/\\n/g, '\n') || '// Select a file to view its content'
            }</code>
          </pre>
        </div>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
          <input type="text" placeholder="Target (e.g., example.com)" value={target} onChange={e => setTarget(e.target.value)} className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 outline-none" />
          <input type="number" placeholder="Duration (seconds)" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 outline-none" />
          <input type="number" placeholder="RPS (Requests/sec)" value={rps} onChange={e => setRps(parseInt(e.target.value))} className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 outline-none" />
          <input type="number" placeholder="Threads" value={threads} onChange={e => setThreads(parseInt(e.target.value))} className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 outline-none" />
          <input type="text" placeholder="Method (e.g., GET, POST)" value={method} onChange={e => setMethod(e.target.value)} className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 outline-none" />
        </div>
        <div className="flex space-x-4">
          <button onClick={handleStart} disabled={isRunning} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed">START</button>
          <button onClick={handleStop} disabled={!isRunning} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed">STOP</button>
        </div>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-900 p-5 rounded-lg overflow-auto h-64 text-sm text-gray-100 custom-scrollbar">
          {logs.map((log, index) => (
            <div key={index} className="font-mono text-green-300">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolAstroMiraiComponent;
