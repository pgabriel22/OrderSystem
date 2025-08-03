import React, { act, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import {
  Menu,
  ChevronRight,
  Restore,
  RestaurantMenu,
} from "@mui/icons-material";
import Footer from "../../shared/components/Footer";
import MyOrders from "./components/MyOrders";
import MyProfile from "./components/MyProfile";
import OrderHistory from "./components/OrderHistory";

const CustomerHomePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const user = useUser();
  const [fullName, setFullName] = useState();
  const [activeView, setActiveView] = useState("myOrders");
  const [activeOrders, setActiveOrders] = useState([]);
  const isSameLocalDay = (date1, date2) =>
    new Date(date1).toLocaleDateString() ===
    new Date(date2).toLocaleDateString();
  const statusLabels = {
    0: "being prepared",
    1: "on its way!",
    2: "Delivered!",
    3: "Cancelled!",
  };

  const fetchActiveOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `id,created_at, order_items(dish_id,quantity, unit_price,dishes(dishName)), order_status`
      )
      .eq("user_id", user.id)
      .in("order_status", [0, 1, 2, 3]);
    if (error) {
      console.error("Failed to fetch active orders:", error.message);
    } else {
      setActiveOrders(data);
    }
  };

  useEffect(() => {
    if (user) fetchActiveOrders();
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Failed to fetch full name:", error.message);
        } else {
          setFullName(data.full_name);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const ordersToday = activeOrders.filter((order) =>
    isSameLocalDay(order.created_at, new Date())
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          {/* User Navigation Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              mt: 13,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ alignSelf: "center", justifySelf: "center" }}
            >
              Welcome back{fullName ? `, ${fullName}` : ""}!
            </Typography>
            <Typography variant="h6" fontWeight="bold" mb={2} mt={2}>
              Your Account
            </Typography>

            {/* Profile */}
            <Box
              onClick={() => setActiveView("myProfile")}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                mb: 2,
                ml: 3,
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
            </Box>

            {/* Active Orders */}
            <Box
              onClick={() => setActiveView("myOrders")}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                mb: 2,
                ml: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#eeeeee" }}>
                  <Restore />
                </Avatar>
                <Box>
                  <Typography variant="body1">My Orders</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check your active/current orders here
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Order History */}
            <Box
              onClick={() => setActiveView("orderHistory")}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                mb: 2,
                ml: 3,
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
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                ml: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#eeeeee" }}>
                  <RestaurantMenu />
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
        </Grid>
        <Grid item md={6} xs={12}>
          {/* Active View Panel */}
          {activeView === "myProfile" && <MyProfile />}
          {activeView === "myOrders" && <MyOrders />}
          {activeView === "orderHistory" && <OrderHistory />}
        </Grid>
      </Grid>

      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default CustomerHomePage;
