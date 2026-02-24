import { connectDB } from "@/lib/config/db";
import { CustomizeSettings } from "@/lib/models/CustomizeSetting";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    let settings = await CustomizeSettings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await CustomizeSettings.create({});
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching settings" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  await connectDB();
  try {
    const body = await req.json();
    // Update the single existing settings document, or create if it somehow doesn't exist
    const settings = await CustomizeSettings.findOneAndUpdate({}, body, { new: true, upsert: true });
    
    return NextResponse.json({ success: true, message: "Settings updated successfully", data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating settings" }, { status: 500 });
  }
};