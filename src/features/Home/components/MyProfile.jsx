import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const MyProfile = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          // maxHeight: "50vh",
          mt: 13,
          gap: 4,
          px: 2,
        }}
      >
        <Typography variant="h5">My Profile</Typography>
      </Box>
    </>
  );
};

export default MyProfile;
