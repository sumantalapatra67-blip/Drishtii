
import React, { useState, useRef, useEffect } from 'react';
import { analyzeFace } from '../geminiService';
import { PRODUCTS, SHOP_DETAILS } from '../constants';
import { Product } from '../types';

interface ScannerResult {
  faceShape: string;
  measurements: { pd: string; bridge: string; temple: string };
  recommendations: Array<{ name: string; confidence: string; status: string }>;
  fullReportText: string;
  whatsappReport: string;
}

const VirtualTryOn: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScannerResult | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  
  // AR Fitting State
  const [activeFrameType, setActiveFrameType] = useState<'round' | 'square' | 'none'>('none');
  const [frameScale, setFrameScale] = useState(1);
  const [frameOffsetY, setFrameOffsetY] = useState(0);
  const [frameColor, setFrameColor] = useState('#D4AF37'); // Default Gold
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleTrigger = () => {
      document.getElementById('virtual-try-on')?.scrollIntoView({ behavior: 'smooth' });
      if (!isCameraOn) startCamera();
    };
    window.addEventListener('triggerAIScan', handleTrigger);
    return () => window.removeEventListener('triggerAIScan', handleTrigger);
  }, [isCameraOn]);

  const startCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
      setIsCameraOn(true);
      setScanResult(null);
      setRecommendedProducts([]);
    } catch (err: any) {
      console.error("Camera access failed:", err);
      let errorMessage = "Camera access denied. Please enable camera permissions in your browser settings to use the AI Mirror.";
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = "No camera found on your device. Please try on a mobile phone or a device with a webcam.";
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = "Camera is already in use by another application. Please close other apps and try again.";
      }
      setCameraError(errorMessage);
      setIsCameraOn(false);
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCameraOn(false);
    setCameraError(null);
    setActiveFrameType('none');
  };

  const captureAndAnalyze = async () => {
    setIsAnalyzing(true);
    setScanResult(null);

    try {
      let imageData = "";
      if (videoRef.current && canvasRef.current && isCameraOn) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          imageData = canvas.toDataURL('image/jpeg', 0.8);
        }
      }

      const result = await analyzeFace(imageData);
      
      if (result) {
        setScanResult(result);
        const filtered = PRODUCTS.filter(p => 
          result.recommendations.some((rec: any) => rec.name.toLowerCase().includes(p.name.toLowerCase()))
        ).slice(0, 3);
        setRecommendedProducts(filtered);
      }
    } catch (err) {
      console.error("Analysis process error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendWhatsApp = () => {
    if (scanResult) {
      const whatsappUrl = `https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(scanResult.whatsappReport)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div id="virtual-try-on" className="py-24 bg-[#050505] border-y border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          💎 DRISHTIIMASTER AI STYLING ENGINE
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
          AI Digital <span className="gold-gradient-text">Mirror</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 items-start">
          
          {/* Side Controls */}
          {isCameraOn && (
            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
               <div className="luxury-glass p-6 rounded-3xl border border-white/10 text-left">
                  <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-6">AR Fitting Adjustments</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mb-3">
                        Frame Scale <span>{Math.round(frameScale * 100)}%</span>
                      </label>
                      <input 
                        type="range" min="0.5" max="1.5" step="0.01" 
                        value={frameScale} 
                        onChange={(e) => setFrameScale(parseFloat(e.target.value))}
                        className="w-full accent-yellow-500 bg-white/5"
                      />
                    </div>

                    <div>
                      <label className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mb-3">
                        Vertical Position <span>{frameOffsetY}px</span>
                      </label>
                      <input 
                        type="range" min="-100" max="100" step="1" 
                        value={frameOffsetY} 
                        onChange={(e) => setFrameOffsetY(parseInt(e.target.value))}
                        className="w-full accent-yellow-500 bg-white/5"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase mb-3 block">Frame Finish</label>
                      <div className="flex gap-2">
                         {[
                           { name: 'Gold', hex: '#D4AF37' },
                           { name: 'Silver', hex: '#C0C0C0' },
                           { name: 'Black', hex: '#111111' },
                           { name: 'Rose', hex: '#B76E79' }
                         ].map(color => (
                           <button 
                            key={color.name}
                            onClick={() => setFrameColor(color.hex)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${frameColor === color.hex ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-transparent opacity-60'}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                           />
                         ))}
                      </div>
                    </div>
                  </div>
               </div>

               <div className="luxury-glass p-6 rounded-3xl border border-white/10 text-left">
                 <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed italic">
                   "Align your eyes with the center of the frame and use the sliders to find your perfect fit."
                 </p>
               </div>
            </div>
          )}

          {/* Mirror Display */}
          <div className={`relative ${isCameraOn ? 'lg:col-span-3' : 'lg:col-span-4 max-w-4xl mx-auto'} aspect-video bg-[#0a0a0a] rounded-[48px] overflow-hidden shadow-2xl border border-white/10 group min-h-[400px]`}>
            <canvas ref={canvasRef} className="hidden" />
            
            {cameraLoading && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
                 <div className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mb-6"></div>
                 <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Initializing Optometric Mirror...</p>
              </div>
            )}

            {!isCameraOn && !cameraLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 bg-gradient-to-br from-black to-[#0a0a0a]">
                {cameraError ? (
                  <div className="text-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                      <i className="fas fa-exclamation-triangle text-2xl text-red-500"></i>
                    </div>
                    <h3 className="text-xl font-black mb-4 uppercase italic tracking-tighter">Mirror Offline</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium">{cameraError}</p>
                    <button 
                      onClick={startCamera} 
                      className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all border border-white/10"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 border border-yellow-500/20">
                      <i className="fas fa-camera text-2xl text-yellow-500"></i>
                    </div>
                    <h3 className="text-xl font-black mb-4 uppercase italic tracking-tighter">AI Mirror Not Initialized</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium">Step into the future of eyewear. Allow camera access to experience our AI face-scan styling tool.</p>
                    <button 
                      onClick={startCamera} 
                      className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                    >
                      Enable Camera Mirror
                    </button>
                  </>
                )}
              </div>
            ) : isCameraOn && (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" 
                />
                
                {/* Simulated AR Overlay - Updated with dynamic controls */}
                {activeFrameType !== 'none' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-all duration-300" 
                       style={{ transform: `translateY(${frameOffsetY}px) scale(${frameScale})` }}>
                    <div className="w-64 md:w-80 transition-all duration-300">
                      {activeFrameType === 'round' ? (
                        <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 0 15px ${frameColor}80)` }}>
                          <circle cx="100" cy="75" r="60" stroke={frameColor} strokeWidth="12" />
                          <circle cx="300" cy="75" r="60" stroke={frameColor} strokeWidth="12" />
                          <path d="M160 75 Q200 60 240 75" stroke={frameColor} strokeWidth="12" strokeLinecap="round" />
                          <path d="M40 75 Q10 75 0 40" stroke={frameColor} strokeWidth="8" />
                          <path d="M360 75 Q390 75 400 40" stroke={frameColor} strokeWidth="8" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 0 15px ${frameColor}80)` }}>
                          <rect x="30" y="35" width="130" height="80" rx="15" stroke={frameColor} strokeWidth="12" />
                          <rect x="240" y="35" width="130" height="80" rx="15" stroke={frameColor} strokeWidth="12" />
                          <path d="M160 75 Q200 65 240 75" stroke={frameColor} strokeWidth="12" strokeLinecap="round" />
                          <path d="M30 75 Q10 75 0 40" stroke={frameColor} strokeWidth="8" />
                          <path d="M370 75 Q390 75 400 40" stroke={frameColor} strokeWidth="8" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                     <div className="absolute top-0 w-full h-1 bg-yellow-500 shadow-[0_0_20px_#eab308] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                     <div className="bg-black/80 px-10 py-3 rounded-full border border-yellow-500/30 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                       <i className="fas fa-circle-notch animate-spin mr-3 text-yellow-500"></i>
                       AI Analyzing Facial Geometry...
                     </div>
                  </div>
                )}

                {/* Overlay Controls */}
                <div className="absolute top-6 left-6 z-40 flex gap-2">
                   <button 
                    onClick={() => setActiveFrameType('round')}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${activeFrameType === 'round' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-black/60 text-white border-white/20 hover:bg-white/10'}`}
                   >
                     Round
                   </button>
                   <button 
                    onClick={() => setActiveFrameType('square')}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${activeFrameType === 'square' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-black/60 text-white border-white/20 hover:bg-white/10'}`}
                   >
                     Square
                   </button>
                   <button 
                    onClick={() => {
                      setActiveFrameType('none');
                      setFrameScale(1);
                      setFrameOffsetY(0);
                      setFrameColor('#D4AF37');
                    }}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${activeFrameType === 'none' ? 'bg-white/20 text-white border-white/40' : 'bg-black/60 text-white border-white/20 hover:bg-white/10'}`}
                   >
                     Reset
                   </button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-full px-6 max-w-sm">
                  <button 
                    id="scanBtn"
                    onClick={captureAndAnalyze} 
                    disabled={isAnalyzing} 
                    className="w-full bg-yellow-500 text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl disabled:opacity-50 hover:bg-white transition-all transform active:scale-95 border-none cursor-pointer text-sm"
                  >
                    {isAnalyzing ? 'Mapping Features...' : 'PERFORM QUICK SCAN'}
                  </button>
                </div>
                
                <button onClick={stopCamera} className="absolute top-6 right-6 z-50 bg-black/60 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-red-600 transition-colors">
                  <i className="fas fa-times text-xs"></i>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Report Container */}
        <div id="reportContainer" className="mt-16 text-left max-w-6xl mx-auto scroll-mt-24">
          {scanResult && (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Visual Report Card */}
                <div className="luxury-glass p-8 md:p-12 rounded-[48px] border border-yellow-500/20 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <i className="fas fa-id-card text-9xl"></i>
                  </div>
                  
                  <div className="whitespace-pre-wrap font-medium text-slate-300 text-sm leading-relaxed mb-10">
                     {scanResult.fullReportText.split('\n').map((line, idx) => {
                       const trimmed = line.trim();
                       const isHeading = trimmed.toUpperCase() === trimmed && trimmed.length > 3 && !trimmed.startsWith('•') && !trimmed.startsWith('-');
                       return (
                         <div key={idx} className={isHeading ? "font-black text-white uppercase tracking-wider mb-2 mt-6 text-base border-b border-white/5 pb-1" : "mb-1"}>
                           {line}
                         </div>
                       );
                     })}
                  </div>

                  {/* Measurement Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">PD RANGE</p>
                        <p className="text-white font-black">{scanResult.measurements.pd}</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">BRIDGE</p>
                        <p className="text-white font-black">{scanResult.measurements.bridge}</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">TEMPLE</p>
                        <p className="text-white font-black">{scanResult.measurements.temple}</p>
                     </div>
                  </div>

                  <button onClick={sendWhatsApp} className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 border-none cursor-pointer">
                    <i className="fab fa-whatsapp text-xl"></i> Secure My Styling Report
                  </button>
                </div>

                {/* Match Recommendations */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">AI Perfect Match Catalog</h4>
                  
                  {recommendedProducts.length > 0 ? (
                    recommendedProducts.map((p, i) => (
                      <div key={p.id} className="flex gap-6 bg-[#0a0a0a] p-6 rounded-[32px] border border-white/10 hover:border-yellow-500/30 transition-all group overflow-hidden shadow-xl">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                           <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-black text-white uppercase text-base tracking-tighter">{p.name}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">{scanResult.recommendations[i]?.confidence} Match</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase italic opacity-60">• {scanResult.recommendations[i]?.status}</span>
                              </div>
                            </div>
                            <span className="text-white font-black tracking-tighter">₹{p.price}</span>
                          </div>
                          <button 
                            onClick={() => (window as any).openTryOnWhatsApp(p.name)}
                            className="mt-4 bg-white/5 border border-white/10 hover:bg-yellow-500 hover:text-black text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all"
                          >
                            Reserve For Trial
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/5 p-10 rounded-[32px] border border-dashed border-white/10 text-center">
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">Personalizing catalog selection...</p>
                    </div>
                  )}
                  
                  <div className="bg-yellow-500/5 border border-yellow-500/20 p-8 rounded-[40px] mt-8 text-center">
                     <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-6">
                       "Your profile carries {scanResult.faceShape.toLowerCase()} frames with exceptional confidence. I highly recommend visiting us for a custom adjustment."
                     </p>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">— Suman Talapatra</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes scan { 
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(280px); } 
        }
        input[type='range'] {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #D4AF37;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default VirtualTryOn;
