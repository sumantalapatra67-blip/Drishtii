
import React, { useState } from 'react';

const InsightItem: React.FC<{ 
  number: string; 
  title: string; 
  date: string; 
  content: string; 
  isOpen: boolean; 
  onClick: () => void 
}> = ({ number, title, date, content, isOpen, onClick }) => {
  return (
    <div className="mb-6 group">
      <div 
        className={`card cursor-pointer rounded-[24px] overflow-hidden transition-all duration-500 relative ${
          isOpen 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,215,0,0.3),0_20px_40px_-10px_rgba(255,107,53,0.4)] translate-y-[-8px]' 
          : 'bg-[#0a0a1a]/90 hover:translate-y-[-4px] border border-white/5 hover:border-yellow-500/20 shadow-xl'
        }`}
        onClick={onClick}
      >
        {/* Animated Top Border */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="p-8 flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-6 flex-1">
            <span className="flex-shrink-0 bg-gradient-to-r from-yellow-400 to-orange-600 text-black font-black px-4 py-2 rounded-xl text-sm shadow-lg shadow-yellow-500/20">
              {number}
            </span>
            <h4 className={`text-xl md:text-2xl font-black transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-6 ml-auto md:ml-0">
             <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline-block">
               {date}
             </span>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-yellow-500 text-black' : 'bg-white/5 text-slate-400'}`}>
               <i className="fas fa-chevron-down text-xs"></i>
             </div>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-8 pt-0 relative">
            <div className="absolute left-0 top-0 bottom-8 w-1 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-r-full"></div>
            <p className="text-slate-400 leading-relaxed font-light italic text-lg md:text-xl border-t border-white/5 pt-8">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const insights = [
    {
      number: '(1)',
      title: 'Why 85% Indians Need Blue Light Lenses Today',
      date: 'Dec 2025',
      content: '10+ hours of daily screen exposure strains your eyes and accelerates fatigue. Zeiss Blue-Cut lenses block 98% harmful rays while maintaining true colors. Our premium solutions, trusted by 10,000+ clients, ensure comfort, reduce headaches, and support corporate lifestyles. WhatsApp our optometrist for a free lens analysis today.'
    },
    {
      number: '(2)',
      title: 'Mastering Face Shapes for Designer Frames',
      date: 'Dec 2025',
      content: 'Oval, round, square, or heart-shaped faces? Discover how premium brands like Ray-Ban and Vogue tailor frames to enhance your features. Our stylists provide personalized guidance to match skin tones, professional attire, and lifestyle. Free virtual try-on available — reserve your consultation now to secure one of our limited slots.'
    },
    {
      number: '(3)',
      title: 'Advanced Lens Technologies Explained',
      date: 'Dec 2025',
      content: 'Explore progressive, photochromic, anti-glare, and blue-cut lenses. Understand how high-end lens technology protects eyes from daily digital stress while keeping your vision crystal clear. Free consultation via WhatsApp ensures the perfect match for your lifestyle and screen habits.'
    },
    {
      number: '(4)',
      title: 'Digital Eye Strain Solutions for Corporate India',
      date: 'Dec 2025',
      content: '85% of Indian professionals experience digital eye strain. Our premium lens solutions reduce fatigue and screen glare during long workdays. Personalized guidance, Ray-Ban or Vogue frames, and WhatsApp consultations make it effortless to protect your eyes without compromising style.'
    },
    {
      number: '(5)',
      title: 'Monsoon-Proof Your Eyes with Anti-Fog',
      date: 'Dec 2025',
      content: "Humidity, rain, and fog can obscure vision and damage premium lenses. Learn how anti-fog coatings and monsoon-ready frames maintain clarity and protect your eyes. Consult our optometrists for free lens care advice and ensure perfect vision even in India's unpredictable weather."
    },
    {
      number: '(6)',
      title: 'When to Update Your Prescription',
      date: 'Dec 2025',
      content: 'Your eyes change subtly over time. Our premium optometry services advise when to retest and update lenses, considering lifestyle, screen exposure, and Indian climate. 15+ years expertise ensures precise, comfortable vision. WhatsApp our experts for your personalized check today.'
    }
  ];

  return (
    <section id="insights" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter leading-tight">
            Premium Eye Care <br/>
            <span className="gold-gradient-text">Insights</span> for Discerning Clients
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-600 mx-auto rounded-full shadow-[0_4px_12px_rgba(255,215,0,0.4)]"></div>
        </div>

        <div className="space-y-4">
          {insights.map((item, idx) => (
            <InsightItem 
              key={idx}
              {...item}
              isOpen={activeIndex === idx}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
