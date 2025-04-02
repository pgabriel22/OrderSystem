import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { AddCard } from "@mui/icons-material";
import OnlineOrder from "../assets/online-ordering.gif";

const HomePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)"); // Adjust layout based on screen width

  const [firstDish, setFirstDish] = useState("");
  const [secondDish, setSecondDish] = useState("");
  const [firstDishHelperText, setFirstDishHelperText] = useState("");

  const handleFirstDishChange = (e) => {
    setFirstDish(e.target.value);
    setFirstDishHelperText("First Dish comes with rice");
  };

  const handleSecondDishChange = (e) => {
    setSecondDish(e.target.value);
  };
  const [extraRice, setExtraTrice] = useState(false);
  const [extraRiceNum, setExtraTriceNum] = useState("");

  const handleExtraRiceNum = (e) => {
    const newExtraRiceNum = e.target.value;
    if (
      newExtraRiceNum === "" ||
      (/^\d+$/.test(newExtraRiceNum) && Number(newExtraRiceNum) >= 1)
    ) {
      setExtraTriceNum(newExtraRiceNum);
    }
  };
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
          minHeight: "80vh",
          gap: 4,
          px: 2, // Add padding for better spacing
        }}
      >
        {/* Responsive Image */}
        <img
          src={OnlineOrder}
          alt="Food online ordering app"
          style={{
            maxWidth: "100%",
            height: isMobile ? "300px" : "500px", // Reduce size on mobile
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: { xs: "90%", sm: 500, md: 800 }, // Adjust width dynamically
          }}
        >
           <Typography
          variant="h4" // Adjusted variant for better responsiveness
          sx={{
            textAlign: "center",
            mt: 2,
            mb: 2,
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Adjusted font sizes
          }}
        >
          Welcome to Order Ka Ba? (OKB)
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mt: 2,
            mb: 2,
            fontWeight: "medium",
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" }, // Adjusted for readability
            maxWidth: "800px", // Improved readability constraint
            lineHeight: 1.6,
          }}
        >
          A web app designed to simplify lunch ordering for our department. With OKB, you can easily select your favorite dishes from Y Kitchen, and we'll consolidate all orders for convenient delivery, saving you time and making lunch breaks more enjoyable.
        </Typography>
        <Button onClick={() => navigate("/order-create") }>Click here to create your order</Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
