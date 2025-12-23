
import React from 'react';
import { TESTIMONIALS } from '../constants';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1516979187457-637a1f8ba5c0?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium eyewear collection displayed in shop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter leading-tight">
          Trusted By <span className="gold-gradient-text drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">5000+ Happy Customers</span>
        </h2>
        <p className="text-white/80 text-xl font-medium tracking-widest uppercase">
          Real people from Bethuadahari & Nadia district
        </p>
      </div>

      {/* Infinite Scroll Testimonials */}
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee flex whitespace-nowrap">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div 
              key={`${t.id}-${i}`} 
              className="mx-8 bg-[#0a0a0a]/95 backdrop-blur-[25px] border border-yellow-500/30 rounded-3xl p-12 w-[300px] md:w-[400px] flex flex-col items-center justify-center text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] hover:scale-105 hover:border-yellow-500 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl text-yellow-500/10 font-serif">❝</div>
              
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, starIdx) => (
                    <i key={starIdx} className="fas fa-star text-xs"></i>
                  ))}
                </div>
                <p className="text-white text-lg font-light italic mb-8 whitespace-normal leading-relaxed">
                  "{t.text}"
                </p>
                <h4 className="gold-gradient-text text-2xl font-black uppercase tracking-wider mb-1">
                  {t.name}
                </h4>
                <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                  {t.location}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .bg-radial-gradient {
          background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.15) 0%, transparent 50%);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
