import React, { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { ConfigState } from "../CumtomizePackages";
import Link from "next/link";
import { useInitiatePaymentMutation } from "@/redux/api/paymment/paymentApi";

interface PackageSummaryProps {
  config: ConfigState;
}

export function PackageSummary({ config }: PackageSummaryProps) {
  const [info, setinfo] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const [payment] = useInitiatePaymentMutation();

  // Pricing calculation logic
  const calculatePrice = () => {
    const getMaxClips = () => {
      if (config.clipOption === "10-15") return 15;
      if (config.clipOption === "20-25") return 25;
      if (config.clipOption === "35-40") return 40;
      if (config.clipOption === "custom") return config.customClipCount;
      return 0;
    };
    const maxClips = getMaxClips();

    // Delivery multiplier
    let deliveryMultiplier = 0;
    if (config.deliveryDays === 2) deliveryMultiplier = 20;
    else if (config.deliveryDays === 1) deliveryMultiplier = 50;

    // Revision cost
    let revisionCost = 0;
    if (config.revisions === 3) revisionCost = 10;
    else if (config.revisions === 5) revisionCost = 20;

    // Effects cost
    const effectsCost = config.selectedEffects.reduce(
      (sum, effect) => sum + effect.price * maxClips,
      0,
    );

    // Additional features cost
    const featuresCost = config.additionalFeatures.length * 0;
    const subtotal =
      deliveryMultiplier + revisionCost + effectsCost + featuresCost;
    return Math.round(subtotal);
  };

  const totalPrice = calculatePrice();

  const getClipDisplay = () => {
    if (config.clipOption === "custom") {
      return `${config.customClipCount} Clips (Custom)`;
    }
    return `${config.clipOption} Clips`;
  };

  const getDeliveryDisplay = () => {
    if (config.deliveryDays === 5) return "5 Days (Regular)";
    if (config.deliveryDays === 2) return "2 Days (Fast)";
    return "24 Hours (Express)";
  };
  const handleOrder =async () => {
    if (formData.customerEmail == "" && formData.customerName == "") {
      setinfo(true);
      setError(true);
    } else {
      const data = {
        userId: formData.customerEmail,
        packageId: `pp${formData.customerEmail}`,
        amount: totalPrice,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerEmail,
      };
      setError(false);
      try {
        const result=await payment(data).unwrap();
        if(result.success){
          window.location.href = result.data.url;
        }
      } catch (error) {
        
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-primary flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Package Summary</h3>
          <p className="text-sm text-slate-500">Your custom configuration</p>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="space-y-4 mb-6">
        {/* Clips */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-slate-900">Video Clips</div>
            <div className="text-sm text-slate-500">{getClipDisplay()}</div>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-slate-900">Delivery Time</div>
            <div className="text-sm text-slate-500">{getDeliveryDisplay()}</div>
          </div>
        </div>

        {/* Revisions */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-slate-900">Revisions</div>
            <div className="text-sm text-slate-500">
              {config.revisions} Round(s)
            </div>
          </div>
        </div>

        {/* Effects */}
        {config.selectedEffects.length > 0 && (
          <div>
            <div className="font-semibold text-slate-900 mb-2">
              Video Effects
            </div>
            <div className="space-y-1">
              {config.selectedEffects.map((effect) => (
                <div
                  key={effect.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">{effect.name}</span>
                  <span className="text-cyan-600 font-semibold">
                    +${effect.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {info && (
          <div className="space-y-4 max-w-md">
            <div>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg text-black"
              />
              {error && (
                <p className="text-red-600 text-sm">This field in required</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="You Email"
                className="w-full px-4 py-2 border rounded-lg text-black"
              />
              {error && (
                <p className="text-red-600 text-sm">This field in required</p>
              )}
            </div>

            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Your Phone(Optional)"
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
        )}

        {/* Additional Features */}
        {config.additionalFeatures.length > 0 && (
          <div>
            <div className="font-semibold text-slate-900 mb-2">
              Additional Features
            </div>
            <ul className="space-y-1">
              {config.additionalFeatures.map((feature) => {
                const featureNames: { [key: string]: string } = {
                  intro: "Intro Page",
                  transitions: "Smooth Transitions",
                  music: "Background Music",
                };
                return (
                  <li
                    key={feature}
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {featureNames[feature]}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 my-6" />

      {/* Total Price */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-slate-600 font-medium">Total Price</span>
          <div className="text-right">
            <div className="text-4xl font-bold text-slate-900">
              ${totalPrice}
            </div>
            <div className="text-sm text-slate-500">one-time payment</div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link href={"/contact"}></Link>
      <button
        onClick={() => handleOrder()}
        className="w-full bg-linear-to-r  from-orange-500 to-primary hover:from-orange-600 hover:to-primary text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 cursor-pointer flex items-center justify-center gap-2 group"
      >
        Continue Order
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Trust Badge */}
      <div className="mt-4 text-center text-xs text-slate-500">
        <p>🔒 Secure checkout • 30-day money back guarantee</p>
      </div>
    </div>
  );
}
