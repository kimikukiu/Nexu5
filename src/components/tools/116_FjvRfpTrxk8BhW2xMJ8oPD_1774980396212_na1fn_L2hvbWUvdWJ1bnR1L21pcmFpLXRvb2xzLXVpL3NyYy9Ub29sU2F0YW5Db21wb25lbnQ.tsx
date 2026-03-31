import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ToolSatanProps {
  toolPath: string;
}

interface ExecutionLogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const ToolSatanComponent: React.FC<ToolSatanProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('Loading source code...');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLogEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSourceCode = async () => {
      try {
        const listResponse = await fetch(`http://127.0.0.1:5000/api/list-source-files?path=${toolPath}`);
        if (!listResponse.ok) {
          throw new Error(`HTTP error! status: ${listResponse.status}`);
        }
        const data = await listResponse.json();
        const sourceFiles = data.files;

        if (sourceFiles.length > 0) {
          const firstSourceFile = sourceFiles[0];
          const fileResponse = await fetch(`http://127.0.0.1:5000/api/read-file?path=${firstSourceFile}`);
          if (fileResponse.ok) {
            const code = await fileResponse.text();
            setSourceCode(code);
          } else {
            setSourceCode(`Error loading source code from ${firstSourceFile}.`);
          }
        } else {
          setSourceCode('No source code files found in the tool directory.');
        }
      } catch (error) {
        setSourceCode('Error loading source code. Check if the backend server is running.');
        console.error('Failed to load source code:', error);
      }
    };
    loadSourceCode();
  }, [toolPath]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [executionLogs]);

  const addLog = (message: string, type: 'info' | 'error' | 'success') => {
    setExecutionLogs(prevLogs => [
      ...prevLogs,
      { timestamp: new Date().toISOString(), message, type },
    ]);
  };

  const handleStartExecution = async () => {
    setIsRunning(true);
    addLog('Execution started...', 'info');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/execute-satan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetInput,
          duration,
          rps,
          threads,
          method,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        addLog(`Server response: ${result.message}`, 'success');
        let simulatedProgress = 0;
        const interval = setInterval(() => {
          if (!isRunning) {
            clearInterval(interval);
            return;
          }
          simulatedProgress += 10;
          if (simulatedProgress <= 100) {
            addLog(`Simulating execution progress: ${simulatedProgress}%`, 'info');
          } else {
            clearInterval(interval);
            addLog('Simulated execution complete.', 'success');
            setIsRunning(false);
          }
        }, duration * 100);
      } else {
        addLog(`Error: ${result.error || 'Unknown error'}`, 'error');
        setIsRunning(false);
      }
    } catch (error) {
      addLog(`Failed to connect to server: ${error}`, 'error');
      setIsRunning(false);
    }
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    addLog('Execution stopped by user.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Satan Tool Component</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-96 text-sm text-gray-200">
          <code>{sourceCode}</code>
        </pre>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 192.168.1.1:8080"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>UDP</option>
              <option>TCP</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleStartExecution}
            disabled={isRunning}
            className={clsx(
              "bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            disabled={!isRunning}
            className={clsx(
              "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              !isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div ref={logContainerRef} className="bg-gray-900 p-4 rounded-md overflow-auto max-h-64 text-sm text-gray-200">
          {executionLogs.map((log, index) => (
            <p key={index} className={clsx({
              'text-emerald-400': log.type === 'success',
              'text-red-400': log.type === 'error',
              'text-blue-400': log.type === 'info',
            })}>
              <span className="text-gray-500 mr-2">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              {log.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolSatanComponent;
