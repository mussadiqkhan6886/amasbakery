import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  size: String,
  flavor: String,
  quantity: Number,
  messageOn: String,
  message: String,
  specialInstructions: String,
  orderType: {
      type: String,
      enum: ["MENU", "OCCASION-CAKES"],
      required: true,
    },
});

const menuOccasionOrderSchema = new mongoose.Schema(
  {
    orderId: {type: String, default: () => uuidv4(), unique: true},
    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },

    items: [orderItemSchema],

    pricing: {
      subtotal: { type: Number, required: true },
      deliveryCharges: { type: Number, required: true },
      total: { type: Number, required: true },
    },

   
notes: { type: String, default: "No notes" },

    delivery: {
      deliveryDate: { type: Date, required: true },
      deliveryTimeSlot: String,
      deliveryType: {
        type: String,
        enum: ["DELIVERY", "PICKUP"],
      },
    },


    payment: {
      method: {
        type: String,
        enum: ["ONLINE"],
        default: "ONLINE",
      },
      paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        default: "PENDING"
      },
      paymentProofImage: String, // image URL
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
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

export const MenuOccasionOrder =
  mongoose.models.MenuOccasionOrder ||
  mongoose.model("MenuOccasionOrder", menuOccasionOrderSchema);
