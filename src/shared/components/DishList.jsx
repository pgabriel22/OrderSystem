import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Grid } from "@mui/material";
import DishCard from "./DishCard";

const DishList = ({
  dishes,
  onEdit = () => {},
  onDelete = () => {},
  mode = "customer",
  onAddToCart = () => {},
  fixedTabs = false,
}) => {
  if (!Array.isArray(dishes)) {
    return <Box>No dishes available</Box>;
  }

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const dishTypes = ["mainDish", "secondDish", "addons"];
  const tabLabels = ["Main Dish", "Second Dish", "Add-ons"];

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.dishType === dishTypes[selectedTab] &&
      (mode === "admin" || dish.isAvailable)
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* Tabs in their own wrapper */}
        {fixedTabs && (
          <Box
            sx={{
              position: "fixed",
              top: "159px", // adjust as needed
              zIndex: 999,
              width: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
              {tabLabels.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Dish Cards Grid - NOT wrapped with Tabs */}
        <Box sx={{ mt: fixedTabs ? "72px" : 3 }}>
          {filteredDishes.length === 0 ? (
            <Typography textAlign="center">No dishes available.</Typography>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
              <Grid
                container
                spacing={2}
                sx={{ maxWidth: 1200 }}
                justifyContent="center"
              >
                {filteredDishes.map((dish) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                    <DishCard
                      {...dish}
                      onEdit={mode === "admin" ? () => onEdit(dish) : undefined}
                      onDelete={
                        mode === "admin" ? () => onDelete(dish.id) : undefined
                      }
                      onAddToCart={
                        mode === "customer" ? onAddToCart : undefined
                      }
                      mode={mode}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DishList;
