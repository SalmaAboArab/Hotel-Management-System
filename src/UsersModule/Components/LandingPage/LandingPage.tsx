import React from 'react'
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate=useNavigate();
  return (
    <>
    <div>
      <button className='btn btn-info mt-1' onClick={()=>navigate('/Authentication')}>Login</button><br/>
      <button className='btn btn-success my-2' onClick={()=>navigate('/Authentication/register')}>Register</button><br/>
      <button className='btn btn-warning mb-2' onClick={()=>navigate('/Authentication/forgot-password')}>ForgotPassword</button><br/>
      <button className='btn btn-danger mb-1' onClick={()=>navigate('/Admin')}>AdminDashboard</button>
      <br />
      <button className='btn btn-danger mb-1' onClick={()=>navigate('/Admin/facilities')}>Facilities CRUD</button>
    </div>
    </>
  )
}
