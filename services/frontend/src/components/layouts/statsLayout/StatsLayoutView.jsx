import { AreaChartOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import DashboardGraphs from "../../admin/dashboardGraphs/DashboardGraphs";
import Header from "../../header/Header";
import AppLayout from "../appLayout/AppLayout";

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
