import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { CheckCircle, Cancel, CircleOutlined } from "@mui/icons-material";

const PaymentList = ({ orders }) => {
  const paidCustomer = orders.filter((order) => order.paymentStatus === "paid");
  const unpaidCustomer = orders.filter(
    (order) => order.paymentStatus === "unpaid"
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Paid Customers Section */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            color="success.main"
          >
            <CheckCircle /> List of Paid Customers
          </Typography>
          <List>
            {paidCustomer.length > 0 ? (
              paidCustomer.map((order, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CircleOutlined sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary={order.orderby} />
                </ListItem>
              ))
            ) : (
              <Typography textAlign="center" sx={{ mt: 1 }}>
                No Paid Customers
              </Typography>
            )}
          </List>
        </Grid>

        {/* Unpaid Customers Section */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            color="error.main"
          >
            <Cancel /> List of Unpaid Customers
          </Typography>
          <List>
            {unpaidCustomer.length > 0 ? (
              unpaidCustomer.map((order, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CircleOutlined sx={{ color: "red" }} />
                  </ListItemIcon>
                  <ListItemText primary={order.orderby} />
                </ListItem>
              ))
            ) : (
              <Typography textAlign="center" sx={{ mt: 1 }}>
                No Unpaid Customers
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentList;
