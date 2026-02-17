"use client";

import { useEffect } from "react";
import axios from "axios";

export default function ResetOrder() {
  useEffect(() => {
    const refreshDailyLimits = async () => {
      try {
        await axios.post("/api/reset-orders");
      } catch (error) {
        console.error("Failed to refresh daily limits:", error);
      }
    };

    refreshDailyLimits();
  }, []);

  return (
    null
  );
}
