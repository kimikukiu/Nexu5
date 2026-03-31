
import React, { useState, useEffect, useRef } from 'react';

const customScrollbarStyles = `
  /* Custom Scrollbar Styling */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #374151; /* gray-700 */
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #10B981; /* emerald-500 */
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #059669; /* emerald-600 */
  }
`;

interface TsunamiV3Props {
  sourceFilePaths: string[];
}

const ToolTsunamiV3Component: React.FC<TsunamiV3Props> = ({ sourceFilePaths }) => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('UDP');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>(sourceFilePaths[0] || '');
  const [sourceCodeContent, setSourceCodeContent] = useState<string>('// Select a file to view its content');
  const logContainerRef = useRef<HTMLDivElement>(null);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedFile) {
      // In a real application, you would fetch the content of the selected file.
      // For this component, we'll just simulate loading content.
      setSourceCodeContent(`// Content of ${selectedFile}\n// This is a placeholder. In a real scenario, this content would be loaded dynamically from the file system.`);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: 'info' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] [${type.toUpperCase()}] ${message}`]);
  };

  const validateInputs = () => {
    if (!target.trim()) {
      setError('Target cannot be empty.');
      return false;
    }
    if (duration <= 0) {
      setError('Duration must be a positive number.');
      return false;
    }
    if (rps <= 0) {
      setError('RPS must be a positive number.');
      return false;
    }
    if (threads <= 0) {
      setError('Threads must be a positive number.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleStart = () => {
    if (!validateInputs()) {
      addLog(`Validation Error: ${error}`, 'error');
      return;
    }

    setIsRunning(true);
    addLog(`Starting Tsunami v3 attack simulation on ${target} for ${duration} seconds with ${rps} RPS and ${threads} threads using ${method} method.`);
    addLog('Disclaimer: This is a simulation. Actual botnet activity is illegal and unethical.');

    let timeElapsed = 0;
    simulationIntervalRef.current = setInterval(() => {
      timeElapsed += 1;
      if (timeElapsed <= duration) {
        addLog(`Simulation running... Time elapsed: ${timeElapsed}s / ${duration}s. Packets sent: ${timeElapsed * rps}`);
      } else {
        clearInterval(simulationIntervalRef.current!); // Use non-null assertion
        addLog('Attack simulation finished.');
        setIsRunning(false);
      }
    }, 1000);
  };

  const handleStop = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
    }
    setIsRunning(false);
    addLog('Stopping Tsunami v3 attack simulation.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <style>{customScrollbarStyles}</style>
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Tsunami v3 Mirai Tool</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 rounded-lg shadow-lg mb-6">
        <div className="bg-gray-700 px-4 py-2 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-200">Source Code</h2>
          <select
            className="mt-1 block rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            {sourceFilePaths.map((path, index) => (
              <option key={index} value={path}>
                {path.split('/').pop()} {/* Display only the file name */}
              </option>
            ))}
          </select>
        </div>
        <pre className="p-4 text-sm overflow-auto h-96 custom-scrollbar">
          <code>{sourceCodeContent}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Execution Controls</h2>
        {error && (
          <div className="bg-red-900 text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target (IP/Domain)</label>
            <input
              type="text"
              id="target"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., 192.168.1.1 or example.com"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests per second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Attack Method</label>
            <select
              id="method"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="UDP">UDP</option>
              <option value="SYN">SYN</option>
              <option value="ACK">ACK</option>
              <option value="GREIP">GREIP</option>
              <option value="VSE">VSE</option>
              <option value="DNS">DNS</option>
              <option value="UDP_PLAIN">UDP_PLAIN</option>
              <option value="STOMP">STOMP</option>
              <option value="XMAS">XMAS</option>
              <option value="GREETH">GREETH</option>
              <option value="STD">STD</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`px-6 py-2 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            {isRunning ? 'Running...' : 'Start Attack'}
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`px-6 py-2 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            Stop Attack
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Execution Logs</h2>
        <div ref={logContainerRef} className="bg-black text-green-400 p-3 rounded-md h-64 overflow-auto custom-scrollbar">
          {logs.map((log, index) => (
            <p key={index} className="text-sm">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolTsunamiV3Component;
