import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/statCards/StatCards";
import DashboardGraphs from "../../components/dashboardGraphs/DashboardGraphs";
import axios from "axios";
import { Skeleton, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import config from "../../config";
import { useState } from "react";
import { useEffect } from "react";

const backendAddress = config.backendAddress;

function AdminDashboard(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateState = async () => {
    const dashboardData = await getDashboardData();
    setData(dashboardData);
    setLoading(false);
  };

  useEffect(() => {
    document.title =
      props.intl.formatMessage({
        id: "admin.dashboard.singular",
        defaultMessage: "Dashboard",
      }) + " - Admin | I-Talent";
    updateState();
  });

  if (loading) {
    return (
      <AdminLayout
        changeLanguage={props.changeLanguage}
        displaySideBar={true}
        type="dashboard"
      >
        <Skeleton active />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="dashboard"
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
