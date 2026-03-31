
import React, { useState, useEffect } from 'react';

interface ToolPlexv4ComponentProps {}

const ToolPlexv4Component: React.FC<ToolPlexv4ComponentProps> = () => {
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(4);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [cCode, setCCode] = useState<string>('');
  const [pythonCode, setPythonCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        // In a real scenario, you would fetch these files from a server or bundle them.
        // For this simulation, we'll use placeholder content.
        const cCodeContent = `
#include <stdio.h>

int main() {
    printf("Hello from Plex v4 C code!\n");
    return 0;
}
`;
        const pythonCodeContent = `
import time

def run_plex_v4_simulation(input_data, duration, rps, threads, method):
    print(f"Starting Plex v4 simulation with input: {input_data}")
    print(f"Duration: {duration}s, RPS: {rps}, Threads: {threads}, Method: {method}")
    for i in range(5):
        time.sleep(1)
        print(f"Simulation running... {i+1}/5 seconds")
    print("Plex v4 simulation finished.")

if __name__ == "__main__":
    run_plex_v4_simulation("default_input", 10, 100, 4, "GET")
`;
        setCCode(cCodeContent);
        setPythonCode(pythonCodeContent);
      } catch (err) {
        setError('Failed to load source code.');
        console.error(err);
      }
    };
    fetchCode();
  }, []);

  const startExecution = () => {
    setIsRunning(true);
    setLogs(['[INFO] Starting Plex v4 execution simulation...']);
    setError(null);

    let simulationStep = 0;
    const interval = setInterval(() => {
      simulationStep++;
      if (simulationStep <= duration) {
        setLogs((prevLogs) => [
          ...prevLogs,
          `[SIM] Executing step ${simulationStep}/${duration} - RPS: ${rps}, Threads: ${threads}, Method: ${method}`,
        ]);
      } else {
        clearInterval(interval);
        setLogs((prevLogs) => [...prevLogs, '[INFO] Plex v4 execution simulation finished.']);
        setIsRunning(false);
      }
    }, 1000);

    // In a real application, you would send these parameters to a backend service
    // that actually executes the Plex v4 tool and streams logs back.
    console.log({
      targetInput,
      duration,
      rps,
      threads,
      method,
    });
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, '[WARN] Plex v4 execution simulation stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Plex v4 Tool Component</h1>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-6">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-200 mb-2">plex.c</h3>
              <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-64 border border-gray-700">
                <code>{cCode || 'Loading C code...'}
                </code>
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-200 mb-2">plex.py</h3>
              <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-64 border border-gray-700">
                <code>{pythonCode || 'Loading Python code...'}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Controls and Logs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500"
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
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={startExecution}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={stopExecution}
              disabled={!isRunning}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md text-sm overflow-auto max-h-64 border border-gray-700">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Start execution to see output.</p>
            ) : (
              logs.map((log, index) => (
                <p key={index} className="text-gray-300 whitespace-pre-wrap">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPlexv4Component;
