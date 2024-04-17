import { Delete, MoreVert, Visibility } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Menu } from "@mui/material";
import { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 5px 5px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));
export default function ActionsAds({id}) {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function deleteAds() {
    
    console.log(id);
    
    try {
      const { data } = await axios.delete(`${baseUrl}/admin/ads/${id}`, {
        headers: {
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmNzU5ODZlYmJiZWZiYzE5ZWEyMmUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzMwNDczMywiZXhwIjoxNzE0NTE0MzMzfQ.T4R-kftCVUlZuPZddbWyVrcBUPN7bMY6O7Z3jHMY9D0",
        },
      });


      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <>
      <Box>
        <Button
          variant="text"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVert />
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Visibility />
            View
          </MenuItem>
          <MenuItem  disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem onClick={()=>{
            deleteAds()
          }} disableRipple>
            <Delete />
            Delete
          </MenuItem>
        </StyledMenu>
      </Box>
    </>
  );
}
