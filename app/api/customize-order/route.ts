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

        <p><strong>Order ID:</strong> ${newOrder.orderId.slice(0,8)}</p>
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
        <a href="https://www.amassbakery.com/admin-dashboard" style="background: #db2777; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          👉 View in Admin Dashboard
        </a>
      </div>
    `;

    await transporter.sendMail({
      from: `"Amas Bakery Orders" <${process.env.EMAIL_USER}>`,
      to: "sadafsafdar18@gmail.com",
      subject: `New Custom Order #${newOrder.orderId.slice(0,8)} 🎂`,
      html: adminHtml,
    });

    // ================= CUSTOMER EMAIL =================
   const customerHtml = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #f0f0f0; border-radius: 8px; color: #444; line-height: 1.6;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #db2777; margin-bottom: 5px;">🍰 We’ve Received Your Cake Request!</h2>
      <p style="color: #6b7280; font-size: 14px; margin-top: 0;">Order Reference: #<strong>${newOrder.orderId.slice(0,8)}</strong></p>
    </div>

    <p>Hi <strong>${customer.fullName}</strong>,</p>
    
    <p>Thank you for choosing <strong>Amas Bakery</strong> 💕. We’re excited to help make your celebration special! We have received your customization details and our team is currently reviewing them.</p>
    
    <div style="background-color: #fff5f7; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <h3 style="color: #db2777; margin-top: 0; font-size: 16px;">What Happens Next?</h3>
      <p style="margin-bottom: 0; font-size: 15px;">
        Our head baker will review your design. <strong>We will contact you shortly via WhatsApp</strong> to confirm the final design details, delivery timing, and provide you with the payment link.
      </p>
    </div>

    <hr style="border:none; border-top: 1px solid #eee; margin: 20px 0;"/>

    <h4 style="margin-bottom: 10px;">Summary of Your Request:</h4>
    <table style="width: 100%; font-size: 14px;">
      <tr>
        <td style="padding: 5px 0; color: #6b7280;">Occasion:</td>
        <td style="padding: 5px 0; text-align: right;"><strong>${cakeDetails.occasion}</strong></td>
      </tr>
      <tr>
        <td style="padding: 5px 0; color: #6b7280;">Estimated Weight:</td>
        <td style="padding: 5px 0; text-align: right;"><strong>${cakeDetails.estimatedWeight || 0} lb</strong></td>
      </tr>
      
    </table>

    <div style="margin-top: 15px;">
      <p style="font-size: 13px; color: #9ca3af; margin-bottom: 5px;">Configuration Details:</p>
      <ul style="padding-left: 20px; font-size: 13px; color: #4b5563;">${tiersHtml}</ul>
    </div>

    <hr style="border:none; border-top: 1px solid #eee; margin: 20px 0;"/>

    <p style="font-size: 14px; text-align: center; color: #6b7280;">
      Keep an eye on your WhatsApp! We'll be in touch soon.
    </p>
    
    <p style="margin-top: 30px; text-align: center; border-top: 1px solid #f9f9f9; padding-top: 20px;">
      Best regards,<br/>
      <strong>Amas Bakery Team</strong> 🎂
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