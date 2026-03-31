
import React, { useState, useEffect, useRef } from 'react';

interface SourceFile {
  name: string;
  language: string;
  content: string;
}

interface ToolProps {
  toolName: string;
  toolPath: string;
}

const ToolMIRAI_AmensSource_dingding_Component: React.FC<ToolProps> = ({ toolName, toolPath }) => {
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to determine language from file extension
  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop();
    switch (ext) {
      case 'c': return 'c';
      case 'go': return 'go';
      case 'py': return 'python';
      case 'sh': return 'bash';
      default: return 'plaintext';
    }
  };

  // Simulate reading file content (in a real app, this would be an API call)
  const fetchFileContent = async (filePath: string): Promise<string> => {
    // This is a placeholder. In a real application, you would make an API call
    // to a backend that can read the file system.
    // For now, we return dummy content based on the file name.
    const fileName = filePath.split('/').pop();
    switch (fileName) {
      case 'main.c':
        return `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n\");\n    return 0;\n}`;
      case 'logic.go':
        return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`;
      case 'script.py':
        return `import sys\n\nprint("Hello from Python!")\n\nif __name__ == "__main__":\n    if len(sys.argv) > 1:\n        print(f"Arguments: {sys.argv[1:]}")`;
      case 'run.sh':
        return `#!/bin/bash\n\necho "Hello from Bash!"\n\nif [ -n "$1" ]; then\n    echo "Arguments: $@"\nfi`;
      default:
        return `// Content for ${fileName} (simulated)`;
    }
  };

  useEffect(() => {
    const loadSourceFiles = async () => {
      try {
        // In a real scenario, you'd get a list of files from the backend
        // For this simulation, we use the known files
        const fileNames = ['main.c', 'logic.go', 'script.py', 'run.sh'];
        const loadedFiles: SourceFile[] = await Promise.all(
          fileNames.map(async (name) => ({
            name,
            language: getLanguage(name),
            content: await fetchFileContent(`${toolPath}/${name}`),
          }))
        );
        setSourceFiles(loadedFiles);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };

    loadSourceFiles();
  }, [toolPath]);

  const startExecution = () => {
    setIsRunning(true);
    setLogs([]);
    setError(null);
    let logCount = 0;
    intervalRef.current = setInterval(() => {
      logCount++;
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Log entry ${logCount}: Simulating execution with target ${targetInput}, duration ${duration}s, RPS ${rps}, threads ${threads}, method ${method}`]);
      if (logCount >= 10) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulation finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName}</h1>

      {error && <div className="bg-red-800 p-3 mb-4 rounded">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sourceFiles.length > 0 ? (
              sourceFiles.map((file, index) => (
                <div key={index} className="bg-gray-700 rounded p-3">
                  <h3 className="text-lg font-medium text-emerald-200 mb-2">{file.name} ({file.language})</h3>
                  <pre className="whitespace-pre-wrap break-all text-sm bg-gray-900 p-2 rounded overflow-x-auto">
                    <code>{file.content}</code>
                  </pre>
                </div>
              ))
            ) : (
              <p>No source files found or loaded.</p>
            )}
          </div>
        </div>

        {/* Execution Controls and Logs */}
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="targetInput"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  disabled={isRunning}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-3 rounded shadow-inner max-h-60 overflow-y-auto text-sm text-gray-300">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <p key={index} className="mb-1">{log}</p>
              ))
            ) : (
              <p>No logs yet. Start execution to see logs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_AmensSource_dingding_Component;
