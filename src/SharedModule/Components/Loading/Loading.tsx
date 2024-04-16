import { Box } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return <>
  <Box sx={{width:"100%",display:"flex",justifyContent:"center",mt:10}} >

  <ThreeDots
  visible={true}
  height="180"
  width="180"
  color="#1565c0"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </Box>

  </>
}
