/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedFormContent: undefined,
};

const stateSlice = createSlice({
  initialState,
  name: "state",
  reducers: {
    setSavedFormContent(state, action) {
      state.savedFormContent = action.payload;
    },
  },
});

export const { setSavedFormContent } = stateSlice.actions;

export default stateSlice.reducer;
