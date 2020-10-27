/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: {},
  topFive: {
    competencies: [],
    skills: [],
    developmentalGoals: [],
  },
  growthRate: {
    month: {},
    week: {},
  },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setCountUsers(state, action) {
      state.count.users = action.payload;
    },
    setCountHiddenUsers(state, action) {
      state.count.hiddenUsers = action.payload;
    },
    setCountInactiveUsers(state, action) {
      state.count.inactiveUsers = action.payload;
    },
    setCountExFeederUsers(state, action) {
      state.count.exFeederUsers = action.payload;
    },
    setTopFiveCompetencies(state, action) {
      state.topFive.competencies = action.payload;
    },
    setTopFiveSkills(state, action) {
      state.topFive.skills = action.payload;
    },
    setTopFiveDevelopmentalGoals(state, action) {
      state.topFive.developmentalGoals = action.payload;
    },
    setGrowthRateByMonth(state, action) {
      state.growthRate.month = action.payload;
    },
    setGrowthRateByWeek(state, action) {
      state.growthRate.week = action.payload;
    },
    clearStats() {
      return initialState;
    },
  },
});

export const {
  setCountUsers,
  setCountHiddenUsers,
  setCountInactiveUsers,
  setCountExFeederUsers,
  setTopFiveCompetencies,
  setTopFiveSkills,
  setTopFiveDevelopmentalGoals,
  setGrowthRateByMonth,
  setGrowthRateByWeek,
  clearStats,
} = statsSlice.actions;

export default statsSlice.reducer;
