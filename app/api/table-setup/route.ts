import { connectDB } from '@/lib/config/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // Must be false for 587
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_APP_PASSWORD,
     },
     tls: {
       // This helps bypass the "Client network socket disconnected" error 
       // by allowing the TLS handshake to complete even if the certificate 
       // verification is strict.
       rejectUnauthorized: false,
       minVersion: "TLSv1.2"
     },
   });

    const adminMail = {
      from: `"${data.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `NEW SETUP REQUEST: ${data.occasion}`,
      html: `
        <h3>New Table Setup Details</h3>
        <p><strong>Customer:</strong> ${data.name} (${data.email})</p>
        <p><strong>Date:</strong> ${data.setupDate} at ${data.completionTime}</p>
        <p><strong>Location:</strong> ${data.locationType} (Parking: ${data.freeParking})</p>
        <p><strong>Guests:</strong> ${data.guestCount}</p>
        <p><strong>Theme:</strong> ${data.colorTheme}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Spoons Required:</strong> ${data.requireSpoons}</p>
        <p><strong>Desserts:</strong> ${data.desserts.join(', ')}</p>
      `,
    };

    // 2. Customer Confirmation (Minimalist Receipt)
    const customerMail = {
      from: `"Amass Bakery" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `We've received your setup request!`,
      text: `Hi ${data.name}, thank you for choosing Amass Bakery. We have received your request for the ${data.occasion} on ${data.setupDate}. Our team will contact you shortly to confirm the details.`,
    };

    // Execute both sends
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(customerMail)
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}