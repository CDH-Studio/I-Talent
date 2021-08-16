import {
  EyeInvisibleFilled,
  RiseOutlined,
  SolutionOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";

import { IntlPropType } from "../../../utils/customPropTypes";

/**
 *  StatCardsView(props)
 *  This component renders the statistic cards for the Admin Dashboard page.
 */
const StatCardsView = ({
  countUsers,
  countHiddenUsers,
  countInactiveUsers,
  countExFeederUsers,
  newUsers,
  growthRatePrevMonth,
  intl,
}) => (
  <Row gutter={[15, 15]} type="flex">
    <Col sm={8} xl={4} xs={12}>
      <Card loading={countUsers === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<TeamOutlined />}
          title={<FormattedMessage id="dashboard.total.users" />}
          value={countUsers}
          valueStyle={{ color: "#3f8600" }}
        />
      </Card>
    </Col>
    <Col sm={8} xl={4} xs={12}>
      <Card loading={countInactiveUsers === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<UserOutlined />}
          title={<FormattedMessage id="dashboard.inactive.users" />}
          value={countInactiveUsers}
          valueStyle={{ color: "#515052" }}
        />
      </Card>
    </Col>
    <Col sm={8} xl={4} xs={12}>
      <Card loading={countHiddenUsers === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<EyeInvisibleFilled />}
          title={<FormattedMessage id="flagged.profiles" />}
          value={countHiddenUsers}
          valueStyle={{ color: "#cf1322" }}
        />
      </Card>
    </Col>
    <Col sm={8} xl={4} xs={12}>
      <Card loading={countExFeederUsers === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<SolutionOutlined />}
          title={<FormattedMessage id="total.ex.feeders" />}
          value={countExFeederUsers}
          valueStyle={{ color: "#82A7A6" }}
        />
      </Card>
    </Col>
    <Col sm={8} xl={4} xs={12}>
      <Card loading={newUsers === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<UsergroupAddOutlined />}
          title={`${intl.formatMessage({
            id: "dashboard.monthly.added",
          })} - ${dayjs().format("MMMM")}`}
          value={newUsers}
          valueStyle={{ color: "#CD8FD6" }}
        />
      </Card>
    </Col>
    <Col sm={8} xl={4} xs={12}>
      <Card loading={growthRatePrevMonth === "-"} style={{ height: "100%" }}>
        <Statistic
          prefix={<RiseOutlined />}
          suffix="%"
          title={`${intl.formatMessage({
            id: "growth.rate.percentage",
          })} - ${dayjs().format("MMMM")}`}
          value={growthRatePrevMonth}
          valueStyle={{ color: "#FF934F" }}
        />
      </Card>
    </Col>
  </Row>
);

StatCardsView.propTypes = {
  countUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countHiddenUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countInactiveUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countExFeederUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  newUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  growthRatePrevMonth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  intl: IntlPropType,
};

StatCardsView.defaultProps = {
  countUsers: "-",
  countHiddenUsers: "-",
  countInactiveUsers: "-",
  countExFeederUsers: "-",
  newUsers: "-",
  growthRatePrevMonth: "-",
  intl: undefined,
};

export default injectIntl(StatCardsView);
