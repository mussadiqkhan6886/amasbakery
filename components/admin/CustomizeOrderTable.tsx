"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import { CustomizeOrderType } from "@/type";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";

export default function CustomizeOrderTable({
  orders,
}: {
  orders: CustomizeOrderType[];
}) {
  // 1. Initialize state with the orders prop
  const [rows, setRows] = React.useState<any[]>([]);

  // 2. Sync state when the 'orders' prop changes (Crucial for the first load)
  React.useEffect(() => {
    const formattedRows = orders.map((order) => ({
      id: order._id,
      orderId: order.orderId,
      userName: order.customer.fullName,
      email: order.customer.email,
      phone: order.customer.phone,
      city: order.customer.city,
      address: order.customer.address,
      occasion: order.cakeDetails?.occasion || "-",
      numTiers: order.cakeDetails?.numTiers || 1,
      estimatedWeight: order.cakeDetails?.estimatedWeight || 0,
      tiersSummary: order.cakeDetails?.tiers?.map((t: any) => 
        `${t.lb}lb ${t.flavor || ""} (${t.type})`
      ).join(" | ") || "-",
      messageOn: order.cakeDetails?.messageOn || "-",
      message: order.cakeDetails?.message || "-",
      specialInstruction: order.cakeDetails?.specialInstruction || "-",
      deliveryDate: new Date(order.delivery.deliveryDate).toLocaleDateString(),
      deliveryTime: order.delivery.deliveryTime || "-",
      orderType: order.delivery.orderType || "-",
      totalAmount: order.pricing?.totalAmount || 0,
      deliveryCharges: order.pricing?.deliveryCharges || 0,
      orderStatus: order.orderStatus,
      // Fixed nested paths for Cloudinary URLs
      referenceImage: order.cakeDetails?.referenceImage || [],
      paymentProof: order.payment?.paymentProofImage || "", 
      createdAt: new Date(order.createdAt).toLocaleDateString(),
    }));
    setRows(formattedRows);
  }, [orders]);

  const [updating, setUpdating] = React.useState(false);

  const deleteOrder = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/customize-order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((order) => order.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: "ID", width: 90 },
    { field: "userName", headerName: "Customer", width: 140 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "city", headerName: "City", width: 100 },
    { field: "occasion", headerName: "Occasion", width: 100 },
    { field: "estimatedWeight", headerName: "Weight (lb)", width: 100 },
    { field: "tiersSummary", headerName: "Cake Configuration", width: 250 },
    { field: "totalAmount", headerName: "Total (SAR)", width: 110 },
    
    {
      field: "orderStatus",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        const getColor = (status: string) => {
          switch (status) {
            case "PENDING": return "#facc15";
            case "CONFIRMED": return "#60a5fa";
            case "DELIVERED": return "#16a34a";
            case "CANCELLED": return "#f87171";
            default: return "#ec4899";
          }
        };

        const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newStatus = e.target.value;
          setUpdating(true);
          try {
            const res = await axios.patch(`/api/customize-order/${params.row.id}`, { orderStatus: newStatus });
            if (res.data.success) {
              setRows((prev) => prev.map((row) => row.id === params.row.id ? { ...row, orderStatus: newStatus } : row));
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
            className="border rounded px-2 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: getColor(params.value) }}
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="READY">Ready</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        );
      },
    },

    {
      field: "referenceImage",
      headerName: "Design",
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-1 overflow-x-auto py-2">
          {params.value?.map((item: string, idx: number) => (
            <Link key={idx} target="_blank" href={item}>
              <Image src={item} alt="Ref" width={40} height={40} className="rounded border object-cover h-16 w-16" />
            </Link>
          ))}
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteOrder(params.row.id)}>
          <FiTrash size={16} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", bgcolor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
}