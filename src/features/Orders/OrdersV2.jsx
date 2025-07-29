import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  ORDER_TYPES,
  ORDER_TYPES_LABELS,
  ORDER_TYPES_OPTIONS,
} from "../../constants/orderStatusConstants";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Footer from "../../shared/components/Footer";

const OrdersV2 = ({ mode, setMode }) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [orders, setOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusChange, setStatusChange] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // Fetching of Orders
  const fetchOrders = async () => {
    const date = selectedDate;
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
      id, created_at,  customer_name , 
      order_items(dish_id, quantity, unit_price, dishes (dishName)), 
      total_price, payment_status, order_status
    `
      )
      .gte("created_at", `${date}T00:00:00`)
      .lte("created_at", `${date}T23:59:59`);

    if (error) {
      console.error("Error fetching orders:", error.message);
    } else {
      console.log("Fetched orders:", data);
      const mapped = data.map((order) => ({
        ...order,
        customerName: order.customer_name ?? "Unnamed",
        items: (order.order_items || []).map((item) => ({
          dishName: item.dishes?.dishName ?? "Unknown Dish",
          quantity: item.quantity,
          price: item.unit_price,
        })),
        paymentStatus: order.payment_status ? "paid" : "unpaid",
      }));
      setOrders(mapped);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedDate]);

  // General Update Function
  const updateOrderField = async (orderId, updates) => {
    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update order:", error.message);
      return false;
    }

    await fetchOrders(); // Refresh UI after update
    return true;
  };

  // Payment Status Update
  const handleStatusChange = async (id, isPaid) => {
    const newStatus = !isPaid; // Toggle boolean
    const { error } = await supabase
      .from("orders")
      .update({ payment_status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Failed to update payment status:", error.message);
      setToast({
        open: true,
        message: "Failed to update payment status.",
        severity: "error",
      });
    } else {
      setToast({
        open: true,
        message: "Payment status updated.",
        severity: "success",
      });
      fetchOrders(); // Refresh data
    }
  };

  // Order Status Change
  const handleOrderStatusChange = async (orderId, newStatus) => {
    await updateOrderField(orderId, { order_status: newStatus });
  };

  // Cancel Order Function
  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmed) return;

    await updateOrderField(orderId, { order_status: ORDER_TYPES.CANCELLED });
  };

  // Update multiple orders
  const updateMultipleOrders = async (orderIds, updates) => {
    const { error } = await supabase
      .from("orders")
      .update(updates)
      .in("id", orderIds);

    if (error) {
      console.error("Failed to update multiple orders:", error.message);
      return false;
    }

    await fetchOrders(); // Refresh after bulk update
    return true;
  };

  // Multiple status change updater
  const handleBulkStatusChange = async () => {
    if (!statusChange || selectedRows.length === 0) return;

    const { error } = await supabase
      .from("orders")
      .update({ order_status: statusChange })
      .in("id", selectedRows);

    if (error) {
      setToast({
        open: true,
        message: "Failed to update status.",
        severity: "error",
      });
    } else {
      setToast({
        open: true,
        message: "Order statuses updated.",
        severity: "success",
      });
      fetchOrders(); // Refresh the list
      setSelectedRows([]);
      setStatusChange("");
    }
  };

  // Multiple Ordering Cancel
  const handleBulkCancel = async () => {
    if (selectedRows.length === 0) return;

    const { error } = await supabase
      .from("orders")
      .update({ order_status: ORDER_TYPES.CANCELLED })
      .in("id", selectedRows);

    if (error) {
      setToast({ open: true, message: "Cancel failed.", severity: "error" });
    } else {
      setToast({
        open: true,
        message: "Orders cancelled.",
        severity: "success",
      });
      fetchOrders();
      setSelectedRows([]);
    }
  };

  // Search Bar function
  const handleSearchOrder = (event) => {
    setSearchOrder(event.target.value);
  };

  // Payment Status Filter
  const handlePaymentFilter = (event) => {
    setPaymentFilter(event.target.value === "All" ? "" : event.target.value);
  };

  // Filtered Orders
  const filteredOrder = useMemo(() => {
    const term = searchOrder.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.customerName?.toLowerCase().includes(term) ||
        (Array.isArray(order.items) &&
          order.items.some((item) =>
            item.dishName?.toLowerCase().includes(term)
          ));

      const matchesPayment = paymentFilter
        ? order.paymentStatus === paymentFilter
        : true;

      return matchesSearch && matchesPayment;
    });
  }, [orders, searchOrder, paymentFilter]);

  // Download Summary in Notepad
  const handleExportSummary = () => {
    const summaryMap = {};
    let grandTotal = 0;

    orders.forEach((order) => {
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
    // {
    //   field: "ordereStatus",
    //   headerName: "Order Status",
    //   withd: 100,
    //   renderCell: (params) => {
    //     params.row.orderStatus;
    //   },
    // },
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
      renderCell: (params) => {
        const isPaid = params.row.paymentStatus === "paid";
        return (
          <Button
            size="small"
            onClick={() => handleStatusChange(params.row.id, isPaid)}
            disabled={
              params.row.order_status === ORDER_TYPES.DELIVERED ||
              params.row.order_status === ORDER_TYPES.CANCELLED
            }
          >
            Mark as {isPaid ? "Unpaid" : "Paid"}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
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

            <TextField
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusChange}
                  onChange={(e) => setStatusChange(e.target.value)}
                  label="Status"
                  disabled={selectedRows.length === 0}
                >
                  {ORDER_TYPES_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                onClick={handleBulkStatusChange}
                disabled={selectedRows.length === 0 || !statusChange}
              >
                Change Status
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleBulkCancel}
                disabled={selectedRows.length === 0}
              >
                Cancel Orders
              </Button>
            </Box>
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
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                rowSelectionModel={selectedRows}
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
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrdersV2;
