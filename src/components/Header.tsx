import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/redux";
import Search from "./Search";


const OptionCssBtn = {
    fontSize: 10,
    width: 88,
    borderColor: 'var(--main-text-color)',
    color: 'var(--main-text-color)',
    ':hover': {
        color: 'var(--main-hover-color)',
        borderColor: 'var(--main-hover-color)'
    }
}

const Header: React.FC = () => {
    const { switchMetric, switchImperial } = useActions();
    const units = useAppSelector(state => state.main.units);
    const isOpenDetails = useAppSelector(state => state.main.isOpenDetails);
    
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'var(--header-bgcolor)' }} >
            <Toolbar>

                <Grid container justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'} minHeight={80}>

                    <Grid item container md={4} justifyContent={'center'} >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: 'var(--main-text-color)', letterSpacing: '5px'}}

                        >
                            WEATHER
                        </Typography>
                    </Grid>

                    <Grid item container md={4} justifyContent={'center'} alignItems={'center'} alignSelf={'flex-end'}>
                        {
                            !isOpenDetails && <Search/>
                        }
                    </Grid>

                    <Grid item container md={4} justifyContent={'center'} >
                        <Button variant="outlined"
                                sx={{
                                    backgroundColor: units === 'metric' ? 'var(--header-active-btn-bgcolor)' : '',

                                    marginRight: "2px",
                                    borderBottomLeftRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    ...OptionCssBtn
                                }} onClick={() => switchMetric()}>
                            Metric: °C</Button>
                        <Button variant="outlined"
                                sx={{
                                    backgroundColor: units === 'imperial' ? 'var(--header-active-btn-bgcolor)' : '',
                                    borderBottomRightRadius: '10px',
                                    borderTopRightRadius: '10px',
                                    ...OptionCssBtn
                                }} onClick={() => switchImperial()}>
                            Imperial: °F</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;


