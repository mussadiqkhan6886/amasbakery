"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";
import { MenuOccasionOrderType } from "@/type";

export default function MenuOrderTable({
  orders,
}: {
  orders: MenuOccasionOrderType[];
}) {
  // Mapping logic remains the same - ensuring keys match the columns
  console.log(orders)
  const [rows, setRows] = React.useState(
    orders.map((order: MenuOccasionOrderType) => ({
      id: order._id,
      orderId: order.orderId,
      userName: order.customer.fullName,
      email: order.customer.email,
      phone: order.customer.phone,
      city: order.customer.city,
      productNames: order.items.map((i) => i.name).join(" | "),
      cakeFlavor: order.items.map((i) => i.flavor).filter(Boolean).join(" | ") || "-",
      cakeSize: order.items.map((i) => i.size).filter(Boolean).join(" | ") || "-",
      messageOn: order.items.map((i) => i.messageOn).filter((m) => m !== "noMessage").join(" | ") || "-",
      message: order.items.map((i) => i.message).filter(Boolean).join(", ") || "-",
      specialInstruction: order.items.map((i) => i.specialInstructions).filter(Boolean).join(" | ") || "-",
      deliveryDate: new Date(order.delivery.deliveryDate).toLocaleDateString(),
      deliveryTime: order.delivery.deliveryTimeSlot || "-",
      deliveryCharges: order.pricing.deliveryCharges,
      totalAmount: order.pricing.total,
      orderStatus: order.orderStatus,
      paymentProof: order.payment.paymentProofImage || null,
      createdAt: new Date(order.createdAt).toLocaleDateString(),
    }))
  );

  const [updating, setUpdating] = React.useState(false);

  const deleteOrder = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      // Changed endpoint to match your new order API
      const res = await axios.delete(`/api/order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((order) => order.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    { field: "userName", headerName: "Customer", width: 150 },
    { field: "productNames", headerName: "Items", width: 200 }, // Added this column
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "city", headerName: "City", width: 100 },
    { field: "cakeSize", headerName: "Size", width: 130 },
    { field: "messageOn", headerName: "Msg On", width: 100 },
    { field: "message", headerName: "Message", width: 130 },
    { field: "specialInstruction", headerName: "Special Instructions", width: 150 },
    { field: "deliveryDate", headerName: "Date", width: 110 },
    { field: "deliveryTime", headerName: "Time", width: 100 },
    { field: "totalAmount", headerName: "Total (Rs)", width: 100 },

     {
          field: "orderStatus",
          headerName: "Status",
          width: 190,
          renderCell: (params) => {
            const getColor = (status: string) => {
              switch (status) {
                case "PENDING":
                  return "#facc15";
                case "CONFIRMED":
                  return "#60a5fa";
                case "PREPARING":
                  return "#a78bfa";
                case "READY":
                  return "#34d399";
                case "OUT_FOR_DELIVERY":
                  return "#22c55e";
                case "DELIVERED":
                  return "#16a34a";
                case "CANCELLED":
                  return "#f87171";
                default:
                  return "#9ca3af";
              }
            };
    
            const handleChange = async (
                    e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                    const newStatus = e.target.value as MenuOccasionOrderType["orderStatus"];
    
                    setUpdating(true);
    
                    try {
                        const res = await axios.patch(
                        `/api/order/${params.row.id}`,
                        { orderStatus: newStatus }
                        );
    
                        if (res.data.success) {
                        setRows((prev) =>
                            prev.map((row) =>
                            row.id === params.row.id
                                ? { ...row, orderStatus: newStatus }
                                : row
                            )
                        );
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setUpdating(false);
                    }
                    };
    
            return (
              <select
                disabled={updating}
                value={params.value}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm font-semibold"
                style={{
                  backgroundColor: getColor(params.value),
                  color: "white",
                }}
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="DESIGN_APPROVED">Design Approved</option>
                <option value="PREPARING">Preparing</option>
                <option value="READY">Ready</option>
                <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            );
          },
        },

    {
      field: "paymentProof",
      headerName: "Payment Proof",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Link target="_blank" href={params.value}>
            <Image
              src={params.value}
              alt="Payment Proof"
              width={50}
              height={50}
              className="rounded border object-cover h-[50px]"
            />
          </Link>
        ) : (
          <span className="text-gray-400 text-sm">No Proof</span>
        ),
    },

    { field: "createdAt", headerName: "Ordered At", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteOrder(params.row.id)}>
          <FiTrash size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", bgcolor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell": { py: 1 },
        }}
      />
    </Box>
  );
}