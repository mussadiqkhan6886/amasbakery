"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash, FiPlus, FiSave } from "react-icons/fi";

const CustomizeHandler = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    realCakePricePerLb: 70,
    dummyCakePricePerLb: 10,
    minTotalWeight: 3,
    deliveryFeeKhobar: 25,
    deliveryFeeDammam: 35,
    maxTiers: 3,
    flavors: ["Vanilla Raspberry", "Chocolate Moist", "Pistachio"],
    cream: ["Whipping Cream", "Butter Cream", "Founded Cake"]
  });

  const [newFlavor, setNewFlavor] = useState("");
  const [newCream, setNewCream] = useState("");

  // Fetch current settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/customize-settings");
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const addFlavor = () => {
    if (newFlavor.trim() && !settings.flavors.includes(newFlavor.trim())) {
      setSettings((prev) => ({
        ...prev,
        flavors: [...prev.flavors, newFlavor.trim()],
      }));
      setNewFlavor("");
    }
  };

  const removeFlavor = (flavorToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      flavors: prev.flavors.filter((f) => f !== flavorToRemove),
    }));
  };
  const addCream = () => {
    if (newCream.trim() && !settings.cream.includes(newCream.trim())) {
      setSettings((prev) => ({
        ...prev,
        cream: [...prev.cream, newCream.trim()],
      }));
      setNewCream("");
    }
  };

  const removeCream = (creamToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      cream: prev.cream.filter((f) => f !== creamToRemove),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put("/api/customize-settings", settings);
      if (res.data.success) {
        alert("Settings updated successfully!");
      }
    } catch (error) {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading settings...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customize Page Settings</h1>
          <p className="text-sm text-gray-500">Update prices, minimum requirements, and flavors.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* PRICING & WEIGHT */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Pricing & Rules (SAR)</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Real Cake (per lb)</label>
              <input type="number" name="realCakePricePerLb" value={settings.realCakePricePerLb} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Dummy Cake (per inch)</label>
              <input type="number" name="dummyCakePricePerLb" value={settings.dummyCakePricePerLb} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Min. Total Weight (lb)</label>
              <input type="number" name="minTotalWeight" value={settings.minTotalWeight} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Max Allowed Tiers</label>
              <input type="number" name="maxTiers" value={settings.maxTiers} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-700 border-b pb-2 pt-4">Delivery Fees (SAR)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Al Khobar</label>
              <input type="number" name="deliveryFeeKhobar" value={settings.deliveryFeeKhobar} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Dammam</label>
              <input type="number" name="deliveryFeeDammam" value={settings.deliveryFeeDammam} onChange={handleChange} className="w-full p-2 border rounded focus:border-pink-500 outline-none"/>
            </div>
          </div>
        </div>

        {/* FLAVORS MANAGEMENT */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Available Flavors</h2>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newFlavor} 
              onChange={(e) => setNewFlavor(e.target.value)} 
              placeholder="e.g. Red Velvet" 
              className="flex-1 p-2 border rounded focus:border-pink-500 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addFlavor()}
            />
            <button onClick={addFlavor} className="bg-gray-800 text-white px-4 rounded hover:bg-black transition flex items-center justify-center">
              <FiPlus />
            </button>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
            {settings.flavors.length === 0 ? (
              <p className="text-gray-400 text-sm text-center">No flavors added yet.</p>
            ) : (
              settings.flavors.map((flavor, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded shadow-sm border border-gray-100">
                  <span className="font-medium text-sm text-gray-700">{flavor}</span>
                  <button onClick={() => removeFlavor(flavor)} className="text-red-500 hover:text-red-700 p-1">
                    <FiTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Available Cream</h2>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newCream} 
              onChange={(e) => setNewCream(e.target.value)} 
              placeholder="e.g. Whipping Cream" 
              className="flex-1 p-2 border rounded focus:border-pink-500 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addCream()}
            />
            <button onClick={addCream} className="bg-gray-800 text-white px-4 rounded hover:bg-black transition flex items-center justify-center">
              <FiPlus />
            </button>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
            {settings.cream.length === 0 ? (
              <p className="text-gray-400 text-sm text-center">No Cream added yet.</p>
            ) : (
              settings.cream.map((c, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded shadow-sm border border-gray-100">
                  <span className="font-medium text-sm text-gray-700">{c}</span>
                  <button onClick={() => removeCream(c)} className="text-red-500 hover:text-red-700 p-1">
                    <FiTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeHandler;