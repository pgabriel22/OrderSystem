import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import Footer from "../../shared/components/Footer";
import AppBar from "../../shared/components/AppNavBar";
import DishCrudModal from "../../shared/components/DishCrudModal";
import DishList from "../../shared/components/DishList";

const MenuBuildup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    setDishes(Array.isArray(savedDishes) ? savedDishes : []);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingDish(null);
  };

  const handleSubmitDish = (dishData) => {
    const updatedDishes = editingDish
      ? dishes.map((dish) => (dish.id === dishData.id ? dishData : dish))
      : [...dishes, dishData];

    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    handleCloseModal();
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setOpenModal(true);
  };

  const handleDeleteDish = (id) => {
    const updatedDishes = dishes.filter((d) => d.id !== id);
    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Fixed AppBar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <AppBar />
      </Box>

      {/* Header Controls */}
      <Box
        sx={{
          position: "fixed",
          top: "100px",
          left: 0,
          right: 0,
          zIndex: 999,
          bgcolor: "#fff",
          px: 2,
          py: 1,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Menu Builder
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setEditingDish(null);
              setOpenModal(true);
            }}
          >
            Add Dish
          </Button>
        </Box>
      </Box>

      {/* Scrollable Dish List */}
      <Box
        sx={{
          pt: "170px",
          pb: "80px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <DishList
          dishes={dishes}
          onEdit={handleEditDish}
          onDelete={handleDeleteDish}
          mode="admin"
          fixedTabs={true}
        />
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Footer />
      </Box>

      {/* Modal */}
      <DishCrudModal
        open={openModal}
        onClose={handleCloseModal}
        mode={editingDish ? "edit" : "create"}
        initialData={editingDish}
        onSubmit={handleSubmitDish}
      />
    </Box>
  );
};

export default MenuBuildup;
