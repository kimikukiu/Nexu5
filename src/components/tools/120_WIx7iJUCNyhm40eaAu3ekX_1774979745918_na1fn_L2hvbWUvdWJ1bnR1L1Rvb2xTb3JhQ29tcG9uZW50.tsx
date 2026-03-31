
import React, { useState, useEffect } from 'react';

interface ToolSoraComponentProps {
  toolName: string;
}

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolSoraComponent: React.FC<ToolSoraComponentProps> = ({ toolName }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ExecutionParams>({
    target: '127.0.0.1',
    duration: 10,
    rps: 100,
    threads: 50,
    method: 'HTTP_FLOOD',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate reading source code from a file
    const fetchSourceCode = async () => {
      try {
        // In a real scenario, this would be an API call to fetch the file content
        // For this simulation, we'll use a placeholder or pre-loaded content.
        const dummyCode = `
import time
import random

def attack(target, duration, rps, threads, method):
    print(f"Starting attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    logs = []
    start_time = time.time()
    while time.time() - start_time < duration:
        log_entry = f"[{time.time()}] Attacking {target} with {method} - Packet size: {random.randint(100, 1000)} bytes\n"
        logs.append(log_entry)
        time.sleep(1 / rps)
    print(f"Attack on {target} finished.")
    return ''.join(logs)

if __name__ == "__main__":
    # Example usage
    attack("192.168.1.1", 10, 100, 50, "HTTP_FLOOD")
`;
        setSourceCode(dummyCode);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };
    fetchSourceCode();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setError(null);
    setIsRunning(true);
    setExecutionLogs([]);
    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < params.duration * 2) { // Simulate more logs than duration for realism
        const newLog = `[${new Date().toISOString()}] Executing ${params.method} on ${params.target} - Log entry ${logCounter + 1}\n`;
        setExecutionLogs((prev) => [...prev, newLog]);
        logCounter++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionLogs((prev) => [...prev, `[${new Date().toISOString()}] Execution finished for ${params.target}.\n`]);
      }
    }, 500); // Simulate logs every 0.5 seconds

    // In a real scenario, this would trigger an actual execution via an API call
    // and stream logs back.
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionLogs((prev) => [...prev, `[${new Date().toISOString()}] Execution stopped by user.\n`]);
    // In a real scenario, this would send a signal to stop the execution process.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Mirai Tool: {toolName}</h1>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto h-96 border border-gray-700">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                name="target"
                value={params.target}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                placeholder="e.g., 192.168.1.1"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={params.duration}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
              <input
                type="number"
                id="rps"
                name="rps"
                value={params.rps}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                name="threads"
                value={params.threads}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
              >
                <option value="HTTP_FLOOD">HTTP_FLOOD</option>
                <option value="UDP_FLOOD">UDP_FLOOD</option>
                <option value="SYN_FLOOD">SYN_FLOOD</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className={`flex-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className={`flex-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md text-sm overflow-auto h-64 border border-gray-700">
          {executionLogs.map((log, index) => (
            <p key={index} className="text-gray-300 whitespace-pre-wrap">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolSoraComponent;
