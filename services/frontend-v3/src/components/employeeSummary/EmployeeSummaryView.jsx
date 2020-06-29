import React from "react";
import { Tabs } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import OfficialLanguage from "./officialLanguage/OfficialLanguage";
import Acting from "./acting/Acting";
import Substantive from "./substantive/Substantive";

const { TabPane } = Tabs;

const EmployeeSummaryView = ({ data }) => {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<FormattedMessage id="profile.tenure" />} key={1}>
          <Substantive data={data} />
        </TabPane>

        <TabPane
          tab={<FormattedMessage id="profile.acting.label.only" />}
          key={2}
        >
          <Acting data={data} />
        </TabPane>
      </Tabs>
    </div>
  );
};

EmployeeSummaryView.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};

EmployeeSummaryView.defaultProps = {
  values: null,
};

export default EmployeeSummaryView;
