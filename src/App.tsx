import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchWeather } from "./redux/weatherSlice";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.main.units);
  const weatherData = useAppSelector((state) => state.main.weatherData);

  useEffect(() => {
    weatherData.forEach((w) => dispatch(fetchWeather(w.name)));
  }, [units]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="details/:cityName" element={<DetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
