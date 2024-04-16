import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import forgotImage from "../../../assets/resetPAss.png";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import styles from "./ResetPassword.module.css";
import { OTPValidation, emailValidation, passwordValidation } from "../Validators/Validators";
import { FormResetData } from "../../../interfaces/interfaces";


export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormResetData>();

  const confirmPassword = watch("password");

  async function callForgotPassApi(data: FormResetData) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/admin/users/reset-password`,
        data
      );
      toast.success(response.data.message);
      navigate("/Authentication");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "There's a mistake.");
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (data: FormResetData) => {
    callForgotPassApi(data);
  };

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        marginY: 0,
        paddingY: 3,
        display: "flex",
        justifyContent: "center",
        maxHeight: "100%",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "space-around",
        }}
      >
        <Grid item xs={12} sm={8} md={5}>
          <Link to={"/"} className="logo"  style={{ "color" : "#3252df" ,"fontSize":"1.5rem" ,"textDecoration":"none" ,"fontWeight":600}}>
            Stay
            <Typography component="span" variant="h5" sx={{ color: "#152c5b" }}>
              cation.
            </Typography>
          </Link>
          <Box
            sx={{
              marginTop: 5,
              paddingY: 5,
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Box>
              <Typography fontWeight={600} variant="h5">
                Reset password
              </Typography>
              <Typography variant="body1">
                If you already have an account register <br /> You can
                <Link
                  to={"/Authentication"}
                  style={{
                    cursor: "pointer",
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: 5,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="email" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Email</label>
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type="email"
                  id="email"
                  placeholder="Please type here ..."
                  {...register("email", emailValidation)}
                />
                {errors.email && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="otp" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>OTP</label>
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type="text"
                  id="otp"
                  placeholder="Please type here ..."
                  {...register("seed", OTPValidation)}
                />
                {errors.seed && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.seed.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="password" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Password</label>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Please type here ..."
                  {...register("password", passwordValidation)}
                />
                {errors.password && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="confirmPassword" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Confirm Password</label>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Please type here ..."
                  {...register("confirmPassword", { required: "Confirm Password is required" , validate: (value: string) =>
                    value === confirmPassword || "Passwords do not match",})}
                />
                {errors.confirmPassword && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </Box>

              <Button disabled={isLoading} sx={{  paddingY: 2 ,marginTop:5}} type="submit" variant="contained">
                {isLoading ? (<span className={styles.loader}></span>) : ("Reset")}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid  sx={{ display: "flex", alignItems: "center" }} item xs={12} sm={8} md={6}>
          <Box>
            <img
              width={"100%"}
              src={forgotImage}
              alt="forgotImage"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
