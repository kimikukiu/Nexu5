import React, { useState, useEffect } from 'react';

interface ToolowoProps {
  toolName: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolowoComponent: React.FC<ToolowoProps> = ({ toolName }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [input, setInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [rps, setRps] = useState<number>(0);
  const [threads, setThreads] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const codeContent = `import time

def main():
    print("Executing owo.py...")
    time.sleep(1)
    print("owo.py execution complete.")

if __name__ == "__main__":
    main()
`;
    const file: CodeFile = {
      name: "owo.py",
      language: "python",
      content: codeContent,
    };
    setCodeFiles([file]);
    setSelectedFile(file);
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setLogs([]);
    // Simulate execution or call actual execution logic
    const simulationInterval = setInterval(() => {
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulating execution...`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(simulationInterval);
      setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Simulation complete.`]);
      setIsExecuting(false);
    }, 5000);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Mirai Tool: {toolName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="flex space-x-2 mb-4">
            {codeFiles.map(file => (
              <button
                key={file.name}
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedFile?.name === file.name ? 'bg-emerald-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setSelectedFile(file)}
              >
                {file.name}
              </button>
            ))}
          </div>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-96 text-sm">
            <code>{selectedFile ? selectedFile.content : 'Select a file to view code.'}</code>
          </pre>
        </div>

        {/* Controls and Logs Section */}
        <div className="flex flex-col space-y-6">
          {/* Execution Controls */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="input" className="block text-sm font-medium text-gray-300">Target Input</label>
                <input
                  type="text"
                  id="input"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                <input
                  type="number"
                  id="duration"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                <input
                  type="number"
                  id="rps"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                <input
                  type="number"
                  id="threads"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                <select
                  id="method"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="">Select Method</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="flex-1 py-2 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                onClick={handleStartExecution}
                disabled={isExecuting}
              >
                START
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={handleStopExecution}
                disabled={!isExecuting}
              >
                STOP
              </button>
            </div>
          </div>

          {/* Real-time Logs */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4">Real-time Logs</h2>
            <div className="bg-gray-900 p-4 rounded-md overflow-auto h-64 text-sm font-mono">
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

export default ToolowoComponent;
