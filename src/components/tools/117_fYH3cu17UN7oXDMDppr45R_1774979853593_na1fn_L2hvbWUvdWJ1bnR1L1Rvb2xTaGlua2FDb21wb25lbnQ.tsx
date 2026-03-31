import React, { useState, useEffect, useRef } from 'react';

interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

const ToolShinkaComponent: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: 'example.com',
    duration: 30,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const executionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getLanguageFromFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    const extension = parts[parts.length - 1];
    switch (extension) {
      case 'c': return 'c';
      case 'go': return 'go';
      case 'py': return 'python';
      case 'sh': return 'shell';
      default: return 'plaintext';
    }
  };

  // Simulate file reading - in a real app, this would be an API call
  const readSourceFile = async (filePath: string): Promise<string> => {
    // This is a placeholder. In a real React app, you'd fetch from a backend API
    // that reads the file from the server's filesystem.
    // For this sandbox, we'll return the content we know is in the dummy files.
    switch (filePath) {
      case '/home/ubuntu/extracted_tools/Shinka/main.c':
        return `int main() {
    printf("Hello from C!\n");
    return 0;
}`; 
      case '/home/ubuntu/extracted_tools/Shinka/main.go':
        return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`; 
      case '/home/ubuntu/extracted_tools/Shinka/main.py':
        return `print("Hello from Python!")\nprint("This is a second line.")`; 
      case '/home/ubuntu/extracted_tools/Shinka/run.sh':
        return `#!/bin/bash\necho "Hello from Shell!"\necho "Another line from shell."`; 
      default:
        throw new Error(`File not found: ${filePath}`);
    }
  };

  useEffect(() => {
    const loadCodeSnippets = async () => {
      try {
        const filePaths = [
          '/home/ubuntu/extracted_tools/Shinka/main.c',
          '/home/ubuntu/extracted_tools/Shinka/main.go',
          '/home/ubuntu/extracted_tools/Shinka/main.py',
          '/home/ubuntu/extracted_tools/Shinka/run.sh',
        ];

        const loadedSnippets: CodeSnippet[] = await Promise.all(
          filePaths.map(async (path) => {
            const filename = path.split('/').pop() || '';
            const language = getLanguageFromFileExtension(filename);
            const code = await readSourceFile(path);
            return { filename, language, code };
          })
        );
        setCodeSnippets(loadedSnippets);
      } catch (err: any) {
        setError(`Failed to load code snippets: ${err.message}`);
        console.error(err);
      }
    };
    loadCodeSnippets();
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => [...prev, { timestamp: new Date().toISOString(), message, type }]);
  };

  const handleStartExecution = () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setLogs([]); // Clear previous logs
    addLog('Execution started...', 'info');
    addLog(`Target: ${executionParams.target}, Duration: ${executionParams.duration}s, RPS: ${executionParams.rps}, Threads: ${executionParams.threads}, Method: ${executionParams.method}`, 'info');

    let simulatedTime = 0;
    const interval = 1000; // Simulate updates every second

    executionIntervalRef.current = setInterval(() => {
      simulatedTime += interval / 1000;
      if (simulatedTime <= executionParams.duration) {
        addLog(`Executing... Time elapsed: ${simulatedTime}s`, 'info');
        // Simulate some output based on method/target
        if (Math.random() < 0.1) { // 10% chance of a warning
          addLog(`Warning: High latency detected for ${executionParams.target}`, 'warning');
        }
      } else {
        clearInterval(executionIntervalRef.current!); 
        executionIntervalRef.current = null;
        addLog('Execution finished successfully.', 'success');
        setIsExecuting(false);
      }
    }, interval);
  };

  const handleStopExecution = () => {
    if (executionIntervalRef.current) {
      clearInterval(executionIntervalRef.current);
      executionIntervalRef.current = null;
    }
    setIsExecuting(false);
    addLog('Execution stopped by user.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 font-sans">
      <h1 className="text-4xl font-extrabold text-emerald-400 mb-8 text-center">Shinka Tool Component</h1>

      {error && <div className="bg-red-800 text-white p-4 rounded-lg mb-6 shadow-md">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-emerald-300 mb-5">Source Code</h2>
          <div className="space-y-5 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {codeSnippets.length === 0 && !error ? (
              <p className="text-gray-400 text-center">Loading code snippets...</p>
            ) : (
              codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
                    <span className="mr-2 text-emerald-400">📄</span> {snippet.filename} (<span className="text-emerald-300">{snippet.language.toUpperCase()}</span>)
                  </h3>
                  <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto text-gray-50 whitespace-pre-wrap leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Execution Controls and Logs Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-emerald-300 mb-5">Execution Controls</h2>
          <div className="space-y-5 mb-7">
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">Target Input:</label>
              <input
                type="text"
                id="target"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 p-3 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                value={executionParams.target}
                onChange={(e) => setExecutionParams({ ...executionParams, target: e.target.value })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 p-3 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                value={executionParams.duration}
                onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests Per Second):</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 p-3 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                value={executionParams.rps}
                onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
              <input
                type="number"
                id="threads"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 p-3 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                value={executionParams.threads}
                onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) || 0 })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method:</label>
              <select
                id="method"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 p-3 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                value={executionParams.method}
                onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })}
                disabled={isExecuting}
              >
                <option value="">Select Method</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-7">
            <button
              onClick={handleStartExecution}
              disabled={isExecuting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              START
            </button>
            <button
              onClick={handleStopExecution}
              disabled={!isExecuting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-bold text-emerald-300 mb-5">Execution Logs</h2>
          <div ref={logContainerRef} className="bg-gray-900 p-4 rounded-md text-sm font-mono max-h-[300px] overflow-y-auto custom-scrollbar text-gray-50">
            {logs.length === 0 && <p className="text-gray-500">No logs yet.</p>}
            {logs.map((log, index) => (
              <p key={index} className={{
                'text-green-400': log.type === 'success',
                'text-red-400': log.type === 'error',
                'text-yellow-400': log.type === 'warning',
                'text-gray-400': log.type === 'info',
              }[log.type]}>
                <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
              </p>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10B981; /* emerald-500 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669; /* emerald-600 */
        }
      `}</style>
    </div>
  );
};

export default ToolShinkaComponent;
