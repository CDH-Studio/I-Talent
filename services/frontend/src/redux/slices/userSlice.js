/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
  avatarColor: undefined,
  initials: undefined,
  name: undefined,
  email: undefined,
  isAdmin: false,
  status: "ACTIVE",
  signupStep: 1,
  isPrivacyAccepted: false,
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
    setUserIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setUserStatus(state, action) {
      state.status = action.payload;
    },
    setUserSignupStep(state, action) {
      state.signupStep = action.payload;
    },
    setIsPrivacyAccepted(state, action) {
      state.isPrivacyAccepted = action.payload;
    },
    setUser(state, action) {
      const {
        id,
        avatarColor,
        initials,
        name,
        email,
        status,
        signupStep,
      } = action.payload;

      return {
        ...state,
        id: id || state.id,
        avatarColor: avatarColor || state.avatarColor,
        initials: initials || state.initials,
        name: name || state.name,
        email: email || state.email,
        status: status || state.status,
        signupStep: signupStep || state.signupStep,
      };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {
  setUserName,
  setUserAvatarColor,
  setUserEmail,
  setUserId,
  setUserInitials,
  setUserIsAdmin,
  setUserStatus,
  setUserSignupStep,
  setIsPrivacyAccepted,
  setUser,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
