import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import DishForm from "./DishForm";

const DishCrudModal = ({
  open,
  onClose,
  mode,
  initialData,
  onSubmit,
  showSuccessToast,
}) => {
  const isEditMode = mode === "edit";

  const handleSubmit = (dishData) => {
    onSubmit(dishData);
    onClose();
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
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {isEditMode ? "Edit Dish" : "Create New Dish"}
        </Typography>

        <DishForm
          setDish={handleSubmit}
          initialData={initialData}
          showSuccessToast={showSuccessToast}
        />

        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DishCrudModal;
