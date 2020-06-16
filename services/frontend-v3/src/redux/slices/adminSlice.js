/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    data: [],
    loading: true,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminUsers(state, action) {
      const { data, locale } = action.payload;
      state.users = {
        data,
        locale,
        loading: false,
      };
    },
    setAdminUsersLoading(state, action) {
      state.users.loading = action.payload;
    },
    clearAdmin() {
      return initialState;
    },
  },
});

export const {
  setAdminUsers,
  setAdminUsersLoading,
  clearAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
