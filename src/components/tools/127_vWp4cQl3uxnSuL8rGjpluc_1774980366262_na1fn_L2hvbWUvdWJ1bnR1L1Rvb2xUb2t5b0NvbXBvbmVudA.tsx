
import React, { useState, useEffect } from 'react';

interface ExecutionLog {
  timestamp: string;
  message: string;
}

const ToolTokyoComponent: React.FC = () => {
  const [target, setTarget] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [rps, setRps] = useState<number>(10);
  const [threads, setThreads] = useState<number>(1);
  const [method, setMethod] = useState<string>('string');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);

  const code = `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <arpa/inet.h>

static uint32_t table_key = 0xdeadbeef;

void *x(void *, int);

int main(int argc, char **args)
{
    void *data;
    int len, i;

    if (argc != 3)
    {
        printf("Usage: %s <string | ip | uint32 | uint16 | uint8 | bool> <data>\\n", args[0]);
        return 0;
    }

    if (strcmp(args[1], "string") == 0)
    {
        data = args[2];
        len = strlen(args[2]) + 1;
    }
    else if (strcmp(args[1], "ip") == 0)
    {
        data = calloc(1, sizeof (uint32_t));
        *((uint32_t *)data) = inet_addr(args[2]);
        len = sizeof (uint32_t);
    }
    else if (strcmp(args[1], "uint32") == 0)
    {
        data = calloc(1, sizeof (uint32_t));
        *((uint32_t *)data) = htonl((uint32_t)atoi(args[2]));
        len = sizeof (uint32_t);
    }
    else if (strcmp(args[1], "uint16") == 0)
    {
        data = calloc(1, sizeof (uint16_t));
        *((uint16_t *)data) = htons((uint16_t)atoi(args[2]));
        len = sizeof (uint16_t);
    }
    else if (strcmp(args[1], "uint8") == 0)
    {
        data = calloc(1, sizeof (uint8_t));
        *((uint8_t *)data) = atoi(args[2]);
        len = sizeof (uint8_t);
    }
    else if (strcmp(args[1], "bool") == 0)
    {
        data = calloc(1, sizeof (char));
        if (strcmp(args[2], "false") == 0)
            ((char *)data)[0] = 0;
        else if (strcmp(args[2], "true") == 0)
            ((char *)data)[0] = 1;
        else
        {
            printf("Unknown value ‘%s’ for datatype bool!\\n", args[2]);
            return -1;
        }
        len = sizeof (char);
    }
    else
    {
        printf("Unknown data type ‘%s’!\\n", args[1]);
        return -1;
    }

    // Yes we are leaking memory, but the program is so
    // short lived that it doesn't really matter...
    printf("XOR'ing %d bytes of data...\\n", len);
    data = x(data, len);
    for (i = 0; i < len; i++)
        printf("\\\\x%02X", ((unsigned char *)data)[i]);
    printf("\\n");
}

void *x(void *_buf, int len)
{
    unsigned char *buf = (char *)_buf, *out = malloc(len);
    int i;
    uint8_t k1 = table_key & 0xff,
            k2 = (table_key >> 8) & 0xff,
            k3 = (table_key >> 16) & 0xff,
            k4 = (table_key >> 24) & 0xff;

    for (i = 0; i < len; i++)
    {
        char tmp = buf[i] ^ k1;

        tmp ^= k2;
        tmp ^= k3;
        tmp ^= k4;

        out[i] = tmp;
    }

    return out;
}
  `;

  const handleStart = () => {
    setIsExecuting(true);
    setLogs([]);
    // Simulate execution
    const interval = setInterval(() => {
      setLogs(prevLogs => [...prevLogs, { timestamp: new Date().toISOString(), message: `Executing with target: ${target}` }]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsExecuting(false);
      setLogs(prevLogs => [...prevLogs, { timestamp: new Date().toISOString(), message: 'Execution finished.' }]);
    }, duration * 1000);
  };

  const handleStop = () => {
    setIsExecuting(false);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Mirai Tool: Tokyo (enc.c)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Source Code</h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto h-96"><code>{code}</code></pre>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Execution Controls</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-4">
              <label htmlFor="target" className="block mb-1">Target</label>
              <input id="target" type="text" value={target} onChange={e => setTarget(e.target.value)} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block mb-1">Duration (s)</label>
              <input id="duration" type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="rps" className="block mb-1">RPS</label>
              <input id="rps" type="number" value={rps} onChange={e => setRps(parseInt(e.target.value))} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="threads" className="block mb-1">Threads</label>
              <input id="threads" type="number" value={threads} onChange={e => setThreads(parseInt(e.target.value))} className="w-full bg-gray-700 rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="method" className="block mb-1">Method</label>
              <select id="method" value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-gray-700 rounded p-2">
                <option value="string">string</option>
                <option value="ip">ip</option>
                <option value="uint32">uint32</option>
                <option value="uint16">uint16</option>
                <option value="uint8">uint8</option>
                <option value="bool">bool</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={handleStart} disabled={isExecuting} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-600">START</button>
              <button onClick={handleStop} disabled={!isExecuting} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-600">STOP</button>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-4 mb-2">Execution Logs</h2>
          <div className="bg-gray-800 p-4 rounded-lg h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="font-mono text-sm">
                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTokyoComponent;
