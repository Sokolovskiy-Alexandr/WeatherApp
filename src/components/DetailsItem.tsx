import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


type DetailsItemTypeProps = {
    discr: string;
    value?: string;
}
const DetailsItem: React.FC<DetailsItemTypeProps> = ({ discr, value }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, width: 180 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: 120 }}>
                <Typography component='h2' variant='button'>{discr}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component='h3' variant='body2' fontWeight='bold'>{value}</Typography>
            </Box>
        </Box>
    );
}

export default DetailsItem;
