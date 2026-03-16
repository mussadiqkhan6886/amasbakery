'use client';

import React, { useState, useEffect } from 'react';
import { FaUpload, FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { FiX, FiLoader } from 'react-icons/fi';

interface TableImage {
  _id: string;
  imageUrl: string;
  publicId: string;
}

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Gallery States
  const [images, setImages] = useState<TableImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Fetch images on mount
  const fetchImages = async () => {
    try {
      const res = await fetch('/api/table-images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch images");
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/table-images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFile(null);
        setPreview(null);
        fetchImages(); // Refresh list
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Upload failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, publicId: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(`/api/table-images?id=${id}&publicId=${publicId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setImages(images.filter(img => img._id !== id));
      }
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-20 px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: UPLOAD FORM */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-800">New Setup Image</h2>
            
            <div className="relative group cursor-pointer">
              {!preview ? (
                <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${status === 'error' ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-black'}`}>
                  <FaUpload className={`w-6 h-6 mb-2 ${status === 'error' ? 'text-red-400' : 'text-gray-400 group-hover:text-black'}`} />
                  <span className="text-[11px] uppercase tracking-tighter text-gray-500">Select Image</span>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => {setPreview(null); setFile(null);}} className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md text-red-500"><FiX /></button>
                </div>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full mt-4 py-3 bg-black text-white text-[10px] uppercase font-bold tracking-[0.2em] rounded-md disabled:bg-gray-100 disabled:text-gray-400 transition-all"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {status === 'success' && <p className="mt-3 text-[10px] text-green-600 text-center uppercase tracking-widest">Done</p>}
            {status === 'error' && <p className="mt-3 text-[10px] text-red-500 text-center uppercase">{errorMessage}</p>}
          </div>
        </div>

        {/* RIGHT: LIVE GALLERY */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400">Current Gallery</h2>
          
          {loadingImages ? (
            <div className="flex justify-center py-20"><FiLoader className="animate-spin text-gray-300 w-8 h-8" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img._id} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                  <img src={img.imageUrl} alt="Setup" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Delete Overlay */}
                  <div className="absolute inset-0 bg-black/20 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleDelete(img._id, img.publicId)}
                      className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <div className="col-span-full py-20 border-2 border-dotted border-gray-100 rounded-xl text-center text-gray-300 text-xs uppercase tracking-widest">
                  No images found
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ImageUpload;