import React from "react";

import "./OrderColumn.css";
import OrderCard from "./OrderCard";
import { Paper, Box, Typography } from "@mui/material";

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
      {/* <section className="order_column"> */}
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <img className="order_column_icon" src={icon} />
        {title}
      </Typography>

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
      {/* </section> */}
    </Box>
  );
};

export default TaskColumn;
