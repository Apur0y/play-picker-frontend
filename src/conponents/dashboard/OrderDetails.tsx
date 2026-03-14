"use client";
import { useGetSingleOrderQuery } from "@/redux/api/orders/orderApis";
import { motion } from "framer-motion";

interface DetailsNavProps {
  setActiveTab: (tab: "profile" | "orders" | "details") => void;
  selectedOrder: string;
}

export default function OrderDetails({
  setActiveTab,
  selectedOrder,
}: DetailsNavProps) {
  const { data: orderDetails, isLoading, isError } =
    useGetSingleOrderQuery(selectedOrder);

  const order = orderDetails?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse h-8 w-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load order details
      </div>
    );
  }

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-700";
    const s = status.toLowerCase();

    if (s.includes("completed") || s.includes("delivered"))
      return "bg-green-100 text-green-700";

    if (s.includes("processing") || s.includes("progress"))
      return "bg-blue-100 text-blue-700";

    if (s.includes("pending")) return "bg-yellow-100 text-yellow-700";

    if (s.includes("cancel")) return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 py-8 text-gray-900"
    >
      {/* Back button */}
      <button
        onClick={() => setActiveTab("orders")}
        className="mb-6 text-sm text-gray-600 hover:text-black"
      >
        ← Back to Orders
      </button>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
        {/* LEFT SIDE (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Instructions */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-3">Instructions</h2>

            <p className="text-gray-700 whitespace-pre-line">
              {order.instructions || "No instructions provided"}
            </p>
          </div>

          {/* Provided Files */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Provided Files</h2>

            {order.files?.length ? (
              <div className="space-y-3">
                {order.files.map((file: string, i: number) => (
                  <a
                    key={i}
                    href={file}
                    target="_blank"
                    className="block border rounded-lg px-4 py-3 hover:bg-gray-50"
                  >
                    File {i + 1}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No files uploaded</p>
            )}
          </div>

          {/* Delivery Section */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Delivery</h2>

            <div className="flex gap-4">
              <button className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800">
                Upload Draft
              </button>

              <button className="px-5 py-2 rounded-lg border text-sm hover:bg-gray-50">
                Deliver Final
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Messages</h2>

            <textarea
              placeholder="Write a message..."
              className="w-full border rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-black outline-none"
              rows={4}
            />

            <button className="mt-3 px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
              Send Message
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (1/3) */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Project</p>
                <p className="font-medium">{order.title}</p>
              </div>

              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-semibold text-lg">
                  ${order.totalPrice?.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500">Delivery Time</p>
                <p>{order.deliveryTimeInDays} days</p>
              </div>

              <div>
                <p className="text-gray-500">Revisions</p>
                <p>{order.revisionCount}</p>
              </div>

              <div>
                <p className="text-gray-500">Payment</p>
                <p className="capitalize">{order.paymentStatus}</p>
              </div>
            </div>
          </div>

          {/* Buyer */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Buyer</h2>

            <p className="font-medium">{order.buyerId?.name}</p>
            <p className="text-sm text-gray-600">{order.buyerId?.email}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}