
import { Box, Button, Grid, InputLabel, MenuItem, Select,styled, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../../../../Constants/Components/Urls';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../../../SharedModule/Components/Loading/Loading';
import { CloudUpload } from '@mui/icons-material';
import { ICreateRoom } from './RoomListInterface';
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function RoomsForm() {
 const navigateTo=useNavigate();
 const { action } = useParams();
 const curruntRoomId = localStorage.getItem("curruntItem");
 const [isLoading, setIsLoading] = useState(false);
  const {register,handleSubmit,watch, setValue, formState: { errors }}=useForm();
  const [facilitiesList,setfacilitiesList]=useState<string[]>([]);
const[images,setImages]=useState<File[]>([]);

  const AppendToFormData=(data:ICreateRoom)=>{
    let formData=new FormData();
    formData.append("roomNumber",data.roomNumber);
    formData.append("capacity",data.capacity);
    formData.append("price",data.price);
    formData.append("discount",data.discount);
  
    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", String(facility));
      });
    }
    for(let i=0;i<data.imgs.length;i++){
      formData.append("imgs",data.imgs[i])
    }
  
    return formData;
  }

  const submitData=async(data:ICreateRoom)=>{
   
    let roomAppendForm=AppendToFormData(data);
     
    try {
      const response=await axios.post(`${baseUrl}/admin/rooms`,roomAppendForm,
  {headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFhYTZkNzZlYmJiZWZiYzE5ZjMyM2UiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzAyNDQ1MCwiZXhwIjoxNzE0MjM0MDUwfQ.WGP2BzDpvgwhKVCenvoDk7yOr4GnG4utAhSnf-baTOg"}})
  console.log(response)
  setTimeout(()=>{
    toast.success(`${process} done`,{autoClose: 5000}),1000
   }) 
   navigateTo("/Admin/rooms")
 } catch (error) {
  toast.error(error?.response?.data?.message || "Something went wrong!");
 } 
  }

// get facilitiesList
  
  const gitAllFacilities=async()=>{
    try {
   
      const response=await axios.get(`${baseUrl}/admin/room-facilities` ,
       {headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFhYTZkNzZlYmJiZWZiYzE5ZjMyM2UiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzAyNDQ1MCwiZXhwIjoxNzE0MjM0MDUwfQ.WGP2BzDpvgwhKVCenvoDk7yOr4GnG4utAhSnf-baTOg"}})
      console.log(response.data.data.facilities)
      setfacilitiesList(response?.data?.data?.facilities);
    } catch (error) {
      console.log(error)
    }
      }
      useEffect(()=>{
        gitAllFacilities();
      
          },[])
  return (
    <>
  <form onSubmit={handleSubmit(submitData)}>
   <Grid  justifyContent="center"
      alignItems="center" container p={1} paddingTop={5} spacing={2}>
     
    <Grid item xs={4}>
    <TextField
label="roomNumber"
{...register("roomNumber")}
name="roomNumber"
required
fullWidth
margin="normal"
variant="filled"
size='small'
/>
    </Grid>
<Grid item xs={4}>
<TextField
        label="price"
        {...register("price")}
       name="price"
       required
        fullWidth
        variant="filled"
        margin="normal"
        size='small'
      />
     
</Grid>
   </Grid>
   <Grid container  justifyContent="center"
      alignItems="center" p={1} spacing={2}  >
     
     <Grid item xs={4}>
     <TextField
        label="capacity"
        variant="filled"
        {...register("capacity")}
       name="capacity"
       required
        fullWidth
        margin="normal"
        size='small'
      />
     </Grid>
 <Grid item xs={4}>
 <TextField
 sx={{color:"blue"}}
        label="discount"
        {...register("discount")}
       name="discount"
       required
       variant="filled"
        fullWidth
        margin="normal"
        type="text"
        size='small'
      />
      
 </Grid>
    </Grid>  
    <Grid container p={1} spacing={2}  justifyContent="center"
      alignItems="center">
      <Grid item xs={8}>
      <Select
                label="facilities"
                multiple
                {...register("facilities")}
              value={watch("facilities")|| []}
                required
                variant="filled"
                fullWidth
                type="text"
                name='facilities'
              
              >
                 {facilitiesList.map((facility: any) => (
                  <MenuItem key={facility._id} value={facility._id}>
                    {facility.name}
                  </MenuItem>
                ))}
              </Select>
    
      </Grid>
      <Grid item xs={8} p={2} >
<Stack sx={{backgroundColor:"#dee2e6"}} >
            {watch("imgs") && (
              <Box display="flex" flexWrap="wrap" gap={2} >
                 {Array.from(watch("imgs")).map((file: File, index: number) => (
                  <Box
                    key={index}
                    sx={{ margin: 'auto'}}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      width="100"
                    />
                  </Box>
                ))}
              </Box>
            )}
            <Button
              component="label"
              role={undefined}
              size="large"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload Room Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                {...register("imgs")}
              />
            </Button>
            {errors.imgs && (
              <Typography variant="caption" color="error">
                {errors.imgs.message}
              </Typography>
            )}
          </Stack>
      </Grid>
      <Grid container spacing={8} p={1}  justifyContent="center"
      alignItems="center" >
    <Grid item xs={3} >
    <Button type="submit" 
    size='large' variant="contained" color="primary"
               
              >
                {isLoading ? <Loading /> : "save" }
              </Button>
    </Grid>
    <Grid item xs={3} >
    <Button onClick={()=>navigateTo("/Admin/rooms")} type="submit" size='large' variant="contained" color="primary">
        Cancel
      </Button>
    </Grid>

   </Grid>
     
     </Grid> 
    </form>
 
    </>
  )
}
