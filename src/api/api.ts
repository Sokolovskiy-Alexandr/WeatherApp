import axios, { AxiosInstance } from "axios";

const openWeather: AxiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: process.env.REACT_APP_WEATHER_KEY,
  },
});

/* const geoDB: AxiosInstance = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/',
    headers: {
        'X-RapidAPI-Key': 'b1eaaa28c6mshfa71e4a8dbb3bf3p12ec11jsn11ad23784848',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
}); */

const forecastOptions = {
  params: {
    exclude: "current,minutely,daily,alerts",
  },
};

const api = {
  /* getCoord: async (searchCity: string) => {
        const coord = await geoDB.get(`cities?namePrefix=${searchCity}`);
        console.log(coord)
    }, */
  getWeather: async (cityName: string, units: string) =>
    openWeather.get(`weather?q=${cityName}&units=${units}`),
  getForecast: async (lat: number, lon: number, units: string) =>
    openWeather.get(`onecall?lat=${lat}&lon=${lon}&units=${units}`, forecastOptions),
  getCoordFromIp: async () =>
    axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEO_IP_KEY}`),
};
export default api;
