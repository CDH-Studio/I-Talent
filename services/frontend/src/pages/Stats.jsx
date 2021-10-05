import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import StatsLayout from "../components/layouts/statsLayout/StatsLayout";
import handleError from "../functions/handleError";
import { setTopFive } from "../redux/slices/statsSlice";
import useAxios from "../utils/useAxios";

const Stats = () => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const axios = useAxios();
  const intl = useIntl();
  const history = useHistory();

  const getBackendInfo = useCallback(async () => {
    try {
      dispatch(
        setTopFive({
          competencies: [],
          developmentalGoals: [],
          skills: [],
        })
      );
      const [topFiveCompetencies, topFiveSkills, topFiveDevelopmentalGoals] =
        await Promise.all([
          axios.get(`stats/topFiveCompetencies?language=${locale}`),
          axios.get(`stats/topFiveSkills?language=${locale}`),
          axios.get(`stats/topFiveDevelopmentalGoals?language=${locale}`),
        ]);
      dispatch(
        setTopFive({
          competencies: topFiveCompetencies.data,
          developmentalGoals: topFiveDevelopmentalGoals.data,
          skills: topFiveSkills.data,
        })
      );
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, dispatch, history, locale]);

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "statistics",
    })} | I-Talent`;
    getBackendInfo();
  }, [dispatch, getBackendInfo, intl]);

  return <StatsLayout displaySideBar />;
};

export default Stats;
