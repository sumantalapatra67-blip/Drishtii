
import React, { useState, useEffect } from 'react';
import { SHOP_DETAILS } from '../constants';

const AICallingAgent: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'calling' | 'connected' | 'done'>('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

  const scriptStages = [
    { title: "Initiation", bengali: "নমস্কার! আমি দৃষ্টি আইকেয়ার থেকে বলছি। আপনি কি বলছেন?", english: "Namaskar! This is Drishtii Eyecare. Am I speaking with you?" },
    { title: "Context", bengali: "আমাদের ক্লিনিকে এখন কম্পিউটার ব্যবহারকারীদের জন্য ফ্রি আই চেক-আপ চলছে।", english: "We are offering free eye check-ups for computer users currently." },
    { title: "Need Identification", bengali: "আপনার কি চোখে কোনো সমস্যা আছে? যেমন- ঝাপসা দেখা বা মাথা ব্যথা?", english: "Are you facing any eye issues like blurred vision or headaches?" },
    { title: "Appointment Offer", bengali: "আপনি চাইলে আমরা কাল বা পরশু আপনার জন্য একটি অ্যাপয়েন্টমেন্ট বুক করতে পারি।", english: "We can book a quick appointment for you tomorrow or the day after." },
    { title: "Confirmation", bengali: "ঠিক আছে, আমি আপনার স্লট কনফার্ম করছি। আমি হোয়াটসঅ্যাপে ডিটেইলস পাঠিয়ে দিচ্ছি।", english: "Perfect, I'm confirming your slot and sending details on WhatsApp." }
  ];

  useEffect(() => {
    let interval: any;
    if (step === 'connected') {
      interval = setInterval(() => {
        setCurrentScriptIndex(prev => {
          if (prev < scriptStages.length - 1) return prev + 1;
          setStep('done');
          return prev;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const initiateCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setStep('calling');
    setTimeout(() => setStep('connected'), 2500);
  };

  const reset = () => {
    setStep('idle');
    setCurrentScriptIndex(0);
  };

  return (
    <section id="ai-voice" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="luxury-glass rounded-[48px] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group">
          
          {/* Background Voice Wave Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
             <div className="w-[500px] h-[500px] border-[10px] border-blue-500 rounded-full animate-ping"></div>
             <div className="absolute w-[300px] h-[300px] border-[10px] border-yellow-500 rounded-full animate-pulse"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                AI Voice Concierge (Grace)
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
                Get an Immediate <br />
                <span className="gold-gradient-text">AI Guidance Call</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                Experience Bethuadahari's first AI-powered optical assistant. Our "Grace" AI will call you to discuss your vision needs, explain current offers, and book your priority slot in Bengali or English.
              </p>

              {step === 'idle' && (
                <form onSubmit={initiateCall} className="space-y-4 animate-in fade-in duration-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 group"
                  >
                    <i className="fas fa-phone-alt group-hover:rotate-12 transition-transform"></i>
                    Initiate AI Voice Call
                  </button>
                </form>
              )}

              {(step === 'calling' || step === 'connected' || step === 'done') && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step === 'connected' ? 'bg-green-500 text-black' : 'bg-blue-500 text-white animate-pulse'}`}>
                         <i className={`fas ${step === 'done' ? 'fa-check' : 'fa-phone-volume'}`}></i>
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{step === 'calling' ? 'Dialing...' : step === 'done' ? 'Call Completed' : 'Connected Live'}</p>
                         <h4 className="text-white font-black uppercase italic">{phoneNumber}</h4>
                       </div>
                    </div>
                    {step === 'connected' && (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-green-500 rounded-full animate-[bounce_1s_infinite]"></div>
                        <div className="w-1 h-6 bg-green-500 rounded-full animate-[bounce_1.2s_infinite]"></div>
                        <div className="w-1 h-4 bg-green-500 rounded-full animate-[bounce_1.4s_infinite]"></div>
                      </div>
                    )}
                  </div>

                  <div className="min-h-[120px] flex flex-col justify-center">
                    <p className="text-yellow-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Stage: {scriptStages[currentScriptIndex].title}</p>
                    <p className="text-white text-lg font-medium italic leading-relaxed mb-4">"{scriptStages[currentScriptIndex].bengali}"</p>
                    <p className="text-slate-500 text-xs italic">"{scriptStages[currentScriptIndex].english}"</p>
                  </div>

                  {step === 'done' && (
                    <button 
                      onClick={reset}
                      className="mt-8 w-full border border-white/10 text-slate-400 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Call Again / New Inquiry
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
               <div className="luxury-glass p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">How it works</h4>
                  <ul className="space-y-6">
                    {[
                      { i: '1', t: 'Request Call', d: 'Enter your number and AI Grace initiates a dial instantly.' },
                      { i: '2', t: 'Voice Interaction', d: 'AI speaks in fluent Bengali or Hinglish to understand your eye problems.' },
                      { i: '3', t: 'Auto Scheduling', d: 'AI books your slot and sends a WhatsApp confirmation map link.' }
                    ].map(item => (
                      <li key={item.i} className="flex gap-6 group">
                        <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-white group-hover:border-blue-500 transition-colors">{item.i}</span>
                        <div>
                          <p className="text-white font-black uppercase italic tracking-tighter mb-1">{item.t}</p>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4 opacity-40">
                     <i className="fas fa-shield-alt text-blue-500"></i>
                     <p className="text-[8px] font-black uppercase tracking-widest">Powered by 11Labs-Grace & DrishtiiBot Engine</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AICallingAgent;
