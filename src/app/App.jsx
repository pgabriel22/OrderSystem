import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import MenuBuildup from "../features/Menu/MenuBuildup.jsx";
import Orders from "../features/Orders/Orders.jsx";
import AdminHomePage from "../features/Home/AdminHomePage.jsx";
import HomePage from "../features/Home/HomePage.jsx";
import CustomerHomePage from "../features/Home/CustomerHomePage.jsx";
import OrderingPage from "../features/Cart/OrderingPage.jsx";
import OrdersV2 from "../features/Orders/OrdersV2.jsx";
import AppNavBar from "../shared/components/AppNavBar.jsx";

const App = () => {
  const [mode, setMode] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // or "signup"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) setMode(storedMode);
  }, []);

  return (
    <Router>
      <AppNavBar
        setOpenDrawer={setOpenDrawer}
        mode={mode}
        setMode={setMode}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              mode={mode}
              setMode={setMode}
              setAuthMode={setAuthMode}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/admin-home"
          element={
            <AdminHomePage
              mode={mode}
              setMode={setMode}
              setAuthMode={setAuthMode}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <CustomerHomePage
              mode={mode}
              setMode={setMode}
              setAuthMode={setAuthMode}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
        <Route path="/order-list" element={<Orders />} />
        <Route
          path="/order-listv2"
          element={<OrdersV2 mode={mode} setMode={setMode} />}
        />
        <Route
          path="/order-create"
          element={
            <OrderingPage
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              mode={mode}
              setMode={setMode}
            />
          }
        />
        <Route
          path="/menu-buildup"
          element={<MenuBuildup mode={mode} setMode={setMode} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
