import { connectDB } from "@/lib/config/db";
import { OrderControl } from "@/lib/models/ControlSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  try {
    await connectDB();

    let orderControl = await OrderControl.findOne();

    if (!orderControl) {
      // Create default if not exists
      orderControl = await OrderControl.create({});
    }

    // Get today's date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If last reset was before today, reset counts
    if (!orderControl.lastResetDate || orderControl.lastResetDate < today) {
      orderControl.todayOrders.customCount = 0;
      orderControl.todayOrders.menuCount = 0;
      orderControl.todayOrders.occasionCount = 0;
      orderControl.lastResetDate = today;

      await orderControl.save();
      console.log("Today orders reset ✅");
    }

    return NextResponse.json({ success: true, data: orderControl });
  } catch (error) {
    console.error("Error in resetting orders:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
