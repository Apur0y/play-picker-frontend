"use client";
import { useState } from "react";
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  Eye,
  Download,
  Trash2,
} from "lucide-react";
import { useGetOrdersByBuyerQuery } from "@/redux/api/orders/orderApis";
import { useAppSelector } from "@/redux/features/hook";
import { IOrder } from "../types/types";

interface Order {
  id: string;
  sport: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "shipped" | "cancelled";
  deliveryDate: string;
}

export default function OrderManagement() {
  const user = useAppSelector((state) => state.auth.user);
  console.log("THere is the usre in orsder", user);
  const { data: order, isLoading } = useGetOrdersByBuyerQuery(user?._id, {
    skip: !user?._id,
  });
  console.log("THere is the usre in orsder", order?.data);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      sport: "Football",
      date: "2024-12-10",
      amount: 299,
      status: "completed",
      deliveryDate: "2024-12-15",
    },
    {
      id: "ORD-002",
      sport: "Soccer",
      date: "2024-12-08",
      amount: 199,
      status: "shipped",
      deliveryDate: "2024-12-20",
    },
    {
      id: "ORD-003",
      sport: "Basketball",
      date: "2024-12-05",
      amount: 249,
      status: "pending",
      deliveryDate: "2024-12-25",
    },
    {
      id: "ORD-004",
      sport: "Rugby",
      date: "2024-11-20",
      amount: 399,
      status: "completed",
      deliveryDate: "2024-11-28",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          My Orders
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold text-green-600">{orders.length}</p>
        </div>
      </div>

      {order?.data.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            No orders yet. Start creating your first video!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Sport
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Order Date
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Delivery Date
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.data?.map((order: IOrder) => {
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "";

                const deliveryDate =
                  order.createdAt && order.deliveryTimeInDays
                    ? new Date(
                        new Date(order.createdAt).getTime() +
                          order.deliveryTimeInDays * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()
                    : "";

                return (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-800">
                        {order.transactionId || order._id}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-gray-700">
                      {order.title || ""}
                    </td>

                    <td className="py-4 px-4 text-gray-700">{orderDate}</td>

                    <td className="py-4 px-4 text-gray-700">{deliveryDate}</td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-600 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {order.totalPrice || ""}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status
                          ? order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)
                          : ""}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition transform hover:scale-110">
                          <Eye className="w-4 h-4" />
                        </button>

                        <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition transform hover:scale-110">
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(order._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

   <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
    <p className="text-sm text-green-700 font-semibold">Completed</p>
    <p className="text-2xl font-bold text-green-800">
      {order?.data?.filter((o:IOrder) => o.status === "completed").length || 0}
    </p>
  </div>
  
  <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
    <p className="text-sm text-yellow-700 font-semibold">Pending</p>
    <p className="text-2xl font-bold text-yellow-800">
      {order?.data?.filter((o:IOrder) => o.status === "pending").length || 0}
    </p>
  </div>

  <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
    <p className="text-sm text-purple-700 font-semibold">Total Spent</p>
    <p className="text-2xl font-bold text-purple-800">
      $
      {order?.data?.reduce(
        (sum:number, o:IOrder) => sum + (o.totalPrice || 0),
        0
      ) || 0}
    </p>
  </div>
</div>
    </div>
  );
}
