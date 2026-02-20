"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ComponentHeader from "../Reuseable/Header";
import PackageCard from "../shared/PlanCard";
import { useGetAllPackagesQuery } from "@/redux/api/packages/packageApi";
import Container from "../shared/Container";
import { useInitiatePaymentMutation } from "@/redux/api/payment/paymentApi";
import { toast } from "sonner";
import CheckoutModal from "../shared/CheckOutModal";

export interface IPlan {
  _id: string;
  planName: string;
  amount: number;
  currency: string;
  interval: string | null;
  intervalCount: number | null;
  productId: string;
  priceId: string;
  active: boolean;
  description: string;
  features: string[];
  planType: "one_time" | "subscription";
  totalSubscribers: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export default function PackagesPage() {
  const router = useRouter();
  const { data: packages } = useGetAllPackagesQuery({});
  const [payment, { isLoading }] = useInitiatePaymentMutation();

  console.log(packages);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [selectedPackage, setselectedPackage] = useState<IPlan | null>(null);

  const user = "Apu";

  const handleClick = (pkg: IPlan) => {
    if (!user) {
      router.push("/signIn");
      return;
    }

    setselectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleOrder = async () => {
    if (!selectedPackage) return;

    if (
      !formData.customerName ||
      !formData.customerEmail ||
      !formData.customerPhone
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        userId: formData.customerEmail,
        packageId: selectedPackage._id,
        amount: selectedPackage.amount,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
      };

      const result = await payment(payload).unwrap();

      if (result.success) {
        localStorage.setItem("transactionId", result.data.transactionId);
        localStorage.setItem("sessionKey", result.data.sessionKey);
        window.location.href = result.data.url;
      }
    } catch (error) {
      toast.error(`Payment failed. Try again. ${error}`);
    }
  };

  return (
    <Container className="mx-auto">
      <div className="bgwhite py-20 text-white">
        <ComponentHeader
          title="Choose from PAckage"
          text="Choose the Right Plan for Your Needs."
        />
        <div className="flex justify-center flex-wrap mt-12 gap-10">
          {packages?.data.map((pkg: IPlan) => (
            <PackageCard
              key={pkg._id}
              price={pkg.amount.toString()}
              planType={
                pkg.planType === "one_time" ? "One Time" : "Subscription"
              }
              packageName={pkg.planName}
              permissions={pkg.features}
              popular={pkg.planName === "Standard"} // example logic
              recommended={pkg.planName === "Premium"} // example logic
              buttonText={user === pkg.planName ? "Active" : undefined}
              onButtonClick={() => handleClick(pkg)}
            />
          ))}
        </div>

        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPackage={selectedPackage}
          formData={formData}
          setFormData={setFormData}
          onProceed={handleOrder}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
}
