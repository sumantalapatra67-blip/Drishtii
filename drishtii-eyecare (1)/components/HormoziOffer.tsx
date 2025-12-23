
import React, { useState, useEffect } from 'react';
import { SHOP_DETAILS } from '../constants';

const HormoziOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3600 * 2 + 47 * 60 + 13); // 2h 47m 13s
  const [pairsLeft, setPairsLeft] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const scarcityTimer = setInterval(() => {
      setPairsLeft((prev) => (prev > 3 ? prev - (Math.random() > 0.8 ? 1 : 0) : prev));
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(scarcityTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `🚨 *URGENT: I WANT THE ₹999 GRAND SLAM OFFER!* 🚨\n\n` +
      `I saw the limited offer on your website and want to claim one of the remaining ${pairsLeft} pairs.\n\n` +
      `Package Includes:\n` +
      `- Choice Frame (TR/Metal)\n` +
      `- Power Lenses (-1 to -6)\n` +
      `- Anti-Blue Coating\n` +
      `- Free Eye Test\n` +
      `- 1-Year Warranty\n` +
      `- Free Delivery\n\n` +
      `My Name: [Type Name Here]\n` +
      `Location: Bethuadahari / Nadia`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="offer-section" className="relative py-12 px-4 bg-white overflow-hidden scroll-mt-32">
      {/* Urgency Banner */}
      <div className="absolute top-0 left-0 w-full bg-red-600 text-white py-2 text-center text-sm font-black uppercase tracking-widest animate-pulse z-20">
        🚨 STOP EVERYTHING! BETHUADAHARI'S BIGGEST PRICE DROP ENDS TONIGHT! 🚨
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white border-[6px] border-yellow-400 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(255,0,0,0.2)] overflow-hidden relative">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 md:p-12 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight uppercase italic tracking-tighter">
              ₹999 Complete <br/>Vision Package
            </h2>
            <p className="text-xl md:text-2xl font-bold opacity-90 mb-6">
              "An offer so good you'd feel stupid saying no."
            </p>
            <div className="inline-block bg-black/30 backdrop-blur-md px-6 py-2 rounded-full font-mono text-xl md:text-2xl border border-white/20">
               ⏰ OFFER ENDS IN: <span className="text-yellow-400">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Scarcity Bar */}
            <div className="mb-10 text-center">
              <p className="text-red-600 font-black text-xl mb-3 uppercase italic">
                Only {pairsLeft} Pairs Left at This Price!
              </p>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-red-600 transition-all duration-1000" 
                  style={{ width: `${(pairsLeft / 50) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Value Stack */}
            <div className="space-y-4 mb-12">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm">🎁</span>
                WHAT YOU GET FOR JUST ₹999:
              </h3>
              {[
                { item: 'YOUR CHOICE FRAME (TR/Metal)', value: '₹999' },
                { item: 'POWER LENSES (-1 to -6)', value: '₹1500' },
                { item: 'ANTI-BLUE LIGHT COATING', value: '₹500' },
                { item: 'FREE HOME EYE TEST', value: '₹999' },
                { item: '1-YEAR WARRANTY', value: '₹500' },
                { item: 'FREE EXPRESS DELIVERY', value: '₹200' },
              ].map((v, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-700 font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {v.item}
                  </span>
                  <span className="text-slate-400 font-medium line-through">{v.value}</span>
                </div>
              ))}
            </div>

            {/* Final Price Comparison */}
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-center border-2 border-dashed border-slate-300">
              <p className="text-slate-500 font-bold text-lg mb-1">TOTAL VALUE: <span className="line-through">₹4,698</span></p>
              <div className="flex items-center justify-center gap-4">
                 <span className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter">₹999</span>
                 <div className="text-left">
                    <p className="text-blue-600 font-black text-2xl leading-none">SAVE</p>
                    <p className="text-blue-600 font-black text-3xl leading-none">₹3,699</p>
                 </div>
              </div>
            </div>

            {/* CTA */}
            <button 
              onClick={handleClaim}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-3xl text-2xl md:text-3xl uppercase tracking-tighter shadow-[0_20px_50px_rgba(220,38,38,0.4)] hover:-translate-y-2 transition-all active:scale-95 group"
            >
              CLAIM MY ₹999 PAIR NOW!
              <span className="block text-sm font-bold opacity-80 mt-1 uppercase">Instant WhatsApp Confirmation</span>
            </button>

            {/* Local Language Proof */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="font-bold text-slate-800">हिन्दी:</p>
                <p className="text-sm text-slate-600">₹999 चश्मा ऑफर! फ्रेम + लेंस + फ्री आई टेस्ट। 📞 9064000639</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="font-bold text-slate-800">বাংলা:</p>
                <p className="text-sm text-slate-600">₹৯৯৯ চশমা অফার! আজই বুক করুন। ৪৭টি মাত্র বাকি!</p>
              </div>
            </div>

            <p className="text-center mt-8 text-slate-400 text-sm font-medium">
              📍 Visit us: {SHOP_DETAILS.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HormoziOffer;
