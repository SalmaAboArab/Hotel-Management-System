import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
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

type props = {
  closeModal: () => void;
};

export default function AnonymousUserAlert({closeModal}:props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose;
          closeModal();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            borderRadius={3}
            border="true"
            borderColor={"primary.main"}
          >

            <Box sx={{textAlign:'center',width:'100%'}}><img 
            src="https://i.imgur.com/qIufhof.png"
             alt="Not Allowed" style={{width:'50%'}}/></Box>

            <Box sx={{ textAlign: "center", mx: 0 }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Not Allowed
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "#494949" }}
                component="p"
              >
                You are not allowed to go there
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "#494949" }}
                component="p"
              >
                You should sign in first
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mx: 1, my: 3, px: 3 }}
                  onClick={()=>navigate('/Authentication')}
                >
                  Signin
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mx: 1, my: 3, px: 3 }}
                  onClick={() => {
                    closeModal();
                    handleClose;
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
