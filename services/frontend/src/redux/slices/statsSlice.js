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
    setInitialAdminData(state, action) {
      const {
        countUsers,
        countHiddenUsers,
        countInactiveUsers,
        countExFeederUsers,
        growthRateByMonth,
        growthRateByWeek,
        topFiveCompetencies,
        topFiveDevelopmentalGoals,
        topFiveSkills,
      } = action.payload;

      return {
        ...state,
        count: {
          users: countUsers,
          hiddenUsers: countHiddenUsers,
          inactiveUsers: countInactiveUsers,
          exFeederUsers: countExFeederUsers,
        },
        topFive: {
          competencies: topFiveCompetencies,
          skills: topFiveSkills,
          developmentalGoals: topFiveDevelopmentalGoals,
        },
        growthRate: {
          month: growthRateByMonth,
          week: growthRateByWeek,
        },
      };
    },

    clearStats() {
      return initialState;
    },
  },
});

export const {
  setTopFiveCompetencies,
  setTopFiveSkills,
  setTopFiveDevelopmentalGoals,
  clearStats,
  setInitialAdminData,
} = statsSlice.actions;

export default statsSlice.reducer;
