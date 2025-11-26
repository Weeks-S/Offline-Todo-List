// features/weather/weatherSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherRequest(
      state,
      _action: PayloadAction<{ lat: number; lon: number }>
    ) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;
export default weatherSlice.reducer;
