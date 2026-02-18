"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useMemo, useEffect, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";
import { useRouter, useParams } from "next/navigation";

interface Variety {
  size: string;
  price: string;
}

export default function AddProductPage({params}: {params: Promise<{id: string}>}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const categories = [
  { en: "Cake", ar: "كيك" },
  { en: "Cupcake & Bites", ar: "كب كيك وقطع صغيرة" },
  { en: "Cookies & Desserts", ar: "كوكيز وحلويات" },
  { en: "Tarts & Flans", ar: "الفطائر والحلويات " },
  { en: "Bread", ar: "مخبوزات" }, // 'Bread' is often 'Makhbouzat' in retail for a better feel
  { en: "Dates & Truffles", ar: "تمور وترافل" },
  { en: "Savory", ar: "موالح" }, // 'Savory' is better translated as 'Mawalih' in food contexts
  { en: "Gift", ar: "هدايا" }, // Plural 'Gifts' usually sounds more natural for a category
];

  const [product, setProduct] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    type: "menu",
    category_en: "",
    category_ar: "",
    flavors: [] as string[],
    description_en: "",
    description_ar: "",
    isActive: true,
  });

  const [varieties, setVarieties] = useState<Variety[]>([
    { size: "", price: "" },
  ]);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  /* ---------------- Slug Generator ---------------- */

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const productSlug = useMemo(() => toSlug(product.name_en), [product.name_en]);

  useEffect(() => {
    setProduct((prev) => ({ ...prev, slug: productSlug }));
  }, [productSlug]);

  /* ---------------- Fetch Product ---------------- */

  useEffect(() => {

    const fetchData = async () => {
      try {
        const {id} = await params
        const res = await axios.get(`/api/menu/${id}`);
        const data = res.data.data;

        setProduct({
          name_en: data.name.en,
          name_ar: data.name.ar,
          slug: data.slug,
          type: "menu",
          flavors: data.flavors,
          category_en: data.category.en,
          category_ar: data.category.ar,
          description_en: data.description.en,
          description_ar: data.description.ar,
          isActive: data.isActive,
        });

        setVarieties(data.varieties || []);
        setExistingImages(data.image || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  /* ---------------- Handlers ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVarietyChange = (
    index: number,
    field: keyof Variety,
    value: string
  ) => {
    const updated = [...varieties];
    updated[index][field] = value;
    setVarieties(updated);
  };

  const addVariety = () => {
    setVarieties([...varieties, { size: "", price: "" }]);
  };

  const removeVariety = (index: number) => {
    setVarieties(varieties.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteExistingImage = async (imgUrl: string) => {
    try {
      setExistingImages((prev) => prev.filter((url) => url !== imgUrl));
        const {id} = await params
      await axios.patch(`/api/menu/${id}`, {
        action: "deleteImage",
        imageUrl: imgUrl,
      });
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        if (key !== "flavors") {
          formData.append(key, value.toString());
        }
      });

      product.flavors.forEach((flavor) => {
        formData.append("flavors", flavor);
      });

      formData.append("varieties", JSON.stringify(varieties));

      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

        formData.append("images", compressedFile);
      }
      const {id} = await params
      const res = await axios.patch(`/api/menu/${id}`, formData);

      if (res.status === 200) {
        setResult("✅ Product Updated successfully!");
        setTimeout(() => router.push("/admin-dashboard/menu"), 1500);
      }
    } catch (error) {
      console.error(error);
      setResult("❌ Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">Update Menu Product</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Active */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={product.isActive}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                isActive: e.target.checked,
              }))
            }
          />
          <label>Active</label>
        </div>
    <div className="grid md:grid-cols-2 gap-6"> <input name="name_en" value={product.name_en} placeholder="Name (English)" onChange={handleChange} className="input" required /> 
    <input name="name_ar" value={product.name_ar} placeholder="Name (Arabic)" onChange={handleChange} className="input" required /> 
    <select name="category_en" value={product.category_en} onChange={(e) => { const selected = categories.find( (c) => c.en === e.target.value ); setProduct((prev) => ({ ...prev, category_en: selected?.en || "", category_ar: selected?.ar || "", })); }} className="input" required > <option value="">Select Category</option> {categories.map((item) => ( <option key={item.en} value={item.en}> {item.en} </option> ))} </select>
     <input readOnly value={product.category_ar} className="input bg-gray-100" />
     <input
        value={product.flavors.join(",")}
        onChange={(e) =>
        setProduct((prev) => ({
            ...prev,
            flavors: e.target.value
            .split(",")
            .map((f) => f.trim()),
        }))
        }
        placeholder="Flavors (Chocolate, Vanilla, Red Velvet)"
        className="input"
    />
      </div> <input readOnly value={product.slug} className="input bg-gray-100" /> <textarea name="description_en" value={product.description_en} placeholder="Description (EN)" onChange={handleChange} className="input h-28" required /> <textarea name="description_ar" value={product.description_ar} placeholder="Description (AR)" onChange={handleChange} className="input h-28" required /> {/* Varieties */} <div> <h2 className="text-xl font-semibold mb-5"> Varieties & Pricing </h2> {varieties.map((v, i) => ( <div key={i} className="grid md:grid-cols-3 gap-4 mb-4 items-center"> <input placeholder="Size (6 inch, 1kg)" value={v.size} onChange={(e) => handleVarietyChange(i, "size", e.target.value) } className="input" required /> <input type="number" placeholder="Price" value={v.price} onChange={(e) => handleVarietyChange(i, "price", e.target.value) } className="input" required /> {varieties.length > 1 && ( <button type="button" onClick={() => removeVariety(i)} className="text-red-500 text-sm" > Remove </button> )} </div> ))} <button type="button" onClick={addVariety} className="bg-black text-white px-5 py-2 rounded-lg" > + Add Variety </button> </div> {/* Images */} <div> <label className="block mb-3 font-medium"> Upload Images </label> <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full shadow-xl p-2" /> {previews.length > 0 && ( <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-4"> {previews.map((src, i) => ( <Image key={i} src={src} alt="preview" width={130} height={130} className="w-28 h-28 object-cover rounded-lg border" /> ))} </div> )} </div>
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Existing Images:</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, i) => (
                <div key={i} className="relative">
                  <Image
                    src={url}
                    width={100}
                    height={100}
                    alt="Existing"
                    className="rounded border object-cover w-24 h-24"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(url)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rest of your original form stays same */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold"
        >
          {loading ? "Updating Product..." : "Update Product"}
        </button>

        {result && (
          <div className="mt-6 text-sm text-center font-medium">
            {result}
          </div>
        )}
      </form>
    </main>
  );
}
