import React from 'react'
import { useNavigate } from "react-router-dom"
import AnonymousUserAlert from '../AnonymousUserAlert/AnonymousUserAlert';

export default function LandingPage() {
  const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <div>
      <button className='btn btn-info mt-1' onClick={()=>navigate('/Authentication')}>Login</button><br/>
      <button className='btn btn-success my-2' onClick={()=>navigate('/Authentication/register')}>Register</button><br/>
      <button className='btn btn-warning mb-2' onClick={()=>navigate('/Authentication/forgot-password')}>ForgotPassword</button><br/>
      <button className='btn btn-danger mb-1' onClick={()=>navigate('/Admin')}>AdminDashboard</button><br/><br/>
      <button className='btn btn-danger mb-1 mt-5' onClick={()=>navigate('/all-rooms')}>Explore</button><br/>
      <button className='btn btn-danger mb-1 mt-5' onClick={()=>handleOpen()}>open anonymous user alert</button><br/>
    </div>
    {open?
  <AnonymousUserAlert closeModal={handleClose}/> :'' 
  }
    </>
  )
}
