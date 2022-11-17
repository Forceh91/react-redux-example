import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface WeatherState {
  temp: number;
  wind: number;
}

const initialState: WeatherState = {
  temp: 0,
  wind: 0,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    incrementTemp: (state) => {
      // redux toolkit lets us write "mutating" logic in reducers
      state.temp += 1;
    },

    decrementTemp: (state) => {
      state.temp -= 1;
    },

    incrementWind: (state) => {
      state.wind += 1;
    },

    decrementWind: (state) => {
      if (state.wind) state.wind -= 1;
    },

    incrementTempByAmount: (state, action: PayloadAction<number>) => {
      state.temp += action.payload;
    },

    decrementTempByAmount: (state, action: PayloadAction<number>) => {
      state.temp -= action.payload;
    },

    incrementWindByAmount: (state, action: PayloadAction<number>) => {
      state.wind += action.payload;
      if (state.wind < 0) state.wind = 0;
    },

    decrementWindByAmount: (state, action: PayloadAction<number>) => {
      state.wind -= action.payload;
    },
  },
});

export const {
  incrementTemp,
  decrementTemp,
  incrementTempByAmount,
  incrementWind,
  decrementWind,
  incrementWindByAmount,
} = weatherSlice.actions;

// this is a selector and allows us to select a value from the state
export const selectTemp = (state: RootState) => state.weather.temp;
export const selectWind = (state: RootState) => state.weather.wind;

export default weatherSlice.reducer;
