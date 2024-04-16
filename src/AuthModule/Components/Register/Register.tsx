import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import bg from "../../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls";
import {
  countryValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../Validators/Validators";
import axios from "axios";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function Register() {
  // const defaultTheme = createTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const confirmPassword = watch("password");

  type RegisterData = {
    userName: string;
    phoneNumber: number;
    country: string;
    email: string;
    password: string;
    cPassword: string;
  };

  async function handleRegister(data: RegisterData) {
    // console.log(data);

    try {
      const response = await axios.post(`${baseUrl}/admin/users`, data);
      // console.log(response);
      toast.success('Account Created Succefully');
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message||'Somthing went wrong!');
    }
  }
  return (
    <>
      {/* <ThemeProvider theme={defaultTheme}> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <CssBaseline /> */}

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={6}
          component={Paper}
          elevation={6}
          square
          sx={{ height: "100vh" }}
          style={{ overflow: "auto" }}
          className="pageOverflow"
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
            }}
          >
            <Link
              to={"/"}
              style={{
                color: "#3252df",
                fontSize: "1.5rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Stay
              <Typography
                component="span"
                variant="h5"
                sx={{ color: "#152c5b" }}
              >
                cation.
              </Typography>
            </Link>
          </Box>

          <Box
            // bgcolor={'red'}
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <Container maxWidth="sm">
              <Box
                sx={{
                  my: 3,
                }}
              >
                <Typography
                  fontWeight={600}
                  variant="h5"
                  sx={{
                    my: 4,
                  }}
                >
                  Sign up
                </Typography>
                <Typography variant="body1">
                  If you already have an account register <br /> You can{" "}
                  <Link
                    to={"/Authentication"}
                    style={{
                      color: "#eb5148",
                      textDecoration: "none",
                      fontWeight: 600,
                      marginLeft: 5,
                    }}
                  >
                    Login here !
                  </Link>
                </Typography>
              </Box>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit(handleRegister)}
              >
                <Box>
                  <Typography sx={{ mt: 1 }}>User Name</Typography>
                  <TextField
                    // sx={{bgcolor:'#F5F6F8'}}
                    placeholder="Please type here ..."
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    // label="User Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    {...register("userName", userNameValidation)}
                  />
                  {errors.username && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.userName.message}
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography sx={{ mt: 1 }}>Phone Number</Typography>
                    <TextField
                      // sx={{bgcolor:'#F5F6F8'}}
                      placeholder="Please type here ..."
                      margin="normal"
                      required
                      fullWidth
                      id="phoneNumber"
                      // label="Email Address"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      autoFocus
                      {...register("phoneNumber", phoneNumberValidation)}
                    />
                    {errors.phoneNumber && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {errors.phoneNumber.message}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography sx={{ mt: 1 }}>Country</Typography>
                    <TextField
                      // sx={{bgcolor:'#F5F6F8'}}
                      placeholder="Please type here ..."
                      margin="normal"
                      required
                      fullWidth
                      id="country"
                      // label="Email Address"
                      name="country"
                      autoComplete="country"
                      autoFocus
                      {...register("country", countryValidation)}
                    />
                    {errors.country && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {errors.country.message}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography sx={{ mt: 1 }}>Email Address</Typography>
                  <TextField
                    // sx={{bgcolor:'#F5F6F8'}}
                    placeholder="Please type here ..."
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    // label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...register("email", emailValidation)}
                  />
                  {errors.email && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography sx={{ mt: 1 }}>Password</Typography>
                  <TextField
                    // sx={{bgcolor:'#F5F6F8'}}
                    placeholder="Please type here ..."
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    // label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", passwordValidation)}
                  />
                  {errors.password && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.password.message}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography sx={{ mt: 1 }}>Confirm Password</Typography>
                  <TextField
                    // sx={{bgcolor:'#F5F6F8'}}
                    placeholder="Please type here ..."
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    // label="Password"
                    type="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value: string) =>
                        value === confirmPassword || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                </Box>

                <FormControl
                  sx={{ my: 3, display: "flex", alignItems: "center" }}
                >
                  <FormLabel
                    id="demo-form-control-label-placement"
                    sx={{ color: "blue" }}
                  >
                    Role
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="top"
                    {...register("role", { required: "Role is required" })}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                  {errors.role && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>

                <Box
                sx={{ display: "flex", flexDirection:'column', alignItems: "center" }}
                >
                <Button
                
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  // startIcon={<CloudUploadIcon />}
                  {...register("profileImage", { required: "Image is required" })}
                >
                  Upload image
                  <VisuallyHiddenInput type="file" />
                </Button>
                {errors.profileImage && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.profileImage.message}
                    </Typography>
                  )}
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2, bgcolor: "#3252DF", py: 2 }}
                >
                  Sign up
                </Button>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid
          bgcolor={"white"}
          item
          // xs={false}
          sm={false}
          md={7}
          lg={6}
          sx={{
            height: "100vh",
            width: "100%",
            paddingY: 3,
            // bgcolor:'red'
          }}
        >
          <Container
            sx={{
              height: "95vh",
              width: "90%",
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              borderRadius: "2%",
              bgcolor: "white",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Container>
        </Grid>
      </Grid>
      {/* </ThemeProvider> */}
    </>
  );
}
