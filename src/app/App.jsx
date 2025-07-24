import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import MenuBuildup from "../features/Menu/MenuBuildup.jsx";
import Orders from "../features/Orders/Orders.jsx";
import AdminHomePage from "../features/Home/AdminHomePage.jsx";
import HomePage from "../features/Home/HomePage.jsx";
import OrderingPage from "../features/Cart/OrderingPage.jsx";
import OrdersV2 from "../features/Orders/OrdersV2.jsx";
import AppNavBar from "../shared/components/AppNavBar.jsx";

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Router>
      <AppNavBar setOpenDrawer={setOpenDrawer} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/order-list" element={<Orders />} />
        <Route path="/order-listv2" element={<OrdersV2 />} />
        <Route
          path="/order-create"
          element={
            <OrderingPage
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          }
        />
        <Route path="/menu-buildup" element={<MenuBuildup />} />
      </Routes>
    </Router>
  );
};

export default App;
