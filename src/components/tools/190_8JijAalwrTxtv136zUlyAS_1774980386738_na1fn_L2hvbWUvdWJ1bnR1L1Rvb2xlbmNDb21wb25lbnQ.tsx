import React, { useState, useEffect, useRef } from 'react';

interface ToolencComponentProps {
  toolPath?: string;
}

interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}

const ToolencComponent: React.FC<ToolencComponentProps> = ({ toolPath = '/home/ubuntu/extracted_tools/enc/' }) => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(100);
  const [threads, setThreads] = useState<number>(10);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCode = async () => {
      setError(null);
      try {
        // In a real environment, this would fetch from a backend API
        // e.g., const response = await fetch(`/api/files?path=${encodeURIComponent(toolPath)}`);
        // For now, we simulate reading the files from the directory
        
        // Simulated file system read for /home/ubuntu/extracted_tools/enc/
        const simulatedFiles: CodeSnippet[] = [
          { 
            filename: 'enc.c', 
            language: 'c', 
            content: '/* enc.c */\n#include <stdio.h>\n\nint main() {\n    printf("C code for enc tool\\n");\n    return 0;\n}' 
          },
          { 
            filename: 'enc.go', 
            language: 'go', 
            content: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Go code for enc tool")\n}' 
          }
        ];
        
        setTimeout(() => {
          setCodeSnippets(simulatedFiles);
        }, 500);
      } catch (err) {
        setError('Failed to load code snippets from ' + toolPath);
        console.error(err);
      }
    };
    fetchCode();
  }, [toolPath]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const startExecution = () => {
    if (!target) {
      setError('Target input is required');
      return;
    }
    setIsRunning(true);
    setLogs([`[INFO] Starting enc tool execution against ${target}...`]);
    setError(null);
    
    let logCount = 0;
    const interval = setInterval(() => {
      logCount++;
      const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
      setLogs((prevLogs) => [
        ...prevLogs, 
        `[${timestamp}] [INFO] Sending ${method} requests to ${target} | Threads: ${threads} | RPS: ${rps}`
      ]);
      
      if (logCount >= duration / 10 || logCount >= 10) { // Simulate end after some logs
        clearInterval(interval);
        setIsRunning(false);
        setLogs((prevLogs) => [...prevLogs, `[${new Date().toISOString().split('T')[1].split('.')[0]}] [SUCCESS] Execution completed.`]);
      }
    }, 1000);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toISOString().split('T')[1].split('.')[0]}] [WARN] Execution manually stopped.`]);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen font-mono">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400 border-b border-emerald-500/30 pb-4">
          Mirai Tool: enc
        </h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 mb-6 rounded-md shadow-sm">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Code Viewer */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Source Code
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {codeSnippets.length === 0 && !error ? (
                <div className="flex items-center justify-center h-32 text-gray-500 animate-pulse">
                  Loading code snippets from {toolPath}...
                </div>
              ) : (
                codeSnippets.map((snippet, index) => (
                  <div key={index} className="mb-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <div className="bg-gray-950 px-4 py-2 text-xs text-gray-400 border-b border-gray-800 flex justify-between">
                      <span>{snippet.filename}</span>
                      <span className="uppercase">{snippet.language}</span>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto text-emerald-50/90">
                      <code>{snippet.content}</code>
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Execution Controls */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Execution Controls
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-gray-400 mb-1">Target Input (IP/Domain)</label>
                <input
                  type="text"
                  id="target"
                  className="block w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="e.g., 192.168.1.1 or example.com"
                  disabled={isRunning}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-400 mb-1">Duration (s)</label>
                  <input
                    type="number"
                    id="duration"
                    className="block w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min="1"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label htmlFor="rps" className="block text-sm font-medium text-gray-400 mb-1">RPS</label>
                  <input
                    type="number"
                    id="rps"
                    className="block w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={rps}
                    onChange={(e) => setRps(Number(e.target.value))}
                    min="1"
                    disabled={isRunning}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="threads" className="block text-sm font-medium text-gray-400 mb-1">Threads</label>
                  <input
                    type="number"
                    id="threads"
                    className="block w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={threads}
                    onChange={(e) => setThreads(Number(e.target.value))}
                    min="1"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label htmlFor="method" className="block text-sm font-medium text-gray-400 mb-1">Method</label>
                  <select
                    id="method"
                    className="block w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    disabled={isRunning}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="UDP">UDP</option>
                    <option value="TCP">TCP</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 pt-2">
                <button
                  onClick={startExecution}
                  disabled={isRunning}
                  className="flex-1 py-3 px-4 rounded-lg font-bold tracking-wide transition-all shadow-lg
                             bg-emerald-600 hover:bg-emerald-500 text-white
                             disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isRunning ? 'RUNNING...' : 'START ATTACK'}
                </button>
                <button
                  onClick={stopExecution}
                  disabled={!isRunning}
                  className="flex-1 py-3 px-4 rounded-lg font-bold tracking-wide transition-all shadow-lg
                             bg-red-600 hover:bg-red-500 text-white
                             disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  STOP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Execution Logs */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
            Real-time Execution Logs
          </h2>
          <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 h-64 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-600 italic">Waiting for execution to start...</div>
            ) : (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className={`${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : log.includes('[WARN]') ? 'text-yellow-400' : 'text-gray-300'}`}>
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolencComponent;
