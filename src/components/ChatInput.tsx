import React, { useState, useRef } from 'react';

interface ChatInputProps {
  handleSend: (message: string) => void;
  isContinuous: boolean;
  stopRef: React.MutableRefObject<boolean>;
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addLog: (message: string, level: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatInput: React.FC<ChatInputProps> = React.memo(({
  handleSend,
  isContinuous,
  stopRef,
  uploadedFiles,
  setUploadedFiles,
  handleFileUpload,
  addLog,
  fileInputRef
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSend = () => {
    if (!input.trim() && uploadedFiles.length === 0) return;
    handleSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isContinuous) {
        stopRef.current = true;
        addLog("SWARM: Termination signal sent.", "warning");
      } else {
        onSend();
      }
    }
  };

  return (
    <div className="mt-1.5 space-y-1">
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-1 p-1 bg-black/40 rounded border border-white/5">
          {uploadedFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-1 bg-[#dc2626]/20 border border-[#dc2626]/40 px-1 py-0.5 rounded text-[8px] text-[#dc2626]">
              <i className="fas fa-file text-[7px]"></i>
              <span className="truncate max-w-[60px]">{f.name}</span>
              <button onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-white">×</button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2 p-2 bg-black/80 border border-[#dc2626]/40 rounded-xl shadow-2xl">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          multiple 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-black border border-[#dc2626] text-[#dc2626] w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg hover:bg-[#dc2626] hover:text-white transition-all mb-1"
          title="Upload"
        >
          <i className="fas fa-paperclip text-[12px]"></i>
        </button>
        <div className="flex-1 relative min-h-[48px]">
          <textarea 
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = '48px';
              e.target.style.height = `${Math.min(Math.max(e.target.scrollHeight, 48), 200)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter task for Neural Swarm..."
            dir="ltr"
            lang="en"
            spellCheck={false}
            style={{ direction: 'ltr', unicodeBidi: 'bidi-override', height: '48px' }}
            className="w-full bg-black border border-[#dc2626]/50 rounded-lg px-3 py-2 text-sm md:text-base text-emerald-400 outline-none focus:border-[#dc2626] transition-colors font-mono text-left resize-none custom-scroll leading-relaxed"
          />
        </div>
        <button 
          onClick={() => {
            if (isContinuous) {
              stopRef.current = true;
              addLog("SWARM: Termination signal sent.", "warning");
            } else {
              onSend();
            }
          }}
          className={`${isContinuous ? 'bg-orange-600' : 'bg-[#dc2626]'} text-white w-12 h-10 flex-shrink-0 rounded-lg font-black text-[10px] uppercase hover:opacity-80 transition-all shadow-[0_0_15px_#dc2626] flex items-center justify-center mb-1`}
        >
          {isContinuous ? <i className="fas fa-stop"></i> : <i className="fas fa-paper-plane"></i>}
        </button>
      </div>
    </div>
  );
});

export default ChatInput;
