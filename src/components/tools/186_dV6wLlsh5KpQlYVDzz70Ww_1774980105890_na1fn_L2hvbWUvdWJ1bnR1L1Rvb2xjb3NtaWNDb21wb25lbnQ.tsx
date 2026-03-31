
import React, { useState, useEffect } from 'react';

interface ToolcosmicComponentProps {}

const ToolcosmicComponent: React.FC<ToolcosmicComponentProps> = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toolPath = '/home/ubuntu/extracted_tools/cosmic/cosmic.py';

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        // In a real application, this would be an API call to read the file
        // For this simulation, we'll use a placeholder or assume the content is pre-loaded
        // For the purpose of this exercise, we'll simulate reading the file.
        const dummySourceCode = `
import os
import sys

def run_cosmic_attack(target, duration, rps, threads, method):
    print(f"Starting cosmic attack on {target} for {duration} seconds...")
    print(f"RPS: {rps}, Threads: {threads}, Method: {method}")
    # Simulate attack logic
    for i in range(duration):
        print(f"Attack in progress... {i+1}/{duration}s")
        # In a real scenario, this would involve network requests
    print("Cosmic attack finished.")

if __name__ == "__main__":
    if len(sys.argv) != 6:
        print("Usage: python cosmic.py <target> <duration> <rps> <threads> <method>")
        sys.exit(1)
    
    target = sys.argv[1]
    duration = int(sys.argv[2])
    rps = int(sys.argv[3])
    threads = int(sys.argv[4])
    method = sys.argv[5]
    
    run_cosmic_attack(target, duration, rps, threads, method)
`;
        setSourceCode(dummySourceCode);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };

    fetchSourceCode();
  }, []);

  const startExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    setError(null);

    let currentLog: string[] = [];
    currentLog.push(`[${new Date().toLocaleTimeString()}] Starting cosmic attack on ${target} for ${duration} seconds...`);
    currentLog.push(`[${new Date().toLocaleTimeString()}] RPS: ${rps}, Threads: ${threads}, Method: ${method}`);
    setLogs([...currentLog]);

    let counter = 0;
    const interval = setInterval(() => {
      if (counter < duration) {
        counter++;
        currentLog.push(`[${new Date().toLocaleTimeString()}] Attack in progress... ${counter}/${duration}s`);
        setLogs([...currentLog]);
      } else {
        clearInterval(interval);
        currentLog.push(`[${new Date().toLocaleTimeString()}] Cosmic attack finished.`);
        setLogs([...currentLog]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsExecuting(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Cosmic Tool Component</h1>

      {error && <div className="bg-red-800 p-4 rounded mb-4 text-red-100">Error: {error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code (cosmic.py)</h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto h-96 text-sm text-gray-300">
            <code>{sourceCode}</code>
          </pre>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="target"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
              <input
                type="number"
                id="rps"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={rps}
                onChange={(e) => setRps(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
              <input
                type="number"
                id="threads"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value))}
                disabled={isExecuting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
              <select
                id="method"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={isExecuting}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={startExecution}
                disabled={isExecuting}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isExecuting}
                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Execution Logs */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-800 p-4 rounded-lg overflow-auto h-64 text-sm text-gray-300">
              {logs.map((log, index) => (
                <p key={index} className="mb-1">{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolcosmicComponent;
