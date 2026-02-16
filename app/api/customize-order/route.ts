import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { CustomOrder } from "@/lib/models/CustomizeOrderSchema";
import cloudinary from "@/lib/config/cloudinary";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const formData = await req.formData();

    const customer = JSON.parse(formData.get("customer") as string);
    const cakeDetails = JSON.parse(formData.get("cakeDetails") as string);
    const delivery = JSON.parse(formData.get("delivery") as string);
    const pricing = JSON.parse(formData.get("pricing") as string);

    const files = formData.getAll("image");

    const uploadedImages: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "amasbakery", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });

      uploadedImages.push(result.secure_url);
    }

    const newOrder = await CustomOrder.create({
      customer,
      cakeDetails: {
        ...cakeDetails,
        referenceImage: uploadedImages,
      },
      delivery,
      pricing,
    });

    return NextResponse.json(
      { success: true, message: "Order placed successfully", data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  await connectDB();

  const orders = await CustomOrder.find();
  return NextResponse.json({ success: true, data: orders });
};
