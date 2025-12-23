
import React from 'react';

const EyewearJourney: React.FC = () => {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-tr from-yellow-500/5 via-transparent to-orange-600/5 pointer-events-none blur-[120px]"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-full mb-12 relative group">
            <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <img 
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1920&q=80" 
                alt="Premium designer eyeglasses close-up" 
                className="w-full h-[400px] md:h-[600px] object-cover brightness-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 -mt-24 md:-mt-32 relative z-20">
            <div className="luxury-glass p-8 md:p-16 rounded-[40px] border border-white/10 shadow-2xl text-center md:text-left backdrop-blur-3xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
                <div className="flex-shrink-0">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Your Eyewear <br />
                    <span className="gold-gradient-text">Journey</span>
                  </h2>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16">
                  <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic">
                    "We're not just selling glasses; we're crafting confidence. From prescription perfection to fashion-forward finds, get ready to be amazed."
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                     <a href="#shop" className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                       Explore The Collection
                     </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EyewearJourney;
