import React from "react";

import "./OrderColumn.css";
import OrderCard from "./OrderCard";
import { Paper, Box, Typography, Divider } from "@mui/material";

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
      <Box sx={{ p: 2, zIndex: 1 }}>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          sx={{ textAlign: "right", fontWeight: "Bold", mt: 2 }}
        >
          Total: ₱
          {totalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskColumn;
