import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HeaderComponents from '../../../SharedModule/Components/HeaderComponents/HeaderComponents'
import Loading from '../../../SharedModule/Components/Loading/Loading'
import Tables from '../../../SharedModule/Components/Tables/Tables'
import NoData from '../../../SharedModule/Components/NoData/NoData'
import axios from 'axios'
import { baseUrl } from '../../../Constants/Components/Urls'
import ViewModal from '../ViewModal/ViewModal'
import PaginationShared from '../../../SharedModule/Components/Pagination/PaginationShared'
export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token=localStorage.getItem('adminToken');
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [curruntUser,setCurruntUser]=useState({});
  const handleOpenModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntUser(curruntItem);
    
  }
  const handleCloseModal = () =>{
    setOpenViewModal(false);
  }
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


   //? <<============= handle Pagination =============>>
   const [countPage, setCountPage] = useState(1);
   const [totalPages, setTotalPages] = useState(10);
 
   function handlePage(event: React.ChangeEvent<unknown>, page: number) {    
     setCountPage(page);
     localStorage.setItem("activePage", String(page));
   }
   
   useEffect(() => {
     const activePage = localStorage.getItem("activePage");
     if (activePage) {
       setCountPage(Number(activePage));
     }
   }, []);
 
   

  async function getUsersList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/users?page=${countPage}&size=10`, {
        headers: {
          Authorization:token
        },
      });  
      // console.log(data.data.users);
      setTotalPages(Math.ceil(data.data.totalCount / 10));
      setUsersList(data.data.users);
    } catch (error) {
      console.error("Somthing went wrong", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getUsersList();
  }, [countPage]);
  return (
    <Box sx={{ padding: 2 }}>
    <HeaderComponents
      title={"Users Table Details"}
      buttonName={""}
      addOn={'no'}
    />

    {isLoading ? (
      <Loading />
    ) : usersList?.length !== 0 ? (<>
    <Tables array={usersList} distract={distract} headerTableArray={headerTableArray} actions={'no'} openViewModal={handleOpenModal} name={''}/>
   <PaginationShared countPage={countPage} handlePage={handlePage} totalPages={totalPages}/>
    
    </>
    ) : (
      <NoData />
    )}
    {openViewModal?
      <ViewModal closeModal={handleCloseModal} curruntItem={curruntUser} paths={distract} lables={headerTableArray}/>
      :''}
  </Box>
  )
}