import React, { useState, useEffect } from 'react';

interface ToolExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolInfectednightComponent: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [params, setParams] = useState<ToolExecutionParams>({
    target: '',
    duration: 0,
    rps: 0,
    threads: 0,
    method: 'SYN',
  });
  const [error, setError] = useState<string | null>(null);

  // Simulate reading the source code file
  useEffect(() => {
    // In a real application, this would be an API call to a backend
    // that reads the file from /home/ubuntu/extracted_tools/Infectednight/infectednight.c
    const simulatedCode = `/*
 * Infectednight Mirai Tool
 * Simulated source code for demonstration purposes.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <target_ip>\\n", argv[0]);
        return 1;
    }

    char *target_ip = argv[1];
    printf("Infectednight attacking target: %s\\n", target_ip);

    // Simulate attack logic
    for (int i = 0; i < 5; i++) {
        printf("Sending packet %d to %s...\\n", i + 1, target_ip);
        sleep(1);
    }

    printf("Attack on %s completed.\\n", target_ip);
    return 0;
}
`;
    setCode(simulatedCode);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: name === 'duration' || name === 'rps' || name === 'threads' ? Number(value) : value,
    }));
  };

  const startExecution = () => {
    setError(null);
    if (!params.target) {
      setError('Target cannot be empty.');
      return;
    }
    setIsRunning(true);
    setLogs(['[INFO] Starting Infectednight execution...']);

    // Simulate execution
    let step = 0;
    const interval = setInterval(() => {
      if (step < params.duration) {
        setLogs((prevLogs) => [...prevLogs, `[EXEC] Attacking ${params.target} with ${params.method} (RPS: ${params.rps}, Threads: ${params.threads}) - Step ${step + 1}/${params.duration}`]);
        step++;
      } else {
        clearInterval(interval);
        setLogs((prevLogs) => [...prevLogs, '[INFO] Infectednight execution finished.']);
        setIsRunning(false);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, '[WARN] Infectednight execution stopped by user.']);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Infectednight Tool Component</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-auto h-96">
            <pre><code className="text-sm text-gray-300">{code}</code></pre>
          </div>
        </div>

        {/* Controls and Logs */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
                <input
                  type="text"
                  id="target"
                  name="target"
                  value={params.target}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  placeholder="e.g., 192.168.1.1"
                  disabled={isRunning}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                  disabled={isRunning}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests/Second):</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  value={params.rps}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                  disabled={isRunning}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="0"
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method Selection:</label>
              <select
                id="method"
                name="method"
                value={params.method}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                disabled={isRunning}
              >
                <option value="SYN">SYN</option>
                <option value="ACK">ACK</option>
                <option value="UDP">UDP</option>
                <option value="HTTP">HTTP</option>
              </select>
            </div>
            <div className="flex justify-between">
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
          </div>

          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-auto h-64">
            {logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-400">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolInfectednightComponent;
