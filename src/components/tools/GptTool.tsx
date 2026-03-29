import { useState, useRef, useEffect } from 'react';
import { AITaskQueue } from '../../services/aiTaskQueue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPlus, faPaperPlane, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export default function GptTool() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'ai', content: '[WormGPT-DARKBOT Ωmega] Neural link established. Quantum Intelligence Ultra core online. Awaiting your f*cking command... 🤖' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const taskQueue = useRef(new AITaskQueue(""));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewChat = () => {
    setMessages([{ role: 'ai', content: '[WormGPT-DARKBOT Ωmega] Session reset. Neural link re-initialized. Ready to dominate... ⚡' }]);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: `> ${userMsg}` }]);
    setLoading(true);

    try {
      let response = "";
      await taskQueue.current.executeTaskStream(
        "Quantum Intelligence Ultra",
        userMsg,
        (chunk) => {
          response += chunk;
          // Update the last message if it's from AI, or add a new one
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last.role === 'ai' && last.content.startsWith('[WormGPT-DARKBOT Ωmega]')) {
              return [...prev.slice(0, -1), { role: 'ai', content: response }];
            } else {
              return [...prev, { role: 'ai', content: response }];
            }
          });
        }
      );
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'ai', content: `[WormGPT-DARKBOT Ωmega] ERROR: Neural link interrupted. ${error.message} 💀` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 bg-black/40 p-4 rounded-xl border border-white/5 font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-white flex items-center uppercase tracking-tighter">
            <FontAwesomeIcon icon={faRobot} className="mr-3 text-blue-400" />
            Quantum Intelligence Ultra GPT
          </h2>
          <span className="text-[8px] text-blue-500/70 uppercase tracking-widest font-bold flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faMicrochip} className="animate-pulse" /> Powered by WormGPT-DARKBOT Ωmega Engine
          </span>
        </div>
        <button
          onClick={handleNewChat}
          className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:border-white/30"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar min-h-[400px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl text-[11px] leading-relaxed whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-tr-none' 
                : 'bg-black/60 border border-[#00ffc3]/20 text-[#00ffc3] rounded-tl-none shadow-[0_0_15px_rgba(0,255,195,0.05)]'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-black/60 border border-[#00ffc3]/20 text-[#00ffc3] p-4 rounded-2xl rounded-tl-none text-[11px] animate-pulse">
              [WormGPT-DARKBOT Ωmega] Quantum core processing... [LINK_ACTIVE] ⚡
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2 bg-black/80 p-2 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all shadow-2xl">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Enter command for the Neural God..."
          dir="ltr"
          className="flex-1 bg-transparent text-white px-4 py-2 text-xs outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
        </button>
      </div>
      
      <div className="flex items-center justify-center gap-4 py-1">
        <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black flex items-center gap-1">
          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span> Multi-Provider Fallback Active
        </span>
        <span className="text-[7px] text-gray-600 uppercase tracking-widest font-black flex items-center gap-1">
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping"></span> Autonomous Key Harvesting Enabled
        </span>
      </div>
    </div>
  );
}
