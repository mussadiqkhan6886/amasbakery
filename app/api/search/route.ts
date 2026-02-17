import { connectDB } from "@/lib/config/db";
import { Product } from "@/lib/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  // Use dot notation to reach inside the name and category objects
  const products = await Product.find({
    $or: [
      { "name.en": { $regex: query, $options: "i" } },
      { "name.ar": { $regex: query, $options: "i" } },
      { "category.en": { $regex: query, $options: "i" } },
      { "category.ar": { $regex: query, $options: "i" } },
    ],
  });

  return NextResponse.json({ products });
}