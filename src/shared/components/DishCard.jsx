import React from "react";
import {
  IconButton,
  Tooltip,
  CardMedia,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Edit, Delete, Check, Clear, Add } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const DishCard = ({
  id,
  dishName,
  dishType,
  price,
  isAvailable,
  imageUrl,
  onEdit,
  onDelete,
  mode,
}) => {
  const { addToCart } = useCart();

  const dish = { id, dishName, dishType, price, isAvailable, imageUrl };

  const onAddToCart = () => {
    addToCart(dish);
  };
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
        width: "100%",
        maxWidth: 300,
        height: 330, // 🔒 Fixed total height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={dishName}
          sx={{
            height: 160, // 🔒 Fixed image height
            width: "100%",
            objectFit: "cover", // 📸 Crop to fill, not stretch
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, minHeight: 120 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mb: 1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {dishName}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ₱{price}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {dishType}
        </Typography>
        <Box>
          {isAvailable ? (
            <Check sx={{ color: "green" }} />
          ) : (
            <Clear sx={{ color: "red" }} />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        {mode === "customer" ? (
          <Tooltip title="Add to Cart">
            <Button
              variant="contained"
              aria-label="Add to Cart"
              onClick={() =>
                addToCart({
                  id,
                  dishName,
                  dishType,
                  price,
                  isAvailable,
                  imageUrl,
                })
              }
            >
              <Add /> Add to Cart
            </Button>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={onEdit} aria-label="Edit Dish">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={onDelete} aria-label="Delete Dish">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default DishCard;
