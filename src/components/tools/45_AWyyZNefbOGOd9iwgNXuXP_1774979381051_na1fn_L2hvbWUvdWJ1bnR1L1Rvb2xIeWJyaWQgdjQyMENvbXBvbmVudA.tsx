
import React, { useState, useEffect } from 'react';

interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => (
  <div className="bg-gray-800 rounded-md p-4 mb-4">
    <div className="text-emerald-400 text-sm font-mono mb-2">{language}</div>
    <pre className="overflow-x-auto text-gray-200 text-sm">
      <code>{code}</code>
    </pre>
  </div>
);

interface ExecutionControlsProps {
  onStart: (config: ExecutionConfig) => void;
  onStop: () => void;
  isRunning: boolean;
}

interface ExecutionConfig {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({ onStart, onStop, isRunning }) => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');

  const handleStart = () => {
    onStart({ targetInput, duration, rps, threads, method });
  };

  return (
    <div className="bg-gray-800 rounded-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Execution Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
          <input
            type="text"
            id="targetInput"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="e.g., example.com/api/data"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
          <input
            type="number"
            id="duration"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests Per Second):</label>
          <input
            type="number"
            id="rps"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            value={rps}
            onChange={(e) => setRps(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
          <input
            type="number"
            id="threads"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            value={threads}
            onChange={(e) => setThreads(parseInt(e.target.value))}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
          <select
            id="method"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
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
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          START
        </button>
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          STOP
        </button>
      </div>
    </div>
  );
};

const ToolHybridv420Component: React.FC = () => {
  const [cCode, setCCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toolPath = '/home/ubuntu/extracted_tools/Hybrid v420/';

  useEffect(() => {
    const fetchCode = async () => {
      try {
        // In a real scenario, these would be API calls to read file content
        // For this simulation, we'll use placeholder content or a mock API
        const cContent = `#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}`; // Replace with actual file read
        const shContent = `#!/bin/bash\n\necho \"Hello from Bash!\"`; // Replace with actual file read
        const goContent = `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Go!\")\n}`; // Replace with actual file read
        const pyContent = `def hello_python():\n    print(\"Hello from Python!\")\n\nif __name__ == \"__main__\":\n    hello_python()`; // Replace with actual file read

        setCCode(cContent);
        setShCode(shContent);
        setGoCode(goContent);
        setPyCode(pyContent);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };

    fetchCode();
  }, []);

  const handleStartExecution = (config: ExecutionConfig) => {
    setIsRunning(true);
    setLogs(['[INFO] Starting execution...', `[CONFIG] Target: ${config.targetInput}, Duration: ${config.duration}s, RPS: ${config.rps}, Threads: ${config.threads}, Method: ${config.method}`]);

    // Simulate execution
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setLogs((prevLogs) => [...prevLogs, `[LOG] Executing step ${counter}...`]);
      if (counter >= 5) {
        clearInterval(interval);
        setLogs((prevLogs) => [...prevLogs, '[INFO] Execution finished.']);
        setIsRunning(false);
      }
    }, 1000);

    // In a real scenario, this would involve making API calls to a backend service
    // that interacts with the actual Mirai tool or its compiled binaries.
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, '[WARN] Execution stopped by user.']);
    // In a real scenario, this would send a signal to stop the backend process.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <h1 className="text-4xl font-bold text-emerald-500 mb-8">Mirai Tool: Hybrid v420</h1>

      {error && <div className="bg-red-800 text-white p-4 rounded mb-4">Error: {error}</div>}

      <ExecutionControls onStart={handleStartExecution} onStop={handleStopExecution} isRunning={isRunning} />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Source Code</h2>
        {cCode && <CodeSnippet language="C (main.c)" code={cCode} />}
        {shCode && <CodeSnippet language="Bash (script.sh)" code={shCode} />}
        {goCode && <CodeSnippet language="Go (payload.go)" code={goCode} />}
        {pyCode && <CodeSnippet language="Python (utility.py)" code={pyCode} />}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Execution Logs</h2>
        <div className="bg-gray-800 rounded-md p-4 h-64 overflow-y-auto font-mono text-sm text-gray-200">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start execution to see output.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className={log.startsWith('[ERROR]') ? 'text-red-400' : log.startsWith('[WARN]') ? 'text-yellow-400' : 'text-gray-200'}>
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHybridv420Component;
