import cloudinary from '@/lib/config/cloudinary';
import { connectDB } from '@/lib/config/db';
import { TableImageSchema } from '@/lib/models/TabelImagesSchema';
import { NextResponse } from 'next/server';

// --- GET: Fetch all images for the gallery ---
export async function GET() {
  try {
    await connectDB();
    const images = await TableImageSchema.find().sort({ createdAt: -1 });
    return NextResponse.json(images, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// --- POST: Upload new image (Existing Logic) ---
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "amasbakery",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const newImage = await TableImageSchema.create({
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// --- DELETE: Remove from Cloudinary AND MongoDB ---
export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    // Extracting params from the URL (e.g., ?id=...&publicId=...)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const publicId = searchParams.get('publicId');

    if (!id || !publicId) {
      return NextResponse.json({ error: "Missing ID or PublicID" }, { status: 400 });
    }

    // 1. Delete from Cloudinary
    const cloudinaryRes = await cloudinary.uploader.destroy(publicId);
    
    if (cloudinaryRes.result !== 'ok' && cloudinaryRes.result !== 'not found') {
      throw new Error("Cloudinary deletion failed");
    }

    // 2. Delete from MongoDB
    await TableImageSchema.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message || "Deletion failed" }, { status: 500 });
  }
}