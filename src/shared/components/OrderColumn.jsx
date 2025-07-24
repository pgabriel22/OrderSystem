import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OrderCard from "./OrderCard";

const TaskColumn = ({
  title,
  icon,
  order,
  payment,
  handleEdit,
  handleUpdate,
  handleCancel,
  handleDelete,
  isEditing,
  tempOrder,
  setTempOrder,
  formErrors,
  setFormErrors,
  paymentStatus,
  handleStatusChange,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalPrice = order
    .filter((item) => item.payment === payment)
    .reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handleDownload = () => {
    const filteredOrders = order.filter((item) => item.payment === payment);

    const groupedOrders = filteredOrders.reduce((acc, item) => {
      const existingOrder = acc.find((o) => o.order === item.order);
      if (existingOrder) {
        existingOrder.quantity += 1;
        existingOrder.totalPrice += item.totalPrice || 0;
      } else {
        acc.push({
          order: item.order,
          quantity: 1,
          totalPrice: item.totalPrice || 0,
        });
      }
      return acc;
    }, []);

    const fileContent = groupedOrders
      .map((item) => `${item.order} - x${item.quantity}`)
      .join("\n");

    const totalText = `\nTotal Price: ₱${totalPrice.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
    })}`;

    const fullContent = `Payment Method: ${title}\n\n${fileContent}${totalText}`;

    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}_Orders_Grouped.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "500px",
        height: isMobile ? "auto" : "800px",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        gap: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ccc",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          <img
            className="order_column_icon"
            src={icon}
            alt="icon"
            style={{
              width: isMobile ? "24px" : "32px", // Adjust icon size based on screen size
              height: "auto", // Maintain aspect ratio
              marginRight: "8px", // Optional: Add spacing between icon and text
            }}
          />
          {title}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: 2, width: "100%" }}>
        {order.map(
          (order, index) =>
            order.payment === payment && (
              <OrderCard
                key={index}
                title={order.order}
                customer={order.orderby}
                tags={order.tags}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
                isEditing={isEditing}
                tempOrder={tempOrder}
                setTempOrder={setTempOrder}
                index={index}
                totalPrice={order.totalPrice}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                paymentStatus={order.paymentStatus || "unpaid"}
                onStatusChange={handleStatusChange}
              />
            )
        )}
      </Box>

      <Box sx={{ p: 2, borderBottom: "1px", zIndex: 1, width: "100%" }}>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          sx={{
            textAlign: "right",
            fontWeight: "Bold",
            mt: 2,
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Total: ₱
          {totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth={isMobile}
          onClick={handleDownload}
        >
          Download Order List
        </Button>
      </Box>
    </Box>
  );
};

export default TaskColumn;
