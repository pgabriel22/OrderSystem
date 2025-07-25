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
    const raw = JSON.parse(localStorage.getItem("orders")) || [];
    // console.log("Raw localStorage data:", raw); //

    if (!Array.isArray(raw)) return [];

    return raw.map((order) => ({
      ...order,
      paymentStatus: order.paymentStatus || "unpaid",
      items: Array.isArray(order.items) ? order.items : [],
    }));
  } catch (err) {
    console.error("Failed to parse orders:", err);
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
      row.customerName?.toLowerCase().includes(searchOrder.toLowerCase()) ||
      row.items?.some((item) =>
        row.dishName?.toLowerCase().includes(searchOrder.toLowerCase())
      );
    const matchesPaymentFilter = paymentFilter
      ? row.paymentStatus === paymentFilter
      : true;
    return matchesSearch && matchesPaymentFilter;
  });

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

  const handleExportSummary = () => {
    const summaryMap = {};
    let grandTotal = 0;

    order.forEach((order) => {
      (order.items || []).forEach((item) => {
        const name = item.dishName || "Unnamed Dish";
        const qty = parseInt(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;

        summaryMap[name] = (summaryMap[name] || 0) + qty;
        grandTotal += qty * price;
      });
    });

    const lines = Object.entries(summaryMap)
      .map(([dish, count]) => `${dish} - ${count}`)
      .join("\n");

    const content = `${lines}\n\nGrand Total: ₱${grandTotal.toFixed(2)}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "order_summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const orderColumns = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "customerName", headerName: "Customer", width: 250 },
    {
      field: "items",
      headerName: "Order",
      width: 450,
      renderCell: (params) =>
        Array.isArray(params.row.items)
          ? params.row.items
              .map((item) => `${item.dishName} x${item.quantity}`)
              .join(", ")
          : "No items",
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        const total = (params.row.items || []).reduce((sum, item) => {
          const price = parseFloat(item.price || 0);
          const qty = parseInt(item.quantity || 0);
          return sum + price * qty;
        }, 0);
        return `₱${total.toFixed(2)}`;
      },
    },
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
          pt: 16,
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

        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: 1200,
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={handleExportSummary}>
            Export Order Summary
          </Button>
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
