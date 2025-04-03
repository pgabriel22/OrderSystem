import React from "react";
import PaymentList from "./PaymentList";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { CreditScoreRounded } from "@mui/icons-material";

const PaymentStatusColumn = ({ title, order }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      sx={{
        width: isMobile ? "100%" : "500px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 2,
        overflowY: "auto",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
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
