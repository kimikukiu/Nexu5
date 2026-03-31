
import React, { useState, useEffect } from 'react';

interface ToolDDOSzMainProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolDDOSzMainComponent: React.FC<ToolDDOSzMainProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('HTTP');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

   useEffect(() => {
    const readFiles = async () => {
      const filesToRead = [
        { name: 'main.c', language: 'c', path: `${toolPath}/main.c` },
        { name: 'main.go', language: 'go', path: `${toolPath}/main.go` },
        { name: 'main.py', language: 'python', path: `${toolPath}/main.py` },
        { name: 'run.sh', language: 'bash', path: `${toolPath}/run.sh` },
      ];

      const loadedFiles: CodeFile[] = [];
      for (const file of filesToRead) {
        try {
          // In a real React app, you'd fetch content from a backend API
          // For this simulation, we'll use placeholder content.
          // This part needs to be replaced with actual file reading logic.
            let content = '';
          if (file.name === 'main.c') content = 'int main() { return 0; }';
          else if (file.name === 'main.go') content = 'package main\nfunc main() {}';
          else if (file.name === 'main.py') content = 'print(\"Hello from Python\")';
          else if (file.name === 'run.sh') content = '#!/bin/bash\necho \"Hello from Bash\"';


          loadedFiles.push({ ...file, content });
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error);
        }
      }
      setCodeFiles(loadedFiles);
      if (loadedFiles.length > 0) {
        setSelectedFile(loadedFiles[0]);
      }
    };

    readFiles();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting attack on ${target} with method ${method}...`]);
    // Simulate execution
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attack finished.`]);
      setIsRunning(false);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping attack.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-400 mb-4">DDOSz-main Tool Component</h1>

      <div className="flex space-x-4 mb-4">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Source Code</h2>
          <div className="bg-gray-800 p-2 rounded h-64 overflow-y-auto">
            {codeFiles.map((file) => (
              <div
                key={file.name}
                className={`cursor-pointer p-1 rounded ${selectedFile?.name === file.name ? 'bg-emerald-700' : 'hover:bg-gray-700'}`}
                onClick={() => setSelectedFile(file)}
              >
                {file.name}
              </div>
            ))}
          </div>
          <pre className="bg-gray-800 p-2 rounded mt-2 h-64 overflow-y-auto text-sm">
            <code>{selectedFile?.content || 'Select a file to view code'}</code>
          </pre>
        </div>

        <div className="w-2/3">
          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Controls</h2>
          <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Target (IP/Domain/URL)</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Threads</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300">Method</label>
              <select
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="HTTP">HTTP</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              className="px-6 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              onClick={handleStart}
              disabled={isRunning}
            >
              START
            </button>
            <button
              className="px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold"
              onClick={handleStop}
              disabled={!isRunning}
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Logs</h2>
          <div className="bg-gray-800 p-2 rounded h-64 overflow-y-auto text-sm">
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDDOSzMainComponent;
