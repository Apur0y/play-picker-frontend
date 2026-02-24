"use client";
import { User, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="relative bg-white rounded-2xl shadow-lg p-2 mb-8 flex flex-col md:flex-row gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "profile" | "orders")}
            className="relative flex-1 md:mx-3 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm md:text-base font-normal md:font-semibold transition-colors duration-300"
          >
            {/* Animated Background */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-linear-to-r from-primary to-primary shadow-lg"
              />
            )}

            <span
              className={`relative z-10 flex items-center gap-2 ${
                isActive ? "text-white" : "text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}