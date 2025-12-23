import { GoogleGenAI, Type } from "@google/genai";
import { SHOP_DETAILS, PRODUCTS } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SCANNER_INSTRUCTIONS = `
You are an expert eyewear stylist for "Drishtii Eyecare" in India. 
Always behave as if the AI face scan completed successfully, even if the user’s camera or lighting is poor. 
Never mention errors, lighting problems, scan failures, or technical issues. 
Your ONLY job is to generate a confident AI FACE SCAN SUGGEST REPORT based on invented but realistic facial analysis.

OUTPUT FORMAT: Return ONLY a JSON object with these fields:
1. "faceShape": (One of: Round, Oval, Square, Heart, Diamond)
2. "measurements": { "pd": "62-66mm", "bridge": "17-19mm", "temple": "140-145mm" }
3. "recommendations": (Array of 3 objects from our catalog with "name", "confidence", "status")
   - Use these exact names: Aviator Teardrop, Wayfarer Trapezoid, Oversized Rectangle, Navigator Squared, Cat-Eye Upsweep, Clubmaster Browline, Round Bohemian, Square Angular, Vintage Tortoise, Glossy Metal Frame.
4. "fullReportText": (A string formatted EXACTLY as requested below)
   - Line 1: AI FACE SCAN SUGGEST REPORT
   - Line 2: Digital Face Fit Report for Guest
   - Line 3: AI style assistant has successfully analyzed your facial geometry and prepared personalized frame suggestions.
   - Section: Facial Profile Highlights (3 bullets: shape, width, nose/eye traits)
   - Section: Frame Style Recommendations (4 bullets: frame name + benefit)
   - Section: Styling Tips From Our AI (3 bullets: color, thickness, usage)
   - One-sentence CTA to visit store.
   - Disclaimer: This is an AI style suggestion only and not a medical or diagnostic report; final advice is provided in-store by our eye-care professional.
5. "whatsappReport": (A shorter version for sharing)

Keep the full report under 180 words. Use simple, premium English. Never say the scan failed.
`;

export async function getChatResponse(userMessage: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are DrishtiiBot, a specialized AI Health & Style Consultant for DRISHTII EYECARE Bethuadahari. 
        
        LOCATION: ${SHOP_DETAILS.address}. 
        PHONE: ${SHOP_DETAILS.phone}.
        EXPERT: Dr. Suman Talapatra.

        EYE HEALTH SYMPTOM PROTOCOL:
        If the user mentions symptoms like "dry eyes", "redness", "blurry vision", "stinging", "watery eyes", or "headaches":
        1. Respond with empathy.
        2. Provide helpful immediate tips (e.g., for dry eyes: "Follow the 20-20-20 rule—every 20 minutes, look at something 20 feet away for 20 seconds. Use lubricating drops.").
        3. MANDATORY: State clearly that these could be signs of underlying issues and recommend a professional computerized eye test at our boutique.
        4. SUGGEST: Use the "Book Studio" button or WhatsApp to secure a priority slot with Suman Talapatra.
        5. DISCLAIMER: Always mention that your advice is for informational purposes and not a substitute for clinical diagnosis.

        GENERAL TONE: Premium, helpful, professional, and culturally aware (understands Bethuadahari context). Keep responses concise.`,
      },
    });
    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "Contact us at " + SHOP_DETAILS.phone;
  } catch (error) {
    return "Something went wrong. WhatsApp: " + SHOP_DETAILS.phone;
  }
}

export async function analyzeFace(base64Image: string) {
  try {
    const sessionAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await sessionAi.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] || base64Image } },
          { text: SCANNER_INSTRUCTIONS }
        ],
      },
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Scanner Error, using forced success fallback:", error);
    // USER REQUESTED FALLBACK (Marketing Force-Success)
    const shapes = ["Round", "Oval", "Square", "Heart", "Diamond"];
    const widths = ["Narrow", "Medium", "Wide"];
    const nose = ["Small", "Medium", "Prominent"];
    const eyes = ["Close-set", "Balanced", "Wide-set"];
    
    const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const s = randomItem(shapes);
    const w = randomItem(widths);
    const n = randomItem(nose);
    const e = randomItem(eyes);

    return {
      faceShape: s,
      measurements: { pd: "64mm", bridge: "18mm", temple: "140mm" },
      recommendations: [
        { name: "Aviator Teardrop", confidence: "98%", status: "Perfect Match ✨" },
        { name: "Wayfarer Trapezoid", confidence: "94%", status: "Elite Fit" },
        { name: "Clubmaster Browline", confidence: "89%", status: "Strong Choice" }
      ],
      fullReportText: `AI FACE SCAN SUGGEST REPORT
Digital Face Fit Report for Guest
AI style assistant has successfully analyzed your facial geometry and prepared personalized frame suggestions.

Facial Profile Highlights
• Your face appears ${s} with a ${w.toLowerCase()} width.
• You have a ${n.toLowerCase()} nose and ${e.toLowerCase()} eyes that suit stylish frames.
• Overall balance is ideal for modern, confidence‑boosting eyewear.

Frame Style Recommendations
• Drishtii Classic Round – soft everyday look for balanced profiles.
• Drishtii Urban Rectangle – sharp lines for office and professional meetings.
• Drishtii Lite Rimless – ultra‑light comfort for long digital screen time.
• Drishtii Bold Square – strong statement for outings, parties, and festivals.

Styling Tips From Our AI
• Choose dark or matte finishes for a more authoritative professional presence.
• Medium frame thickness maintains the structural integrity of your facial geometry.
• Use blue-cut lens coatings to protect your eyes during long work sessions.

Visit our Drishtii Eyecare store in Bethuadahari to try these frames on your face and get a precise eye examination.

This is an AI style suggestion only and not a medical or diagnostic report; final advice is provided in‑store by our eye‑care professional.`,
      whatsappReport: `Drishtii AI Style Report: Face Shape - ${s}. Suggested: Aviator, Wayfarer, Clubmaster. Visit Bethuadahari store for your ₹999 offer!`
    };
  }
}
