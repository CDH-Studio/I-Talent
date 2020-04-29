import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import axios from "axios";
import { Skeleton, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import config from "../../config";
import { useState } from "react";
import { useEffect } from "react";

const backendAddress = config.backendAddress;

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
function AdminDashboard(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const type = "dashboard";

  /* useEffect to run once component is mounted */
  useEffect(() => {
    const setState = async () => {
      // Get the data for the dashboard cards and graphes
      const dashboardData = await getDashboardData();
      setData(dashboardData);
      setLoading(false);
    };
    setState();
  });

  /* get dashboard data for statistic cards and graphes */
  const getDashboardData = async () => {
    try {
      const url = backendAddress + "api/admin/dashboard/";

      const results = await axios.get(url);

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  /* get part of the title for the page */
  const getDisplayType = (plural) => {
    if (plural)
      return props.intl.formatMessage({
        id: "admin." + type + ".plural",
        defaultMessage: type,
      });

    return props.intl.formatMessage({
      id: "admin." + type + ".singular",
      defaultMessage: type,
    });
  };

  document.title = getDisplayType(false) + " - Admin | I-Talent";

  if (loading) {
    return (
      <AdminLayout
        changeLanguage={props.changeLanguage}
        displaySideBar={true}
        type={type}
      >
        <Skeleton active />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type={type}
    >
      <PageHeader
        title={props.intl.formatMessage({
          id: "admin.dashboard.title",
          defaultMessage: "Admin Dashboard",
        })}
      />
      <StatCards data={data} />
      <DashboardGraphs data={data} />
    </AdminLayout>
  );
}

export default injectIntl(AdminDashboard);
