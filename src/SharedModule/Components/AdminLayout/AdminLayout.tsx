import React from 'react'
import Navbar from '../../../AdminModule/Components/Navbar/Navbar'
import Sidebar from '../../../AdminModule/Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
        <Navbar/>
        <div className='d-flex'>
          <div>
          <Sidebar/>
          </div>
          <div className='m-3 w-100'>
          <Outlet/>
          </div>
        </div>
       
       
    </div>
  )
}
