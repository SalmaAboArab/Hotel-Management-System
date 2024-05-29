import axios from 'axios';
import  { useEffect, useState } from 'react'
import { baseUrl } from '../../../Constants/Components/Urls';
import { Box, Button, Card, CardContent,Grid, Paper,  TextField,  Typography, CardMedia } from '@mui/material';

import { toast } from "react-toastify";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TvIcon from "@mui/icons-material/Tv";
import BluetoothIcon from "@mui/icons-material/Bluetooth";

import Calendar from './Calender';
import dayjs, { Dayjs } from "dayjs";


import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Loading from '../../../SharedModule/Components/Loading/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "auto",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  
}));


export default function RoomDetails() {
const navigate =useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo,setRoomInfo]=useState([]);
  const token=localStorage.getItem('adminToken');
  const { id,enddate,startdate } = useParams();
  const [price , setPrice ] = useState(0)
  const [loading, setLoading] = useState<boolean>(true);
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,nextDate]);
  const roomDateStart = selectedDateRange[0];
  const roomDateEnd = selectedDateRange[1];
  const startDate = dayjs(roomDateStart).format("YYYY-MM-DD");
  const endDate = dayjs(roomDateEnd).format("YYYY-MM-DD");
  

  
  const  getRoomDetail=async()=> {
    
    try {
      const response = await axios.get
(`${baseUrl}/portal/rooms/${id}`, {
        headers: {
          Authorization:token
        },
      });  
  
      setRoomInfo(response?.data?.data?.room);
      console.log(response.data.data)
    } catch (error) {
      console.error("Somthing went wrong", error);
       setIsLoading(false);
    }
    
  }
  // create booking

  const createBooking = async () => {
   
    try {
      const requestBody = {
        startDate: startDate,
        endDate: endDate,
        room: id ,
        totalPrice: price * dayjs(roomDateEnd).diff(roomDateStart, 'day')
      };
  
      const response = await axios.post(
        `${baseUrl}/portal/booking`,
        requestBody,
        {
          headers: {
            Authorization:token
            // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJlMTJhZjZlYmJiZWZiYzFhMzRkMjgiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE0Mjk1NDk4LCJleHAiOjE3MTU1MDUwOTh9.bB5wEdYvaMAnldd-NwFYu5MM5sGHXmyt-FnYBiGySlE"
          },
        }
      );
      console.log(id);
      toast.success('Booking created successfully')

      // navigate("/payment")

    } catch (error) {
      console.log(error)
      toast.error("Booking creation failed ");
    } 
  }

  // create comment888888888888888888888888

  const { register, handleSubmit,  formState: { errors } } = useForm();
const submitRate=async(data:any)=>{
  // const token=localStorage.getItem('userToken');
  try {
    const response = await axios.post
(`${baseUrl}/portal/room-reviews`,data, {
      headers: { Authorization:token}
    });  

    console.log(response)
  } catch (error) {
    console.error("Somthing went wrong", error);
  }
  
}

  const  createComment=async(data:any)=> {
    // const token=localStorage.getItem('userToken');
    try {
      const response = await axios.post
  (`${baseUrl}/portal/room-comments`,data, {
        headers: { Authorization:token} });  
  
      console.log(response)
    } catch (error) {
      console.error("Somthing went wrong", error);
    }
    
  }
  
  useEffect(() => {
    setIsLoading(true);
   getRoomDetail();
  },[]);
  function srcset(images: [], size: number, rows = 1, cols = 1) {
    return {
      src: `${images}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${images}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <>
       <Box sx={{minHeight:"30vw",width:"90%" ,margin:"auto"}}>
       { !isLoading ? (
      <Loading/>
    ) :<>
       <Typography variant="h4" style={{padding:"5px"}} textAlign={'center'} >{roomInfo.roomNumber}</Typography>
       <Typography variant="body1" style={{ marginRight: "5px" }}>
                <Link
                  to="/"
                  style={{ color: "#B0B0B0", textDecoration: "none" }}
                >
                  Home
                </Link>
              </Typography>
       <Grid container spacing={2} p={3}>
            {roomInfo?.images?.map((image, index) => (
                <Grid item key={index} xs={6}  md={12} >
                    <Card>
                        <CardMedia
                            component="img"
                            alt={image.alt}
                           height={350}
                            image={image} // image.url should be the URL of the image
                         
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
     
       <Grid container   rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} p={2}>
        <Typography  color="text.secondary" sx={{ opacity: 0.6 }} variant="p">Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
        Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
        Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
        </Typography>
        <Box
        sx={{padding:"5px",
          textAlign:"center"
        }}>
        <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <BedIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bedroom</Box>
                  </Box>
                  <Box sx={{ marginLeft: "2rem" }}>
                    <WeekendIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Living room</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <BathtubIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bathroom</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <FlatwareIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Dining room</Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <NetworkWifiIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Mbp/s</Box>
                  </Box>
                  <Box sx={{ marginLeft: "2rem" }}>
                    <AcUnitIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}>Unit Ready</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <BluetoothIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bluetooth</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <TvIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> television</Box>
                  </Box>
                  </Box>
                  </Box>
        </Grid>
        <Grid p={2} item xs={6}  textAlign={'center'} >
        <Card   >
        <Typography variant="h5" component="div">
           Start Booking
          </Typography>

          {/* booking8888888888888 */}
        <CardContent>
          <Typography variant="h5" p={5} color="text.secondary">
         {roomInfo.price} $ Per night
          </Typography>
          <Typography variant="p" color="error">
       Discount {roomInfo.discount} % off 
          </Typography>
          <Typography p={5}  color="text.secondary">
     pick a date
          </Typography>

         
  

    <Typography p={1}  color="text.secondary">
     you will pay {roomInfo.price*roomInfo.capacity} $ per {roomInfo.capacity} person
          </Typography> 
         
          <Calendar {...{ selectedDateRange, setSelectedDateRange }} />
          <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "3rem",
                    }}
                  >
                    <Button onClick={()=>{createBooking()}} 
                    variant="contained">Continue Book</Button>
</Box>
        </CardContent>
      </Card>
        </Grid>
      </Grid>
     

     
<Grid container spacing={2}>
            {/* Grid item with full width on extra-small screens and half width on medium screens */}
            <Grid item xs={12} md={6}>
              
                <Box component="form" onSubmit={handleSubmit(createComment)} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Typography variant="h6" mb={2}>
            Add Your Comment
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("comment",{required:true})}
            />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>

            </Grid>
            
            {/* Grid item with full width on extra-small screens and half width on medium screens */}
            <Grid item xs={12} md={6}>
              
                <Box component="form" onSubmit={handleSubmit(submitRate)} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Typography variant="h6" mb={2}>
               Rate
            </Typography>
            <Typography >Message</Typography>
            {/* <Rating
      {...register("rating",{required:true})}
      
      value={value}
      precision={0.5}
     
    /> */}
            <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("review",{required:true})}
            />
              <Button type="submit" variant="contained" color="primary" fullWidth>
               Rate
            </Button>
        </Box> 
             
            </Grid>
    </Grid>        

    </>}
        
       </Box>
    </>
  )
}
