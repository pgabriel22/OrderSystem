import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Footer from "../../shared/components/Footer";
import AppNavBar from "../../shared/components/AppNavBar";

const getStoredOrders = () => {
  try {
    return JSON.parse(localStorage.getItem("order")) || [];
  } catch {
    return [];
  }
};

const OrdersV2 = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [order, setOrders] = useState(getStoredOrders);
  const [searchOrder, setSearchOrder] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const handleSearchOrder = (event) => {
    setSearchOrder(event.target.value);
  };

  const handlePaymentFilter = (event) => {
    setPaymentFilter(event.target.value === "All" ? "" : event.target.value);
  };

  const filteredOrder = order.filter((row) => {
    const matchesSearch =
      row.orderBy.toLowerCase().includes(searchOrder.toLowerCase()) ||
      row.dishId.toLowerCase().includes(searchOrder.toLowerCase());
    const matchesPaymentFilter = paymentFilter
      ? row.paymentStatus === paymentFilter
      : true;
    return matchesSearch && matchesPaymentFilter;
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const handleStatusChange = (id) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              paymentStatus:
                order.paymentStatus === "unpaid" ? "paid" : "unpaid",
            }
          : order
      );
      return updatedOrders;
    });
  };

  const orderColumns = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "orderBy", headerName: "Customer", width: 250 },
    { field: "dishId", headerName: "Order", width: 450 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) =>
        params.row.paymentStatus === "unpaid" ? "Unpaid" : "Paid",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button size="small" onClick={() => handleStatusChange(params.row.id)}>
          Mark as {params.row.paymentStatus === "unpaid" ? "Paid" : "Unpaid"}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppNavBar />

      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          pt: 4,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 64px - 80px)", // Adjust if AppBar/Footer height is different
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Order List Management
        </Typography>

        {/* Filter Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            width: "100%",
            maxWidth: 1200,
            mb: 2,
          }}
        >
          <TextField
            label="Search Order"
            value={searchOrder}
            onChange={handleSearchOrder}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="payment-status-label">Payment Status</InputLabel>
            <Select
              labelId="payment-status-label"
              label="Payment Status"
              value={paymentFilter}
              onChange={handlePaymentFilter}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Data Table Section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            height: 600, // Set fixed height for DataGrid
          }}
        >
          {filteredOrder.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No Orders Found
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={filteredOrder}
              columns={orderColumns}
              pageSize={25}
              pagination
              checkboxSelection
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default OrdersV2;
