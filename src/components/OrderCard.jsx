import React from "react";

import "./OrderCard.css";
import { Button, IconButton, Tooltip } from "@mui/material";
import Tag from "./Tag";
import { Save, Edit, Cancel, Delete } from "@mui/icons-material";

const getAllTags = () => ["Combo129", "Single99", "ExtraRice", "Soup"];

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
  return (
    <article className="order_card">
      {isEditing === index ? (
        <div className="order_card_update">
          <input
            type="text"
            className="order_update_input"
            value={tempOrder.order}
            onChange={(e) =>
              setTempOrder({ ...tempOrder, order: e.target.value })
            }
          />
          <p className="customer_text">Ordered By: {customer}</p>
          <div className="order_card_bottom_line">
            <div className="order_card_tags">
              {getAllTags().map((tag) => (
                <Tag
                  key={tag}
                  tagName={tag}
                  selectTag={() => {
                    const updatedTags = tempOrder.tags.includes(tag)
                      ? tempOrder.tags.filter((t) => t !== tag)
                      : [...tempOrder.tags, tag];
                    setTempOrder({ ...tempOrder, tags: updatedTags });
                  }}
                  selected={tempOrder.tags.includes(tag)}
                />
              ))}
            </div>
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
          <p className="order_price">Total Price: {totalPrice}</p>

          <div className="order_card_bottom_line">
            <div className="order_card_tags">
              {tags.map((tag, idx) => (
                <Tag key={idx} tagName={tag.name} selected />
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
    // <article className="order_card">
    //   <p className="order_text">{title}</p>
    //   <p className="customer_text">Ordered By: {customer}</p>

    //   <div className="order_card_bottom_line">
    //     <div className="order_card_tags">
    //       {tags.map((tag, index) => (
    //         <Tag key={index} tagName={tag} selected />
    //       ))}
    //     </div>
    //     <div className="order_ud">
    //       <div className="order_edit">
    //         <img src={editIcon} className="edit_icon" alt="Edit" />
    //       </div>
    //       <div className="order_delete" onClick={() => handleDelete(index)}>
    //         <img src={deleteIcon} className="delete_icon" alt="Delete" />
    //       </div>
    //     </div>
    //   </div>
    // </article>
  );
};

export default OrderCard;
