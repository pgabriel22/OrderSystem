import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Checkbox,
} from "@mui/material";

const DishForm = ({ setDish, initialData }) => {
  const [formData, setFormData] = useState({
    id: "",
    dishName: "",
    price: "",
    dishType: "",
    isAvailable: false,
    imageUrl: "",
  });

  const [errors, setErrors] = useState({
    dishName: "",
    price: "",
    dishType: "",
  });

  // Initialize form data if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        dishName: initialData.dishName,
        price: initialData.price,
        dishType: initialData.dishType,
        isAvailable: initialData.isAvailable || false,
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      // Only set ID if creating a new dish
      setFormData((prevData) => ({
        ...prevData,
        id: Date.now(), // Generate a new ID for new dish
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {
      dishName: formData.dishName ? "" : "Dish Name is required.",
      price: formData.price ? "" : "Price is required.",
      dishType: formData.dishType ? "" : "Dish Type is required.",
    };
    setErrors(newErrors);

    // Return true if no errors, else false
    return !newErrors.dishName && !newErrors.price && !newErrors.dishType;
  };

  const handleSubmit = () => {
    if (validate()) {
      setDish(formData); // Pass formData to the parent to create/update the dish
    }
  };

  return (
    <Box>
      <TextField
        label="Dish Name"
        name="dishName"
        value={formData.dishName}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
        error={!!errors.dishName}
        helperText={errors.dishName}
      />

      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
        error={!!errors.price}
        helperText={errors.price}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }} error={!!errors.dishType}>
        <InputLabel>Dish Type</InputLabel>
        <Select
          name="dishType"
          label="Dish Type"
          value={formData.dishType}
          onChange={handleChange}
        >
          <MenuItem value="mainDish">Main Dish</MenuItem>
          <MenuItem value="secondDish">Second Dish</MenuItem>
          <MenuItem value="addons">Add-ons</MenuItem>
        </Select>
        <FormHelperText>{errors.dishType}</FormHelperText>
      </FormControl>

      <TextField
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl || ""}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
        }
        label="is Available?"
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {initialData ? "Save Changes" : "Add Dish"}
      </Button>
    </Box>
  );
};

export default DishForm;
