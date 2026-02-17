"use client";

import CustomizeOrderTable from "@/components/admin/CustomizeOrderTable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomizeOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/customize-order`
        );
        setOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <div className="lg:p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Customize Cake Orders</h1>
      <CustomizeOrderTable orders={orders} />
    </div>
  );
}
