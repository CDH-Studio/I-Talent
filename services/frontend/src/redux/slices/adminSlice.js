/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bugs: {
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
  schools: {
    data: [],
    loading: true,
  },
  skills: {
    data: [],
    loading: true,
  },
  users: {
    data: [],
    loading: true,
  },
};

const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    clearAdmin() {
      return initialState;
    },
    setAdminBugs(state, action) {
      state.bugs = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminBugsLoading(state, action) {
      state.bugs.loading = action.payload;
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
    setAdminSchools(state, action) {
      state.schools = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminSchoolsLoading(state, action) {
      state.schools.loading = action.payload;
    },
    setAdminSkills(state, action) {
      state.skills = {
        data: action.payload,
        loading: false,
      };
    },
    setAdminSkillsLoading(state, action) {
      state.skills.loading = action.payload;
    },
    setAdminUsers(state, action) {
      const { data, locale } = action.payload;
      state.users = {
        data,
        loading: false,
        locale,
      };
    },
    setAdminUsersLoading(state, action) {
      state.users.loading = action.payload;
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
  setAdminSkills,
  setAdminSkillsLoading,
  setAdminDiplomas,
  setAdminDiplomasLoading,
  setAdminSchools,
  setAdminSchoolsLoading,
  setAdminBugs,
  setAdminBugsLoading,
  clearAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
