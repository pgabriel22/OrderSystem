import React, { useState } from "react";

import "./OrderForm.css";
import Tag from "./Tag";
import Chef from "../assets/chef.jpg";
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
} from "@mui/material";
import { AddCard } from "@mui/icons-material";

const paymentOptions = [
  { label: "Cash", value: "cash" },
  { label: "GCash", value: "gcash" },
  { label: "Bank Transfer", value: "bank" },
];

const tags = [
  { name: "Combo129", label: "Combo 129", price: 129 },
  { name: "Single99", label: "Single 99", price: 99 },
  { name: "Vegetable", label: "Vegetable", price: 80 },
  { name: "ExtraRice", label: "Extra Rice", price: 15 },
];

const OrderForm = ({ setOrders }) => {
  const [orderData, setOrderData] = useState({
    orderby: "",
    order: "",
    payment: "",
    tags: [],
    totalPrice: 0,
  });

  const [helperText] = useState("");

  const [formErrors, setFormErrors] = useState({
    orderby: { error: false, helperText: "" },
    order: { error: false, helperText: "" },
    payment: { error: false, helperText: "" },
    orderTags: { error: false, helperText: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrderData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const selectTag = (tag) => {
    const existingTag = orderData.tags.some((t) => t.name === tag.name);

    const updateTags = existingTag
      ? orderData.tags.filter((t) => t.name !== tag.name)
      : [...orderData.tags, tag];

    const priceChange = existingTag ? -tag.price : tag.price;

    setOrderData((prev) => ({
      ...prev,
      tags: updateTags,
      totalPrice: prev.totalPrice + priceChange,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = { ...formErrors };

    if (!orderData.orderby.trim()) {
      errors.orderby = {
        error: true,
        helperText: "Customer Name is required",
      };
    } else {
      errors.orderby = { error: false, helperText: "" };
    }

    if (!orderData.order.trim()) {
      errors.order = {
        error: true,
        helperText: "Order is required",
      };
    } else {
      errors.order = { error: false, helperText: "" };
    }

    if (!orderData.payment.trim()) {
      errors.payment = {
        error: true,
        helperText: "Payment is required",
      };
    } else {
      errors.payment = { error: false, helperText: "" };
    }

    setFormErrors(errors);

    if (errors.orderby.error || errors.order.error || errors.payment.error) {
      return;
    }
    console.log("Order Submitted:", orderData);

    const newOrder = {
      ...orderData,
      totalPrice: orderData.totalPrice,
    };

    setOrders((prev) => {
      return [...prev, newOrder];
    });

    setOrderData({
      orderby: "",
      order: "",
      payment: "",
      tags: [],
      totalPrice: 0,
    });

    setFormErrors({
      orderby: { error: false, helperText: "" },
      order: { error: false, helperText: "" },
      payment: { error: false, helperText: "" },
    });
  };

  return (
    <header className="app_header">
      <div className="logo-container">
        <img src={Chef} alt="Logo" className="logo" />
        <h1>Y Kitchen</h1>
      </div>
      <Box component="form" onSubmit={handleSubmit} sx={{ margin: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          gap={2}
          padding={1}
          margin={1}
        >
          <TextField
            name="orderby"
            value={orderData.orderby}
            onChange={handleChange}
            className="order_input"
            label="Enter your name"
            error={formErrors.orderby.error}
            helperText={formErrors.orderby.helperText}
          />
          <TextField
            name="order"
            value={orderData.order}
            className="order_input"
            label="Enter order"
            onChange={handleChange}
            error={formErrors.order.error}
            helperText={formErrors.order.helperText}
          />

          <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth error={formErrors.payment.error}>
              <InputLabel id="payment-select-label">Payment Method</InputLabel>
              <Select
                labelId="payment-select-label"
                id="payment-select"
                name="payment"
                value={orderData.payment}
                label="Payment Method"
                onChange={handleChange}
                helperText={helperText}
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
          }}
          gap={2}
        >
          <Stack direction="row" spacing={1}>
            <Tag
              tags={tags}
              selectTag={selectTag}
              selectedTags={orderData.tags}
            />
          </Stack>
          <Button
            type="submit"
            className="order_submit"
            startIcon={<AddCard />}
            variant="contained"
            sx={{ justifyContent: "flex-end" }}
          >
            + Add Order
          </Button>
        </Box>
      </Box>
    </header>
  );
};

export default OrderForm;
