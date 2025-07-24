import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AddCard } from "@mui/icons-material";
import Tag from "./Tag";

const paymentOptions = [
  { label: "Cash", value: "cash" },
  { label: "GCash", value: "gcash" },
];

const tags = [
  { name: "Combo129", label: "Combo 129", price: 129 },
  { name: "Single99", label: "Single 99", price: 99 },
  { name: "Vegetable", label: "Vegetable", price: 80 },
  { name: "ExtraRice", label: "Extra Rice", price: 15 },
];

const OrderForm = ({ setOrders }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [orderData, setOrderData] = useState({
    orderId: "",
    orderby: "",
    order: "",
    payment: "",
    tags: [],
    totalPrice: 0,
    paymentStatus: "unpaid",
  });

  const [formErrors, setFormErrors] = useState({
    orderby: { error: false, helperText: "" },
    order: { error: false, helperText: "" },
    payment: { error: false, helperText: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const selectTag = (tag) => {
    const existingTag = orderData.tags.some((t) => t.name === tag.name);
    const updatedTags = existingTag
      ? orderData.tags.filter((t) => t.name !== tag.name)
      : [...orderData.tags, tag];

    const priceChange = existingTag ? -tag.price : tag.price;

    setOrderData((prev) => ({
      ...prev,
      tags: updatedTags,
      totalPrice: prev.totalPrice + priceChange,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = { ...formErrors };

    if (!orderData.orderby.trim()) {
      errors.orderby = { error: true, helperText: "Customer Name is required" };
    } else {
      errors.orderby = { error: false, helperText: "" };
    }

    if (!orderData.order.trim()) {
      errors.order = { error: true, helperText: "Order is required" };
    } else {
      errors.order = { error: false, helperText: "" };
    }

    if (!orderData.payment.trim()) {
      errors.payment = { error: true, helperText: "Payment is required" };
    } else {
      errors.payment = { error: false, helperText: "" };
    }

    setFormErrors(errors);

    if (errors.orderby.error || errors.order.error || errors.payment.error) {
      return;
    }

    console.log("Order Submitted:", orderData);

    // const newOrder = {
    //   ...orderData,
    //   totalPrice: orderData.totalPrice,
    // };

    const newOrder = {
      id: Date.now(), // or crypto.randomUUID() if supported
      orderBy: orderData.orderby,
      dishId: orderData.order,
      price: orderData.totalPrice,
      paymentStatus: "unpaid",
    };
    
    setOrders((prev) => [...prev, newOrder]);

    setOrderData({
      orderby: "",
      order: "",
      payment: "",
      tags: [],
      totalPrice: 0,
      paymentStatus: "unpaid",
    });

    setFormErrors({
      orderby: { error: false, helperText: "" },
      order: { error: false, helperText: "" },
      payment: { error: false, helperText: "" },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: isMobile ? 1 : 2,
        padding: isMobile ? 2 : 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isMobile ? "100%" : "400px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          name="orderby"
          value={orderData.orderby}
          onChange={handleChange}
          label="Enter your name"
          error={formErrors.orderby.error}
          helperText={formErrors.orderby.helperText}
          fullWidth
        />
        <TextField
          name="order"
          value={orderData.order}
          label="Enter order"
          onChange={handleChange}
          error={formErrors.order.error}
          helperText={formErrors.order.helperText}
          fullWidth
        />

        <FormControl fullWidth error={formErrors.payment.error}>
          <InputLabel id="payment-select-label">Payment Method</InputLabel>
          <Select
            labelId="payment-select-label"
            id="payment-select"
            name="payment"
            value={orderData.payment}
            label="Payment Method"
            onChange={handleChange}
          >
            {paymentOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formErrors.payment.helperText}</FormHelperText>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 2,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Tag
            tags={tags}
            selectTag={selectTag}
            selectedTags={orderData.tags}
          />
        </Stack>

        <Button
          type="submit"
          startIcon={<AddCard />}
          variant="contained"
          sx={{
            marginTop: isMobile ? 2 : 0,
            width: isMobile ? "100%" : "auto",
          }}
        >
          + Add Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm;
