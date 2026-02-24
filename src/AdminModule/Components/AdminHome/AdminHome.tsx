import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls";
import { PieChart } from "@mui/x-charts";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { WorkOutlineOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface DashboardData {
  rooms: number;
  facilities: number;
  ads: number;
  bookings: {
    pending: number;
    completed: number;
  };
  users: {
    user: number;
    admin: number;
  };
}

const cardStyle = {
  boxShadow: "none",
  bgcolor: "#3654d7",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  py: 2,
};

const StatCard = ({
  value,
  label,
  link,
}: {
  value?: number;
  label: string;
  link: string;
}) => (
  <Grid item xs={11} sm={5} md={3} component={Paper} elevation={6} sx={cardStyle}>
    <Link to={link} style={{ textDecoration: "none", color: "white" }}>
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Typography variant="h5">
          {value ?? 0}
          <Typography variant="subtitle2" color="#FFFFFFCC">
            {label}
          </Typography>
        </Typography>
        <WorkOutlineOutlined sx={{ fontSize: 40, color: "#8dd3f1" }} />
      </Box>
    </Link>
  </Grid>
);

const DashboardPieChart = ({
  data,
}: {
  data: { value?: number; label: string; color?: string }[];
}) => (
  <Grid item sm={12} md={5} component={Paper} elevation={6} sx={{ boxShadow: "none" }}>
    <PieChart
      series={[
        {
          data: data.map((item) => ({
            ...item,
            value: item.value ?? 0,
          })),
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  </Grid>
);

export default function AdminHome() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const getDashboardData = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.get(`${baseUrl}/admin/dashboard`, {
        headers: { Authorization: token },
      });

      setDashboardData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const statsConfig = [
    { key: "rooms", label: "Rooms", link: "rooms" },
    { key: "facilities", label: "Facilities", link: "facilities" },
    { key: "ads", label: "Ads", link: "ads" },
  ] as const;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Stats Cards */}
      <Grid
        container
        py={5}
        columnGap={2}
        rowGap={3}
        justifyContent="center"
        alignItems="center"
      >
        {statsConfig.map((item) => (
          <StatCard
            key={item.key}
            value={dashboardData?.[item.key]}
            label={item.label}
            link={item.link}
          />
        ))}
      </Grid>

      {/* Bookings Chart */}
      <DashboardPieChart
        data={[
          {
            value: dashboardData?.bookings?.pending,
            label: "Pending",
          },
          {
            value: dashboardData?.bookings?.completed,
            label: "Completed",
          },
        ]}
      />

      {/* Users Chart */}
      <DashboardPieChart
        data={[
          {
            value: dashboardData?.users?.user,
            label: "User",
            color: "#e785e4",
          },
          {
            value: dashboardData?.users?.admin,
            label: "Admin",
            color: "#35C2FD",
          },
        ]}
      />
    </Grid>
  );
}