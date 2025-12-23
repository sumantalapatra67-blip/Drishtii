
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SHOP_DETAILS } from '../constants';

const ImageGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Integrated the Refined AI Prompts and Master Prompt Rules
  const categories = [
    { 
      id: 'tr_flexblue', 
      name: 'TR Flexblue Pro', 
      prompt: 'Ultra-detailed product shot of TR Flexblue Series Pro sunglasses: flexible blue-tinted TR90 round frames with matte black accents, titanium core for lightness, on pure white background, polarized sun block lenses reflecting city lights, side profile view, premium photography, 8k resolution, e-commerce product shot.' 
    },
    { 
      id: 'gold_titanium', 
      name: 'Titanium Gold', 
      prompt: 'Elegant studio shot of Pro Titanium Gold Frames: polished gold titanium round urban sunglasses, lightweight hypoallergenic build, dark sun block lenses with anti-glare coating, displayed on marble surface with subtle glow, artisan handcrafted texture, top-down angle, luxury e-commerce style, sharp focus.' 
    },
    { 
      id: 'artisan_acetate', 
      name: 'Artisan Acetate', 
      prompt: 'Artisanal close-up of Artisan Acetate Urban Round Sun Block: handcrafted acetate round frames in tortoiseshell pattern with titanium inlays, premium sun block lenses transitioning from clear to dark, on wooden workbench showing craftsmanship, macro lens detail on hinges, soft indoor light, ultra-realistic.' 
    },
    { 
      id: 'urban_lifestyle', 
      name: 'Urban Lifestyle', 
      prompt: 'Dynamic action image of Titanium Gold Frames: shiny gold round frames with flexible titanium arms, UV sun block polarized lenses, urban explorer aesthetic, capturing flex movement, golden hour lighting, cinematic focus, high-end optical brand style.' 
    },
    { 
      id: 'stealth_pro', 
      name: 'Stealth Sun Block', 
      prompt: 'Photorealistic black premium wayfarer sunglasses with stealth polarized sun block lenses, minimal reflection, on clean dark gradient background, luxury boutique display style, sharp details, realistic textures.' 
    }
  ];

  const MASTER_PROMPT_PREFIX = `You are a professional luxury eyewear product photographer. 
  RULES: Each image must be visually UNIQUE. NO repeated poses or angles. 
  ONLY ONE eyewear frame visible. NO people, faces, or hands. 
  NO props like makeup or laptops. Clean, distraction-free premium background. 
  Realistic textures (acetate shine, metal gloss). E-commerce ready. 
  TARGET IMAGE: `;

  const generateImage = async (categoryPrompt: string, categoryName: string) => {
    setIsGenerating(true);
    setStatus(`Rendering ${categoryName}...`);
    setSelectedCategory(categoryName);
    
    try {
      // Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: MASTER_PROMPT_PREFIX + categoryPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let foundImage = false;
      // Iterate through candidates and parts to find the image as per guidelines
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64Data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setStatus("Mastershot developed, but data was missing. Try again.");
      } else {
        setStatus("AI Photography complete!");
      }
    } catch (error) {
      console.error("Studio Error:", error);
      setStatus("Drishtii Studio offline. Verify API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="studio" className="py-24 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              ✨ DRISHTII STUDIO AI PRO
            </div>
            <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
              Catalog <span className="gold-gradient-text">Mastery</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              Powered by Gemini 2.5 Flash Image. Generate 8K resolution, e-commerce ready mastershots for your Urban Round collections instantly. No duplicates. Pure craftsmanship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  disabled={isGenerating}
                  onClick={() => generateImage(cat.prompt, cat.name)}
                  className="bg-white/5 border border-white/10 p-6 rounded-[24px] text-left hover:border-yellow-500/50 hover:bg-white/10 transition-all group disabled:opacity-50"
                >
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover:text-yellow-500">Fix & Render</p>
                  <h4 className="text-white font-black uppercase italic">{cat.name}</h4>
                </button>
              ))}
            </div>
            
            {status && (
              <p className="mt-8 text-sm font-bold text-yellow-500/70 uppercase tracking-widest flex items-center gap-3">
                {isGenerating && <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>}
                {status}
              </p>
            )}
          </div>

          <div className="lg:w-1/2 w-full aspect-square relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative h-full bg-[#0a0a0a] rounded-[48px] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8">
              {!generatedImage && !isGenerating ? (
                <div className="text-center">
                  <i className="fas fa-camera-retro text-6xl text-white/10 mb-6"></i>
                  <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-xs">Select a series for AI Master photography</p>
                </div>
              ) : isGenerating ? (
                <div className="text-center animate-pulse">
                  <div className="w-20 h-20 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mx-auto mb-8"></div>
                  <p className="text-yellow-500 font-black uppercase tracking-[0.3em] text-sm italic">Synthesizing Unique Visual Identity...</p>
                </div>
              ) : (
                <div className="relative group w-full h-full">
                  <img 
                    src={generatedImage!} 
                    alt="Refined AI Generated Product" 
                    className="w-full h-full object-contain rounded-3xl"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-[10px] text-white font-black uppercase tracking-widest">{selectedCategory} • 2025 MASTER</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;
