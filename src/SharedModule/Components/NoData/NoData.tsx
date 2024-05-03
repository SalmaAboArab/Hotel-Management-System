import { Box, Typography } from "@mui/material";
import nodata from '../../../assets/No data-blue.png'
import { Container } from "react-bootstrap";
export default function NoData() {
  return (
    
    <Box sx={{textAlign:'center',my:3}}>
      <Container style={{width:'100%'}}><img src={nodata} alt="No data founded" style={{width:'40%'}}/></Container>
      <Typography variant="h5" color={'primary.main'}>
        No Data Founded!
      </Typography>
    </Box>
  )
}
