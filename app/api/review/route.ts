import { connectDB } from "@/lib/config/db"
import { ReviewSchema } from "@/lib/models/ReviewSchema"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    await connectDB()

    try{
        const res = await ReviewSchema.find({})
        return NextResponse.json({message: "Fetched data successfully", data:res}, {status: 200})
    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({error: "Failed to fetch reviews" + err.message}, {status:500})
    }
    
}

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const review = await ReviewSchema.create({
      name,
      message,
    });

    return NextResponse.json(
      {
        message: "Successfully added new review",
        review,
      },
      { status: 201 } // 201 for created
    );
  } catch (error: any) {
    console.error("POST Review Error:", error);

    return NextResponse.json(
      { error: "Failed to add review", details: error.message },
      { status: 500 }
    );
  }
};
