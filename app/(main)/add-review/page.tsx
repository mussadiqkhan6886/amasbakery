'use client';

import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const Page = () => {
  const { t, lang } = useLanguage();

  const [data, setData] = useState({
    name: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const router = useRouter()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!data.name || !data.message) return;

    try {
      setLoading(true);
      await axios.post("/api/review", data);

      setSuccess(
        t(
          "Review submitted successfully!",
          "تم إرسال المراجعة بنجاح!",
          lang
        )
      );

      router.push("/#reviews")

      setData({ name: "", message: "" });
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
          {t("Add Review", "إضافة مراجعة", lang)}
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {t("Name", "الاسم", lang)}
            </label>
            <input
              value={data.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={t("Your name", "اسمك", lang)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          {/* Review */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {t("Review", "المراجعة", lang)}
            </label>
            <textarea
              value={data.message}
              name="message"
              onChange={handleChange}
              placeholder={t(
                "Write your review...",
                "اكتب مراجعتك...",
                lang
              )}
              className="border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-main text-white font-medium py-2 rounded hover:bg-normal transition disabled:opacity-50"
          >
            {loading
              ? t("Submitting...", "جاري الإرسال...", lang)
              : t("Submit Review", "إرسال المراجعة", lang)}
          </button>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Page;
