import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  Snackbar,
  Alert,
  Drawer,
  Fab,
  Badge,
} from "@mui/material";
import Footer from "../../shared/components/Footer";
import DishList from "../../shared/components/DishList";
import Waiter from "../../assets/taking-order.gif";
import { useLocalCart } from "../../shared/hooks/useLocalCart";
import CartDrawer from "./components/CartDrawer";
import { useCart } from "../../shared/context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const OrderingPage = ({ openDrawer, setOpenDrawer }) => {
  const { getCartCount } = useCart();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [dishes, setDishes] = useState([]);
  const { addToCart } = useLocalCart();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    setDishes(Array.isArray(savedDishes) ? savedDishes : []);
  }, []);

  return (
    <>
      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Footer />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100vh",
          pt: "100px", // adjust based on your AppBar height
          pb: "40px", // adjust based on your Footer height
          overflow: "hidden",
        }}
      >
        {/* Left image */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff3e0",
          }}
        >
          <img
            src={Waiter}
            alt="Taking Order"
            style={{
              maxWidth: "100%",
              height: isMobile ? "250px" : "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right dish list (scrollable) */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            overflowY: "auto",
            px: 2,
            py: 1,
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Edge
            },
          }}
        >
          <DishList
            dishes={dishes}
            mode="customer"
            fixedTabs={true}
            onAddToCart={addToCart}
          />
        </Box>
      </Box>

      {!openDrawer && (
        <Fab
          color="primary"
          aria-label="cart"
          onClick={() => setOpenDrawer(true)}
          sx={{
            position: "fixed",
            bottom: 50,
            right: 16,
            zIndex: 1300,
            backgroundColor: "#ff5722",
            "&:hover": { backgroundColor: "#e64a19" },
          }}
        >
          <Badge badgeContent={getCartCount()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      )}

      {/*Cart Drawer*/}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <CartDrawer
          onClose={() => setOpenDrawer(false)}
          setShowToast={setShowToast}
        />
      </Drawer>

      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowToast(false)}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderingPage;
