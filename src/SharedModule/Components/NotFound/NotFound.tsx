import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import notfound from '../../../assets/Error404.png'

export default function NotFound() {
  return (

<Box sx={{bgcolor:'#6d9fd7',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',py:3}}>
<Container  sx={{bgcolor:'#6d9fd7',boxShadow:'5',borderRadius:'30px',py:3,mx:2}}>
            
            <Box sx={{textAlign:'center',width:'100%'}}><img 
            // src="https://i.imgur.com/qIufhof.png"
            src={notfound}
             alt="404 error page" style={{width:'50%'}}/></Box>
            <Box sx={{textAlign:'center'}}>
              <Typography variant='h4'>Error 404!</Typography>
              <Typography variant='h4'>...</Typography>
              <Typography variant='h6' py={1}>This Page doesn’t exist or was removed!</Typography>
              <Typography variant='h6' pb={2}>We suggest you back.</Typography>
              
            </Box>
            </Container>
</Box>
)
}
