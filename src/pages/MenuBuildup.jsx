import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Typography, Card, CardActionArea, CardContent, Grid
} from "@mui/material";
import { Home } from "@mui/icons-material";
import MenuListIcon from "../assets/menu-list.jpg";
import OrderListIcon from "../assets/order-checkout.gif";

const MenuBuildup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: 4,
          p: 2, // Adds padding for better spacing on small screens
        }}
      >


        <Grid container spacing={2} justifyContent="center">
          {/* Order List Card */}
          


          {/* Menu Buildup Card */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ textAlign: "center" }}>
                <CardContent>
                <TextField label="Dish Name" />
        <TextField label="Price" />
        <FormControl fullWidth>
          <InputLabel id="dishType-select-label">Dish Type</InputLabel>
          <Select
            labelId="dishType-select-label"
            id="dishType-select"
            name="dishType"
            label="Dish Type"
            defaultValue=""
          >
            <MenuItem value="main-course">Main Course</MenuItem>
            <MenuItem value="sides">Sides</MenuItem>
            <MenuItem value="add-ons">Add ons</MenuItem>
          </Select>
          <FormControlLabel control={<Checkbox />} label="is Available?" />
        </FormControl>
      <Box sx={{ mt: 3 }}>
        <IconButton onClick={() => navigate("/")}>
          <Home />
        </IconButton>
      </Box>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default MenuBuildup;
