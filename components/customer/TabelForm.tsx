'use client';
import React, { useState, ChangeEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FormState {
  name: string;
  email: string;
  setupDate: string;
  completionTime: string;
  locationType: string;
  freeParking: string;
  guestCount: string;
  colorTheme: string;
  occasion: string;
  requireSpoons: string;
  budget: string;
  desserts: string[];
}

const TabelForm = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const isRtl = lang === 'ar';
  const [error, setError] = useState<string | null>(null);

  // 1. Unified State for all fields
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    setupDate: '',
    completionTime: '',
    locationType: '',
    freeParking: '',
    guestCount: '',
    colorTheme: '',
    occasion: '',
    requireSpoons: '',
    budget: '',
    desserts: [],
  });

  const dessertOptions = [
    "cake", "cupcakes", "mini cupcakes", "cake pops", 
    "ginger bread cookies", "sable cookies", "cold set desert", 
    "brownies", "brownies bites"
  ];

  const budgetOptions = ["500 to 800 SAR", "850 to 1200 SAR", "1250 to 1500 SAR", "1500+ SAR"];

  // 2. Generic Change Handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Multi-select Handler for Desserts
  const handleDessertChange = (item: string) => {
    setFormData((prev) => {
      const isSelected = prev.desserts.includes(item);
      return {
        ...prev,
        desserts: isSelected 
          ? prev.desserts.filter((d) => d !== item) 
          : [...prev.desserts, item],
      };
    });
  };

  // Generate 24hr options (00:00 to 23:00)
  const timeOptions = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/table-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t('Request Sent Successfully!', 'تم إرسال الطلب بنجاح!', lang));
        // Optional: Reset form
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Style Helpers
  const getInputClass = (val: string) => `
    w-full bg-transparent border-b py-3 text-sm outline-none transition-all duration-500 font-light
    ${val ? 'border-black' : 'border-gray-300'}
    ${isRtl ? 'text-right' : 'text-left'}
    focus:border-black placeholder:text-gray-500
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-16 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <input 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          placeholder={t("Full Name", "الاسم الكامل", lang)} 
          className={getInputClass(formData.name)} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange}
          placeholder={t("Email", "البريد الإلكتروني", lang)} 
          className={getInputClass(formData.email)} 
          required 
        />
        
        <div className="flex flex-col">
          <label className={`text-[10px] uppercase tracking-widest mb-1 ${formData.setupDate ? 'text-black' : 'text-gray-500'}`}>
            {t("Setup Date", "تاريخ التنسيق", lang)}
          </label>
          <input 
            name="setupDate" 
            type="date" 
            value={formData.setupDate} 
            onChange={handleChange}
            className={getInputClass(formData.setupDate)} 
            required 
          />
        </div>

       <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{t("Completion Time", "وقت الانتهاء", lang)}</label>
          <select name="completionTime" className={`${getInputClass} border-gray-200`} onChange={handleChange} required>
            <option value="">{t("Select Time", "اختر الوقت", lang)}</option>
            {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </div>

        <select name="locationType" value={formData.locationType} onChange={handleChange} className={getInputClass(formData.locationType)} required>
          <option value="" disabled>{t("Location Type", "نوع الموقع", lang)}</option>
          <option value="House/Flat">{t("House/Flat", "منزل / شقة", lang)}</option>
          <option value="Venue">{t("Venue", "قاعة / مكان مناسبة", lang)}</option>
        </select>

        <select name="freeParking" value={formData.freeParking} onChange={handleChange} className={getInputClass(formData.freeParking)} required>
          <option value="" disabled>{t("Free Parking?", "هل يتوفر مواقف؟", lang)}</option>
          <option value="Yes">{t("Yes", "نعم", lang)}</option>
          <option value="No">{t("No", "لا", lang)}</option>
        </select>

        <select name="requireSpoons" value={formData.requireSpoons} onChange={handleChange} className={getInputClass(formData.requireSpoons)} required>
          <option value="" disabled>{t("Require Spoons?", "تتطلب ملاعق ", lang)}</option>
          <option value="Yes">{t("Yes", "نعم", lang)}</option>
          <option value="No">{t("No", "لا", lang)}</option>
        </select>

        <input 
          name="guestCount" 
          type="number" 
          value={formData.guestCount} 
          onChange={handleChange}
          placeholder={t("Approx. Guests", "عدد الضيوف", lang)} 
          className={getInputClass(formData.guestCount)} 
          required 
        />
        <input 
          name="colorTheme" 
          value={formData.colorTheme} 
          onChange={handleChange}
          placeholder={t("Color Theme", "ثيم الألوان", lang)} 
          className={getInputClass(formData.colorTheme)} 
          required 
        />
      </div>

      {/* Budget State-Driven Tiles */}
      <div className="space-y-6">
        <label className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-bold block text-center md:text-start">
          {t("Budget Range", "ميزانية التنسيق", lang)}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetOptions.map((range) => {
            const isSelected = formData.budget === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                className={`py-5 px-4 border text-[10px] tracking-widest uppercase transition-all duration-500 ${
                  isSelected ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-100 hover:border-gray-300'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desserts State-Driven Multi-Select */}
      <div className="space-y-6">
        <label className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-bold block text-center md:text-start">
          {t("Desserts Selection", "اختيار الحلويات", lang)}
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {dessertOptions.map(item => {
            const isChecked = formData.desserts.includes(item);
            return (
              <div 
                key={item} 
                onClick={() => handleDessertChange(item)}
                className="group flex items-center cursor-pointer select-none"
              >
                <div className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 ${
                  isChecked ? 'bg-black border-black' : 'bg-transparent border-gray-200 group-hover:border-black'
                }`}>
                  {isChecked && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={`text-xs tracking-wide uppercase transition-colors duration-300 ${
                  isChecked ? 'text-black font-medium' : 'text-gray-500 group-hover:text-black'
                } ${isRtl ? 'mr-4' : 'ml-4'}`}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button 
        type="submit" 
        disabled={loading}
        className="group relative w-full overflow-hidden bg-black py-6 text-white transition-all hover:bg-zinc-900 disabled:bg-gray-100 disabled:text-gray-500"
      >
        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">
          {loading ? t("Sending Request...", "جاري الإرسال...", lang) : t("Confirm Table Setup", "تأكيد التنسيق", lang)}
        </span>
      </button>
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs tracking-widest uppercase text-center animate-pulse">
          {error}
        </div>
      )}
    </form>
  );
};

export default TabelForm;