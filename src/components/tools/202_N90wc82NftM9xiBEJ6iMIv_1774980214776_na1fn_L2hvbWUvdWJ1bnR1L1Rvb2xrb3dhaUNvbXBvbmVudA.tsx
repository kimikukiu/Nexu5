
import React, { useState, useEffect } from 'react';

interface ToolKowaiComponentProps {
  toolPath: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolkowaiComponent: React.FC<ToolKowaiComponentProps> = ({ toolPath }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading files from the provided toolPath
    // In a real application, this would involve an API call to a backend
    // that can access the file system.
    const fetchCodeFiles = async () => {
      try {
        // Dummy data for demonstration. Replace with actual file reading logic.
        const files: CodeFile[] = [
          {
            name: 'main.c',
            language: 'c',
            content: `// main.c\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`,
          },
          {
            name: 'main.go',
            language: 'go',
            content: `// main.go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}`,
          },
          {
            name: 'main.py',
            language: 'python',
            content: `// main.py\ndef main():\n    print(\"Hello from Python!\")\n\nif __name__ == \"__main__\":\n    main()\n`,
          },
        ];
        setCodeFiles(files);
        if (files.length > 0) {
          setSelectedFile(files[0].name);
        }
      } catch (err) {
        setError('Failed to load code files.');
        console.error(err);
      }
    };

    fetchCodeFiles();
  }, [toolPath]);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);
    const startTime = new Date().toLocaleString();
    setExecutionLogs((prev) => [...prev, `[${startTime}] Starting execution...`]);
    setExecutionLogs((prev) => [...prev, `Target Input: ${targetInput || 'N/A'}`]);
    setExecutionLogs((prev) => [...prev, `Duration: ${duration}s`]);
    setExecutionLogs((prev) => [...prev, `RPS: ${rps}`]);
    setExecutionLogs((prev) => [...prev, `Threads: ${threads}`]);
    setExecutionLogs((prev) => [...prev, `Method: ${method}`]);
    setExecutionLogs((prev) => [...prev, `Executing file: ${selectedFile}`]);

    // Simulate execution over the specified duration
    let simulatedTime = 0;
    const interval = setInterval(() => {
      simulatedTime += 1;
      const logTime = new Date().toLocaleString();
      setExecutionLogs((prev) => [...prev, `[${logTime}] Simulated progress: ${simulatedTime}s / ${duration}s`]);

      if (simulatedTime >= duration) {
        clearInterval(interval);
        const endTime = new Date().toLocaleString();
        setExecutionLogs((prev) => [...prev, `[${endTime}] Execution finished.`]);
        setIsExecuting(false);
      }
    }, 1000);

    // In a real scenario, you would make an API call to trigger the actual tool execution
    // and stream logs back to the component.
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    const stopTime = new Date().toLocaleString();
    setExecutionLogs((prev) => [...prev, `[${stopTime}] Execution stopped by user.`]);
    // In a real scenario, you would make an API call to stop the actual tool execution.
  };

  const currentFileContent = codeFiles.find((file) => file.name === selectedFile)?.content || 'Select a file to view its content.';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Kowai Tool Component</h1>

      {error && <div className="bg-red-700 p-4 rounded-md mb-4 text-white">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="file-select" className="block text-sm font-medium text-gray-300 mb-2">Select File:</label>
            <select
              id="file-select"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-96 text-sm text-emerald-200 border border-gray-700">
            <code>{currentFileContent}</code>
          </pre>
        </div>

        {/* Execution Controls Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target-input" className="block text-sm font-medium text-gray-300 mb-1">Target Input:</label>
              <input
                type="text"
                id="target-input"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={isExecuting}
                placeholder="e.g., http://localhost:8080/"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  disabled={isExecuting}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests per Second):</label>
                <input
                  type="number"
                  id="rps"
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  disabled={isExecuting}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  disabled={isExecuting}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method:</label>
                <select
                  id="method"
                  className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isExecuting}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-300 border border-gray-700">
          {executionLogs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolkowaiComponent;
