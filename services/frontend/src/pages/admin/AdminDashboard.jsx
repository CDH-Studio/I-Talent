import { useCallback, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AreaChartOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import StatCards from "../../components/admin/statCards/StatCards";
import Header from "../../components/header/Header";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import handleError from "../../functions/handleError";
import { setInitialAdminData } from "../../redux/slices/statsSlice";
import useAxios from "../../utils/useAxios";

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = () => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const axios = useAxios();
  const history = useHistory();
  const intl = useIntl();

  // Get part of the title for the page
  const getDisplayType = useCallback(
    (plural) => {
      if (plural)
        return intl.formatMessage({
          id: "dashboard",
        });

      return intl.formatMessage({
        id: "dashboard",
      });
    },
    [intl]
  );

  const getBackendInfo = useCallback(async () => {
    try {
      const [
        users,
        hiddenUsers,
        inactiveUsers,
        exFeederUsers,
        growthRateByMonth,
        growthRateByWeek,
        topFiveCompetencies,
        topFiveDevelopmentalGoals,
        topFiveSkills,
      ] = await Promise.all([
        axios.get(`stats/count/users`),
        axios.get(`stats/count/hiddenUsers`),
        axios.get(`stats/count/inactiveUsers`),
        axios.get(`stats/count/exFeederUsers`),
        axios.get(`stats/growthRateByMonth`),
        axios.get(`stats/growthRateByWeek`),
        axios.get(`stats/topFiveCompetencies?language=${locale}`),
        axios.get(`stats/topFiveDevelopmentalGoals?language=${locale}`),
        axios.get(`stats/topFiveSkills?language=${locale}`),
      ]);
      dispatch(
        setInitialAdminData({
          countExFeederUsers: exFeederUsers.data,
          countHiddenUsers: hiddenUsers.data,
          countInactiveUsers: inactiveUsers.data,
          countUsers: users.data,
          growthRateByMonth: growthRateByMonth.data,
          growthRateByWeek: growthRateByWeek.data,
          topFiveCompetencies: topFiveCompetencies.data,
          topFiveDevelopmentalGoals: topFiveDevelopmentalGoals.data,
          topFiveSkills: topFiveSkills.data,
        })
      );
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, dispatch, history, locale]);

  // useEffect to run once component is mounted
  useEffect(() => {
    document.title = `${getDisplayType(false)} - Admin | I-Talent`;
    getBackendInfo();
  }, [dispatch, getBackendInfo, getDisplayType]);

  return (
    <AdminLayout displaySideBar type="dashboard">
      <Header
        icon={<AreaChartOutlined />}
        title={<FormattedMessage id="admin.dashboard.title" />}
      />
      <Row gutter={[15, 15]} type="flex">
        <Col span={24}>
          <StatCards />
        </Col>
        <Col span={24}>
          <DashboardGraphs />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;
