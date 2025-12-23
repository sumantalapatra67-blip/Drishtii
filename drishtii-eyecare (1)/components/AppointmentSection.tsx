
import React, { useState } from 'react';
import { SHOP_DETAILS } from '../constants';

const AppointmentSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = 
      `Hi Drishtii Eyecare 👓\n\n` +
      `I want to book an eye test.\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Area: ${form.address}\n` +
      `Preferred date: ${form.date}\n` +
      `Preferred time: ${form.time}\n` +
      `Note: ${form.note || 'None'}\n\n` +
      `Please confirm my booking. ✅`;

    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const triggerAIScan = () => {
    window.dispatchEvent(new CustomEvent('triggerAIScan'));
  };

  return (
    <section id="book" className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-yellow-500/30 rounded-[32px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-all hover:shadow-[0_60px_120px_-25px_rgba(255,107,53,0.3)] group">
          
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center">
              <div className="inline-block bg-yellow-500/10 backdrop-blur-md border border-yellow-500/40 rounded-3xl p-6 mb-8 text-center w-full max-w-sm mx-auto shadow-[0_15px_35px_rgba(234,179,8,0.2)]">
                <h4 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm uppercase tracking-wider italic">
                  Suman Talapatra
                </h4>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase italic tracking-tighter">
                5+ Years Expert Care<br />
                <span className="text-2xl opacity-80 font-bold tracking-widest text-yellow-400 uppercase">Certified Optometrist</span>
              </h2>

              <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                Experience precision computerized testing with Bethuadahari's most trusted eye care specialist. Book your exclusive consultation slot now.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                 <button 
                  onClick={triggerAIScan}
                  className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-3"
                 >
                   <i className="fas fa-magic"></i> Instant AI Scan Suggest
                 </button>
                 <a href={`tel:${SHOP_DETAILS.phone}`} className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                   <i className="fas fa-phone"></i> Direct Consultation
                 </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-[24px] p-6 md:p-8 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="👤 Full Name *" 
                    required 
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all font-medium"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder="📱 WhatsApp Number *" 
                    required 
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all font-medium"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="📍 Area (e.g. Bethuadahari Market) *" 
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all font-medium"
                  value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    required 
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all [color-scheme:dark] font-medium"
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                  />
                  <select 
                    required 
                    className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all font-medium"
                    value={form.time}
                    onChange={e => setForm({...form, time: e.target.value})}
                  >
                    <option value="" className="bg-slate-900 text-white">🕒 Preferred Time</option>
                    <option value="10:00 AM" className="bg-slate-900 text-white">10:00 AM</option>
                    <option value="11:00 AM" className="bg-slate-900 text-white">11:00 AM</option>
                    <option value="12:00 PM" className="bg-slate-900 text-white">12:00 PM</option>
                    <option value="03:00 PM" className="bg-slate-900 text-white">03:00 PM</option>
                    <option value="04:00 PM" className="bg-slate-900 text-white">04:00 PM</option>
                    <option value="05:00 PM" className="bg-slate-900 text-white">05:00 PM</option>
                  </select>
                </div>
                <textarea 
                  placeholder="📝 Note (e.g. Current power, specific issue)" 
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all font-medium h-24"
                  value={form.note}
                  onChange={e => setForm({...form, note: e.target.value})}
                />

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 text-black font-black py-5 rounded-full text-lg uppercase tracking-wider shadow-[0_15px_40px_rgba(234,179,8,0.5)] hover:shadow-[0_25px_50px_rgba(234,179,8,0.7)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-calendar-check"></i> Book My Appointment Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
