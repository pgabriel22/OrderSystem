import React from "react";
import Combo from "../assets/fire.png";

import "./OrderColumn.css";
import OrderCard from "./OrderCard";

const TaskColumn = ({ title, icon, order, payment, handleDelete }) => {
  return (
    <section className="order_column">
      <h2 className="order_column_heading">
        <img className="order_column_icon" src={icon} alt="Combo meal 129" />
        {title}
      </h2>

      {order.map(
        (order, index) =>
          order.payment === payment && (
            <OrderCard
              key={index}
              title={order.order}
              tags={order.tags}
              handleDelete={handleDelete}
              index={index}
            />
          )
      )}
    </section>
  );
};

export default TaskColumn;
