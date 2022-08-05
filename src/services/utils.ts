import { DateTime } from "luxon";

const formatTemp = (temp: number): string =>
  temp > 0 ? `${Math.round(temp)}` : `-${Math.round(temp)}`;

const getUrlIcon = (iconCode: string): string =>
  `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

export const formatWeatherData = (data: any) => {
  const {
    coord: { lon, lat },
    name,
    id,
    main: { humidity, pressure },
    sys: { country },
    weather,
    wind: { speed: windSpeed },
  } = data.data;

  let { feels_like: feelsLike, temp, temp_max: tempMax, temp_min: tempMin } = data.data.main;

  feelsLike = formatTemp(feelsLike);
  temp = formatTemp(temp);
  tempMax = formatTemp(tempMax);
  tempMin = formatTemp(tempMin);

  let { sunrise, sunset } = data.data.sys;
  sunrise = DateTime.fromSeconds(sunrise).toFormat("HH:MM");
  sunset = DateTime.fromSeconds(sunset).toFormat("HH:MM");

  let { icon } = weather[0];
  icon = getUrlIcon(icon);

  const { description: detailsWeather } = weather[0];
  return {
    id,
    lon,
    lat,
    name,
    country,
    detailsWeather,
    temp,
    feelsLike,
    tempMin,
    tempMax,
    sunrise,
    sunset,
    humidity,
    pressure,
    windSpeed,
    icon,
  };
};

const formatToLocalTime = (secs: number, timezone: string) =>
  DateTime.fromSeconds(secs).setZone(timezone).toFormat("HH:MM dd, LLL");

export const formatForecastData = (data: any) => {
  let { timezone, hourly } = data.data;
  hourly = hourly
    .filter((_: any, i: number) => i % 2 === 0)
    .splice(1, 6)
    .map((h: any) => ({
      temp: Math.round(h.temp),
      title: formatToLocalTime(h.dt, h.timezone),
    }));
  return { timezone, hourly };
};
