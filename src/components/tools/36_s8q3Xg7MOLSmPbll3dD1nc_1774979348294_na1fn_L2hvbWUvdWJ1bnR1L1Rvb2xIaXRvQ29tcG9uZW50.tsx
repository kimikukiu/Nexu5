import React, { useState, useEffect, useRef } from 'react';

interface ToolHitoProps {
  // Define any props that ToolHitoComponent might receive
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolHitoComponent: React.FC<ToolHitoProps> = () => {
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    targetInput: 'default_target',
    duration: 5,
    rps: 10,
    threads: 1,
    method: 'GET',
  });
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logCounterRef = useRef<number>(0);

  const hitoPythonCode = `import time\nimport sys\n\ndef main():\n    print(\"Hito tool started (Python)\")\n    target_input = sys.argv[1] if len(sys.argv) > 1 else \"default_target\"\n    duration = int(sys.argv[2]) if len(sys.argv) > 2 else 5\n    rps = int(sys.argv[3]) if len(sys.argv) > 3 else 10\n    threads = int(sys.argv[4]) if len(sys.argv) > 4 else 1\n    method = sys.argv[5] if len(sys.argv) > 5 else \"GET\"\n\n    print(f\"Target Input: {target_input}\")\n    print(f\"Duration: {duration}s\")\n    print(f\"RPS: {rps}\")\n    print(f\"Threads: {threads}\")\n    print(f\"Method: {method}\")\n\n    start_time = time.time()\n    logs = []\n    request_count = 0\n\n    while (time.time() - start_time) < duration:\n        # Simulate requests\n        for _ in range(rps * threads):\n            log_entry = f\"[{time.strftime('%H:%M:%S')}] Request {request_count + 1} to {target_input} with method {method}\"\n            logs.append(log_entry)\n            print(log_entry)\n            request_count += 1\n        time.sleep(1) # Simulate 1 second interval\n\n    print(\"Hito tool finished (Python)\")\n\nif __name__ == \"__main__\":\n    main()\n`;

  useEffect(() => {
    setCodeSnippet(hitoPythonCode);
  }, []);

  const executeTool = async () => {
    setIsRunning(true);
    setExecutionLogs([]);
    logCounterRef.current = 0;

    const { targetInput, duration, rps, threads, method } = executionParams;

    setExecutionLogs((prevLogs) => [
      ...prevLogs,
      'Hito tool started (Python)',
      `Target Input: ${targetInput}`,
      `Duration: ${duration}s`,
      `RPS: ${rps}`,
      `Threads: ${threads}`,
      `Method: ${method}`,
    ]);

    let currentRequestCount = 0;
    const totalRequestsPerSecond = rps * threads;
    const totalRequests = totalRequestsPerSecond * duration;

    intervalRef.current = setInterval(() => {
      if (logCounterRef.current < duration) {
        const currentTime = new Date().toLocaleTimeString();
        for (let i = 0; i < totalRequestsPerSecond; i++) {
          currentRequestCount++;
          setExecutionLogs((prevLogs) => [
            ...prevLogs,
            `[${currentTime}] Request ${currentRequestCount} to ${targetInput} with method ${method}`,
          ]);
        }
        logCounterRef.current++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setExecutionLogs((prevLogs) => [
          ...prevLogs,
          'Hito tool finished (Python)',
          `[${new Date().toLocaleTimeString()}] Simulation finished.`,
        ]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setExecutionLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleTimeString()}] Execution stopped by user.`,
    ]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 font-sans">
      <h1 className="text-3xl font-extrabold text-emerald-400 mb-6 border-b-2 border-emerald-600 pb-2">
        Mirai Tool: Hito
      </h1>

      <div className="mb-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Source Code</h2>
        <pre className="bg-gray-700 p-5 rounded-md overflow-auto max-h-80 text-sm leading-relaxed border border-gray-600">
          <code className="language-python text-gray-100">{
            codeSnippet.split('\n').map((line, index) => (
              <div key={index} className="hover:bg-gray-600 transition-colors duration-200">
                <span className="text-gray-400 mr-3 w-6 inline-block text-right select-none">{index + 1}</span>
                {line}
              </div>
            ))
          }</code>
        </pre>
      </div>

      <div className="mb-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300 mb-1">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
              value={executionParams.targetInput}
              onChange={(e) => setExecutionParams({ ...executionParams, targetInput: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (s)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
              value={executionParams.duration}
              onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) })}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
              value={executionParams.rps}
              onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) })}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
              value={executionParams.threads}
              onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) })}
              min="1"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2"
              value={executionParams.method}
              onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })}
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
            onClick={executeTool}
            disabled={isRunning}
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200 shadow-md"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-colors duration-200 shadow-md"
          >
            STOP
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-700 p-5 rounded-md overflow-auto max-h-80 text-sm font-mono border border-gray-600">
          {executionLogs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Click START to begin execution.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="text-gray-200 whitespace-pre-wrap">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHitoComponent;
