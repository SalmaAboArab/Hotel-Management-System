import React from 'react';
import { TextField, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";
import ViewModal from '../../../ViewModal/ViewModal';
import DeleteModal from '../../../DeleteModal/DeleteModal';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useForm} from 'react-hook-form';
import { toast } from "react-toastify";
import AddFacilities from '../AddFacilities/AddFacilities';



export default function FacilitiesList() {

  //useState=====>Update
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [currentFacility, setCurrentFacility] = React.useState({});
  const handleOpenUpdate = (Facility:object) =>{
    setOpenUpdate(true);
    setCurrentFacility(Facility);
  } 
   const handleCloseUpdate = () => setOpenUpdate(false);

   //ID==>ellllll update
   let idUpdate=localStorage.getItem('item_id');
   console.log(idUpdate)
   useEffect(()=>{
    setValue("name",currentFacility.name)
  },[currentFacility.name])
 
   //function elllllllllllllll update

async function onSubmitUpdateFacilities(data:object) {
  try {
    const response = await axios.put(`${baseUrl}/admin/room-facilities/${currentFacility?._id}`,data, {
      headers: {
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMwNDczMywiZXhwIjoxNzE0NTE0MzMzfQ.T4R-kftCVUlZuPZddbWyVrcBUPN7bMY6O7Z3jHMY9D0",
      },
      
    });
   console.log(response)
    toast.success('Edit is Succeefully')
    getFacilitiesList();
    
   
   
  } catch (error) {
    toast.error('error');
   console.log(error);
   
  }
  handleCloseUpdate();
 
}

  
//elllllllllll adddd
/*const [openAdd, setOpenAdd] = React.useState(false);
const handleOpenAdd = () => setOpenAdd(true);
const handleCloseAdd = () => setOpenAdd(false);*/


  const [facilitiesList, setFacilitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [curruntFacility,setCurruntFacility]=useState({});
  //view
  const handleOpenViewModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntFacility(curruntItem);
    
  }
  const handleCloseViewModal = () =>{
    setOpenViewModal(false);
  }
  
//delete
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (curruntItem:object) => {
    setOpenDeleteModal(true);
    setCurruntFacility(curruntItem);
  }
  const handleCloseDeleteModal = () =>{
    setOpenDeleteModal(false);
    getFacilitiesList();
  }

  const{register,handleSubmit,formState:{errors},setValue}=useForm();


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
   {/*model elllllllllllllll Update-----------------------------*/}
 <div>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Facility
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmitUpdateFacilities)}>
          <TextField id="standard-basic"  variant="standard" fullWidth
           type="name"
          //  defaultValue={currentFacility?.name}
           placeholder="Name"
           {...register("name",{required:'Name is required'} )}
           />
             {errors.name && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.name.message}
                  </Typography>
                )}

<Button sx={{marginTop:'50px',float:'right'}}  type="submit"
 variant="contained">Edit</Button>
                </form>
          </Typography>
        </Box>
      </Modal>
    </div>

  
 



 

{/*header*/}
      <HeaderComponents
        title={"Facilities Table Details"}
        buttonName={"Add New facilities"}
      //  OpenFacilitiesAddModal={handleOpenAdd}
       
      />

      {isLoading ? (
        <Loading />
      ) : facilitiesList.length !== 0 ? (
        <Tables   openUpdateModel={handleOpenUpdate}
        array={facilitiesList} distract={distract} headerTableArray={headerTableArray} openDeleteModal={handleOpenDeleteModal} openViewModal={handleOpenViewModal} name={'facilities'}/>
      ) : (
        <NoData />
      )}
      {openDeleteModal?
      <DeleteModal name={'room-facilities'} closeModal={handleCloseDeleteModal} curruntItem={curruntFacility}/>
      :''}
      {openViewModal?
      <ViewModal closeModal={handleCloseViewModal} curruntItem={curruntFacility} paths={distract} lables={headerTableArray}/>
      :''}

{
  /*openAdd?
  <AddFacilities getFacilitiesList={FacilitiesList} CloseAddModal={handleCloseAdd} listName={'facilities'}/>
:''
*/}
     
    </Box>
   </>
  )
}
