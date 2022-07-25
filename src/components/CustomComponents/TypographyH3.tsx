import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


type TypographyH3Type = {
    children: React.ReactNode
}
export const TypographyH3: React.FC<TypographyH3Type> = ({ children, ...props }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Typography component='h3' variant='body2'  {...props}>{children}</Typography>
        </Box>
    )
}