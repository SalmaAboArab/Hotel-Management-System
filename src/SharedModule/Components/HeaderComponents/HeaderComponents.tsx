import { Box, Button, Typography, createTheme } from "@mui/material";

export default function HeaderComponents({ title, buttonName , anyFunction}) {

    const theme = createTheme({
        button: {
            fontSize: 16,
            fontWeight: 600
        },
    });

   

    return (
        <>

            <Box sx={{ textTransform: "capitalize", border: 2, padding: 2, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>


                <Box>

                    <Typography component={"h2"} variant="h4">
                        {title}
                    </Typography>
                    <Typography component={"p"} variant="h6">
                        you can check all details
                    </Typography>
                </Box>

                <Box>

                    <Button onClick={()=>anyFunction()} sx={{ paddingX: 3, textTransform: "capitalize", fontSize: theme.button.fontSize, fontWeight: theme.button.fontWeight  }} variant="contained">{buttonName}</Button>

                </Box>


            </Box>
        </>
    );
}
