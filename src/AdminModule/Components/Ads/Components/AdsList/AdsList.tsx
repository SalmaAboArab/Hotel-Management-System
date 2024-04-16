import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";

export default function AdsList() {
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headerTableArray = [
    "Room Name",
    "Price",
    "Discount",
    "Capacity",
    "Active",
    "",
  ];

  const distract = [
    ".room.roomNumber",
    ".room.price",
    ".room.discount",
    ".room.capacity",
    ".isActive",
  ];

  async function getAdsList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/ads`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkODg3NDZlYmJiZWZiYzE5ZjgzNTIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzIxMTU0NywiZXhwIjoxNzE0NDIxMTQ3fQ.7MqD3AXL084Rdk-yMz64VGk_X2-zAo0x0qArnEnSJfo",
        },
      });

      setAdsList(data.data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAdsList();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <HeaderComponents
        title={"ADS Table Details"}
        buttonName={"Add New Ads"}
      />

      {isLoading ? (
        <Loading />
      ) : adsList.length !== 0 ? (
        <Tables array={adsList} distract={distract} headerTableArray={headerTableArray} />
      ) : (
        <NoData />
      )}
    </Box>
  );
}
