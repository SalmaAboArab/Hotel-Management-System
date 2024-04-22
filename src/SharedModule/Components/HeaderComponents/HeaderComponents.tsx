import { Box, Button, Typography, createTheme, createStyles } from "@mui/material";

type HeaderProps = {
  title: string;
  buttonName: string;
  addOn: 'yes' | 'no'; 
  anyFunction: () => void; 
  OpenFacilitiesAddModal:Function;
  listName:string;
}

const theme = createTheme();

const typographyStyles = createStyles({
  root: {
    fontSize: "1.4rem",
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 28,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "2rem",
    },
  },
});

export default function HeaderComponents({
  title,
  buttonName,
  addOn,
  anyFunction,
  OpenFacilitiesAddModal,
  listName
}: HeaderProps) {
  return (
    <Box sx={{ textTransform: "capitalize", padding: 2, my: 4, display: "flex",flexWrap:"wrap", justifyContent: "space-between", alignItems: "center" }}>
      <Box > 
        <Typography component="h3" sx={{ ...typographyStyles.root }}>
          {title}
        </Typography>
        <Typography component="p" variant="h6">
          You can check all details
        </Typography>
      </Box>

      {addOn === "no" ? null : (
        <Box>
          <Button onClick={()=>{
            anyFunction;
            if(listName=='facilities') OpenFacilitiesAddModal();
          }} type="submit" sx={{ paddingX: 3, textTransform: "capitalize", fontSize: "1.1rem" }} variant="contained">
            {buttonName}
          </Button>
        </Box>
      )}
    </Box>
  );
}
