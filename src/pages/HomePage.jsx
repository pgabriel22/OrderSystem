import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Button,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import { AddCard } from "@mui/icons-material";
import Waiter from "../assets/taking-order.gif";

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
          src={Waiter}
          alt="Taking Order"
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
            variant="h2"
            sx={{
              textAlign: "center",
              mt: 2,
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, // Adjust font size
            }}
          >
            Order ka ba?
          </Typography>
          <TextField label="Order By" placeholder="Enter your Name" fullWidth />
          <FormControl fullWidth>
            <InputLabel id="first-dish-label">First Dish</InputLabel>
            <Select
              labelId="first-dish-label"
              id="first-dish"
              value={firstDish}
              label="First Dish"
              onChange={handleFirstDishChange}
            >
              <MenuItem value="dish1">Dish 1</MenuItem>
              <MenuItem value="dish2">Dish 2</MenuItem>
              <MenuItem value="dish3">Dish 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="second-dish-label">Second Dish</InputLabel>
            <Select
              labelId="second-dish-label"
              id="second-dish"
              value={secondDish}
              label="Second Dish"
              onChange={handleSecondDishChange}
            >
              <MenuItem value="dish1">Dish 1</MenuItem>
              <MenuItem value="dish2">Dish 2</MenuItem>
              <MenuItem value="dish3">Dish 3</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={extraRice}
                  onChange={(e) => setExtraTrice(e.target.checked)}
                />
              }
              label="Add Extra Rice?"
            />
            {extraRice && (
              <TextField
                type="number"
                label="Number of Extra Rice"
                value={extraRiceNum}
                onChange={handleExtraRiceNum}
                slotProps={{ input: { min: "1" } }}
              ></TextField>
            )}
          </Box>

          <Button
            type="submit"
            className="order_submit"
            startIcon={<AddCard />}
            variant="contained"
            sx={{ width: "100%", fontSize: "1rem" }} // Full width on mobile
          >
            Add Order
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
