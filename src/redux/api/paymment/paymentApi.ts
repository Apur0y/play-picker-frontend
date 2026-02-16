import { baseUrlApi } from "@/redux/features/baseUrlApi";

const paymentApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({

    // 1️⃣ Initiate Payment
    initiatePayment: build.mutation({
      query: (paymentData) => ({
        url: "/payment/initiate",
        method: "POST",
        body: paymentData,
      }),
    }),

    // 2️⃣ Validate Payment
    validatePayment: build.mutation({
      query: (validationData) => ({
        url: "/payment/validate",
        method: "POST",
        body: validationData,
      }),
    }),

    // 3️⃣ Get Payment Details by Transaction ID
      getPaymentDetails: build.query({
        query: (transactionId: string) => ({
          url: `/payment/details/${transactionId}`,
          method: "GET",
        }),
      }),

    // 4️⃣ Get User Payment History
    getUserPayments: build.query({
      query: (userId: string) => ({
        url: `/payment/user/${userId}`,
        method: "GET",
      }),
    }),

    // 5️⃣ Update Payment Status (Admin)
    updatePaymentStatus: build.mutation({
      query: ({ transactionId, status }) => ({
        url: `/payment/${transactionId}/status`,
        method: "PUT",
        body: { status },
      }),
    }),

    // 6️⃣ Get Payment Stats (Admin)
    getPaymentStats: build.query({
      query: () => ({
        url: "/payment/stats/overview",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useInitiatePaymentMutation,
  useValidatePaymentMutation,
  useGetPaymentDetailsQuery,
  useGetUserPaymentsQuery,
  useUpdatePaymentStatusMutation,
  useGetPaymentStatsQuery,
} = paymentApi;
