import React from "react";

import "./OrderCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const OrderCard = ({ title, tags, handleDelete, index }) => {
  return (
    <article className="order_card">
      <p className="order_text">{title}</p>

      <div className="order_card_bottom_line">
        <div className="order_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="order_delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete_icon" alt="Delete" />
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
