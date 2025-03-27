import React from "react";
import { Typography, Box } from "@mui/material";
import { CheckCircle, Cancel, Check } from "@mui/icons-material";

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
        {paidCustomer.length > 0 ? (
          paidCustomer.map((order, index) => (
            <Typography key={index} variant="body1">
              {order.orderby}
            </Typography>
          ))
        ) : (
          <Typography>No Paid Customers</Typography>
        )}
      </Box>
      <Typography
        display="flex"
        variant="h6"
        fontWeight="bold"
        justifyContent="center"
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
        {unpaidCustomer.length > 0 ? (
          unpaidCustomer.map((order, index) => (
            <Typography key={index} variant="body1">
              {order.orderby}
            </Typography>
          ))
        ) : (
          <Typography>No Unpaid Customers</Typography>
        )}
      </Box>
    </>
  );
};

export default PaymentList;
