import { Box, Button, Table, TableContainer, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Actions from "../../../../../SharedModule/Components/Actions/Actions";
// ==============================


// ===============================
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(226, 229, 235, 1)",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdsList() {
  const [adsList, setAdsList] = useState([]);

  async function getAdsList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/ads`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkODg3NDZlYmJiZWZiYzE5ZjgzNTIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzIxMTU0NywiZXhwIjoxNzE0NDIxMTQ3fQ.7MqD3AXL084Rdk-yMz64VGk_X2-zAo0x0qArnEnSJfo",
        },
      });
      console.log(data.data.ads);

      setAdsList(data.data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }

  useEffect(() => {
    getAdsList();
  }, []);


  return (
    <Box sx={{ padding: 2 }}>
      <HeaderComponents
        title={"ADS Table Details"}
        buttonName={"Add New Ads"}
      />

      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ padding: 4 }}>Room Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>
              <StyledTableCell align="center">Active</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adsList.map((ads) => (
              <StyledTableRow key={ads?._id}>
                <StyledTableCell
                  sx={{ paddingX: 4 }}
                  component="th"
                  scope="row"
                >
                  {ads?.room.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ads?.room.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ads?.room.discount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ads?.room.capacity}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {String(ads?.isActive)}
                </StyledTableCell>
                <StyledTableCell 
                    sx={{padding:0,margin:0}}
                    align="center">

<Actions/>

                  {/* <Box>
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
                      <MenuItem onClick={handleClose} disableRipple>
                        <EditIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Delete />
                        Delete
                      </MenuItem>
                    </StyledMenu>
                  </Box> */}


                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
