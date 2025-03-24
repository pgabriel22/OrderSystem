import React from "react";

import "./OrderColumn.css";
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
  totalPrice,
}) => {
  return (
    <section className="order_column">
      <h2 className="order_column_heading">
        <img className="order_column_icon" src={icon} />
        {title}
      </h2>

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
            />
          )
      )}
    </section>
  );
};

export default TaskColumn;
