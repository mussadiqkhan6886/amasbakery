import cloudinary from "@/lib/config/cloudinary"
import { connectDB } from "@/lib/config/db"
import { Product } from "@/lib/models/ProductSchema"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, {params}: {params: Promise<{id:string}>}) => {
    const {id} = await params

    try{
        const data = await Product.findById(id)
        if(!data){
            return NextResponse.json({error: "Failed to find product"}, {status: 404})
        }
        return NextResponse.json({message: "Fetched", data}, {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({error: "failed to fetch data"}, {status: 500})
    }
}

export const DELETE = async (req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()

    const {id} = await params

    if(!id){
        return NextResponse.json({error: "Id required"}, {status: 400})
    }

    try{
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
        );
    }catch(err){
        console.log(err)
        return NextResponse.json({error: "Failed To Delete Menu Product"}, {status: 500})
    }
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();
  const id = (await params).id;

  try {
    const contentType = req.headers.get("content-type");

    // 1️⃣ Handle image deletion
    if (contentType?.includes("application/json")) {
          const body = await req.json();
          if (body.action === "deleteImage") {
            await Product.findByIdAndUpdate(id, { $pull: { image: body.imageUrl } });
            return NextResponse.json({ success: true });
          }
        }

    // 2️⃣ Handle form data update
    const formData = await req.formData();
    
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
    const uploadedImages: string[] = [];

    for (const file of files) {
         if (typeof file === "string" || !file?.arrayBuffer) {
          console.log("Skipping invalid file:", file);
          continue; // Skip invalid entries
        }
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "amasbakery" }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }).end(buffer);
      });
      uploadedImages.push((uploadRes as any).secure_url);
    }

     // 🔹 Fetch existing product to merge images
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Merge existing images with newly uploaded images
    const updatedImages = [...existingProduct.image, ...uploadedImages];

    // Build update object
    const updateQuery = {
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
        image: updatedImages,
        flavors,
        varieties,
        isActive,
    };

    // Update in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updateQuery, { new: true });

    return NextResponse.json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: err.message },
      { status: 500 }
    );
  }
};