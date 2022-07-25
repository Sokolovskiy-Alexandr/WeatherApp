import React from "react";
import { useActions } from "../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchWeather } from "../redux/weatherSlice";
import WeatherCard from "./WeatherCard";
import Grid from "@mui/material/Grid/Grid";


const WeatherCards: React.FC = () => {
    const { removeWeather } = useActions();
    const dispatch = useAppDispatch();
    const weatherData = useAppSelector(state => state.main.weatherData);

    const closeCard = (id: number) => {
        removeWeather(id);
    }

    const updateWeather = (cityName: string): void => {
        dispatch(fetchWeather(cityName));
    }

    return (
        <Grid container justifyContent={'space-evenly'}>
            {
                weatherData.map(w => (
                    <WeatherCard key={w.id} id={w.id} name={w.name} country={w.country}
                                 detailsWeather={w.detailsWeather} temp={w.temp}
                                 icon={w.icon} closeCard={closeCard}
                                 updateWeather={updateWeather}/>
                ))
            }
        </Grid>
    );
};

export default WeatherCards;
