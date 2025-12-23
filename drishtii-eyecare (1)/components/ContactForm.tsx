
import React, { useState } from 'react';
import { SHOP_DETAILS } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const messageTemplate = `Hi Drishtii Eyecare 👓\n\n` +
      `General Inquiry from Website:\n\n` +
      `Name: ${formData.name}\n` +
      `Contact: ${formData.contact}\n` +
      `Message: ${formData.message}\n\n` +
      `Please get back to me. ✅`;

    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(messageTemplate)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="luxury-glass p-12 rounded-[40px] border border-white/10 shadow-2xl text-center">
          <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">
            Need Expert <span className="gold-gradient-text">Assistance?</span>
          </h2>
          <p className="text-slate-500 mb-10 font-bold uppercase tracking-widest text-xs">
            Directly connect with our Bethuadahari styling team
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text"
                required
                placeholder="👤 Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="text"
                required
                placeholder="📱 Phone or Email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all"
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
              />
            </div>
            <textarea 
              required
              placeholder="✉️ Your Message..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all h-32"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
            <button 
              type="submit"
              className="w-full bg-white/10 hover:bg-yellow-500 hover:text-black text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all border border-white/20 hover:border-yellow-500"
            >
              Send WhatsApp Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
