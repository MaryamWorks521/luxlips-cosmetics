export type ProductCategory = 'all' | 'matte' | 'satin' | 'gloss' | 'oil' | 'sets' | 'liner';

export type ShadeFamily = 'Nude' | 'Red' | 'Berry' | 'Pink' | 'Coral' | 'Plum';
export type Undertone = 'Warm' | 'Cool' | 'Neutral' | 'Universal';
export type FinishType = 'Velvet Matte' | 'Hydrating Satin' | 'High-Gloss' | 'Botanical Oil' | 'Transfer-Proof Stain';

export interface Shade {
  id: string;
  name: string;
  hex: string;
  family: ShadeFamily;
  image: string;
  swatchNote: string;
  modelImage?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  shade: string;
  verified: boolean;
  title: string;
  comment: string;
  skinTone: 'Fair' | 'Light' | 'Medium' | 'Tan' | 'Deep';
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Bestseller' | 'Award Winner' | 'New Formula' | 'Limited Edition' | 'Vegan Choice';
  description: string;
  finish: FinishType;
  undertone: Undertone;
  coverage: 'Sheer' | 'Medium Buildable' | 'Full Pigment';
  benefits: string[];
  keyIngredients: string[];
  howToApply: string;
  shades: Shade[];
  isFeatured?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // combination of productId + shadeId
  product: Product;
  selectedShade: Shade;
  quantity: number;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // multiplier from USD
}

export type ThemeMode = 'light' | 'dark';

export interface CustomVaultItem {
  id: string;
  shades: Shade[];
  monogramText: string;
  boxFinish: 'Obsidian Gold' | 'Champagne Rose' | 'Velvet Noir';
  totalPrice: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Formulation' | 'Orders & Shipping' | 'Shade Matching' | 'Ethics & Clean';
}

export interface RunwayLook {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  lipProduct: string;
  shadeName: string;
  finish: string;
  tip: string;
  productId: string;
}
