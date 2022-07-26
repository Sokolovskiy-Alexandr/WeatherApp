import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Preloader: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress sx={{ color: "var(--main-text-color)" }} />
    </Box>
  );
};

export default Preloader;
