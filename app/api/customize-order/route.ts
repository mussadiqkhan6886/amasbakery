import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { CustomOrder } from "@/lib/models/CustomizeOrderSchema";
import { OrderControl } from "@/lib/models/ControlSchema";
import cloudinary from "@/lib/config/cloudinary";
import nodemailer from "nodemailer";

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

    // ✅ Upload images to Cloudinary
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

    // ✅ Check daily limit
    const control = await OrderControl.findOne();

    if (!control) {
      return NextResponse.json(
        { success: false, message: "Order control not configured" },
        { status: 500 }
      );
    }

    if (
      control.todayOrders.customCount >= control.dailyLimits.customLimit
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Custom cake bookings are full for today. Try tomorrow.",
        },
        { status: 400 }
      );
    }

    // ✅ Create order
    const newOrder = await CustomOrder.create({
      customer,
      cakeDetails: {
        ...cakeDetails,
        referenceImage: uploadedImages,
      },
      delivery,
      pricing,
    });

    // ✅ Increment today's custom order count
    await OrderControl.updateOne(
      {},
      { $inc: { "todayOrders.customCount": 1 } }
    );

    // ✅ Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // ================= ADMIN EMAIL =================
    const adminHtml = `
      <div style="font-family:Arial;padding:20px">
        <h2>🎂 New Custom Cake Order</h2>

        <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
        <p><strong>Customer:</strong> ${customer.fullName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>City:</strong> ${customer.city}</p>
        <p><strong>Cake Size:</strong> ${
          cakeDetails.cakeSize || "Not specified"
        }</p>
        <hr/>

        <p><strong>Delivery Date:</strong> ${new Date(
          delivery.deliveryDate
        ).toDateString()}</p>
        <p><strong>Delivery Time:</strong> ${
          delivery.deliveryTime || "Not specified"
        }</p>

        <p><strong>Total Amount:</strong> Rs. ${
          pricing?.totalAmount || 0
        }</p>

        <br/>
        <a href="https://amasbakery.vercel.app/admin-dashboard">
          👉 View in Admin Dashboard
        </a>
      </div>
    `;

    await transporter.sendMail({
      from: `"Amas Bakery Orders" <${process.env.EMAIL_USER}>`,
      to: "sadafsafdar18@gmail.com",
      subject: "New Custom Cake Order 🎂",
      html: adminHtml,
    });

    // ================= CUSTOMER EMAIL =================
    const customerHtml = `
      <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;border:1px solid #e5e7eb;">
        <h2>🎉 Your Custom Cake Order is Confirmed!</h2>

        <p>Hi <strong>${customer.fullName}</strong>,</p>

        <p>Thank you for choosing <strong>Amas Bakery</strong> 💕</p>

        <hr/>

        <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
        <p><strong>Delivery Date:</strong> ${new Date(
          delivery.deliveryDate
        ).toDateString()}</p>
        <p><strong>Delivery Time:</strong> ${
          delivery.deliveryTime || "Not specified"
        }</p>
        <p><strong>Cake Size:</strong> ${
          cakeDetails.cakeSize || "Not specified"
        }</p>

        <p><strong>Total Amount:</strong> Rs. ${
          pricing?.totalAmount || 0
        }</p>

        <hr/>

        <p style="font-size:14px;color:#6b7280;">
          We will contact you soon for design confirmation.
        </p>

        <p style="margin-top:20px;">
          — <strong>Amas Bakery Team</strong> 🎂
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Amas Bakery Orders" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: "Your Custom Cake Order 🎂",
      html: customerHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Custom Order Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
};

// ================= GET ALL ORDERS =================

export const GET = async () => {
  await connectDB();

  const orders = await CustomOrder.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: orders,
  });
};
