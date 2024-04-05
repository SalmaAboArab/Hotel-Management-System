import React from 'react'
import Navbar from '../../../UsersModule/Components/Navbar/Navbar'
import Footer from '../../../UsersModule/Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
