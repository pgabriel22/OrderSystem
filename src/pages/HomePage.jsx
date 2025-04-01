import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import { Box, Typography, Checkbox,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    TextField,
    FormControl,
    InputLabel, Button } from "@mui/material";
import { AddCard } from "@mui/icons-material";
import Waiter from "../assets/taking-order.gif"

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", 
    }}>
    <AppBar />
    <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh", // Centers vertically
          gap: 4, // Adds spacing between cards
        }}
      >
        <img src={Waiter} alt="Taking Order" style={{ height: "500px", width: "500px" }}></img>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          width: 500,
        }}>
         <Typography variant="h2"     sx={{ 
            textAlign: "center", 
            mt: 4,  // Adds margin from top
            mb: 4,  // Creates space between title and cards
            fontWeight: "bold" 
          }}>Welcome to Order ka ba?</Typography>
        <TextField label="Order By" placeholder="Enter your Name"></TextField>
        <FormControl fullWidth>
            <InputLabel id="dishType-select-label">1st Dish</InputLabel>
                <Select
                    labelId="dishType-select-label"
                    id="dishType-select"
                    name="dishType"
                    label="Dish Type"
                    defaultValue=""
                    renderValue={(selected) => (selected === "" ? <em>Dish comes with rice</em> : selected)}
                >
                    <MenuItem value="dish1">Dish 1</MenuItem>
                    <MenuItem value="dish2">Dish 2</MenuItem>
                    <MenuItem value="dish3">Dish 3</MenuItem>
                </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="dishType-select-label">2nd Dish</InputLabel>
                <Select
                    labelId="dishType-select-label"
                    id="dishType-select"
                    name="dishType"
                    label="Dish Type"
                    defaultValue=""
                >
                    <MenuItem value="dish1">Dish 1</MenuItem>
                    <MenuItem value="dish2">Dish 2</MenuItem>
                    <MenuItem value="dish3">Dish 3</MenuItem>
                </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox />} label="Add Extra Rice?" />
            <Button
                type="submit"
                className="order_submit"
                startIcon={<AddCard />}
                variant="contained"
            >
                + Add Order
            </Button>
        </Box>
      </Box>
    <Footer />
    </Box>
    
  );
};

export default HomePage;
