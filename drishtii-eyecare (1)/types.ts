
export interface ProductColor {
  name: string;
  hex: string;
}

export type FrameShape = 'Round' | 'Square' | 'Rectangle' | 'Cat-Eye' | 'Aviator';
export type FaceShape = 'Oval' | 'Round' | 'Square' | 'Heart' | 'Diamond' | 'Any';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'TR' | 'Metal' | 'Acetate' | 'Premium' | 'Kids' | 'Sunglasses';
  shape: FrameShape;
  shapes: FrameShape[];
  image: string;
  imagePrompt?: string; // For AI image generation reference
  description: string;
  sizes: string[];
  colors: ProductColor[];
  faceShapes: FaceShape[];
}

export interface PrescriptionData {
  sph: number;
  cyl: number;
  axis: number;
  pd: number;
  add?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
