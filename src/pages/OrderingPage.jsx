import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import {
  Box,
  useMediaQuery,
} from "@mui/material";
import Waiter from "../assets/taking-order.gif";
import DishList from "../components/DishList";

const OrderingPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)"); // Adjust layout based on screen width
  const [dishes, setDishes] = useState([]);

  // Load dishes from localStorage on initial load
  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    if (Array.isArray(savedDishes)) {
      setDishes(savedDishes);
    } else {
      setDishes([]); // Fallback to empty array
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: 4,
          px: 2, // Add padding for better spacing
        }}
      >
        {/* Responsive Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <img
            src={Waiter}
            alt="Taking Order"
            style={{
              maxWidth: "100%",
              height: isMobile ? "300px" : "500px", // Reduce size on mobile
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Dish List Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: isMobile ? "100%" : "80%", // Adjust width dynamically for mobile
            maxWidth: 800, // Ensure there's a max width for larger screens
          }}
        >
          <DishList
            dishes={dishes}
            mode="customer"
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderingPage;
