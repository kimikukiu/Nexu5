import React, { useState, useEffect, useRef } from 'react';

// Define TypeScript interfaces for component props and state
interface ToolJokerV1ComponentProps {}

interface LogEntry {
  timestamp: string;
  message: string;
}

const ToolJokerV1Component: React.FC<ToolJokerV1ComponentProps> = () => {
  // State management for code, UI, and execution
  const [code, setCode] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<string>('');
  const [target, setTarget] = useState<string>('example.com');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(1000);
  const [threads, setThreads] = useState<number>(100);
  const [method, setMethod] = useState<string>('GET');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to fetch and set source code on component mount
  useEffect(() => {
    const sourceCode = {
      'joker.c': `/* Joker C Code */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <target>\n", argv[0]);
        return 1;
    }
    printf("Attacking %s with C-based tool...\n", argv[1]);
    // Simulate attack
    sleep(5);
    printf("Attack finished.\n");
    return 0;
}`,
      'joker.go': `/* Joker Go Code */
package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run joker.go <target>")
		return
	}
	target := os.Args[1]
	fmt.Printf("Attacking %s with Go-based tool...\n", target)
	// Simulate attack
	time.Sleep(5 * time.Second)
	fmt.Println("Attack finished.")
}`,
      'joker.py': `# Joker Python Code
import sys
import time

def attack(target):
    print(f"Attacking {target} with Python-based tool...")
    # Simulate attack
    time.sleep(5)
    print("Attack finished.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python joker.py <target>")
    else:
        attack(sys.argv[1])`,
    };
    setCode(sourceCode);
    setActiveTab(Object.keys(sourceCode)[0]);
  }, []);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    };
  }, []);

  const addLog = (message: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message,
    };
    setLogs(prev => [...prev, newLog]);
  };

  // Handlers for starting and stopping execution
  const handleStart = () => {
    setIsRunning(true);
    setLogs([]); // Clear previous logs
    addLog(`Initiating attack on ${target} with ${threads} threads.`);
    addLog(`Method: ${method}, Duration: ${duration}s, RPS: ${rps}`);

    // Simulate real-time log generation
    logIntervalRef.current = setInterval(() => {
      addLog(`Sending packets to ${target}...`);
    }, 2000);

    // Simulate end of execution
    setTimeout(() => {
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      addLog("Attack finished.");
      setIsRunning(false);
    }, duration * 1000);
  };

  const handleStop = () => {
    if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    addLog("Execution stopped by user.");
    setIsRunning(false);
  };

  // Render the code viewer with tabs for different source files
  const renderCodeViewer = () => (
    <div className="bg-gray-800 rounded-lg shadow-inner">
      <div className="flex border-b border-gray-700">
        {Object.keys(code).map(filename => (
          <button
            key={filename}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === filename ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-emerald-300'}`}
            onClick={() => setActiveTab(filename)}
          >
            {filename}
          </button>
        ))}
      </div>
      <pre className="overflow-auto p-4 text-sm text-gray-200 h-96"><code>{code[activeTab]}</code></pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-6">MIRAI Tool: $ Joker V1 $</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Code Viewer */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Source Code</h2>
            {renderCodeViewer()}
          </div>

          {/* Right Column: Controls and Logs */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Controls</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-inner mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target</label>
                  <input type="text" id="target" value={target} onChange={e => setTarget(e.target.value)} placeholder="e.g., example.com or 192.168.1.1" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Duration (s)</label>
                  <input type="number" id="duration" value={duration} onChange={e => setDuration(Number(e.target.value))} min="1" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div>
                  <label htmlFor="rps" className="block text-sm font-medium text-gray-300">RPS</label>
                  <input type="number" id="rps" value={rps} onChange={e => setRps(Number(e.target.value))} min="1" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div>
                  <label htmlFor="threads" className="block text-sm font-medium text-gray-300">Threads</label>
                  <input type="number" id="threads" value={threads} onChange={e => setThreads(Number(e.target.value))} min="1" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div>
                  <label htmlFor="method" className="block text-sm font-medium text-gray-300">Method</label>
                  <select id="method" value={method} onChange={e => setMethod(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-emerald-500 focus:ring-emerald-500">
                    <option>GET</option>
                    <option>POST</option>
                    <option>UDP</option>
                    <option>TCP</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={handleStart} disabled={isRunning} className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed transition-colors duration-200">START</button>
                <button onClick={handleStop} disabled={!isRunning} className="flex-1 py-2 px-4 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition-colors duration-200">STOP</button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Execution Logs</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-inner h-64 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-sm text-gray-300 font-mono">
                  <span className="text-emerald-400">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolJokerV1Component;
