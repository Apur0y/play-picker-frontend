import React from 'react'
import DashboardPage from './page'
import Navbar from '@/conponents/shared/Navbar'

export default function layout() {
  return (
    <div>
     <span className='md:hidden'> <Navbar/> </span> 
        <DashboardPage/>
    </div>
  )
}
