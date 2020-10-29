import React, { useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import StatsLayout from "../components/layouts/statsLayout/StatsLayout";
import useAxios from "../utils/useAxios";
import {
  setTopFiveDevelopmentalGoals,
  setTopFiveCompetencies,
  setTopFiveSkills,
} from "../redux/slices/statsSlice";
import handleError from "../functions/handleError";

const Stats = () => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const axios = useAxios();
  const intl = useIntl();
  const history = useHistory();

  const getTopFiveCompentencies = useCallback(async () => {
    try {
      dispatch(setTopFiveCompetencies([]));

      const results = await axios.get(
        `api/stats/topFiveCompetencies?language=${locale}`
      );

      dispatch(setTopFiveCompetencies(results.data));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, locale, history]);

  const getTopFiveSkills = useCallback(async () => {
    try {
      dispatch(setTopFiveSkills([]));

      const results = await axios.get(
        `api/stats/topFiveSkills?language=${locale}`
      );

      dispatch(setTopFiveSkills(results.data));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, locale, history]);

  const getTopFiveDevelopmentalGoals = useCallback(async () => {
    try {
      dispatch(setTopFiveDevelopmentalGoals([]));

      const results = await axios.get(
        `api/stats/topFiveDevelopmentalGoals?language=${locale}`
      );

      dispatch(setTopFiveDevelopmentalGoals(results.data));
    } catch (error) {
      handleError(error, "redirect", history);
    }
  }, [axios, dispatch, locale, history]);

  // useEffect to run once component is mounted
  useEffect(() => {
    Promise.all([
      getTopFiveCompentencies(),
      getTopFiveSkills(),
      getTopFiveDevelopmentalGoals(),
    ]);
  }, [getTopFiveCompentencies, getTopFiveDevelopmentalGoals, getTopFiveSkills]);

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "stats.title",
    })} | I-Talent`;
  }, [intl]);

  return <StatsLayout displaySideBar />;
};

export default Stats;
