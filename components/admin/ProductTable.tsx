'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';
import { ProductType } from '@/type';

interface ProductTableProps {
  products: ProductType[]; // categories with products
  setProducts: (p: any) => void
}

export default function ProductTable({ products, setProducts }: ProductTableProps) {


  const handleDelete = async (id: string) => {

    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${id}`);
      if (res.status === 200) {
        alert("Product deleted successfully!");
      }
      setProducts((prev: ProductType[]) => prev.filter((p: ProductType) => p._id !== id))
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
   
  };

  const columns: GridColDef<any>[] = [
  {
    field: 'image',
    headerName: 'Image',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      params.row.image && params.row.image.length > 0 ? (
        <img
          src={params.row.image[0]}
          alt={params.row.name.en}
          style={{ width: 60, height: 60, objectFit: 'cover' }}
        />
      ) : <span>No Image</span>
    ),
  },
  { field: 'name', headerName: 'Product Name', minWidth: 200, renderCell: (params) => (
    <h2 className="pt-2">{params.formattedValue.en}</h2>
  ) },
  {
    field: "varieties",
    headerName: "Varieties",
    width: 250,
    renderCell: (params) => {
      return (
        <div className='pt-2'>
          {params.row.varieties.map(
            (item: { size: string; price: number }, i: number) => (
              <p key={i}>
                {item.price} SAR : {item.size}
              </p>
            )
          )}
        </div>
      );
    },
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 120,
    renderCell: (params) => (
      <p>{params.formattedValue.en}</p>
    )
  },
  {
    field: 'flavors',
    headerName: 'Flavors',
    width: 220,
    renderCell: (params) => (
      <p>{params.formattedValue.join(", ")}</p>
    )
  },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 80,
    type: 'boolean',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <Box>
        <IconButton color="primary">
          <Link href={`/admin-dashboard/update-${params.row.type === "menu" ? "menu" : "occasion"}/${params.row._id}`}><Edit /></Link>
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
          <Trash />
        </IconButton>
      </Box>
    ),
  },
];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2, borderRadius: 2 }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowHeight={() => "auto"}
        getRowId={(row) => row._id} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
