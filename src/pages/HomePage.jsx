import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { IconButton, Box, Typography } from "@mui/material";
import {
  FormatListBulletedOutlined,
  RestaurantMenu,
} from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{}}>
      <Header />
      <IconButton onClick={() => navigate("/order-list")}>
        <FormatListBulletedOutlined />
      </IconButton>
      <IconButton onClick={() => navigate("/menu-buildup")}>
        <RestaurantMenu />
      </IconButton>
      <Typography>Welcome to Y Kitchen!</Typography>
      <Footer />
    </Box>
  );
};

export default HomePage;
