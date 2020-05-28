import React from "react";
import {
  EyeInvisibleFilled,
  RiseOutlined,
  SolutionOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import PropTypes from "prop-types";
import { Card, Row, Col, Statistic } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { IntlPropType } from "../../../customPropTypes";

/**
 *  StatCardsView(props)
 *  This component renders the statistic cards for the Admin Dashboard page.
 */

const StatCardsView = ({ dashboardCount, intl, monthGrowthRate }) => {
  if (!dashboardCount || !monthGrowthRate) {
    return null;
  }

  return (
    <Row gutter={[8, 8]} type="flex">
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={
              <FormattedMessage
                id="admin.dashboard.total.users"
                defaultMessage="Total Users"
              />
            }
            value={dashboardCount.total_users}
            valueStyle={{ color: "#3f8600" }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={
              <FormattedMessage
                id="admin.dashboard.inactive.users"
                defaultMessage="Inactive Users"
              />
            }
            value={dashboardCount.inactive_users}
            valueStyle={{ color: "#515052" }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={
              <FormattedMessage
                id="admin.dashboard.flagged.profiles"
                defaultMessage="Hidden Profiles"
              />
            }
            value={dashboardCount.hiddenProfiles}
            valueStyle={{ color: "#cf1322" }}
            prefix={<EyeInvisibleFilled />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={
              <FormattedMessage
                id="admin.dashboard.ex.feeders"
                defaultMessage="Total Ex Feeders"
              />
            }
            value={dashboardCount.exFeeders}
            valueStyle={{ color: "#82A7A6" }}
            prefix={<SolutionOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={`${intl.formatMessage({
              id: "admin.dashboard.monthly.added",
              defaultMessage: "New Users",
            })} - ${moment().format("MMMM")}`}
            value={monthGrowthRate.current_month_additions}
            valueStyle={{ color: "#CD8FD6" }}
            prefix={<UsergroupAddOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card hoverable style={{ height: "100%" }}>
          <Statistic
            title={`${intl.formatMessage({
              id: "admin.dashboard.growth.rate.percentage",
              defaultMessage: "New Users",
            })} - ${moment().format("MMMM")}`}
            value={monthGrowthRate.growthRate}
            valueStyle={{ color: "#FF934F" }}
            prefix={<RiseOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};

StatCardsView.propTypes = {
  dashboardCount: PropTypes.shape({
    total_users: PropTypes.number,
    inactive_users: PropTypes.number,
    hiddenProfiles: PropTypes.number,
    exFeeders: PropTypes.number,
  }).isRequired,
  intl: IntlPropType,
  monthGrowthRate: PropTypes.shape({
    growthRate: PropTypes.string,
    current_month_additions: PropTypes.number,
  }).isRequired,
};

StatCardsView.defaultProps = {
  intl: undefined,
};

export default injectIntl(StatCardsView);
