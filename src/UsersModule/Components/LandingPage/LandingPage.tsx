import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Constants/Components/Urls";
import { FavoriteOutlined, Star } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import styles from "./LandingPage.module.css";
import hotel1 from "../../../assets/hotel1.png";
import hotel2 from "../../../assets/hotel2.png";
import hotel3 from "../../../assets/hotel3.png";
import hotel4 from "../../../assets/hotel4.png";

import house1 from "../../../assets/house1.png";
import house2 from "../../../assets/house2.png";
import house3 from "../../../assets/house3.png";
import house4 from "../../../assets/house4.png";

import landingImg from "../../../assets/landingImg.png";
import { useForm } from "react-hook-form";
import happyFamily from "../../../assets/happyFamily.png";
import AnonymousUserAlert from "../AnonymousUserAlert/AnonymousUserAlert";
import { toast } from "react-toastify";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Loading from "../../../SharedModule/Components/Loading/Loading";

export default function LandingPage() {
  const navigate = useNavigate();
  const [ads, setAds] = React.useState([]);
  let fiveAds = ads?.slice(0, 5);
  const [isLoading, setIsLoading] = useState(false);


  const [anonymousAlert, setAnonymousAlert] = useState(false);
  const handleCloseAnonymousAlert = () => setAnonymousAlert(false);
  const handleOpenAnonymousAlert = () => setAnonymousAlert(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getAds() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/portal/ads`);
      console.log(response?.data?.data?.ads);
      setAds(response?.data?.data?.ads);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  type ExploreData = {
    startDate: Date;
    endDate: Date;
    capacity: number;
  };

  const Explore = {
    startDate: new Date(),
    endDate: new Date(),
    capacity: new Number(),
  };

  async function handleExplore(data: ExploreData) {
    // console.log("explore ", data);
    Explore.startDate = data.startDate;
    Explore.endDate = data.endDate;
    Explore.capacity = data.capacity;
    // console.log(Explore);
    navigate(`all-rooms/${JSON.stringify(Explore)}`);
  }

  async function addtofav(roomId: string) {
    let token = localStorage.getItem("adminToken");
    let role: string = JSON.parse(localStorage.getItem("userRole"));

    if (role == "user") {
      try {
        const response = await axios.post(
          `${baseUrl}/portal/favorite-rooms`,
          { roomId: roomId },
          { headers: { Authorization: token } }
        );
        // console.log(response);
        toast.success("Room Added To Your Favourits Successfuly");
      } catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message||'Somthing Went Wrong!');
      }
    } else {
      handleOpenAnonymousAlert();
    }
  }

  function goToRoomDetails(roomId: string) {

      navigate(`all-rooms/room-details/${JSON.stringify(roomId)}`);
  }

  useEffect(() => {
    
    getAds();
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ my: 5, width: "75%", mx: "auto", height: "75vh" }}>
          <Grid
            container
            component="main"
            sx={{ height: "100%", overflow: "auto" }}
          >
            {/* Explore */}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              sx={{
                color: "#152C5B",
                // overflow:'auto'
                height: "100%",
                width: "100%",
              }}
            >
              <Container sx={{ mb: 5 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, lineHeight: 1.5, fontSize: "42px" }}
                >
                  Forget Busy Work, Start Next Vacation
                </Typography>
                <p style={{ color: "#B0B0B0", marginTop: 5 }}>
                  We provide what you need to enjoy your holiday with family.
                  Time to make another memorable moments.
                </p>
              </Container>

              <SectionLabel label="Start Booking" />
              <Container>
                <Box
                  component="form"
                  // noValidate
                  onSubmit={handleSubmit(handleExplore)}
                >
                  <Grid container component="main">
                    <Grid sm={6} xs={9}>
                      <Container>
                        <label
                          htmlFor="startDate"
                          style={{ marginTop: "10px", marginRight: "5px" }}
                        >
                          Pick a start date
                        </label>
                        <Box>
                          <TextField
                            type="date"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="startDate"
                            // label="Email Address"
                            autoComplete="date"
                            autoFocus
                            {...register("startDate", {
                              required: "Start date is required",
                            })}
                          />
                        </Box>
                        {errors.startDate && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {errors?.startDate?.message}
                          </Typography>
                        )}
                      </Container>
                    </Grid>

                    <Grid sm={6} xs={9}>
                      <Container>
                        <label
                          htmlFor="endDate"
                          style={{ marginTop: "10px", marginRight: "5px" }}
                        >
                          Pick an end date
                        </label>
                        <Box>
                          <TextField
                            type="date"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="endDate"
                            // label="Email Address"
                            autoComplete="date"
                            autoFocus
                            {...register("endDate", {
                              required: "End date is required",
                            })}
                          />
                        </Box>
                        {errors.endDate && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {errors?.endDate?.message}
                          </Typography>
                        )}
                      </Container>
                    </Grid>
                  </Grid>

                  <Grid container component="main">
                    <Grid sm={12}>
                      <Container>
                        <label
                          htmlFor="capacity"
                          style={{ marginTop: "10px", marginRight: "10px" }}
                        >
                          Capacity
                        </label>
                        <Box display={"flex"} alignItems={"center"}>
                          <TextField
                            type="number"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            defaultValue={0}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="capacity"
                            autoComplete="number"
                            autoFocus
                            {...register("capacity", {
                              required: "capacity is required",
                            })}
                          />
                          {/* <Typography variant="h6" px={2}>person</Typography> */}
                        </Box>
                        {errors.capacity && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {errors?.capacity?.message}
                          </Typography>
                        )}
                      </Container>
                    </Grid>

                    <Grid sm={7}>
                      <Container>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            width: "100%",
                            bgcolor: "#3252DF",
                            color: "white",
                            mt: "10%",
                            py: 1,
                          }}
                        >
                          Explore
                        </Button>
                      </Container>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={6}
              sx={{
                position: "relative",
                height: "85%",
                width: "100%",
                mt: 5,
              }}
            >
              <Box>
                <Container
                  style={{
                    width: "73%",
                    height: "83%",
                    border: "solid #E5E5E5 2px",
                    borderRadius: "15px",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                ></Container>
                <Container
                  sx={{
                    width: "75%",
                    height: "87%",
                    borderRadius: "15px",
                    borderTopLeftRadius: "100px",
                    position: "absolute",
                    top: "7%",
                    right: "6%",
                    backgroundImage: `url(${landingImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></Container>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Ads */}

        <Box>
          <SectionLabel label="Most popular ads" />
          {isLoading ? (
            <Loading />
          ) : ads?.length > 0 ? (
            <Grid
              container
              component="main"
              sx={{
                height: "65vh",
                justifyContent: "center",
                overflow: "auto",
              }}
              // className={`pageOverflow`}
            >
              <Grid
                item
                xs={10}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  height: "95%",
                  // width: "100%",
                  paddingY: 3,
                }}
                className={` ${styles.imgContainer}`}
                position={'relative'}
              >
                <PriceContainer price={fiveAds[0]?.room?.price}/>
                <Container
                  sx={{
                    height: "100%",
                    width: "90%",
                    backgroundImage: `url(${fiveAds[0]?.room?.images[0]})`,
                    backgroundRepeat: "no-repeat",
                    borderRadius: "20px",
                    bgcolor: "black",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // position:'relative'
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Box
                  // position={'absolute'} bottom={0} left={0}
                  >
                    <CardData
                      titleColor="white"
                      descreptionColor="white"
                      title={adsData[0].title}
                      description={adsData[0].description}
                    />
                    
                  </Box>
                </Container>
                <Container
                  sx={{
                    borderRadius: "20px",
                    width: "90%",
                    height: "100%",
                    position: "relative",
                    bottom: "100%",
                    bgcolor: "#203FC736",
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={`${styles.imgLayout}`}
                >
                  <button
                    className="bg-transparent border-0 "
                    onClick={() => addtofav(fiveAds[0]?.room?._id)}
                  >
                    <FavoriteOutlined sx={{ color: "white" }} />
                  </button>
                  <button
                    className="bg-transparent border-0"
                    onClick={() => goToRoomDetails(fiveAds[0]?.room?._id)}
                  >
                    <Visibility sx={{ color: "white" }} />
                  </button>
                </Container>
              </Grid>


              <AdsGrid
                image1={fiveAds[1]?.room?.images[0]}
                image2={fiveAds[2]?.room?.images[0]}
                goToRoom={goToRoomDetails}
                firstAd={fiveAds[1]}
                secondAd={fiveAds[2]}
                addfav={addtofav}
                index={[1, 2]}
              />

              <AdsGrid
                image1={fiveAds[3]?.room?.images[0]}
                image2={fiveAds[4]?.room?.images[0]}
                goToRoom={goToRoomDetails}
                firstAd={fiveAds[3]}
                secondAd={fiveAds[4]}
                addfav={addtofav}
                index={[3, 4]}
              />
            </Grid>
          ) : (
            <NoData />
          )}
        </Box>

        {/* Houses */}
        <Box width={"75%"} mx={"auto"} mt={3}>
          <SectionLabel label="Houses with beauty backyard" />

          <Grid
            container
            component="main"
            sx={{
              height: "30vh",
              justifyContent: "center",
              overflow: "auto",
              mt: 3,
            }}
            // className={`pageOverflow`}
          >
            <StaticGrids type="house" index={0} />
            <StaticGrids type="house" index={1} />
            <StaticGrids type="house" index={2} />
            <StaticGrids type="house" index={3} />
          </Grid>
        </Box>

        {/* Hotels */}
        <Box width={"75%"} mx={"auto"} mt={3}>
          <SectionLabel label="Hotels with large living room" />

          <Grid
            container
            component="main"
            sx={{
              height: "30vh",
              justifyContent: "center",
              overflow: "auto",
              mt: 3,
            }}
            // className={`pageOverflow`}
          >
            <StaticGrids type="hotel" index={0} />
            <StaticGrids type="hotel" index={1} />
            <StaticGrids type="hotel" index={2} />
            <StaticGrids type="hotel" index={3} />
          </Grid>
        </Box>
         
         {/* reviews */}
        <Box sx={{ my: 5, width: "75%", mx: "auto" }}>
          <Grid
            container
            component="main"
            sx={{ height: "70vh", overflow: "auto" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <span>
                <Container
                  style={{
                    width: "60%",
                    height: "83%",
                    border: "solid #E5E5E5 2px",
                    borderRadius: "15px",
                    position: "absolute",
                    bottom: "7%",
                    left: 0,
                  }}
                ></Container>
                <Container
                  sx={{
                    width: "62%",
                    height: "83%",
                    borderRadius: "15px",
                    borderBottomRightRadius: "100px",
                    position: "absolute",
                    bottom: 0,
                    left: "6%",
                    backgroundImage: `url(${happyFamily})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></Container>
              </span>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              // lg={6}
              // bgcolor={"red"}
              position={"relative"}
              sx={{
                color: "#152C5B",
                // overflow:'auto'
                height: "100%",
                width: "100%",
                // paddingY: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container sx={{}}>
                <Typography variant="h6" my={3}>
                  Happy Family
                </Typography>
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Typography variant="h5" sx={{ fontSize: "27px", my: 3 }}>
                  What a great trip with my family and <br />I should try again
                  next time soon ...
                </Typography>
                <p style={{ color: "#B0B0B0" }}>Angga, Product Designer</p>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Box>


      {anonymousAlert ? (
        <AnonymousUserAlert closeModal={handleCloseAnonymousAlert} />
      ) : (
        ""
      )}
    </>
  );
}

type adsImg = {
  image1: File;
  image2: File;
  goToRoom: Function;
  firstAd: {};
  secondAd: {};
  addfav: Function;
  index: number[];
};

const AdsGrid = ({
  image1,
  image2,
  goToRoom,
  firstAd,
  secondAd,
  addfav,
  index,
}: adsImg) => {
  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={3}
      sx={{
        height: "95%",
        width: "100%",
        paddingY: 5,
        alignContent: "center",
        position: "relative",
      }}
    >
      <span className={`${styles.imgContainer}`}>
        <ImgLayer
          width="90%"
          hight="42%"
          bottom="52%"
          goToRoom={goToRoom}
          curruntAd={firstAd}
          addfav={addfav}
        />

        <AdsImgCard
          width="90%"
          hight="50%"
          image={image1}
          marginB={2}
          price={firstAd?.room?.price}
          index={index[0]}
        />
      </span>

      <span className={`${styles.imgContainer}`}>
        <AdsImgCard
          width="90%"
          hight="50%"
          image={image2}
          marginB={0}
          price={secondAd?.room?.price}
          index={index[1]}
        />

        <ImgLayer
          width="90%"
          hight="42%"
          bottom="6.5%"
          goToRoom={goToRoom}
          curruntAd={secondAd}
          addfav={addfav}
        />
      </span>
    </Grid>
  );
};

const SectionLabel = ({ label }: { label: string }) => {
  return (
    <Container>
      <Typography variant="h5" sx={{ color: "#152C5B" }}>
        {label}
      </Typography>
    </Container>
  );
};

type imgcontnr = {
  width: string;
  hight: string;
  image: File | string;
  marginB: number;
};

const ImgCard = ({ width, hight, image, marginB }: imgcontnr) => {
  return (
    <Container
      sx={{
        height: hight,
        width: width,
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        mb: marginB,
      }}
    ></Container>
  );
};

type AdsImgcontnr = {
  width: string;
  hight: string;
  image: File | string;
  marginB: number;
  price: number;
  index: number;
};

const AdsImgCard = ({
  width,
  hight,
  image,
  marginB,
  price,
  index,
}: AdsImgcontnr) => {
  return (
    <Container
      sx={{
        height: hight,
        width: width,
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        mb: marginB,
        // position:'relative'
      }}
    >
      <PriceContainer price={price}/>
      <Box
        height={"100%"}
        display={"flex"}
        alignItems={"end"}
        justifyContent={"start"}
      >
        <CardData
          titleColor="white"
          descreptionColor="white"
          title={adsData[index].title}
          description={adsData[index].description}
        />
      </Box>
    </Container>
  );
};

const PriceContainer = ({price}:{price:number}) => {
  return (
    <Box
      color={"white"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"#FF498B"}
      width={"180px"}
      height={"40px"}
      sx={{
        borderTopRightRadius: "15px",
        borderBottomLeftRadius: "15px",
        position: "absolute",
        right:'5%',
        zIndex:1
      }}
    >
      ${price} per night
    </Box>
  );
};

type layer = {
  width: string;
  hight: string;
  bottom: string;
  goToRoom: Function;
  curruntAd: {};
  addfav: Function;
};

const ImgLayer = ({
  width,
  hight,
  bottom,
  goToRoom,
  curruntAd,
  addfav,
}: layer) => {
  return (
    <Container
      sx={{
        borderRadius: "20px",
        width: width,
        height: hight,
        position: "absolute",
        bottom: bottom,
        left: "5%",
        bgcolor: "#203FC736",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={`${styles.imgLayout}`}
    >
      <button
        className="bg-transparent border-0 "
        onClick={() => addfav(curruntAd?.room?._id)}
      >
        <FavoriteOutlined sx={{ color: "white" }} />
      </button>
      <button
        className="bg-transparent border-0"
        onClick={() => goToRoom(curruntAd?.room?._id)}
      >
        <Visibility sx={{ color: "white" }} />
      </button>
    </Container>
  );
};

const StaticGrids = ({ type, index }: { type: string; index: number }) => {
  let data;
  if (type == "house") data = housesData;
  else data = hotelsData;
  return (
    <Grid
      item
      xs={9}
      sm={6}
      md={3}
      sx={{
        height: "100%",
        width: "100%",
        paddingY: 5,
        alignContent: "center",
      }}
    >
      <ImgCard width="90%" hight="100%" image={data[index].img} marginB={0} />
      <CardData
        titleColor={"#152C5B"}
        descreptionColor={"#B0B0B0"}
        title={data[index].title}
        description={data[index].description}
      />
    </Grid>
  );
};

const CardData = ({
  titleColor,
  descreptionColor,
  title,
  description,
}: {
  titleColor: string;
  descreptionColor: string;
  title: string;
  description: string;
}) => {
  return (
    <Container>
      <Typography variant="h6" mt={1} fontWeight={400} color={titleColor}>
        {title}
      </Typography>
      <p style={{ color: descreptionColor }}>{description}</p>
    </Container>
  );
};

const housesData = [
  {
    img: house1,
    title: "Tabby Town",
    description: "Gunung Batu, Indonesia",
  },
  {
    img: house2,
    title: "Anggana",
    description: "Bogor, Indonesia",
  },
  {
    img: house3,
    title: "Seattle Rain",
    description: "Jakarta, Indonesia",
  },
  {
    img: house4,
    title: "Wodden Pit",
    description: "Wonosobo, Indonesia",
  },
];

const hotelsData = [
  {
    img: hotel1,
    title: "Green Park",
    description: "Tangerang, Indonesia",
  },
  {
    img: hotel2,
    title: "Podo Wae",
    description: "Madiun, Indonesia",
  },
  {
    img: hotel3,
    title: "Silver Rain",
    description: "Bandung, Indonesia",
  },
  {
    img: hotel4,
    title: "Cashville",
    description: "Kemang, Indonesia",
  },
];

const adsData = [
  {
    title: "Blue Origin Fams",
    description: "Jakarta, Indonesia",
  },

  {
    title: "Ocean Land",
    description: "Bandung, Indonesia",
  },

  {
    title: "Vinna Vill",
    description: "Malang, Indonesia",
  },

  {
    title: "Stark House",
    description: "Malang, Indonesia",
  },

  {
    title: "Bobox",
    description: "Medan, Indonesia",
  },
];
