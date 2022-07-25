import { IHour } from "./IHour";

export interface IForecast {
    timezone: string;
    hourly: IHour[]
}