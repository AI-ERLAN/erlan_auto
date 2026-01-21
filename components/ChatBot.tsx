
import React, { useState, useRef, useEffect } from 'react';
import { Translation, Language } from '../types';
import { GoogleGenAI } from '@google/genai';

interface ChatBotProps {
  t: Translation;
  currentLang: Language;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ t, currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize messages when component mounts or language changes (only if chat is fresh)
  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].role === 'bot')) {
      setMessages([{ role: 'bot', text: t.initialBotMessage }]);
    }
  }, [t.initialBotMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Corrected: Initialize GoogleGenAI with a named parameter and use process.env.API_KEY directly.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User asks: ${userMsg}. You are a helpful logistics assistant for ERLAN AUTO. We provide transit declarations for cars from Georgia to Kyrgyzstan. 
        IMPORTANT: Respond only in the following language: ${currentLang}. Keep answers short, professional, and helpful.`,
      });

      // Corrected: Access the generated text content using the .text property (not a method).
      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'Error processing response.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Error. Please try WhatsApp support.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200 animate-in zoom-in duration-300">
          <div className="bg-indigo-900 p-4 rounded-t-3xl flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-indigo-900 font-bold">EA</div>
              <div>
                <p className="font-bold leading-none">ERLAN AUTO Assistant</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  {t.onlineStatus}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-indigo-900 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="flex-grow bg-slate-100 border-none px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-indigo-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-900 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 hover:bg-emerald-600 transition-all group"
        >
          <i className="fa-solid fa-comments group-hover:rotate-12 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
