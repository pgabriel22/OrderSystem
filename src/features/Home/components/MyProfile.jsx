import React from "react";
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";

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
          mt: 18,
          gap: 4,
          px: 2,
        }}
      >
        <Typography variant="h5">My Profile</Typography>

        <Box>
          <TextField label="Email"></TextField>
          <TextField label="Fullname"></TextField>
        </Box>
      </Box>
    </>
  );
};

export default MyProfile;
