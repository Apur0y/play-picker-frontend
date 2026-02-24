// app/order/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    sport: "",
    intro: "",
    effects: [],
    deliveryDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order submitted successfully!");
  };

  useEffect(()=>{
 setForm({
    sport: "",
    intro: "",
    effects: [],
    deliveryDate: "",
  })
  },[])

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Customize Your Order</h2>

        <label>Choose Sport</label>
        <select className="w-full border p-2 rounded" value={form.sport}>
          <option>Soccer</option>
          <option>Basketball</option>
          <option>Rugby</option>
          <option>Golf</option>
        </select>

        <label>Intro Type</label>
        <input type="text" placeholder="Enter intro type" className="w-full border p-2 rounded" />

        <label>Delivery Date</label>
        <input type="date" className="w-full border p-2 rounded" />

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Submit Order
        </button>
      </form>
    </div>
  );
}
