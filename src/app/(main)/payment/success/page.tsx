"use client";

import { useEffect, useState, Suspense } from "react";
import { useGetPaymentDetailsQuery } from "@/redux/api/payment/paymentApi";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/conponents/Reuseable/Button";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tranId = searchParams.get("tran_id");
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
  // Replace current history entry to prevent POST resubmission
  window.history.replaceState(null, '', window.location.href);

  const params = new URLSearchParams(window.location.search);
  const tranId = params.get('tran_id');
  const valId = params.get('val_id');

  if (!tranId) {
    router.replace('/payment/fail');
    return;
  }

  // fetch payment status from your backend using tranId
  // fetchPaymentStatus(tranId);
}, []);

  // Get transactionId from localStorage
  useEffect(() => {
    const id = tranId || localStorage.getItem("transactionId");
    if (id) {
      setTransactionId(id);
    }
  }, [tranId]);

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
    <div className="min-h-screen flex items-center justify-center  px-4">
      {/* <div className="absolute -top-32  w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-20"></div> */}
  <div className="absolute top-36 md:left-120  w-32 h-32 bg-orange-500/10 rounded-full"></div>

        {/* Top Right Large Bubble */}
  <div className="absolute top-10 right-10 w-40 h-40 border-4 border-orange-400 rounded-full opacity-40"></div>

  {/* Bottom Left Bubble */}
  <div className="absolute bottom-16 left-16 w-24 h-24 border-4 border-orange-500 rounded-full opacity-50"></div>

  {/* Solid Circle Accent */}
  <div className="absolute top-1/4 left-10 w-12 h-12 bg-orange-500 rounded-full"></div>

  {/* Diagonal Line */}
  <div className="absolute bottom-24 right-0 w-72 h-1 bg-orange-400 rotate-12 "></div>

  {/* SVG Curve Wave */}
  <svg
  className="absolute bottom-0 left-0 w-full h-[50vh]"
  viewBox="0 0 1440 400"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0 200 C 300 350, 900 50, 1440 220 L1440 400 L0 400 Z"
    fill="#fb923c"
    fillOpacity="0.15"
  />
</svg>

  
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center border z-10">
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
              <span className="font-medium">{payment.paymentMethod}</span>
            </div>
          </div>
        )}

        {/* Dashboard Button */}
        <Button
          onClick={() => {
            localStorage.removeItem("transactionId");
            router.push("/dashboard");
          }}
          className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-lg font-medium">
          Loading payment details...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
