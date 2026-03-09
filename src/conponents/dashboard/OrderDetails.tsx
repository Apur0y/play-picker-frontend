import React from 'react'

interface DetailsdNavProps {
  activeTab: "profile" | "orders" |"details";
  setActiveTab: (tab: "profile" | "orders" |"details") => void;
}


export default function OrderDetails({ activeTab, setActiveTab }: DetailsdNavProps) {
  return (
    <div className='text-gray-900'>
        <button className='btn'  onClick={()=>setActiveTab("orders")}> Go to orders</button>
        <p>

     THis is order details page
        </p>
    </div>
  )
}
