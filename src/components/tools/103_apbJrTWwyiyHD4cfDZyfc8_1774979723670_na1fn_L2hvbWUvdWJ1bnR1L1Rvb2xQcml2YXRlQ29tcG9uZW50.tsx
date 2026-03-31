import React, { useState, useEffect, useRef } from 'react';

// TypeScript Interfaces
interface ToolCode {
  filename: string;
  language: string;
  content: string;
}

interface ExecutionParams {
  targetInput: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'warn';
}

// Main Component
const ToolPrivateComponent: React.FC = () => {
  // State Management
  const [codeSnippets, setCodeSnippets] = useState<ToolCode[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [executionParams, setExecutionParams] = useState<ExecutionParams>({
    targetInput: 'example.com',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'GET',
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const executionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for Loading Code Snippets
  useEffect(() => {
    // --- REAL IMPLEMENTATION DETAIL ---
    // In a real scenario, this effect would use an API or file system access
    // to fetch source code from `/home/ubuntu/extracted_tools/Private/`.
    // Since the sandbox environment is currently preventing file access,
    // we are using simulated data.
    const simulatedCode: ToolCode[] = [
      {
        filename: 'private.c',
        language: 'C',
        content: '/*\n * Mirai - Private Tool (Simulated C Code)\n */\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nvoid execute_attack(char* target, int duration) {\n    printf(\"[INFO] Starting attack on %s for %d seconds...\\n\", target, duration);\n    // Simulated attack logic\n    for (int i = 0; i < duration; i++) {\n        printf(\"[LOG] Sending packet %d to %s\\n\", i + 1, target);\n    }\n    printf(\"[SUCCESS] Attack finished.\\n\");\n}\n\nint main(int argc, char *argv[]) {\n    if (argc < 3) {\n        fprintf(stderr, \"[ERROR] Usage: %s <target> <duration>\\n\");\n        return 1;\n    }\n    execute_attack(argv[1], atoi(argv[2]));\n    return 0;\n}',
      },
      {
        filename: 'utils.py',
        language: 'Python',
        content: '# Mirai - Private Tool (Simulated Python Utility)\nimport time\n\ndef parse_config():\n    print(\"[INFO] Parsing configuration...\")\n    return {\"retries\": 3, \"timeout\": 5}\n\ndef log_message(level, message):\n    timestamp = time.strftime(\"%Y-%m-%d %H:%M:%S\", time.gmtime())\n    print(f\"[{level.upper()}] {timestamp}: {message}\")\n',
      },
    ];
    setCodeSnippets(simulatedCode);
    if (simulatedCode.length > 0) {
      setActiveTab(simulatedCode[0].filename);
    }
  }, []);

  // Log Management
  const addLog = (message: string, type: LogEntry['type']) => {
    const newLog: LogEntry = {
      timestamp: new Date().toISOString(),
      message,
      type,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  // Execution Logic
  const handleStartExecution = () => {
    // --- REAL IMPLEMENTATION DETAIL ---
    // This would typically trigger a backend process to execute the compiled code
    // with the specified parameters. The process would stream logs back.
    setIsExecuting(true);
    addLog(`Starting execution on ${executionParams.targetInput}...`, 'info');
    addLog(`Params: Duration=${executionParams.duration}s, RPS=${executionParams.rps}, Threads=${executionParams.threads}, Method=${executionParams.method}`, 'info');

    let counter = 0;
    executionIntervalRef.current = setInterval(() => {
      if (Math.random() < 0.1) {
        addLog(`Error: Failed to connect to target port.`, 'error');
      } else {
        addLog(`[Thread ${Math.floor(Math.random() * executionParams.threads) + 1}] Request ${counter + 1} sent.`, 'info');
      }
      counter++;
    }, 1000);

    setTimeout(() => {
      if (isExecuting) {
        handleStopExecution(true);
      }
    }, executionParams.duration * 1000);
  };

  const handleStopExecution = (isAutoStop = false) => {
    if (executionIntervalRef.current) {
      clearInterval(executionIntervalRef.current);
    }
    setIsExecuting(false);
    addLog(isAutoStop ? 'Execution finished automatically.' : 'Execution stopped by user.', 'warn');
  };

  // Render Helper for Code
  const renderActiveCode = () => {
    const activeSnippet = codeSnippets.find(s => s.filename === activeTab);
    if (!activeSnippet) return null;
    return (
      <pre className="bg-gray-900 p-4 rounded-sm text-sm overflow-x-auto w-full">
        <code className={`language-${activeSnippet.language.toLowerCase()}`}>{activeSnippet.content}</code>
      </pre>
    );
  }

  // Component JSX
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">Mirai Tool: Private</h1>
        <p className="text-gray-400 mb-6">Manual execution and real-time monitoring interface.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Code Viewer & Logs */}
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-emerald-300">Code Viewer</h2>
              </div>
              <div className="border-b border-gray-700 flex space-x-2 px-4">
                {codeSnippets.map(snippet => (
                  <button 
                    key={snippet.filename} 
                    onClick={() => setActiveTab(snippet.filename)}
                    className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === snippet.filename ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                    {snippet.filename}
                  </button>
                ))}
              </div>
              <div className="p-1 bg-gray-900 rounded-b-lg max-h-96 overflow-auto">{renderActiveCode()}</div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg mt-6">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-emerald-300">Execution Logs</h2>
              </div>
              <div className="p-4 h-64 overflow-y-auto font-mono text-xs text-gray-300">
                {logs.length === 0 ? (
                  <p className="text-gray-500">Awaiting execution...</p>
                ) : (
                  logs.map((log, index) => (
                    <p key={index} className={`whitespace-pre-wrap ${log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-yellow-400' : ''}`}>
                      <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}: </span>{log.message}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-fit">
            <h2 className="text-xl font-semibold text-emerald-300 mb-4 border-b border-gray-700 pb-3">Execution Controls</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="targetInput" className="block text-sm font-medium text-gray-300 mb-1">Target (Host/IP)</label>
                <input type="text" id="targetInput" value={executionParams.targetInput} onChange={(e) => setExecutionParams({ ...executionParams, targetInput: e.target.value })} className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"/>
              </div>
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">Method</label>
                <select id="method" value={executionParams.method} onChange={(e) => setExecutionParams({ ...executionParams, method: e.target.value })} className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>GET</option><option>POST</option><option>UDP-FLOOD</option><option>TCP-SYN</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (s)</label>
                  <input type="number" id="duration" value={executionParams.duration} onChange={(e) => setExecutionParams({ ...executionParams, duration: parseInt(e.target.value) || 0 })} className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
                <div>
                  <label htmlFor="threads" className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
                  <input type="number" id="threads" value={executionParams.threads} onChange={(e) => setExecutionParams({ ...executionParams, threads: parseInt(e.target.value) || 0 })} className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
              </div>
               <div>
                  <label htmlFor="rps" className="block text-sm font-medium text-gray-300 mb-1">RPS (Requests/Sec)</label>
                  <input type="number" id="rps" value={executionParams.rps} onChange={(e) => setExecutionParams({ ...executionParams, rps: parseInt(e.target.value) || 0 })} className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2 focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700 flex space-x-4">
              <button onClick={handleStartExecution} disabled={isExecuting} className="w-full px-6 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center">START</button>
              <button onClick={() => handleStopExecution(false)} disabled={!isExecuting} className="w-full px-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center">STOP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPrivateComponent;
