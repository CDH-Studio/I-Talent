import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import config from "../../config";
import { IntlPropType } from "../../customPropTypes";

const { backendAddress } = config;

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = ({ intl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const type = "dashboard";

  // Get dashboard data for statistic cards and graphes
  const getDashboardData = async () => {
    try {
      const url = `${backendAddress}api/admin/dashboard/`;

      const results = await axios.get(url);

      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
    }
  };

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
    const setState = async () => {
      // Get the data for the dashboard cards and graphes
      const dashboardData = await getDashboardData();
      setData(dashboardData);
      setLoading(false);
    };
    setState();
  }, []);

  document.title = `${getDisplayType(false)} - Admin | I-Talent`;

  if (loading) {
    return (
      <AdminLayout displaySideBar type={type}>
        <Skeleton active />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout displaySideBar type={type}>
      <PageHeader
        title={intl.formatMessage({
          id: "admin.dashboard.title",
          defaultMessage: "Admin Dashboard",
        })}
      />
      <StatCards data={data} />
      <DashboardGraphs data={data} />
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
