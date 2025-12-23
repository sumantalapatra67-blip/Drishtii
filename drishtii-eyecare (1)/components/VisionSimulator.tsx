
import React, { useState } from 'react';

type LensType = 'Normal' | 'Blue-Cut' | 'Polarized' | 'Photochromic';

const VisionSimulator: React.FC = () => {
  const [activeLens, setActiveLens] = useState<LensType>('Normal');

  const lensOptions: { type: LensType; description: string; color: string; overlay: string }[] = [
    { 
      type: 'Normal', 
      description: 'Standard clear vision with high clarity.', 
      color: 'bg-white/10',
      overlay: 'bg-transparent'
    },
    { 
      type: 'Blue-Cut', 
      description: 'Blocks harmful digital blue light to reduce eye strain.', 
      color: 'bg-blue-500/20',
      overlay: 'bg-blue-500/5 mix-blend-multiply backdrop-sepia-[0.2]'
    },
    { 
      type: 'Polarized', 
      description: 'Eliminates glare from surfaces like water or roads.', 
      color: 'bg-slate-800/20',
      overlay: 'bg-black/40 grayscale-[0.2] contrast-[1.4]'
    },
    { 
      type: 'Photochromic', 
      description: 'Lenses that darken automatically in sunlight.', 
      color: 'bg-amber-800/20',
      overlay: 'bg-amber-900/30 brightness-75 transition-all duration-1000'
    }
  ];

  const currentLens = lensOptions.find(l => l.type === activeLens)!;

  return (
    <section id="simulation" className="py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            🔬 VISION TECHNOLOGY SIMULATOR
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Experience the <span className="gold-gradient-text">Difference</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-black">
            Switch between our premium lens technologies to see how they protect your eyes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Simulator */}
          <div className="relative rounded-[48px] overflow-hidden aspect-video shadow-2xl border border-white/10 group">
             <img 
               src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
               alt="Landscape for vision simulation" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className={`absolute inset-0 transition-all duration-700 ${currentLens.overlay}`}></div>
             
             {/* Lens Frame UI */}
             <div className="absolute inset-0 border-[30px] border-black/40 rounded-[48px] pointer-events-none"></div>
             
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl">
                   <h4 className="text-white font-black uppercase italic text-lg tracking-tighter">{activeLens} Pro</h4>
                   <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mt-1">Drishtii Premium Lens Tech</p>
                </div>
                <div className="flex gap-2">
                   {[1, 2, 3].map(i => (
                     <div key={i} className={`w-1 h-8 rounded-full ${activeLens === 'Normal' ? 'bg-white/20' : 'bg-yellow-500/40 animate-pulse'}`}></div>
                   ))}
                </div>
             </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
             {lensOptions.map((opt) => (
               <button
                 key={opt.type}
                 onClick={() => setActiveLens(opt.type)}
                 className={`w-full text-left p-8 rounded-[32px] border transition-all duration-500 flex items-center gap-8 ${
                   activeLens === opt.type 
                   ? 'bg-white/5 border-yellow-500/50 shadow-[0_20px_40px_rgba(255,215,0,0.1)] translate-x-4' 
                   : 'bg-transparent border-white/5 hover:border-white/20'
                 }`}
               >
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 ${opt.color}`}>
                    <i className={`fas ${opt.type === 'Normal' ? 'fa-eye' : opt.type === 'Blue-Cut' ? 'fa-laptop' : opt.type === 'Polarized' ? 'fa-sun' : 'fa-adjust'} text-xl text-white`}></i>
                 </div>
                 <div>
                   <h5 className="text-white font-black uppercase italic text-lg tracking-tighter mb-2">{opt.type} Technology</h5>
                   <p className="text-slate-500 text-xs font-medium leading-relaxed">{opt.description}</p>
                 </div>
                 <div className="ml-auto">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${activeLens === opt.type ? 'bg-yellow-500 border-yellow-500 scale-125' : 'border-white/20'}`}></div>
                 </div>
               </button>
             ))}
             
             <div className="pt-8">
               <a 
                href={`https://wa.me/919064000639?text=Hi, I tried the Vision Simulator. I am interested in ${activeLens} lenses!`}
                className="w-full block text-center bg-white/5 hover:bg-yellow-500 hover:text-black text-white py-5 rounded-3xl font-black uppercase tracking-widest border border-white/10 transition-all"
               >
                 Consult Lens Expert
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSimulator;
