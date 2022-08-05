import axios, { AxiosInstance } from "axios";

const openWeather: AxiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: process.env.REACT_APP_WEATHER_KEY,
  },
});

const forecastOptions = {
  params: {
    exclude: "current,minutely,daily,alerts",
  },
};

const api = {
  getWeather: async (cityName: string, units: string) =>
    openWeather.get(`weather?q=${cityName}&units=${units}`),
  getForecast: async (lat: number, lon: number, units: string) =>
    openWeather.get(`onecall?lat=${lat}&lon=${lon}&units=${units}`, forecastOptions),
  getCoordFromIp: async () =>
    axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEO_IP_KEY}`),
};
export default api;
