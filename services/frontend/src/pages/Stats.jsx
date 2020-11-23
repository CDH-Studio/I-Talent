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
      dispatch(setTopFiveCompetencies([]));
      dispatch(setTopFiveSkills([]));
      dispatch(setTopFiveDevelopmentalGoals([]));
      const [
        topFiveCompetencies,
        topFiveSkills,
        topFiveDevelopmentalGoals,
      ] = await Promise.all([
        axios.get(`api/stats/topFiveCompetencies?language=${locale}`),
        axios.get(`api/stats/topFiveSkills?language=${locale}`),
        axios.get(`api/stats/topFiveDevelopmentalGoals?language=${locale}`),
      ]);
      dispatch(setTopFiveCompetencies(topFiveCompetencies.data));
      dispatch(setTopFiveSkills(topFiveSkills.data));
      dispatch(setTopFiveDevelopmentalGoals(topFiveDevelopmentalGoals.data));
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, dispatch, history, locale]);

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "stats.title",
    })} | I-Talent`;
    getBackendInfo();
  }, [dispatch, getBackendInfo, intl]);

  return <StatsLayout displaySideBar />;
};

export default Stats;
