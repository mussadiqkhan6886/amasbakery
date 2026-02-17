"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import { CustomizeOrderType, OrderStatus } from "@/type";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";

export default function CustomizeOrderTable({
  orders,
}: {
  orders: CustomizeOrderType[];
}) {
    console.log(orders)
  const [rows, setRows] = React.useState(
    orders.map((order) => ({
      id: order._id,
      orderId: order.orderId,
      userName: order.customer.fullName,
      email: order.customer.email,
      phone: order.customer.phone,
      city: order.customer.city,

      cakeFlavor: order.cakeDetails?.cakeFlavor || "-",
      cakeSize: order.cakeDetails?.cakeSize || "-",
      tierCakeSize: order.cakeDetails?.tierCakeSize || "-",
      cakeFlavorTopTier: order.cakeDetails?.cakeFlavorTopTier || "-",
      cakeFlavorBottomTier: order.cakeDetails?.cakeFlavorBottomTier || "-",
      messageOn: order.cakeDetails?.messageOn || "-",
      message: order.cakeDetails?.message || "-",
      specialInstruction: order.cakeDetails?.specialInstruction || "-",

      deliveryDate: new Date(
        order.delivery.deliveryDate
      ).toLocaleDateString(),
      deliveryTime: order.delivery.deliveryTime || "-",

      totalAmount: order.pricing?.totalAmount || 0,
      deliveryCharges: order.pricing?.deliveryCharges || 0,

      orderStatus: order.orderStatus,
      referenceImage: order.cakeDetails?.referenceImage || [],

      createdAt: new Date(order.createdAt).toLocaleDateString(),
    }))
  );

  const [updating, setUpdating] = React.useState(false);

  const deleteOrder = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/customize-order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    { field: "userName", headerName: "Customer", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "city", headerName: "City", width: 120 },
    { field: "cakeSize", headerName: "Size", width: 100 },
    { field: "cakeFlavorTopTier", headerName: "Cake Flavor Top Tier", width: 110 },
    { field: "cakeFlavorBottomTier", headerName: "Cake Flavor Bottom Tier", width: 110 },
    { field: "messageOn", headerName: "Message On", width: 110 },
    { field: "message", headerName: "Message", width: 110 },
    { field: "specialInstruction", headerName: "Special Instruction", width: 110 },
    { field: "deliveryDate", headerName: "Delivery Date", width: 130 },
    { field: "deliveryTime", headerName: "Delivery Time", width: 120 },
    { field: "deliveryCharges", headerName: "Delivery (Rs)", width: 130 },
    { field: "totalAmount", headerName: "Total (Rs)", width: 130 },

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
                const newStatus = e.target.value as CustomizeOrderType["orderStatus"];

                setUpdating(true);

                try {
                    const res = await axios.patch(
                    `/api/customize-order/${params.row.id}`,
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
      field: "referenceImage",
      headerName: "Reference",
      width: 120,
      renderCell: (params) =>
        params.row.referenceImage.length > 0 ? params.row.referenceImage.map((item: string) => (
            <Link key={item} target="_blank" href={item}>
                <Image
                    src={item}
                    alt="Reference"
                    width={50}
                    height={50}
                    className="rounded border object-cover"
                />
            </Link>
        )) : (
          <span className="text-gray-400 text-sm">No Image</span>
        ),
    },

    { field: "createdAt", headerName: "Created At", width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="error"
            onClick={() => deleteOrder(params.row.id)}
          >
            <FiTrash size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
}
