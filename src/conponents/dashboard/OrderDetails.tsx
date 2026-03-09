"use client";
import { useGetSingleOrderQuery } from "@/redux/api/orders/orderApis";
import { motion } from "framer-motion";

interface DetailsNavProps {
  activeTab: "profile" | "orders" | "details";
  setActiveTab: (tab: "profile" | "orders" | "details") => void;
  selectedOrder: string;
}

export default function OrderDetails({
  setActiveTab,
  selectedOrder,
}: DetailsNavProps) {
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useGetSingleOrderQuery(selectedOrder);

  const order = orderDetails?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-medium text-red-600">
          Failed to load order details
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  // Helper to style status badges
  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-700";
    const s = status.toLowerCase();
    if (s.includes("completed") || s.includes("delivered"))
      return "bg-green-100 text-green-800 border-green-200";
    if (s.includes("processing") || s.includes("in progress"))
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("cancelled") || s.includes("canceled"))
      return "bg-red-100 text-red-800 border-red-200";
    if (s.includes("pending"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getPaymentColor = (status?: string) => {
    if (!status) return "text-gray-700";
    const s = status.toLowerCase();
    if (s === "paid" || s === "completed") return "text-green-700";
    if (s === "pending" || s === "awaiting") return "text-yellow-700";
    if (s.includes("failed") || s.includes("refunded")) return "text-red-700";
    return "text-gray-700";
  };

  return (
    <motion.div
  initial={{ opacity: 0, x: 30, scale: 0.98 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto"
>
      {/* Header / Back */}
      <div className="bg-gray-50/70 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab("orders")}
          className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
        >
          ← Back to Orders
        </button>

        <div className="text-right">
          <p className="text-xs text-gray-500">Transaction ID</p>
          <p className="font-mono text-sm font-medium text-gray-900">
            {order.transactionId || "—"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8 space-y-10">
        {/* Title & Main Status */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Order Details
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`inline-flex items-center px-3.5 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status || "Unknown"}
            </span>
            <span className="text-sm text-gray-600">
              Placed on{" "}
              <time className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Project Title</p>
            <p className="font-semibold text-gray-900">{order.title || "—"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Total Price</p>
            <p className="text-xl font-bold text-gray-900">
              ${Number(order.totalPrice || 0).toFixed(2)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Payment Status</p>
            <p
              className={`font-semibold capitalize ${getPaymentColor(
                order.paymentStatus
              )}`}
            >
              {order.paymentStatus || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Delivery Time</p>
            <p className="font-semibold text-gray-900">
              {order.deliveryTimeInDays || "?"} Days
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Revisions Left</p>
            <p className="font-semibold text-gray-900">
              {order.revisionCount || 0}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Buyer</p>
            <div>
              <p className="font-medium text-gray-900">
                {order.buyerId?.name || "—"}
              </p>
              <p className="text-sm text-gray-600">
                {order.buyerId?.email || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-gray-800 whitespace-pre-line leading-relaxed">
            {order.instructions || "No instructions provided."}
          </div>
        </div>

        {/* Effects */}
        {order.effects && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Effects</h3>
            <p className="text-gray-800">{order.effects}</p>
          </div>
        )}

        {/* Additional Features */}
        {order.additionalFeatures?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {order.additionalFeatures.map((feature: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex px-3.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}