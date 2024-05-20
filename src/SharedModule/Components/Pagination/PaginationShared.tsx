import { Box, Pagination } from "@mui/material";

export default function PaginationShared({countPage,handlePage,totalPages}) {
  return <>
  
  
  <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
              <Pagination
              
                page={Number(countPage)}
                onChange={handlePage}
                count={Number(totalPages)}
                color="primary"
              />
            </Box>
  
  </>
}
