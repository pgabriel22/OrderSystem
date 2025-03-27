import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          p: 2,
          flexDirection: "column",
        }}
      >
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
      </Box>
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
      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          p: 2,
          flexDirection: "column",
        }}
      >
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
      </Box>
    </>
  );
};

export default PaymentList;
