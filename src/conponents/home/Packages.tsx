"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ComponentHeader from "../Reuseable/Header";
import PackageCard from "../shared/PlanCard";
import { useGetAllPackagesQuery } from "@/redux/api/packages/packageApi";
import HeaderMain from "../Reuseable/HeaderMain";


export default function Packages() {
  const router = useRouter();
  const { data:packages, refetch } = useGetAllPackagesQuery({});
  console.log(packages)

  const user = "Apu"


  const handleClick = (planName: string) => {
    // if (!user) {
    //   router.push("/signIn");
    //   return;
    // }

    router.push(`/contact`);
    // You can modify this to go to checkout or another page
    // router.push(`/checkout/${planName}`);
  };

  return (
    <div className="bg-orange-50 py-10 text-white">

{/* 
      <ComponentHeader
        title="Our Packages"
        text="Choose the Right Plan for Your Needs."
      /> */}
              <HeaderMain title="Our" subtitle="Packages" description="Choose the Right Plan for Your Needs." center />
      
      <div className="flex justify-center flex-wrap  gap-10">
        {packages?.data.map((pkg:any) => (
          <PackageCard
            key={pkg._id}
            price={pkg.amount.toString()}
            planType={pkg.planType === "one_time" ? "One Time" : "Subscription"}
            packageName={pkg.planName}
            permissions={pkg.features}
            popular={pkg.planName === "Standard"} // example logic
            recommended={pkg.planName === "Premium"} // example logic
            buttonText={
              user === pkg.planName ? "Active" : undefined
            }
            onButtonClick={() => handleClick(pkg.planName)}
          />
        ))}

      </div>

    </div>
  );
}
