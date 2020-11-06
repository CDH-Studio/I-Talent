import React, { useEffect, useCallback } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { AreaChartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import useAxios from "../../utils/useAxios";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import { IntlPropType } from "../../utils/customPropTypes";
import handleError from "../../functions/handleError";
import {
  setCountUsers,
  setCountHiddenUsers,
  setCountInactiveUsers,
  setCountExFeederUsers,
  setGrowthRateByMonth,
  setGrowthRateByWeek,
  setTopFiveCompetencies,
  setTopFiveSkills,
  setTopFiveDevelopmentalGoals,
} from "../../redux/slices/statsSlice";
import Header from "../../components/header/Header";

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = ({ intl }) => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const axios = useAxios();
  const history = useHistory();

  // Get part of the title for the page
  const getDisplayType = useCallback(
    (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.dashboard.plural`,
        });

      return intl.formatMessage({
        id: `admin.dashboard.singular`,
      });
    },
    [intl]
  );

  const getBackendInfo = useCallback(async () => {
    try {
      return await Promise.all([
        axios.get(`api/stats/count/users`),
        axios.get(`api/stats/count/hiddenUsers`),
        axios.get(`api/stats/count/inactiveUsers`),
        axios.get(`api/stats/count/exFeederUsers`),
        axios.get(`api/stats/growthRateByMonth`),
        axios.get(`api/stats/growthRateByWeek`),
        axios.get(`api/stats/topFiveCompetencies?language=${locale}`),
        axios.get(`api/stats/topFiveDevelopmentalGoals?language=${locale}`),
        axios.get(`api/stats/topFiveSkills?language=${locale}`),
      ]);
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, history, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    document.title = `${getDisplayType(false)} - Admin | I-Talent`;
    dispatch(setTopFiveCompetencies([]));
    dispatch(setTopFiveSkills([]));
    dispatch(setTopFiveDevelopmentalGoals([]));

    getBackendInfo().then(
      ([
        userCount,
        hiddenUserCount,
        inactiveUserCount,
        exFeederUserCount,
        growthRateByMonth,
        growthRateByWeek,
        topFiveCompetencies,
        topFiveSkills,
        topFiveDevelopmentalGoals,
      ]) => {
        dispatch(setCountUsers(userCount.data));
        dispatch(setCountHiddenUsers(hiddenUserCount.data));
        dispatch(setCountInactiveUsers(inactiveUserCount.data));
        dispatch(setCountExFeederUsers(exFeederUserCount.data));
        dispatch(setGrowthRateByMonth(growthRateByMonth.data));
        dispatch(setGrowthRateByWeek(growthRateByWeek.data));
        dispatch(setTopFiveCompetencies(topFiveCompetencies.data));
        dispatch(setTopFiveSkills(topFiveSkills.data));
        dispatch(setTopFiveDevelopmentalGoals(topFiveDevelopmentalGoals.data));
      }
    );
  }, [dispatch, getBackendInfo, getDisplayType]);

  return (
    <AdminLayout displaySideBar type="dashboard">
      <Header
        title={
          <>
            <AreaChartOutlined />
            <FormattedMessage id="admin.dashboard.title" />
          </>
        }
      />
      <StatCards />
      <DashboardGraphs />
    </AdminLayout>
  );
};

AdminDashboard.propTypes = {
  intl: IntlPropType,
};

AdminDashboard.defaultProps = {
  intl: undefined,
};

export default injectIntl(AdminDashboard);
