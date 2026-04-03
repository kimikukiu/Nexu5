import React from 'react';
import { DynamicTool, LogEntry } from '../types';
import { DynamicToolInterface } from './DynamicToolInterface';

interface DynamicToolRendererProps {
  tool: DynamicTool;
  addLog: (message: string, level: LogEntry['level']) => void;
}

export const DynamicToolRenderer: React.FC<DynamicToolRendererProps> = ({ tool, addLog }) => {
  if (!tool) return <div className="p-10 text-gray-500 font-mono">Select a tool to begin...</div>;

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      <DynamicToolInterface tool={tool} />
    </div>
  );
};
