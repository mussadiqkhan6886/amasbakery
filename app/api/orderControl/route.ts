import { connectDB } from "@/lib/config/db"
import { OrderControl } from "@/lib/models/ControlSchema"
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectDB()

    const data = await OrderControl.findOne()
    return NextResponse.json({message: "Successfully fetched order controls", data}, {status: 200})
}

export const POST = async () => {
  try {
    await connectDB();

    // Check if already exists
    const existing = await OrderControl.findOne();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "OrderControl already exists",
          data: existing,
        },
        { status: 400 }
      );
    }

    // Create new control document
    const newControl = await OrderControl.create({
      isOrderingEnabled: true,

      dailyLimits: {
        menuLimit: 2,
        occasionLimit: 1,
        customLimit: 2,
      },

      todayOrders: {
        menuCount: 0,
        occasionCount: 0,
        customCount: 0,
      },

      lastResetDate: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "OrderControl created successfully",
        data: newControl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("OrderControl POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create OrderControl",
      },
      { status: 500 }
    );
  }
};