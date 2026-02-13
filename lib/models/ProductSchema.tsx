import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  type: "menu" | "occasion-cakes" | "custom";
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string[]; // main image
  varieties: {
    size: string;
    price: number;
    stock?: number;
  }[];
  flavors?: string[];
  tiers?: string[];
  ingredients?: string[];
  allergens?: string[];
  messagePrice?: number; // price for custom message
  specialInstructions?: boolean; // if bakery accepts notes
  isActive: boolean; // available or not
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ["menu", "occasion-cakes"], required: true },
    category: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: [String], required: true },
    varieties: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    flavors: { type: [String], default: [] },
    tiers: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    messagePrice: { type: Number, default: 0 },
    specialInstructions: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
