import React from "react";
import { Tabs } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Substantive from "./substantive/Substantive";
import Acting from "./acting/Acting";
import OfficialLanguage from "./officialLanguage/OfficialLanguage";
import { ProfileInfoPropType } from "../../customPropTypes";

const { TabPane } = Tabs;

const EmployeeSummaryView = ({ data, setActiveTabKey }) => {
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={setActiveTabKey}>
        <TabPane tab={<FormattedMessage id="profile.tenure" />} key={1}>
          <Substantive data={data} />
        </TabPane>

        <TabPane
          tab={<FormattedMessage id="profile.acting.label.only" />}
          key={2}
        >
          <Acting data={data} />
        </TabPane>
        <TabPane
          tab={<FormattedMessage id="profile.official.language" />}
          key={3}
        >
          <OfficialLanguage data={data} />
        </TabPane>
      </Tabs>
    </div>
  );
};

EmployeeSummaryView.propTypes = {
  data: ProfileInfoPropType,
  setActiveTabKey: PropTypes.func.isRequired,
};

EmployeeSummaryView.defaultProps = {
  data: null,
};

export default EmployeeSummaryView;
