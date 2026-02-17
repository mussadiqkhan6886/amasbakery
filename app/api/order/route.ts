import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { CustomOrder } from "@/lib/models/CustomizeOrderSchema";
import { OrderControl } from "@/lib/models/ControlSchema";
import cloudinary from "@/lib/config/cloudinary";
import nodemailer from "nodemailer";
import { MenuOccasionOrder } from "@/lib/models/OrderSchema";


export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const formData = await req.formData();
    const file = formData.get("paymentProof");
    const orderDataString = formData.get("orderData");

    if (!orderDataString) {
      return NextResponse.json({ success: false, message: "Missing order data" }, { status: 400 });
    }

    const orderData = JSON.parse(orderDataString as string);

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "Payment proof image required" }, { status: 400 });
    }

    // 1. Upload payment proof to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadedResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "amasbakery", resource_type: "image" },
          (error, result) => (error ? reject(error) : resolve(result))
        )
        .end(buffer);
    });
    const paymentProofUrl = uploadedResult.secure_url;

    // 2. Load and Reset Order Control if it's a new day
    let control = await OrderControl.findOne();
    if (!control) {
      return NextResponse.json({ success: false, message: "Order control not configured" }, { status: 500 });
    }

    const now = new Date();
    const lastReset = new Date(control.lastResetDate);

    // If dates don't match, reset counts to 0 for the new day
    if (now.toDateString() !== lastReset.toDateString()) {
      control = await OrderControl.findOneAndUpdate(
        {},
        {
          $set: {
            "todayOrders.menuCount": 0,
            "todayOrders.occasionCount": 0,
            "todayOrders.customCount": 0,
            lastResetDate: now,
          },
        },
        { new: true }
      );
    }

    // 3. Binary Logic: Determine if order contains specific types
    // 1 full menu order (even with 10 items) = 1 limit increase
    const hasMenu = orderData.items.some((i: any) => i.orderType === "MENU") ? 1 : 0;
    const hasOccasion = orderData.items.some((i: any) => i.orderType === "OCCASION-CAKES") ? 1 : 0;

    // 4. Validate Limits
    if (hasMenu && control.todayOrders.menuCount + hasMenu > control.dailyLimits.menuLimit) {
      return NextResponse.json({
        success: false,
        message: "Menu bookings are full for today. Please try again tomorrow.",
      }, { status: 400 });
    }

    if (hasOccasion && control.todayOrders.occasionCount + hasOccasion > control.dailyLimits.occasionLimit) {
      return NextResponse.json({
        success: false,
        message: "Occasion Cake bookings are full for today. Please try again tomorrow.",
      }, { status: 400 });
    }

    // 5. Create the Order
    const newOrder = await MenuOccasionOrder.create({
      customer: orderData.customer,
      items: orderData.items, // items now include orderType from frontend
      pricing: orderData.pricing,
      delivery: orderData.delivery,
      payment: {
        method: "ONLINE", // Matches Schema Enum
        paymentStatus: "PENDING",
        paymentProofImage: paymentProofUrl,
      },
      notes: orderData.notes || "No notes",
    });

    // 6. Update OrderControl counts (Increment by 1 or 0, not item length)
    await OrderControl.updateOne(
      {},
      {
        $inc: {
          "todayOrders.menuCount": hasMenu,
          "todayOrders.occasionCount": hasOccasion,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    }, { status: 201 });

  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ success: false, message: "Failed to place order" }, { status: 500 });
  }
};


// ================= GET ALL ORDERS =================

export const GET = async () => {
  await connectDB();

  const orders = await MenuOccasionOrder.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: orders,
  });
};
