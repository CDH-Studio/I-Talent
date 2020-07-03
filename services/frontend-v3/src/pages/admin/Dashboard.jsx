import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { PageHeader } from "antd";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import config from "../../config";
import { IntlPropType } from "../../customPropTypes";
import handleError from "../../functions/handleError";
import {
  setCountUsers,
  setCountHiddenUsers,
  setCountInactiveUsers,
  setCountExFeederUsers,
  setHiddenUsers,
  setGrowthRateByMonth,
  setGrowthRateByWeek,
  setTopFiveCompetencies,
  setTopFiveSkills,
  setTopFiveDevelopmentalGoals,
} from "../../redux/slices/statsSlice";

const { backendAddress } = config;

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = ({ intl }) => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const type = "dashboard";

  // Get dashboard data for statistic cards
  const getUserCount = useCallback(async () => {
    try {
      const results = await axios.get(`${backendAddress}api/stats/count/users`);

      dispatch(setCountUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getHiddenUserCount = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/stats/count/hiddenUsers`
      );

      dispatch(setCountHiddenUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getInactiveUserCount = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/stats/count/inactiveUsers`
      );

      dispatch(setCountInactiveUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getExfeederUserCount = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/stats/count/exFeederUsers`
      );

      dispatch(setCountExFeederUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getHiddenUsers = useCallback(async () => {
    try {
      const results = await axios.get(`${backendAddress}api/stats/hiddenUsers`);

      dispatch(setHiddenUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getGrowthRateByMonth = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/stats/growthRateByMonth`
      );

      dispatch(setGrowthRateByMonth(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getGrowthRateByWeek = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/stats/growthRateByWeek`
      );

      dispatch(setGrowthRateByWeek(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch]);

  const getTopFiveCompentencies = useCallback(async () => {
    try {
      dispatch(setTopFiveCompetencies([]));

      const results = await axios.get(
        `${backendAddress}api/stats/topFiveCompetencies?language=${locale}`
      );

      dispatch(setTopFiveCompetencies(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch, locale]);

  const getTopFiveSkills = useCallback(async () => {
    try {
      dispatch(setTopFiveSkills([]));

      const results = await axios.get(
        `${backendAddress}api/stats/topFiveSkills?language=${locale}`
      );

      dispatch(setTopFiveSkills(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch, locale]);

  const getTopFiveDevelopmentalGoals = useCallback(async () => {
    try {
      dispatch(setTopFiveDevelopmentalGoals([]));

      const results = await axios.get(
        `${backendAddress}api/stats/topFiveDevelopmentalGoals?language=${locale}`
      );

      dispatch(setTopFiveDevelopmentalGoals(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [dispatch, locale]);

  // Get part of the title for the page
  const getDisplayType = (plural) => {
    if (plural)
      return intl.formatMessage({
        id: `admin.${type}.plural`,
        defaultMessage: type,
      });

    return intl.formatMessage({
      id: `admin.${type}.singular`,
      defaultMessage: type,
    });
  };

  // useEffect to run once component is mounted
  useEffect(() => {
    Promise.all([
      getUserCount(),
      getHiddenUserCount(),
      getInactiveUserCount(),
      getExfeederUserCount(),
      getHiddenUsers(),
      getGrowthRateByMonth(),
      getGrowthRateByWeek(),
      getTopFiveCompentencies(),
      getTopFiveSkills(),
      getTopFiveDevelopmentalGoals(),
    ]);
  }, [
    getExfeederUserCount,
    getGrowthRateByMonth,
    getGrowthRateByWeek,
    getHiddenUserCount,
    getHiddenUsers,
    getInactiveUserCount,
    getTopFiveCompentencies,
    getTopFiveDevelopmentalGoals,
    getTopFiveSkills,
    getUserCount,
  ]);

  document.title = `${getDisplayType(false)} - Admin | I-Talent`;

  return (
    <AdminLayout displaySideBar type={type}>
      <PageHeader
        title={intl.formatMessage({
          id: "admin.dashboard.title",
          defaultMessage: "Admin Dashboard",
        })}
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
