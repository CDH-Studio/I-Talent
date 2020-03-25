import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/statCards/StatCards";
import DashboardGraphs from "../../components/dashboardGraphs/DashboardGraphs";
import axios from "axios";
import { Typography, Skeleton } from "antd";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

class AdminDashboard extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Admin | UpSkill";

    this.state = { data: null, loading: true };
  }

  componentDidMount() {
    axios
      .get(backendAddress + "api/admin/dashboard/")
      .then(res => this.setState({ data: res.data, loading: false }))
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return (
        <AdminLayout>
          <Skeleton active />
        </AdminLayout>
      );
    }

    return (
      <AdminLayout
        changeLanguage={this.props.changeLanguage}
        displaySideBar={true}
        type={"dashboard"}
      >
        <Title>
          {this.props.intl.formatMessage({
            id: "admin.dashboard.title",
            defaultMessage: "Admin Dashboard"
          })}
        </Title>
        <StatCards data={data} />
        <DashboardGraphs data={data} />
      </AdminLayout>
    );
  }
}

export default injectIntl(AdminDashboard);
