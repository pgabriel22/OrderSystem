import React from "react";

import "./OrderColumn.css";
import PaymentList from "./PaymentList";
import { Card, CardContent, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CreditScoreRounded, CheckCircle, Cancel} from "@mui/icons-material";

const PaymentStatusColumn =  ({ title, order }) => {
  const paidOrders = order.filter((o) => o.paymentStatus === "paid");
  const unpaidOrders = order.filter((o) => o.paymentStatus === "unpaid");

  return (
    <Box
      component="section"
      sx={{
        width: "500px",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 1,
      }}
      gap={2}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #ccc",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CreditScoreRounded />
          {title}
        </Typography>
      </Box>
      {/* <Typography variant="h6" gutterBottom sx={{  display: "flex", justifyContent: "center"}}>List of Paid Customers</Typography>
      <List>
        {paidOrders.map((o, index) => (
          <ListItem key={index}>
            <ListItemText primary={o.orderBy} />
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary={o.orderby} secondary="Paid" />
          </ListItem>
        ))}
        {paidOrders.length === 0 && (
          <Typography color="textSecondary" sx={{ ml: 2 }}>No paid customers</Typography>
        )}
      </List>

      <Typography variant="h6" gutterBottom sx={{  display: "flex", justifyContent: "center"}}>List of Unpaid Customers</Typography>
      <List>
        {unpaidOrders.map((o, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Cancel color="error" />
            </ListItemIcon>
            <ListItemText primary={o.customer} secondary="Unpaid" />
          </ListItem>
        ))}
        {unpaidOrders.length === 0 && (
          <Typography color="textSecondary" sx={{ ml: 2 }}>No unpaid customers</Typography>
        )}
      </List> */}
      <PaymentList orders={order} />
    </Box>
  );
};

export default PaymentStatusColumn;
