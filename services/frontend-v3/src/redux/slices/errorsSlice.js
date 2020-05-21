/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "errors",
  initialState: [],
  reducers: {
    addError(state, action) {
      state = state.push(action.payload);
    },
  },
});

export const { addError } = errorsSlice.actions;

export default errorsSlice.reducer;
