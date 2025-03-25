import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const PaymentList = ({ orders }) => {
  return (
    <List>
      {orders.map((order, index) => (
        <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
          <ListItemText
            primary={
              <Typography variant="body1" fontWeight="bold">
                {order.orderby} – {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </Typography>
            }
            sx={{ mr: 1 }}
          />
          <ListItemIcon>
            {order.paymentStatus === "paid" ? (
              <CheckCircle color="success" />
            ) : (
              <Cancel color="error" />
            )}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

export default PaymentList;
