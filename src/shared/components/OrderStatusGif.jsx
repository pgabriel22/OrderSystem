// components/OrderStatusGif.jsx

import React from "react";
import { Box } from "@mui/material";
import thinkingOrderGif from "../../assets/CustomerHome/thinkingOrderGif.gif";
import preparing1Gif from "../../assets/CustomerHome/preparing1Gif.gif";
import preparing2Gif from "../../assets/CustomerHome/preparing2Gif.gif";
import delivery1Gif from "../../assets/CustomerHome/delivery1Gif.gif";
import delivery2Gif from "../../assets/CustomerHome/delivery2Gif.gif";
import deliveredGif from "../../assets/CustomerHome/deliveredGif.gif";
import cancelledGif from "../../assets/CustomerHome/cancelledGif.gif";

const OrderStatusGif = ({ status, isMobile = false, variant = 0 }) => {
  let gifSrc;

  switch (status) {
    case 0: // Preparing
      gifSrc = variant % 2 === 0 ? preparing1Gif : preparing2Gif;
      break;
    case 1: // On Delivery
      gifSrc = variant % 2 === 0 ? delivery1Gif : delivery2Gif;
      break;
    case 2: // Delivered
      gifSrc = deliveredGif;
      break;
    case 3: // Cancelled
      gifSrc = cancelledGif;
      break;
    case "none": // No order today
      gifSrc = thinkingOrderGif;
      break;
    default:
      gifSrc = thinkingOrderGif;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isMobile ? "300px" : "400px",
        width: "100%",
      }}
    >
      <img
        src={gifSrc}
        alt="Order Status"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default OrderStatusGif;
