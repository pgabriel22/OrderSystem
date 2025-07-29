import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart or update quantity if exists
  const addToCart = (dish) => {
    console.log("Adding to cart:", dish);
    const exists = cart.find((item) => item.dish_id === dish.id);

    const updated = exists
      ? cart.map((item) =>
          item.dish_id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...cart,
          {
            dish_id: dish.id,
            dishName: dish.dishName || dish.name || "Unamed Dish",
            unit_price: dish.price,
            quantity: 1,
          },
        ];

    setCart(updated);
  };

  // Update quantity of a dish
  const updateQuantity = (dish_id, quantity) => {
    const updated = cart.map((item) =>
      item.dish_id === dish_id
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    setCart(updated);
  };

  // Remove an item from cart
  const removeFromCart = (dish_id) => {
    const updated = cart.filter((item) => item.dish_id !== dish_id);
    setCart(updated);
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Get total number of items (sum of quantities)
  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  // Get total price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.unit_price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
