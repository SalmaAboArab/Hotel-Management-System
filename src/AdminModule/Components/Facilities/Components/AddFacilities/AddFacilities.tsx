import React from 'react';
import { TextField, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { toast } from "react-toastify";

export default function AddFacilities({getFacilitiesList,CloseAddModal}) {
    //useState=====>Add
  const [openAdd, setOpenAdd] = React.useState(true);
//   const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

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

  //hookForm
  const{register,handleSubmit,formState:{errors}}=useForm();
  


//function elllllllllll add
async function onSubmitAddFacilities(data:object) {
    try {
      const response = await axios.post(`${baseUrl}/admin/room-facilities?5`,data, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMxNDk2NywiZXhwIjoxNzE0NTI0NTY3fQ.hZHGyq8URhmMYQ11qie8VUDRyU1JY9LujY8j7_XIamY",
        },
        
      });
      toast.success('Add is Successuflly');
      getFacilitiesList();
      CloseAddModal();
    handleCloseAdd();
      
     
     // console.log(data.message)
    } catch (error) {
      toast.error(error.message);
     // console.log(error.message);
    }
  }
  return (
   <>
{/*model elllllllllllllll Add------------------------------*/}
<div>
      <Modal
        keepMounted
        open={openAdd}
        onClose={()=>{handleCloseAdd;CloseAddModal();}}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Add Facility
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmitAddFacilities)}>
          <TextField id="standard-basic"  variant="standard" fullWidth
           type="name"
          
           placeholder="Name"
           {...register("name",{required:'Name is required'} )}
           />
             {errors.name && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.name.message}
                  </Typography>
                )}

<Button sx={{marginTop:'50px',float:'right'}}  type="submit"
 variant="contained">Save</Button>
                </form>
          </Typography>
        </Box>
      </Modal>
    </div>
   </>
  )
}
