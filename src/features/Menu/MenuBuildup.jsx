import React, { useState, useEffect } from "react";
import { fetchDishes, deleteDish } from "../../lib/supabaseDishService";
import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import Footer from "../../shared/components/Footer";
import DishCrudModal from "../../shared/components/DishCrudModal";
import DishList from "../../shared/components/DishList";

const MenuBuildup = ({ mode, setMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);

  // useEffect(() => {
  //   const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
  //   setDishes(Array.isArray(savedDishes) ? savedDishes : []);
  // }, []);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const dishes = await fetchDishes();
        setDishes(dishes);
      } catch (err) {
        console.error("Failed to load dishes", err.message);
      }
    };
    loadDishes();
  }, []);

  const handleSubmitDish = (dishData) => {
  // dishData already saved in Supabase, just update local state
  const updatedDishes = editingDish
    ? dishes.map((dish) => (dish.id === dishData.id ? dishData : dish))
    : [...dishes, dishData];

  setDishes(updatedDishes);
  handleCloseModal();
};

  const handleDeleteDish = async (id) => {
    try {
      await deleteDish(id);
      const updated = await fetchDishes();
      setDishes(updated);
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingDish(null);
  };

  // const handleSubmitDish = (dishData) => {
  //   const updatedDishes = editingDish
  //     ? dishes.map((dish) => (dish.id === dishData.id ? dishData : dish))
  //     : [...dishes, dishData];

  //   setDishes(updatedDishes);
  //   localStorage.setItem("dishes", JSON.stringify(updatedDishes));
  //   handleCloseModal();
  // };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setOpenModal(true);
  };

  // const handleDeleteDish = (id) => {
  //   const updatedDishes = dishes.filter((d) => d.id !== id);
  //   setDishes(updatedDishes);
  //   localStorage.setItem("dishes", JSON.stringify(updatedDishes));
  // };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
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
