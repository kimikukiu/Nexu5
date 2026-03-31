
import React, { useState, useEffect } from 'react';

interface ToolHakaiComponentProps {
  toolPath: string;
}

interface CodeSnippet {
  language: string;
  code: string;
}

const ToolHakaiComponent: React.FC<ToolHakaiComponentProps> = ({ toolPath }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('c');
  const [targetInput, setTargetInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const files = [
          { lang: 'c', path: `${toolPath}/hakai.c` },
          { lang: 'go', path: `${toolPath}/hakai.go` },
          { lang: 'python', path: `${toolPath}/hakai.py` },
          { lang: 'shell', path: `${toolPath}/hakai.sh` },
        ];

        const fetchedSnippets: CodeSnippet[] = [];
        for (const file of files) {
          // In a real scenario, you would fetch the file content from a backend API.
          // For this simulation, we'll use the content we already have.
          let codeContent = '';
          switch (file.lang) {
            case 'c':
              codeContent = `/* Hakai C Source */\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) {\n        fprintf(stderr, \
        \"Usage: %s <target>\\n\", argv[0]);\n        return 1;\n    }\n    printf(\"Attacking target: %s from C\\n\", argv[1]);\n    sleep(5);\n    printf(\"Attack finished.\\n\");\n    return 0;\n}`;
              break;
            case 'go':
              codeContent = `package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"time\"\n)\n\nfunc main() {\n\tif len(os.Args) < 2 {\n\t\tfmt.Println(\"Usage: go run hakai.go <target>\")\n\t\tos.Exit(1)\n\t}\n\ttarget := os.Args[1]\n\tfmt.Printf(\"Attacking target: %s from Go\\n\", target)\n\ttime.Sleep(5 * time.Second)\n\tfmt.Println(\"Attack finished.\")\n}`;
              break;
            case 'python':
              codeContent = `import sys\nimport time\n\ndef main():\n    if len(sys.argv) < 2:\n        print(\"Usage: python hakai.py <target>\")\n        sys.exit(1)\n    target = sys.argv[1]\n    print(f\"Attacking target: {target} from Python\")\n    time.sleep(5)\n    print(\"Attack finished.\")\n\nif __name__ == \"__main__\":\n    main()`;
              break;
            case 'shell':
              codeContent = `#!/bin/bash\n\nif [ -z \"$1\" ]; then\n    echo \"Usage: ./hakai.sh <target>\"\n    exit 1\nfi\n\ntarget=$1\necho \"Attacking target: $target from Shell\"\nsleep 5\necho \"Attack finished.\"`;
              break;
          }
          fetchedSnippets.push({ language: file.lang, code: codeContent });
        }
        setCodeSnippets(fetchedSnippets);
      } catch (err) {
        setError("Failed to fetch code snippets.");
        console.error(err);
      }
    };
    fetchCode();
  }, [toolPath]);

  const handleExecute = () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setError(null);

    const currentSnippet = codeSnippets.find(s => s.language === selectedLanguage);
    if (!currentSnippet) {
      setError("No code snippet found for the selected language.");
      setIsExecuting(false);
      return;
    }

    // Simulate execution
    let logCounter = 0;
    const interval = setInterval(() => {
      if (logCounter < 5) {
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulating execution for ${targetInput} with ${selectedLanguage} (RPS: ${rps}, Threads: ${threads}, Duration: ${duration}s)`]);
        logCounter++;
      } else {
        clearInterval(interval);
        setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Simulation finished for ${targetInput}.`]);
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleStop = () => {
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped by user.`]);
  };

  const renderCodeViewer = () => {
    const snippet = codeSnippets.find(s => s.language === selectedLanguage);
    if (!snippet) {
      return <p className="text-red-500">No code available for this language.</p>;
    }
    return (
      <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-auto max-h-60">
        <code className={`language-${snippet.language} text-emerald-400`}>
          {snippet.code}
        </code>
      </pre>
    );
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Hakai Tool Component</h1>

      {error && <div className="bg-red-700 p-3 rounded-md mb-4 text-white">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Viewer Section */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Source Code</h2>
          <div className="mb-4">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-1">Select Language:</label>
            <select
              id="language-select"
              className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {codeSnippets.map(snippet => (
                <option key={snippet.language} value={snippet.language}>
                  {snippet.language.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {renderCodeViewer()}
        </div>

        {/* Controls and Logs Section */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Controls</h2>
          <div className="bg-gray-800 p-4 rounded-md mb-6">
            <div className="mb-4">
              <label htmlFor="target-input" className="block text-sm font-medium text-gray-300 mb-1">Target Input:</label>
              <input
                type="text"
                id="target-input"
                className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g., example.com or 192.168.1.1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="duration-input" className="block text-sm font-medium text-gray-300 mb-1">Duration (s):</label>
                <input
                  type="number"
                  id="duration-input"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="rps-input" className="block text-sm font-medium text-gray-300 mb-1">RPS:</label>
                <input
                  type="number"
                  id="rps-input"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={rps}
                  onChange={(e) => setRps(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="threads-input" className="block text-sm font-medium text-gray-300 mb-1">Threads:</label>
                <input
                  type="number"
                  id="threads-input"
                  className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExecute}
                disabled={isExecuting || !targetInput}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? 'Executing...' : 'START'}
              </button>
              <button
                onClick={handleStop}
                disabled={!isExecuting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                STOP
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-300 mb-3">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-md h-60 overflow-auto">
            {executionLogs.length === 0 ? (
              <p className="text-gray-400">No logs yet. Start execution to see output.</p>
            ) : (
              executionLogs.map((log, index) => (
                <p key={index} className="text-gray-200 text-sm mb-1">{log}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolHakaiComponent;
