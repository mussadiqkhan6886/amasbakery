import mongoose from "mongoose";

const orderControlSchema = new mongoose.Schema(
  {
    isOrderingEnabled: {
      type: Boolean,
      default: true,
    },

    dailyLimits: {
      menuLimit: { type: Number, default: 2 },
      occasionLimit: { type: Number, default: 2 },
      customLimit: { type: Number, default: 1 },
    },

    todayOrders: {
      menuCount: { type: Number, default: 0 },
      occasionCount: { type: Number, default: 0 },
      customCount: { type: Number, default: 0 },
    },
    lastResetDate: {
        type: Date,
        default: Date.now
    }

  },
  { timestamps: true }
);

export const OrderControl =
  mongoose.models.OrderControl ||
  mongoose.model("OrderControl", orderControlSchema);
