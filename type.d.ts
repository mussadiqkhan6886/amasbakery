export type Variety = {
  size: string;   // e.g., "6inch", "box6", "box12", "box"
  price: number;
};

export interface ProductType {
  _id: string,
  name: { en: string; ar: string };
  slug: string;
  type: "menu" | "occasion-cakes";
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  varieties: Variety[];           // unified sizes + prices
  flavors?: string[];             // optional
  tiers?: string[];               // optional
  messagePrice?: number;          // optional for personalized messages
  specialInstructions?: boolean;  // optional
}

export interface ReviewType {
  _id: string
  name: {
    en: string,
    ar: string
  }
  message: {
    en: string,
    ar: string
  }
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string;
  type: string; 
  titleEn: string;
  titleAr: string;
  image: string;
  flavor?: string;
  size: string;
  price: number; // dynamic for box
  quantity: number;
  messageOn: string
  message?: string
  specialInstruction?: string
  cartKey?: string
}