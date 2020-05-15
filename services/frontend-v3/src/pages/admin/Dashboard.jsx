import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Skeleton, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import config from "../../config";
import { IntlPropType } from "../../customPropTypes";
import AdminErrorContent from "../../components/admin/adminErrorContent/AdminErrorContent";

const { backendAddress } = config;

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = ({ changeLanguage, intl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(null);

  const type = "dashboard";

  // Get dashboard data for statistic cards and graphes
  const getDashboardData = async () => {
    try {
      const url = `${backendAddress}api/admin/dashboard/`;

      const results = await axios.get(url);

      return results.data;
    } catch (error) {
      setNetworkError(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
    }
  };

  // Get part of the title for the page
  const getDisplayType = plural => {
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
  });

  document.title = `${getDisplayType(false)} - Admin | I-Talent`;

  if (loading) {
    return (
      <AdminLayout changeLanguage={changeLanguage} displaySideBar type={type}>
        <Skeleton active />
      </AdminLayout>
    );
  }

  const generateContent = () => {
    if (networkError) {
      return <AdminErrorContent networkError={networkError} />;
    }
    return (
      <>
        <PageHeader
          title={intl.formatMessage({
            id: "admin.dashboard.title",
            defaultMessage: "Admin Dashboard",
          })}
        />
        <StatCards data={data} />
        <DashboardGraphs data={data} />
      </>
    );
  };

  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type={type}>
      {generateContent()}
    </AdminLayout>
  );
};

AdminDashboard.propTypes = {
  intl: IntlPropType,
  changeLanguage: PropTypes.func.isRequired,
};

AdminDashboard.defaultProps = {
  intl: undefined,
};
export default injectIntl(AdminDashboard);
