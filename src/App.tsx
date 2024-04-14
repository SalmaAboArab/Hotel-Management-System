import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import ChangePassword from './AuthModule/Components/ChangePassword/ChangePassword'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout'
import AdminLayout from './SharedModule/Components/AdminLayout/AdminLayout'
import AdminHome from './AdminModule/Components/AdminHome/AdminHome'
import AdsList from './AdminModule/Components/Ads/Components/AdsList/AdsList'
import AdsForm from './AdminModule/Components/Ads/Components/AdsForm/AdsForm'
import BookingList from './AdminModule/Components/Booking/BookingList'
import FacilitiesList from './AdminModule/Components/Facilities/Components/FacilitiesList/FacilitiesList'
import FacilitiesForm from './AdminModule/Components/Facilities/Components/FacilitiesForm/FacilitiesForm'
import RoomsList from './AdminModule/Components/Rooms/Components/RoomsList/RoomsList'
import RoomsForm from './AdminModule/Components/Rooms/Components/RoomsForm/RoomsForm'
import UsersList from './AdminModule/Components/UsersList/UsersList'
import LandingPage from './UsersModule/Components/LandingPage/LandingPage'

function App() {
  const routers = createBrowserRouter([
    {
      path:"/",
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<LandingPage/>},
        
      ]
    },
    {
      path:"Authentication",
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forgot-password",element:<ForgotPassword/>},
        {path:"reset-password",element:<ResetPassword/>}
       
      ]
    },
    {
      path:'Admin',
      element:<AdminLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<AdminHome/>},
        {path:'users',element:<UsersList/>},
        {path:'ads',element:<AdsList/>},
        {path:'ads/ads-form',element:<AdsForm/>},
        {path:'booking-list',element:<BookingList/>},
        {path:'facilities',element:<FacilitiesList/>},
        {path:'facilities/facilities-form',element:<FacilitiesForm/>},
        {path:'rooms',element:<RoomsList/>},
        {path:'rooms/rooms-form',element:<RoomsForm/>},
        {path:"change-password",element:<ChangePassword/>}
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={routers} />
    </>
  )
}

export default App
