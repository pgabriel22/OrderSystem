import React, { useState, useEffect } from "react";
import { useCart } from "../../../shared/context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartDrawer = ({ onClose, setShowToast }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [errors, setErrors] = useState({
    customerName: "",
  });

  // Validation for Customer Name
  const validateCustomerName = () => {
    const newErrors = {
      customerName: customerName.trim() ? "" : "Customer Name is required.",
    };

    setErrors(newErrors);

    return !newErrors.customerName;
  };

  const handleCheckout = () => {
    if (!validateCustomerName()) {
      return;
    }

    const orderItems = cartItems.map((item) => ({
      dishName: item.dishName,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrder = {
      id: Date.now(), // simple unique ID
      customerName,
      items: orderItems,
      createdAt: new Date().toISOString(),
      paymentStatus: "unpaid",
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Optional: Clear cart and close drawer
    clearCart();
    setCustomerName("");
    setShowToast(true);
    onClose();
  };

  return (
    <>
      <Box
        sx={{
          width: 500,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>

        {cartItems.length > 0 && (
          <TextField
            fullWidth
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            sx={{ mt: 2, mb: 3 }}
            error={!!errors.customerName}
            helperText={errors.customerName}
          />
        )}

        {/* Cart Items scrollable section */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
          {cartItems.length === 0 ? (
            <Typography>No items in your cart.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Dish Name and Price */}
                  <Box>
                    <Typography>{item.dishName}</Typography>
                    <Typography variant="body2">
                      ₱{item.price} × {item.quantity}
                    </Typography>
                  </Box>

                  {/* Controls */}
                  <Box>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ mt: 1 }} />
              </Box>
            ))
          )}
        </Box>

        {/* Checkout button at the bottom */}
        <Button
          fullWidth
          variant="contained"
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
          sx={{ mt: 2 }}
        >
          PROCEED TO CHECKOUT
        </Button>
      </Box>
    </>
  );
};

export default CartDrawer;
