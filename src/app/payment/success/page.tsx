"use client";

import { useEffect, useState } from "react";
import { useGetPaymentDetailsQuery } from "@/redux/api/payment/paymentApi";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Get transactionId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("transactionId");
    if (id) {
      setTransactionId(id);
    }
  }, []);

  const { data, isLoading } = useGetPaymentDetailsQuery(transactionId!, {
    skip: !transactionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Verifying payment...
      </div>
    );
  }

  const payment = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center">

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <span className="text-3xl">✅</span>
        </div>

        <h2 className="text-xl font-semibold text-slate-800">
          Payment Successful
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Your transaction has been processed successfully.
        </p>

        {/* Payment Details */}
        {payment && (
          <div className="mt-6 text-left text-sm space-y-2 text-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-medium">{payment.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Amount</span>
              <span className="font-medium ">
                {payment.amount} {payment.currency}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className="font-medium text-green-600 capitalize">
                {payment.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-medium">
                {payment.paymentMethod}
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Button */}
        <button
          onClick={() => {
            localStorage.removeItem("transactionId");
            router.push("/dashboard");
          }}
          className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
