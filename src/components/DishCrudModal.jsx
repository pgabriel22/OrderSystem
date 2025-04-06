import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import DishForm from "./DishForm";

const DishCrudModal = ({ open, onClose, mode, initialData, onSubmit }) => {
  const isEditMode = mode === "edit"; // Check if it's edit mode

  const handleSubmit = (dishData) => {
    onSubmit(dishData); // Pass dishData to parent component for update or create
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          border: "2px solid #000",
          p: 4,
        }}
      >
        <Typography variant="h6">{isEditMode ? "Edit Dish" : "Create New Dish"}</Typography>

        <DishForm
          setDish={handleSubmit} // Send the data back to parent on submit
          initialData={initialData} // Pass the initial data to pre-fill the form
        />

        <Button onClick={onClose} sx={{ marginTop: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};


export default DishCrudModal;
