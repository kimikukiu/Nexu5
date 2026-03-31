import React, { useState, useEffect } from 'react';

interface ExecutionParams {
  target: string;
  duration: number;
  rps: number;
  threads: number;
  method: string;
}

const TooliceComponent: React.FC = () => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [executing, setExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [params, setParams] = useState<ExecutionParams>({
    target: '',
    duration: 60,
    rps: 100,
    threads: 10,
    method: 'TCP',
  });

  useEffect(() => {
    const fetchCode = async () => {
      // In a real scenario, this would fetch the code from the specified path.
      // For this example, we'll use the dummy code.
      const code = `
#include <stdio.h>

int main() {
    printf("Hello from ice.c!\n");
    return 0;
}
`;
      setSourceCode(code);
    };

    fetchCode();
  }, []);

  const handleStart = () => {
    setExecuting(true);
    setLogs(['Execution started...']);
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[LOG] Attacking ${params.target} with method ${params.method}`]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setExecuting(false);
      setLogs(prev => [...prev, 'Execution finished.']);
    }, params.duration * 1000);
  };

  const handleStop = () => {
    setExecuting(false);
    setLogs(prev => [...prev, 'Execution stopped by user.']);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg font-mono">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Mirai Tool: ice</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Source Code (ice.c)</h3>
          <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-auto">
            <pre><code>{sourceCode}</code></pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Execution Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Target IP</label>
              <input type="text" value={params.target} onChange={e => setParams({...params, target: e.target.value})} className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label className="block mb-1">Duration (s)</label>
              <input type="number" value={params.duration} onChange={e => setParams({...params, duration: parseInt(e.target.value)})} className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label className="block mb-1">RPS</label>
              <input type="number" value={params.rps} onChange={e => setParams({...params, rps: parseInt(e.target.value)})} className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label className="block mb-1">Threads</label>
              <input type="number" value={params.threads} onChange={e => setParams({...params, threads: parseInt(e.target.value)})} className="w-full bg-gray-800 rounded p-2" />
            </div>
            <div>
              <label className="block mb-1">Method</label>
              <select value={params.method} onChange={e => setParams({...params, method: e.target.value})} className="w-full bg-gray-800 rounded p-2">
                <option>TCP</option>
                <option>UDP</option>
                <option>HTTP</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button onClick={handleStart} disabled={executing} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
              {executing ? 'Executing...' : 'START'}
            </button>
            <button onClick={handleStop} disabled={!executing} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
              STOP
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Execution Logs</h3>
        <div className="bg-gray-800 p-4 rounded-lg h-64 overflow-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TooliceComponent;
