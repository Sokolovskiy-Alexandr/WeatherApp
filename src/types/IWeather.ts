export interface IWeather {
  id: number;
  lat: number;
  lon: number;
  name: string;
  feelsLike: number;
  humidity: number;
  pressure: number;
  temp: string;
  tempMax: number;
  tempMin: number;
  country: string;
  sunrise: number;
  sunset: number;
  windSpeed: number;
  detailsWeather: string;
  icon: string;
  refresh?: boolean;
}
