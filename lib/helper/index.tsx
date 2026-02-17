import { connectDB } from "@/lib/config/db";
import { OrderControl } from "@/lib/models/ControlSchema";

export const getAndResetOrderControl = async () => {
  await connectDB();
  let orderControl = await OrderControl.findOne();

  if (!orderControl) {
    orderControl = await OrderControl.create({});
  }

  // Use Saudi Timezone for the reset
  const today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"}));
  today.setHours(0, 0, 0, 0);

  if (!orderControl.lastResetDate || orderControl.lastResetDate < today) {
    orderControl.todayOrders.customCount = 0;
    orderControl.todayOrders.menuCount = 0;
    orderControl.todayOrders.occasionCount = 0;
    orderControl.lastResetDate = today;
    await orderControl.save();
  }

  return JSON.parse(JSON.stringify(orderControl)); // Serialize for RSC
};