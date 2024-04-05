import React from 'react'
import Navbar from '../../../AdminModule/Components/Navbar/Navbar'
import Sidebar from '../../../AdminModule/Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Sidebar/>
    </div>
  )
}
