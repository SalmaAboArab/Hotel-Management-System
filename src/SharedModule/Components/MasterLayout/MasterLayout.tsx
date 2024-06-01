import Navbar from '../../../UsersModule/Components/Navbar/Navbar'
import Footer from '../../../UsersModule/Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export default function MasterLayout() {
  return (
    <div>
        <Navbar/>
        <Box sx={{minHeight:"100vh"}}>
        <Outlet/>
        </Box>
        {/* <Footer/> */}
    </div>
  )
}
