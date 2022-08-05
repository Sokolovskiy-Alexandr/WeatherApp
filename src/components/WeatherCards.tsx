import React from "react";
import Grid from "@mui/material/Grid/Grid";
import useActions from "../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchWeather } from "../redux/weatherSlice";
import WeatherCard from "./WeatherCard";

const WeatherCards: React.FC = () => {
  const { removeWeather } = useActions();
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.main.weatherData);

  const closeCard = (id: number): void => {
    removeWeather(id);
  };

  const updateWeather = (cityName: string): void => {
    dispatch(fetchWeather(cityName));
  };

  return (
    <Grid container justifyContent="space-evenly" maxWidth="lg">
      {weatherData.map((w) => (
        <WeatherCard
          key={w.id}
          id={w.id}
          name={w.name}
          country={w.country}
          detailsWeather={w.detailsWeather}
          temp={w.temp}
          icon={w.icon}
          feelsLike={w.feelsLike}
          closeCard={closeCard}
          updateWeather={updateWeather}
          refresh={w.refresh}
        />
      ))}
    </Grid>
  );
};

export default WeatherCards;
