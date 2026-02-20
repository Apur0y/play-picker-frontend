import Packages from '@/conponents/home/Packages'
import CustomizePackage from '@/conponents/packages/CumtomizePackages'
import PackagesPage from '@/conponents/packages/CustomPackage'
import React from 'react'

export default function page() {
  return (
    <div className='bg-linear-to-br from-slate-50 to-slate-100'>
     <CustomizePackage/>
     <PackagesPage/>
    </div>
  )
}
