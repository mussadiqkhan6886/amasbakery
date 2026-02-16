import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const customOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => uuidv4()
    },

    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      city: {type: String, required: true},
      address: { type: String, required: true },
    },

    cakeDetails: {
      cakeFlavor: String,
      cakeSize: String,
      tierCakeSize: String,
      cakeFlavorTopTier: String,
      cakeFlavorBottomTier: String,
      messageOn: String,
      message: String,
      specialInstruction: String,
      referenceImage: [String], 
    },

    delivery: {
      deliveryDate: { type: Date, required: true },
      deliveryTime: String,
    },

    pricing: {
      totalPrice: Number,
      deliveryCharges: Number,
      totalAmount: Number,
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "DESIGN_APPROVED",
        "PREPARING",
        "READY",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

  },
  { timestamps: true }
);

export const CustomOrder =
  mongoose.models.CustomOrder ||
  mongoose.model("CustomOrder", customOrderSchema);
