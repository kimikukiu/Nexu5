import React, { useState, useEffect, useRef } from 'react';

interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => (
  <div className="bg-gray-800 rounded-md p-4 mb-4">
    <pre className="text-emerald-400 text-sm overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  </div>
);

interface ToolChikaraMiraiSourceComponentProps {}

const ToolChikaraMiraiSourceComponent: React.FC<ToolChikaraMiraiSourceComponentProps> = () => {
  const [cCode, setCCode] = useState<string>('');
  const [goCode, setGoCode] = useState<string>('');
  const [pyCode, setPyCode] = useState<string>('');
  const [shCode, setShCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('HTTP');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      // In a real scenario, you would fetch these from the file system
      // For now, we\'ll use the dummy content created earlier.
      setCCode(`// Dummy C code for Chikara Mirai Source\n#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf(\"Executing Chikara Mirai Source C component.\\\n\");\n    if (argc > 1) {\n        printf(\"Target: %s\\\n\", argv[1]);\n    }\n    return 0;\n}\n`);
      setGoCode(`// Dummy Go code for Chikara Mirai Source\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"Executing Chikara Mirai Source Go component.\");\n\tif len(os.Args) > 1 {\n\t\tfmt.Printf(\"Target: %s\\\n\", os.Args[1])\n\t}\n}\n`);
      setPyCode(`import socket\n\ndef client_program():\n    host = socket.gethostname()\n    port = 5000\n\n    client_socket = socket.socket()\n    client_socket.connect((host, port))\n\n    message = input(\" -> \")\n\n    while message.lower().strip() != \'bye\':\n        client_socket.send(message.encode())\n        data = client_socket.recv(1024).decode()\n\n        print(\'Received from server: \' + data)\n\n        message = input(\" -> \")\n\n    client_socket.close()\n\nif __name__ == \'__main__\':\n    client_program()\n`);
      setShCode(`#!/bin/bash\n# Dummy shell script for Chikara Mirai Source\n\necho \"Running Chikara Mirai Source...\"\n\nTARGET=\${1:-\"127.0.0.1\"}\nDURATION=\${2:-60}\nRPS=\${3:-100}\nTHREADS=\${4:-10}\nMETHOD=\${5:-\"HTTP\"}\n\necho \"Target: \$TARGET\"\necho \"Duration: \$DURATION seconds\"\necho \"RPS: \$RPS\"\necho \"Threads: \$THREADS\"\necho \"Method: \$METHOD\"\n\nfor i in \$(seq 1 \$DURATION); do\n    echo \"[\$(date +%T)] Attacking \$TARGET with \$METHOD...\"\n    sleep 1\ndone\n\necho \"Chikara Mirai Source attack finished.\"\n`);
    };
    fetchCode();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    // Simulate execution
    let logCounter = 0;
    intervalRef.current = setInterval(() => {
      logCounter++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating attack on ${targetInput || '127.0.0.1'} with ${method} for ${duration}s. RPS: ${rps}, Threads: ${threads} - Log entry ${logCounter}`]);
      if (logCounter >= duration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRunning(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulation finished.`]);
      }
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulation stopped by user.`]);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Chikara Mirai Source Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code: C</h2>
          <CodeSnippet language="c" code={cCode} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code: Go</h2>
          <CodeSnippet language="go" code={goCode} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code: Python</h2>
          <CodeSnippet language="python" code={pyCode} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code: Shell</h2>
          <CodeSnippet language="bash" code={shCode} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>HTTP</option>
              <option>TCP</option>
              <option>UDP</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 h-64 overflow-y-auto rounded-md p-3 text-sm text-gray-200">
          {executionLogs.length === 0 ? (
            <p>No logs yet. Start the execution to see output.</p>
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

export default ToolChikaraMiraiSourceComponent;
