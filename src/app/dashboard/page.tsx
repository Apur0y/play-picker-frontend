"use client";
import { useState } from "react";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import ProfileManagement from "@/conponents/dashboard/ProfileManagement";
import OrderManagement from "@/conponents/dashboard/OrderManagement";
import DashboardNav from "@/conponents/dashboard/DashboardNav";
import Sidebar from "@/conponents/dashboard/Sidebar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-3 rounded-xl">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <p className="text-gray-600">Manage your profile and orders</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow transition transform hover:scale-105">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition transform hover:scale-105">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Welcome Back! 👋</h2>
          <p className="text-orange-100">
            Manage your account and view your order history. Stay updated with your video production status.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden col-span-1 mb-6">
            <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && <ProfileManagement />}
            {activeTab === "orders" && <OrderManagement />}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-600">
            <p className="text-gray-600 text-sm mb-2">Profile Status</p>
            <p className="text-2xl font-bold text-gray-800">Complete</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
            <p className="text-green-600 text-sm mt-2">2 completed, 1 shipped</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm mb-2">Account Age</p>
            <p className="text-2xl font-bold text-gray-800">1 Year</p>
            <p className="text-purple-600 text-sm mt-2">Loyal customer since Jan 2024</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
              Create New Order
            </button>
            <button className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
              View Packages
            </button>
            <button className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
