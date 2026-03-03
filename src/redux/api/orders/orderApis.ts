import { baseUrlApi } from "@/redux/features/baseUrlApi";

export const orderApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({

    // ✅ Create Order
    createOrder: build.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Get All Orders (Admin)
    getAllOrders: build.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Get Single Order
    getSingleOrder: build.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Get Orders By Buyer
    getOrdersByBuyer: build.query({
      query: (buyerId: string) => ({
        url: `/orders/buyer/${buyerId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Update Order Status
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Delete Order
    deleteOrder: build.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useGetOrdersByBuyerQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;