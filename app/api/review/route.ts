import { connectDB } from "@/lib/config/db";
import { ReviewSchema } from "@/lib/models/ReviewSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const reviews = await ReviewSchema.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Fetched data successfully",
        data: reviews,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Review Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { name, message } = body;

    if (
      !name?.en ||
      !name?.ar ||
      !message?.en ||
      !message?.ar
    ) {
      return NextResponse.json(
        { error: "All language fields are required" },
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
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Review Error:", error);

    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
};
