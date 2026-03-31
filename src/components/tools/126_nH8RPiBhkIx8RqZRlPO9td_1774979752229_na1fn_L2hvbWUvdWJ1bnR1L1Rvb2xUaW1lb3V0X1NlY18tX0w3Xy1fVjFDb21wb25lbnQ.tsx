
import React, { useState, useEffect } from 'react';

interface ToolProps {
  toolName: string;
}

interface ExecutionState {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
  isRunning: boolean;
  logs: string[];
  sourceCode: { [key: string]: string };
  error: string | null;
}

const ToolTimeout_Sec_-_L7_-_V1Component: React.FC<ToolProps> = ({ toolName }) => {
  const [state, setState] = useState<ExecutionState>({
    targetInput: '',
    duration: 10,
    rps: 100,
    threads: 10,
    method: 'GET',
    isRunning: false,
    logs: [],
    sourceCode: {},
    error: null,
  });

  const toolDirectory = '/home/ubuntu/extracted_tools/Timeout_Sec_-_L7_-_V1/';

  useEffect(() => {
    const loadSourceCode = async () => {
      try {
        const files = ['main.c', 'script.go', 'logic.py', 'run.sh'];
        const codePromises = files.map(async (file) => {
          // In a real scenario, this would involve an API call to read the file content
          // For this simulation, we'll use dummy content or a direct file read if possible
          // For now, we'll just simulate reading by setting a placeholder.
          return { [file]: `// Content of ${file}\nconsole.log('Hello from ${file}');` };
        });
        const loadedCode = await Promise.all(codePromises);
        setState((prevState) => ({
          ...prevState,
          sourceCode: Object.assign({}, ...loadedCode),
          error: null,
        }));
      } catch (err: any) {
        setState((prevState) => ({
          ...prevState,
          error: `Failed to load source code: ${err.message}`,
        }));
      }
    };
    loadSourceCode();
  }, []);

  const handleStart = () => {
    setState((prevState) => ({ ...prevState, isRunning: true, logs: ['Execution started...'] }));
    // Simulate execution logic
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isRunning: false,
        logs: [...prevState.logs, 'Execution finished successfully.'],
      }));
    }, 5000);
  };

  const handleStop = () => {
    setState((prevState) => ({ ...prevState, isRunning: false, logs: [...prevState.logs, 'Execution stopped.'] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">{toolName} Component</h1>

      {state.error && (
        <div className="bg-red-700 p-4 rounded-md mb-6">
          <p className="text-red-100">Error: {state.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Code Viewer */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Source Code</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(state.sourceCode).map(([filename, code]) => (
              <div key={filename} className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-emerald-200 mb-2">{filename}</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-200">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Controls & Logs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm font-bold mb-2">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                name="targetInput"
                value={state.targetInput}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                placeholder="e.g., http://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Duration (s):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={state.duration}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="rps" className="block text-gray-300 text-sm font-bold mb-2">RPS:</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  value={state.rps}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="threads" className="block text-gray-300 text-sm font-bold mb-2">Threads:</label>
                <input
                  type="number"
                  id="threads"
                  name="threads"
                  value={state.threads}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="method" className="block text-gray-300 text-sm font-bold mb-2">Method:</label>
                <select
                  id="method"
                  name="method"
                  value={state.method}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleStart}
              disabled={state.isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              START
            </button>
            <button
              onClick={handleStop}
              disabled={!state.isRunning}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
          <div className="bg-gray-700 p-4 rounded-md h-48 overflow-y-auto">
            {state.logs.map((log, index) => (
              <p key={index} className="text-sm text-gray-200">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTimeout_Sec_-_L7_-_V1Component;
