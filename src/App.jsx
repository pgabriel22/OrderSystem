import React, { useState, useEffect } from "react";

import "./App.css";
import OrderForm from "./components/OrderForm";
import OrderColumn from "./components/OrderColumn";
import PaymentStatusColumn from "./components/PaymentStatusColumn";
import comboIcon from "./assets/cash.png";
import singleIcon from "./assets/gcash.png";
import othersIcon from "./assets/banktransfer.png";
import Footer from "./components/Footer";

const oldOrders = localStorage.getItem("order");
// console.log(oldOrders);

const App = () => {
  const [order, setOrders] = useState(JSON.parse(oldOrders) || []);
  const [isEditing, setIsEditing] = useState(null);
  const [tempOrder, setTempOrder] = useState({});
  const [formErrors, setFormErrors] = useState({
    order: { error: false, helperText: "" },
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const handleDelete = (orderIndex) => {
    const newOrder = order.filter((order, index) => index !== orderIndex);
    setOrders(newOrder);
  };

  const handleEdit = (orderIndex) => {
    setIsEditing(orderIndex);
    setTempOrder({ ...order[orderIndex] });
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleUpdate = () => {
    // let errors = { ...formErrors };

    const errors = { order: { error: false, helperText: "" } };

    if (!tempOrder.order?.trim()) {
      errors.order = {
        error: true,
        helperText: "Order is required",
      };
    }
    // else {
    //   errors.order = { error: false, helperText: "" };
    // }
    setFormErrors(errors);

    if (errors.order.error) {
      return;
    }
    const updatedOrder = [...order];
    updatedOrder[isEditing] = tempOrder;
    setOrders(updatedOrder);
    setIsEditing(null);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
  };

  // console.log("order", order);
  return (
    <div className="app">
      <OrderForm setOrders={setOrders} />
      <main className="app_main">
        <OrderColumn
          title="Cash"
          icon={comboIcon}
          order={order}
          payment="cash"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          isEditing={isEditing}
          tempOrder={tempOrder}
          setTempOrder={setTempOrder}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
        <OrderColumn
          title="GCash"
          icon={singleIcon}
          order={order}
          payment="gcash"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          isEditing={isEditing}
          tempOrder={tempOrder}
          setTempOrder={setTempOrder}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
        <PaymentStatusColumn
          title="Payment Status"
          icon={othersIcon}
          order={order}
          payment="bank"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
          isEditing={isEditing}
          tempOrder={tempOrder}
          setTempOrder={setTempOrder}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
