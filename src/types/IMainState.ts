import { IForecast } from "./IForecast";
import { IWeather } from "./IWeather";

export interface IMainState {
  isLoading: boolean;
  isOpenDetails: boolean;
  error: any;
  units: "metric" | "imperial";
  cityName: string;
  weatherData: IWeather[];
  forecast: null | IForecast;
}
