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
import Footer from "../../shared/components/Footer";
import preparing1 from "../../assets/CustomerHome/preparing1.gif";
import preparing2 from "../../assets/CustomerHome/preparing2.gif";
import delivery1 from "../../assets/CustomerHome/delivery1.gif";
import delivery2 from "../../assets/CustomerHome/delivery2.gif";
import delivered from "../../assets/CustomerHome/delivered.gif";
import cancelledOrder from "../../assets/CustomerHome/cancelledOrder.gif";

const CustomerHomePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "50%",
          flexDirection: "column",
          p: 2,
          mt: 13,
          ml: 70,
        }}
      >
        <Typography variant="h3">Welcome back, !</Typography>
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
          <IconButton
            sx={{
              color: "#ff5722",
              "&:hover": {
                color: "white",
                backgroundColor: "#ff5722",
              },
            }}
          >
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
          <IconButton
            sx={{
              color: "#ff5722",
              "&:hover": {
                color: "white",
                backgroundColor: "#ff5722",
              },
            }}
          >
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
          <IconButton
            onClick={() => navigate("/order-create")}
            sx={{
              color: "#ff5722",
              "&:hover": {
                color: "white",
                backgroundColor: "#ff5722",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
        <Divider />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          // minHeight: "80vh",
          maxHeight: "50vh",
          gap: 4,
          px: 2, // Add padding for better spacing
        }}
      >
        {/* Responsive Image */}
        <img
          src={preparing2}
          alt="Order Status"
          style={{
            maxWidth: "100%",
            height: isMobile ? "300px" : "400px", // Reduce size on mobile
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: { xs: "90%", sm: 500, md: 800 }, // Adjust width dynamically
          }}
        >
          <Typography
            variant="h4" // Adjusted variant for better responsiveness
            sx={{
              textAlign: "center",
              mt: 2,
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Adjusted font sizes
            }}
          >
            Your order is being prepared.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mt: 2,
              mb: 2,
              fontWeight: "medium",
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" }, // Adjusted for readability
              maxWidth: "800px", // Improved readability constraint
              lineHeight: 1.6,
            }}
          >
            A web app designed to simplify lunch ordering for our department.
            With OKB, you can easily select your favorite dishes from Y Kitchen,
            and we'll consolidate all orders for convenient delivery, saving you
            time and making lunch breaks more enjoyable.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default CustomerHomePage;
