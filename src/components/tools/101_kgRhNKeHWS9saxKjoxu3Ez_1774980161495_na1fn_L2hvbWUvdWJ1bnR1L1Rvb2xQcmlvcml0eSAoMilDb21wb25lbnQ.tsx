
import React, { useState, useEffect } from 'react';

interface ToolPriority2ComponentProps {
  toolName: string;
}

const ToolPriority2Component: React.FC<ToolPriority2ComponentProps> = ({ toolName }) => {
  const [activeTab, setActiveTab] = useState<'c' | 'go' | 'py' | 'sh'>('c');
  const [codeContent, setCodeContent] = useState<Record<string, string>>({});
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<string>('GET');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCode = async () => {
      const files = {
        c: '/home/ubuntu/extracted_tools/Priority (2)/priority.c',
        go: '/home/ubuntu/extracted_tools/Priority (2)/priority.go',
        py: '/home/ubuntu/extracted_tools/Priority (2)/priority.py',
        sh: '/home/ubuntu/extracted_tools/Priority (2)/priority.sh',
      };
      const newCodeContent: Record<string, string> = {};
      for (const [lang, path] of Object.entries(files)) {
        try {
          // In a real application, you would fetch this from a server or directly read the file.
          // For this simulation, we'll use placeholder content.
          let content = '';
          switch (lang) {
            case 'c':
              content = `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) {\n        fprintf(stderr, \"Usage: %s <target>\\n\", argv[0]);\n        return 1;\n    }\n    char *target = argv[1];\n    printf(\"Executing Priority attack on %s...\\n\", target);\n    // Placeholder for actual attack logic\n    for (int i = 0; i < 10; i++) {\n        printf(\"Sending packet %d to %s\\n\", i + 1, target);\n    }\n    printf(\"Priority attack finished.\\n\");\n    return 0;\n}\n`;
              break;
            case 'go':
              content = `package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"time\"\n)\n\nfunc main() {\n\tif len(os.Args) < 2 {\n\t\tfmt.Println(\"Usage: go run priority.go <target>\")\n\t\tos.Exit(1)\n\t}\n\ttarget := os.Args[1]\n\tfmt.Printf(\"Executing Priority attack on %s...\\n\", target)\n\t// Placeholder for actual attack logic\n\tfor i := 0; i < 10; i++ {\n\t\tfmt.Printf(\"Sending packet %d to %s\\n\", i+1, target)\n\t\ttime.Sleep(100 * time.Millisecond)\n\t}\n\tfmt.Println(\"Priority attack finished.\\")\n}\n`;
              break;
            case 'py':
              content = `import sys\nimport time\n\ndef main():\n    if len(sys.argv) < 2:\n        print(\"Usage: python priority.py <target>\")\n        sys.exit(1)\n    target = sys.argv[1]\n    print(f\"Executing Priority attack on {target}...\")\n    # Placeholder for actual attack logic\n    for i in range(10):\n        print(f\"Sending packet {i+1} to {target}\")\n        time.sleep(0.1)\n    print(\"Priority attack finished.\")\n\nif __name__ == \"__main__\":\n    main()\n`;
              break;
            case 'sh':
              content = `#!/bin/bash\n\nif [ -z \"$1\" ]; then\n    echo \"Usage: ./priority.sh <target>\"\n    exit 1\nfi\n\ntarget=$1\n\necho \"Executing Priority attack on $target...\"\n# Placeholder for actual attack logic\nfor i in $(seq 1 10);\ndo\n    echo \"Sending packet $i to $target\"\n    sleep 0.1\ndone\necho \"Priority attack finished.\"\n`;
              break;
          }
          newCodeContent[lang] = content;
        } catch (error) {
          console.error(`Failed to read ${path}:`, error);
          newCodeContent[lang] = `Error loading code from ${path}`;
        }
      }
      setCodeContent(newCodeContent);
    };

    fetchCode();
  }, []);

  const handleStartExecution = () => {
    setIsExecuting(true);
    setExecutionLogs([`Starting execution for ${toolName} with target: ${targetInput}...`]);

    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      setExecutionLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] Sending packet ${logCount} to ${targetInput} (RPS: ${rps}, Threads: ${threads}, Method: ${method})`]);
      if (logCount >= duration * 5) { // Simulate some packets over duration
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionLogs((prevLogs) => [...prevLogs, `Execution for ${toolName} finished.`]);
      }
    }, 1000 / (rps * threads)); // Simulate RPS and threads

    return () => clearInterval(interval);
  };

  const handleStopExecution = () => {
    setIsExecuting(false);
    setExecutionLogs((prevLogs) => [...prevLogs, `Execution for ${toolName} stopped by user.`]);
  };

  const renderCodeViewer = (lang: string) => (
    <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-auto h-96">
      <code className={`language-${lang} text-emerald-300`}>
        {codeContent[lang] || 'Loading code...'}
      </code>
    </pre>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">{toolName} Component</h1>

      {/* Code Viewer Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Tool Source Code</h2>
        <div className="flex border-b border-gray-700 mb-4">
          {['c', 'go', 'py', 'sh'].map((lang) => (
            <button
              key={lang}
              className={`py-2 px-4 text-sm font-medium ${activeTab === lang ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab(lang as 'c' | 'go' | 'py' | 'sh')}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        {renderCodeViewer(activeTab)}
      </div>

      {/* Execution Controls */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300">Target Input</label>
            <input
              type="text"
              id="targetInput"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., example.com or 192.168.1.1"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS (Requests Per Second)</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
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
        <div className="mt-6 flex space-x-4">
          <button
            className={`py-2 px-6 rounded-md font-semibold ${isExecuting ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition duration-200`}
            onClick={isExecuting ? handleStopExecution : handleStartExecution}
            disabled={!targetInput}
          >
            {isExecuting ? 'STOP' : 'START'}
          </button>
        </div>
      </div>

      {/* Real-time Execution Logs */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-auto text-sm text-gray-300">
          {executionLogs.length === 0 ? (
            <p>No logs yet. Start execution to see output.</p>
          ) : (
            executionLogs.map((log, index) => (
              <p key={index} className="mb-1">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPriority2Component;
