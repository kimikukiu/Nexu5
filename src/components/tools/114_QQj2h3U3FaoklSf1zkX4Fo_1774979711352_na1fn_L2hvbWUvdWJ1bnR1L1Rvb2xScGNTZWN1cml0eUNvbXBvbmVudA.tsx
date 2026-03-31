import React, { useState, useEffect } from 'react';

interface RpcSecurityProps {
  // No specific props for now, but can be extended later
}

const pythonCode = `
import os

def check_rpc_security(target_ip, port):
    print(f"Checking RPC security for {target_ip}:{port}...")
    # Simulate some security checks
    if port == 111:
        print("Port 111 (rpcbind) is open. Potential vulnerability.")
        return False
    elif port == 2049:
        print("Port 2049 (NFS) is open. Check for insecure exports.")
        return False
    else:
        print("RPC security check passed for this port.")
        return True

if __name__ == "__main__":
    target = os.getenv("TARGET_IP", "127.0.0.1")
    p = int(os.getenv("TARGET_PORT", "111"))
    check_rpc_security(target, p)
`;

const ToolRpcSecurityComponent: React.FC<RpcSecurityProps> = () => {
  const [targetIp, setTargetIp] = useState<string>('127.0.0.1');
  const [targetPort, setTargetPort] = useState<string>('111');
  const [duration, setDuration] = useState<string>('60');
  const [rps, setRps] = useState<string>('10');
  const [threads, setThreads] = useState<string>('1');
  const [method, setMethod] = useState<string>('check_rpc_security');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const simulateExecution = () => {
    setError(null);
    setLogs([]);
    setIsRunning(true);
    addLog(`Starting RPC Security check for ${targetIp}:${targetPort}...`);
    addLog(`Duration: ${duration}s, RPS: ${rps}, Threads: ${threads}, Method: ${method}`);

    try {
      const portNum = parseInt(targetPort);
      if (isNaN(portNum)) {
        throw new Error('Port must be a number.');
      }

      let result = true;
      if (portNum === 111) {
        addLog('Port 111 (rpcbind) is open. Potential vulnerability.');
        result = false;
      } else if (portNum === 2049) {
        addLog('Port 2049 (NFS) is open. Check for insecure exports.');
        result = false;
      } else {
        addLog('RPC security check passed for this port.');
      }

      addLog(`Execution finished. Result: ${result ? 'Secure' : 'Vulnerable'}`);
    } catch (e: any) {
      setError(e.message);
      addLog(`Error during simulation: ${e.message}`);
    }

    setIsRunning(false);
  };

  const stopExecution = () => {
    addLog('Execution stopped by user.');
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">RpcSecurity Tool</h1>

      {/* Source Code Viewer */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code: rpc_security.py</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-200">
          <code>{pythonCode}</code>
        </pre>
      </div>

      {/* Execution Controls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="targetIp" className="block text-sm font-medium text-gray-300">Target IP</label>
            <input
              type="text"
              id="targetIp"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetIp}
              onChange={(e) => setTargetIp(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="targetPort" className="block text-sm font-medium text-gray-300">Target Port</label>
            <input
              type="number"
              id="targetPort"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={targetPort}
              onChange={(e) => setTargetPort(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
            <input
              type="number"
              id="duration"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
            <input
              type="number"
              id="rps"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={rps}
              onChange={(e) => setRps(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
            <input
              type="number"
              id="threads"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={threads}
              onChange={(e) => setThreads(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
            <select
              id="method"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              disabled={isRunning}
            >
              <option value="check_rpc_security">check_rpc_security</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={simulateExecution}
            disabled={isRunning}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? 'Running...' : 'START'}
          </button>
          <button
            onClick={stopExecution}
            disabled={!isRunning}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            STOP
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      </div>

      {/* Real-time Execution Logs */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
        <div className="bg-gray-900 p-4 rounded-md h-64 overflow-y-auto text-sm text-gray-200">
          {logs.map((log, index) => (
            <p key={index} className="mb-1">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolRpcSecurityComponent;
