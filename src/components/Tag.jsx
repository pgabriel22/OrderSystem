import React from "react";

import "./Tag.css";

const Tag = ({ tagName, selectTag, selected, price }) => {
  const tagStyle = {
    Combo129: { backgroundColor: "#fda821" },
    Single99: { backgroundColor: "#15d4c8" },
    ExtraRice: { backgroundColor: "#ffd12c" },
    Soup: { backgroundColor: "#4cdafc" },
    default: { backgroundColor: "#f9f9f9" },
  };
  return (
    <button
      type="button"
      className="tag"
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag(tagName, price)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
