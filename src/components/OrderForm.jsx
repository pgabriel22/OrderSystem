import React, { useState } from "react";

import "./OrderForm.css";
import Tag from "./Tag";
import Chef from "../assets/chef.jpg";

const OrderForm = ({ setOrders }) => {
  const [orderData, setOrderData] = useState({
    orderby: "",
    order: "",
    payment: "",
    tags: [],
  });

  const checkTag = (tag) => {
    return orderData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (orderData.tags.some((item) => item === tag)) {
      const filterTags = orderData.tags.filter((item) => item !== tag);
      setOrderData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setOrderData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
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

    if (orderData.tags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    // console.log("Order Submitted:", orderData);
    setOrders((prev) => {
      return [...prev, orderData];
    });
    setOrderData({
      orderby: "",
      order: "",
      payment: "",
      tags: [],
    });
  };

  return (
    <header className="app_header">
      <div className="logo-container">
        <img src={Chef} alt="Logo" className="logo" />
        <h1>Y Kitchen</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="orderby"
          type="text"
          value={orderData.orderby}
          className="order_input"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        ></input>
        <input
          name="order"
          type="text"
          value={orderData.order}
          className="order_input"
          placeholder="Enter order"
          onChange={handleChange}
          required
        ></input>
        <div className="order_form_bottom_line">
          <div>
            <Tag
              tagName="Combo129"
              selectTag={selectTag}
              selected={checkTag("Combo129")}
            />
            <Tag
              tagName="Single99"
              selectTag={selectTag}
              selected={checkTag("Single99")}
            />
            <Tag
              tagName="ExtraRice"
              selectTag={selectTag}
              selected={checkTag("ExtraRice")}
            />
            <Tag
              tagName="Soup"
              selectTag={selectTag}
              selected={checkTag("Soup")}
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
            <button type="submit" className="order_submit">
              + Add Order
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default OrderForm;
