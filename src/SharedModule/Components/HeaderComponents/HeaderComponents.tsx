import { Box, Button, Typography, createTheme } from "@mui/material";

type HeaderProps = {
  title: string;
  buttonName: string;
  addOn: 'yes' | 'no'; 
  anyFunction: () => void; 
}
export default function HeaderComponents({
  title,
  buttonName,
  addOn,
  anyFunction
}: HeaderProps) {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: 16,
            fontWeight: 600
          }
        }
      }
    }
  });

  return (
    <Box sx={{ textTransform: "capitalize", padding: 2, my: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography component="h2" variant="h4">
          {title}
        </Typography>
        <Typography component="p" variant="h6">
          You can check all details
        </Typography>
      </Box>
      {addOn === "no" ? null : (
        <Box>
          <Button onClick={anyFunction} type="submit" sx={{ paddingX: 3, textTransform: "capitalize", fontSize: theme.components?.MuiButton.styleOverrides?.root?.fontSize, fontWeight: theme.components?.MuiButton.styleOverrides?.root?.fontWeight }} variant="contained">
            {buttonName}
          </Button>
        </Box>
      )}
    </Box>
  );
}
