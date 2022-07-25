import { DateTime } from "luxon";


const formatTemp = (temp: number): string => {
    return temp > 0 ? `${Math.round(temp)}` : `-${Math.round(temp)}`;
}

const getUrlIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export const formatWeatherData = (data: any) => {
    const {
        coord: { lon, lat },
        name, id,
        main: { humidity, pressure },
        sys: { country },
        weather, wind: { speed: wind_speed }
    } = data.data;

    let { feels_like, temp, temp_max, temp_min } = data.data.main;

    feels_like = formatTemp(feels_like);
    temp = formatTemp(temp);
    temp_max = formatTemp(temp_max);
    temp_min = formatTemp(temp_min);

    let { sunrise, sunset } = data.data.sys;
    sunrise = DateTime.fromSeconds(sunrise).toFormat('HH:MM');
    sunset = DateTime.fromSeconds(sunset).toFormat('HH:MM');

    let { description: detailsWeather, icon } = weather[0];

    icon = getUrlIcon(icon);

    return {
        id,
        lon,
        lat,
        name,
        country,
        detailsWeather,
        temp,
        feels_like,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        humidity,
        pressure,
        wind_speed,
        icon
    }
};

const formatToLocalTime = (secs: number, timezone: string) => {
    return DateTime.fromSeconds(secs).setZone(timezone).toFormat("HH:MM dd, LLL");
};

export const formatForecastData = (data: any) => {
    let { timezone, hourly } = data.data;
    hourly = hourly
        .filter((_: any, i: number) => i % 2 === 0)
        .splice(1, 8).map((h: any) => {
            return {
                temp: Math.round(h.temp),
                title: formatToLocalTime(h.dt, h.timezone)
            }
        });
    return { timezone, hourly }
};


