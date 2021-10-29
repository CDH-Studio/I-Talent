import { FormattedMessage } from "react-intl";
import { Col, List, Row } from "antd";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";

/**
 * Retrieves the ribbon button for adding/removing a user from one's circle,
 * or the edit button which is a link to the edit profile page
 * @param {Object} prop - component props
 * @param {Object[]} prop.dataSource - history for redirect
 * @param {string} prop.dataSource[].description - history for redirect
 * @param {string} prop.dataSource[].title - history for redirect
 */
/* eslint-disable react/prop-types */
const InfoList = ({ dataSource }) => (
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
/* eslint-enable react/prop-types */

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

  return (
    <div>
      <Row>
        <Col span={12}>
          <InfoList dataSource={left} />
        </Col>
        <Col span={12}>
          <InfoList dataSource={right} />
        </Col>
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
