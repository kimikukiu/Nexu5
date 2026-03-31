import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

interface ToolXComponentProps {
  toolName: string; // e.g., "X"
  toolPath: string; // e.g., "/home/ubuntu/extracted_tools/X/"
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
  type: 'info' | 'error';
}

const ToolXComponent: React.FC<ToolXComponentProps> = ({ toolName, toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    target: '',
    duration: 10,
    rps: 100,
    threads: 1,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const executionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to read source code
  useEffect(() => {
    const readSourceCode = async () => {
      try {
        // In a real scenario, this would involve a backend call to read the file
        // For simulation, we'll use a placeholder or a direct file read if possible in the environment
        // Given the sandbox environment, we'll simulate reading the file content.
        // In a real React app, you'd fetch this from a server endpoint.
        const dummySourceCode = `
import time\n\ndef run_tool_x(target, duration, rps, threads, method):\n    print(f"Starting tool X with target: {target}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")\n    start_time = time.time()\n    while (time.time() - start_time) < duration:\n        # Simulate some work\n        time.sleep(0.1)\n        print(f"Tool X running... Elapsed: {time.time() - start_time:.2f}s")\n    print("Tool X finished.")\n\nif __name__ == "__main__":\n    run_tool_x(\
example.com", 10, 100, 5, "GET")
`;
        setSourceCode(dummySourceCode);
      } catch (err) {
        console.error("Failed to read source code:", err);
        setError("Failed to load tool source code.");
        setSourceCode("// Error loading source code.");
      }
    };
    readSourceCode();
  }, [toolPath]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const updateLogs = (message: string, type: LogEntry["type"] = "info") => {
    setLogs((prevLogs) => [
      ...prevLogs,
      { timestamp: new Date().toLocaleTimeString(), message, type },
    ]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExecutionParams((prevParams) => ({
      ...prevParams,
      [name]: name === "target" || name === "method" ? value : Number(value),
    }));
  };

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    setError(null);
    updateLogs(`Starting execution for ${toolName}...`);
    updateLogs(`Parameters: Target=${executionParams.target}, Duration=${executionParams.duration}s, RPS=${executionParams.rps}, Threads=${executionParams.threads}, Method=${executionParams.method}`);

    let elapsed = 0;
    executionIntervalRef.current = setInterval(() => {
      elapsed += 1;
      if (elapsed <= executionParams.duration) {
        updateLogs(`Simulating execution... Elapsed: ${elapsed}s / ${executionParams.duration}s`);
        // Simulate some output from the tool
        if (Math.random() < 0.1) { // 10% chance of an error log
          updateLogs(`[ERROR] Simulated error at ${elapsed}s: Connection timed out.`, 'error');
        }
      } else {
        clearInterval(executionIntervalRef.current!);
        setIsExecuting(false);
        updateLogs(`${toolName} execution finished.`);
      }
    }, 1000);
  };

  const handleStopExecution = () => {
    if (executionIntervalRef.current) {
      clearInterval(executionIntervalRef.current);
      executionIntervalRef.current = null;
    }
    setIsExecuting(false);
    updateLogs(`${toolName} execution stopped by user.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} Component</h1>

      {/* Error Display */}
      {error && (
        <div className="bg-red-800 text-white p-4 rounded mb-4">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-md overflow-auto max-h-96 text-sm">
          <code>{sourceCode || 'Loading source code...'}
          </code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="target"
              name="target"
              value={executionParams.target}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., example.com or 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={executionParams.duration}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests/Second):</label>
            <input
              type="number"
              id="rps"
              name="rps"
              value={executionParams.rps}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
            <input
              type="number"
              id="threads"
              name="threads"
              value={executionParams.threads}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              name="method"
              value={executionParams.method}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
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
            onClick={handleStartExecution}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-150 ease-in-out"
            disabled={isExecuting || !executionParams.target}
          >
            START
          </button>
          <button
            onClick={handleStopExecution}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-150 ease-in-out"
            disabled={!isExecuting}
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div ref={logContainerRef} className="bg-gray-800 p-4 rounded-md overflow-auto max-h-64 text-sm">
          {logs.map((log, index) => (
            <p key={index} className={log.type === 'error' ? 'text-red-400' : 'text-gray-300'}>
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </p>
          ))}
          {logs.length === 0 && <p className="text-gray-500">No logs yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ToolXComponent;
