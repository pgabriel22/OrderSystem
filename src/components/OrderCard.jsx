import React, { useEffect } from "react";

import "./OrderCard.css";
import {
  IconButton,
  Tooltip,
  Chip,
  TextField,
  Card,
  CardActions,
  CardContent,
  Box,
} from "@mui/material";
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
  formErrors,
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
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {isEditing === index ? (
          <>
            <TextField
              type="text"
              className="order_update_input"
              label="Enter Order"
              value={tempOrder.order || ""}
              onChange={(e) =>
                setTempOrder({ ...tempOrder, order: e.target.value })
              }
              sx={{ width: "100%", mb: 2 }}
              error={formErrors?.order?.error || false}
              helperText={formErrors?.order?.helperText || ""}
            />
            <p className="customer_text">Ordered By: {customer}</p>
            <p className="order_price">
              Total Price: ₱
              {isEditing === index ? tempOrder.totalPrice : totalPrice}
            </p>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tag
                tags={tagsData}
                selectTag={selectTag}
                selectedTags={tempOrder.tags}
              />
            </Box>
          </>
        ) : (
          <>
            <p className="order_text">{title}</p>
            <p className="customer_text">Ordered By: {customer}</p>
            <p className="order_price">Total Price: ₱{totalPrice}</p>
            <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
              {tags.map((tag, idx) => (
                <Tooltip key={idx} title={`₱${tag.price}`}>
                  <Chip label={tag.label} color="primary" sx={{ m: 0.5 }} />
                </Tooltip>
              ))}
            </Box>
          </>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        {isEditing === index ? (
          <>
            <Tooltip title="Save">
              <IconButton variant="contained" onClick={handleUpdate}>
                <Save />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton variant="contained" onClick={handleCancel}>
                <Cancel />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton variant="contained" onClick={() => handleEdit(index)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                variant="contained"
                onClick={() => handleDelete(index)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default OrderCard;
