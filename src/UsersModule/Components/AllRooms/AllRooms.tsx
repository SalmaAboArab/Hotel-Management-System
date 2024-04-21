import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AllRooms() {
    const navigate=useNavigate();
  return (
    <>
    <div>AllRooms</div>
    <br/>
    <button className='btn btn-danger mb-1 mt-5' onClick={()=>navigate('/all-rooms/room-details')}>Room Details</button><br/>
    </>
  )
}
