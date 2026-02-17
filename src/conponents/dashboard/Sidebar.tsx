"use client";
import { User, ShoppingCart, Home, LogOut, Settings, HelpCircle } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: "profile" | "orders";
  setActiveTab: (tab: "profile" | "orders") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "profile", label: "Profile Management", icon: User },
    { id: "orders", label: "Order Management", icon: ShoppingCart },
  ];

  const footerItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help", icon: HelpCircle, href: "/contact" },
  ];

  return (
    <div className="w-full md:w-64 bg-linear-to-b from-primary via-orange-800 to-orange-900 rounded-2xl shadow-lg p-6 text-white h-fit">
      {/* Profile Card */}
      <div className="mb-8 p-4 bg-white/10 rounded-xl border border-white/20">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-center font-bold text-lg">John Doe</h3>
        <p className="text-center text-sm text-blue-100">john@example.com</p>
      </div>

      {/* Main Menu */}
      <div className="space-y-3 mb-8">
        <p className="text-xs uppercase font-semibold text-blue-200 tracking-wider mb-3">
          Main Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "profile" | "orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white/20 border border-white/40"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-6"></div>

      {/* Footer Menu */}
      <div className="space-y-2">
        {footerItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all duration-200"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-100 font-semibold transition-all duration-200">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
