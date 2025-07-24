import React, { useState, useEffect, useCallback } from "react";
import { Box, useMediaQuery } from "@mui/material";
import OrderForm from "../../shared/components/OrderForm.jsx";
import OrderColumn from "../../shared/components/OrderColumn";
import PaymentStatusColumn from "../../shared/components/PaymentStatusColumn";
import comboIcon from "../../assets/cash.png";
import singleIcon from "../../assets/gcash.png";
import Footer from "../../shared/components/Footer";
import AppNavBar from "../../shared/components/AppNavBar";

const getStoredOrders = () => {
  try {
    return JSON.parse(localStorage.getItem("order")) || [];
  } catch {
    return [];
  }
};

const Orders = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [order, setOrders] = useState(getStoredOrders);
  const [isEditing, setIsEditing] = useState(null);
  const [tempOrder, setTempOrder] = useState({});
  const [formErrors, setFormErrors] = useState({
    order: { error: false, helperText: "" },
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const handleDelete = useCallback(
    (orderIndex) => {
      setOrders((prevOrders) =>
        prevOrders.filter((_, index) => index !== orderIndex)
      );
    },
    [setOrders]
  );

  const handleEdit = useCallback(
    (orderIndex) => {
      setIsEditing(orderIndex);
      setTempOrder({ ...order[orderIndex] });
    },
    [order]
  );

  const handleStatusChange = useCallback(
    (index, newStatus) => {
      setOrders((prevOrders) => {
        const updatedOrders = [...prevOrders];
        updatedOrders[index].paymentStatus = newStatus;
        localStorage.setItem("order", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    },
    [setOrders]
  );

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleUpdate = () => {
    if (!tempOrder.order?.trim()) {
      setFormErrors({
        order: { error: true, helperText: "Order is required" },
      });
      return;
    }

    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[isEditing] = {
        ...tempOrder,
        paymentStatus: tempOrder.paymentStatus || "unpaid",
      };
      localStorage.setItem("order", JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    setIsEditing(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppNavBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: 4,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: { xs: "90%", sm: 800, md: 800 },
          }}
        >
          <OrderForm setOrders={setOrders} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              justifyContent: "center",
            }}
          >
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
              handleStatusChange={handleStatusChange}
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
              handleStatusChange={handleStatusChange}
            />
            <PaymentStatusColumn title="Payment Status" order={order} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Orders;
