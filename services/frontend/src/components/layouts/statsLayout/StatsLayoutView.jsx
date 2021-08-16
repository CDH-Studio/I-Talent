import { FormattedMessage } from "react-intl";
import { AreaChartOutlined } from "@ant-design/icons";
import AppLayout from "../appLayout/AppLayout";
import Header from "../../header/Header";
import DashboardGraphs from "../../admin/dashboardGraphs/DashboardGraphs";

const StatsLayoutView = () => (
  <AppLayout>
    <Header
      icon={<AreaChartOutlined />}
      title={<FormattedMessage id="statistics" />}
    />

    <DashboardGraphs />
  </AppLayout>
);

export default StatsLayoutView;
