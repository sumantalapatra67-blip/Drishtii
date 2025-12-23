
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../geminiService';
import { ChatMessage } from '../types';
import { SHOP_DETAILS } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Namaste! I am DrishtiiBot AI Super-Agent. 👓 How can I help you today?\n\nI can help you with frame selection, pricing, or eye health concerns like dry eyes and blurry vision.\n\nনমস্কার! আমি দৃষ্টিবট এআই। আমি আপনাকে কীভাবে সাহায্য করতে পারি?', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-5).map(m => ({ role: m.role, text: m.text }));
    const botResponseText = await getChatResponse(textToSend, history);
    
    const botMsg: ChatMessage = { role: 'model', text: botResponseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const containsHealthKeywords = (text: string) => {
    const keywords = ['dry', 'red', 'blur', 'pain', 'headache', 'itch', 'water', 'strain'];
    return keywords.some(k => text.toLowerCase().includes(k));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Trigger Button with Pulse */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open DrishtiiBot AI Assistant"
          className="group relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-3 transition-all transform hover:scale-105 border-2 border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:inline">Ask AI Expert • চশমা বিশেষজ্ঞ</span>
          <div className="relative">
             <i className="fas fa-robot text-xl"></i>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          role="dialog" 
          aria-label="DrishtiiBot Chat Window"
          className="bg-white w-[350px] md:w-[450px] h-[650px] rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex flex-col border border-slate-200 animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 flex justify-between items-center text-white relative">
            <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[-20deg] translate-x-10"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-blue-600 text-2xl shadow-lg shadow-black/10">
                D
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  DrishtiiBot AI
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </h3>
                <p className="text-[9px] text-blue-100 uppercase font-black tracking-[0.2em] opacity-80">Omni-Channel Super-Agent</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all active:scale-90"
              aria-label="Close Chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-slate-50 px-4 py-2 border-b flex gap-4 overflow-x-auto no-scrollbar">
             {['English', 'हिन्दी', 'বাংলা', 'Symptom Checker', 'Styling Tips'].map(lang => (
               <span key={lang} className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{lang}</span>
             ))}
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-5 rounded-3xl text-[13px] leading-relaxed shadow-sm transition-all relative ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                } ${m.role === 'model' && containsHealthKeywords(m.text) ? 'border-l-4 border-l-red-500 bg-red-50/30' : ''}`}>
                  {m.role === 'model' && containsHealthKeywords(m.text) && (
                    <div className="absolute -top-3 left-4 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                      Health Information
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className={`text-[8px] mt-2 font-bold uppercase tracking-widest opacity-40 ${m.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-3xl flex gap-2 items-center shadow-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t space-y-4">
            {/* Health Specific Quick Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
               {[
                 { text: 'Dry Eyes', icon: 'fa-tint-slash', color: 'bg-blue-50 text-blue-700' },
                 { text: 'Eye Redness', icon: 'fa-eye', color: 'bg-red-50 text-red-700' },
                 { text: 'Blurry Vision', icon: 'fa-low-vision', color: 'bg-purple-50 text-purple-700' }
               ].map((tag) => (
                 <button 
                  key={tag.text}
                  onClick={() => handleSend(`Tell me about ${tag.text.toLowerCase()}. I'm concerned.`)}
                  className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2 border border-transparent hover:border-current transition-all ${tag.color}`}
                 >
                   <i className={`fas ${tag.icon}`}></i> {tag.text}
                 </button>
               ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your symptoms or ask about frames..."
                className="flex-1 bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 rounded-2xl px-6 py-4 text-sm placeholder:text-slate-400 font-medium"
              />
              <button
                onClick={() => handleSend()}
                aria-label="Send Message"
                className="bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95 group"
              >
                <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
               {[
                 { icon: 'fa-calendar-check', text: 'Book Studio', color: 'bg-slate-100 text-slate-800' },
                 { icon: 'fa-percentage', text: '₹999 Offer', color: 'bg-orange-50 text-orange-700' },
                 { icon: 'fa-whatsapp', text: 'WhatsApp', color: 'bg-green-50 text-green-700' }
               ].map((action, idx) => (
                 <button 
                  key={idx}
                  onClick={() => {
                    if (action.text === 'Book Studio') {
                      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    } else if (action.text === 'WhatsApp') {
                      window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}`, '_blank');
                    } else {
                      handleSend(action.text);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-transparent hover:border-current transition-all ${action.color}`}
                 >
                   <i className={`fas ${action.icon} text-[10px]`}></i>
                   {action.text}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="p-4 text-[9px] text-center text-slate-400 bg-slate-50 uppercase font-black tracking-[0.2em] border-t border-slate-100 flex items-center justify-center gap-4">
            <span>Official Drishtii AI</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>+91 9064000639</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
