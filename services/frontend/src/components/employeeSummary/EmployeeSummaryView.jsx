import { Col, List, Row } from "antd";
import { FormattedMessage } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

const EmployeeSummaryView = ({ data }) => {
  const left = [
    {
      title: <FormattedMessage id="classification" />,
      description: data.groupLevel ? data.groupLevel.name : "-",
    },
    {
      title: <FormattedMessage id="profile.substantive" />,
      description:
        data.tenure && data.tenure.description ? data.tenure.description : "-",
    },
  ];

  const right = [
    {
      title: <FormattedMessage id="acting" />,
      description: data.actingLevel ? data.actingLevel.name : "-",
    },
    {
      title: <FormattedMessage id="profile.security" />,
      description: data.securityClearance
        ? data.securityClearance.description
        : "-",
    },
  ];

  const list = (dataSource) => (
    <List
      dataSource={dataSource}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta description={item.description} title={item.title} />
        </List.Item>
      )}
    />
  );
  return (
    <div>
      <Row>
        <Col span={12}>{list(left)}</Col>
        <Col span={12}>{list(right)}</Col>
      </Row>
    </div>
  );
};

EmployeeSummaryView.propTypes = {
  data: ProfileInfoPropType,
};

EmployeeSummaryView.defaultProps = {
  data: null,
};

export default EmployeeSummaryView;
