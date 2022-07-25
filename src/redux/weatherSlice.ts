import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { formatForecastData, formatWeatherData } from "../services/utils";
import { IForecast } from "../types/IForecast";
import { IForecastRequest } from "../types/IForecastRequest";
import { IMainState } from "../types/IMainState";
import { IWeather } from "../types/IWeather";
import { RootState } from "./store";


//const METRIC = 'metric';
//const IMPERIAL = 'imperial';

export const fetchWeather = createAsyncThunk<IWeather, string, { rejectValue: string, state: RootState }>(
    'weather/fetchWeather',
    async (cityName, { rejectWithValue, getState }) => {
        const units = getState().main.units;
        try {
            const response = await api.getWeather(cityName, units);
            const item = await formatWeatherData(response);
            return item as IWeather
        } catch (error: any) {
            if (!error.response) {
                throw new Error('FetchWeather some error');
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchForecast = createAsyncThunk<IForecast, IForecastRequest, { rejectValue: string, state: RootState }>(
    'weather/fetchForecast',
    async (coord, { rejectWithValue, getState }) => {
        const units = getState().main.units;
        try {
            const { lat, lon } = coord;
            const response = await api.getForecast(lat, lon, units);
            const item = await formatForecastData(response);
            return item as IForecast
        } catch (error: any) {
            if (!error.response) {
                throw new Error('FetchForecast some error');
            }
            return rejectWithValue(error.response.data);
        }
    }
);


const weatherSlice = createSlice({
        name: 'weather',
        initialState: {
            isLoading: false,
            isOpenDetails: false,
            error: null,
            units: 'metric',
            cityName: '',
            weatherData: [],
            forecast: null
        } as IMainState,

        reducers: {
            removeWeather: (state, action) => {
                state.weatherData = state.weatherData.filter(w => w.id !== action.payload);
            },
            switchMetric: (state) => {
                state.units = 'metric';
            },
            switchImperial: (state) => {
                state.units = 'imperial';
            },
            setCityName: (state, action) => {
                state.cityName = action.payload;
            },
            isOpenDetails: (state,action) => {
                state.isOpenDetails = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchWeather.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchWeather.fulfilled, (state, action) => {
                    const res = state.weatherData.some(w => w.name === action.payload.name);
                    if (res) {
                        state.weatherData = state.weatherData.map(w => {
                            if (w.name === action.payload.name) {
                                w = action.payload
                            }
                            return w;
                        });
                    } else {
                        state.weatherData.push(action.payload);
                    }
                    state.isLoading = false;
                    state.error = null;
                    state.cityName = '';
                })
                .addCase(fetchWeather.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                .addCase(fetchForecast.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchForecast.fulfilled, (state, action) => {
                    state.forecast = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchForecast.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })

        }

    }
)

//export const { removeWeather } = weatherSlice.actions;
export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;

