/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "en",
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    toggleLanguage(state) {
      state.language = state.language === "en" ? "fr" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
