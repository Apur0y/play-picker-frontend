import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function LogoPP() {
  return (
    <div>
          
          <Image
            src="/pplogo.png"
            alt="Logo"
            width={400}
            height={400}
            className="w-20 h-20 object-contain"
          />
          <div className="text-2xl flex items-center uppercase">
            <span className=" ">Play</span>
            <span className=" ">Picker</span>
          </div>
    </div>
  )
}
