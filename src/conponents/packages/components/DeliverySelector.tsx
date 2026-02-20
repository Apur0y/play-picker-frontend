import React from "react";
import { Clock, Zap, Rocket } from "lucide-react";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

interface DeliverySelectorProps {
  selectedDays: 5 | 2 | 1;
  onSelect: (days: 5 | 2 | 1) => void;
}

export function DeliverySelector({
  selectedDays,
  onSelect,
}: DeliverySelectorProps) {
  const options = [
    {
      days: 5 as const,
      label: "Regular",
      time: "5 Days",
      icon: Clock,
      color: "slate",
      badge: "+0$",
    },
    {
      days: 2 as const,
      label: "Fast",
      time: "2 Days",
      icon: Zap,
      color: "blue",
      badge: "+20$",
    },
    {
      days: 1 as const,
      label: "Express",
      time: "24 Hours",
      icon: Rocket,
      color: "orange",
      badge: "+50$",
    },
  ];

  return (
    <section className=" p-8   ">
      <div className="mb-6">
        <h2 className="font-bold text-slate-900 mb-2">Delivery Speed</h2>
        <p className="text-slate-600 text-sm">
          Choose how fast you need your videos delivered
        </p>
      </div>

      <div className=" flex flex-col gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedDays === option.days;

          return (
            <button
              key={option.days}
              onClick={() => onSelect(option.days)}
              className={`relative p-1  border  transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-orange-500 bg-orange-50 shadow-lg  shadow-orange-100"
                  : "border-gray-100 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* {option.badge && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {option.badge}
                </div>
              )} */}
              <div className="flex gap-3 items-center text-center justify-between">
                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <MdOutlineRadioButtonChecked className="text-black " />
                  ) : (
                    <MdOutlineRadioButtonUnchecked />
                  )}
                  <div className=" text-slate-900 mb-1">{option.label}</div>
                  <div className="text-sm  text-slate-500">{option.time}</div>
                </div>
                {option.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-green-200 text-cyan-800"
                        : option.badge === "Premium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {option.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
