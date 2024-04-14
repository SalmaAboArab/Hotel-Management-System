import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import loginImage from "../../../assets/login.png";
import { Avatar } from "@mui/material";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
export default function Login() {
  let navigate=useNavigate();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "20px auto",
  };
  const avaterStyle = { color: "#3252DF" };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit=async (data:object)=>{
    try{ 
      let response=await axios.post(`${baseUrl}/admin/users/login`,data);
      toast.success("Welcome!");
    navigate('/Admin')
  }
  catch(error){
    toast.error(error?.response?.data?.message || "There's a mistake.");

  }
   

  }
 

  return (
    <>
      <Grid>
        <Paper style={paperStyle} elevation={10}>
          <Grid textAlign={"center"}>
            <LockPersonOutlinedIcon style={avaterStyle} />
            <h2 className="mt-2">Sign in</h2>
          </Grid>
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className="mt-3"
                variant="standard"
                label="userName"
                placeholder="user Name"
                fullWidth
                {...register("email", { required: "Email is required",
                 pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email not valid",
                } })}
                helperText={String(
                  errors?.email ? errors?.email?.message : ""
                )}
                error={!!errors.email}
              />
              <TextField
                className="mt-4"
                variant="standard"
                label="password"
                placeholder="enter Password"
                type="password"
                fullWidth
                required
                {...register("password",{ required: "Password is required" })}
                helperText={String(
                  errors?.password ? errors?.password?.message : ""
                )}
                error={!!errors.password}
              />

              <Button
                className="mt-5"
                variant="contained"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
            <Typography>
              <Link onClick={() => navigate("/Authentication/forgot-password")}>Forgot Password ?</Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
