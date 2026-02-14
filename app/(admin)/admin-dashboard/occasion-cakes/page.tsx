'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/type";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/occasion`);
        setProducts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;


  return (
    <div className="lg:p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Occasion Cakes List</h1>
      <ProductTable products={products} setProducts={setProducts} />
    </div>
  );
}
