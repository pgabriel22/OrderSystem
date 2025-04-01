import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton, Box, Typography, AppBar, Toolbar } from "@mui/material";
import {
  FormatListBulletedOutlined,
  RestaurantMenu,
} from "@mui/icons-material";
import OrderLogo from "../assets/order_logo.png"


const AppNavBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar  position="static"
    sx={{
      background: "linear-gradient(90deg, #ff5722 30%, #ff9800 90%)", // Gradient color
    }}>
        <Toolbar>
        <img src={OrderLogo} alt="Order Logo" style={{ height: "40px", marginRight: "10px" }} />
        </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
