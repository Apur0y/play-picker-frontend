"use client";
import { useState } from "react";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import ProfileManagement from "@/conponents/dashboard/ProfileManagement";
import OrderManagement from "@/conponents/dashboard/OrderManagement";
import DashboardNav from "@/conponents/dashboard/DashboardNav";
import Sidebar from "@/conponents/dashboard/Sidebar";
import { useAppSelector } from "@/redux/features/hook";
import { GoHomeFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/api/auth/auth";
import { toast } from "sonner";
import Button from "@/conponents/Reuseable/Button";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");
  const user = useAppSelector((state) => state.auth?.user);
  const router = useRouter();
  const dispatch =useDispatch();
    const [logout] = useLogoutMutation();

const handleLogout = async () => {
  try {
    dispatch(logoutUser());
    await logout({}).unwrap();

    toast.success("Logout Successful!");

    router.refresh(); // refresh server components
    router.push("/");
  } catch (error) {
    toast.error("Logout failed");
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 pt-4 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-12 border-b">
        <div className="flex  justify-between items-start ">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-linear-to-br from-primary to-primary p-3 rounded-xl">
                <LayoutDashboard className="md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="md:text-4xl font-bold text-gray-800">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Manage your profile and orders
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="cursor-pointer" onClick={() => router.push("/")}>
              <GoHomeFill className="size-8 md:size-10 text-primary border rounded-full p-1 hover:scale-105" />
            </button>
            <button onClick={()=>handleLogout()} className="flex cursor-pointer items-center gap-2 bg-primary hover:bg-red-700 text-white font-semibold py-2 px-2 md:px-4 rounded-lg shadow transition transform hover:scale-105">
              <LogOut className="size-4 md:w-5 md:h-5" />
              <span className="hidden md:flex">Logout</span>
            </button>
            {/* <Button  onClick={()=>handleLogout()} > <LogOut className="size-4 md:w-5 md:h-5" />
              <span className="hidden md:flex">Logout</span> </Button> */}
          </div>
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
          <div className="lg:hidden col-span-1 ">
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
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
            <p className="text-green-600 text-sm mt-2">
              2 completed, 1 shipped
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm mb-2">Account Age</p>
            <p className="text-2xl font-bold text-gray-800">1 Year</p>
            <p className="text-purple-600 text-sm mt-2">
              Loyal customer since Jan 2024
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={()=>router.push("/packages")} className="bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
              Create New Order
            </button>
            <button onClick={()=>router.push("/packages/#packages")} className="bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
              View Packages
            </button>
            <button onClick={()=>router.push("/contact")} className="bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
