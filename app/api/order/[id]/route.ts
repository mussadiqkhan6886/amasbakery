import { connectDB } from "@/lib/config/db";
import { MenuOccasionOrder } from "@/lib/models/OrderSchema";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();
    const id = (await params).id
    const deletedOrder = await MenuOccasionOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();
    const id = (await params).id;
    const { orderStatus } = await req.json();

    if (!orderStatus) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
    }

    const updatedOrder = await MenuOccasionOrder.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
