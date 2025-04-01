import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import MenuBuildup from "./pages/MenuBuildup.jsx";
import Orders from "./pages/Orders.jsx";
import AdminHomePage from "./pages/AdminHomePage.jsx";
import HomePage from "./pages/HomePage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/order-list" element={<Orders />} />
        <Route path="/menu-buildup" element={<MenuBuildup />} />
      </Routes>
    </Router>
  );
};

export default App;
