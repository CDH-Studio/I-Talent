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

    setTopFive(state, action) {
      const { competencies, skills, developmentalGoals } = action.payload;
      state.topFive.competencies = competencies;
      state.topFive.skills = skills;
      state.topFive.developmentalGoals = developmentalGoals;
    },

    clearStats() {
      return initialState;
    },
  },
});

export const { setTopFive, clearStats, setInitialAdminData } =
  statsSlice.actions;

export default statsSlice.reducer;
