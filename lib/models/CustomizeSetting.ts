import mongoose from "mongoose";

const CustomizeSettingsSchema = new mongoose.Schema({
  realCakePricePerLb: { type: Number, default: 70 },
  dummyCakePricePerLb: { type: Number, default: 10 },
  minTotalWeight: { type: Number, default: 3 },
  deliveryFeeKhobar: { type: Number, default: 25 },
  deliveryFeeDammam: { type: Number, default: 35 },
  flavors: { type: [String], default: ["Vanilla Raspberry", "Chocolate Moist", "Pistachio"] },
  cream: { type: [String], default: ["Whipping Cream", "Butter Cream", "Founded Cake"] },
  maxTiers: { type: Number, default: 3 }
}, { timestamps: true });

// We only want ONE document ever for settings
export const CustomizeSettings = mongoose.models.CustomizeSettings || mongoose.model("CustomizeSettings", CustomizeSettingsSchema);