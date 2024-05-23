import { Container, Typography, colors } from "@mui/material";
import { baseUrl } from "../../../Constants/Components/Urls";
import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import style from "./AllRooms.module.css";
import AnonymousUserAlert from "../AnonymousUserAlert/AnonymousUserAlert";
import Loading from "../../../SharedModule/Components/Loading/Loading";

export default function AllRooms() {
  let userRole = JSON.parse(localStorage.getItem("userRole"));
  // console.log(userRole);

  const [isLoading, setIsLoading] = useState(false);
  const { ...data } = useParams();

  ///////////////// expolre all room//////////////////////////////////
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState([]);
  //const[anonymousAlert,setAnonymousAlert]=()=> setOpenViewModal(false);
  const [anonymousAlert, setAnonymousAlert] = useState(false);
  const handleCloseAnonymousAlert = () => setAnonymousAlert(false);
  const handleOpenAnonymousAlert = () => setAnonymousAlert(true);

  async function exploreAllRooms() {
    try {
      const response = await axios.get(
        `${baseUrl}/portal/rooms/available?page=1&size=10&${
          data.startdate
            ? `startDate=${data.startdate}&endDate=${data.enddate}`
            : ""
        }`,
        {}
      );

      setAllRooms(response.data.data.rooms);
      console.log(response.data.data.totalCount);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    setIsLoading(true);
  }, []);
  useEffect(() => {    
    exploreAllRooms();
  }, []);
  /////////////////////////add to fav ////////////////////////////////////////////

  async function addToFav(id: any) {
    console.log(id);
    if (userRole == "user") {
      try {
        const response = await axios.post(
          `${baseUrl}/portal/favorite-rooms`,
          { roomId: id },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI5ZDBiNzZlYmJiZWZiYzFhMjQyMjEiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE1ODkxMzI4LCJleHAiOjE3MTcxMDA5Mjh9.t5m_gU78TAQ3OlGOzK0RuuMGwmDovpugVd-5VGr7IzU",
            },
          }
        );
        // console.log(response.data.data.message);

        toast.success("add successfully");
        exploreAllRooms();
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      handleOpenAnonymousAlert();
    }
  }

  return (
    <>
      <Container sx={{ background: "#FFFFFF" }}>
        <Typography
          sx={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            fontSize: "40px",
            color: "#152C5B",
            fontFamily: "sans-serif",
          }}
        >
          Explore ALL Rooms{" "}
        </Typography>
        <Link sx={{ textDecoration: "none", color: "gray" }} href="/">
          Home
        </Link>
        <Link sx={{ textDecoration: "none", color: "gray" }} href="/all-rooms">
          {" "}
          / Explore
        </Link>
        <Typography
          sx={{
            marginTop: "50px",
            color: "#152C5B",
            fontSize: "20px",
            fontFamily: "sans-serif",
          }}
        >
          All Rooms
        </Typography>

        <Box sx={{ marginTop: "50px" }}>
          {allRooms.length > 0 ? (
            <Paper>
              <Box>
                <ImageList
                  className="styleImage"
                  sx={{ width: "100%", height: "" }}
                  cols={4}
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    allRooms.map((rooms) => (
                      <ImageListItem
                        className={style.member}
                        key={rooms._id} /*sx={{borderRadius:'50%'}}*/
                      >
                        <img
                          loading="lazy"
                          className=" imagemodify"
                          src={rooms?.images}
                        />
                        <Box className={style.memberCaption}>
                          <div className={style.icon}>
                            <FavoriteIcon
                              sx={{ margin: "20px" }}
                              onClick={() => addToFav(rooms._id)}
                            />

                            <VisibilityIcon
                              onClick={() =>
                                navigate(
                                    `/all-rooms/room-details/${rooms._id} ${data.startdate? `/${data.startdate}/${data.enddate}/${data.capacity}`:''}`
                                )
                              }
                            />
                          </div>
                        </Box>
                      </ImageListItem>
                    ))
                  )}
                </ImageList>
              </Box>
            </Paper>
          ) : (
            <NoData />
          )}
        </Box>
      </Container>
      {anonymousAlert ? (
        <AnonymousUserAlert closeModal={handleCloseAnonymousAlert} />
      ) : (
        ""
      )}

      <br />
      <button
        className="btn btn-danger mb-1 mt-5"
        onClick={() => navigate("/all-rooms/room-details")}
      >
        Room Details
      </button>
      <br />
    </>
  );
}
