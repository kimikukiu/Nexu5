import React, { useState, useEffect, useRef } from 'react';

interface ToolKarutoVersion1_0ComponentProps {
  toolPath: string;
}

const ToolKarutoVersion1_0Component: React.FC<ToolKarutoVersion1_0ComponentProps> = ({ toolPath }) => {
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSourceCode = async () => {
      const files = ['main.py', 'script.sh']; // These are the files found in the previous step
      const codeMap: Record<string, string> = {};

      for (const file of files) {
        try {
          let content = '';
          if (file === 'main.py') {
            content = `print("Hello from Python!")\nimport time\ntime.sleep(1)\nprint("Done.")`;
          } else if (file === 'script.sh') {
            content = `#!/bin/bash\necho "Hello from Bash!"\nsleep 1\necho "Done."`;
          }
          codeMap[file] = content;
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
        }
      }
      setSourceCode(codeMap);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };
    fetchSourceCode();
  }, [toolPath]);

  const executeScript = async (scriptPath: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution of ${scriptPath}...`]);
    // In a real scenario, this would be an API call to a backend that executes the script
    // For simulation, we'll just log the script content line by line
    const scriptContent = sourceCode[scriptPath];
    if (scriptContent) {
      const lines = scriptContent.split('\n');
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < lines.length) {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${lines[i]}`]);
          i++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution of ${scriptPath} finished.`]);
        }
      }, 500);
    } else {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Error: No script content found for ${scriptPath}.`]);
      setIsRunning(false);
    }
  };

  const handleStart = () => {
    if (selectedFile) {
      setIsRunning(true);
      setLogs([]);
      executeScript(selectedFile);
    } else {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Please select a file to execute.`]);
    }
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">KarutoVersion1.0 Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="mb-4">
            <select
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
              value={selectedFile || ''}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              {Object.keys(sourceCode).map((fileName) => (
                <option key={fileName} value={fileName}>
                  {fileName}
                </option>
              ))}
            </select>
          </div>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-200">
            <code>{selectedFile ? sourceCode[selectedFile] : 'Select a file to view code.'}</code>
          </pre>
        </div>

        {/* Controls and Logs */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm text-gray-200">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolKarutoVersion1_0Component;
