import React from "react";

import "./OrderColumn.css";
import PaymentList from "./PaymentList";
import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CreditScoreRounded, CheckCircle, Cancel } from "@mui/icons-material";

const PaymentStatusColumn = ({ title, order }) => {
  // const paidOrders = order.filter((o) => o.paymentStatus === "paid");
  // const unpaidOrders = order.filter((o) => o.paymentStatus === "unpaid");

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
        overflowY: "auto",
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={1}
        >
          <CreditScoreRounded />
          {title}
        </Typography>
      </Box>
      <PaymentList orders={order} />
    </Box>
  );
};

export default PaymentStatusColumn;
