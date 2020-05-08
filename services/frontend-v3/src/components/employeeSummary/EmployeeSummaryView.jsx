import React from "react";
import { Tabs } from "antd";
import { FormattedMessage } from "react-intl";
import Substantive from "./substantive/Substantive";
import Acting from "./acting/Acting";
import OfficialLanguage from "./officialLanguage/OfficialLanguage";

const { TabPane } = Tabs;

function EmployeeSummaryView(props) {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<FormattedMessage id="profile.tenure" />} key={1}>
          <Substantive data={props.data} />
        </TabPane>

        <TabPane
          tab={<FormattedMessage id="profile.acting.label.only" />}
          key={2}
        >
          <Acting data={props.data} />
        </TabPane>
        <TabPane
          tab={<FormattedMessage id="profile.official.language" />}
          key={3}
        >
          <OfficialLanguage data={props.data} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default EmployeeSummaryView;
