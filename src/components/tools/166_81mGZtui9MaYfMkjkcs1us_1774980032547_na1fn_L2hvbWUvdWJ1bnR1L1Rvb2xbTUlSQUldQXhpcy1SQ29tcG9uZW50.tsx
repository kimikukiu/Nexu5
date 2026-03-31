
import React, { useState, useEffect } from 'react';

interface ToolAxisRComponentProps {
  toolName: string;
}

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

const ToolMIRAI_Axis_RComponent: React.FC<ToolAxisRComponentProps> = ({ toolName }) => {
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate reading source code files
    const fetchCodeFiles = async () => {
      // In a real scenario, you would read these files from the file system
      // For this simulation, we'll use the dummy files created earlier.
      const pythonCode = `print('Python code simulation')`;
      const shellCode = `echo 'Shell script simulation'`;

      const files: CodeFile[] = [
        { name: 'main.py', language: 'python', content: pythonCode },
        { name: 'script.sh', language: 'bash', content: shellCode },
      ];
      setCodeFiles(files);
      if (files.length > 0) {
        setSelectedFile(files[0].name);
      }
    };
    fetchCodeFiles();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution...`]);
    // Simulate execution
    const interval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating execution for ${targetInput || 'default target'}...`]);
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // In a real scenario, you would send a signal to stop the execution process
  };

  const currentFileContent = codeFiles.find(file => file.name === selectedFile)?.content || '';

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} - Mirai Tool Component</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Section */}
        <div>
          <h2 className="text-2xl text-emerald-300 mb-4">Source Code</h2>
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
            <div className="flex border-b border-gray-700 mb-4">
              {codeFiles.map(file => (
                <button
                  key={file.name}
                  className={`px-4 py-2 -mb-px border-b-2 ${selectedFile === file.name ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setSelectedFile(file.name)}
                >
                  {file.name}
                </button>
              ))}
            </div>
            <pre className="overflow-auto text-sm h-96 bg-gray-900 p-3 rounded"><code className={`language-${codeFiles.find(file => file.name === selectedFile)?.language}`}>{currentFileContent}</code></pre>
          </div>
        </div>

        {/* Controls and Logs Section */}
        <div>
          <h2 className="text-2xl text-emerald-300 mb-4">Execution Controls</h2>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="mb-4">
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com:80"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="HEAD">HEAD</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-2xl text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-64 overflow-y-auto">
            {executionLogs.map((log, index) => (
              <p key={index} className="text-sm text-gray-300">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolMIRAI_Axis_RComponent;
