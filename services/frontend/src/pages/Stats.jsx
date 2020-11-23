import { useEffect, useCallback } from "react";
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

  const getBackendInfo = useCallback(async () => {
    try {
      return await Promise.all([
        axios.get(`api/stats/topFiveCompetencies?language=${locale}`),
        axios.get(`api/stats/topFiveSkills?language=${locale}`),
        axios.get(`api/stats/topFiveDevelopmentalGoals?language=${locale}`),
      ]);
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, history, locale]);

  useEffect(() => {
    dispatch(setTopFiveCompetencies([]));
    dispatch(setTopFiveSkills([]));
    dispatch(setTopFiveDevelopmentalGoals([]));
    document.title = `${intl.formatMessage({
      id: "stats.title",
    })} | I-Talent`;
    getBackendInfo().then(
      ([topFiveCompetencies, topFiveSkills, topFiveDevelopmentalGoals]) => {
        dispatch(setTopFiveCompetencies(topFiveCompetencies.data));
        dispatch(setTopFiveSkills(topFiveSkills.data));
        dispatch(setTopFiveDevelopmentalGoals(topFiveDevelopmentalGoals.data));
      }
    );
  }, [dispatch, getBackendInfo, intl]);

  return <StatsLayout displaySideBar />;
};

export default Stats;
