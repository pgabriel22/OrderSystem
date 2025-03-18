import React, { useState, useEffect } from "react";

import "./App.css";
import OrderForm from "./components/OrderForm";
import OrderColumn from "./components/OrderColumn";
import comboIcon from "./assets/cash.png";
import singleIcon from "./assets/gcash.png";
import othersIcon from "./assets/banktransfer.png";

const oldOrders = localStorage.getItem("order");
console.log(oldOrders);

const App = () => {
  const [order, setOrders] = useState(JSON.parse(oldOrders) || []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const handleDelete = (orderIndex) => {
    const newOrder = order.filter((order, index) => index !== orderIndex);
    setOrders(newOrder);
  };

  console.log("order", order);
  return (
    <div className="app">
      <OrderForm setOrders={setOrders} />
      <main className="app_main">
        <OrderColumn
          title="Cash"
          icon={comboIcon}
          order={order}
          payment="cash"
          handleDelete={handleDelete}
        />
        <OrderColumn
          title="GCash"
          icon={singleIcon}
          order={order}
          payment="gcash"
          handleDelete={handleDelete}
        />
        <OrderColumn
          title="Bank Transfer"
          icon={othersIcon}
          order={order}
          payment="bank"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
