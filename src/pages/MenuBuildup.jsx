import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import DishCrudModal from "../components/DishCrudModal.jsx";
import DishList from "../components/DishList.jsx";

const MenuBuildup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);

  // Load dishes from localStorage on initial load
  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    if (Array.isArray(savedDishes)) {
      setDishes(savedDishes);
    } else {
      setDishes([]); // Fallback to empty array
    }
  }, []);

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingDish(null); // Reset editingDish when modal is closed
  };

  // Function to handle dish submission (create or edit)
  const handleSubmitDish = (dishData) => {
    let updatedDishes;
    if (editingDish) {
      // Edit existing dish
      updatedDishes = dishes.map((dish) =>
        dish.id === dishData.id ? dishData : dish
      );
    } else {
      // Add new dish
      updatedDishes = [...dishes, dishData];
    }
    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    handleCloseModal(); // Close the modal after submission
  };

  // Function to handle editing a dish
  const handleEditDish = (dish) => {
    setEditingDish(dish); // Set the dish data for editing
    setOpenModal(true); // Open the modal in edit mode
  };

  // Function to handle deleting a dish
  const handleDeleteDish = (id) => {
    const updatedDishes = dishes.filter((d) => d.id !== id);
    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4, p: 2 }}>
        <IconButton onClick={() => navigate("/admin-home")}>
          <ArrowBack />
        </IconButton>
        <Typography>Menu Builder</Typography>
        <Button onClick={() => setOpenModal(true)} variant="contained">
          Add Dish
        </Button>

        <DishCrudModal
          open={openModal}
          onClose={handleCloseModal}
          mode={editingDish ? "edit" : "create"}
          initialData={editingDish}
          onSubmit={handleSubmitDish}
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", p: 2 }}>
        <DishList
          dishes={dishes}
          onEdit={handleEditDish} // Pass handleEditDish for editing
          onDelete={handleDeleteDish} // Pass handleDeleteDish for deleting
          mode="admin"
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default MenuBuildup;
