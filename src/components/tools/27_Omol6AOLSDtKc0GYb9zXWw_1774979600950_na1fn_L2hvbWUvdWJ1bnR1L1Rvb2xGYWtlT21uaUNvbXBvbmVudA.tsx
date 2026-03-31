
import React, { useState, useEffect } from 'react';

interface ToolFakeOmniProps {
  toolName: string;
  toolPath: string;
}

interface ExecutionParams {
  input: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

const ToolFakeOmniComponent: React.FC<ToolFakeOmniProps> = ({ toolName, toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    input: 'default_input',
    duration: 10,
    rps: 1,
    threads: 1,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Logic to read source code from toolPath
    // For now, a placeholder
    // In a real application, this would be fetched from a backend API.
    // For this simulation, we are embedding the content directly.
    setSourceCode(`import time
import sys

def run_fake_omni(input_data, duration, rps, threads, method):
    print(f"Starting FakeOmni with input: {input_data}, duration: {duration}s, RPS: {rps}, threads: {threads}, method: {method}")
    start_time = time.time()
    logs = []
    request_count = 0

    while (time.time() - start_time) < duration:
        # Simulate some work
        time.sleep(1 / rps if rps > 0 else 0.1) 
        request_count += 1
        log_message = f"[{time.strftime(\'%H:%M:%S\')}] Processed request {request_count} with method {method}"
        print(log_message)
        logs.append(log_message)

    print(f"FakeOmni finished. Total requests: {request_count}")
    return logs

if __name__ == "__main__":
    # Example usage for command line execution
    input_data = sys.argv[1] if len(sys.argv) > 1 else "default_input"
    duration = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    rps = int(sys.argv[3]) if len(sys.argv) > 3 else 1
    threads = int(sys.argv[4]) if len(sys.argv) > 4 else 1
    method = sys.argv[5] if len(sys.argv) > 5 else "GET"

    run_fake_omni(input_data, duration, rps, threads, method)
`);
  }, [toolName, toolPath]);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStartExecution = () => {
    setLogs([]); // Clear previous logs
    setIsExecuting(true);
    console.log(\'Starting execution with params:\', executionParams);

    let requestCount = 0;
    const startTime = Date.now();
    const id = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;

      if (elapsedSeconds >= executionParams.duration) {
        clearInterval(id);
        setIsExecuting(false);
        setLogs((prevLogs) => [...prevLogs, { timestamp: new Date().toLocaleTimeString(), message: \'Execution finished.\' }]);
        setIntervalId(null);
        return;
      }

      requestCount++;
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        message: `Processed request ${requestCount} for input \'${executionParams.input}\' with method ${executionParams.method}`,
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
    }, 1000 / (executionParams.rps > 0 ? executionParams.rps : 1));
    setIntervalId(id);
  };

  const handleStopExecution = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsExecuting(false);
    console.log(\'Stopping execution\');
    setLogs((prevLogs) => [...prevLogs, { timestamp: new Date().toLocaleTimeString(), message: \'Execution stopped by user.\' }]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">{toolName} Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-emerald-300">Source Code</h2>
          <pre className="bg-gray-700 p-3 rounded-md text-sm overflow-auto h-64">{sourceCode}</pre>
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-emerald-300">Execution Controls</h2>
          <div className="space-y-2">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-300">Input:</label>
              <input
                type="text"
                id="input"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.input}
                onChange={(e) => setExecutionParams({ ...executionParams, input: e.target.value })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.duration}
                onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second):</label>
              <input
                type="number"
                id="rps"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.rps}
                onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads:</label>
              <input
                type="number"
                id="threads"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.threads}
                onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) })}
                disabled={isExecuting}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method:</label>
              <select
                id="method"
                className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={executionParams.method}
                onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })}
                disabled={isExecuting}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleStartExecution}
                disabled={isExecuting}
                className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-200
                           bg-emerald-600 hover:bg-emerald-700 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isExecuting}
                className="flex-1 py-2 px-4 rounded-md font-semibold transition duration-200
                           bg-red-600 hover:bg-red-700 text-white
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-emerald-300">Execution Logs</h2>
        <div className="bg-gray-700 p-3 rounded-md text-sm overflow-auto h-64">
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Start execution to see logs.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-gray-200">[{log.timestamp}] {log.message}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolFakeOmniComponent;
