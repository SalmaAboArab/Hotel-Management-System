import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";
import forgotImage from "../../../assets/forgetpass.png";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import styles from "./ForgotPassword.module.css";
import { emailValidation } from "../Validators/Validators";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function callForgotPassApi(data: { email: string }) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/admin/users/forgot-password`,
        data
      );
      toast.success(response.data.message);
      navigate("/Authentication/reset-password");
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (data: { email: string }) => {
    callForgotPassApi(data);
  };

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        marginY: 0,
        paddingY: 3,
        display: "flex",
        alignItems: "center",
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
              marginTop:5,
              paddingY: 5,
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
      
            <Box>
              <Typography fontWeight={600} variant="h5">
                Forgot password
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
             onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
                    <Box sx={{ display: "flex", flexDirection: "column" ,height:100 }}>
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
              

              <Button disabled={isLoading} sx={{paddingY:2,marginTop:5}}   type="submit" variant="contained" >
                {isLoading ? (
                  <span className={styles.loader}></span>
                ) : (
                  "Send mail"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
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
