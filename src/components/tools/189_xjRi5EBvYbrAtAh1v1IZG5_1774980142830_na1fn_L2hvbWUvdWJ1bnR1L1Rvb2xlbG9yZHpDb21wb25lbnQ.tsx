
import React, { useState, useEffect } from 'react';

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolelordzComponent: React.FC = () => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: '',
    duration: 0,
    rps: 0,
    threads: 0,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading files from the directory
    const fetchCodeFiles = async () => {
      // In a real scenario, this would involve an API call to read file system
      // For this task, we'll use placeholder content.
      const files: CodeFile[] = [
        {
          name: 'elordz.c',
          language: 'c',
          content: `// elordz.c\n#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\n");\n    return 0;\n}`,
        },
        {
          name: 'elordz.go',
          language: 'go',
          content: `// elordz.go\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
        },
        {
          name: 'elordz.py',
          language: 'python',
          content: `# elordz.py\nprint("Hello from Python!")`,
        },
        {
          name: 'elordz.sh',
          language: 'bash',
          content: `# elordz.sh\necho "Hello from Bash!"`,
        },
      ];
      setCodeFiles(files);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };
    fetchCodeFiles();
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    let logCounter = 0;
    const interval = setInterval(() => {
      logCounter++;
      setExecutionLogs((prevLogs) => [
        ...prevLogs,
        `[${new Date().toLocaleTimeString()}] Executing with target: ${executionParams.target}, RPS: ${executionParams.rps}, Log #${logCounter}`,
      ]);
      if (logCounter >= 10) {
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">elordz Mirai Tool Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex space-x-2 mb-4">
            {codeFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile?.name === file.name ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-96">
            <pre className="text-sm whitespace-pre-wrap">{selectedFile?.content || 'Select a file to view code.'}</pre>
          </div>
        </div>

        {/* Execution Controls & Logs Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.target}
                onChange={(e) => setExecutionParams({ ...executionParams, target: e.target.value })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.duration}
                onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.rps}
                onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
              <input
                type="number"
                id="threads"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.threads}
                onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
              <select
                id="method"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.method}
                onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })}
                disabled={isExecuting}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStartExecution}
              disabled={isExecuting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64">
            {executionLogs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Start execution to see logs.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-sm text-gray-300">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolelordzComponent;
