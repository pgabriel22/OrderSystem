import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { RestaurantMenu } from "@mui/icons-material";
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
        `id, created_at, order_items(dish_id, quantity, unit_price, dishes(dishName)), order_status`
      )
      .eq("user_id", user.id)
      .in("order_status", [0, 1, 2, 3]);

    if (error) console.error("Fetch error:", error.message);
    else setActiveOrders(data);
  };

  useEffect(() => {
    if (user) fetchActiveOrders();
  }, [user]);

  const ordersToday = activeOrders.filter((order) =>
    isSameLocalDay(order.created_at, new Date())
  );

  return (
    <Box sx={{ mt: 10, px: 2 }}>
      {ordersToday.length === 0 ? (
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={isMobile ? 300 : 400}
            >
              <OrderStatusGif status="none" isMobile={isMobile} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  mb: 2,
                }}
              >
                Looks like you haven’t ordered yet.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  maxWidth: "90%",
                  mx: "auto",
                }}
              >
                Head over to the menu and grab something tasty!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
            px: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ mt: 8 }}
          >
            Today’s Orders
          </Typography>

          {ordersToday.map((order, index) => (
            <Grid
              key={order.id}
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Grid item xs={12} md={5}>
                <Box display="flex" justifyContent="center">
                  <OrderStatusGif
                    status={order.order_status}
                    isMobile={isMobile}
                    variant={index}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={7}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Your order is {statusLabels[order.order_status] || "Unknown"}
                  </Typography>
                  <Typography fontWeight="bold">
                    Order #{order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Placed on: {new Date(order.created_at).toLocaleString()}
                  </Typography>
                  <List>
                    {order.order_items?.map((item, idx) => (
                      <ListItem key={idx}>
                        <RestaurantMenu sx={{ mr: 1 }} />
                        <ListItemText
                          primary={`${
                            item.dishes?.dishName || "Unknown"
                          } x ${item.quantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyOrders;
