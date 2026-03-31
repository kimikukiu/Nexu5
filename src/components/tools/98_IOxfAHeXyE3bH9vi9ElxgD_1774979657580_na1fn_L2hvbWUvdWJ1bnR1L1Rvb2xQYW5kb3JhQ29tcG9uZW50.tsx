import React, { useState, useEffect } from 'react';

interface ExecutionOptions {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const ToolPandoraComponent: React.FC = () => {
  const [sourceFiles, setSourceFiles] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [options, setOptions] = useState<ExecutionOptions>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'TCP',
  });

  useEffect(() => {
    const fetchSourceFiles = async () => {
      // In a real scenario, you would fetch these from the backend/filesystem
      const files: Record<string, string> = {
        'pandora.c': `#include <stdio.h>\n\nint main() {\n    printf("Hello from Pandora C code!\n");\n    return 0;\n}`,
        'pandora.py': `import sys\n\ndef main():\n    print("Hello from Pandora Python code!")\n    if len(sys.argv) > 1:\n        print(f"Arguments: {sys.argv[1:]}")\n\nif __name__ == "__main__":\n    main()`,
        'run.sh': `#!/bin/bash\necho "Running Pandora..."`,
      };
      setSourceFiles(files);
      setActiveFile(Object.keys(files)[0]);
    };

    fetchSourceFiles();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setExecutionLogs([`Starting Pandora with method ${options.method}...`]);
    // Simulate execution
    const interval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[LOG] Attacking ${options.target}...`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setExecutionLogs(prev => [...prev, 'Pandora attack finished.']);
    }, options.duration * 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, 'Pandora attack stopped by user.']);
  };

  return (
    <div className="bg-gray-900 text-white p-4 font-mono">
      <h1 className="text-2xl text-emerald-400 mb-4">Pandora Attack Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl text-emerald-300 mb-2">Source Code</h2>
          <div className="bg-gray-800 p-2 rounded">
            <div className="flex border-b border-gray-700">
              {Object.keys(sourceFiles).map(file => (
                <button
                  key={file}
                  className={`px-4 py-2 text-sm ${activeFile === file ? 'bg-emerald-500 text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveFile(file)}
                >
                  {file}
                </button>
              ))}
            </div>
            <pre className="p-4 overflow-auto h-64"><code>{sourceFiles[activeFile]}</code></pre>
          </div>
        </div>

        <div>
          <h2 className="text-xl text-emerald-300 mb-2">Execution Controls</h2>
          <div className="bg-gray-800 p-4 rounded space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Target</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-emerald-500"
                value={options.target}
                onChange={e => setOptions({ ...options, target: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400">Duration (s)</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-emerald-500"
                  value={options.duration}
                  onChange={e => setOptions({ ...options, duration: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">RPS</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-emerald-500"
                  value={options.rps}
                  onChange={e => setOptions({ ...options, rps: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400">Threads</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-emerald-500"
                  value={options.threads}
                  onChange={e => setOptions({ ...options, threads: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Method</label>
                <select
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-emerald-500"
                  value={options.method}
                  onChange={e => setOptions({ ...options, method: e.target.value })}
                >
                  <option>TCP</option>
                  <option>UDP</option>
                  <option>HTTP</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className={`w-full py-2 rounded ${isRunning ? 'bg-gray-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                onClick={handleStart}
                disabled={isRunning}
              >
                START
              </button>
              <button
                className={`w-full py-2 rounded ${!isRunning ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={handleStop}
                disabled={!isRunning}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl text-emerald-300 mb-2">Execution Logs</h2>
        <div className="bg-gray-800 p-4 rounded h-48 overflow-auto">
          {executionLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolPandoraComponent;
