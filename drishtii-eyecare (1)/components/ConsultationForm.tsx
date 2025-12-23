
import React, { useState } from 'react';
import { SHOP_DETAILS } from '../constants';

const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    faceShape: '',
    budget: '',
    screenTime: '',
    brands: '',
    note: ''
  });

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.faceShape || !formData.budget || !formData.screenTime || !formData.brands) {
      alert('Please fill all required fields!');
      return;
    }
    
    const message = `Hi Drishtii Eyecare 👓\n\n` +
      `I am interested in the ₹999 Complete Glasses Offer / Style Analysis.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Face Shape: ${formData.faceShape}\n` +
      `Budget: ${formData.budget}\n` +
      `Screen Time: ${formData.screenTime}\n` +
      `Frames wanted: ${formData.brands}\n` +
      `Note: ${formData.note || 'None'}\n\n` +
      `Please help me with this offer. 🔥`;

    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="consultation" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[45%] h-[45%] bg-yellow-500 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[45%] h-[45%] bg-orange-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-lg shadow-yellow-500/10">
              👓 FREE CONSULTATION
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">
              Perfect Frames <br />
              <span className="gold-gradient-text">Start Here</span>
            </h2>
            <h3 className="text-2xl font-bold text-slate-400 mb-8 uppercase tracking-widest italic">
              Face Shape + Budget Analysis
            </h3>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 max-w-xl">
              Tell us your face shape, budget & screen time. Get personalized Ray-Ban/Vogue recommendations + lens upgrade options in 2 minutes.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="luxury-glass p-8 md:p-12 rounded-[48px] shadow-2xl relative group border border-white/10 hover:border-yellow-500/30 transition-all duration-700">
              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name *</label>
                    <input 
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Phone Number</label>
                    <input 
                      type="tel"
                      placeholder="9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Your Face Shape *</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none"
                    value={formData.faceShape}
                    onChange={e => setFormData({...formData, faceShape: e.target.value})}
                  >
                    <option value="" className="bg-[#050505]">Oval / Round / Square / Heart?</option>
                    <option value="Oval" className="bg-[#050505]">Oval (most versatile)</option>
                    <option value="Round" className="bg-[#050505]">Round (square frames best)</option>
                    <option value="Square" className="bg-[#050505]">Square (round frames best)</option>
                    <option value="Heart" className="bg-[#050505]">Heart (bottom heavy frames)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Budget *</label>
                    <select 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="" className="bg-[#050505]">₹2K / ₹4K / ₹6K+?</option>
                      <option value="₹2000-3000" className="bg-[#050505]">₹2K-3K (Entry premium)</option>
                      <option value="₹4000-5000" className="bg-[#050505]">₹4K-5K (Ray-Ban level)</option>
                      <option value="₹6000+" className="bg-[#050505]">₹6K+ (Luxury brands)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Screen Time *</label>
                    <select 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none"
                      value={formData.screenTime}
                      onChange={e => setFormData({...formData, screenTime: e.target.value})}
                    >
                      <option value="" className="bg-[#050505]">2hr / 6hr / 10hr+?</option>
                      <option value="2-4 hours" className="bg-[#050505]">2-4 hours (basic)</option>
                      <option value="5-8 hours" className="bg-[#050505]">5-8 hours (blue-cut)</option>
                      <option value="10+ hours" className="bg-[#050505]">10+ hours (Zeiss Pro)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Preferred Brands/Style *</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none"
                    value={formData.brands}
                    onChange={e => setFormData({...formData, brands: e.target.value})}
                  >
                    <option value="" className="bg-[#050505]">Ray-Ban / Vogue / Others?</option>
                    <option value="Ray-Ban Aviator" className="bg-[#050505]">Ray-Ban Aviator (classic)</option>
                    <option value="Vogue Round" className="bg-[#050505]">Vogue Round (trendy)</option>
                    <option value="Titan EyePlus" className="bg-[#050505]">Titan Eye+ (Indian fit)</option>
                    <option value="Any - surprise me!" className="bg-[#050505]">Any - surprise me!</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Power / Lenses / Notes</label>
                  <textarea 
                    placeholder="Enter power or lens requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all h-20"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black py-6 rounded-3xl font-black text-lg uppercase tracking-widest shadow-[0_15px_40px_rgba(255,165,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-4"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  Claim ₹999 Offer
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
