import React, { useState, useEffect } from 'react';

interface ToolExtendoProps {
  toolPath: string;
}

interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}

interface ExecutionLogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const ToolExtendoComponent: React.FC<ToolExtendoProps> = ({ toolPath }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLogEntry[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');

  useEffect(() => {
    const readCodeFiles = async () => {
      const extensions = ['.c', '.go', '.py', '.sh'];
      const filesToRead = [];

      for (const ext of extensions) {
        const filename = `extendo${ext}`;
        const filePath = `${toolPath}/${filename}`;
        try {
          // Simulate reading file content directly from the sandbox file system
          // In a real React app, this would be an API call to a backend that reads the file
          let content = '';
          if (filename === 'extendo.c') {
            content = '#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Extendo C!\\n\");\n    return 0;\n}\n';
          } else if (filename === 'extendo.py') {
            content = 'def run_extendo_python():\n    print(\"Hello from Extendo Python!\")\n\nif __name__ == \"__main__\":\n    run_extendo_python()\n';
          } else if (filename === 'extendo.go') {
            content = 'package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Extendo Go!\")\n}\n';
          } else if (filename === 'extendo.sh') {
            content = '#!/bin/bash\necho \"Hello from Extendo Shell!\"\n';
          }
          filesToRead.push({
            filename: filename,
            language: getLanguageFromExtension(ext),
            content: content,
          });
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
        }
      }
      setCodeSnippets(filesToRead);
    };

    readCodeFiles();
  }, [toolPath]);

  // Simulate execution logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        const message = `Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`;
        setExecutionLogs((prevLogs) => [
          ...prevLogs,
          { timestamp, message, type: 'info' },
        ]);
      }, 1000);
    } else if (!isRunning && executionLogs.length > 0) {
      clearInterval(interval);
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      setExecutionLogs((prevLogs) => [
        ...prevLogs,
        { timestamp, message: 'Execution stopped.', type: 'info' },
      ]);
    }
    return () => clearInterval(interval);
  }, [isRunning, targetInput, duration, rps, threads, method]);



  const getLanguageFromExtension = (ext: string): string => {
    switch (ext) {
      case ".c":
        return "c";
      case ".go":
        return "go";
      case ".py":
        return "python";
      case ".sh":
        return "bash";
      default:
        return "plaintext";
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    // Logic to start execution
  };

  const handleStop = () => {
    setIsRunning(false);
    // Logic to stop execution
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-400 mb-4">Extendo Tool Component</h1>

      {/* Code Viewer Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-2">Source Code</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto h-64">
          {codeSnippets.length === 0 ? (
            <p className="text-gray-400">No code snippets found.</p>
          ) : (
            codeSnippets.map((snippet, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium text-emerald-200">{snippet.filename} ({snippet.language})</h3>
                <pre className="bg-gray-700 p-2 rounded-sm text-sm overflow-x-auto">
                  <code>{snippet.content}</code>
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Execution Controls */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Controls</h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-md">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-md overflow-auto h-64">
          {executionLogs.length === 0 ? (
            <p className="text-gray-400">No execution logs yet.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className={`text-sm ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-gray-300'}`}>
                <span className="font-mono">[{log.timestamp}]</span> {log.message}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolExtendoComponent;
