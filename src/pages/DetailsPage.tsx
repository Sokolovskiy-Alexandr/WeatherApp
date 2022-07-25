import React from "react";
import { Container, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import DetailsItem from "../components/DetailsItem";
import ChartApp from "../components/ChartApp";
import { fetchForecast } from "../redux/weatherSlice";
import Button from "@mui/material/Button";
import { useActions } from "../hooks/useActions";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"


const DetailsPage: React.FC = () => {
    const { cityName } = useParams();
    const {isOpenDetails} = useActions();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const data = useAppSelector(state => state.main.weatherData.find(w => w.name === cityName));
    const units = useAppSelector(state => state.main.units);
    const hourly = useAppSelector(state => state.main?.forecast?.hourly);

    const speed = units === 'metric' ? 'm/s' : 'mph';
    const deg = units === 'metric' ? '°C' : '°F';
    const press = units === 'metric' ? 'mmHg' : 'hPa';

    const goBack = () => navigate(-1);

    React.useEffect(() => {
        if (data) {
            dispatch(fetchForecast({ lat: data.lat, lon: data.lon }));
        }
        isOpenDetails(true);
        return () => {
            isOpenDetails(false);
        }
    }, [units]);

    return (
        <Container maxWidth={'lg'}>
            {/*sx={{bgcolor: '#5463'}}*/}
            <Paper sx={{bgcolor: 'var(--details-bgcolor)'}}>
                <Box sx={{ marginTop: 1, paddingTop: 2 }}>
                    <Typography component='h2' variant='button' align='center' fontWeight='bold' fontSize='1rem'>
                        Details weather information
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 2 }}>

                        <Box sx={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: 300
                        }}>
                            <DetailsItem discr='Current temp:' value={`${data?.temp}${deg}`}/>
                            <DetailsItem discr='Min temp:' value={`${data?.temp_min}${deg}`}/>
                            <DetailsItem discr='Max temp:' value={`${data?.temp_max}${deg}`}/>
                            <DetailsItem discr='Feels like:' value={`${data?.feels_like}${deg}`}/>
                            <DetailsItem discr='Pressure:' value={`${units === 'metric'
                                ? Math.round((data?.pressure ?? 1) * 0.75)
                                : data?.pressure}${press}`}/>
                            <DetailsItem discr='Humidity:' value={`${data?.humidity}%`}/>
                            <DetailsItem discr='Wind:' value={`${data?.wind_speed}${speed}`}/>
                            <DetailsItem discr='Sunrise:' value={`${data?.sunrise}`}/>
                            <DetailsItem discr='Sunset:' value={`${data?.sunset}`}/>
                        </Box>

                        <Box sx={{
                            display: 'inline-flex', flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography component='h3' variant='button' align={'center'}>
                                {data?.name}, {data?.country}
                            </Typography>
                            <Typography align='center'>
                                <Box component='img' alt="Weather icon" src={data?.icon}/>
                            </Typography>
                            <Typography component='h3' variant='button' align='center'>
                                {data?.detailsWeather}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ padding: 1, height: "200px", width: '100%' }}>
                        <ChartApp hourly={hourly}/>
                    </Box>
                    <Box sx={{ padding: 1 }}>
                        <Button sx={{ width: '100%', color: '#0A578BFF' }} onClick={goBack} startIcon={<ArrowLeftIcon/>}>
                             Go Back
                        </Button>
                    </Box>
                </Box>
            </Paper>

        </Container>
    );
}

export default DetailsPage;
