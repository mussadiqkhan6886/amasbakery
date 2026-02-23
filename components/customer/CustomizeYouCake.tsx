"use client";

import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import imageCompression from "browser-image-compression";
import { useLanguage } from "@/context/LanguageContext";
import { playFair } from "@/lib/fonts";
import axios from "axios";

interface TierConfig {
  size: number;
  flavor: string;
  type: "Real" | "Dummy";
}

const STORAGE_KEY = "amas_cake_draft";

export default function CustomizeYourCake() {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  // Form States
  const [occasion, setOccasion] = useState<string>("");
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("pickup");
  const [numTiers, setNumTiers] = useState<number>(1);
  const [tiers, setTiers] = useState<TierConfig[]>([
    { size: 0, flavor: "", type: "Real" },
    { size: 0, flavor: "", type: "Real" },
    { size: 0, flavor: "", type: "Real" },
  ]);
  
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    specialInstruction: "",
    messageOn: "no",
    message: ""
  });

  // --- 1. PERSISTENCE LOGIC (LocalStorage) ---
  
  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setOccasion(parsed.occasion || "");
        setOrderType(parsed.orderType || "pickup");
        setNumTiers(parsed.numTiers || 1);
        setTiers(parsed.tiers || tiers);
        setDetails(prev => ({ ...prev, ...parsed.details }));
        setStep(parsed.step || 1);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Save data to LocalStorage whenever state changes
  useEffect(() => {
    if (!submitted) {
      const draft = { occasion, orderType, numTiers, tiers, details, step };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [occasion, orderType, numTiers, tiers, details, step, submitted]);

  // --- 2. FETCH BOOKED DATES ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/customize-order");
        const dates = res.data.data.map((order: any) => {
          const d = new Date(order.delivery.deliveryDate);
          return d.toISOString().split("T")[0];
        });
        setBookedDates(dates);
      } catch (e) { console.error("Error fetching dates", e); }
    };
    fetchOrders();
  }, []);

  // --- 3. PRICING & VALIDATION ---
  const pricing = useMemo(() => {
    const rate = occasion === "wedding" ? 90 : 70;
    const realWeight = tiers.slice(0, numTiers).reduce((acc, curr) => acc + (curr.type === "Real" ? Number(curr.size) : 0), 0);
    const minRequired = occasion === "wedding" ? 6 : 3;
    const cakePrice = realWeight * rate;
    
    let deliveryPrice = 0;
    if (orderType === "delivery") {
      deliveryPrice = details.city === "al-khobar" ? 25 : details.city === "damam" ? 35 : 0;
    }

    return {
      rate, realWeight, cakePrice, deliveryPrice,
      totalAmount: cakePrice + deliveryPrice,
      isMinMet: realWeight >= minRequired,
      minRequired
    };
  }, [occasion, tiers, numTiers, details.city, orderType]);

  const minDate = useMemo(() => {
    const today = new Date();
    const daysToAdd = occasion === "wedding" ? 4 : 2;
    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString().split("T")[0];
  }, [occasion]);

  const handleTierChange = (index: number, field: keyof TierConfig, value: any) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("customer", JSON.stringify({
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        city: details.city || "-",
        address: details.address || "-",
      }));
      formData.append("cakeDetails", JSON.stringify({
        occasion,
        numTiers,
        tiers: tiers.slice(0, numTiers),
        messageOn: details.messageOn,
        message: details.message,
        specialInstruction: details.specialInstruction
      }));
      formData.append("delivery", JSON.stringify({
        orderType,
        deliveryDate: details.deliveryDate,
        deliveryTime: details.deliveryTime
      }));
      formData.append("pricing", JSON.stringify({
        totalPrice: pricing.cakePrice,
        deliveryCharges: pricing.deliveryPrice,
        totalAmount: pricing.totalAmount
      }));

      for (const file of images) {
        const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200 });
        formData.append("image", compressed);
      }

      const res = await fetch("/api/customize-order", { method: "POST", body: formData });
      if (res.ok) {
        localStorage.removeItem(STORAGE_KEY); // SUCCESS: Clear LocalStorage
        setSubmitted(true);
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`min-h-screen pt-24 pb-20 px-4 bg-gray-50 ${lang === "ar" ? "rtl text-right" : "ltr text-left"}`}>
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`${playFair.className} text-4xl font-bold text-main mb-3`}>
            {t("Customize Your Cake", "صمّم كيكك الخاص", lang)}
          </h1>
          <p className="text-gray-500">Step {step} of 3</p>
        </div>

        {!submitted ? (
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: STRUCTURE */}
              {step === 1 && (
                <div className="p-8 space-y-8 animate-in fade-in duration-500">
                  <div>
                    <label className="block text-lg font-semibold mb-4">1. Select Occasion</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Wedding', 'Birthday', 'Engagement', 'Corporate'].map((occ) => (
                        <button
                          key={occ} type="button"
                          onClick={() => setOccasion(occ.toLowerCase())}
                          className={`p-4 rounded-xl border-2 transition-all ${occasion === occ.toLowerCase() ? "border-main bg-pink-50 text-main shadow-md" : "border-gray-100 hover:border-pink-200"}`}
                        >
                          <span className="block text-sm font-bold">{occ}</span>
                          <span className="text-[10px] opacity-70">{occ === 'Wedding' ? '90 SAR/lb' : '70 SAR/lb'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-4">2. Number of Tiers</label>
                    <div className="flex gap-4">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={n} type="button"
                          onClick={() => setNumTiers(n)}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all ${numTiers === n ? "border-main bg-pink-50 text-main shadow-md" : "border-gray-100"}`}
                        >
                          {n} {n === 1 ? 'Tier' : 'Tiers'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="button" disabled={!occasion}
                    onClick={() => setStep(2)}
                    className="w-full bg-main text-white py-4 rounded-xl font-bold shadow-lg disabled:bg-gray-200"
                  >
                    Continue to Design
                  </button>
                </div>
              )}

              {/* STEP 2: DESIGN & FLAVOR */}
              {step === 2 && (
                <div className="p-8 space-y-6 animate-in slide-in-from-right duration-500">
                  {Array.from({ length: numTiers }).map((_, i) => (
                    <div key={i} className="p-5 border-2 border-gray-50 rounded-2xl bg-gray-50/50 space-y-4">
                      <h3 className="font-bold text-main uppercase text-xs tracking-widest">
                        {i === 0 ? 'Top Tier' : i === 1 ? 'Middle Tier' : 'Bottom Tier'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-bold text-gray-400">Type</label>
                          <select value={tiers[i].type} className="w-full p-2 mt-1 border rounded-lg bg-white" onChange={(e) => handleTierChange(i, 'type', e.target.value)}>
                            <option value="Real">Real Cake</option>
                            <option value="Dummy">Dummy</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-400">Weight (lb)</label>
                          <input value={tiers[i].size} type="number" placeholder="0" className="w-full p-2 mt-1 border rounded-lg bg-white" onChange={(e) => handleTierChange(i, 'size', e.target.value)} />
                        </div>
                        {tiers[i].type === 'Real' && (
                          <div>
                            <label className="text-xs font-bold text-gray-400">Flavor</label>
                            <select value={tiers[i].flavor} className="w-full p-2 mt-1 border rounded-lg bg-white" onChange={(e) => handleTierChange(i, 'flavor', e.target.value)}>
                              <option value="">Choose Flavor</option>
                              <option>Vanilla Raspberry</option>
                              <option>Chocolate Moist</option>
                              <option>Pistachio</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-4">
                    <label className="block font-semibold">Personalized Message</label>
                    <select 
                      className="w-full p-3 border rounded-xl"
                      value={details.messageOn}
                      onChange={(e) => setDetails({...details, messageOn: e.target.value})}
                    >
                      <option value="no">No Message</option>
                      <option value="cake">On the Cake</option>
                      <option value="board">On the Board</option>
                    </select>
                    {details.messageOn !== 'no' && (
                      <input 
                        type="text" 
                        value={details.message}
                        placeholder="Type your message here..." 
                        className="w-full p-3 border rounded-xl"
                        onChange={(e) => setDetails({...details, message: e.target.value})}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Reference Image (Optional)</label>
                    <input type="file" multiple onChange={handleFileChange} className="w-full p-3 border-2 border-dashed rounded-xl" />
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 py-4 rounded-xl font-bold">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-main text-white py-4 rounded-xl font-bold">Next: Delivery</button>
                  </div>
                </div>
              )}

              {/* STEP 3: LOGISTICS & PRICE */}
              {step === 3 && (
                <div className="p-8 space-y-6 animate-in slide-in-from-right duration-500">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input value={details.fullName} type="text" placeholder="Full Name" required className="p-3 border rounded-xl" onChange={(e)=>setDetails({...details, fullName: e.target.value})} />
                    <input value={details.phone} type="tel" placeholder="Phone (WhatsApp)" required className="p-3 border rounded-xl" onChange={(e)=>setDetails({...details, phone: e.target.value})} />
                    <input value={details.email} type="email" placeholder="Email" required className="p-3 border rounded-xl" onChange={(e)=>setDetails({...details, email: e.target.value})} />
                  </div>

                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button type="button" onClick={() => setOrderType('pickup')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${orderType === 'pickup' ? "bg-white shadow" : "text-gray-500"}`}>Pickup</button>
                    <button type="button" onClick={() => setOrderType('delivery')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${orderType === 'delivery' ? "bg-white shadow" : "text-gray-500"}`}>Delivery</button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400">Date</label>
                      <input 
                        type="date" min={minDate} value={details.deliveryDate} required className="w-full p-3 border rounded-xl"
                        onChange={(e) => {
                          if(bookedDates.includes(e.target.value)) {
                            alert("This date is already fully booked.");
                            e.target.value = "";
                          } else { setDetails({...details, deliveryDate: e.target.value})}
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400">Time Slot</label>
                      <select value={details.deliveryTime} required className="w-full p-3 border rounded-xl" onChange={(e)=>setDetails({...details, deliveryTime: e.target.value})}>
                        <option value="">Select Slot</option>
                        <option value="4-6">4 PM - 6 PM</option>
                        <option value="6-10">6 PM - 10 PM</option>
                      </select>
                    </div>
                  </div>

                  {orderType === 'delivery' ? (
                    <div className="space-y-4">
                      <select value={details.city} required className="w-full p-3 border rounded-xl" onChange={(e)=>setDetails({...details, city: e.target.value})}>
                        <option value="">Select City</option>
                        <option value="al-khobar">Al Khobar (25 SAR)</option>
                        <option value="damam">Dammam (35 SAR)</option>
                      </select>
                      <input value={details.address} type="text" placeholder="Full Address" className="w-full p-3 border rounded-xl" onChange={(e)=>setDetails({...details, address: e.target.value})} />
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm">
                      📍 Shop address shared via WhatsApp after confirmation.
                    </div>
                  )}
                
                  <div className="p-6 bg-pink-50 rounded-3xl border-2 border-main border-dashed">

                    <div className="flex justify-between items-center mb-2">

                      <span className="text-sm">Cake ({pricing.realWeight} lb × {pricing.rate} SAR)</span>

                      <span className="font-bold">{pricing.cakePrice} SAR</span>

                    </div>

                    {orderType === 'delivery' && (

                      <div className="flex justify-between items-center mb-2">

                        <span className="text-sm">Delivery Fee</span>

                        <span className="font-bold">{pricing.deliveryPrice} SAR</span>

                      </div>

                    )}

                    <div className="border-t border-pink-200 mt-4 pt-4 flex justify-between items-center">

                      <span className="text-lg font-bold">Total Amount</span>

                      <span className="text-3xl font-black text-main">{pricing.totalAmount} SAR</span>

                    </div>

                    {!pricing.isMinMet && (

                      <p className="text-red-500 text-xs mt-3 font-bold text-center">

                        ⚠️ Minimum size for {occasion} is {pricing.minRequired} lb.

                        Your current size: {pricing.realWeight} lb.

                      </p>

                    )}

                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 py-4 rounded-xl font-bold">Back</button>
                    <button 
                      type="submit" disabled={loading || !pricing.isMinMet}
                      className="flex-1 bg-main text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Place Order Now"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="text-center p-20 bg-white rounded-3xl shadow-xl">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
             <h2 className="text-3xl font-bold text-gray-800">Order Placed!</h2>
             <p className="text-gray-500 mt-4">We'll contact you on WhatsApp soon.</p>
             <button onClick={() => window.location.reload()} className="mt-8 text-main font-bold underline">Back to Home</button>
          </div>
        )}
      </section>
    </main>
  );
}