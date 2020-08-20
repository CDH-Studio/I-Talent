import React from "react";
import PropTypes from "prop-types";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";

const EmploymentEquityView = ({ groups }) => {
  if (groups.length > 0) {
    return (
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <List>
          {groups.map(({key, text}) => (
            <Tag color="#00605e" key={key}>
              {text}
            </Tag>
          ))}
        </List>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.competencies.empty" />}
      style={{maxHeight: 52}}
    />
  );
};

EmploymentEquityView.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

EmploymentEquityView.defaultProps = {
  groups: [],
};

export default EmploymentEquityView;
