import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar"
import { IconButton, Box, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import {
  FormatListBulletedOutlined,
  RestaurantMenu,
} from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", 
    }}>
    <AppBar />
    <Typography variant="h2" sx={{ 
          textAlign: "center", 
          mt: 4, 
          mb: 2, 
          fontWeight: "bold" 
        }}>Welcome to Order ka ba?</Typography>
    <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh", // Centers vertically
          gap: 4, // Adds spacing between cards
        }}
      >
        {/* Order List Card */}
        <Card sx={{ width: 250, textAlign: "center" }}>
          <CardActionArea onClick={() => navigate("/order-list")}>
            <CardContent>
              <FormatListBulletedOutlined sx={{ fontSize: 50 }} />
              <Typography variant="h6">Order List</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Menu Buildup Card */}
        <Card sx={{ width: 250, textAlign: "center" }}>
          <CardActionArea onClick={() => navigate("/menu-buildup")}>
            <CardContent>
              <RestaurantMenu sx={{ fontSize: 50 }} />
              <Typography variant="h6">Menu Buildup</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    <Footer />
    </Box>
    
  );
};

export default HomePage;
