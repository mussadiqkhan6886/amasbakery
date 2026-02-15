import { connectDB } from "@/lib/config/db";
import { ReviewSchema } from "@/lib/models/ReviewSchema";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDB();

  try {
    const { id } = await params;

    const deletedReview = await ReviewSchema.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE Review Error:", error);

    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
};
