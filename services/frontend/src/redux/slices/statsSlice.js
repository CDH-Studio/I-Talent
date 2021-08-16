/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: {},
  growthRate: {
    month: {},
    week: {},
  },
  topFive: {
    competencies: [],
    developmentalGoals: [],
    skills: [],
  },
};

const statsSlice = createSlice({
  initialState,
  name: "stats",
  reducers: {
    clearStats() {
      return initialState;
    },

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
          exFeederUsers: countExFeederUsers,
          hiddenUsers: countHiddenUsers,
          inactiveUsers: countInactiveUsers,
          users: countUsers,
        },
        growthRate: {
          month: growthRateByMonth,
          week: growthRateByWeek,
        },
        topFive: {
          competencies: topFiveCompetencies,
          developmentalGoals: topFiveDevelopmentalGoals,
          skills: topFiveSkills,
        },
      };
    },

    setTopFive(state, action) {
      const { competencies, skills, developmentalGoals } = action.payload;
      state.topFive.competencies = competencies;
      state.topFive.skills = skills;
      state.topFive.developmentalGoals = developmentalGoals;
    },
  },
});

export const { setTopFive, clearStats, setInitialAdminData } =
  statsSlice.actions;

export default statsSlice.reducer;
