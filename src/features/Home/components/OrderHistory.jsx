import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const OrderHistory = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <>
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
        <Typography variant="h5">Order History</Typography>
      </Box>
    </>
  );
};

export default OrderHistory;
