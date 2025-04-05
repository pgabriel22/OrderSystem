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
import Footer from "../components/Footer";
import AppNavBar from "../components/AppNavBar";

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
  const [searchOrder, setSearchOrder] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const handleSearchOrder = (event) => {
    setSearchOrder(event.target.value);
  };

  const handlePaymentFilter = (event) => {
    setPaymentFilter(event.target.value === 'All' ? '' : event.target.value); // Empty string for 'All'
  };

  const filteredOrder = order.filter((row) => {
    const matchesSearch = row.orderBy.toLowerCase().includes(searchOrder.toLowerCase()) ||
                          row.dishId.toLowerCase().includes(searchOrder.toLowerCase());
    const matchesPaymentFilter = paymentFilter ? row.paymentStatus === paymentFilter : true;

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
      renderCell: (params) => {
        return params.row.paymentStatus === "unpaid" ? "Unpaid" : "Paid";
      },
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
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: 4,
          px: 2,
        }}
      >
        <Box>
          <Typography>Order List Management</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
            gap={2}
            padding={1}
            margin={1}
          >
            <TextField label="Search Order" value={searchOrder} onChange={handleSearchOrder} />
            <FormControl fullWidth>
              <InputLabel id="payment-status-label">Payment Status</InputLabel>
              <Select
                labelId="payment-status-label"
                id="payment-status-label"
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {/* Conditionally render No Data message */}
          {filteredOrder.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300, // Adjust height as needed
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
      <Footer />
    </Box>
  );
};

export default OrdersV2;
