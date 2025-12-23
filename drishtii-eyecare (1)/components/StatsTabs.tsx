
import React, { useState } from 'react';
import { SHOP_DETAILS } from '../constants';

interface TabContent {
  id: string;
  label: string;
  number: string;
  title: string;
  text: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const StatsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabContent[] = [
    {
      id: 'customers',
      label: '5K+ Customers',
      number: '5,000+',
      title: 'Happy Customers Served',
      text: 'Local families in Bethuadahari and professionals across Nadia trust us for their vision needs.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Join the Community',
      ctaLink: `https://wa.me/${SHOP_DETAILS.whatsapp}?text=Hi Drishtii, I want to be part of your 5K+ happy customers 👓`
    },
    {
      id: 'frames',
      label: '10K+ Frames Sold',
      number: '10,000+',
      title: 'Elite Frames Delivered',
      text: 'From budget-friendly TR frames to premium designer acetate, we have styled thousands of eyes in West Bengal.',
      image: 'https://images.unsplash.com/photo-1512061942530-e6e2ff6a3be1?auto=format&fit=crop&w=800&q=80',
      ctaText: 'View Bestsellers',
      ctaLink: `https://wa.me/${SHOP_DETAILS.whatsapp}?text=Hi Drishtii, show me your top frames from the 10K+ sold 🕶️`
    },
    {
      id: 'experience',
      label: '5+ Years Expert',
      number: '5+',
      title: 'Years of Vision Excellence',
      text: 'Suman Talapatra has been Bethuadahari’s go-to optometrist since 2018, delivering clinic-grade diagnostic precision.',
      image: 'https://images.unsplash.com/photo-1516979187457-637a1f8ba5c0?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Get Expert Advice',
      ctaLink: `https://wa.me/${SHOP_DETAILS.whatsapp}?text=Hi Suman, I need expert advice for my vision checkup 🔍`
    },
    {
      id: 'accuracy',
      label: '98% Fit Accuracy',
      number: '98%',
      title: 'AI Assisted Precision',
      text: 'Our AI tools and computerized testing ensure that 98% of our customers get their perfect fit and power on the first try.',
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Scan My Face',
      ctaLink: `https://wa.me/${SHOP_DETAILS.whatsapp}?text=Hi Drishtii, I want a 98% perfect frame fit analysis 📸`
    },
    {
      id: 'whatsapp',
      label: '100% WhatsApp Reply',
      number: '100%',
      title: 'Instant Support Rate',
      text: 'We pride ourselves on 100% reply rate within minutes. Order status, frame styling, or medical queries — we are here.',
      image: 'https://images.unsplash.com/photo-1509048190191-8fdc34c43c7e?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Chat Now',
      ctaLink: `https://wa.me/${SHOP_DETAILS.whatsapp}?text=Hi Drishtii, I have a quick question about my glasses 🚀`
    }
  ];

  return (
    <section className="py-24 bg-[#050505] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-yellow-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="border-b border-white/5 bg-white/[0.02]">
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 min-w-[160px] py-8 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                    activeTab === idx 
                    ? 'text-yellow-500' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  {activeTab === idx && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-600 shadow-[0_-4px_10px_rgba(255,215,0,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row items-center gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex-1 text-center lg:text-left">
                <p className="gold-gradient-text text-7xl md:text-9xl font-black italic tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  {tabs[activeTab].number}
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl">
                  {tabs[activeTab].text}
                </p>
                <a 
                  href={tabs[activeTab].ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-12 py-5 rounded-full font-black text-lg uppercase tracking-wider shadow-[0_15px_35px_rgba(255,215,0,0.3)] hover:scale-105 transition-all"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  {tabs[activeTab].ctaText}
                </a>
              </div>
              
              <div className="flex-1 relative group w-full lg:w-auto">
                <div className="absolute inset-0 bg-yellow-500/20 blur-[60px] rounded-full group-hover:bg-yellow-500/30 transition-all duration-1000 opacity-0 group-hover:opacity-100"></div>
                <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={tabs[activeTab].image} 
                    alt="Premium eyeglass product showcase"
                    className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsTabs;
