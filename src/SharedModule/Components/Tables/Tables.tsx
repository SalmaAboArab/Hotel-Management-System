import { Button, Table, TableContainer, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ActionsAds from "../../../AdminModule/Components/Ads/Components/ActionsAds/ActionsAds";

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
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// export default function Tables({ array, headerTableArray ,distract}) {
  
  
  
  type tableProps={
    array:object[];
    headerTableArray:string[];
    distract:string[];
    actions:string;
    openDeleteModal:Function;
  }
  export default function Tables({ array, headerTableArray ,distract ,actions,openDeleteModal}:tableProps) {
  const [id, setId] = useState(null)
const [allActions,setAllActions]=useState<string>('yes');
useEffect(()=>{
if(actions=='no') setAllActions('no');
},[])
  return (
    <>
      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        <Table sx={{ minWidth: 700 ,}} aria-label="table">
          <TableHead>
            <TableRow >
              {headerTableArray.map((name, indx) => (
                <StyledTableCell key={indx} sx={{paddingY:4}} align="center">{name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {array.map((item) => (
              <StyledTableRow key={item?._id}>
                {distract.map((path, index) => (
                  <StyledTableCell key={index} align="center">
                    {String(eval(`item${path}`))}
                  </StyledTableCell>
                ))}
                
                <StyledTableCell  sx={{margin:0, padding:0,width:"10px" }} align="center">
                  <Button type="submit" sx={{padding:0}} onClick={()=>{                    
                  setId(item?._id)
                  }} >
                  <ActionsAds   allActions={allActions} id={id} openDeleteModal={openDeleteModal} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
