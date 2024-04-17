import { Box, Button, Typography, createTheme } from "@mui/material";

type props={
    title:string;
    buttonName:string;
    addOn:string;
}
export default function HeaderComponents({ title, buttonName ,addOn }:props) {
    const theme = createTheme({
        button: {
            fontSize: 16,
            fontWeight: 600
        },
    });

    return (
        <>
            <Box sx={{ textTransform: "capitalize", padding: 2, my:4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>


                <Box>

                    <Typography component={"h2"} variant="h4">
                        {title}
                    </Typography>
                    <Typography component={"p"} variant="h6">
                        you can check all details
                    </Typography>
                </Box>

               {addOn=='no'?'':
                <Box>

                <Button type="submit" sx={{ paddingX: 3, textTransform: "capitalize", fontSize: theme.button.fontSize, fontWeight: theme.button.fontWeight  }} variant="contained">{buttonName}</Button>
                
                </Box>
               }


            </Box>
        </>
    );
}
