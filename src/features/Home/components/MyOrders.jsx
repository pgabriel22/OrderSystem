import React, { act, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Grid2,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu,
  ChevronRight,
  Restore,
  RestaurantMenu,
} from "@mui/icons-material";
import OrderStatusGif from "../../../shared/components/OrderStatusGif";

const MyOrders = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const user = useUser();
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

  const ordersToday = activeOrders.filter((order) =>
    isSameLocalDay(order.created_at, new Date())
  );
  return (
    <>
      <Grid item md={6} xs={12}>
        {/* Current Orders Status Viewing */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            // maxHeight: "50vh",
            mt: 13,
            gap: 4,
            px: 2,
          }}
        >
          {ordersToday.length === 0 ? (
            <>
              <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                  <OrderStatusGif status="none" isMobile={isMobile} />{" "}
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 3,
                      width: { xs: "90%", sm: 500, md: 800 },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                      }}
                    >
                      Looks like you haven’t ordered yet.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        fontWeight: "medium",
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1.1rem",
                          md: "1.3rem",
                        },
                        maxWidth: "800px",
                        lineHeight: 1.6,
                      }}
                    >
                      Head over to the menu and grab something tasty!
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </>
          ) : (
            <Box
              sx={{
                width: "100%",
                maxWidth: 1000,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                overflowY: "auto", // enables scroll if content overflows
                maxHeight: "50vh",
                scrollbarWidth: "none", // hide scrollbar in Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // hide scrollbar in WebKit browsers
                },
              }}
            >
              {activeOrders.length > 0 && (
                <Typography
                  ariant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "#fff",
                    py: 1,
                  }}
                >
                  Today’s Orders
                </Typography>
              )}
              {ordersToday.map((order, index) => (
                <>
                  <Box
                    key={order.id}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "center",
                      alignItems: "center",
                      maxHeight: "50vh",
                      gap: 4,
                      px: 2,
                    }}
                  >
                    {/* Status-specific GIF */}
                    <OrderStatusGif
                      status={order.order_status}
                      isMobile={isMobile}
                      variant={index}
                    />
                    <Box>
                      <Typography
                        fontWeight="bold"
                        variant="h5"
                        sx={{ mt: 0, mb: 2 }}
                      >
                        Your order is{" "}
                        {statusLabels[order.order_status] || "Unknown"}
                      </Typography>
                      <Typography fontWeight="bold">
                        Order #{order.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Placed on: {new Date(order.created_at).toLocaleString()}
                      </Typography>
                      <List>
                        {order.order_items?.map((item, idx) => (
                          <ListItem key={idx}>
                            <RestaurantMenu sx={{ mr: 1 }} />
                            <ListItemText
                              sx={{ paddingBottom: 0 }}
                              primary={`${
                                item.dishes?.dishName || "Unknown"
                              } x ${item.quantity}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default MyOrders;
