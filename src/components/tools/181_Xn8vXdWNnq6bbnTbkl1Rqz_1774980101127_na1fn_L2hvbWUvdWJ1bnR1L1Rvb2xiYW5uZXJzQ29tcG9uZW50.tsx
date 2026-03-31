
import React, { useState, useEffect } from 'react';

interface ToolbannersComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolbannersComponent: React.FC<ToolbannersComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodeFiles = async () => {
      try {
        // In a real application, you would fetch these files from a backend API
        // or they would be pre-loaded. For this component generation, we'll use dummy content.
        const files: CodeFile[] = [
          { name: 'main.c', language: 'c', content: '// C code example\n#include <stdio.h>\n\nint main() {\n  printf("Hello from C!\n");\n  return 0;\n}' },
          { name: 'script.go', language: 'go', content: '// Go code example\npackage main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello from Go!")\n}' },
          { name: 'utility.py', language: 'python', content: '# Python code example\ndef greet():\n  print("Hello from Python!")\n\ngreet()\n' },
          { name: 'run.sh', language: 'bash', content: '# Bash script example\necho "Hello from Bash!"\nls -l\n' },
        ];
        setCodeFiles(files);
        if (files.length > 0) {
          setSelectedFile(files[0].name);
        }
      } catch (err: any) {
        setError(`Failed to read code files: ${err.message}`);
      }
    };
    fetchCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);

    // Simulate execution
    const logInterval = setInterval(() => {
      setExecutionLogs((prevLogs) => [
        ...prevLogs,
        `[${new Date().toLocaleTimeString()}] Executing with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`,
        `[${new Date().toLocaleTimeString()}] Simulation log: Processing data...`,
      ]);
    }, 1000);

    setTimeout(() => {
      clearInterval(logInterval);
      setIsExecuting(false);
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration > 0 ? duration * 1000 : 5000); // Simulate for 'duration' seconds or 5 seconds if duration is 0
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  const getFileContent = (fileName: string) => {
    const file = codeFiles.find((f) => f.name === fileName);
    return file ? file.content : 'File not found.';
  };

  const getFileLanguage = (fileName: string) => {
    const file = codeFiles.find((f) => f.name === fileName);
    return file ? file.language : 'plaintext';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: Banners</h1>

      {error && (
        <div className="bg-red-700 p-4 rounded-md mb-6">
          <p className="text-red-100">Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-gray-300 text-sm font-bold mb-2">Select File:</label>
            <select
              id="file-select"
              className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              {codeFiles.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>
          </div>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-sm h-96">
            <code className={`language-${getFileLanguage(selectedFile)}`}>
              {getFileContent(selectedFile)}
            </code>
          </pre>
        </div>

        {/* Execution Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="target-input" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target-input"
                className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com:80"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="block w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStartExecution}
              disabled={isExecuting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {isExecuting ? 'Executing...' : 'START'}
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto text-sm h-64">
            {executionLogs.map((log, index) => (
              <p key={index} className="text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolbannersComponent;
