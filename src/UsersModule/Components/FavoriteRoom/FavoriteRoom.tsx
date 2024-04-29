import { Container, Typography } from '@mui/material';
import { baseUrl } from '../../../Constants/Components/Urls';
import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import style from '../AllRooms/AllRooms.module.css';
export default function FavoriteRoom() {
  const[favorites,setFavorites]=useState([]);
  const navigate=useNavigate();
  //let token = localStorage.getItem("adminToken");
  /////////////explore favorit list room//////////////////////////////////
  async function favoritesList() {
    try {
      const response= await axios.get(`${baseUrl}/portal/favorite-rooms`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNjdlN2RiNzVhYzQ5ODAzNTY5ZDYiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE0MDE1MzU3LCJleHAiOjE3MTUyMjQ5NTd9.4AZOGtoXVEQ0Ss55wiav379QUL6EcBaDETCr0FRZTG0",
        },
      }
     
    );
   
    setFavorites(response.data.data.favoriteRooms[0].rooms);
      console.log(response.data.data.favoriteRooms[0].rooms);
      
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    favoritesList();
  }, []);

  ///////////////////////////delete fav room///////////////////////////////////////

  async function deleteFavRoom(roomId) {
    console.log(roomId)
    try {
      const response= await axios.delete(`${baseUrl}/portal/favorite-rooms/${roomId}`,{'roomId':roomId}, {
        headers: {
          Authorization:
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI5ZDBiNzZlYmJiZWZiYzFhMjQyMjEiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE0MzYxODY4LCJleHAiOjE3MTU1NzE0Njh9.y3vu5rQPcw1KBONiT1iIwZmtt3ANxuQ_mBD-yQTLewE",
        },
            
      }
     
    );
      console.log(response);
      toast.success('delete successfully')
    } catch (error) {
      console.error(error);
      toast.error(error)
    }
  }
  return (
   <>
 <Container sx={{background:'#FFFFFF'}}>
<Typography sx={{marginTop:'60px',display:'flex',justifyContent:'center', fontSize:'40px',color:'#152C5B',fontFamily:"sans-serif"}}>Your Favorites </Typography>
<Link sx={{textDecoration:'none',color:'gray'}} href="/">Home</Link>
<Link sx={{textDecoration:'none',color:'gray'}} href="/favorite-room"> / Favorites</Link>
<Typography sx={{marginTop:'50px',color:'#152C5B',fontSize:'20px',fontFamily:"sans-serif"}}>
Your Rooms
</Typography>

      <Box sx={{marginTop:'50px'}}>
{favorites?.length > 0 ? (
          <Paper>
             
             <Box
     
    >
      <ImageList sx={{ width: '100%',  }} cols={4} >
      {favorites.map((favRooms) => (
        <ImageListItem className={style.member}  key={favRooms._id}>
         <img
           loading="lazy"
                            className=" imagemodify"
                            src={
                             
                                favRooms?.images[0]
                            }
                          />
                           <Box className={style.memberCaption}>
                            <div className={style.icon}>
                            <FavoriteIcon onClick={()=>deleteFavRoom(favRooms._id)} sx={{margin:'20px'}}  />
                            <VisibilityIcon onClick={()=>navigate('/all-rooms/room-details')}/>
                            </div>
                          </Box>
                          
        </ImageListItem>

       

      )
      )}
    </ImageList>

   
            
              </Box>
              </Paper>
          ) : (
            <NoData/>
          )}
        </Box>


      
   </Container>
   </>
  )
}
