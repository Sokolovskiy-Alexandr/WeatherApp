import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./weatherSlice";

export const store = configureStore({
    reducer: {
        main: weatherSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;