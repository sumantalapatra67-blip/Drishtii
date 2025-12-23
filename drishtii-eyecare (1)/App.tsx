
import React, { useState, useEffect } from 'react';
import { SHOP_DETAILS } from './constants';
import ProductGrid from './components/ProductGrid';
import ChatBot from './components/ChatBot';
import VirtualTryOn from './components/VirtualTryOn';
import AppointmentSection from './components/AppointmentSection';
import HormoziOffer from './components/HormoziOffer';
import TestimonialsSection from './components/TestimonialsSection';
import InsightsSection from './components/InsightsSection';
import StatsTabs from './components/StatsTabs';
import ConsultationForm from './components/ConsultationForm';
import ContactForm from './components/ContactForm';
import ImageGenerator from './components/ImageGenerator';
import EyewearJourney from './components/EyewearJourney';
import VisionSimulator from './components/VisionSimulator';
import PrescriptionSection from './components/PrescriptionSection';
import AICallingAgent from './components/AICallingAgent';

const Navbar = () => {
  return (
    <>
      {/* Premium Utility Bar */}
      <div className="fixed top-0 w-full z-[70] bg-[#D4AF37] text-black py-1 text-center text-[9px] font-black uppercase tracking-[0.4em] shadow-xl overflow-hidden">
        <div className="flex justify-center items-center gap-12 whitespace-nowrap animate-marquee-fast">
          <span>COD AVAILABLE ACROSS BETHUADAHARI</span>
          <span>•</span>
          <span>ISO 9001:2015 CERTIFIED PRECISION</span>
          <span>•</span>
          <span>7-DAY EASY RETURN POLICY</span>
          <span>•</span>
          <span>COMPLIMENTARY LENS CLEANING KIT</span>
          <span>•</span>
          <span>COD AVAILABLE ACROSS BETHUADAHARI</span>
        </div>
      </div>
      
      <nav className="fixed top-[28px] left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full mt-4 h-20 transition-all duration-500 shadow-2xl">
        <div className="px-8 h-full flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
               <span className="text-black font-black text-2xl font-display italic">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-[-0.05em] text-white uppercase font-display leading-none">
                DRISHTII <span className="gold-gradient-text">EYECARE</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1">Nadia • Est. 2018</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex gap-10 items-center font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-yellow-400 transition-colors">Avenue</a>
            <a href="#prescription-upload" className="hover:text-blue-400 transition-colors">Prescription</a>
            <a href="#shop" className="hover:text-yellow-400 transition-colors">Catalogue</a>
            <a href="#studio" className="hover:text-blue-400 transition-colors">AI Studio</a>
            <a href="#simulation" className="hover:text-green-400 transition-colors">Optics</a>
          </div>

          {/* Luxury CTA */}
          <div className="flex items-center gap-6">
            <a href={`tel:${SHOP_DETAILS.phone}`} className="hidden md:flex items-center gap-3 text-white/60 hover:text-white transition-colors">
              <i className="fas fa-headset"></i>
              <span className="text-[9px] font-black uppercase tracking-widest">Inquiry</span>
            </a>
            <a href="#book" className="bg-white text-black px-8 py-3 rounded-full font-black shadow-2xl hover:bg-yellow-500 transition-all text-[10px] uppercase tracking-[0.15em] flex items-center gap-2">
              Book Studio <i className="fas fa-chevron-right text-[8px]"></i>
            </a>
          </div>
        </div>
      </nav>
      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 20s linear infinite;
        }
      `}</style>
    </>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerAIScan = () => {
    // Dispatch event to activate component
    window.dispatchEvent(new CustomEvent('triggerAIScan'));
    // Ensure scroll happens immediately
    const target = document.getElementById('virtual-try-on');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      "Hi Drishtii Eyecare! 👓 I want to claim the Luxury Grand Slam Offer (₹999). Please share the available catalog for Bethuadahari!"
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <header id="home" className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-black">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 scale-125 pointer-events-none"
          style={{ 
            transform: `translateY(${scrollY * 0.25}px) scale(1.25)`,
            willChange: 'transform'
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-trying-on-glasses-in-an-optical-shop-34440-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-yellow-500/10 via-transparent to-transparent pointer-events-none blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
              Luxury Optometry Experience • Bethuadahari 741126
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase italic font-display animate-in fade-in slide-in-from-bottom-8 duration-1000">
            VISION <br />
            <span className="gold-gradient-text drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)]">REDEFINED</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-3xl leading-relaxed font-light tracking-wide animate-in fade-in duration-1000 delay-300">
            Bethuadahari's premier destination for high-fashion frames and clinical precision. Experience clarity at <span className="text-white italic font-display">elite standards.</span>
          </p>
          
          {/* Main CTAs - Fixed & Direct */}
          <div className="flex flex-col sm:flex-row gap-8 items-center w-full max-w-3xl justify-center">
            <button 
              onClick={handleWhatsAppClaim}
              className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-white/10 shadow-2xl hover:bg-yellow-500 hover:scale-105 transition-all text-center group"
            >
              Claim ₹999 Offer <i className="fab fa-whatsapp ml-4 group-hover:rotate-12 transition-transform"></i>
            </button>
            <button 
              onClick={triggerAIScan}
              className="w-full sm:w-auto bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-white/10 transition-all text-center flex items-center justify-center gap-4"
            >
              <i className="fas fa-magic text-yellow-500"></i> AI Face Scan
            </button>
          </div>

          {/* Value Highlights */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl opacity-60">
            {[
              { n: '5K+', l: 'Happy Eyes' },
              { n: '₹499', l: 'Starting price' },
              { n: 'ZEISS', l: 'Partner lab' },
              { n: '1HR', l: 'Express fit' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-white font-display italic mb-1">{stat.n}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </header>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <Hero />
      
      {/* Trust Badges Strip */}
      <div className="bg-[#0A0A0A] border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           {['ISO Certified', 'Premium Acetate', 'Titanium Pro', 'Zeiss Pro', 'Ray-Ban Authorized'].map(badge => (
             <div key={badge} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
               <i className="fas fa-shield-alt text-yellow-500"></i> {badge}
             </div>
           ))}
        </div>
      </div>

      <AppointmentSection />
      <div id="prescription-upload">
        <PrescriptionSection />
      </div>
      <EyewearJourney />
      
      <div id="offer">
        <HormoziOffer />
      </div>
      
      <div id="stats">
        <StatsTabs />
      </div>
      
      <div id="shop">
        <ProductGrid />
      </div>

      <VisionSimulator />
      <ImageGenerator />
      <ConsultationForm />
      <div id="virtual-try-on">
        <VirtualTryOn />
      </div>
      <InsightsSection />
      <TestimonialsSection />
      <AICallingAgent />
      <ContactForm />
      
      <footer className="bg-black border-t border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
               <h3 className="text-4xl font-black text-white font-display italic mb-8 uppercase tracking-tighter">
                Drishtii <span className="gold-gradient-text">Eyecare</span>
               </h3>
               <p className="text-slate-500 text-lg max-w-md leading-relaxed">
                Bethuadahari's most exclusive eyewear boutique. We craft confidence through clinical precision and artisanal frame selection.
               </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">Boutique Avenue</h4>
              <p className="text-slate-500 text-sm leading-loose">
                {SHOP_DETAILS.address}<br />
                Mon — Sat: 10:00 — 20:00<br />
                Sunday: Limited Slots Only
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">Concierge</h4>
              <p className="text-slate-500 text-sm leading-loose">
                {SHOP_DETAILS.phone}<br />
                {SHOP_DETAILS.email}
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">© 2018—2025 DRISHTII EYECARE BETHUADAHARI. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 text-slate-600">
               <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
               <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
      </footer>
      
      <ChatBot />
    </div>
  );
}
