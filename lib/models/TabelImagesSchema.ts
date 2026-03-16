import mongoose, { Schema, model, models } from 'mongoose';

const TableSchema = new Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // Useful for deleting from Cloudinary later
  createdAt: { type: Date, default: Date.now },
});

export const TableImageSchema = models.TableImage || model('TableImage', TableSchema);