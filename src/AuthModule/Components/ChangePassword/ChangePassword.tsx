import { Button, Dialog, DialogContent,  Grid,  IconButton,  Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../../Constants/Components/Urls';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ChangePassword({handleClose:any}) {
  
    const [open, setOpen] = useState(false);
    
    const [showPasswordOldPassword, setShowPasswordOldPassword] = useState(true);
  const [showPasswordNewPassword, setShowPasswordNewPassword] = useState(true);
  const [showPasswordConfirmPassword, setShowPasswordConfirmPassword] =useState(true);

  const togglePasswordVisibilityOldPassword = () => {
    setShowPasswordOldPassword(!showPasswordOldPassword);
  };

  const togglePasswordVisibilityNewPassword = () => {
    setShowPasswordNewPassword(!showPasswordNewPassword);
  };

  const togglePasswordVisibilityConfirmPassword = () => {
    setShowPasswordConfirmPassword(!showPasswordConfirmPassword);
  };
   

    const {register,handleSubmit,watch, formState: { errors },setValue}=useForm();

const submitData=async(data:IChangePassword)=>{
try {
  const response=await axios.post(`${baseUrl}/admin/users/change-password`,data,
  {headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFhYTZkNzZlYmJiZWZiYzE5ZjMyM2UiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzAyNDQ1MCwiZXhwIjoxNzE0MjM0MDUwfQ.WGP2BzDpvgwhKVCenvoDk7yOr4GnG4utAhSnf-baTOg"}})
  console.log(response)
} catch (error) {
  
}
}


  return (
    <div>
      <div className='text-center'>
      <Typography variant="h4" component="h2">
  Change Password
</Typography>
      </div>
         
          <form  onSubmit={handleSubmit(submitData)}>
      <Stack spacing={2} margin={2}>

      <Grid sx={{position:'relative'}}>
   <TextField
   sx={{width:"100%"}}
   type={!showPasswordOldPassword ? "text" : "password"}
   {...register("oldPassword")}
       variant="filled"
       size="small"
        label="old Password"
        name="oldPassword"
        required
      />
                <IconButton disableRipple
                onClick={togglePasswordVisibilityOldPassword}
                  sx={{
                    color:"blue",
                    position:"absolute",
                    minWidth: 0,
                    right:0,
                    padding:2,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   {showPasswordOldPassword ?<RemoveRedEyeIcon/> :<VisibilityOffIcon/>}
                </IconButton>
                
   </Grid>
   
   <Grid sx={{position:'relative'}}>
   <TextField
   sx={{width:"100%"}}
   type={!showPasswordNewPassword ? "text" : "password"}
   {...register("newPassword")}
       variant="filled"
       size="small"
        label="New Password"
        name="newPassword"
        required
      />
         <IconButton disableRipple
                onClick={togglePasswordVisibilityNewPassword}
                  sx={{
                    color:"blue",
                    position:"absolute",
                    minWidth: 0,
                    right:0,
                    padding:2,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   {showPasswordNewPassword ?<RemoveRedEyeIcon/> :<VisibilityOffIcon/>}
              
                </IconButton>
   </Grid>


   <Grid sx={{position:'relative'}}>
<TextField
 sx={{width:"100%"}}
      variant="filled"
      size="small"
        label="Confirm Password"
       
        type={!showPasswordConfirmPassword ? "text" : "password"}
        {...register("confirmPassword")}
        required
        name="confirmPassword"
      />
       <IconButton disableRipple
                onClick={togglePasswordVisibilityConfirmPassword}
                  sx={{
                    color:"blue",
                    position:"absolute",
                    minWidth: 0,
                    right:0,
                    padding:2,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   {showPasswordConfirmPassword ?<RemoveRedEyeIcon/> :<VisibilityOffIcon/>}
                </IconButton>
</Grid>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      </Stack>
    </form>
     
    </div>
  )
}
