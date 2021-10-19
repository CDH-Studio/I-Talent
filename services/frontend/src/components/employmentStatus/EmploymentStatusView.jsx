import { FormattedMessage } from "react-intl";
import { Col, List, Row } from "antd";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

const EmploymentStatusView = ({ data }) => {
  const left = [
    {
      description: data.groupLevel ? (
        data.groupLevel.name
      ) : (
        <FormattedMessage id="not.provided" />
      ),
      title: <FormattedMessage id="classification" />,
    },
    {
      description:
        data.tenure && data.tenure.description ? (
          data.tenure.description
        ) : (
          <FormattedMessage id="not.provided" />
        ),
      title: <FormattedMessage id="profile.substantive" />,
    },
  ];

  const right = [
    {
      description: data.actingLevel ? (
        data.actingLevel.name
      ) : (
        <FormattedMessage id="not.provided" />
      ),
      title: <FormattedMessage id="acting" />,
    },
    {
      description: data.securityClearance ? (
        data.securityClearance.description
      ) : (
        <FormattedMessage id="not.provided" />
      ),
      title: <FormattedMessage id="profile.security" />,
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

EmploymentStatusView.propTypes = {
  data: ProfileInfoPropType,
};

EmploymentStatusView.defaultProps = {
  data: null,
};

export default EmploymentStatusView;
