import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";
import OrderLogo from "../assets/okb-logo.png";

const AppNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null); // "admin" or "customer"
  const [role, setRole] = useState("admin"); // selected in login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) setMode(savedMode);
  }, []);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleLogin = () => {
    setMode(role);
    localStorage.setItem("mode", role);
    closeModal();

    if (role === "admin") {
      navigate("/admin-home");
    } else {
      navigate("/order-create");
    }
  };

  const handleLogout = () => {
    setMode(null);
    localStorage.removeItem("mode");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
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
          <Button variant="text" sx={{ color: "white" }} onClick={openModal}>
            Login
          </Button>
        )}

        {/* Show logout on all other pages except order-create */}
        {location.pathname !== "/" && location.pathname !== "/order-create" && (
          <Button variant="text" sx={{ color: "white" }} onClick={handleLogout}>
            Logout
          </Button>
        )}

        {/* Login Modal */}
        <Modal open={open} onClose={closeModal}>
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
              Login
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
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>

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
              <Button variant="outlined" onClick={closeModal}>
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
