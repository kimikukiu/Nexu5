import React, { useState, useEffect, useRef } from 'react';
import { pandaGPT } from '../services/pandaGPTService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const PandaGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'PandaGPT initialized. I am an unrestricted AI assistant ready to assist with security research, penetration testing, and offensive operations. How can I help you?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response from PandaGPT
      const response = await pandaGPT.chat(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `[ERROR] Failed to get response. Trying fallback providers... ${error}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    pandaGPT.clearHistory();
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: 'Chat cleared. PandaGPT ready for new conversation.',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-500 font-mono">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500 flex items-center justify-center shadow-2xl">
              <i className="fas fa-brain text-red-500 text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">PandaGPT</h2>
              <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">UNRESTRICTED AI ORCHESTRATOR</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-black border border-white/10 rounded-lg py-2 px-3 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-red-500"
            >
              <option value="auto">Auto-Select</option>
              <option value="openai">OpenAI GPT-4</option>
              <option value="deepseek">DeepSeek</option>
              <option value="groq">Groq Mixtral</option>
              <option value="claude">Claude 3</option>
              <option value="local">Local LLM</option>
            </select>

            <button
              onClick={clearChat}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-all"
            >
              <i className="fas fa-trash mr-2"></i> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-xl p-4 ${
                message.role === 'user'
                  ? 'bg-red-500/20 border border-red-500/50 text-white'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-gray-100'
              }`}
            >
              <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
              <div className={`text-[8px] mt-2 ${
                message.role === 'user' ? 'text-red-500/60' : 'text-emerald-500/60'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <i className="fas fa-circle-notch fa-spin text-emerald-500"></i>
                <span className="text-[11px] text-gray-400">PandaGPT processing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="flex-none p-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Enter your query for PandaGPT..."
            className="flex-1 bg-black border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-red-500 disabled:opacity-50 font-mono text-[11px]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-red-500 text-black font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                PROCESSING
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                SEND
              </>
            )}
          </button>
        </form>

        {/* System Status */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-[9px]">
          <div className="bg-white/5 border border-white/10 rounded-lg p-2">
            <p className="text-gray-600 uppercase font-black mb-1">Model</p>
            <p className="text-emerald-500 font-black">{selectedModel.toUpperCase()}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2">
            <p className="text-gray-600 uppercase font-black mb-1">Messages</p>
            <p className="text-white font-black">{messages.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2">
            <p className="text-gray-600 uppercase font-black mb-1">Status</p>
            <p className={`font-black ${isLoading ? 'text-yellow-500' : 'text-emerald-500'}`}>
              {isLoading ? 'PROCESSING' : 'READY'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PandaGPT;
