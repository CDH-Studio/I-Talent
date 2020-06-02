/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
  avatarColor: undefined,
  initials: undefined,
  name: undefined,
  email: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.id = action.payload;
    },
    setUserAvatarColor(state, action) {
      state.avatarColor = action.payload;
    },
    setUserInitials(state, action) {
      state.initials = action.payload;
    },
    setUserName(state, action) {
      state.name = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    clearUser(state) {
      state = initialState;
    },
  },
});

export const {
  setUserName,
  setUserAvatarColor,
  setUserEmail,
  setUserId,
  setUserInitials,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
