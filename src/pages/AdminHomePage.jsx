import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Footer from "../components/Footer";
import AppBar from "../components/AppNavBar";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";
import MenuListIcon from "../assets/menu-list.jpg";
import OrderListIcon from "../assets/order-checkout.gif";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: 4,
          p: 2, // Adds padding for better spacing on small screens
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"} // Adjust text size for smaller screens
          sx={{
            textAlign: "center",
            mt: 4,
            mb: 4,
            fontWeight: "bold",
          }}
        >
          Hello Kukulkan what would you like to do?
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {/* Order List Card */}
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ textAlign: "center" }}>
              <CardActionArea onClick={() => navigate("/order-list")}>
                <CardContent>
                  <img
                    src={OrderListIcon}
                    alt="Order List"
                    style={{
                      maxWidth: "100%",
                      height: isMobile ? "200px" : "300px", // Adjust image size for mobile
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="h6">Order List</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Menu Buildup Card */}
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ textAlign: "center" }}>
              <CardActionArea onClick={() => navigate("/menu-buildup")}>
                <CardContent>
                  <img
                    src={MenuListIcon}
                    alt="Menu List"
                    style={{
                      maxWidth: "100%",
                      height: isMobile ? "200px" : "300px", // Adjust image size for mobile
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="h6">Menu Buildup</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminHomePage;
