import mongoose from "mongoose";

const WeddingGallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // For Cloudinary/Storage deletion
  title: { type: String }, 
}, { timestamps: true });

export const WeddingGallery = mongoose.models.WeddingGallery || mongoose.model("WeddingGallery", WeddingGallerySchema);