import React from "react";

import "./OrderColumn.css";
import OrderCard from "./OrderCard";
import { Paper, Box, Typography, Divider, Button } from "@mui/material";

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
}) => {
  const totalPrice = order
    .filter((item) => item.payment === payment)
    .reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handleDownload = () => {
    const filteredOrders = order.filter((item) => item.payment === payment);

    // Group identical orders by name
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

    // Format the content for the text file
    const fileContent = groupedOrders
      .map((item) => {
        return `${item.order} - x${item.quantity}`;

        // return `${item.order} x${
        //   item.quantity
        // } - ₱${item.totalPrice.toLocaleString("en-PH", {
        //   minimumFractionDigits: 2,
        // })}`;
      })
      .join("\n");

    const totalText = `\nTotal Price: ₱${totalPrice.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
    })}`;

    const fullContent = `Payment Method: ${title}\n\n${fileContent}${totalText}`;

    // Create and download the text file
    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}_Orders_Grouped.txt`;
    link.click();

    URL.revokeObjectURL(url); // Clean up
  };

  return (
    <Box
      component="section"
      sx={{
        width: "500px",
        height: "800px",
        overflow: "auto",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
      gap={2}
    >
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <img className="order_column_icon" src={icon} />
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />

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
              setFormErros={setFormErrors}
            />
          )
      )}
      <Box sx={{ p: 2, borderBottom: "1px", zIndex: 1 }}>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          sx={{ textAlign: "right", fontWeight: "Bold", mt: 2 }}
        >
          Total: ₱
          {totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download Order List
        </Button>
      </Box>
    </Box>
  );
};

export default TaskColumn;
