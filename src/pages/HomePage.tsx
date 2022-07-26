import React from "react";
import { Container } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import WeatherCards from "../components/WeatherCards";

const HomePage: React.FC = () => {
  const weatherData = useAppSelector((state) => state.main.weatherData);

  return (
    <Container maxWidth="lg">
      {weatherData.length === 0 ? <h1>Тестовое задание для Codica company</h1> : <WeatherCards />}
    </Container>
  );
};

export default HomePage;
