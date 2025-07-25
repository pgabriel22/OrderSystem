import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  IconButton,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Drawer,
} from "@mui/material";
import OrderLogo from "../../assets/okb-logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import CartDrawer from "../../features/Cart/components/CartDrawer";

const AppNavBar = ({ setOpenDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null); // "admin" or "customer"
  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) setMode(savedMode);
  }, []);

  const handleLogin = () => {
    setMode(role);
    localStorage.setItem("mode", role);
    handleCloseModal();

    if (role === "admin") {
      navigate("/admin-home");
    } else {
      navigate("/order-create");
    }
  };

  const isOrderingPage = location.pathname === "/order-create";

  const handleLogout = () => {
    setMode(null);
    localStorage.removeItem("mode");
    navigate("/");
  };

  const { getCartCount } = useCart();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #ff5722 30%, #ff9800 90%)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo with conditional navigation */}
        <img
          src={OrderLogo}
          alt="Order Logo"
          style={{ height: "100px", cursor: "pointer" }}
          onClick={() => {
            if (mode === "admin") {
              navigate("/admin-home");
            } else {
              navigate("/");
            }
          }}
        />

        {/* Show login button only on homepage */}
        {location.pathname === "/" && (
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
        )}

        {/* Show logout on all other pages except order-create */}
        {location.pathname !== "/" && location.pathname !== "/order-create" && (
          <Button variant="text" sx={{ color: "white" }} onClick={handleLogout}>
            Logout
          </Button>
        )}

        {/*Cart Button */}
        {isOrderingPage && (
          <IconButton
            color="inherit"
            aria-label="cart"
            sx={{ position: "absolute", top: 25, right: 16 }}
            onClick={() => setOpenDrawer(true)}
          >
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </IconButton>
        )}

        {/* Login Modal */}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              gap: 2,
            }}
          >
            <Typography variant="h6" textAlign="center">
              {authMode === "login" ? "Login" : "Sign Up"}
            </Typography>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            {authMode === "signup" && (
              <TextField label="Confirm Password" type="password" />
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
