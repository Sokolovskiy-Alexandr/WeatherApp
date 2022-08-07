import React from "react";
import { Box, Typography, Grid } from "@mui/material";

type DetailsItemTypeProps = {
  title: string;
  value: string;
  icon: JSX.Element;
};
const DetailsItem: React.FC<DetailsItemTypeProps> = (props) => {
  const { title, value, icon } = props;
  return (
    <Grid
      container
      item
      borderRadius="10px"
      boxShadow="0px 5px 10px 2px #ece89f"
      marginBottom={2}
      marginRight={2}
      justifyContent="space-between"
      alignItems="center"
      height="80px"
      width="200px"
      padding={1}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body1" fontSize="1rem">
          {title}
        </Typography>
        <Typography component="h2" variant="body1" fontSize="1.5rem">
          {value}
        </Typography>
      </Box>
      <Box>{icon}</Box>
    </Grid>
  );
};

export default DetailsItem;
