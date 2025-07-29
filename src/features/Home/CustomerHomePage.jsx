import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import { Menu, ChevronRight, Restore } from "@mui/icons-material";
import OrdersV2 from "../Orders/OrdersV2";

const CustomerHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6">Welcome back, !</Typography>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Your Account
        </Typography>

        {/* Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="Profile"
              src="/avatar.png" // optional
              sx={{ bgcolor: "#fce4ec" }}
            />
            <Box>
              <Typography variant="body1">Profile</Typography>
              <Typography variant="body2" color="text.secondary">
                View and edit your profile
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Order History */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#eeeeee" }}>
              <Restore />
            </Avatar>
            <Box>
              <Typography variant="body1">Order History</Typography>
              <Typography variant="body2" color="text.secondary">
                View your past orders
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#eeeeee" }}>
              <Menu />
            </Avatar>
            <Box>
              <Typography variant="body1">Menu</Typography>
              <Typography variant="body2" color="text.secondary">
                Click here to check the available menu for today!
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => navigate("/order-create")}>
            <ChevronRight />
          </IconButton>
        </Box>

        <Divider />
      </Box>
    </>
  );
};

export default CustomerHomePage;
