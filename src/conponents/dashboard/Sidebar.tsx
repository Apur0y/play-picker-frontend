"use client";
import { useAppSelector } from "@/redux/features/hook";
import { User, ShoppingCart, Home, LogOut, Settings, HelpCircle } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: "profile" | "orders";
  setActiveTab: (tab: "profile" | "orders") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {

  const user = useAppSelector((state) => state.auth?.user);

  const menuItems = [
    { id: "orders", label: "Order Management", icon: ShoppingCart },
    { id: "profile", label: "Profile Management", icon: User },
  ];

  const footerItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "About", icon: Settings, href: "/about-us" },
    { label: "Help", icon: HelpCircle, href: "/contact" },
  ];

  return (
    <div className="w-full md:w-64  rounded-2xl shadow-lg p-6 text-gray-900 border border-gray-300 h-fit">
      {/* Profile Card */}
      <div className="mb-8 p-4 bg-white/10 rounded-xl border border-white/20">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-center font-bold text-lg">{user?.name || "User Name"}</h3>
        <p className="text-center text-sm text-gray-600">{user?.email || "useremail@gmail.com"}</p>
      </div>

      {/* Main Menu */}
      <div className="space-y-3 mb-8">
        <p className="text-xs uppercase font-semibold text-gray-900 tracking-wider mb-3">
          Main Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "profile" | "orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-white "
                  : " hover:bg-primary/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
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
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-primary/20 transition-all duration-200 "
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>


    </div>
  );
}
