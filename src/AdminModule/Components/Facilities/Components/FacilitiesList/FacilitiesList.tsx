import React from 'react';
import {  Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";
import ViewModal from '../../../ViewModal/ViewModal';



export default function FacilitiesList() {
  
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [curruntFacility,setCurruntFacility]=useState({});
  const handleOpenViewModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntFacility(curruntItem);
    
  }
  const handleCloseViewModal = () =>{
    setOpenViewModal(false);
  }
  


  const headerTableArray = [
    "id",
    "name",
    "createdBy",
    "createdAt",
    "updatedAt",
    "",
  ];

  
  const distract = [
    "._id",
    ".name",
    ".createdBy?.userName",
    ".createdAt",
    ".updatedAt",
  ];
//style el two modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


//function elllllllllll list
  async function getFacilitiesList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/room-facilities`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkODg3NDZlYmJiZWZiYzE5ZjgzNTIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzIxMTU0NywiZXhwIjoxNzE0NDIxMTQ3fQ.7MqD3AXL084Rdk-yMz64VGk_X2-zAo0x0qArnEnSJfo",
        },
        
      });
  //console.log(data.data.facilities)
      setFacilitiesList(data.data.facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
   
    setIsLoading(true);
    getFacilitiesList();
  }, []);

  
  
  return (
   <>
 <Box sx={{ padding: 2 }}>
  
 



 

{/*header*/}
      <HeaderComponents
        title={"Facilities Table Details"}
        buttonName={"Add New facilities"}
       
      />

      {isLoading ? (
        <Loading />
      ) : facilitiesList.length !== 0 ? (
        <Tables  
        array={facilitiesList} distract={distract} headerTableArray={headerTableArray} openViewModal={handleOpenViewModal}/>
      ) : (
        <NoData />
      )}
      
      {openViewModal?
      <ViewModal closeModal={handleCloseViewModal} curruntItem={curruntFacility} paths={distract} lables={headerTableArray}/>
      :''}
     
    </Box>
   </>
  )
}
