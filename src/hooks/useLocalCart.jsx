import { SyncAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function useLocalCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.oarse(stored));
    }
  }, []);

  const syncCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = (item) => {
    const current = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = [...current, item];
    SyncAlt(updated);
  };

  const getCartCount = () => cartItems.length;

  return {
    cartItems,
    addToCart,
    getCartCount,
  };
}
