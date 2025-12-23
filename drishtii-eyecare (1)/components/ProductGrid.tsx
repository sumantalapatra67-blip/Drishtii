import React, { useState, useMemo } from 'react';
import { PRODUCTS, SHOP_DETAILS } from '../constants';
import { Product, FrameShape, FaceShape } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTryOn = () => {
    if ((window as any).openTryOnWhatsApp) {
      (window as any).openTryOnWhatsApp(product.name);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-500 shadow-2xl flex flex-col shimmer-gold hover:scale-[1.02] cursor-pointer">
      {/* Luxury Category Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
          {product.category}
        </span>
      </div>

      {/* Wishlist Heart Icon */}
      <div className="absolute top-6 right-6 z-30">
        <button 
          onClick={toggleWishlist}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl border ${
            isWishlisted 
            ? 'bg-red-500/20 border-red-500/50 text-red-500' 
            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>

      {/* Bestseller Badge (Appears on Hover) */}
      <div className="absolute top-[60px] left-6 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
        <span className="bg-yellow-500 text-black text-[7px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-[0_5px_15px_rgba(234,179,8,0.4)]">
          <i className="fas fa-crown mr-1"></i> Bestseller
        </span>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 transition-transform duration-1000">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
           <button 
             onClick={handleTryOn}
             className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-yellow-500 transition-colors transform hover:scale-110 active:scale-95 duration-300"
           >
             <i className="fas fa-magic"></i>
           </button>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-black text-2xl text-white uppercase italic tracking-tighter font-display">{product.name}</h3>
            <p className="text-slate-500 text-[9px] mt-1 uppercase font-black tracking-widest">{product.shape} Geometry</p>
          </div>
          <div className="text-right">
             <span className="text-white font-black text-2xl font-display italic">₹{product.price}</span>
          </div>
        </div>
        
        <div className="mb-8">
          {/* Detailed Description with Expandable functionality */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-12 opacity-80'}`}>
            <p className={`text-slate-400 text-[11px] leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
              {product.description} Built with meticulous precision, these frames offer unmatched comfort for {product.sizes.join(', ')} sizes. 
              {isExpanded && " Our high-definition lens compatibility ensures that your vision remains crystal clear from edge to edge."}
            </p>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="text-yellow-500 text-[9px] font-black uppercase tracking-widest mt-2 hover:text-white transition-colors"
          >
            {isExpanded ? 'Read Less -' : 'Read More +'}
          </button>
          
          <div className="flex gap-2 mt-6">
            {product.faceShapes.slice(0, 2).map(fs => (
              <span key={fs} className="text-[8px] font-black text-slate-500 border border-white/10 px-3 py-1 rounded-lg uppercase tracking-widest">{fs} Fit</span>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4">
          <button 
            onClick={() => (window as any).openTryOnWhatsApp(product.name)}
            className="bg-white text-black py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all transform active:scale-95"
          >
            Express Trial
          </button>
          <a
            href={`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(`Hi, I want to order ${product.name}`)}`}
            target="_blank"
            className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest text-center hover:bg-white/10 transition-all transform active:scale-95"
          >
            Order Secure
          </a>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
           <h2 className="text-6xl font-black text-white mb-8 uppercase italic tracking-tighter font-display">
            Artisanal <span className="gold-gradient-text">Masterpieces</span>
           </h2>
           <div className="max-w-xl mx-auto mb-16 relative group">
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-6 pl-14 pr-8 rounded-full text-white placeholder:text-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-medium"
              />
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-yellow-500"></i>
           </div>

           <div className="flex flex-wrap justify-center gap-4 mb-20">
              {['All', 'TR', 'Metal', 'Acetate', 'Premium', 'Sunglasses'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                    activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-slate-600 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
