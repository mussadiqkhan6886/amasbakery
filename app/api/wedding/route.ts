import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/db";
import { WeddingGallery } from "@/lib/models/Wedding";
import { NextRequest, NextResponse } from "next/server";

// GET ALL IMAGES
export const GET = async () => {
  await connectDB();
  try {
    const images = await WeddingGallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};


// DELETE IMAGE
export const DELETE = async (req: NextRequest) => {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    await WeddingGallery.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
};


export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const files = formData.getAll("images");
    const title = formData.get("title") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No images found" }, { status: 400 });
    }

    const savedRecords = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Convert File to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary via Stream
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "amasbakery",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      // Save to MongoDB
      const newImage = await WeddingGallery.create({
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        title: title || "",
      });

      savedRecords.push(newImage);
    }

    return NextResponse.json({ success: true, data: savedRecords }, { status: 201 });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};