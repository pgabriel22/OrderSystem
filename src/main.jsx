import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { CartProvider } from "./shared/context/CartContext.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabaseClient.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <SessionContextProvider supabaseClient={supabase}>
    <CartProvider>
      <App />
    </CartProvider>
  </SessionContextProvider>
);
