/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    data: [],
    loading: true,
  },
  categories: {
    data: [],
    loading: true,
  },
  competencies: {
    data: [],
    loading: true,
  },
  diplomas: {
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
    setAdminCategories(state, action) {
      state.categories = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminCategoriesLoading(state, action) {
      state.categories.loading = action.payload;
    },
    setAdminCompetencies(state, action) {
      state.competencies = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminCompetenciesLoading(state, action) {
      state.competencies.loading = action.payload;
    },
    setAdminDiplomas(state, action) {
      state.diplomas = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminDiplomasLoading(state, action) {
      state.diplomas.loading = action.payload;
    },
    clearAdmin() {
      return initialState;
    },
  },
});

export const {
  setAdminUsers,
  setAdminUsersLoading,
  setAdminCategories,
  setAdminCategoriesLoading,
  setAdminCompetencies,
  setAdminCompetenciesLoading,
  setAdminDiplomas,
  setAdminDiplomasLoading,
  clearAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
