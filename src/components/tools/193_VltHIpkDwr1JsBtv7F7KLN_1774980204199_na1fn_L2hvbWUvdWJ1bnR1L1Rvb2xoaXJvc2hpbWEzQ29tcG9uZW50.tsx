import React, { useState, useEffect } from 'react';

interface Toolhiroshima3ComponentProps {
  // Define any props if needed
}

const Toolhiroshima3Component: React.FC<Toolhiroshima3ComponentProps> = () => {
  const [codeFiles, setCodeFiles] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const readCodeFiles = async () => {
      const filesToRead = [
        '/home/ubuntu/extracted_tools/hiroshima3/main.c',
        '/home/ubuntu/extracted_tools/hiroshima3/main.go',
        '/home/ubuntu/extracted_tools/hiroshima3/script.py',
        '/home/ubuntu/extracted_tools/hiroshima3/run.sh',
      ];
      const newCodeFiles: Record<string, string> = {};
      let firstFileContent = '';
      let firstFileName = '';

      for (const filePath of filesToRead) {
        try {
          // In a real React app, this would be an API call to a backend that reads the file
          // For this sandboxed environment, we'll simulate reading the content.
          // The actual content was obtained in the previous phase.
          let content = '';
          const fileName = filePath.split('/').pop() || filePath;

          switch (fileName) {
            case 'main.c':
              content = 'int main() { return 0; }';
              break;
            case 'main.go':
              content = 'package main\nfunc main() {}';
              break;
            case 'script.py':
              content = 'print("Hello from Python")';
              break;
            case 'run.sh':
              content = '#!/bin/bash\necho "Hello from Bash"';
              break;
            default:
              content = `Could not read file: ${fileName}`;
          }

          newCodeFiles[fileName] = content;
          if (!firstFileName) {
            firstFileName = fileName;
            firstFileContent = content;
          }
        } catch (err) {
          console.error(`Failed to read file ${filePath}:`, err);
          setError(`Failed to load code from ${filePath}.`);
        }
      }
      setCodeFiles(newCodeFiles);
      if (firstFileName) {
        setSelectedFile(firstFileName);
      }
    };

    readCodeFiles();
  }, []);

  // Function to simulate execution
  const executeTool = () => {
    setError(null);
    if (!targetInput) {
      setError('Target input cannot be empty.');
      return;
    }

    setIsRunning(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with target: ${targetInput}, duration: ${duration}s, RPS: ${rps}, threads: ${threads}, method: ${method}`]);

    let counter = 0;
    const maxLogs = duration * 2; // Simulate 2 log lines per second for the duration

    const interval = setInterval(() => {
      if (counter < maxLogs) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (Iteration ${counter + 1})`]);
        counter++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      }
    }, 500); // Log every 0.5 seconds

    // Stop after duration
    setTimeout(() => {
      if (isRunning) { // Only stop if not already stopped manually
        clearInterval(interval);
        setIsRunning(false);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped automatically after ${duration} seconds.`]);
      }
    }, duration * 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution manually.`]);
    // In a real scenario, this would send a signal to stop the running process
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">hiroshima3 Mirai Tool</h1>

      {error && (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Code Viewer Section */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {Object.keys(codeFiles).map(fileName => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium ${selectedFile === fileName ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {fileName}
              </button>
            ))}
          </div>
          <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-auto h-96 whitespace-pre-wrap">
            <code>
              {selectedFile ? codeFiles[selectedFile] : 'Select a file to view its content.'}
            </code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="lg:col-span-1 flex flex-col space-y-8">
          {/* Controls */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
                <input
                  type="text"
                  id="targetInput"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g., example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                  <input
                    type="number"
                    id="duration"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                  <input
                    type="number"
                    id="rps"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    value={rps}
                    onChange={(e) => setRps(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                  <input
                    type="number"
                    id="threads"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    value={threads}
                    onChange={(e) => setThreads(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                  <select
                    id="method"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
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
              <div className="flex space-x-4">
                <button
                  onClick={executeTool}
                  disabled={isRunning}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold ${isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                >
                  START
                </button>
                <button
                  onClick={stopExecution}
                  disabled={!isRunning}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold ${!isRunning ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                >
                  STOP
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Logs */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Real-time Logs</h2>
            <div className="bg-gray-900 p-4 rounded-md text-sm overflow-auto h-64">
              {logs.map((log, index) => (
                <p key={index} className="text-gray-300">{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolhiroshima3Component;
