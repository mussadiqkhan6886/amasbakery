'use client';

import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const Page = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  const [data, setData] = useState({
    name: { en: "", ar: "" },
    message: { en: "", ar: "" }
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const [field, langType] = name.split(".");

    setData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof typeof prev],
        [langType]: value
      }
    }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !data.name.en ||
      !data.name.ar ||
      !data.message.en ||
      !data.message.ar
    ) {
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/review", data);

      router.push("/#reviews");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 mt-10 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Review
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-4">

          {/* Name English */}
          <input
            type="text"
            name="name.en"
            placeholder="Name (English)"
            value={data.name.en}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Name Arabic */}
          <input
            type="text"
            name="name.ar"
            placeholder="الاسم (عربي)"
            value={data.name.ar}
            onChange={handleChange}
            className="border p-2 rounded"
            dir="rtl"
          />

          {/* Message English */}
          <textarea
            name="message.en"
            placeholder="Review (English)"
            value={data.message.en}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Message Arabic */}
          <textarea
            name="message.ar"
            placeholder="المراجعة (عربي)"
            value={data.message.ar}
            onChange={handleChange}
            className="border p-2 rounded"
            dir="rtl"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-main text-white py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>
    </main>
  );
};

export default Page;
