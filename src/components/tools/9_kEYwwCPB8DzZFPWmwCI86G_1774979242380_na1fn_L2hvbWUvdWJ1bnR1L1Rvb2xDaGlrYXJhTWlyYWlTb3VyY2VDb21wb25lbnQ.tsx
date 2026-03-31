
import React, { useState, useEffect } from 'react';

interface ToolChikaraMiraiSourceComponentProps {
  toolName: string;
  sourceCode: {
    fileName: string;
    code: string;
  }[];
}

const ToolChikaraMiraiSourceComponent: React.FC<ToolChikaraMiraiSourceComponentProps> = ({ toolName, sourceCode }) => {
  const [target, setTarget] = useState<string>('127.0.0.1');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>(sourceCode[0]?.fileName || 'Execution');

  useEffect(() => {
    let logInterval: NodeJS.Timeout;
    if (isRunning) {
      logInterval = setInterval(() => {
        const newLog = `[${new Date().toLocaleTimeString()}] Executing ${method} on ${target} with ${rps} RPS and ${threads} threads.`;
        setLogs((prevLogs) => [...prevLogs, newLog]);
      }, 1000);
    } else {
      clearInterval(logInterval);
    }
    return () => clearInterval(logInterval);
  }, [isRunning, target, duration, rps, threads, method]);

  const startExecution = () => {
    setLogs([]);
    setIsRunning(true);
    // Simulate execution stopping after 'duration' seconds
    setTimeout(() => {
      setIsRunning(false);
      setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">{toolName}</h1>

      <div className="flex space-x-2 mb-4 border-b border-gray-700">
        {sourceCode.map((file) => (
          <button
            key={file.fileName}
            onClick={() => setActiveTab(file.fileName)}
            className={`py-2 px-4 rounded-t-lg focus:outline-none ${activeTab === file.fileName ? 'bg-gray-700 text-emerald-400' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            {file.fileName}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('Execution')}
          className={`py-2 px-4 rounded-t-lg focus:outline-none ${activeTab === 'Execution' ? 'bg-gray-700 text-emerald-400' : 'text-gray-400 hover:bg-gray-800'}`}
        >
          Execution
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-b-lg rounded-tr-lg shadow-lg">
        {activeTab !== 'Execution' && sourceCode.find(file => file.fileName === activeTab) && (
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto max-h-96 text-sm text-gray-200">
            <code>{sourceCode.find(file => file.fileName === activeTab)?.code}</code>
          </pre>
        )}

        {activeTab === 'Execution' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="target" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
                <input
                  type="text"
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  placeholder="e.g., 127.0.0.1 or example.com"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (seconds):</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS (Requests per second):</label>
                <input
                  type="number"
                  id="rps"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="UDP">UDP</option>
                  <option value="TCP">TCP</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={startExecution}
                disabled={isRunning}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                START
              </button>
              <button
                onClick={stopExecution}
                disabled={!isRunning}
                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                STOP
              </button>
            </div>

            <h2 className="text-xl font-bold mb-2 text-emerald-400">Execution Logs:</h2>
            <div className="bg-gray-900 p-4 rounded-md overflow-auto max-h-64 text-sm text-gray-200">
              {logs.length === 0 && <p className="text-gray-500">No logs yet. Start execution to see output.</p>}
              {logs.map((log, index) => (
                <p key={index} className="mb-1">{log}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolChikaraMiraiSourceComponent;
