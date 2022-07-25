export interface IWeather {
    id: number;
    lat: number;
    lon: number;
    name: string;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: string;
    temp_max: number;
    temp_min: number;
    country: string;
    sunrise: number;
    sunset: number;
   // visibility: number;
    wind_speed: number;
    detailsWeather: string;
    icon: string;
}