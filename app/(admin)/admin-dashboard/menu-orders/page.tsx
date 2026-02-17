"use client";

import MenuOrderTable from "@/components/admin/MenuOrderTable";
import { MenuOccasionOrderType } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MenuOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`
        );
        console.log(res)
        const filtered = res.data.data.filter((order: MenuOccasionOrderType) => 
          order.items.some((item: {orderType: string}) => item.orderType === "MENU")
        );
        setOrders(filtered);
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
      <h1 className="text-2xl text-center font-semibold mb-4">Menu Orders</h1>
      <MenuOrderTable orders={orders} />
    </div>
  );
}
