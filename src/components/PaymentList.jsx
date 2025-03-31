import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Grid2,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Check,
  Circle,
  CircleOutlined,
} from "@mui/icons-material";

const PaymentList = ({ orders }) => {
  const paidCustomer = orders.filter((order) => order.paymentStatus === "paid");
  const unpaidCustomer = orders.filter(
    (order) => order.paymentStatus === "unpaid"
  );
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid2 container spacing={4} columns={{ xs: 1, sm: 2, md: 12 }}>
          <Grid2>
            <Typography
              display="flex"
              variant="h6"
              fontWeight="bold"
              justifyContent="center"
              alignItems="center"
              gap={1}
              color="success"
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
                    <ListItemText primary={order.orderby}></ListItemText>
                  </ListItem>
                ))
              ) : (
                <Typography>No Paid Customers</Typography>
              )}
            </List>
          </Grid2>
          <Grid2>
            <Typography
              display="flex"
              variant="h6"
              fontWeight="bold"
              justifyContent="center"
              alignItems="center"
              gap={1}
              color="red"
            >
              <Cancel />
              List of Unpaid Customers
            </Typography>
            <List>
              {unpaidCustomer.length > 0 ? (
                unpaidCustomer.map((order, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CircleOutlined sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText primary={order.orderby}></ListItemText>
                  </ListItem>
                ))
              ) : (
                <Typography>No Unpaid Customers</Typography>
              )}
            </List>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default PaymentList;
