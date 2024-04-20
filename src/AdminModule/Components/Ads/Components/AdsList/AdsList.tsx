import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";
import DeleteModal from "../../../DeleteModal/DeleteModal";
import AddAds from "../ActionsAds/AddAds";

export default function AdsList() {
  const [openAdd, setOpenAdd] = React.useState(false);
  
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenModal = () => setOpenDeleteModal(true);
  const handleCloseModal = () =>{
    setOpenDeleteModal(false);
    getAdsList();
    localStorage.removeItem('curruntItemId');
  }
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const headerTableArray = [
    "Room Name",
    "Price",
    "Discount",
    "Capacity",
    "Active",
    "Actions"
    ];

  const distract = [
    ".room.roomNumber",
    ".room.price",
    ".room.discount",
    ".room.capacity",
    ".isActive",
  ];

  async function getAdsList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/ads`, {
        headers: {
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMwNDczMywiZXhwIjoxNzE0NTE0MzMzfQ.T4R-kftCVUlZuPZddbWyVrcBUPN7bMY6O7Z3jHMY9D0",
        },
      });

      setAdsList(data.data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
  }, []);
  useEffect(() => {
    getAdsList();
  }, [openAdd]);


  
  return (
    <Box sx={{ padding: 2 }}>
    <AddAds open={openAdd} handleClose={handleCloseAdd}   getAdsList={getAdsList()} />

      <HeaderComponents
        title={"ADS Table Details"}
        buttonName={"Add New Ads"}
        anyFunction={handleOpenAdd}
        addOn={'yes'}
      />

      {isLoading ? (
        <Loading />
      ) : adsList.length !== 0 ? (
        <Tables array={adsList} distract={distract} headerTableArray={headerTableArray} openDeleteModal={handleOpenModal} actions={'yes'}/>
      ) : (
        <NoData />
      )}
      {openDeleteModal?
      <DeleteModal name={'ads'} closeModal={handleCloseModal}/>
      :''}
    </Box>
  );
}
