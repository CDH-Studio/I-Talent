/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  initialState: [],
  name: "errors",
  reducers: {
    addError(state, action) {
      const error = action.payload;
      let serializedError;
      if (error.isAxiosError) {
        serializedError = {
          description: [
            error.response && error.response.data
              ? [`${error.response.status} ${error.response.statusText}`]
              : ["No response from backend"],
          ],
          isAxiosError: true,
          title: `${error.config.method.toUpperCase()} ${error.config.url}`,
        };
      } else {
        serializedError = {
          description: error.stack.split("\n"),
          isAxiosError: false,
          title: error.message,
        };
      }

      state.push(serializedError);
    },
  },
});

export const { addError } = errorsSlice.actions;

export default errorsSlice.reducer;
