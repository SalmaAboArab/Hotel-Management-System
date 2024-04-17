import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderComponents from '../../../SharedModule/Components/HeaderComponents/HeaderComponents'
import Loading from '../../../SharedModule/Components/Loading/Loading'
import Tables from '../../../SharedModule/Components/Tables/Tables'
import NoData from '../../../SharedModule/Components/NoData/NoData'
import axios from 'axios'
import { baseUrl } from '../../../Constants/Components/Urls'
export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headerTableArray = [
    // "Users Id",
    "UserName",
    // "Profile Image",
    "Role",
    "Email",
    "Phone Number",
    "country",
    "Verified",
    "Actions"
  ];

  const distract = [
    // "._id",
    ".userName",
    // ".profileImage",
    ".role",
    ".email",
    ".phoneNumber",
    ".country",
    ".verified",
    
  ];

  async function getUsersList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/users?page=1&size=10`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMxNDk2NywiZXhwIjoxNzE0NTI0NTY3fQ.hZHGyq8URhmMYQ11qie8VUDRyU1JY9LujY8j7_XIamY",
        },
      });  
      console.log(data.data.users);
          
      setUsersList(data.data.users);
    } catch (error) {
      console.error("Somthing went wrong", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getUsersList();
  }, []);
  return (
    <Box sx={{ padding: 2 }}>
    <HeaderComponents
      title={"Users Table Details"}
      buttonName={""}
      addOn={'no'}
    />

    {isLoading ? (
      <Loading />
    ) : usersList?.length !== 0 ? (
      <Tables array={usersList} distract={distract} headerTableArray={headerTableArray} actions={'no'} />
    ) : (
      <NoData />
    )}
  </Box>
  )
}