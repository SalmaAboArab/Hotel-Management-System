import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderComponents from '../../../SharedModule/Components/HeaderComponents/HeaderComponents'
import Loading from '../../../SharedModule/Components/Loading/Loading'
import Tables from '../../../SharedModule/Components/Tables/Tables'
import NoData from '../../../SharedModule/Components/NoData/NoData'
import axios from 'axios'
import { baseUrl } from '../../../Constants/Components/Urls'
import ViewModal from '../ViewModal/ViewModal'
import DeleteModal from '../DeleteModal/DeleteModal'

export default function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token=localStorage.getItem('adminToken');
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [curruntBooking,setCurruntBooking]=useState({});
  const handleOpenModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntBooking(curruntItem);
    
  }
  const handleCloseModal = () =>{
    setOpenViewModal(false);
  }

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (curruntItem:object) => {
    setOpenDeleteModal(true);
    setCurruntBooking(curruntItem);
  }
  const handleCloseDeleteModal = () =>{
    setOpenDeleteModal(false);
    getBookingList();
  }

  const headerTableArray = [
    // "Booking Id",
    "Room Number",
    "Total Price",
    "Status",
    "UserName",
    "Actions",
  ];

  const distract = [
    // "._id",
    ".room?.roomNumber",
    ".totalPrice",
    ".status",
    ".user.userName",
    
  ];

  async function getBookingList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/booking?page=1&size=10`, {
        headers: {
          Authorization:token
        },
      });      
      setBookingList(data.data.booking);
    } catch (error) {
      console.error("Somthing went wrong", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getBookingList();
  }, []);
  return (
    <Box sx={{ padding: 2 }}>
    <HeaderComponents
      title={"Booking Table Details"}
      buttonName={""}
      addOn={'no'}
    />

    {isLoading ? (
      <Loading />
    ) : bookingList?.length !== 0 ? (
      <Tables array={bookingList} distract={distract} headerTableArray={headerTableArray} actions={'yes'} openDeleteModal={handleOpenDeleteModal} openViewModal={handleOpenModal} name={'booking'}/>
    ) : (
      <NoData />
    )}
    {openDeleteModal?
      <DeleteModal name={'booking'} closeModal={handleCloseDeleteModal} curruntItem={curruntBooking}/>
      :''}
    {openViewModal?
      <ViewModal closeModal={handleCloseModal} curruntItem={curruntBooking} paths={distract} lables={headerTableArray}/>
      :''}
  </Box>
  )
}
