/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarColor: undefined,
  email: undefined,
  firstName: undefined,
  id: undefined,
  initials: undefined,
  isAdmin: false,
  isPrivacyAccepted: false,
  lastName: undefined,
  name: undefined,
  signupStep: 1,
  status: "ACTIVE",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    clearUser() {
      return initialState;
    },
    setIsPrivacyAccepted(state, action) {
      state.isPrivacyAccepted = action.payload;
    },
    setUseLastName(state, action) {
      state.lastName = action.payload;
    },
    setUser(state, action) {
      const {
        id,
        avatarColor,
        initials,
        firstName,
        lastName,
        name,
        email,
        status,
        signupStep,
      } = action.payload;

      return {
        ...state,
        avatarColor: avatarColor || state.avatarColor,
        email: email || state.email,
        firstName: firstName || state.firstName,
        id: id || state.id,
        initials: initials || state.initials,
        lastName: lastName || state.lastName,
        name: name || state.name,
        signupStep: signupStep || state.signupStep,
        status: status || state.status,
      };
    },
    setUserAvatarColor(state, action) {
      state.avatarColor = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    setUserFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserId(state, action) {
      state.id = action.payload;
    },
    setUserInitials(state, action) {
      state.initials = action.payload;
    },
    setUserIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setUserName(state, action) {
      state.name = action.payload;
    },
    setUserSignupStep(state, action) {
      state.signupStep = action.payload;
    },
    setUserStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  setUseFirstName,
  setUseLastName,
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
