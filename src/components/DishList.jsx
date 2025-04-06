import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Grid2 } from "@mui/material";
import DishCard from "./DishCard";

const DishList = ({ dishes, onEdit = () => {}, onDelete = () => {}, mode = "customer", onAddToCart = () => {} }) => {
  // Check if dishes is an array before attempting to map over it
  if (!Array.isArray(dishes)) {
    return <Box>No dishes available</Box>; // or render an error message
  }

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const dishTypes = ["mainDish", "secondDish", "addons"];
  const tabLabels = ["Main Dish", "Second Dish", "Add-ons"];

  const filteredDishes = dishes.filter(
    (dish) => dish.dishType === dishTypes[selectedTab] && (mode === "admin" || dish.isAvailable) // Filter only available dishes for customer mode
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={selectedTab} onChange={handleChangeTab} centered>
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {filteredDishes.length === 0 ? (
          <Typography textAlign="center">No dishes available.</Typography>
        ) : (
          <Grid2 container spacing={2} justifyContent="center">
            {filteredDishes.map((dish) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                <DishCard
                  {...dish}
                  onEdit={mode === "admin" ? () => onEdit(dish) : undefined} // Show edit button only in admin mode
                  onDelete={mode === "admin" ? () => onDelete(dish.id) : undefined} // Show delete button only in admin mode
                  onAddToCart={mode === "customer" ? onAddToCart : undefined} // Show add to cart button only in customer mode
                  mode={mode} // Pass the mode to DishCard
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};

export default DishList;
