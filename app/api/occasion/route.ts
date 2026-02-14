import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/db";
import { Product } from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const GET = async () => {
  await connectDB();

  try {
    const products = await Product.find({type: "occasion-cakes"});
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    /* ---------------- Extract Fields ---------------- */

    const name_en = formData.get("name_en") as string;
    const name_ar = formData.get("name_ar") as string;
    const slug = formData.get("slug") as string;
    const type = formData.get("type") as "menu";
    const category_en = formData.get("category_en") as string;
    const category_ar = formData.get("category_ar") as string;
    const description_en = formData.get("description_en") as string;
    const description_ar = formData.get("description_ar") as string;
    const isActive = formData.get("isActive") === "true";
    const flavors = formData
  .getAll("flavors")
  .filter((x): x is string => typeof x === "string");
    const varietiesRaw = formData.get("varieties") as string;
    const varieties = JSON.parse(varietiesRaw).map((v: any) => ({
      size: v.size,
      price: Number(v.price),
    }));

    const files = formData.getAll("images");

    /* ---------------- Validation ---------------- */

    if (!name_en || !name_ar || !slug) {
      throw new Error("Missing required fields");
    }

    if (!files || files.length === 0) {
      throw new Error("No images uploaded");
    }

    /* ---------------- Upload Images ---------------- */

    const uploadedImages: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "amasbakery",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    /* ---------------- Create Product ---------------- */

    const newProduct = await Product.create({
      name: {
        en: name_en,
        ar: name_ar,
      },
      slug,
      type,
      category: {
        en: category_en,
        ar: category_ar,
      },
      description: {
        en: description_en,
        ar: description_ar,
      },
      image: uploadedImages,
      flavors,
      varieties,
      isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully!",
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}
