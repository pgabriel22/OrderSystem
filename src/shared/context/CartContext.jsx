import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const addToCart = (item) => {
    const exists = cartItems.find((cartItems) => cartItems.id === item.id);

    let updated;
    if (exists) {
      updated = cartItems.map((cartItems) =>
        cartItems.id === item.id
          ? { ...cartItems, quantity: cartItems.quantity + 1 }
          : cartItems
      );
    } else {
      updated = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getCartCount = () => cartItems.length;

  const updateQuantity = (id, qty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
