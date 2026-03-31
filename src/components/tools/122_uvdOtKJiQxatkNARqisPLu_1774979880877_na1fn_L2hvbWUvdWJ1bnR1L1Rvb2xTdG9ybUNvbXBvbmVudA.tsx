
import React, { useState, useEffect } from 'react';

interface ToolStormComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  content: string;
}

const ToolStormComponent: React.FC<ToolStormComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [target, setTarget] = useState<string>('127.0.0.1');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(100);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate file reading and parsing
    const getFileContent = (fileName: string): string => {
      switch (fileName) {
        case \"storm.c\":
          return `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Storm C code!\\n\");\n    return 0;\n}`;
        case \"storm.go\":
          return `package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Storm Go code!\") }`;
        case \"storm.py\":
          return `print(\"Hello from Storm Python code!\")`;
        case \"storm.sh\":
          return `#!/bin/bash\necho \"Hello from Storm Shell script!\"`;
        default:
          return \"File not found or content not available.\";
      }
    };

    const fetchCodeFiles = async () => {
      const fileExtensions = [\"c\", \"go\", \"py\", \"sh\"];
      const fetchedFiles: CodeFile[] = [];

      for (const ext of fileExtensions) {
        const fileName = `storm.${ext}`;
        const content = getFileContent(fileName);
        fetchedFiles.push({ name: fileName, content });
      }
      setCodeFiles(fetchedFiles);
      if (fetchedFiles.length > 0) {
        setSelectedFile(fetchedFiles[0].name);
        setCurrentCode(fetchedFiles[0].content);
      }
    };

    fetchCodeFiles();
  }, [toolPath]);

  useEffect(() => {
    if (selectedFile) {
      const file = codeFiles.find(f => f.name === selectedFile);
      if (file) {
        setCurrentCode(file.content);
      }
    }
  }, [selectedFile, codeFiles]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with target: ${target}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);
    // Simulate execution logs
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... packet ${count}`]);
      if (count >= 5) {
        clearInterval(interval);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        setIsRunning(false);
      }
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution.`]);
    // In a real scenario, this would send a stop signal to the backend process
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: Storm</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-sm font-medium text-gray-300 mb-2">Select File:</label>
            <select
              id="file-select"
              className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedFile || ''}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              {codeFiles.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-900 p-3 rounded-md overflow-auto max-h-96 border border-gray-700">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap"><code>{currentCode}</code></pre>
          </div>
        </div>

        {/* Execution Controls and Logs Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">Target:</label>
              <input
                type="text"
                id="target"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (s):</label>
              <input
                type="number"
                id="duration"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS:</label>
              <input
                type="number"
                id="rps"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
              <input
                type="number"
                id="threads"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method:</label>
              <select
                id="method"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isRunning}
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
              className="flex-1 py-2 px-4 rounded-md font-semibold transition-colors
                bg-emerald-600 hover:bg-emerald-700 text-white
                disabled:bg-gray-600 disabled:text-gray-400"
            >
              START
            </button>
            <button
              onClick={handleStop}
              disabled={!isRunning}
              className="flex-1 py-2 px-4 rounded-md font-semibold transition-colors
                bg-red-600 hover:bg-red-700 text-white
                disabled:bg-gray-600 disabled:text-gray-400"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-3 rounded-md overflow-auto max-h-60 border border-gray-700">
            {logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-400 leading-tight">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolStormComponent;
