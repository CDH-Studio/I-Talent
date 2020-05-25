/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "errors",
  initialState: [],
  reducers: {
    addError(state, action) {
      const error = action.payload;
      let serializedError;
      if (error.isAxiosError) {
        serializedError = {
          title: error.config.method.toUpperCase() + " " + error.config.url,
          isAxiosError: true,
          description: [
            error.response && error.response.data
              ? [error.response.status, error.response.statusText]
              : ["No response from backend"],
          ],
        };
      } else {
        serializedError = {
          title: error.message,
          isAxiosError: false,
          description: error.stack.split("\n"),
        };
      }

      state = state.push(serializedError);
    },
  },
});

export const { addError } = errorsSlice.actions;

export default errorsSlice.reducer;
