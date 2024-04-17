import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderComponents from '../../../SharedModule/Components/HeaderComponents/HeaderComponents'
import Loading from '../../../SharedModule/Components/Loading/Loading'
import Tables from '../../../SharedModule/Components/Tables/Tables'
import NoData from '../../../SharedModule/Components/NoData/NoData'
import axios from 'axios'
import { baseUrl } from '../../../Constants/Components/Urls'
import DeleteModal from '../DeleteModal/DeleteModal'

export default function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headerTableArray = [
    // "Booking Id",
    "UserName",
    "Room Number",
    "Status",
    "Total Price",
    "Actions",
  ];

  const distract = [
    // "._id",
    ".user.userName",
    ".room?.roomNumber",
    ".status",
    ".totalPrice",
    
  ];

  async function getBookingList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/booking?page=1&size=10`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMxNDk2NywiZXhwIjoxNzE0NTI0NTY3fQ.hZHGyq8URhmMYQ11qie8VUDRyU1JY9LujY8j7_XIamY",
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
      <Tables array={bookingList} distract={distract} headerTableArray={headerTableArray} actions={'no'} />
    ) : (
      <NoData />
    )}
  </Box>
  )
}
