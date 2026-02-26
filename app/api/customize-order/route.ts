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
    const paymentProof = formData.get("paymentProof");
    const uploadedImages: string[] = [];

    if (!(paymentProof instanceof File)) {
      return NextResponse.json({ success: false, message: "Payment proof image required" }, { status: 400 });
    }

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
    

    let paymentProofImage : string ;

     const buffer = Buffer.from(await paymentProof.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "amasbakery", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });

    paymentProofImage = result.secure_url

    const finalCustomer = {
      ...customer,
      city: delivery.orderType === "pickup" ? "Pickup" : customer.city,
      address: delivery.orderType === "pickup" ? "Self Pickup" : customer.address,
    };

    // ✅ Create order
    const newOrder = await CustomOrder.create({
      customer: finalCustomer,
      cakeDetails: {
        ...cakeDetails,
        referenceImage: uploadedImages,
      },
      delivery,
      pricing,
      payment: {
        paymentProofImage
      }
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

    // ✅ Generate Tiers Summary for Email
    const tiersHtml = cakeDetails.tiers?.map((t: any, i: number) => (
      `<li style="font-size:14px;">Tier ${i + 1}: <strong>${t.lb} lb</strong> - ${t.flavor || 'N/A'} (${t.type})</li>`
    )).join("") || "No tier info";

    // ================= ADMIN EMAIL =================
    const adminHtml = `
      <div style="font-family:Arial;padding:20px; color: #333;">
        <h2 style="color: #db2777;">🎂 New Custom Cake Order</h2>

        <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
        <p><strong>Customer:</strong> ${customer.fullName}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Occasion:</strong> <span style="text-transform: capitalize;">${cakeDetails.occasion}</span></p>
        <p><strong>Total Weight:</strong> ${cakeDetails.estimatedWeight || 0} lb (Real Cake)</p>
        
        <p><strong>Tier Breakdown:</strong></p>
        <ul>${tiersHtml}</ul>

        <p><strong>Message:</strong> ${cakeDetails.message || "None"}</p>
        <p><strong>Type:</strong> ${delivery.orderType}</p>
        <hr style="border:none; border-top: 1px solid #eee;"/>

        <p><strong>Delivery/Pickup Date:</strong> ${delivery.deliveryDate}</p>
        <p><strong>Time Slot:</strong> ${delivery.deliveryTime || "Not specified"}</p>

        <p style="font-size: 18px;"><strong>Total Amount:</strong> <span style="color: #db2777;">SAR ${pricing?.totalAmount || 0}</span></p>

        <br/>
        <a href="https://amasbakery.vercel.app/admin-dashboard" style="background: #db2777; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          👉 View in Admin Dashboard
        </a>
      </div>
    `;

    await transporter.sendMail({
      from: `"Amas Bakery Orders" <${process.env.EMAIL_USER}>`,
      to: "sadafsafdar18@gmail.com",
      subject: `New Custom Order #${newOrder.orderId} 🎂`,
      html: adminHtml,
    });

    // ================= CUSTOMER EMAIL =================
    const customerHtml = `
      <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;border:1px solid #e5e7eb; color: #333;">
        <h2 style="color: #db2777;">🎉 Your Custom Cake Order is Confirmed!</h2>
        <p>Hi <strong>${customer.fullName}</strong>,</p>
        <p>Thank you for choosing <strong>Amas Bakery</strong> 💕. We have received your customization request.</p>
        <hr style="border:none; border-top: 1px solid #eee;"/>

        <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
        <p><strong>Occasion:</strong> ${cakeDetails.occasion}</p>
        <p><strong>Total Weight:</strong> ${cakeDetails.estimatedWeight || 0} lb</p>
        
        <p><strong>Configuration:</strong></p>
        <ul>${tiersHtml}</ul>

        <p><strong>Total Amount:</strong> SAR ${pricing?.totalAmount || 0}</p>

        <hr style="border:none; border-top: 1px solid #eee;"/>
        <p style="font-size:14px;color:#6b7280;">
          We will contact you soon on WhatsApp for design confirmation and payment details.
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

export const GET = async () => {
  await connectDB();
  const orders = await CustomOrder.find().sort({ createdAt: -1 });
  return NextResponse.json({
    success: true,
    data: orders,
  });
};