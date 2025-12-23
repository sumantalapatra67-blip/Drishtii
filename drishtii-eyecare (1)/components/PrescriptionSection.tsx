
import React, { useState, useRef, useMemo } from 'react';
import { PRODUCTS, SHOP_DETAILS } from '../constants';
import { Product, PrescriptionData } from '../types';

const PrescriptionSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState<'upload' | 'review' | 'suggestions'>('upload');
  const [rx, setRx] = useState<PrescriptionData>({
    sph: 0,
    cyl: 0,
    axis: 0,
    pd: 63
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        alert("File too large. Please upload an image under 5MB.");
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      simulateScanning();
    }
  };

  const simulateScanning = () => {
    setIsScanning(true);
    setStep('upload');
    // Simulate AI OCR Delay
    setTimeout(() => {
      setRx({
        sph: -2.75,
        cyl: -0.50,
        axis: 180,
        pd: 64
      });
      setIsScanning(false);
      setStep('review');
    }, 2500);
  };

  const suggestedFrames = useMemo(() => {
    const absSph = Math.abs(rx.sph);
    const hasAstigmatism = Math.abs(rx.cyl) > 0.75;

    return PRODUCTS.filter(p => {
      // 1. Filter by Power Strength
      let strengthMatch = false;
      if (absSph <= 2.00) {
        strengthMatch = p.category === 'TR' || p.category === 'Metal';
      } else if (absSph > 2.00 && absSph <= 6.00) {
        strengthMatch = p.category === 'Acetate' || p.category === 'Metal';
      } else {
        strengthMatch = p.category === 'Premium';
      }

      // 2. Filter by Astigmatism Shape Optimization
      let shapeMatch = true;
      if (hasAstigmatism) {
        shapeMatch = p.shape === 'Rectangle' || p.shape === 'Square';
      }

      return strengthMatch && shapeMatch;
    }).slice(0, 4);
  }, [rx]);

  const handleTryOn = (frameName: string) => {
    if ((window as any).openTryOnWhatsApp) {
      (window as any).openTryOnWhatsApp(frameName);
    }
  };

  return (
    <section id="prescription-upload" className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            🔍 DRISHTII AI VISION ENGINE
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Smart <span className="gold-gradient-text">Prescription</span> Sync
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-black leading-loose">
            Upload your test report. Our AI suggests the perfect frame engineering for your power profile.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-12 px-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
            {['Upload', 'Verify', 'Suggestions'].map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-500 ${
                  (i === 0 && step === 'upload') || (i === 1 && step === 'review') || (i === 2 && step === 'suggestions')
                  ? 'bg-yellow-500 border-yellow-500 text-black scale-125 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                  : i < (step === 'upload' ? 0 : step === 'review' ? 1 : 2)
                  ? 'bg-green-500 border-green-500 text-black'
                  : 'bg-[#0a0a0a] border-white/10 text-slate-600'
                }`}>
                  {i < (step === 'upload' ? 0 : step === 'review' ? 1 : 2) ? <i className="fas fa-check"></i> : i + 1}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${
                  (i === 0 && step === 'upload') || (i === 1 && step === 'review') || (i === 2 && step === 'suggestions')
                  ? 'text-white'
                  : 'text-slate-600'
                }`}>{s}</span>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="luxury-glass rounded-[48px] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[500px] flex flex-col justify-center">
            
            {/* Step 1: Upload */}
            {step === 'upload' && (
              <div className="flex flex-col items-center justify-center py-12">
                {!isScanning ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-lg border-2 border-dashed border-white/10 rounded-[40px] p-16 text-center cursor-pointer hover:border-yellow-500/50 hover:bg-white/5 transition-all group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                    />
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                      <i className="fas fa-cloud-upload-alt text-3xl text-yellow-500"></i>
                    </div>
                    <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">Upload Eye Test Report</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose">
                      Drag and drop your prescription image or <br />
                      <span className="text-yellow-500">click to browse from gallery</span>
                    </p>
                    <div className="mt-8 flex justify-center gap-6 grayscale opacity-40">
                       <i className="fas fa-file-medical text-2xl"></i>
                       <i className="fas fa-image text-2xl"></i>
                       <i className="fas fa-file-pdf text-2xl"></i>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative w-64 h-80 mx-auto mb-12 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                       {preview && <img src={preview} className="w-full h-full object-cover opacity-40 grayscale" alt="Scanning Preview" />}
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent animate-[scan_2s_ease-in-out_infinite] border-t-2 border-yellow-500 shadow-[0_-10px_20px_rgba(234,179,8,0.5)]"></div>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 animate-pulse">AI OCR Extractions In Progress...</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Mapping Sphere, Cylinder & Axis Data</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Verify */}
            {step === 'review' && (
              <div className="animate-in fade-in duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter">Confirm AI Extraction</h3>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed font-light">
                      Our vision engine has extracted these values. Please confirm or manually adjust them for perfect lens matching.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {[
                        { label: 'SPHERE (SPH)', key: 'sph', step: 0.25 },
                        { label: 'CYLINDER (CYL)', key: 'cyl', step: 0.25 },
                        { label: 'AXIS', key: 'axis', step: 1 },
                        { label: 'PD (PUPIL DIST)', key: 'pd', step: 1 }
                      ].map(field => (
                        <div key={field.key} className="bg-white/5 border border-white/10 p-4 rounded-2xl relative">
                           <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">{field.label}</label>
                           <input 
                              type="number" 
                              step={field.step}
                              value={(rx as any)[field.key]}
                              onChange={(e) => setRx({...rx, [field.key]: parseFloat(e.target.value)})}
                              className="bg-transparent border-none text-white font-black text-2xl w-full focus:ring-0"
                           />
                           <div className="absolute right-4 bottom-4 flex flex-col gap-1">
                              <button onClick={() => setRx({...rx, [field.key]: (rx as any)[field.key] + field.step})} className="text-slate-500 hover:text-yellow-500 transition-colors"><i className="fas fa-chevron-up text-[10px]"></i></button>
                              <button onClick={() => setRx({...rx, [field.key]: (rx as any)[field.key] - field.step})} className="text-slate-500 hover:text-yellow-500 transition-colors"><i className="fas fa-chevron-down text-[10px]"></i></button>
                           </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setStep('suggestions')}
                      className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
                    >
                      Analyze Styling Matches <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>

                  <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[400px]">
                    {preview && <img src={preview} className="w-full h-full object-cover" alt="Prescription" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2">Source Document</p>
                       <p className="text-white text-xs font-bold uppercase tracking-wider">{file?.name || 'Test_Report_Verified.pdf'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Suggestions */}
            {step === 'suggestions' && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-12">
                   <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">AI Curated <span className="gold-gradient-text">Matches</span></h3>
                   <div className="inline-flex gap-4 items-center bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Your Profile:</span>
                      <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                        {Math.abs(rx.sph) <= 2 ? 'Essential Fit' : Math.abs(rx.sph) <= 6 ? 'Structure Pro' : 'High-Index Elite'}
                      </span>
                      {Math.abs(rx.cyl) > 0.75 && <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">• Astigmatism Optimized</span>}
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {suggestedFrames.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-yellow-500/50 transition-all group overflow-hidden flex flex-col h-full">
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-900">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                          {p.category}
                        </div>
                      </div>
                      <h4 className="text-white font-black uppercase text-sm italic tracking-tighter mb-2">{p.name}</h4>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">Match: {p.shape} Shape</p>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex justify-between items-center px-1">
                           <span className="text-white font-black text-lg">₹{p.price}</span>
                           <button onClick={() => handleTryOn(p.name)} className="text-yellow-500 hover:text-white transition-colors"><i className="fas fa-magic"></i></button>
                        </div>
                        <button 
                          onClick={() => (window as any).openTryOnWhatsApp(p.name)}
                          className="w-full bg-white/5 border border-white/10 hover:bg-yellow-500 hover:text-black text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                        >
                          Reserve Pair
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 text-center">
                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-8 italic">
                     "Our engineering logic prioritizes {Math.abs(rx.sph) > 6 ? 'lens-masking depth' : 'comfort and visual field'} for your specific power."
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button onClick={() => setStep('upload')} className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        Upload New Scan
                      </button>
                      <a href={`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent("Hi Drishtii, I analyzed my prescription! SPH: "+rx.sph+", CYL: "+rx.cyl+". I want a professional consultation.")}`} className="bg-green-600 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-600/20">
                        Chat with Optometrist
                      </a>
                   </div>
                </div>
              </div>
            )}

          </div>

          <div className="mt-12 text-center">
             <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
               Disclaimer: AI suggestions are for aesthetic and comfort guidance. Final lens fitting and diagnostic verification must be performed by Dr. Suman Talapatra at our Bethuadahari boutique.
             </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </section>
  );
};

export default PrescriptionSection;
