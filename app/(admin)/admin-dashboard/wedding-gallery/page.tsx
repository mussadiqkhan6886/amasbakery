"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { FiTrash2, FiUploadCloud, FiImage } from "react-icons/fi";
import imageCompression from "browser-image-compression";

const WeddingGalleryHandler = () => {
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    const res = await axios.get("/api/wedding");
    if (res.data.success) setImages(res.data.data);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select images");

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);

    try {
      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressedFile);
      }

      const res = await axios.post("/api/wedding", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setFiles([]);
        setPreviews([]);
        setTitle("");
        fetchGallery();
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    const res = await axios.delete(`/api/wedding?id=${id}`);
    if (res.data.success) fetchGallery();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">Manage Wedding Gallery</h2>

      <form onSubmit={handleUpload} className="space-y-4 mb-10 p-6 bg-gray-50 rounded-xl">
        <input
          type="text"
          placeholder="Collection Title (Optional)"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full border-2 border-dashed p-4 rounded-lg bg-white"
        />

        {/* Previews */}
        <div className="flex gap-2 overflow-x-auto py-2">
          {previews.map((src, i) => (
            <img key={i} src={src} className="h-20 w-20 object-cover rounded shadow" alt="preview" />
          ))}
        </div>

        <button
          disabled={uploading}
          className="w-full bg-main text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          {uploading ? "Processing..." : <><FiUploadCloud /> Upload Images</>}
        </button>
      </form>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group aspect-square rounded-lg overflow-hidden border">
            <img src={img.imageUrl} className="w-full h-full object-cover" alt="" />
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full "
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingGalleryHandler;