/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    locale: "ENGLISH",
  },
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = settingsSlice.actions;

export default settingsSlice.reducer;
