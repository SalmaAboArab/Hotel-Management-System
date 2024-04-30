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
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import loginImage from "../../../assets/login.png";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import styles from "./Login.module.css";
import { emailValidation,passwordValidation } from "../Validators/Validators";
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();  



  // const saveLoginData=()=>{
  //   const encodedToken:any=localStorage.getItem("adminToken");
  //   const decodedToken:any=jwtDecode(encodedToken);    
  //   localStorage.setItem('loginData',JSON.stringify(decodedToken)); 
  //   localStorage.setItem('userRole',JSON.stringify(decodedToken?.role)); 
     
  // }


  async function callLoginApi(data: { email: string }) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/admin/users/login`,data
        
      );
      toast.success(response.data.message);
      localStorage.setItem("adminToken",response?.data?.data?.token); 
      // saveLoginData(); 
      const encodedToken:any=localStorage.getItem("adminToken");
    const decodedToken:any=jwtDecode(encodedToken); 
    let role=decodedToken?.role;
    localStorage.setItem('loginData',JSON.stringify(decodedToken)); 
    localStorage.setItem('userRole',JSON.stringify(decodedToken?.role)); 

      if(role=='user'){
        navigate("/");
      }
      else{
        navigate("/Admin");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (data: { email: string }) => {
    callLoginApi(data);
  };

  return (
   <>
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
              marginLeft:"60px"
            }}
          >
      
            <Box>
              <Typography fontWeight={600} variant="h5">
              Sign in
              </Typography>
              <Typography variant="body1">
              If you don’t have an account register <br /> You can{" "}
                <Link
                  to={"/Authentication/register"}
                  style={{
                    color: "#152C5B",
                    textDecoration: "none",
                    fontWeight: 600,
                    marginLeft: 5,
                  }}
                >
                  Register here !
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
                  <Typography variant="body2" sx={{ color: "error.light" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>


              <Box sx={{ display: "flex", flexDirection: "column" ,height:100, mt:3 }}>
                <label htmlFor="password" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Password</label>
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type="password"
                  id="password"
                  placeholder="Please type here ..."
                  {...register("password",{required:"Password is required"}
                  //  passwordValidation
                  )}
                />
                {errors.password && (
                  <Typography variant="body2" sx={{ color: "error.light" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{textAlign:'end',mt:1}}>
              <Link to={'forgot-password'} style={{
                    color: "#4D4D4D",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}>
              Forgot Password ?
              </Link>
              </Box>

             {/*<Box sx={{ display: "flex", flexDirection: "column" }}>
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
              </Box>*/} 
              

              <Button disabled={isLoading} sx={{paddingY:2,marginTop:5}}   type="submit" variant="contained" >
                {isLoading ? (
                  <span className={styles.loader}></span>
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <Box>
            <img
              width={"100%"}
              src={loginImage}
              alt="loginImage"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
   </>
  )
}
