import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {   useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from "react-toastify";


export default function Navbar() {
  let userRole=JSON.parse(localStorage.getItem('userRole')) ;
  console.log(userRole);

  let navigate=useNavigate();
  const navItems = ['Home', 'About', 'Contact'];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  <Typography variant="h6" sx={{ my: 2 }}>
    MUI
  </Typography>
  <Divider />
  <List>
    {navItems.map((item) => (
      <ListItem key={item} disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
</Box>

 
  return (
   <>


<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:'#FFFFFF'}}>
        <Toolbar>
         
        <Typography
           sx={{flexGrow:1}}
            variant="h4"
            component="div"
            color="initial"
          >
            <Typography
              variant="h4"
             
              style={{ fontSize: "clamp(1rem, 4vw, 2rem)",color:'#3d5afe', marginLeft:'70px' }}
            >
              Stay
            </Typography>
            cation.
          </Typography>



          <Link href="/" sx={{margin:'10px',color:'black',textDecoration:'none',"&:hover":{color:'blue'}}}>
                 Home
          </Link>
          <Link href="/all-rooms" sx={{margin:'10px',color:'black',textDecoration:'none',"&:hover":{color:'blue'}}}>
                 Explore
          </Link>
          <IconButton sx={{p:'20px'}} >
{userRole=='user'?( <FavoriteIcon onClick={() => navigate("/favorite-room")} color="error"/>):(<FavoriteIcon onClick={()=>toast.error('sure login')}/>)}
           
          </IconButton>
        
          <Button variant="outlined">AR</Button>

         <Button variant="contained" color='primary'  sx={{ marginLeft: "10px",  height: "40px" }} onClick={() => navigate("./Authentication")}>Login Now</Button>
          <Button variant="contained" color='success' sx={{ marginLeft: "10px",  height: "40px" ,background:'#ffc107' }}  onClick={() => navigate("./Authentication/register")}>Sign Up</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
   {/*<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ color: "#152C5B", background: "#fff" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Staycation.
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
          <Typography
           variant="caption"
          >
          <Link href="/" underline="hover" sx={{fontSize:'25px',margin:'10px'}}> Home </Link>
  
          </Typography>
          <Typography
            variant="caption"          >
           <Link href="/all-rooms" underline="hover" sx={{fontSize:'25px',margin:'10px'}}>Explore</Link>
  
 

          </Typography>
          <Button variant="contained"  sx={{ marginLeft: "10px", width: "180px", height: "40px" }} onClick={() => navigate("./Authentication")}>Login</Button>
          <Button variant="caption"  sx={{ marginLeft: "10px", width: "180px", height: "40px" ,background:'#ffc107',color:'#FFFFFF' }}  onClick={() => navigate("./Authentication/register")}>SignUp</Button>
         
                   
                  
                  
                 
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
       
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
  </Box>*/}
    
   </>
  )
}
