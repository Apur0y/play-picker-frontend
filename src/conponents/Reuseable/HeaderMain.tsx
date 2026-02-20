import React from 'react'

interface Header{
    title:string;
    subtitle:string;
    center?:boolean;
    description?:string;
}

export default function HeaderMain({title,subtitle,center,description}:Header) {
  return (
    <div className={`flex flex-col ${center? "justify-center items-center":""}`}>
         <h2 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 ">
              {title} <span className="text-orange-600">{subtitle}</span>
            </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{description} </p>

    </div>
  )
}
