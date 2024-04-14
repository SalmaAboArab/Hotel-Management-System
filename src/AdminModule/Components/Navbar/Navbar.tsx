import { AppBar, Drawer, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  return (
    <>
      <React.Fragment>
        <AppBar sx={{ color: "#152C5B", background: "#fff" }}>
          <Toolbar>
            <Typography variant="h4" sx={{ marginLeft: "100px" }}>
              <span className="text-primary ">Stay</span>cation.
            </Typography>
            <Tabs sx={{ marginLeft: "auto" }}>
              <Tabs >
                <Tab label="home" />
                <Tab label="Explore" />
                <Tab label="Reviews" />
              </Tabs>
              <Button
                onClick={() => navigate("/Authentication/login")}
                sx={{ marginLeft: "10px", width: "180px", height: "40px" }}
                variant="contained"
              >
                Login Now
              </Button>
            </Tabs>
          </Toolbar>
         <Drawer/>
        </AppBar>
      </React.Fragment>
    </>
  );
}
