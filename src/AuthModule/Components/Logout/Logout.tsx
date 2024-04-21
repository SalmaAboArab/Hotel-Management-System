import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logout from '../../../assets/logout.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: "95%", // Default width
  "@media (min-width:400px)": {
    width: 400,
  },
  "@media (min-width:800px)": {
    width: 450,
  },
};

type props={
    closeModal:()=>void;
}


export default function Logout({closeModal}:props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
    handleClose();
    closeModal();
    toast.success('Bye Bye');
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>{handleClose;closeModal();}}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        
      >
        <Fade in={open}>
          <Box sx={style} borderRadius={3} border='true' borderColor={'#d32f2f'}>
            
            <Box sx={{textAlign:'center',mx:5,my:3,width:'100%',paddingRight:3}}><img src={logout} alt="" style={{width:'40%'}}/></Box>
            <Box sx={{textAlign:'center',mx:0}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Logout?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, color:'#494949' }} component='p'>
            Are you sure you want to leave? 

            </Typography>
            <Box>
                <Button
                  variant="outlined"
                  color='error'
                  sx={{mx:1, my:3, px:3}}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="outlined"
                  color='info'
                  sx={{mx:1, my:3, px:3}}
                  onClick={()=>{closeModal(); handleClose;}}
                >
                  Cancel
                </Button>
            </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
