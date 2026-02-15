"use client";
import { User, ShoppingCart } from "lucide-react";

interface DashboardNavProps {
  activeTab: "profile" | "orders";
  setActiveTab: (tab: "profile" | "orders") => void;
}

export default function DashboardNav({
  activeTab,
  setActiveTab,
}: DashboardNavProps) {
  const tabs = [
    { id: "profile", label: "Profile Management", icon: User },
    { id: "orders", label: "Order Management", icon: ShoppingCart },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex flex-col md:flex-row gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "profile" | "orders")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
