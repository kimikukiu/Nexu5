import React, { useState, useEffect, useRef } from 'react';

interface ToolOkaneComponentProps {
  // Define any props if needed
}

const pythonSourceCode = `import time\n\ndef run_okane_tool(input_data: str, duration: int, rps: int, threads: int):\n    print(f"Starting Okane tool with input: {input_data}")\n    print(f"Duration: {duration}s, RPS: {rps}, Threads: {threads}")\n    start_time = time.time()\n    logs = []\n    for i in range(duration * rps):\n        log_entry = f"[{time.time() - start_time:.2f}s] Processing request {i+1}/{duration * rps} with thread {i % threads}\\n"\n        logs.append(log_entry)\n        time.sleep(1/rps)\n    print("Okane tool finished.")\n    return "".join(logs)\n`;

const shellSourceCode = `#!/bin/bash\n\nINPUT_DATA=$1\nDURATION=$2\nRPS=$3\nTHREADS=$4\n\necho "Starting Okane tool with input: $INPUT_DATA"\necho "Duration: ${DURATION}s, RPS: ${RPS}, Threads: ${THREADS}"\n\nSTART_TIME=$(date +%s)\n\nfor ((i=0; i<DURATION*RPS; i++)); do\n    CURRENT_TIME=$(date +%s)\n    ELAPSED=$((CURRENT_TIME - START_TIME))\n    echo "[${ELAPSED}s] Processing request $((i+1))/$((DURATION * RPS)) with thread $((i % THREADS))"\n    sleep $(echo "1 / $RPS" | bc -l)\ndone\n\necho "Okane tool finished."\n`;

const ToolOkaneComponent: React.FC<ToolOkaneComponentProps> = () => {
  const [input, setInput] = useState<string>("");
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(1);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<"python" | "shell">("python");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedCode, setSelectedCode] = useState<"python" | "shell">("python");
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);



  const handleStart = () => {
    if (isRunning) return;

    setIsRunning(true);
    setLogs([]);

    const startTime = Date.now();
    let requestCount = 0;
    const totalRequests = duration * rps;

    const initialLog = `[${new Date().toLocaleTimeString()}] Starting execution with input: ${input}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}\n`;
    setLogs(prevLogs => [...prevLogs, initialLog]);

    if (duration <= 0 || rps <= 0 || threads <= 0) {
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] ERROR: Duration, RPS, and Threads must be positive numbers. Execution aborted.\n`]);
      setIsRunning(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (requestCount < totalRequests) {
        requestCount++;
        const elapsedTime = (Date.now() - startTime) / 1000;
        let logEntry = "";

        if (method === "python") {
          logEntry = `[${elapsedTime.toFixed(2)}s] Processing request ${requestCount}/${totalRequests} with thread ${requestCount % threads}\n`;
        } else if (method === "shell") {
          logEntry = `[${Math.floor(elapsedTime)}s] Processing request ${requestCount}/${totalRequests} with thread ${requestCount % threads}\n`;
        }
        setLogs(prevLogs => [...prevLogs, logEntry]);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.\n`]);
      }
    }, 1000 / rps);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.\n`]);
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Okane Tool Interface</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-300">Target Input</label>
              <input
                type="text"
                id="input"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  value={rps}
                  onChange={(e) => setRps(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  value={threads}
                  onChange={(e) => setThreads(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  value={method}
                  onChange={(e) => setMethod(e.target.value as "python" | "shell")}
                >
                  <option value="python">Python</option>
                  <option value="shell">Shell</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 h-80 overflow-y-scroll rounded-md p-4 text-sm font-mono text-gray-200">
            {logs.map((log, index) => (
              <pre key={index} className="whitespace-pre-wrap">{log}</pre>
            ))}
          </div>
        </div>
      </div>

      {/* Code Viewer Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
        <div className="mb-4">
          <button
            onClick={() => setSelectedCode("python")}
            className={`py-2 px-4 rounded-l-md ${selectedCode === "python" ? "bg-emerald-600" : "bg-gray-700"} hover:bg-emerald-700 text-white font-semibold`}
          >
            Python (okane.py)
          </button>
          <button
            onClick={() => setSelectedCode("shell")}
            className={`py-2 px-4 rounded-r-md ${selectedCode === "shell" ? "bg-emerald-600" : "bg-gray-700"} hover:bg-emerald-700 text-white font-semibold`}
          >
            Shell (okane.sh)
          </button>
        </div>
        <div className="bg-gray-900 h-96 overflow-y-scroll rounded-md p-4 text-sm font-mono text-gray-200">
          <pre>{selectedCode === "python" ? pythonSourceCode : shellSourceCode}</pre>
        </div>
      </div>
    </div>
  );
};

export default ToolOkaneComponent;
