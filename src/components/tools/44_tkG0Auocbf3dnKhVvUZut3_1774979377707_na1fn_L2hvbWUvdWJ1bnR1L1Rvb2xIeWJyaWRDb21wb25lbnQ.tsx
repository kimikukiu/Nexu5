import React, { useState, useEffect } from 'react';

interface SourceCodeFile {
  path: string;
  content: string;
  language: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface ToolHybridComponentProps {
  toolName: string;
}

const ToolHybridComponent: React.FC<ToolHybridComponentProps> = ({ toolName }) => {
  const [sourceCodeFiles, setSourceCodeFiles] = useState<SourceCodeFile[]>([]);
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    targetInput: '',
    duration: 0,
    rps: 0,
    threads: 0,
    method: '',
  });
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setExecutionLogs([]); // Clear logs when toolName changes
    // This is where code parsing and loading would happen
    const loadSourceCode = async () => {
      const filesToLoad = [
        '/home/ubuntu/extracted_tools/Hybrid/hybrid.c',
        '/home/ubuntu/extracted_tools/Hybrid/hybrid.go',
        '/home/ubuntu/extracted_tools/Hybrid/hybrid.py',
        '/home/ubuntu/extracted_tools/Hybrid/hybrid.sh',
      ];

      const loadedFiles: SourceCodeFile[] = [];
      for (const filePath of filesToLoad) {
        try {
          // In a real application, this would be an API call to read file content
          // For this simulation, we'll use placeholder content or a direct read if possible.
          // Since direct file system access isn't available in the browser, we'll simulate it.
          const fileName = filePath.split('/').pop();
          let content = `Content of ${fileName} (simulated)`;
          let language = 'plaintext';

          if (fileName?.endsWith('.c')) { content = `/* Dummy C code for Hybrid tool */\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Hybrid C!\\n\");\n    return 0;\n}`; language = 'c'; }
          else if (fileName?.endsWith('.go')) { content = `/* Dummy Go code for Hybrid tool */\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from Hybrid Go!\")\n}`; language = 'go'; }
          else if (fileName?.endsWith('.py')) { content = `# Dummy Python code for Hybrid tool\n\ndef main():\n    print(\"Hello from Hybrid Python!\")\n\nif __name__ == \"__main__\":\n    main()`; language = 'python'; }
          else if (fileName?.endsWith('.sh')) { content = `#!/bin/bash\n# Dummy shell script for Hybrid tool\n\necho \"Hello from Hybrid Shell!\"`; language = 'shell'; }

          loadedFiles.push({ path: filePath, content, language });
        } catch (error) {
          console.error(`Failed to load file ${filePath}:`, error);
        }
      }
      setSourceCodeFiles(loadedFiles);
    };

    loadSourceCode();
  }, [toolName]);

  const handleStartExecution = () => {
    setIsRunning(true);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting execution with params: Target: ${executionParams.targetInput}, Duration: ${executionParams.duration}s, RPS: ${executionParams.rps}, Threads: ${executionParams.threads}, Method: ${executionParams.method}`]);
    // Simulate execution based on duration
    const simulationDuration = executionParams.duration > 0 ? executionParams.duration * 1000 : 5000; // Default to 5 seconds if duration is 0
    const interval = setInterval(() => {
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing... (RPS: ${executionParams.rps})`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution finished.`]);
      setIsRunning(false);
    }, simulationDuration);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stopping execution...`]);
    // Logic to stop actual execution would go here
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-400 mb-4">{toolName} Tool Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Source Code Viewer */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Source Code</h2>
          {sourceCodeFiles.map((file, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-medium text-gray-200">{file.path.split('/').pop()} ({file.language})</h3>
              <pre className="bg-gray-700 p-2 rounded text-sm overflow-auto max-h-48">
                <code>{file.content}</code>
              </pre>
            </div>
          ))}
        </div>

        {/* Execution Controls */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Controls</h2>
          <div className="space-y-2">
            <div>
              <label htmlFor="targetInput" className="block text-gray-300 text-sm">Target Input:</label>
              <input
                type="text"
                id="targetInput"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={executionParams.targetInput}
                onChange={(e) => setExecutionParams({ ...executionParams, targetInput: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-300 text-sm">Duration (seconds):</label>
              <input
                type="number"
                id="duration"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={executionParams.duration}
                onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label htmlFor="rps" className="block text-gray-300 text-sm">RPS:</label>
              <input
                type="number"
                id="rps"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={executionParams.rps}
                onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label htmlFor="threads" className="block text-gray-300 text-sm">Threads:</label>
              <input
                type="number"
                id="threads"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={executionParams.threads}
                onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label htmlFor="method" className="block text-gray-300 text-sm">Method:</label>
              <select
                id="method"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500"
                value={executionParams.method}
                onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })}
              >
                <option value="">Select Method</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleStartExecution}
                disabled={isRunning}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                START
              </button>
              <button
                onClick={handleStopExecution}
                disabled={!isRunning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-300 mb-2">Execution Logs</h2>
        <pre className="bg-gray-700 p-2 rounded text-sm overflow-auto max-h-64">
          {executionLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ToolHybridComponent;
