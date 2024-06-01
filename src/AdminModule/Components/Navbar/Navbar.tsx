import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { baseUrl } from '../../../Constants/Components/Urls';
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import defaultImage from '../../../assets/Avatar.png'




export default function Navbar() {
  const[userData,setUserData]=useState();
//let loginData=localStorage.getItem('loginData');
const loginData=JSON.parse(localStorage.getItem('loginData'))
//console.log(loginData._id);
let token = localStorage.getItem("adminToken");
async function getUserDetails() {
  try {
    const response= await axios.get(`${baseUrl}/portal/users/${loginData._id}`, {
      headers:
         { Authorization: token },
    });

    setUserData(response.data.data.user);
    console.log(response.data.data.user);
    
  } catch (error) {
    console.error(error);
  }
  
}
useEffect(() => {
  getUserDetails();
}, []);


  

  return (
   <>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{background:'#FFFFFF'}}>
        <Typography
           sx={{flexGrow:1}}
            variant="h4"
            component="div"
            color="initial"
          >
            <Typography
              variant=""
             
              style={{ fontSize: "clamp(1rem, 4vw, 2rem)",color:'#3d5afe', marginLeft:'70px' }}
            >
              Stay
            </Typography>
            cation.
          </Typography>
         <Avatar   src={
                      userData?.profileImage == null
                        ? defaultImage
                        : 
                        userData?.profileImage
                    }
                  />
          <Typography variant="caption" color="black" sx={{padding:'15px'}}>
                {userData?.userName}
              </Typography>
        </Toolbar>
      </AppBar>
    </Box>
{/*<AppBar position="static" >
        <Container maxWidth="xl" sx={{background:'#FFFFFF'}}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { sm: "none" }, color: "black" }}>
              <IconButton
               
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box className="navAvatar">
              <Tooltip title="Open settings">
              <IconButton >
                  <img
                    crossOrigin="anonymous" 
                    className="nav-img"
                    src={
                      
                        `https://upskilling-egypt.com:3000/` +
                        userData?.profileImage
                    }
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Box className="navInfo" sx={{marginLeft:'auto'}}>
           
              <Typography variant="caption" color="black" sx={{padding:'15px'}}>
                {userData?.userName}
              </Typography>
              <Typography variant="caption" color="initial">
                {userData?.email}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
                  </AppBar>*/}



   </>
  )
}
