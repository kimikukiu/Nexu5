import React, { useState, useEffect } from 'react';

interface ToolCoronaV4Props {
  // No specific props for now, but can be extended later
}

const ToolCoronaV4Component: React.FC<ToolCoronaV4Props> = () => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [executionInterval, setExecutionInterval] = useState<NodeJS.Timeout | null>(null);

  const cCode = `// Dummy C code for Corona v4
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <target>\\n", argv[0]);
        return 1;
    }
    char *target = argv[1];
    printf("Attacking target: %s\\n", target);
    for (int i = 0; i < 10; i++) {
        printf("Sending packet %d to %s...\\n", i + 1, target);
        sleep(1);
    }
    printf("Attack finished.\\n");
    return 0;
}`; 

  const shCode = `#!/bin/bash

echo "Hello from Corona v4 shell script!"

TARGET=$1
DURATION=$2
RPS=$3
THREADS=$4
METHOD=$5

echo "Target: $TARGET"
echo "Duration: $DURATION"
echo "RPS: $RPS"
echo "Threads: $THREADS"
echo "Method: $METHOD"

for i in $(seq 1 5);
do
  echo "Executing step $i..."
  sleep 1
done

echo "Script finished."
`;

  const startExecution = () => {
    if (!target) {
      setLogs(prev => [...prev, 'ERROR: Target cannot be empty.']);
      return;
    }
    setIsExecuting(true);
    setLogs(['Execution started...']);

    let step = 0;
    const interval = setInterval(() => {
      if (step < duration) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing step ${step + 1} for target ${target} with method ${method}...`]);
        step++;
      } else {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
        stopExecution();
      }
    }, 1000);
    setExecutionInterval(interval);
  };

  const stopExecution = () => {
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
    setIsExecuting(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  useEffect(() => {
    return () => {
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [executionInterval]);

  return (
    <div className="p-6 bg-gray-900 text-emerald-400 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-red-500">Corona v4 Tool</h1>

      {/* Code Viewers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">main.c</h2>
          <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-auto h-64 border border-emerald-600">
            <code>{cCode}</code>
          </pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">script.sh</h2>
          <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-auto h-64 border border-emerald-600">
            <code>{shCode}</code>
          </pre>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6 rounded-md mb-8 border border-red-600">
        <h2 className="text-xl font-semibold mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-emerald-300">Target Input</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., example.com:8080"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-emerald-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-emerald-300">RPS (Requests/Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-emerald-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value) || 0)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-emerald-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
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

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={startExecution}
            disabled={isExecuting}
            className="px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExecuting ? 'Executing...' : 'START'}
          </button>
          <button
            onClick={stopExecution}
            disabled={!isExecuting}
            className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-md border border-emerald-600">
        <h2 className="text-xl font-semibold mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md text-sm overflow-auto h-64 border border-gray-700">
          {logs.map((log, index) => (
            <p key={index} className={log.startsWith('ERROR') ? 'text-red-400' : 'text-emerald-400'}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCoronaV4Component;
