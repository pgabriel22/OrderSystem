import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  IconButton,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import {
  FormatListBulletedOutlined,
  RestaurantMenu,
} from "@mui/icons-material";
import OrderLogo from "../assets/okb-logo.png";

const AppNavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #ff5722 30%, #ff9800 90%)", // Gradient color
      }}
    >
      <Toolbar>
        <img src={OrderLogo} alt="Order Logo" style={{ height: "100px" }} />
        {location.pathname === "/" && (
          <Button variant="text" sx={{ color: "white" }} onClick={openModal}>
            Login
          </Button>
        )}
        {location.pathname !== "/" && (
          <Button variant="text" sx={{ color: "white" }}>
            Logout
          </Button>
        )}
        <Modal open={open}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: 300,
              width: 700,
              bgcolor: "white",
              border: "2px solid #000",
              p: 4,
            }}
            gap={2}
            padding={1}
            margin={1}
          >
            <TextField label="Username"></TextField>
            <TextField label="Password"></TextField>
            <Box
              sx={{ display: "flex", flexDirection: "row" }}
              gap={2}
              padding={1}
              margin={1}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/admin-home")}
              >
                Login
              </Button>
              <Button variant="contained" onClick={closeModal}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
