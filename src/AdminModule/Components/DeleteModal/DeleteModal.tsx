import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import trash from '../../../assets/trash.png'
import axios from 'axios';
import { baseUrl } from '../../../Constants/Components/Urls';
import { toast } from 'react-toastify';

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

type props={
    name:string;
    closeModal:Function;
}
export default function DeleteModal({name,closeModal}:props) {
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const id=localStorage.getItem('curruntItemId');

  async function handleDelete() {
    try {
        let response= await axios.delete(`${baseUrl}/admin/${name}/${id}`,{
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMxNDk2NywiZXhwIjoxNzE0NTI0NTY3fQ.hZHGyq8URhmMYQ11qie8VUDRyU1JY9LujY8j7_XIamY",
            },
          });
          toast.success('Item Deleted Successfully')
          handleClose();
          closeModal();
          
    } catch (error) {
        handleClose();
        closeModal();
        toast.error('Somthing went wrong!');
    }
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
            
            <Box sx={{textAlign:'center',mx:5,my:3}}><img src={trash} alt="" /></Box>
            <Box sx={{textAlign:'center',mx:0}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Delete This Item ?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, color:'#494949' }} component='p'>
            are you sure you want to delete this item? 
            {/* <br/>  */}
            {/* if you are sure just click on delete it */}

            </Typography>
            <Box>
                <Button
                  // fullWidth
                  variant="outlined"
                  color='error'
                  // sx={{ mt: 4, mb: 2, py: 1 }}
                  sx={{mx:1, my:3, px:3}}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  // fullWidth
                  variant="outlined"
                  color='info'
                  // sx={{ mt: 4, mb: 2, py: 1 }}
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