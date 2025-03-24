import React from "react";

import "./OrderCard.css";
import { IconButton, Tooltip, Chip, TextField } from "@mui/material";
import Tag from "./Tag";
import { Save, Edit, Cancel, Delete } from "@mui/icons-material";

const tagsData = [
  { name: "Combo129", label: "Combo 129", price: 129 },
  { name: "Single99", label: "Single 99", price: 99 },
  { name: "ExtraRice", label: "Extra Rice", price: 15 },
];

const OrderCard = ({
  title,
  customer,
  tags,
  totalPrice,
  handleDelete,
  index,
  handleEdit,
  handleUpdate,
  handleCancel,
  isEditing,
  tempOrder,
  setTempOrder,
}) => {
  const selectTag = (tag) => {
    const existingTag = tempOrder.tags.some((t) => t.name === tag.name);
    const updateTags = existingTag
      ? tempOrder.tags.filter((t) => t.name !== tag.name)
      : [...tempOrder.tags, tag];

    const priceChange = existingTag ? -tag.price : tag.price;

    setTempOrder((prev) => ({
      ...prev,
      tags: updateTags,
      totalPrice: prev.totalPrice + priceChange,
    }));
  };
  return (
    <article className="order_card">
      {isEditing === index ? (
        <div className="order_card_update">
          <TextField
            type="text"
            className="order_update_input"
            value={tempOrder.order}
            onChange={(e) =>
              setTempOrder({ ...tempOrder, order: e.target.value })
            }
          />
          <p className="customer_text">Ordered By: {customer}</p>
          <p className="order_price">
            Total Price: ₱
            {isEditing === index ? tempOrder.totalPrice : totalPrice}
          </p>
          <div className="order_card_bottom_line">
            <Tag
              tags={tagsData}
              selectTag={selectTag}
              selectedTags={tempOrder.tags}
            />
            <div className="order_ud">
              <IconButton variant="contained" onClick={handleUpdate}>
                <Save />
              </IconButton>
              <IconButton variant="contained" onClick={handleCancel}>
                <Cancel />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="order_text">{title}</p>
          <p className="customer_text">Ordered By: {customer}</p>
          <p className="order_price">Total Price: ₱{totalPrice}</p>

          <div className="order_card_bottom_line">
            <div className="order_card_tags">
              {tags.map((tag, idx) => (
                <Tooltip key={idx} title={`₱${tag.price}`}>
                  <Chip label={tag.label} color="primary" sx={{ m: 0.5 }} />
                </Tooltip>
              ))}
            </div>
            <div className="order_ud">
              <div className="order_edit" onClick={() => handleEdit(index)}>
                <Tooltip title="Edit">
                  <IconButton variant="contained">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="order_delete" onClick={() => handleDelete(index)}>
                <Tooltip title="Delete">
                  <IconButton variant="contained">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default OrderCard;
