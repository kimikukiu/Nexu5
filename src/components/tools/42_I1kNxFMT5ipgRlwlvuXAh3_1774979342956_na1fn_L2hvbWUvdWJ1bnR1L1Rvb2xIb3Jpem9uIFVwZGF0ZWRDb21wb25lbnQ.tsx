
import React, { useState, useEffect } from 'react';

interface ToolHorizonUpdatedProps {
  toolPath: string;
}

const ToolHorizonUpdatedComponent: React.FC<ToolHorizonUpdatedProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading source code from the provided toolPath
    // In a real scenario, this would involve an API call or file system access
    const fetchSourceCode = async () => {
      try {
        // For demonstration, we'll use a placeholder or a dummy file content
        // In a real environment, you'd read the actual file content
        const dummyCodePath = `${toolPath}/horizon_updated.py`;
        // This part would typically involve a backend call to read the file
        // For now, we'll just set a dummy code string.
        setSourceCode(
`# Dummy Python code for Horizon Updated
import time
import requests

def run_test(target, duration, rps, threads, method):
    print(f"Starting test on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    start_time = time.time()
    requests_sent = 0
    while (time.time() - start_time) < duration:
        try:
            # Simulate a request
            # requests.request(method, target)
            print(f"Simulating {method} request to {target}")
            requests_sent += 1
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(1 / rps) # Simulate RPS
    print(f"Test finished. Total requests sent: {requests_sent}")

if __name__ == "__main__":
    # Example usage (these would come from component inputs)
    # run_test("http://example.com", 60, 100, 10, "GET")
`
        );
      } catch (error) {
        setLogs(prev => [...prev, `Error loading source code: ${error}`]);
        setSourceCode('// Error loading source code.');
      }
    };

    fetchSourceCode();
  }, [toolPath]);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    let currentDuration = 0;
    const interval = setInterval(() => {
      currentDuration++;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... Duration: ${currentDuration}s`]);
      if (currentDuration >= duration) {
        clearInterval(interval);
        setIsExecuting(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Horizon Updated Tool</h1>

      {/* Source Code Viewer */}
      <div className="mb-8">
        <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-sm border border-gray-700">
          <code>{sourceCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
            <input
              type="text"
              id="targetInput"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., http://localhost:8080"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
            <input
              type="number"
              id="rps"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
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
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
            <select
              id="method"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            START
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div>
        <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-80 text-sm border border-gray-700">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-300">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolHorizonUpdatedComponent;
