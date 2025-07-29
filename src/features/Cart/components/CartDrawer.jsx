import React, { useState, useEffect } from "react";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { useCart } from "../../../shared/context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";

const CartDrawer = ({ onClose, setShowToast }) => {
  const { cart, getTotalPrice, clearCart, updateQuantity, removeFromCart } =
    useCart();

  const session = useSession();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (session && !user) {
      navigate("/");
    }
  }, [session, user, navigate]);

  const handleCheckout = async () => {
    if (!user) return alert("You must be logged in to place an order.");
    if (cart.length === 0) return alert("Cart is empty.");

    try {
      // Step 1: Fetch the user's full_name from the users table
      const { data: userProfile, error: userError } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (userError || !userProfile) {
        throw new Error("Unable to retrieve user profile.");
      }

      const fullName = userProfile.full_name;

      // Step 2: Insert order including customer_name
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: fullName, // store it here
          total_price: getTotalPrice(),
          payment_status: false,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Step 3: Insert order items
      const itemsPayload = cart.map((item) => ({
        order_id: order.id,
        dish_id: item.dish_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }));

      const { error: itemError } = await supabase
        .from("order_items")
        .insert(itemsPayload);

      if (itemError) throw itemError;

      // Step 4: Success actions
      clearCart();
      setShowToast(true);
      onClose();
    } catch (err) {
      console.error("Order submission failed:", err.message);
      alert("Failed to submit order. Please try again.");
    }
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
          Your Cart <ShoppingCart />
        </Typography>

        {/* Cart Items scrollable section */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
          {cart.length === 0 ? (
            <Typography>No items in your cart.</Typography>
          ) : (
            cart.map((item) => (
              <Box key={item.dish_id} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Dish Name and Price */}
                  <Box>
                    <Typography>{item.dishName || "Unamed Dish"}</Typography>
                    <Typography variant="body2">
                      ₱{item.unit_price} × {item.quantity}
                    </Typography>
                  </Box>

                  {/* Controls */}
                  <Box>
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.dish_id, item.quantity - 1)
                      }
                    >
                      <Remove />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.dish_id, item.quantity + 1)
                      }
                    >
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => removeFromCart(item.dish_id)}>
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
          disabled={cart.length === 0}
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
