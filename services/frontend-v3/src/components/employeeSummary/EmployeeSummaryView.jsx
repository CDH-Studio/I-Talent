import React from "react";
import { Tabs, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Substantive from "./substantive/Substantive";
import Acting from "./acting/Acting";
import { ProfileInfoPropType } from "../../customPropTypes";

const { TabPane } = Tabs;

const EmployeeSummaryView = ({ data }) => {
  return (
    <div>
      <Row>
        <Col span={data.actingLevel ? 12 : 24}>
          <Substantive data={data} />
        </Col>
        {data.actingLevel && (
          <Col span={12}>
            <Acting data={data} />
          </Col>
        )}
      </Row>
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
