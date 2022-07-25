import React from "react";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card/Card";
import { CardActionArea, CardActions, CardHeader, CardMedia, Paper } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import Grid from "@mui/material/Grid/Grid";
import { useNavigate } from "react-router-dom";


type WeatherCardPropsType = {
    id: number,
    name: string,
    country: string,
    detailsWeather: string,
    temp: string,
    icon: string,
    updateWeather: (cityName: string) => void,
    closeCard: (id: number) => void,
}

const WeatherCard: React.FC<WeatherCardPropsType> = (props) => {
    const { id, name, country, detailsWeather, updateWeather, closeCard, temp, icon } = props;
    const navigate = useNavigate();
    const units = useAppSelector(state => state.main.units);

    const deg = units === 'metric' ? '°C' : '°F';

    const redirect = (name: string)=> {
        navigate(`details/${name}`);

    }

    return (

            <Grid item container sx={{marginTop: 2, justifyContent: 'center'}} md={4}>
                <Card title={'Details info'} sx={{ width: 270, height: 250, backgroundColor: '#242324', color: 'var(--main-text-color)' }}>
                    <CardActionArea onClick={() => redirect(name)}>
                        <CardHeader sx={{ padding: 1, color: 'var(--main-text-color)', textAlign: 'center' }}
                                    title={`${name}, ${country}`}
                                    subheader={
                                        <Typography variant={'button'} sx={{ color: 'var(--main-text-color)', fontSize: '0.8rem' }}>
                                            {detailsWeather}
                                        </Typography>}
                        />

                        <Box component={'div'}
                             display={'flex'}
                             //justifyContent={'space-evenly'}
                             alignItems={'center'}
                             marginBottom={'10px'}
                        >

                            <Typography flexGrow={1} marginLeft={2} variant="subtitle2" sx={{ fontSize: '4rem' }}>{temp}{deg}</Typography>

                            <CardMedia sx={{ width: 120, height: 120 }}
                                       component='img'
                                       height='200'
                                       image={icon}
                                       alt='weather icon'
                            />
                        </Box>

                    </CardActionArea>
                    <CardActions sx={{ justifyContent: 'space-evenly', padding: 0 }}>
                        <Button title='Refresh' onClick={() => updateWeather(name)}
                                sx={{ height: 55, width: 130 }}>update
                        </Button>

                        <Button title='Close' onClick={() => closeCard(id)}
                                sx={{ height: 55, width: 130 }}>close
                        </Button>
                    </CardActions>
                </Card>
            </Grid>


    );
}

export default WeatherCard;
