import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { CartProvider } from "./shared/context/CartContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
