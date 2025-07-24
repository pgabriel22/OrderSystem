import React from "react";
import { Chip, Box } from "@mui/material";

import "./Tag.css";
import { TagRounded } from "@mui/icons-material";

const Tag = ({ tags, selectTag, selectedTags }) => {
  const isSelected = (tag) => selectedTags.some((t) => t.name === tag.name);
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {tags.map((tag) => (
        <Chip
          key={tag.name}
          label={tag.label}
          onClick={() => selectTag(tag)}
          color={isSelected(tag) ? "primary" : "default"}
          sx={{ cursor: "pointer" }}
        />
      ))}
    </Box>
  );
};

export default Tag;
