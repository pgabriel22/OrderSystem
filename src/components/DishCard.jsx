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
import { Edit, Delete, Check, Clear, Add} from "@mui/icons-material";

const DishCard = ({
  dishName,
  dishType,
  price,
  isAvailable,
  imageUrl,
  onEdit,
  onDelete,
  mode,
}) => {
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
        width: "100%", // Full width for responsiveness
        maxWidth: 300, // Uniform card width of 300px max
        height: "auto", // Auto height based on content
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", // Prevent overflow
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="160" // Fixed height for the image
          image={imageUrl}
          alt={dishName}
          sx={{
            // objectFit: "cover", // Ensures the image doesn't stretch/distort
            width: "100%", // Make sure image width fills the container
          }}
        />
      )}
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {dishName}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ₱{price}
          </Typography>
        </Box>
        <Typography variant="body2">{dishType}</Typography>
        {isAvailable ? (
          <Check sx={{ color: "green" }} />
        ) : (
          <Clear sx={{ color: "red" }} />
        )}
      </CardContent>

      {mode === "customer" ? (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Tooltip title="Add to Cart">
            <Button variant="contained" aria-label="Add to Cart">
              <Add /> Add to Cart
            </Button>
          </Tooltip>
        </CardActions>
      ) : (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Tooltip title="Edit">
            <IconButton
              variant="contained"
              onClick={onEdit}
              aria-label="Edit Dish"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              variant="contained"
              onClick={onDelete}
              aria-label="Delete Dish"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};

export default DishCard;
