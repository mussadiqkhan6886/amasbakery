import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  type: "menu" | "occasion-cakes";
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string[];
  varieties: {
    size: string;
    price: number;
  }[];
  flavors?: string[];
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
    // tiers: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

