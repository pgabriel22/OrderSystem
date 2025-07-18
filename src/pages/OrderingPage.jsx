import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AppBar from "../components/AppNavBar";
import Footer from "../components/Footer";
import DishList from "../components/DishList";
import Waiter from "../assets/taking-order.gif";

const OrderingPage = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    setDishes(Array.isArray(savedDishes) ? savedDishes : []);
  }, []);

  return (
    <>
      {/* Fixed Nav */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <AppBar />
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Footer />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100vh",
          pt: "100px", // adjust based on your AppBar height
          pb: "40px", // adjust based on your Footer height
          overflow: "hidden",
        }}
      >
        {/* Left image */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff3e0",
          }}
        >
          <img
            src={Waiter}
            alt="Taking Order"
            style={{
              maxWidth: "100%",
              height: isMobile ? "250px" : "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right dish list (scrollable) */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            overflowY: "auto",
            px: 2,
            py: 1,
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Edge
            },
          }}
        >
          <DishList dishes={dishes} mode="customer" />
        </Box>
      </Box>
    </>
  );
};

export default OrderingPage;
