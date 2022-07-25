import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


type TypographyH2Type = {
    children: React.ReactNode
}
export const TypographyH2: React.FC<TypographyH2Type> = (
    { children, ...props }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexBasis: 120}}>
        <Typography component='h2' variant='button' {...props}>{children}</Typography>
        </Box>
    )
}