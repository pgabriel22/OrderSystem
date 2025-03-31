import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Home } from "@mui/icons-material";

const MenuBuildup = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 5 }}
      >
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
      </Box>
      <Box sx={{ mt: 3 }}>
        <IconButton onClick={() => navigate("/")}>
          <Home />
        </IconButton>
      </Box>
    </header>
  );
};

export default MenuBuildup;
