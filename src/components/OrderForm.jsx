import React, { useState } from "react";

import "./OrderForm.css";
import Tag from "./Tag";
import Chef from "../assets/chef.jpg";
import { Box, Button, TextField } from "@mui/material";
import { AddCard } from "@mui/icons-material";

const OrderForm = ({ setOrders }) => {
  const [orderData, setOrderData] = useState({
    orderby: "",
    order: "",
    payment: "",
    tags: [],
    totalPrice: 0,
  });

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const checkTag = (tag) => {
    return orderData.tags.some((item) => item === tag);
  };

  const selectTag = (tag, price) => {
    if (orderData.tags.some((item) => item.name === tag)) {
      const filterTags = orderData.tags.filter((item) => item.name !== tag);
      const newTotalPrice = filterTags.reduce((sum, t) => sum + t.price, 0);
      setOrderData((prev) => {
        return { ...prev, tags: filterTags, totalPrice: newTotalPrice };
      });
    } else {
      const newTags = [...orderData.tags, { name: tag, price }];
      const newTotalPrice = newTags.reduce((sum, t) => sum + t.price, 0);

      setOrderData((prev) => ({
        ...prev,
        tags: newTags,
        totalPrice: newTotalPrice,
      }));
      // setOrderData((prev) => {
      //   return { ...prev, tags: [...prev, tags, tag] };
      // });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrderData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !orderData.order.trim() ||
      !orderData.orderby.trim() ||
      orderData.tags.length === 0
    ) {
      alert("Please select at least one tag.");
      setError(true);
      setHelperText("This field is required.");
      return;
    }
    console.log("Order Submitted:", orderData);
    setOrders((prev) => {
      setError(false);
      setHelperText("");
      return [...prev, orderData];
    });
    setOrderData({
      orderby: "",
      order: "",
      payment: "",
      tags: [],
      totalPrice: 0,
    });
  };

  return (
    <header className="app_header">
      <div className="logo-container">
        <img src={Chef} alt="Logo" className="logo" />
        <h1>Y Kitchen</h1>
      </div>
      <Box component="form" onSubmit={handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
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
            size="small"
            error={error}
            helperText={helperText}
          />
          <TextField
            name="order"
            value={orderData.order}
            className="order_input"
            label="Enter order"
            onChange={handleChange}
            size="small"
            error={error}
            helperText={helperText}
          />
        </Box>
        <div className="order_form_bottom_line">
          <div>
            <Tag
              tagName="Combo129"
              selectTag={selectTag}
              // selected={checkTag("Combo129")}
              selected={orderData.tags.some((item) => item.name === "Combo129")}
              price={129}
            />
            <Tag
              tagName="Single99"
              selectTag={selectTag}
              // selected={checkTag("Single99")}
              selected={orderData.tags.some((item) => item.name === "Single99")}
              price={99}
            />
            <Tag
              tagName="ExtraRice"
              selectTag={selectTag}
              // selected={checkTag("ExtraRice")}
              selected={orderData.tags.some(
                (item) => item.name === "ExtraRice"
              )}
              price={15}
            />
            <Tag
              tagName="Soup"
              selectTag={selectTag}
              // selected={checkTag("Soup")}
              selected={orderData.tags.some((item) => item.name === "Soup")}
              price={0}
            />
          </div>

          <div>
            <select
              name="payment"
              className="payment"
              value={orderData.payment}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select Payment Method
              </option>
              <option value="cash">Cash</option>
              <option value="gcash">Gcash</option>
              <option value="bank">Bank Transfer</option>
            </select>
            <Button
              type="submit"
              className="order_submit"
              startIcon={<AddCard />}
              variant="contained"
            >
              + Add Order
            </Button>
          </div>
        </div>
        {/* </form> */}
      </Box>
    </header>
  );
};

export default OrderForm;
