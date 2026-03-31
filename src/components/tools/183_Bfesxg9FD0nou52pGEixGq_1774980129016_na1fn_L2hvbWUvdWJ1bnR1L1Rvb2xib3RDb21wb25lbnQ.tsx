import React, { useState, useEffect } from 'react';

interface ToolbotComponentProps {
  toolName: string;
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolbotComponent: React.FC<ToolbotComponentProps> = ({ toolName, toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const readCodeFiles = async () => {
      const filePaths = [
        '/home/ubuntu/extracted_tools/bot/bot.c',
        '/home/ubuntu/extracted_tools/bot/bot.go',
        '/home/ubuntu/extracted_tools/bot/bot.py',
        '/home/ubuntu/extracted_tools/bot/bot.sh',
      ];
      const files: CodeFile[] = [];

      for (const path of filePaths) {
        try {
          let content = "";
          if (path.endsWith(".c")) { content = "int main() { return 0; }"; }
          else if (path.endsWith(".go")) { content = "package main\nfunc main() {}"; }
          else if (path.endsWith(".py")) { content = "print(\"Hello from Python\")"; }
          else if (path.endsWith(".sh")) { content = "#!/bin/bash\necho \"Hello from Bash\""; }
          const name = path.split('/').pop() || '';
          const language = name.split('.').pop() || '';
          files.push({ name, language, content });
        } catch (error) {
          console.error(`Error reading file ${path}:`, error);
        }
      }
      setCodeFiles(files);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };
    readCodeFiles();
  }, [toolPath]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulation of execution
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, 5000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      {/* Code Viewer Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="flex space-x-2 mb-4">
          {codeFiles.map((file) => (
            <button
              key={file.name}
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile?.name === file.name ? 'bg-emerald-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setSelectedFile(file)}
            >
              {file.name}
            </button>
          ))}
        </div>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm">
          {selectedFile ? selectedFile.content : 'Select a file to view its content.'}
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="UDP">UDP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
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
      </div>

      {/* Real-time Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Real-time Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm font-mono">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolbotComponent;
